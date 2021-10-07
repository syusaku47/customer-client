import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep, isEqual } from 'lodash';
import { Select } from '../../../../../ui/select/select';
import { RightLabelInputField } from '../../../../../ui/input-field/right-label-input-field/right-label-input-field';
import { LeftIconButton } from '../../../../../ui/button/left-icon-button/left-icon-button';
import { SearchBoxPC } from '../../../../layout/search-box/search-box.pc';
import { Input } from '../../../../../ui/input/input';
import { CsvActions } from '../../../../../../redux/csv/csv.action';
import { State } from '../../../../../../redux/root.reducer';
import { CsvBirthdaySort } from '../../../../../../type/csv/csv-sort.type';
import { MasterActions } from '../../../../../../redux/master/master.action';
import { useDidMount } from '../../../../../../hooks/life-cycle';

type Props = {
  callback: (v: CsvBirthdaySort) => void;
}

export const CsvSearchBoxBirthday = (props: Props) => {
  const { callback } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => state.csv.birthdaySort);
  const {
    storeList,
    employeeList,
  } = useSelector((state: State) => (state.master), isEqual);

  /* State */
  const [sort, setSort] = useState(cloneDeep(sortState));

  /* Callback */
  const setState = useCallback((v: CsvBirthdaySort) => {
    setSort(v);
    dispatch(CsvActions.setBirthdaySort(v));
  }, [sort]);

  const handleClickSearch = useCallback(
    () => {
      callback(sort);
    }, [callback, sort],
  );

  /* Master */
  useDidMount(() => {
    dispatch(MasterActions.api.store.getList({}));
    dispatch(MasterActions.api.employee.getList({}));
  });

  return (
    <>
      <SearchBoxPC
        openCallback={() => {}}
      >
        <div id="csv_birthday">
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
              <div className="item_head">顧客登録名</div>
              <Input
                className=""
                value={sort?.name}
                onChange={(e) => setState({ ...sort, name: e.target.value })}
              />
            </div>
            <div className="item_box">
              <div className="item_head">家族お名前</div>
              <Input
                className=""
                value={sort?.family_name}
                onChange={(e) => setState({ ...sort, family_name: e.target.value })}
              />
            </div>
            <div className="item_box">
              <div className="item_head">続柄</div>
              <Input
                className="small"
                value={sort?.relationship}
                onChange={(e) => setState({ ...sort, relationship: e.target.value })}
              />
            </div>
            <div className="item_box">
              <div className="item_head">携帯番号</div>
              <Input
                className=""
                type="number"
                value={sort?.mobile_phone}
                onChange={(e) => setState({ ...sort, mobile_phone: e.target.value })}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">生年月日</div>
              <RightLabelInputField
                className="small"
                label="月"
                type="number"
                value={sort?.birth_month_start}
                onChange={(e) => { setState({ ...sort, birth_month_start: e.target.value }); }}
                maxLength={2}
              />
              <RightLabelInputField
                className="small"
                label="日〜"
                type="number"
                value={sort?.birth_day_start}
                onChange={(e) => { setState({ ...sort, birth_day_start: e.target.value }); }}
                maxLength={2}
              />
              <RightLabelInputField
                className="small"
                label="月"
                type="number"
                value={sort?.birth_month_end}
                onChange={(e) => { setState({ ...sort, birth_month_end: e.target.value }); }}
                maxLength={2}
              />
              <RightLabelInputField
                className="small"
                label="日"
                type="number"
                value={sort?.birth_day_end}
                onChange={(e) => { setState({ ...sort, birth_day_end: e.target.value }); }}
                maxLength={2}
              />
            </div>
            <LeftIconButton
              label="検索"
              fontAwesomeClass="fas fa-search"
              className="btn_search for_simple"
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
