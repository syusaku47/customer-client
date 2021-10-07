import { useMemo } from 'react';
import { Button } from '../button';
import { IconButtonProps } from '../icon-button/icon-button.type';
import './left-icon-button.scss';

type Props = {
  label: string;
  /** 任意文字列の場合string Valueの場合true */
  title?: string | boolean;
} & Omit<IconButtonProps, 'ref' | 'title'>

export const LeftIconButton = (props: Props) => {
  const {
    label,
    fontAwesomeClass,
    onClick,
    disabled,
    className,
    size,
    color,
    radius,
    title,
  } = props;

  const tip = useMemo(() => {
    if (!title) return undefined;
    return typeof title === 'string' ? title : label;
  }, [title, label]);

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={`LeftIconButton ${className}`}
      size={size}
      color={color}
      radius={radius}
      title={tip}
    >
      <>
        <i className={`LeftIconButton__icon ${fontAwesomeClass}`} />
        <span>
          {label}
        </span>
      </>
    </Button>
  );
};
