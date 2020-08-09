/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import { icon } from './styles';

interface IconProps {
  hoverable: boolean;
  name: string;
  onClick: () => void;
  size: number;
}

const Icon = ({ hoverable, name, onClick, size = 24 }: IconProps): React.ReactNode => (
  <ion-icon name={name} css={icon(size)} onClick={onClick} />
);

export default Icon;
