import { Resizable } from 're-resizable';

const VerticalBar = () => (
  <div className="vertical_bar">
    <div>
      <i className="fas fa-bars" />
    </div>
  </div>
);
const HorizontalBar = () => (
  <div className="horizontal_bar">
    <div>
      <i className="fas fa-bars" />
    </div>
  </div>
);

type Props = {
  /** 有効方向 */
  enabled: Partial<{
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  }>,
  /** 対象Component */
  children: HTMLElement | globalThis.JSX.Element;
  maxHeight?: number;
  maxWidth?: number;
  minHeight?: number;
  minWidth?: number;
}

/* 対象のサイズを自由に操作する */
export const Resize = (props: Props) => {
  const {
    enabled,
    children,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
  } = props;
  const {
    top,
    right,
    bottom,
    left,
  } = enabled;

  return (
    <Resizable
      className="resize"
      enable={{ ...enabled }}
      handleComponent={{
        top: top ? <HorizontalBar /> : undefined,
        bottom: bottom ? <HorizontalBar /> : undefined,
        right: right ? <VerticalBar /> : undefined,
        left: left ? <VerticalBar /> : undefined,
      }}
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      minHeight={minHeight}
      minWidth={minWidth}
    >
      {children}
    </Resizable>
  );
};
