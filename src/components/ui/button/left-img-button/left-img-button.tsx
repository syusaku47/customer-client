import React, { useMemo } from 'react';
import { Button } from '../button';
import { ButtonProps } from '../button.type';
import './left-img-button.scss';

type Props = {
  label: string;
  iconSrc: string | string[];
  iconSrcOn?: string | string[];
  /** 任意文字列の場合string Valueの場合true */
  title?: string | boolean;
} & Omit<ButtonProps, 'title'>;

export const LeftImgButton = (props: Props) => {
  const {
    label,
    iconSrc,
    iconSrcOn,
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
      className={`leftImgButton ${className}`}
      size={size}
      color={color}
      radius={radius}
      title={tip}
    >
      <>
        <div className="leftImgButton__img_wrapper img_wrapper">
          {Array.isArray(iconSrc)
            ? iconSrc.map((v, i) => (
              <img key={`img${i}`} src={v} alt="" />
            ))
            : (<img src={iconSrc} alt="" />)}
        </div>
        <div className="leftImgButton__img_wrapper img_wrapper on">
          {Array.isArray(iconSrcOn)
            ? iconSrcOn.map((v, i) => (
              <img key={`img${i}`} src={v} alt="" />
            ))
            : (<img src={iconSrcOn} alt="" />)}
        </div>
        <div className="leftImgButton__label">
          {label}
        </div>
      </>
    </Button>
  );
};
