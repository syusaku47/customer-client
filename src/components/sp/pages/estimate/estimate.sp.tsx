import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { isEqual } from 'lodash';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { LeftIconButton } from '../../../ui/button/left-icon-button/left-icon-button';
import { EstimateListSP } from '../../layout/body/list/estimate/estimate-list';
import { BasePageSP } from '../base.page.sp';
import { EstimateEditSP } from './edit/estimate-edit.sp';
import { EstimateSearchBoxSP } from './serch-box/estimate-search-box.sp';
import { useWillUnMount, useDidMount } from '../../../../hooks/life-cycle';
import { EstimateActions } from '../../../../redux/estimate/estimate.action';
import { EstimateSortState } from '../../../../type/estimate/estimate.type';
import { State } from '../../../../redux/root.reducer';

export const EstimateSP = () => {
  const dispatch = useDispatch();

  const sortState = useSelector((state: State) => (state.estimate.sort), isEqual);

  const getList = useCallback((v?: EstimateSortState) => {
    const data = v || sortState;
    dispatch(EstimateActions.api.estimate.getList({
      param: {
        field_name: data.field_name,
        project_name: data.project_name,
        sales_shop: data.sales_shop,
        is_order_project: data.is_order_project,
        sales_contact: data.sales_contact,
        quote_creator: data.quote_creator,
        limit: 99999,
        highlow: 1,
      },
    }));
  }, [sortState]);

  const handleClickNew = useCallback(() => {
    const editId = NaN;
    dispatch(DialogActions.push({
      title: '見積新規登録',
      className: 'estimate max_height_dialog',
      onCloseClick: () => {
        if (editId) {
          dispatch(EstimateActions.api.id.delete({ project_id: editId }));
        }
      },
      element: <EstimateEditSP
        mode="add"
        // closeCallback={(v) => { editId = v; }}
        // callback={getList}
      />,
    }));
  }, [dispatch, sortState]);

  useDidMount(() => {
    getList();
  });

  useWillUnMount(() => {
    dispatch(EstimateActions.setSort(null));
    dispatch(EstimateActions.setList([]));
  });

  return (
    <BasePageSP
      className="estimate_sp"
      searchBoxDialog={{
        title: '詳細検索',
        element: <EstimateSearchBoxSP
          callback={(v) => {
            getList(v);
            dispatch(DialogActions.pop());
          }}
        />,
      }}
    >
      <div id="estimate_sp_header" className="map_list_header">
        <span>見積一覧</span>
      </div>
      <div className="map_list_body">
        <EstimateListSP />
      </div>
      <div id="estimate_sp_footer" className="page_body_footer">
        <LeftIconButton
          fontAwesomeClass="fas fa-edit"
          label="見積新規登録"
          onClick={handleClickNew}
          size="md"
          color="primary"
        />

      </div>
    </BasePageSP>
  );
};
