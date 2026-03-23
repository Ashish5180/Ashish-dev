import { FC } from 'react';

interface NavItem {
    label: string;
    link: string;
    ariaLabel?: string;
}

interface SocialItem {
    label: string;
    link: string;
}

interface StaggeredMenuProps {
    position?: 'left' | 'right';
    colors?: string[];
    items?: NavItem[];
    socialItems?: SocialItem[];
    displaySocials?: boolean;
    displayItemNumbering?: boolean;
    className?: string;
    logoText?: string;
    logoUrl?: string;
    menuButtonColor?: string;
    openMenuButtonColor?: string;
    accentColor?: string;
    changeMenuColorOnOpen?: boolean;
    isFixed?: boolean;
    closeOnClickAway?: boolean;
    onMenuOpen?: () => void;
    onMenuClose?: () => void;
}

export declare const StaggeredMenu: FC<StaggeredMenuProps>;
export default StaggeredMenu;
