import { cloneDeep, isEqual } from 'lodash';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from '../../../../../ui/select/select';
import { SearchBoxPC } from '../../../../layout/search-box/search-box.pc';
import { DatePicker } from '../../../../../ui/date-picker/date-picker';
import { RightLabelCheckbox } from '../../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { Radio } from '../../../../../ui/radio/radio';
import { LeftIconButton } from '../../../../../ui/button/left-icon-button/left-icon-button';
import { CsvActions } from '../../../../../../redux/csv/csv.action';
import { State } from '../../../../../../redux/root.reducer';
import { CsvMaintenanceSort } from '../../../../../../type/csv/csv-sort.type';
import { useDidMount } from '../../../../../../hooks/life-cycle';
import { MasterActions } from '../../../../../../redux/master/master.action';
import { Input } from '../../../../../ui/input/input';

type Props = {
  callback: (v: CsvMaintenanceSort) => void;
}

export const CsvSearchBoxMaintenance = (props: Props) => {
  const { callback } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => state.csv.maintenanceSort);
  const {
    storeList,
    employeeList,
  } = useSelector((state: State) => (state.master), isEqual);

  /* State */
  const [sort, setSort] = useState(cloneDeep(sortState));

  /* Callback */
  const setState = useCallback((v: CsvMaintenanceSort) => {
    setSort(v);
    dispatch(CsvActions.setMaintenanceSort(v));
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
        openCallback={() => {}}
      >
        <div id="csv_maintenance">
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">?????????????????????</div>
              <DatePicker
                date={sort.maintenance_date_start || null}
                onChange={(v) => setState(
                  { ...sort, maintenance_date_start: v },
                )}
              />
              <label className="ml_10">???</label>
              <DatePicker
                date={sort.maintenance_date_end || null}
                onChange={(v) => setState(
                  { ...sort, maintenance_date_end: v },
                )}
              />
            </div>
            <div className="item_box">
              <div className="item_head">??????????????????</div>
              <Select
                className="add_text_left"
                label="??????"
                value={sort?.sales_shop}
                onChange={(data) => setSort({ ...sort, sales_shop: Number(data) })}
                defaultLabel="????????????"
                options={storeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
              />
              <Select
                className="add_text_left"
                label="?????????"
                value={sort?.sales_contact}
                onChange={(data) => setSort({ ...sort, sales_contact: Number(data) })}
                defaultLabel="????????????"
                options={employeeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">?????????</div>
              <DatePicker
                date={sort.completion_start_date || null}
                onChange={(v) => setState(
                  { ...sort, completion_start_date: v },
                )}
              />
              <label className="ml_10">???</label>
              <DatePicker
                date={sort.completion_end_date || null}
                onChange={(v) => setState(
                  { ...sort, completion_end_date: v },
                )}
              />
            </div>
            <div className="item_box">
              <div className="item_head">?????????</div>
              <Input
                className=""
                value={sort?.project_name}
                onChange={(e) => setState({ ...sort, project_name: e.target.value })}
              />
            </div>
            <div className="item_box">
              <RightLabelCheckbox
                checked={Boolean(sort?.has_muko)}
                label="?????????????????????"
                onChange={() => {
                  setState({ ...sort, has_muko: sort?.has_muko ? 0 : 1 });
                }}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">????????????</div>
              <Radio
                name="kubun"
                label="?????????"
                value="kubun1"
                checked={sort?.supported_kubun === 0}
                onChange={() => { setState({ ...sort, supported_kubun: 0 }); }}
              />
              <Radio
                name="kubun"
                label="??????"
                value="kubun3"
                checked={sort?.supported_kubun === 1}
                onChange={() => { setState({ ...sort, supported_kubun: 1 }); }}
              />
              <Radio
                name="kubun"
                label="?????????"
                value="kubun2"
                checked={sort?.supported_kubun === 2}
                onChange={() => { setState({ ...sort, supported_kubun: 2 }); }}
              />
            </div>
            <div className="item_box">
              <div className="item_head">???????????????</div>
              <Input
                className=""
                value={sort?.word}
                onChange={(e) => setState({ ...sort, word: e.target.value })}
              />
              <span className="comment">??????????????????????????????????????????????????????????????????</span>
            </div>
            <LeftIconButton
              label="??????"
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
