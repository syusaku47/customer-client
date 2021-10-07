import './export-csv.scss';
import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { goBack } from 'connected-react-router';
import { BasePagePC } from '../base.page.pc';
import { SideMenu } from '../master/side-menu/side-menu';
import { ExportCsvCollection } from '../../../../collection/export-csv/export-csv.collection';
import { LeftIconButton } from '../../../ui/button/left-icon-button/left-icon-button';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { CsvCustomer } from './body/customer/csv-customer';
import { CsvBirthday } from './body/birthday/csv-birthday';
import { CsvWedding } from './body/wedding/csv-wedding';
import { CsvProject } from './body/project/csv-project';
import { CsvOrder } from './body/order/csv-order';
import { CsvNonOrder } from './body/non-order/csv-non-order';
import { CsvLostOrder } from './body/lost-order/csv-lost-order';
import { CsvMaintenance } from './body/maintenance/csv-maintenance';
import { CsvCustomerRank } from './body/customer-rank/csv-customer-rank';
import { CsvSupportHistory } from './body/support-history/csv-support-history';

export const ExportCsv = () => {
  const dispatch = useDispatch();

  /* State */
  const [sideMenuType, setSideMenuType] = useState(0);

  /* useCallback */
  const handleClickSideMenu = useCallback(
    (type: number) => {
      setSideMenuType(type);
    },
    [],
  );

  /* useEffect */
  useEffect(() => {
    window.console.log('sidemenu   : ', sideMenuType);
  }, [sideMenuType]);

  return (
    <BasePagePC>
      <div id="export_csv" className="cnt_area">
        <div className="inner">
          <SideMenu
            list={ExportCsvCollection.sideMenu}
            callback={handleClickSideMenu}
            activeId={sideMenuType}
          />
          <div className="main_cnt">
            {!sideMenuType && <CsvCustomer callback={() => {}} />}
            {sideMenuType === 1 && <CsvBirthday callback={() => {}} />}
            {sideMenuType === 2 && <CsvWedding callback={() => {}} />}
            {sideMenuType === 3 && <CsvProject callback={() => {}} />}
            {sideMenuType === 4 && <CsvOrder callback={() => {}} />}
            {sideMenuType === 5 && <CsvNonOrder callback={() => {}} />}
            {sideMenuType === 6 && <CsvLostOrder callback={() => {}} />}
            {sideMenuType === 7 && <CsvMaintenance callback={() => {}} />}
            {sideMenuType === 8 && <CsvCustomerRank callback={() => {}} />}
            {sideMenuType === 9 && <CsvSupportHistory callback={() => {}} />}
          </div>
        </div>
      </div>
      <footer className="btn_area">
        <div className="left_box">
          <LeftIconButton
            label="CSV出力"
            size="md"
            fontAwesomeClass="fas fa-file-csv"
            className="btn_search for_detail"
            color="primary"
            onClick={() => dispatch(DialogActions.pushReady())}
          />
        </div>
        <div className="right_box">
          <LeftIconButton
            label="戻る"
            fontAwesomeClass="fas fa-arrow-left"
            size="md"
            color="dark"
            onClick={() => dispatch(goBack())}
          />
        </div>
      </footer>
    </BasePagePC>
  );
};
