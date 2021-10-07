import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { FileListType } from '../../../../type/file/file.type';
import { Button } from '../../button/button';
import './file-card.scss';
import dummyImg from '../../../../asset/images/noimage.svg';
import { ShowImageDialog } from '../../../dialogs/show-image-dialog/show-image-dialog';
import { UserAgent } from '../../../../utilities/user-agent';
import { StreetViewImg } from '../../street-view-img/street-view-img';

type Props = {
    onClick: (id:number)=>void,
    fileData: FileListType,
    className?: string,
    isInCustomerDetail?: boolean;
  }

export const FileCard = (props: Props) => {
  const dispatch = useDispatch();
  const ref = React.createRef();
  const {
    onClick, fileData, className, isInCustomerDetail,
  } = props;

  /* Callback */
  const handleClickCustomerDetail = useCallback(
    () => {
      onClick(fileData.id);
    }, [onClick],
  );

  return (
    <div
      className={`file_card ${UserAgent} card_base ${className || ''}`}
      onClick={(e) => {
        if (e.target === ref.current) {
          return;
        }
        handleClickCustomerDetail();
      }}
    >

      <div className="card_base_row">
        <div className="card_base_row__col_left">
          <div className="card_info_item">
            {/* <div className="card_info_item__head">
              ファイル名
            </div> */}
            <div className="card_info_item__text important">
              {`${fileData.file_name || '---'}`}
            </div>
          </div>

          {!isInCustomerDetail
          && (
          <div className="card_info_item">
            <div className="card_info_item__head">
              顧客名
            </div>
            <div className="card_info_item__text">
              {`${fileData.customer_name || '---'}${fileData.furigana ? `（${fileData.furigana}）` : '---'}`}
            </div>
          </div>
          )}

          <div className="card_info_item">
            <div className="card_info_item__head">
              案件名
            </div>
            <div className="card_info_item__text">
              {fileData.project_name || '---'}
            </div>
          </div>

          <div className="card_info_item">
            <div className="card_info_item__head">
              更新日
            </div>
            <div className="card_info_item__text">
              {fileData.upload_date || '---'}
            </div>
          </div>

          <div className="card_info_item">
            <div className="card_info_item__head">
              更新者
            </div>
            <div className="card_info_item__text">
              {fileData.updater || '---'}
            </div>
          </div>

        </div>

        <div className="card_base_row__col_right">
          <div className="numero">{fileData.no ? `No.${fileData.no}` : '---'}</div>
          <div className="thumb google">
            {/* TODO front StreetViewImg のprops調整 */}
            <StreetViewImg isShow lat={0} lng={0} />
          </div>
          <div className={fileData?.format === ('jpg' || 'png') ? '' : 'invisible'}>
            <Button
              size="sm"
              color="secondary"
              onClick={() => {
                dispatch(DialogActions.push({
                  title: '画像表示',
                  element: <ShowImageDialog src={fileData.icon_thumbnail || dummyImg} />,
                }));
              }}
              ref={ref}
            >表示
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
