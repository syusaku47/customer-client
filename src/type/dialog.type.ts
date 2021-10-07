import { ModalProps } from 'semantic-ui-react';
import { ButtonStyleProps } from '../components/ui/button/button.type';
import { DisplayElements } from './display-elements.type';

export type DialogBtnProps = {
  label?: string;
  callback: () => void;
  isCancel?: boolean;
} & ButtonStyleProps

export type MessageDialog = {
  messages: string[];
  btnProps?: DialogBtnProps[];
}

export type DialogProps = {
  title?: string;
  callback?: () => void;
  messageType?: MessageDialog;
  element?: DisplayElements;
  onCloseClick?: () => void;
} & ModalProps;
