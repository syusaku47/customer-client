import { cloneDeep, isEqual } from 'lodash';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { ProjectDetailActions } from '../../../../../redux/project-detail/project-detail.action';
import { State } from '../../../../../redux/root.reducer';
import { EstimateSortState } from '../../../../../type/estimate/estimate.type';
import { DatePicker } from '../../../../ui/date-picker/date-picker';
import { Input } from '../../../../ui/input/input';
import { RefindSP } from './refind.sp';

type Props = {
  callback: (sort:EstimateSortState) => void;
}

export const RefindEstimateSP = (props:Props) => {
  const { callback } = props;
  const dispatch = useDispatch();
  const sort = useSelector((state: State) => state.projectDetail.estimateSort, isEqual);
  const [sortState, setSortState] = useState(cloneDeep(sort));

  /* Callback */
  const handleClickSearch = useCallback(() => {
    dispatch(DialogActions.pop());
    callback(sortState);
  }, [callback, sortState]);

  const setState = useCallback((v: EstimateSortState) => {
    setSortState(cloneDeep(v));
    dispatch(ProjectDetailActions.setEstimateSort(v));
  }, [dispatch]);

  return (
    <RefindSP callback={handleClickSearch}>
      <>
        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">見積番号</div>
            <Input
              className=""
              value={sortState.quote_no}
              onChange={(e) => setState({
                ...sortState, quote_no: e.target.value,
              })}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">作成日</div>
            <DatePicker
              date={sortState.quote_date || null}
              onChange={(v) => setState(
                { ...sortState, quote_date: v },
              )}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">見積作成者</div>
            <Input
              className=""
              value={sortState.quote_creator_word}
              onChange={(e) => setState({
                ...sortState, quote_creator_word: e.target.value,
              })}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">見積金額</div>
            <Input
              className=""
              type="number"
              value={sortState.quote_price}
              onChange={(e) => setState({
                ...sortState, quote_price: Number(e.target.value),
              })}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">消費税額（見積）</div>
            <Input
              className=""
              type="number"
              value={sortState.tax_amount_quote}
              onChange={(e) => setState({
                ...sortState, tax_amount_quote: Number(e.target.value),
              })}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">税込合計見積</div>
            <Input
              className=""
              type="number"
              value={sortState.including_tax_total_quote}
              onChange={(e) => setState({
                ...sortState, including_tax_total_quote: Number(e.target.value),
              })}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">原価合計</div>
            <Input
              className=""
              type="number"
              value={sortState.cost_sum}
              onChange={(e) => setState({
                ...sortState, cost_sum: Number(e.target.value),
              })}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">消費税額（原価）</div>
            <Input
              className=""
              type="number"
              value={sortState.tax_amount_cost}
              onChange={(e) => setState({
                ...sortState, tax_amount_cost: Number(e.target.value),
              })}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">税込合計原価</div>
            <Input
              className=""
              type="number"
              value={sortState.including_tax_total_cost}
              onChange={(e) => setState({
                ...sortState, including_tax_total_cost: Number(e.target.value),
              })}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">調整額</div>
            <Input
              className=""
              type="number"
              value={sortState.adjustment_amount}
              onChange={(e) => setState({
                ...sortState, adjustment_amount: Number(e.target.value),
              })}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">見積工期_開始</div>
            <DatePicker
              date={sortState.order_construction_start || null}
              onChange={(v) => setState(
                { ...sortState, order_construction_start: v },
              )}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">見積工期_終了</div>
            <DatePicker
              date={sortState.order_construction_end || null}
              onChange={(v) => setState(
                { ...sortState, order_construction_end: v },
              )}
            />
          </div>
        </div>
      </>
    </RefindSP>
  );
};
