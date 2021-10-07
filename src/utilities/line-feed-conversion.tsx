/**
 * 改行コード変換
 * */
export const ConvertLineFeed = (props: { text: string[]; className?:string }) => {
  const { text, className } = props;
  return (
    <>
      {text.map((v, i) => (
        <div key={i} className={className}>{v}</div>
      ))}
    </>
  );
};

export const LineFeedConversion = (text: string[]) => text.map((v, i) => (
  <div key={i}>{v}</div>
));
