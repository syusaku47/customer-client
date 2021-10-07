import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../ui/button/button';
import './edit.pc.scss';
import { DialogActions } from '../../../redux/dialog/dialog.action';

export type EditTypePC = 'dialog' | 'detail';

type Props = {
  mode: EditTypePC;
  label?: string;
  noCancel?: boolean;
  callback?: () => void;
  callbackCancel?: () => void;
  disabled?: boolean;
  children: HTMLElement | globalThis.JSX.Element;
  buttonArea?: globalThis.JSX.Element | HTMLElement;
  className?: string;
};

export const EditPC = (props: Props) => {
  const {
    mode, children, buttonArea, callback, callbackCancel, label, noCancel, disabled, className,
  } = props;

  /* Hooks */
  const footerEle = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  /* State */
  const [footerHeight, setFooterHeight] = useState<number>(0);

  /* Callback */
  const handleClickCancel = useCallback(() => {
    dispatch(DialogActions.pop());
    if (callbackCancel) callbackCancel();
  }, [callbackCancel]);

  /* Effect */
  useEffect(() => {
    setFooterHeight(footerEle.current?.getBoundingClientRect().height || 0);
  }, [footerEle]);

  return (
    <div className="editPc_wrap">
      <div
        className="editPc_body"
        style={{
          height: mode === 'detail' ? '100%' : `calc(100% - ${footerHeight}px)`,
          display: mode === 'detail' ? '' : 'block',
        }}
      >
        {children}
      </div>

      {mode === 'detail' && (
        <div className="btn_box" ref={footerEle}>
          {buttonArea && buttonArea}
          {!buttonArea && (
            <>
              <Button size="md" color="primary" onClick={callback} disabled={disabled}>
                {!label ? '更新' : label}
              </Button>
              {!noCancel && (
                <Button size="md" color="dark" onClick={handleClickCancel}>
                  キャンセル
                </Button>
              )}
            </>
          )}
        </div>
      )}

      {mode === 'dialog' && (
        <div className={`editPc_footer base_footer ${className}`} ref={footerEle}>
          {buttonArea && buttonArea}
          {!buttonArea && (
            <>
              <Button size="md" color="primary" onClick={callback} disabled={disabled}>
                {!label ? '登録' : label}
              </Button>
              {!noCancel && (
              <Button size="md" color="dark" onClick={handleClickCancel}>
                キャンセル
              </Button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

EditPC.defaultProps = {
  noCancel: true,
};
