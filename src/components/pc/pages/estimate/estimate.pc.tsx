import './estimate.pc.scss';
import { useDispatch, useSelector } from 'react-redux';
import { goBack } from 'connected-react-router';
import { useCallback, useEffect, useState } from 'react';
import { isEqual } from 'lodash';
import { BasePagePC } from '../base.page.pc';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { EstimateListPC } from '../../layout/body/list/estimate-list/estimate-list.pc';
import { EstimateSearchBox } from '../../layout/search-box/estimate/estimate-search-box';
import { PrintType, PrintPreview } from '../../../dialogs/print-preview/print-preview';
import { EstimateEditPC } from './edit/estimate-edit.pc';
import { LeftIconButton } from '../../../ui/button/left-icon-button/left-icon-button';
import { State } from '../../../../redux/root.reducer';
import { EstimateActions } from '../../../../redux/estimate/estimate.action';
import { useWillUnMount } from '../../../../hooks/life-cycle';
import { EstimateListType } from '../../../../type/estimate/estimate.type';
import { BillEdit } from '../../../dialogs/bill-edit/bill-edit';

export const EstimatePC = () => {
  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => (state.estimate.sort), isEqual);

  const [estimate, setEstimate] = useState<EstimateListType | null>(null);

  /* Callback */
  const getList = useCallback(() => {
    dispatch(EstimateActions.api.estimate.getList({
      param: {
        field_name: sortState.field_name,
        project_name: sortState.project_name,
        sales_shop: sortState.sales_shop,
        is_order_project: sortState.is_order_project,
        sales_contact: sortState.sales_contact,
        quote_creator: sortState.quote_creator,
        offset: sortState.offset,
        limit: sortState.limit,
        sort_by: sortState.sort_by,
        highlow: sortState.highlow,
      },
    }));
  },
  [sortState]);

  const handleClickNew = useCallback(
    () => {
      let editId = NaN;
      dispatch(DialogActions.push({
        title: '見積新規登録',
        className: 'estimate max_height_dialog max_width_dialog',
        onCloseClick: () => {
          if (editId) {
            dispatch(EstimateActions.api.id.delete({ project_id: editId }));
          }
        },
        element: <EstimateEditPC
          callback={() => getList()}
          closeCallback={(v) => { editId = v; }}
        />,
      }));
    }, [dispatch, sortState],
  );

  const handleClickPrint = (type: PrintType) => {
    if (estimate) {
      dispatch(EstimateActions.api.estimate.get({
        param: { id: estimate.id },
        callback: (v) => {
          dispatch(DialogActions.push({
            title: '見積書印刷プレビュー',
            className: 'auto_height_dialog',
            element: <PrintPreview
              type={type}
              data={{}}
              estimate={v}
              estimateListData={estimate}
            />,
          }));
        },
      }));
    }
  };

  const handleClickBillRegist = useCallback(() => {
    if (estimate) {
      dispatch(DialogActions.push({
        title: '請求登録',
        // className: 'auto_height_dialog',
        element: <BillEdit
          estimate={estimate}
          callback={() => { }}
        />,
      }));
    }
  }, [estimate]);

  useEffect(() => {
    getList();
  }, [sortState.highlow, sortState.sort_by]);

  useWillUnMount(() => {
    dispatch(EstimateActions.setSort(null));
  });

  return (
    <BasePagePC className="EstimatePC">
      <div id="estimate" className="cnt_area">
        <div className="inner">
          <EstimateSearchBox callback={getList} />
          <EstimateListPC handleCardClick={setEstimate} />
        </div>
      </div>
      <footer className="btn_area">
        <div className="left_box">
          <LeftIconButton
            label="見積新規作成"
            size="md"
            fontAwesomeClass="fas fa-edit"
            className="btn_search for_detail"
            color="primary"
            onClick={handleClickNew}
          />
          <LeftIconButton
            label="見積書印刷"
            fontAwesomeClass="fas fa-calculator"
            size="md"
            color="secondary"
            disabled={!estimate}
            onClick={() => handleClickPrint('estimate')}
          />
          <LeftIconButton
            label="見積書印刷（社内用）"
            fontAwesomeClass="fas fa-calculator"
            size="md"
            color="secondary"
            disabled={!estimate}
            onClick={() => handleClickPrint('estimateIn')}
          />
          <LeftIconButton
            label="請求書印刷（簡易版）"
            fontAwesomeClass="fas fa-file-invoice"
            size="md"
            color="secondary"
            disabled={!estimate}
            onClick={() => handleClickPrint('claim')}
          />
          <LeftIconButton
            label="請求書印刷（明細付）"
            fontAwesomeClass="fas fa-file-invoice"
            size="md"
            color="secondary"
            disabled={!estimate}
            onClick={() => handleClickPrint('claimIn')}
          />
          <LeftIconButton
            label="請求登録"
            fontAwesomeClass="fas fa-edit"
            size="md"
            color="secondary"
            disabled={!estimate}
            onClick={handleClickBillRegist}
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
