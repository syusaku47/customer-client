const disablePinchZoom = (e:TouchEvent | Event) => {
  const event = e as TouchEvent;
  if (event.touches.length > 1) {
    e.preventDefault();
  }
};

/**
 * 引数のDOMをピンチ操作できなくする
 * @param target Ref Element
 * @returns unMount用関数
 */
export const noPinch = (target: HTMLDivElement | HTMLElement | null) => {
  target?.addEventListener('touchmove', disablePinchZoom, { passive: false });
  return () => {
    target?.removeEventListener('touchmove', disablePinchZoom);
  };
};
