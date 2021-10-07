import { cloneDeep } from 'lodash';
import isEqual from 'lodash/isEqual';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDidMount } from '../../../../../hooks/life-cycle';
import { CustomerDetailActions } from '../../../../../redux/customer-detail/customer-detail.action';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { MasterActions } from '../../../../../redux/master/master.action';
import { State } from '../../../../../redux/root.reducer';
import { ProjectSortState } from '../../../../../type/project/project.type';
import { DatePicker } from '../../../../ui/date-picker/date-picker';
import { Input } from '../../../../ui/input/input';
import { Select } from '../../../../ui/select/select';
import { RefindSP } from './refind.sp';

type Props = {
  callback: (sort:ProjectSortState) => void;
}

export const RefindProjectSP = (props: Props) => {
  const { callback } = props;

  /* Hook */
  const dispatch = useDispatch();
  const sort = useSelector((state: State) => state.customerDetail.projectSort, isEqual);

  /* State */
  const [sortState, setSortState] = useState(cloneDeep(sort));
  const originList = useSelector((state: State) => state.master.originList, isEqual);

  /* Callback */
  const handleClickSearch = useCallback(() => {
    dispatch(DialogActions.pop());
    callback(sortState);
  }, [callback, sort]);

  const setState = useCallback((v: ProjectSortState) => {
    setSortState(cloneDeep(v));
    dispatch(CustomerDetailActions.setProjectSort(v));
  }, [dispatch]);

  /* Master */
  useDidMount(() => {
    dispatch(MasterActions.api.origin.getList({}));
  });

  return (
    <RefindSP callback={handleClickSearch}>
      <>
        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">案件名</div>
            <Input
              className=""
              value={sortState.name}
              onChange={(e) => setState({ ...sortState, name: e.target.value })}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">案件担当者</div>
            <Input
              className=""
              value={sortState.project_representative_name}
              onChange={(e) => setState({
                ...sortState, project_representative_name: e.target.value,
              })}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">登録日</div>
            <DatePicker
              date={sortState.ins_date || null}
              onChange={(v) => setState(
                { ...sortState, ins_date: v },
              )}
            />
          </div>
        </div>
        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">受注金額（契約金額）</div>
            <Input
              className=""
              type="number"
              value={sortState.order_price}
              onChange={(e) => setState({
                ...sortState, order_price: Number(e.target.value),
              })}
            />
          </div>
        </div>
        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">着工日</div>
            <DatePicker
              date={sortState.construction_date || null}
              onChange={(v) => setState(
                { ...sortState, construction_date: v },
              )}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">完工日</div>
            <DatePicker
              date={sortState.completion_date || null}
              onChange={(v) => setState(
                { ...sortState, completion_date: v },
              )}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">完了日</div>
            <DatePicker
              date={sortState.complete_date || null}
              onChange={(v) => setState(
                { ...sortState, complete_date: v },
              )}
            />
          </div>
        </div>
        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">契約日</div>
            <DatePicker
              date={sortState.contract_date || null}
              onChange={(v) => setState(
                { ...sortState, contract_date: v },
              )}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">失注日</div>
            <DatePicker
              date={sortState.failure_date || null}
              onChange={(v) => setState(
                { ...sortState, failure_date: v },
              )}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">キャンセル日</div>
            <DatePicker
              date={sortState.cancel_date || null}
              onChange={(v) => setState(
                { ...sortState, cancel_date: v },
              )}
            />
          </div>
        </div>
        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">発生源</div>
            <Select
              value={sortState.source}
              defaultLabel="指定無し"
              options={originList.map((v) => ({
                text: v.name, value: v.id,
              }))}
              onChange={(v) => setState({ ...sortState, source: Number(v) })}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">備考</div>
            <textarea
              className=""
              value={sortState.remarks}
              onChange={(e) => setState({
                ...sortState, remarks: e.target.value,
              })}
              rows={4}
            />
          </div>
        </div>
      </>
    </RefindSP>
  );
};
