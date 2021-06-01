/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { ButtonHTMLAttributes } from 'react';
import { buttonStyle } from './styles';

export enum ButtonType {
    DEFAULT = 'default',
    INVISIBLE = 'invisible',
    OUTLINE = 'outline',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    buttonType?: 'button' | 'submit' | 'reset' | undefined;
    disabled?: boolean;
    icon?: string;
    label: string;
    onClick: () => void;
    title?: string;
    displayType?: string;
}

const Button = ({
    active = false,
    buttonType = 'button',
    disabled = false,
    icon,
    label,
    onClick,
    title,
    displayType = 'default',
}: ButtonProps) => (
    <button
        css={buttonStyle(active, disabled, displayType)}
        disabled={disabled}
        type={buttonType}
        onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick();
        }}
        title={title || label}
    >
        {label}
        {icon && <i className={`icon ion-md-${icon}`} />}
    </button>
);

export default Button;
