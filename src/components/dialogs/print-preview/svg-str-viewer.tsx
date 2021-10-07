type Props = {
  str: string,
};

export const SvgStrViewer = (props: Props) => {
  const { str } = props;
  return (
    // eslint-disable-next-line react/no-danger
    <div dangerouslySetInnerHTML={{ __html: str }} />
  );
};
