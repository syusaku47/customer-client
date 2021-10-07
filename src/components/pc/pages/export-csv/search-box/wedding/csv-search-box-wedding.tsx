import { cloneDeep, isEqual } from 'lodash';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from '../../../../../ui/select/select';
import { RightLabelInputField } from '../../../../../ui/input-field/right-label-input-field/right-label-input-field';
import { LeftIconButton } from '../../../../../ui/button/left-icon-button/left-icon-button';
import { SearchBoxPC } from '../../../../layout/search-box/search-box.pc';
import { CsvActions } from '../../../../../../redux/csv/csv.action';
import { State } from '../../../../../../redux/root.reducer';
import { CsvWeddingSort } from '../../../../../../type/csv/csv-sort.type';
import { useDidMount } from '../../../../../../hooks/life-cycle';
import { MasterActions } from '../../../../../../redux/master/master.action';
import { Input } from '../../../../../ui/input/input';
import { CommonCollection } from '../../../../../../collection/common/common.collection';

type Props = {
  callback: (v: CsvWeddingSort) => void;
}

export const CsvSearchBoxWedding = (props: Props) => {
  const { callback } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => state.csv.weddingSort);
  const {
    storeList,
    employeeList,
  } = useSelector((state: State) => (state.master), isEqual);

  /* State */
  const [sort, setSort] = useState(cloneDeep(sortState));

  /* Callback */
  const setState = useCallback((v: CsvWeddingSort) => {
    setSort(v);
    dispatch(CsvActions.setWeddingSort(v));
  }, [sort]);

  const handleClickSearch = useCallback(() => {
    callback(sort);
  }, [callback, sort]);

  /* Master */
  useDidMount(() => {
    dispatch(MasterActions.api.store.getList({}));
    dispatch(MasterActions.api.employee.getList({}));
  });

  return (
    <>
      <SearchBoxPC
        isDetail={false}
        openCallback={() => {}}
      >
        <div id="csv_wedding">
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">営業担当</div>
              <Select
                className="add_text_left"
                label="店舗"
                value={sort?.sales_shop}
                onChange={(data) => setSort({ ...sort, sales_shop: Number(data) })}
                defaultLabel="指定無し"
                options={storeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
              />
              <Select
                className="add_text_left"
                label="担当者"
                value={sort?.sales_contact}
                onChange={(data) => setSort({ ...sort, sales_contact: Number(data) })}
                defaultLabel="指定無し"
                options={employeeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">顧客名</div>
              <Input
                className=""
                value={sort?.name}
                onChange={(e) => setState({ ...sort, name: e.target.value })}
              />
            </div>

            <div className="item_box">
              <div className="item_head">結婚記念日</div>
              <RightLabelInputField
                className="small"
                label="年"
                type="number"
                value={sort?.wedding_anniversary_start_year}
                onChange={(e) => {
                  setState({ ...sort, wedding_anniversary_start_year: e.target.value });
                }}
              />
              <Select
                className="add_text_left"
                value={sort?.wedding_anniversary_start_month}
                onChange={(v) => setState({ ...sort, wedding_anniversary_start_month: Number(v) })}
                options={[
                  { text: '全て', value: 0 },
                  ...CommonCollection.month.map((v) => ({
                    text: v.text, value: v.value,
                  })),
                ]}
              />月 〜
              <RightLabelInputField
                className="small"
                label="年"
                type="number"
                value={sort?.wedding_anniversary_end_year}
                onChange={(e) => {
                  setState({ ...sort, wedding_anniversary_end_year: e.target.value });
                }}
              />
              <Select
                className="add_text_left"
                value={sort?.wedding_anniversary_end_month}
                onChange={(v) => setState({ ...sort, wedding_anniversary_end_month: Number(v) })}
                options={[
                  { text: '全て', value: 0 },
                  ...CommonCollection.month.map((v) => ({
                    text: v.text, value: v.value,
                  })),
                ]}
              />月
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
