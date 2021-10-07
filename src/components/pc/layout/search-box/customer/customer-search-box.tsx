import React, {
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lodash, { isEqual } from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import { RightLabelCheckbox } from '../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { LeftIconButton } from '../../../../ui/button/left-icon-button/left-icon-button';
import { Select } from '../../../../ui/select/select';
import { CustomerCollection } from '../../../../../collection/customer/customer.collection';
import { prefectures } from '../../../../../collection/prefectures';
import { LeftLabelCheckbox } from '../../../../ui/checkbox/left-label-checkbox/left-label-checkbox';
import { State } from '../../../../../redux/root.reducer';
import { TagModel } from '../../../../../model/tag/tag';
import { TagActions } from '../../../../../redux/tag/tag.action';
import { CustomerListType, CustomerSortState } from '../../../../../type/customer/customer.type';
import { useWillUnMount } from '../../../../../hooks/life-cycle';
import { SearchBoxPC } from '../search-box.pc';
import { LeftLabelInputField } from '../../../../ui/input-field/left-label-input-field/left-label-input-field';
import { MasterActions } from '../../../../../redux/master/master.action';
import { CommonCollection } from '../../../../../collection/common/common.collection';
import { Input } from '../../../../ui/input/input';
import { ValidationNumberLengthUnder3 } from '../../../../../model/validation/validation-number-length-under';
import { CustomerActions } from '../../../../../redux/customer/customer.action';
import { MapActions } from '../../../../../redux/map/map.action';

type Props = {
  callback?: (v: CustomerListType[]) => void;
  callbackGetList?: () => void;
  openCallback: (v: boolean) => void;
}

export const CustomerSearchBox = (props: Props) => {
  const {
    callback, callbackGetList, openCallback,
  } = props;

  /* Hooks */
  const {
    employeeList,
    areaList,
    storeList,
    customerRankList,
    customerEstimatedRankList: customerEstimatedRank,
    buildingCategoryList,
    madoriList,
  } = useSelector((state: State) => (state.master), isEqual);

  const { relevantTagList, partList } = useSelector((state: State) => ({
    relevantTagList: state.tag.relevantTagList,
    partList: state.tag.partList,
  }));
  const sortState = useSelector((state: State) => (state.customer.sort), isEqual);

  const dispatch = useDispatch();

  /* State */
  const [sort, setSort] = useState(cloneDeep(sortState));

  /* Callback */
  const setState = useCallback(
    (v: CustomerSortState) => {
      setSort(v);
      dispatch(CustomerActions.setSort(cloneDeep(v)));
    }, [sort],
  );

  const handleClickSearch = useCallback(
    () => {
      dispatch(MapActions.setGpsStatus('out'));
      if (callbackGetList) {
        callbackGetList();
      }
    }, [callbackGetList],
  );

  /* Effect */
  useEffect(() => {
    dispatch(TagActions.api.part.getList());
    dispatch(TagActions.api.relevantTag.getList());
    dispatch(MasterActions.api.store.getList({}));
    dispatch(MasterActions.api.area.getList({}));
    dispatch(MasterActions.api.employee.getList({}));
    dispatch(MasterActions.api.customerRank.getList({}));
    dispatch(MasterActions.api.customerExpectedRank.getList({}));
    dispatch(MasterActions.api.buildingCategory.getList({}));
    dispatch(MasterActions.api.madori.getList({}));
  }, []);

  useEffect(() => {
    setState({
      ...lodash.cloneDeep(sort),
      tags: new TagModel(relevantTagList),
      parts: new TagModel(partList),
    });
  }, [
    relevantTagList,
    partList,
  ]);

  useWillUnMount(() => {
    if (callback) setState(CustomerCollection.customerSortInitialState);
  });

  useEffect(() => {
    if (!sort.rank) {
      setState({ ...sort, rank_filter: 1 });
    }
  }, [sort.rank]);

  useEffect(() => {
    if (!sort.estimated_rank) {
      setState({ ...sort, estimated_rank_filter: 1 });
    }
  }, [sort.estimated_rank]);

  // useEffect(() => {
  //   handleClickSearch();
  // }, [sort.offset, sort.limit, sort.highlow, sort.sort_by]);

  return (
    <>
      <SearchBoxPC
        openCallback={openCallback}
        isDetail
      >
        <div
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleClickSearch();
          }}
        >
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">営業担当</div>
              <Select
                className="add_text_left"
                label="店舗"
                value={sort?.sales_shop}
                onChange={(data) => setState({ ...sort, sales_shop: Number(data) })}
                defaultLabel="全て"
                options={storeList.map((v) => ({ text: v.name, value: v.id }))}
              />
              <Select
                className="add_text_left"
                label="担当者"
                defaultLabel="全て"
                value={sort?.sales_contact}
                onChange={(data) => setState({ ...sort, sales_contact: Number(data) })}
                options={employeeList.map((v) => ({ text: v.name, value: v.id }))}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">顧客名</div>
              <Input
                className=""
                label=""
                value={sort?.name}
                onChange={(e) => setState({ ...sort, name: e.target.value })}
              />
            </div>
            <div className="item_box">
              <div className="item_head">顧客名フリガナ</div>
              <Input
                className=""
                label=""
                value={sort?.furigana}
                onChange={(e) => setState({ ...sort, furigana: e.target.value })}
              />
            </div>
            <div className="item_box">
              <div className="item_head">顧客TEL</div>
              <Input
                className=""
                label=""
                value={sort?.tel_no}
                onChange={(e) => setState({ ...sort, tel_no: e.target.value })}
                type="tel"
              />
            </div>
            <div className="item_box">
              <LeftLabelCheckbox
                label="不備情報のみ"
                checked={sort?.is_deficiency}
                onChange={() => setState({ ...sort, is_deficiency: !sort.is_deficiency })}
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

          <div className="search_detail">
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">住所</div>
                <LeftLabelInputField
                  className="postal_code_1"
                  label="〒"
                  type="number"
                  value={sort?.post_no1}
                  onChange={(e) => { setState({ ...sort, post_no1: e.target.value }); }}
                  maxLength={3}
                />
                <LeftLabelInputField
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
                  value={sort?.prefecture}
                  label="都道府県"
                  onChange={(v) => setState({ ...sort, prefecture: Number(v) })}
                  defaultLabel="全て"
                  options={
                    prefectures.map((v) => ({
                      text: v.label, value: v.value,
                    }))
                  }
                />
              </div>
              <div className="item_box flex_grow_1">
                <Input
                  labelPlace="left"
                  className="large"
                  label="顧客住所"
                  value={sort?.address}
                  onChange={(e) => setState({ ...sort, address: e.target.value })}
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">顧客ランク</div>
                <Select
                  defaultLabel="全て"
                  label=""
                  className=""
                  value={sort?.rank}
                  onChange={(v) => setState({ ...sort, rank: Number(v) })}
                  options={customerRankList.map((v) => ({
                    text: v.name, value: v.customer_rank_koji_id,
                  }))}
                />
                <Select
                  value={sort?.rank_filter}
                  onChange={(v) => setState({ ...sort, rank_filter: Number(v) })}
                  options={CommonCollection.pullDownFilterList}
                  disabled={!sort?.rank}
                />
              </div>

              <div className="item_box">
                <div className="item_head">顧客見込みランク</div>
                <Select
                  defaultLabel="全て"
                  value={sort?.estimated_rank}
                  onChange={(data) => setState({
                    ...sort,
                    estimated_rank: Number(data),
                  })}
                  options={customerEstimatedRank.map((v) => ({
                    text: v.name, value: v.customer_estimated_rank_id,
                  }))}
                />
                <Select
                  value={sort?.estimated_rank_filter}
                  onChange={(data) => setState({ ...sort, estimated_rank_filter: Number(data) })}
                  options={CommonCollection.pullDownFilterList}
                  disabled={!sort?.estimated_rank}
                />
              </div>

              <div className="item_box">
                <div className="item_head">エリア</div>
                <Select
                  defaultLabel="全て"
                  value={sort?.area}
                  onChange={(v) => setState({ ...sort, area: Number(v) })}
                  options={areaList.map((v) => ({ text: v.name, value: v.id }))}

                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">建物分類</div>
                <Select
                  defaultLabel="全て"
                  value={sort?.building_category}
                  onChange={(v) => setState({ ...sort, building_category: Number(v) })}
                  options={buildingCategoryList.map((v) => ({ text: v.name, value: v.id }))}

                />
              </div>
              <div className="item_box">
                <div className="item_head">間取</div>
                <Select
                  value={sort?.madori}
                  onChange={(v) => setState({ ...sort, madori: Number(v) })}
                  defaultLabel="全て"
                  options={madoriList.map((v) => ({ text: v.name, value: v.id }))}
                />
              </div>
              <div className="item_box">
                <div className="item_head">築年数</div>
                <Input
                  className="small"
                  value={sort?.building_age}
                  onChange={(e) => setState({ ...sort, building_age: Number(e.target.value) })}
                  validationList={ValidationNumberLengthUnder3}
                  maxLength={3}
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">完工時期</div>
                <Select
                  className="add_text_right"
                  value={sort?.completion_start_year}
                  onChange={(v) => setState({ ...sort, completion_start_year: Number(v) })}
                  defaultLabel="全て"
                  options={CommonCollection.year}
                />
                <label>年</label>

                <Select
                  className="add_text_right"
                  defaultLabel="全て"
                  value={sort?.completion_start_month}
                  onChange={(v) => setState({ ...sort, completion_start_month: Number(v) })}
                  options={CommonCollection.month}
                />
                <label>月</label>
                <label>～</label>
                <Select
                  className="add_text_right"
                  defaultLabel="全て"
                  value={sort?.completion_end_year}
                  onChange={(v) => setState({ ...sort, completion_end_year: Number(v) })}
                  options={CommonCollection.year}
                />
                <label>年</label>
                <Select
                  className="add_text_right"
                  defaultLabel="全て"
                  value={sort?.completion_end_month}
                  onChange={(v) => setState({ ...sort, completion_end_month: Number(v) })}
                  options={CommonCollection.month}
                />
                <label>月</label>
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">最終完工時期</div>
                <Select
                  className="add_text_right"
                  value={sort?.last_completion_start_year}
                  onChange={(v) => setState({ ...sort, last_completion_start_year: Number(v) })}
                  defaultLabel="全て"
                  options={CommonCollection.year}
                />
                <label>年</label>
                <Select
                  className="add_text_right"
                  value={sort?.last_completion_start_month}
                  onChange={(v) => setState({ ...sort, last_completion_start_month: Number(v) })}
                  defaultLabel="全て"
                  options={CommonCollection.month}
                />
                <label>月</label>
                <label>～</label>
                <Select
                  className="add_text_right"
                  value={sort?.last_completion_end_year}
                  onChange={(v) => setState({ ...sort, last_completion_end_year: Number(v) })}
                  defaultLabel="全て"
                  options={CommonCollection.year}
                />
                <label>年</label>
                <Select
                  className="add_text_right"
                  value={sort?.last_completion_end_month}
                  onChange={(v) => setState({ ...sort, last_completion_end_month: Number(v) })}
                  defaultLabel="全て"
                  options={CommonCollection.month}
                />
                <label>月</label>
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">総工事金額</div>
                <Input
                  labelPlace="right"
                  className="small"
                  label="万円"
                  type="number"
                  value={sort?.total_work_price_min}
                  /* eslint-disable max-len */
                  onChange={(e) => setState({ ...sort, total_work_price_min: Number(e.target.value) })}
                />
                <label className="ml_10">〜</label>
                <Input
                  labelPlace="right"
                  className="small"
                  label="万円"
                  value={sort?.total_work_price_max}
                  /* eslint-disable max-len */
                  onChange={(e) => setState({ ...sort, total_work_price_max: Number(e.target.value) })}
                />
              </div>
              <div className="item_box">
                <div className="item_head">工事回数</div>
                <Input
                  labelPlace="right"
                  className="small"
                  label="回"
                  value={sort?.work_times_min}
                  onChange={(e) => setState({ ...sort, work_times_min: Number(e.target.value) })}
                />
                <label className="ml_10">〜</label>
                <Input
                  labelPlace="right"
                  className="small"
                  label="回"
                  value={sort?.work_times_max}
                  onChange={(e) => setState({ ...sort, work_times_max: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">関連タグ{/* handleChangeSameTag */}</div>
                <div className="flex_wrap_box">
                  {sort?.tags?.data.map((v, i) => (
                    <div key={`rTag${i}`}>
                      <RightLabelCheckbox
                        className=""
                        key={v.id}
                        label={v.label}
                        checked={v.flag}
                        onChange={() => {
                          sort.tags?.changeFlag(v.id);
                          setState({ ...sort, tags: lodash.cloneDeep(sort.tags) });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">部位{/* handleChangeSameTag */}</div>
                <div className="flex_wrap_box">
                  {/* handleChangeSameTag */}
                  {sort?.parts?.data.map((v, i) => (
                    <div key={`tag${i}`}>
                      <RightLabelCheckbox
                        className=""
                        key={v.id}
                        label={v.label}
                        checked={v.flag}
                        onChange={() => {
                          sort.parts?.changeFlag(v.id);
                          setState({ ...sort, parts: lodash.cloneDeep(sort.parts) });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="item_wrap flex_no_wrap_box">
              <div className="item_box flex_grow_1">
                <div className="item_head">備考</div>
                <Input
                  className="large"
                  label="備考"
                  value={sort?.remarks}
                  onChange={(e) => setState({ ...sort, remarks: e.target.value })}
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
        </div>
      </SearchBoxPC>
      {/* {pagination && (
        <div>
          <TableSort
            page={sort.offset ?? 0}
            limit={type === 'list'
            && sort.limit !== (100 || 200 || 300 || 400 || 500 || 9999) ? 100 : sort.limit as Limit}
            hitCount={dataList.length}
            callback={(page, limits) => {
              setState({
                ...sort,
                offset: page,
                limit: limits,
              });
            }}
          />
        </div>
      )} */}
    </>
  );
};
