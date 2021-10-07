import lodash, { cloneDeep, isEqual } from 'lodash';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchBoxPC } from '../../../../layout/search-box/search-box.pc';
import { Select } from '../../../../../ui/select/select';
import { LeftIconButton } from '../../../../../ui/button/left-icon-button/left-icon-button';
import { DatePicker } from '../../../../../ui/date-picker/date-picker';
import { CsvActions } from '../../../../../../redux/csv/csv.action';
import { State } from '../../../../../../redux/root.reducer';
import { CsvProjectSort } from '../../../../../../type/csv/csv-sort.type';
import { Input } from '../../../../../ui/input/input';
import { RightLabelCheckbox } from '../../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { useDidMount } from '../../../../../../hooks/life-cycle';
import { MasterActions } from '../../../../../../redux/master/master.action';
import { TagModel } from '../../../../../../model/tag/tag';
import { ProjectCollection } from '../../../../../../collection/project/project.collection';

type Props = {
  callback: (v: CsvProjectSort) => void;
}

export const CsvSearchBoxProject = (props: Props) => {
  const { callback } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => state.csv.projectSort);
  const {
    storeList,
    employeeList,
  } = useSelector((state: State) => (state.master), isEqual);

  /* State */
  const [sort, setSort] = useState(cloneDeep(sortState));

  /* Callback */
  const setState = useCallback((v: CsvProjectSort) => {
    setSort(v);
    dispatch(CsvActions.setProjectSort(v));
  }, [sort]);

  const handleClickSearch = useCallback(() => {
    callback(sort);
  }, [callback, sort]);

  /* Master */
  useDidMount(() => {
    dispatch(MasterActions.api.store.getList({}));
    dispatch(MasterActions.api.employee.getList({}));
    setState({
      ...lodash.cloneDeep(sort),
      construction_status: new TagModel(ProjectCollection.constructionStatusList),
    });
  });

  return (
    <>
      <SearchBoxPC
        openCallback={() => {}}
      >
        <div id="csv_project">
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">営業担当</div>
              <Select
                className="add_text_left"
                label="店舗"
                value={sort?.sales_shop}
                /* TODO セレクトボックスで値が変わらない */
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
              <div className="item_head">契約日</div>
              <DatePicker
                date={sort.contract_start_date || null}
                onChange={(v) => setState(
                  { ...sort, contract_start_date: v },
                )}
              />
              <label className="ml_10">〜</label>
              <DatePicker
                date={sort.contract_end_date || null}
                onChange={(v) => setState(
                  { ...sort, contract_end_date: v },
                )}
              />
            </div>
            <div className="item_box">
              <div className="item_head">完工日</div>
              <DatePicker
                date={sort.completion_start_date || null}
                onChange={(v) => setState(
                  { ...sort, completion_start_date: v },
                )}
              />
              <label className="ml_10">〜</label>
              <DatePicker
                date={sort.completion_end_date || null}
                onChange={(v) => setState(
                  { ...sort, completion_end_date: v },
                )}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">顧客名</div>
              <Input
                className=""
                value={sort?.customer_name}
                onChange={(e) => setState({ ...sort, customer_name: e.target.value })}
              />
            </div>
            <div className="item_box">
              <div className="item_head">案件名</div>
              <Input
                className=""
                value={sort?.project_name}
                onChange={(e) => setState({ ...sort, project_name: e.target.value })}
              />
            </div>
            <div className="item_box">
              <div className="item_head">現場名称</div>
              <Input
                className=""
                value={sort?.field_name}
                onChange={(e) => setState({ ...sort, field_name: e.target.value })}
              />
            </div>
            <div className="item_box">
              <div className="item_head">現場電話番号</div>
              <Input
                className=""
                type="number"
                value={sort?.field_tel_no}
                onChange={(e) => setState({ ...sort, field_tel_no: e.target.value })}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">工事状況</div>
              <div className="flex_wrap_box">
                {sort?.construction_status?.data.map((v, i) => (
                  <div key={`rTag${i}`}>
                    <RightLabelCheckbox
                      className=""
                      key={v.id}
                      label={v.label}
                      checked={v.flag}
                      onChange={() => {
                        sort.construction_status?.changeFlag(v.id);
                        setState({
                          ...sort,
                          construction_status: lodash.cloneDeep(sort.construction_status),
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
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
