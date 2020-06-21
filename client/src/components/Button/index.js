/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { func, string, oneOf, bool } from 'prop-types';
import styles from './styles';

const Button = ({
  active,
  buttonType = 'button',
  disabled,
  icon,
  label,
  onClick,
  title,
  type,
}) => (
  <button
    css={styles.button(active, disabled, type)}
    disabled={disabled}
    type={buttonType}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }}
    title={title}
  >
    { label }
    { icon && <i className={`icon ion-md-${icon}`} /> }
  </button>
);

Button.propTypes = {
  active: bool,
  buttonType: string,
  disabled: bool,
  icon: string,
  label: string,
  onClick: func,
  title: string,
  type: oneOf(['default', 'invisible', 'outline']),
};

export default Button;
