import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import { useDidMount } from '../../hooks/life-cycle';
import { DialogActions } from '../../redux/dialog/dialog.action';
import { State } from '../../redux/root.reducer';
import { DialogProps } from '../../type/dialog.type';
import { ConvertLineFeed } from '../../utilities/line-feed-conversion';
import { noPinch } from '../../utilities/no-pinch';
import { UserAgent } from '../../utilities/user-agent';
import { Button } from '../ui/button/button';
import './dialog.scss';

export const ready = () => {
  const dispatch = useDispatch();
  dispatch(DialogActions.pushReady());
};

export const BaseDialog = (props: DialogProps & {isTop:boolean, dialogIndex: number}) => {
  const dispatch = useDispatch();
  const [modalHeight, setModalHeight] = useState<number>(0);
  const [modalHeaderHeight, setModalHeaderHeight] = useState<number>(0);
  const [modalContentHeight, setModalContentHeight] = useState<number>(0);
  const ele = useRef<HTMLDivElement>(null);

  const {
    title,
    element,
    className,
    messageType,
    isTop,
    size,
    onCloseClick,
    dialogIndex,
  } = props;

  // const [isOpen, setIsOpen] = useState(true);

  const handleClickClose = useCallback(
    () => {
      if (onCloseClick) onCloseClick();
      dispatch(DialogActions.pop());
    },
    [dispatch],
  );

  useEffect(() => {
    // if (!isOpen) { handleClickClose(); }
  }, [/* isOpen */]);

  useEffect(() => {
    setModalContentHeight(modalHeight - modalHeaderHeight);
  }, [modalHeight]);

  // useEffect(() => {
  //   console.log('modalContentHeight >>>>>>>>>>>>>>>>>>>>>', modalContentHeight);
  // }, [modalContentHeight]);

  useEffect(() => {
    const pinchCallback = noPinch(ele.current);
    return pinchCallback;
  }, [ele]);

  useDidMount(() => {
    setModalHeight(document.getElementsByClassName('base_dialog')[dialogIndex].clientHeight);
    if (title) {
      setModalHeaderHeight(document.getElementsByClassName('base_dialog__header')[dialogIndex].clientHeight);
    }
  });

  return (
    <Modal
      open
      // onClose={(e) => {
      //   e.stopPropagation();
      //   handleClickClose();
      //   // setIsOpen(false);
      // }}
      className={`base_dialog ${className} ${UserAgent} ${messageType ? 'message_dialog' : ''}`}
      dimmer={{ className: isTop ? 'top-dimmer' : 'under-dimmer' }}
      size={size || 'large'}
    >
      {title !== undefined && (
      <Modal.Header className="base_dialog__header">
        <>
          <div className="base_dialog__header__title">{title}</div>
          <div className="base_dialog__header__close" onClick={() => handleClickClose()}><i className="fas fa-times" /></div>
        </>
      </Modal.Header>
      )}

      <Modal.Content className="base_dialog_content">
        <div style={{ height: `${modalContentHeight === 0 ? '' : `${modalContentHeight}px`}` }}>
          {messageType ? (
            <div className="message_dialog">
              <div className="message_dialog__message base_dialog_content_inner">
                <ConvertLineFeed className="" text={messageType.messages || []} />
              </div>
              <div className="message_dialog__footer base_dialog_content_inner_footer">
                {messageType.btnProps?.map((v, i) => (
                  <Button
                    key={`btn${i}`}
                    onClick={v.callback}
                    className={v.isCancel ? 'cancel_btn' : ''}
                    size="md"
                    color={v.color || v.isCancel ? 'dark' : 'primary'}
                  >
                    {v.label || 'OK'}
                  </Button>
                ))}
              </div>
            </div>
          )
            : (
              <div className={`base_dialog_content_inner ${UserAgent}`} style={{ height: '100%' }} ref={ele}>{element}</div>
            )}
        </div>
      </Modal.Content>
    </Modal>
  );
};

export const Dialog = () => {
  const dialogs = useSelector((state: State) => state.dialog.dialogs);
  return (
    <>
      {dialogs.map((v, i) => (
        <div key={`dialog${i}`}>
          <BaseDialog
            className={v.className}
            isTop={i === dialogs.length - 1}
            title={v.title}
            messageType={v.messageType}
            element={v.element}
            message={v.messageType?.messages}
            btnProps={v.messageType?.btnProps}
            onCloseClick={v.onCloseClick}
            dialogIndex={i}
          />
        </div>
      ))}
    </>
  );
};
