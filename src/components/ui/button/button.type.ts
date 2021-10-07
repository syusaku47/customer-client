import React from 'react';

export type ButtonProps = {}
& React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
& ButtonStyleProps

export type ButtonStyleProps={
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white' | 'default' | 'dark';
  radius?: number
}
