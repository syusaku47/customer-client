import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { DialogActions } from '../../../redux/dialog/dialog.action';
import { Button } from '../../ui/button/button';
import './edit.sp.scss';

export type EditType = 'add' | 'update';

type Props = {
  children: HTMLElement | globalThis.JSX.Element,
  mode: EditType;
  callback: () => void,
  isShowSwitch?: boolean
};

export const EditSP = (props: Props) => {
  const {
    children, mode, callback, isShowSwitch,
  } = props;

  const dispatch = useDispatch();

  const footerEle = useRef<HTMLDivElement>(null);
  const [detailFlag, setDetailFlag] = useState(false);
  const [switchHeight, setSwitchHeight] = useState<number>(0);

  const switchEle = useRef<HTMLDivElement>(null);

  const handleClickArrow = useCallback(() => {
    if (detailFlag) {
      setDetailFlag(false);
    } else {
      setDetailFlag(true);
    }
  }, [detailFlag]);

  useEffect(() => {
    setSwitchHeight(switchEle.current?.getBoundingClientRect().height || 0);
    window.console.log('switchEleHeight', switchHeight);
  }, [switchEle, switchHeight]);

  return (
    <>
      <div className={`edit_sp_body ${detailFlag ? 'show_all' : ''}`}>
        {children}
      </div>

      {isShowSwitch && (
        <div className="show_switch" onClick={handleClickArrow} ref={switchEle}>
          <div className="show_switch_inner">
            <i className={`fas fa-angle-double-${detailFlag ? 'up' : 'down'}`} />
            <span>{detailFlag ? '簡易表示' : '全ての項目を表示'}</span>
            <i className={`fas fa-angle-double-${detailFlag ? 'up' : 'down'}`} />
          </div>
        </div>
      )}

      <div className="edit_sp_footer" id="dialog_footer" ref={footerEle}>
        {mode === 'add' ? (
          <>
            <Button size="md" color="primary" onClick={callback}>登録</Button>
            <Button size="md" color="dark" onClick={() => { dispatch(DialogActions.pop()); }}>キャンセル</Button>
          </>
        ) : (<Button size="md" color="primary" onClick={callback}>更新</Button>)}
      </div>
    </>
  );
};
