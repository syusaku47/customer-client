import { IconButtonProps } from './icon-button.type';
import './icon-button.scss';
import { Button } from '../button';

type Props = {
  title?: string
} & Omit<IconButtonProps, 'title'>

export const IconButton = (props: Props) => {
  const {
    fontAwesomeClass, onClick, disabled, className, size, color, title, style,
  } = props;

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={`icon_button ${className || ''}`}
      size={size}
      color={color}
      title={title}
      style={style}
    >
      <i className={`icon_button__icon ${fontAwesomeClass}`} />
    </Button>
  );
};
