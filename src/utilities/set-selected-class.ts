/**
 * @param parentEle 選択中の状態を管理したい要素の親要素
*/

export const SetSelectedClass = (
  targetEle: EventTarget,
  parentEle: HTMLElement | null,
) => {
  if (!parentEle) {
    /* TODO 開発終わったら削除 */
    throw Error('親要素が不正です。nullは処理しません。');
    // return;
  }

  const { children } = parentEle;
  const assignName = 'selected';
  /* 初期化 */
  for (let i = 0; i < children.length; i += 1) {
    children[i].classList.remove(assignName);
  }

  /* 選択中クラス付与 */
  for (let i = 0; i < children.length; i += 1) {
    if (children[i] === targetEle) {
      children[i].classList.add(assignName);
    }
  }
};
