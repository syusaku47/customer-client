// import {ApiLogin} from '../../api/auth/api-login';
import actionCreatorFactory from 'typescript-fsa';
import { DialogProps, DialogBtnProps } from '../../type/dialog.type';

const ActionCreator = actionCreatorFactory('dialog');

export const DialogActions = {
  push: ActionCreator<DialogProps>('push'),
  pushReady: ActionCreator('push/ready'),
  pushMessage: ActionCreator<{
    title: string;
    message: string[];
    isCancel?: true;
    cancelLabel?: string;
    label?: string;
    callbackClose?:() => void;
    callback?:() => void; // ボタンがOKのみのCallback
    option?:{
      btnProps?: DialogBtnProps[];
      beforeClear?: boolean;
    };
      }>('push/message'),
  pop: ActionCreator('pop'),
  clear: ActionCreator('clear'),
  isLoading: ActionCreator<boolean>('is/loading'),
  setIsLoading: ActionCreator<boolean>('set/is/loading'),
  resetState: ActionCreator('reset/state'),
};
