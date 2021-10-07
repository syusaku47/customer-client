import './rect-label.scss';

type Props = {
  label: string;
  color?: string;
  bgColor?: string;
};

export const RectLabel = (props: Props) => {
  const { label, color, bgColor } = props;

  return (
    <span className={`rect_label rect_${label}`} style={{ color, backgroundColor: bgColor }}>
      {label}
    </span>
  );
};

RectLabel.defaultProps = { color: '#ffffff', bgColor: '#1451a1' };
