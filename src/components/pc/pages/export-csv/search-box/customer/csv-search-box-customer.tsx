import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import lodash, { isEqual } from 'lodash';
import { SearchBoxPC } from '../../../../layout/search-box/search-box.pc';
import { Select } from '../../../../../ui/select/select';
import { LeftIconButton } from '../../../../../ui/button/left-icon-button/left-icon-button';
import { prefectures } from '../../../../../../collection/prefectures';
import { CsvCustomerSort } from '../../../../../../type/csv/csv-sort.type';
import { CsvActions } from '../../../../../../redux/csv/csv.action';
import { State } from '../../../../../../redux/root.reducer';
import { RightLabelCheckbox } from '../../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { CommonCollection } from '../../../../../../collection/common/common.collection';
import { Input } from '../../../../../ui/input/input';
import { useDidMount } from '../../../../../../hooks/life-cycle';
import { MasterActions } from '../../../../../../redux/master/master.action';
import { TagActions } from '../../../../../../redux/tag/tag.action';
import { TagModel } from '../../../../../../model/tag/tag';
import { ProjectCollection } from '../../../../../../collection/project/project.collection';
import { RightLabelInputField } from '../../../../../ui/input-field/right-label-input-field/right-label-input-field';
import { Checkbox } from '../../../../../ui/checkbox/checkbox';
import { TextArea } from '../../../../../ui/text-area/text-area';
import { LeftLabelInputField } from '../../../../../ui/input-field/left-label-input-field/left-label-input-field';

type Props = {
  openCallback: (v: boolean) => void;
  callback: (v: CsvCustomerSort) => void;
}

export const CsvSearchBoxCustomer = (props: Props) => {
  const { openCallback, callback } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => state.csv.customerSort);
  const {
    storeList,
    employeeList,
    areaList,
    customerRankList,
    customerEstimatedRankList,
    buildingCategoryList,
    madoriList,
  } = useSelector((state: State) => (state.master), isEqual);
  const {
    partList,
    relevantTagList,
  } = useSelector((state: State) => (state.tag), isEqual);

  /* State */
  const [sort, setSort] = useState<CsvCustomerSort>(cloneDeep(sortState));

  /* Callback */
  const setState = useCallback((v: CsvCustomerSort) => {
    setSort(v);
    dispatch(CsvActions.setCustomerSort(v));
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
    dispatch(MasterActions.api.area.getList({}));
    dispatch(MasterActions.api.customerRank.getList({}));
    dispatch(MasterActions.api.customerExpectedRank.getList({}));
    dispatch(MasterActions.api.buildingCategory.getList({}));
    dispatch(MasterActions.api.madori.getList({}));
    dispatch(TagActions.api.relevantTag.getList());
    dispatch(TagActions.api.part.getList());
    setState({
      ...lodash.cloneDeep(sort),
      construction_status: new TagModel(ProjectCollection.constructionStatusList),
      tags: new TagModel(relevantTagList),
      parts: new TagModel(partList),
    });
  });

  return (
    <>
      <SearchBoxPC
        openCallback={openCallback}
        isDetail
      >
        <div id="csv_customer">
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">????????????</div>
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
              <Input
                className=""
                value={sort?.name}
                onChange={(e) => setState({ ...sort, name: e.target.value })}
              />
            </div>
            <div className="item_box">
              <div className="item_head">?????????????????????</div>
              <Input
                className=""
                value={sort?.furigana}
                onChange={(e) => setState({ ...sort, furigana: e.target.value })}
              />
            </div>
            <div className="item_box">
              <div className="item_head">??????????????????</div>
              <Input
                className=""
                type="number"
                value={sort?.tel_no}
                onChange={(e) => setState({ ...sort, tel_no: e.target.value })}
              />
            </div>
            <div className="item_box">
              <div className="item_head">?????????</div>
              <Select
                className=""
                value={sort?.area}
                onChange={(data) => setSort({ ...sort, area: Number(data) })}
                defaultLabel="????????????"
                options={areaList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
              />
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">???????????????</div>
                <Select
                  className=""
                  value={sort?.rank}
                  onChange={(data) => setSort({ ...sort, rank: Number(data) })}
                  defaultLabel="????????????"
                  options={customerRankList.map((v) => ({
                    text: v.name, value: v.id,
                  }))}
                />
                <Select
                  className=""
                  value={sort?.rank_filter}
                  onChange={(v) => setState({ ...sort, rank_filter: Number(v) })}
                  options={[
                    { text: '??????', value: 1 },
                    { text: '??????', value: 2 },
                    { text: '??????', value: 3 },
                  ]}
                />
              </div>
              <div className="item_box">
                <div className="item_head">????????????????????????</div>
                <Select
                  className=""
                  value={sort?.estimated_rank}
                  onChange={(data) => setSort({ ...sort, estimated_rank: Number(data) })}
                  defaultLabel="????????????"
                  options={customerEstimatedRankList.map((v) => ({
                    text: v.name, value: v.id,
                  }))}
                />
                <Select
                  className=""
                  value={sort?.estimated_rank_filter}
                  onChange={(v) => setState({ ...sort, estimated_rank_filter: Number(v) })}
                  options={[
                    { text: '??????', value: 1 },
                    { text: '??????', value: 2 },
                    { text: '??????', value: 3 },
                  ]}
                />
              </div>
              <div className="item_box">
                <div className="item_head">????????????</div>
                <Select
                  className=""
                  value={sort?.customer_classification}
                  onChange={(v) => setState({ ...sort, customer_classification: Number(v) })}
                  options={[
                    { text: '??????', value: 1 },
                    { text: 'OB', value: 2 },
                    { text: '?????????', value: 3 },
                  ]}
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">????????????</div>
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
            </div>

            <LeftIconButton
              label="??????"
              fontAwesomeClass="fas fa-search"
              className="btn_search for_simple"
              size="sm"
              color="secondary"
              onClick={handleClickSearch}
            />
          </div>

          <div className="search_detail">
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">?????????????????????</div>
                <Input
                  className=""
                  value={sort?.mail_address}
                  onChange={(e) => setState({ ...sort, mail_address: e.target.value })}
                />
              </div>
              {/* <div className="item_box">
                <div className="item_head">???????????????</div>
                <Input
                  className=""
                  type="number"
                  value={sort?.mail_address}
                  onChange={(e) => setState({ ...sort, mail_address: e.target.value })}
                />
              </div> */}
            </div>

            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">??????</div>
                <LeftLabelInputField
                  labelPlace="left"
                  className="postal_code_1"
                  label="???"
                  type="number"
                  value={sort?.post_no1}
                  onChange={(e) => { setState({ ...sort, post_no1: e.target.value }); }}
                  maxLength={3}
                />
                <LeftLabelInputField
                  labelPlace="left"
                  className="postal_code_2"
                  label="-"
                  type="number"
                  value={sort?.post_no2}
                  onChange={(e) => { setState({ ...sort, post_no2: e.target.value }); }}
                  maxLength={4}
                />
              </div>
              <div className="item_box">
                <Select
                  className="add_text_left"
                  label="??????????????????"
                  value={sort?.prefecture}
                  onChange={(v) => setState({ ...sort, prefecture: Number(v) })}
                  options={[
                    { text: '??????', value: NaN },
                    ...prefectures.map((v) => ({
                      text: v.label, value: v.value,
                    })),
                  ]}
                />
              </div>
              <div className="item_box flex_grow_1">
                <LeftLabelInputField
                  labelPlace="left"
                  className="large"
                  label="????????????"
                  value={sort?.address}
                  onChange={(e) => setState({ ...sort, address: e.target.value })}
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">????????????</div>
                <Select
                  className=""
                  value={sort?.building_category}
                  onChange={(v) => setState({ ...sort, building_category: Number(v) })}
                  options={buildingCategoryList.map((v) => ({
                    text: v.name, value: v.id,
                  }))}
                />
              </div>
              <div className="item_box">
                <div className="item_head">?????????</div>
                <Select
                  className=""
                  value={sort?.madori}
                  onChange={(data) => setSort({ ...sort, madori: Number(data) })}
                  defaultLabel="????????????"
                  options={madoriList.map((v) => ({
                    text: v.name, value: v.id,
                  }))}
                />
              </div>
              <div className="item_box">
                <div className="item_head">?????????</div>
                <Input
                  className="small"
                  type="number"
                  value={sort?.building_age}
                  onChange={(e) => setState({ ...sort, building_age: Number(e.target.value) })}
                />
                <Select
                  label=""
                  className="ml_10"
                  value={sort?.building_age_filter}
                  onChange={(v) => setState({ ...sort, building_age_filter: Number(v) })}
                  options={[
                    { text: '??????', value: 1 },
                    { text: '??????', value: 2 },
                    { text: '??????', value: 3 },
                  ]}
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">??????????????????</div>
                <Select
                  className="add_text_right"
                  value={sort?.last_completion_start_year}
                  onChange={(v) => setState({ ...sort, last_completion_start_year: String(v) })}
                  defaultLabel="??????"
                  options={CommonCollection.year}
                />
                <label>???</label>
                <Select
                  className="add_text_right"
                  value={sort?.last_completion_start_month}
                  onChange={(v) => setState({ ...sort, last_completion_start_month: String(v) })}
                  defaultLabel="??????"
                  options={CommonCollection.month}
                />
                <label>???</label>
                <label>???</label>
                <Select
                  className="add_text_right"
                  value={sort?.last_completion_end_year}
                  onChange={(v) => setState({ ...sort, last_completion_end_year: String(v) })}
                  defaultLabel="??????"
                  options={CommonCollection.year}
                />
                <label>???</label>
                <Select
                  className="add_text_right"
                  value={sort?.last_completion_end_month}
                  onChange={(v) => setState({ ...sort, last_completion_end_month: String(v) })}
                  defaultLabel="??????"
                  options={CommonCollection.month}
                />
                <label>???</label>
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">???????????????</div>
                <RightLabelInputField
                  className="small"
                  label="??????"
                  type="number"
                  value={sort?.total_work_price_min}
                  onChange={(e) => setState({ ...sort, total_work_price_min: e.target.value })}
                />
                <label className="ml_10">???</label>
                <RightLabelInputField
                  className="small"
                  label="??????"
                  type="number"
                  value={sort?.total_work_price_max}
                  onChange={(e) => setState({ ...sort, total_work_price_max: e.target.value })}
                />
              </div>
              <div className="item_box">
                <div className="item_head">????????????</div>
                <RightLabelInputField
                  className="small"
                  type="number"
                  label="???"
                  value={sort?.work_times_min}
                  onChange={(e) => setState({ ...sort, work_times_min: Number(e.target.value) })}
                />
                <label className="ml_10">???</label>
                <RightLabelInputField
                  className="small"
                  type="number"
                  label="???"
                  value={sort?.work_times_max}
                  onChange={(e) => setState({ ...sort, work_times_max: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">????????????</div>
                <div className="flex_wrap_box">
                  {sort?.tags?.data.map((v, i) => (
                    <div key={`tag${i}`}>
                      <RightLabelCheckbox
                        className="customerPC__body__inner__checkbox"
                        key={v.id}
                        label={v.label}
                        checked={v.flag}
                        onChange={() => {
                          sort.tags?.changeFlag(v.id);
                          setState({
                            ...sort, tags: lodash.cloneDeep(sort.tags),
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">??????</div>
                <div className="flex_wrap_box">
                  {sort?.parts?.data.map((v, i) => (
                    <div key={`tag${i}`}>
                      <RightLabelCheckbox
                        className="customerPC__body__inner__checkbox"
                        key={v.id}
                        label={v.label}
                        checked={v.flag}
                        onChange={() => {
                          sort.parts?.changeFlag(v.id);
                          setState({
                            ...sort, parts: lodash.cloneDeep(sort.parts),
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">??????????????????</div>
                <Checkbox
                  checked={!!sort?.is_deficiency}
                  onChange={() => {
                    setState({ ...sort, is_deficiency: (sort?.is_deficiency ? 0 : 1) });
                  }}
                />
              </div>
            </div>
            <div className="item_wrap flex_no_wrap_box">
              <div className="item_box flex_grow_1">
                <div className="item_head">??????</div>
                <div className="item_body full_width item_remarks">
                  <TextArea
                    // rows={7}
                    value={sort?.remarks}
                    onChange={(e) => setState(
                      { ...sort, remarks: e.target.value },
                    )}
                  />
                </div>
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
        </div>
      </SearchBoxPC>
    </>
  );
};
