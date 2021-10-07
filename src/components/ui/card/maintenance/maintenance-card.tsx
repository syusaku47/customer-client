import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import maintenance_completed from '../../../../asset/images/icon_maintenance_completed.svg';
import maintenance_started from '../../../../asset/images/icon_maintenance_started.svg';
import { MapActions } from '../../../../redux/map/map.action';
import { MaintenanceList } from '../../../../type/maintenance/maintenance.type';
import { joinStr } from '../../../../utilities/join-str';
import { UserAgent } from '../../../../utilities/user-agent';
import { RectLabel } from '../../label/rect-label/rect-label';
import { ShowTypeLabel } from '../../label/show-type/show-type-label';
import './maintenance-card.scss';

type Props = {
  maintenanceData: MaintenanceList,
  className?: string,
  onClick?: (id: number) => void;
  isInCustomerDetail?: boolean;
}

export const MaintenanceCard = (props: Props) => {
  // const dispatch = useDispatch();

  const {
    maintenanceData, className, onClick, isInCustomerDetail,
  } = props;

  const dispatch = useDispatch();

  /* callback */
  const handleClickMaintenanceDetail = useCallback(
    () => {
      if (onClick) {
        onClick(maintenanceData.id);
      }
      dispatch(MapActions.setGpsStatus('out'));
      dispatch(MapActions.setZoomLevel(20));
    }, [onClick, maintenanceData.id],
  );
  // const baseClassName = 'maintenance_card';
  // const status = '';
  // const img = '';
  // const pClassName = '';
  const cRankColor = '#1451a1';

  return (
    <>
      {UserAgent === 'sp'
        ? (
          <div
            id="maintenance_card"
            className={`maintenance_card ${UserAgent} card_base ${className || ''}`}
            onClick={handleClickMaintenanceDetail}
          >
            <div className="card_base_row">
              <div className="card_base_row__col_left">
                {!isInCustomerDetail && (
                <div className="card_info_item">
                  <div className="card_info_item__head">
                    顧客名
                  </div>
                  <div className="card_info_item__text emphasis">
                    {maintenanceData.customer_name || '---'}
                  </div>
                </div>
                )}

                <div className="card_info_item">
                  <div className="card_info_item__head">
                    件名
                  </div>
                  <div className="card_info_item__text important">
                    {maintenanceData.title || '---'}
                  </div>
                </div>

                <div className="card_info_item">
                  <div className="card_info_item__head">
                    住所
                  </div>
                  <div className="card_info_item__text">
                    {`〒${joinStr(maintenanceData.post_no, 3, '-') || '---'}`}<br />
                    {maintenanceData.customer_place || '---'}
                  </div>
                </div>

                <div className="card_info_item">
                  <div className="card_info_item__head">
                    TEL
                  </div>
                  <div className="card_info_item__text">
                    {maintenanceData.tel_no || '---'}
                  </div>
                </div>

                <div className="card_info_item">
                  <div className="card_info_item__head">
                    担当者
                  </div>
                  <div className="card_info_item__text emphasis">
                    {maintenanceData.project_representative || '---'}
                  </div>
                </div>

              </div>
              <div className="card_base_row__col_right">
                <div>
                  <ShowTypeLabel
                    label={maintenanceData.fixed_flag === false ? '未対応' : '対応済'}
                    showTypeImg={maintenanceData.fixed_flag === false
                      ? maintenance_started : maintenance_completed}
                    className={maintenanceData.fixed_flag === false
                      ? 'maintenance_started' : 'maintenance_completed'}
                  />

                  <RectLabel
                    label={maintenanceData.customer_rank_name || 'ランクなし'}
                    bgColor={maintenanceData.customer_rank_name ? cRankColor : 'gray'}
                  />
                </div>
                {/* <div className={maintenanceData.fixed_flag ? '' : 'invisible'}>
            <RectLabel label="対応済" />
          </div> */}
              </div>
              {/*
         <div className="row1_col3">
          <div className="thumb google" />
        </div>
        */}
            </div>
          </div>
        )
        : (
          <div
            id="maintenance_card"
            className={`maintenance_card ${UserAgent} card_base ${className || ''}`}
            onClick={handleClickMaintenanceDetail}
          >
            <div className="important">{`${maintenanceData.title || '---'}`}</div>
            <div className="row1 card_base_row">
              <div className="row1_col1 card_base_col">
                <div className="emphasis">顧客名：{`${maintenanceData.customer_name || '---'}`/* （${maintenanceData.furigana}）*/}</div>
                <div>
                  {`〒${joinStr(maintenanceData.post_no, 3, '-') || '---'}`}<br />
                  {maintenanceData.customer_place || '---'}
                </div>
              </div>
              <div className="row1_col2">
                <ShowTypeLabel
                  label={maintenanceData.fixed_flag === false ? '未対応' : '対応済'}
                  showTypeImg={
                maintenanceData.fixed_flag
                === false ? maintenance_started : maintenance_completed
              }
                  className={
                  maintenanceData.fixed_flag === false ? 'maintenance_started' : 'maintenance_completed'
                }
                />
                <RectLabel
                  label={maintenanceData.customer_rank_name || 'ランクなし'}
                  bgColor={maintenanceData.customer_rank_name ? cRankColor : 'gray'}
                />
                {/* <div className={maintenanceData.fixed_flag ? '' : 'invisible'}>
                    <RectLabel label="対応済" />
                </div> */}
              </div>
            </div>
            <div className="row2 card_base_row">
              <div className="row2_col1 tel_no">TEL：{maintenanceData.tel_no || '---'}</div>
              <div className="row2_col2 sales_contact">担当者：{maintenanceData.project_representative || '---'}</div>
            </div>
          </div>
        )}
    </>
  );
};
