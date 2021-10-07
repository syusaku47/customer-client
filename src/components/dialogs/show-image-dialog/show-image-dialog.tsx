import './show-image-dialog copy.scss';

type Props = {
  src: string,
}

export const ShowImageDialog = (props: Props) => {
  const { src } = props;

  return (
    <div className="show_image_dialog">
      <img src={src} alt="" />
    </div>
  );
};
