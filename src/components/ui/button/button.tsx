import React, { useMemo } from 'react';
import { UserAgent } from '../../../utilities/user-agent';
import './button.scss';
import { ButtonProps } from './button.type';

type Props = {
  children: string | HTMLElement | globalThis.JSX.Element;
  /** 任意文字列の場合string Valueの場合true */
  title?: string | boolean;
} & Omit<ButtonProps, 'title'>;

export const Button = React.forwardRef((props: Props, ref?: any) => {
  const {
    onClick,
    disabled,
    className,
    size,
    color,
    radius,
    children,
    title,
    style,
  } = props;

  const tip = useMemo(() => {
    if (!title) return undefined;
    if (typeof title === 'string') {
      return title;
    }
    if (title && typeof children === 'string') {
      return children;
    }
    return undefined;
  }, [title, children]);

  return (
    <button
      title={tip}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${className || ''} ${size || ''} ${color || ''} ${UserAgent}`}
      style={{ ...style, borderRadius: radius || '' }}
      ref={ref}
    >
      {children}
    </button>
  );
});
