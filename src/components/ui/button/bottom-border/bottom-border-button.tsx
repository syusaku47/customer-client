import { DetailedHTMLProps, HTMLAttributes } from 'react';

type Props = {
  label: string;
  animation?: boolean;
  selected?: boolean;
  icon?: globalThis.JSX.Element
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const BottomBorderButton = (props: Props) => {
  const {
    label, animation, selected, onClick, icon, ...defaultProps
  } = props;

  return (
    <div
      key={defaultProps.key}
      className={`bottom_border_button bottom_border_box ${animation ? 'animation' : ''} ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {icon && icon}
      <span className="bottom_border_button__label">{label}</span>
    </div>
  );
};

BottomBorderButton.defaultProps = { animation: true, selected: false };
