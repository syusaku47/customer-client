import { cloneDeep, isEqual } from 'lodash';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from '../../../../../ui/select/select';
import { SearchBoxPC } from '../../../../layout/search-box/search-box.pc';
import { DatePicker } from '../../../../../ui/date-picker/date-picker';
import { CsvActions } from '../../../../../../redux/csv/csv.action';
import { State } from '../../../../../../redux/root.reducer';
import { CsvSupportHistorySort } from '../../../../../../type/csv/csv-sort.type';
import { LeftIconButton } from '../../../../../ui/button/left-icon-button/left-icon-button';
import { useDidMount } from '../../../../../../hooks/life-cycle';
import { MasterActions } from '../../../../../../redux/master/master.action';

type Props = {
  callback: (v: CsvSupportHistorySort) => void;
}

export const CsvSearchBoxSupportHistory = (props: Props) => {
  const { callback } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => state.csv.supportHistorySort);
  const {
    storeList,
    employeeList,
    supportHistoryList,
  } = useSelector((state: State) => (state.master), isEqual);

  /* State */
  const [sort, setSort] = useState(cloneDeep(sortState));

  /* Callback */
  const setState = useCallback((v: CsvSupportHistorySort) => {
    setSort(v);
    dispatch(CsvActions.setSupportHistorySort(v));
  }, [sort]);

  const handleClickSearch = useCallback(() => {
    callback(sort);
  }, [callback, sort]);

  /* Master */
  useDidMount(() => {
    dispatch(MasterActions.api.store.getList({}));
    dispatch(MasterActions.api.employee.getList({}));
    dispatch(MasterActions.api.supportHistory.getList({}));
  });

  return (
    <>
      <SearchBoxPC
        openCallback={() => {}}
      >
        <div id="csv_support_history">
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">案件営業担当</div>
              <Select
                className="add_text_left"
                label="店舗"
                value={sort?.sales_shop}
                onChange={(data) => setSort({ ...sort, sales_shop: Number(data) })}
                defaultLabel="全て"
                options={storeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
              />
              <Select
                className="add_text_left"
                label="担当者"
                value={sort?.sales_contact}
                onChange={(data) => setSort({ ...sort, sales_contact: Number(data) })}
                defaultLabel="全て"
                options={employeeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">対応日付</div>
              <DatePicker
                date={sort.supported_date_start || null}
                onChange={(v) => setState(
                  { ...sort, supported_date_start: v },
                )}
              />
              <label className="ml_10">〜</label>
              <DatePicker
                date={sort.supported_date_end || null}
                onChange={(v) => setState(
                  { ...sort, supported_date_end: v },
                )}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">カテゴリ</div>
              <Select
                className="add_text_left"
                value={sort?.category}
                onChange={(data) => setSort({ ...sort, category: Number(data) })}
                defaultLabel="全て"
                options={supportHistoryList.map((v) => ({
                  text: v.supported, value: v.id,
                }))}
              />
            </div>
            <div className="item_box">
              <div className="item_head">結果</div>
              <Select
                className="add_text_left"
                value={sort?.result}
                onChange={(data) => setSort({ ...sort, result: Number(data) })}
                defaultLabel="全て"
                options={[
                  { text: '\u3007', value: 1 }, // 〇
                  { text: '\u25b3', value: 2 }, // △
                  { text: '\u2715', value: 3 }, // ✕
                ]}
              />
            </div>
            <LeftIconButton
              label="検索"
              fontAwesomeClass="fas fa-search"
              className="btn_search for_detail"
              size="sm"
              color="secondary"
              onClick={handleClickSearch}
            />
          </div>
        </div>
      </SearchBoxPC>
    </>
  );
};
