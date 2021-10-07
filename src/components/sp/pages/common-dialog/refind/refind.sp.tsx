import React from 'react';
import { useDispatch } from 'react-redux';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { Button } from '../../../../ui/button/button';
import './refind.sp.scss';

export const reFindDialogTitle = '絞込み';

type Props = {
  callback: () =>void;
  children: globalThis.JSX.Element;
}

export const RefindSP = (props: Props) => {
  const dispatch = useDispatch();
  const { callback, children } = props;

  return (
    <>
      <div className="base_dialog_content_inner_body refind_body">
        {children}
      </div>
      <footer className="base_dialog_content_inner_footer refind_footer">
        <Button
          size="md"
          color="primary"
          onClick={callback}
        >絞込み
        </Button>
        <Button
          size="md"
          color="dark"
          onClick={() => dispatch(DialogActions.pop())}
        >キャンセル
        </Button>
      </footer>
    </>
  );
};
