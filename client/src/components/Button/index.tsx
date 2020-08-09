/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { buttonStyle } from './styles';

export enum ButtonType {
  DEFAULT = 'default',
  INVISIBLE = 'invisible',
  OUTLINE = 'outline',
}

interface ButtonProps {
  active?: boolean;
  buttonType?: string;
  disabled?: boolean;
  icon?: string;
  label: string;
  onClick: () => void;
  title?: string;
  type?: ButtonType;
}

const Button = ({ active, buttonType = 'button', disabled, icon, label, onClick, title, type }: ButtonProps) => (
  <button
    css={buttonStyle((active = false), (disabled = false), (type = 'default'))}
    disabled={disabled}
    //type={buttonType}
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
