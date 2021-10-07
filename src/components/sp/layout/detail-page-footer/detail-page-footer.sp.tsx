import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { State } from '../../../../redux/root.reducer';
import { openTel } from '../../../../utilities/open-tel';
import { webShareApi } from '../../../../utilities/web-share';
import { Button } from '../../../ui/button/button';
import { IconButton } from '../../../ui/button/icon-button/icon-button';
import { SupportHistoryEditSP } from '../../pages/support-history/edit/support-history-edit.sp';
import { SupportHistoryEditDialogTitle } from '../../pages/support-history/edit/support-history-edit.type';
import './detail-page-footer.sp.scss';

type Props = {
  tel?: string
  url?: string;
  type: 'customer' | 'project';
}

export const DetailPageFooterSP = (props: Props) => {
  const { tel, url, type } = props;
  const dispatch = useDispatch();
  const { project } = useSelector((state: State) => state.project);
  const customer = useSelector((state:State) => state.customer.customer);

  /* Callback */
  const handleClickShare = useCallback(
    () => {
      webShareApi({
        url: url || 'https://www.marietta.co.jp/',
        callbackError: () => {
          dispatch(DialogActions.pushMessage({
            title: '',
            message: ['お使いのブラウザは対応しておりません'],
          }));
        },
      });
    },
    [webShareApi, dispatch],
  );

  const handleClickTel = useCallback(() => {
    const name = type === 'project' ? project?.customer_name : customer?.name;
    dispatch(DialogActions.pushMessage({
      title: '',
      message: [`${name}宛に電話をかけます`],
      label: 'はい',
      isCancel: true,
      cancelLabel: 'いいえ',
      callback: () => {
        dispatch(DialogActions.push({
          title: SupportHistoryEditDialogTitle.add,
          element: <SupportHistoryEditSP
            mode="add"
            projectData={type === 'project' ? project || undefined : undefined}
            customerData={type === 'customer' ? customer || undefined : undefined}
          />,
        }));
        openTel({ tel: tel || '' });
      },
    }));
  }, [tel, project, customer]);

  const handleClickUpload = useCallback(() => {
    dispatch(DialogActions.pushReady());
  }, [dispatch]);

  const handleRegistrationSupport = useCallback(() => {
    dispatch(DialogActions.push({
      title: SupportHistoryEditDialogTitle.add,
      element: <SupportHistoryEditSP mode="add" />,
    }));
  }, [dispatch]);

  return (
    <div className="detail_page_footer page_body_footer">
      <div className="detail_page_footer_col">
        <IconButton
          fontAwesomeClass="fas fa-share-alt"
          onClick={handleClickShare}
          size="md"
          color="primary"
        />
        <IconButton
          fontAwesomeClass="fas fa-phone"
          onClick={handleClickTel}
          size="md"
          color="primary"
          disabled={!tel}
        />
        <IconButton
          fontAwesomeClass="fas fa-file-upload"
          onClick={handleClickUpload}
          size="md"
          color="primary"
        />
      </div>
      <div className="detail_page_footer_col">
        <Button
          onClick={handleRegistrationSupport}
          size="md"
          color="primary"
        >対応登録
        </Button>
      </div>
    </div>
  );
};
