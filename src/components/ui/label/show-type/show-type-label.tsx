import './show-type-label.scss';

type Props = {
  label: string;
  showTypeImg: string;
  className: string;
};

export const ShowTypeLabel = (props: Props) => {
  const { label, showTypeImg, className } = props;

  return (
    <div className={`show_type_label ${className}`}>
      <img src={showTypeImg} alt="" />
      <span>{label}</span>
    </div>
  );
};
