import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { goBack } from 'connected-react-router';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { MaintenanceActions } from '../../../../redux/maintenance/maintenance.action';
import { State } from '../../../../redux/root.reducer';
import { DateFormatter } from '../../../../utilities/date-formatter';
import { joinStr } from '../../../../utilities/join-str';
import { LeftIconButton } from '../../../ui/button/left-icon-button/left-icon-button';
import { BasePageSP } from '../base.page.sp';
import { MaintenanceEditSP } from '../maintenance/edit/maintenance-edit.sp';
import { MaintenanceEditDialogTitle } from '../maintenance/edit/maintenance-edit.type';
import { MaintenanceSearchBoxSP } from '../maintenance/search-box/maintenance-search-box.sp';
import './maintenance-detail.sp.scss';
import { IconButton } from '../../../ui/button/icon-button/icon-button';
import { openTel } from '../../../../utilities/open-tel';

export const MaintenanceDetailSP = () => {
  /* Hooks */
  const { id } = useParams<{ id: string; }>();
  const maintenanceInfo = useSelector((state: State) => state.maintenance.maintenance);
  const dispatch = useDispatch();

  /* Callback */
  const handleClickEdit = useCallback(() => {
    dispatch(DialogActions.push({
      title: MaintenanceEditDialogTitle.update,
      element: <MaintenanceEditSP
        mode="update"
        id={Number(id)}
        callback={() => {
          dispatch(MaintenanceActions.api.maintenance.get({
            param: {
              id: Number(id),
            },
          }));
        }}
      />,
    }));
  }, [id]);

  /* Effect */
  useEffect(() => {
    dispatch(MaintenanceActions.api.maintenance.get({
      param: {
        id: Number(id),
      },
    }));
  }, [id]);

  const handleClickPhone = useCallback((tel: string | undefined) => {
    if (tel) {
      openTel({ tel });
    }
  }, []);

  return (
    <BasePageSP
      searchBoxDialog={{
        title: '詳細検索',
        element: <MaintenanceSearchBoxSP
          callback={() => {}}
        />,
      }}
      className="maintenance_detail_sp"
    >
      <div className="detail_wrap">
        <div className="detail_header">
          <div
            className="detail_header_inner"
            onClick={() => dispatch(goBack())}
          >
            <div
              className="detail_header_inner__back_btn"
            >
              <i className="fas fa-chevron-circle-left" />
            </div>

            <span>
              メンテナンス詳細
            </span>
          </div>

          <div className="detail_header_buttons">
            <LeftIconButton
              color="secondary"
              size="md"
              onClick={handleClickEdit}
              fontAwesomeClass="fa fa-edit"
              label="メンテナンス詳細編集"
            />
          </div>
        </div>

        <div className="detail_body maintenance_detail_sp__body">

          <div className="row_table_style maintenance_detail_sp__body__table">
            <div className="t_row">
              <div className="t_header">案件ID</div>
              <div className="t_body">{maintenanceInfo?.project_id}</div>
            </div>

            <div className="t_row">
              <div className="t_header">案件名</div>
              <div className="t_body">{maintenanceInfo?.project_name || '---'}</div>
            </div>

            <div className="t_row">
              <div className="t_header">顧客ID</div>
              <div className="t_body">{maintenanceInfo?.customer_id}</div>
            </div>

            <div className="t_row">
              <div className="t_header">顧客名</div>
              <div className="t_body">{maintenanceInfo?.customer_name ? `${maintenanceInfo?.customer_name} 様` : '---'}</div>
            </div>

            <div className="t_row">
              <div className="t_header">顧客住所</div>
              <div className="t_body">
                {maintenanceInfo?.post_no ? `〒${joinStr(maintenanceInfo?.post_no, 3, '-')}` : '---'} <br />
                {maintenanceInfo?.customer_place || '---'}
              </div>
            </div>

            <div className="t_row">
              <div className="t_header">電話番号</div>
              <div className="t_body">{maintenanceInfo?.tel_no || '---'}</div>
              <div>
                <IconButton
                  fontAwesomeClass="fas fa-phone"
                  onClick={() => handleClickPhone(maintenanceInfo?.tel_no)}
                  size="md"
                  color="secondary"
                  disabled={!maintenanceInfo?.tel_no}
                />
              </div>
            </div>

            <div className="t_row">
              <div className="t_header">顧客ランク</div>
              <div className="t_body">{maintenanceInfo?.customer_rank_name || '---'}</div>
            </div>

            <div className="t_row">
              <div className="t_header">対応状況</div>
              <div className="t_body">{maintenanceInfo?.fixed_flag ? '対応済' : '未対応'}</div>
            </div>

            <div className="t_row">
              <div className="t_header">現場名称</div>
              <div className="t_body">{maintenanceInfo?.field_name || '---'}</div>
            </div>

            <div className="t_row">
              <div className="t_header">着工予定日</div>
              <div className="t_body">{DateFormatter.date2str(maintenanceInfo?.construction_start_date) || '---'}</div>
            </div>

            <div className="t_row">
              <div className="t_header">完工予定日</div>
              <div className="t_body">{DateFormatter.date2str(maintenanceInfo?.completion_end_date) || '---'}</div>
            </div>

            <div className="t_row">
              <div className="t_header">着工日</div>
              <div className="t_body">{DateFormatter.date2str(maintenanceInfo?.construction_date) || '---'}</div>
            </div>

            <div className="t_row">
              <div className="t_header">完工日</div>
              <div className="t_body">{DateFormatter.date2str(maintenanceInfo?.completion_date) || '---'}</div>
            </div>

            <div className="t_row">
              <div className="t_header">メンテナンス日</div>
              <div className="t_body">{DateFormatter.date2str(maintenanceInfo?.maintenance_date) || '---'}</div>
            </div>

            <div className="t_row">
              <div className="t_header">対応日</div>
              <div className="t_body">{DateFormatter.date2str(maintenanceInfo?.supported_date) || '---'}</div>
            </div>

            <div className="t_row">
              <div className="t_header">案件担当者</div>
              <div className="t_body">{maintenanceInfo?.project_representative_name || '---'}</div>
            </div>

            <div className="t_row">
              <div className="t_header">担当店舗</div>
              <div className="t_body">{maintenanceInfo?.sales_shop_name || '---'}</div>
            </div>

          </div>

        </div>
      </div>
    </BasePageSP>
  );
};
