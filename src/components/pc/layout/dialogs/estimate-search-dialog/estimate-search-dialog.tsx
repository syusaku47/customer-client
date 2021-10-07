import { useDispatch, useSelector } from 'react-redux';
import {
  useCallback, useEffect, useState,
} from 'react';
import { cloneDeep } from 'lodash';
import isEqual from 'lodash/isEqual';
import { EditPC } from '../../../../dialogs/edit/edit.pc';
import { Button } from '../../../../ui/button/button';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { EstimateSearch } from './search/estimate-search';
import { MeisaiListInDialog } from './meisai-list-in-dialog/meisai-list-in-dialog';
import { EstimateActions } from '../../../../../redux/estimate/estimate.action';
import { EstimateListType } from '../../../../../type/estimate/estimate.type';
import { State } from '../../../../../redux/root.reducer';
import { useWillUnMount } from '../../../../../hooks/life-cycle';
import { EstimateListInSearch } from './estimate-list-in-search';
import { EstimateMeisaiListType } from '../../../../../type/estimate/estimate-meisai.type';
import { SystemActions } from '../../../../../redux/system/system.action';

type Props = {
  closeCallback: () => void;
  estimateId: number;
}

export const EstimateSearchDialog = (props:Props) => {
  const { closeCallback, estimateId } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => state.estimate.estimateSearchSort, isEqual);

  /* State */
  const [selectRow, setSelectRow] = useState<EstimateListType[] | null>(null);
  const [list, setList] = useState<EstimateListType[]>([]);
  const [selectMeisaiList, setSelectMeisaiList] = useState<EstimateMeisaiListType[]>([]);

  /* Callback */
  /* 見積一覧取得 */
  const getList = useCallback(() => {
    dispatch(EstimateActions.api.estimate.getList({
      param: {
        project_name: sortState.project_name,
        customer_name: sortState.customer_name,
        detail: sortState.detail,
        quote_creator: sortState.quote_creator,
        construction_parts: sortState.construction_parts?.getSendData(),
        limit: 9999,
        filter_by: sortState.filter_by,
        highlow: sortState.highlow,
      },
      callback: setList,
    }));
  }, [sortState]);

  /* 選択明細追加 */
  const handleClickAdd = useCallback(() => {
    if (selectMeisaiList.length && estimateId) {
      dispatch(EstimateActions.api.meisai.postList({
        param: {
          id: estimateId,
          detail_id: selectMeisaiList.map((v) => (v.id)),
        },
        onSuccess: () => {
          closeCallback();
        },
      }));
    }
  },
  [selectMeisaiList, closeCallback, selectRow, estimateId]);

  /* 過去見積から明細コピー */
  const handleClickCopy = useCallback(() => {
    if (selectRow && estimateId) {
      dispatch(SystemActions.isLoading(true));
      dispatch(EstimateActions.api.meisai.getList({
        param: {
          id: selectRow[0].id,
        },
        callback: (data) => {
          dispatch(EstimateActions.api.meisai.postList({
            param: {
              id: estimateId,
              detail_id: data.map((v) => (v.id)),
            },
            onSuccess: () => {
              dispatch(SystemActions.isLoading(false));
              closeCallback();
            },
            onError: () => {
              dispatch(SystemActions.isLoading(false));
            },
          }));
        },
      }));
    }
  },
  [closeCallback, estimateId, selectRow]);

  /* Effect */
  /* 一覧取得 */
  useEffect(() => {
    getList();
    return () => {
      setList([]);
    };
  }, [sortState.highlow, sortState.filter_by]);

  useWillUnMount(() => {
    dispatch(EstimateActions.setMeisaiSideMenu(null));
  });

  return (
    <EditPC
      mode="dialog"
      buttonArea={(
        <>
          <div className="left_box">
            <Button
              size="md"
              color="secondary"
              onClick={handleClickCopy}
              disabled={!selectRow}
            >
              明細を複写して見積一括追加
            </Button>
          </div>
          <div className="center_box">
            <Button
              size="md"
              color="dark"
              onClick={() => dispatch(DialogActions.pop())}
            >
              閉じる
            </Button>
          </div>
          <div className="right_box">
            <Button
              size="md"
              color="secondary"
              disabled={!selectMeisaiList.length}
              onClick={handleClickAdd}
            >
              選択明細追加
            </Button>
          </div>
        </>
      )}
    >
      <div className="EstimateSearchDialog">
        <section className="left_box">
          <EstimateSearch callback={getList} />
          <EstimateListInSearch
            list={list}
            callback={(v) => setSelectRow([v])}
          />
        </section>
        <MeisaiListInDialog
          estimateId={estimateId ?? undefined}
          selectEstimate={selectRow ? selectRow[0] : null}
          callback={(v) => {
            setSelectMeisaiList(cloneDeep(v));
          }}
        />
      </div>
    </EditPC>
  );
};
