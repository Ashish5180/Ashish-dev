"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface ChromaticImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  zoom?: number;
  displacement?: number;
  chromaticShift?: number;
  tilt?: number;
  backgroundColor?: string;
  children?: React.ReactNode;
}

const VERTEX_SHADER_SOURCE = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    // Invert Y for correct texture orientation
    v_uv.y = 1.0 - v_uv.y;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SOURCE = `
  precision mediump float;
  uniform sampler2D u_image;
  uniform vec2 u_mouse;
  uniform float u_zoom;
  uniform float u_displacement;
  uniform float u_chromaticShift;
  uniform float u_hover;
  uniform vec2 u_imageAspect;
  varying vec2 v_uv;

  void main() {
    vec2 uv = v_uv;

    // Preserve cover aspect ratio
    uv = (uv - 0.5) * u_imageAspect + 0.5;

    // Zoom from center
    vec2 center = vec2(0.5, 0.5);
    uv = center + (uv - center) / (1.0 + u_zoom * u_hover);

    // Mouse influence vector
    vec2 mouseOffset = (v_uv - u_mouse);
    float dist = length(mouseOffset);
    float wave = smoothstep(0.9, 0.0, dist) * u_hover;

    vec2 dir = normalize(mouseOffset + vec2(0.0001, 0.0001));
    vec2 disp = dir * wave * u_displacement;

    // Chromatic separation
    vec2 shift = dir * (u_chromaticShift + wave * u_chromaticShift * 2.5);

    vec4 colR = texture2D(u_image, uv + disp + shift);
    vec4 colG = texture2D(u_image, uv + disp);
    vec4 colB = texture2D(u_image, uv + disp - shift);

    // Edge falloff masking
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
      discard;
    }

    gl_FragColor = vec4(colR.r, colG.g, colB.b, colG.a);
  }
`;

export function ChromaticImage({
  src,
  alt,
  zoom = 0.15,
  displacement = 0.04,
  chromaticShift = 0.012,
  tilt = 0.25,
  backgroundColor = "#f4f4f5",
  className,
  children,
  ...props
}: ChromaticImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [webGlSupported, setWebGlSupported] = useState(true);

  // Mouse & tilt state
  const mouseTargetRef = useRef({ x: 0.5, y: 0.5, hover: 0 });
  const mouseCurrentRef = useRef({ x: 0.5, y: 0.5, hover: 0 });
  const [tiltTransform, setTiltTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

      mouseTargetRef.current = { x, y, hover: 1 };

      if (tilt > 0) {
        const tiltX = (y - 0.5) * -tilt * 18;
        const tiltY = (x - 0.5) * tilt * 18;
        setTiltTransform(`perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`);
      }
    },
    [tilt]
  );

  const handlePointerLeave = useCallback(() => {
    mouseTargetRef.current = { x: 0.5, y: 0.5, hover: 0 };
    setTiltTransform("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl =
      canvas.getContext("webgl", { antialias: true, alpha: true }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      setWebGlSupported(false);
      return;
    }

    // Shader compilation
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);

    if (!vertShader || !fragShader) {
      setWebGlSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("Program link error:", gl.getProgramInfoLog(program));
      setWebGlSupported(false);
      return;
    }

    gl.useProgram(program);

    // Quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uMouseLoc = gl.getUniformLocation(program, "u_mouse");
    const uZoomLoc = gl.getUniformLocation(program, "u_zoom");
    const uDisplacementLoc = gl.getUniformLocation(program, "u_displacement");
    const uChromaticShiftLoc = gl.getUniformLocation(program, "u_chromaticShift");
    const uHoverLoc = gl.getUniformLocation(program, "u_hover");
    const uImageAspectLoc = gl.getUniformLocation(program, "u_imageAspect");

    // Texture setup
    const texture = gl.createTexture();
    const image = new Image();
    image.crossOrigin = "anonymous";
    let isDisposed = false;
    let imgNaturalWidth = 1;
    let imgNaturalHeight = 1;

    image.onload = () => {
      if (isDisposed) return;
      imgNaturalWidth = image.naturalWidth || 1;
      imgNaturalHeight = image.naturalHeight || 1;

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

      setImageLoaded(true);
    };

    image.src = src;

    // Responsive sizing
    const updateSize = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      // Aspect ratio correction (object-fit: cover logic)
      const containerAspect = width / height;
      const imgAspect = imgNaturalWidth / imgNaturalHeight;
      let aspectX = 1;
      let aspectY = 1;

      if (containerAspect > imgAspect) {
        aspectY = imgAspect / containerAspect;
      } else {
        aspectX = containerAspect / imgAspect;
      }

      gl.uniform2f(uImageAspectLoc, aspectX, aspectY);
    };

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);
    updateSize();

    // Render loop
    let animId: number;
    const render = () => {
      // Lerp mouse coordinates and hover state for silky smoothing
      const target = mouseTargetRef.current;
      const current = mouseCurrentRef.current;

      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      current.hover += (target.hover - current.hover) * 0.08;

      gl.uniform2f(uMouseLoc, current.x, current.y);
      gl.uniform1f(uZoomLoc, zoom);
      gl.uniform1f(uDisplacementLoc, displacement);
      gl.uniform1f(uChromaticShiftLoc, chromaticShift);
      gl.uniform1f(uHoverLoc, current.hover);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteBuffer(positionBuffer);
      gl.deleteTexture(texture);
    };
  }, [src, zoom, displacement, chromaticShift]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "relative overflow-hidden rounded-2xl transition-transform duration-300 ease-out will-change-transform select-none",
        className
      )}
      style={{
        backgroundColor,
        transform: tiltTransform,
      }}
      {...props}
    >
      {/* WebGL Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn(
          "h-full w-full object-cover transition-opacity duration-500 pointer-events-none",
          imageLoaded && webGlSupported ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Fallback image */}
      {(!webGlSupported || !imageLoaded) && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Children overlay */}
      {children && (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-end">
          {children}
        </div>
      )}
    </div>
  );
}

export default ChromaticImage;

