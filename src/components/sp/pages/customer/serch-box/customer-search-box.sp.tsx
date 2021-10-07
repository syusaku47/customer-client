import {
  useState, useEffect, /* , useCallback */
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as lodash from 'lodash';
import { isEqual } from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import { RightLabelCheckbox } from '../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { TopLabelInputField } from '../../../../ui/input-field/top-label-input-field/top-label-input-field';
import { Input } from '../../../../ui/input/input';
import { SearchBox } from '../../../layout/search-box/search-box.sp';
import './customer-search-box.sp.scss';
import { prefectures } from '../../../../../collection/prefectures';
import { TagActions } from '../../../../../redux/tag/tag.action';
import { State } from '../../../../../redux/root.reducer';
import { CustomerActions } from '../../../../../redux/customer/customer.action';
import { TagModel } from '../../../../../model/tag/tag';
import { CustomerListType, CustomerSortState } from '../../../../../type/customer/customer.type';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { CustomerListSP } from '../../../layout/body/list/customer-list/customer-list.sp';
import { Select } from '../../../../ui/select/select';
import { TextArea } from '../../../../ui/text-area/text-area';
import { MasterActions } from '../../../../../redux/master/master.action';
import { CommonCollection } from '../../../../../collection/common/common.collection';
import { ValidationNumberLengthUnder3 } from '../../../../../model/validation/validation-number-length-under';
import { MapActions } from '../../../../../redux/map/map.action';

type Props = {
  callback?:(data:CustomerListType)=>void
}

export const SearchBoxCustomerSP = (props?:Props) => {
  /* Hooks */
  const { relevantTagList, partList, sortState } = useSelector((state: State) => ({
    relevantTagList: state.tag.relevantTagList,
    partList: state.tag.partList,
    sortState: state.customer.sort,
  }));
  const {
    employeeList,
    areaList,
    storeList,
    customerRankList,
    customerEstimatedRankList: customerEstimatedRank,
    buildingCategoryList,
    madoriList,
  } = useSelector((state: State) => (state.master), isEqual);

  const dispatch = useDispatch();

  /* State */
  const [sort, setSort] = useState<CustomerSortState>(cloneDeep(sortState));

  /* Callback */
  const handleClickSearch = useCallback(
    () => {
      dispatch(MapActions.setGpsStatus('out'));
      if (props && props?.callback) {
        dispatch(CustomerActions.api.customer.getCallbackList({
          param: {
            ...sort,
            tags: sort?.tags?.getSendData(),
            post_no: `${sort.post_no1 || ''}${sort.post_no2 || ''}`,
            parts: sort?.parts?.getSendData(),
            is_deficiency: sort?.is_deficiency ? 1 : 0,
            limit: 99999,
          },
          onSuccess: (data) => {
            const { callback } = props;
            dispatch(DialogActions.push({
              title: '顧客検索',
              element: <CustomerListSP data={data} handleCardClick={callback} />,
            }));
          },
        }));
        dispatch(DialogActions.pop());
        return;
      }
      dispatch(CustomerActions.api.customer.getCallbackList({
        param: {
          ...sort,
          post_no: `${sort.post_no1 || ''}${sort.post_no2 || ''}`,
          tags: sort?.tags?.getSendData(),
          parts: sort?.parts?.getSendData(),
          is_deficiency: sort?.is_deficiency ? 1 : 0,
          limit: 99999,
        },
        onSuccess: (res) => {
          dispatch(CustomerActions.setList(res));
          dispatch(MapActions.setCenterPos({
            lat: Number(res[0].lat), lng: Number(res[0].lng),
          }));
          dispatch(DialogActions.pop());
        },
      }));
      // dispatch(CustomerActions.api.customer.getList({
      //   ...sort,
      //   post_no: `${sort.post_no1 || ''}${sort.post_no2 || ''}`,
      //   tags: sort?.tags?.getSendData(),
      //   parts: sort?.parts?.getSendData(),
      //   is_deficiency: sort?.is_deficiency ? 1 : 0,
      //   limit: 99999,
      // }));
    }, [sort, props],
  );

  const setState = useCallback(
    (v: CustomerSortState) => {
      setSort(v);
      if (props?.callback) return;
      dispatch(CustomerActions.setSort(v));
    }, [props],
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
    setSort(lodash.cloneDeep(sortState));
  }, []);

  useEffect(() => {
    setState({
      ...lodash.cloneDeep(sortState),
      tags: sortState.tags ?? new TagModel(relevantTagList),
      parts: sortState.parts ?? new TagModel(partList),
    });
  }, [relevantTagList, partList]);

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

  return (
    <SearchBox callback={handleClickSearch}>
      {/* search_box_body_inner は各画面の共通用 */}
      <div className="search_box_sp_body_inner search_box_customer_sp">
        <div className="category_wrap">
          <div className="item_wrap">
            <TopLabelInputField
              label="顧客名"
              value={sort?.name}
              onChange={(e) => setState({ ...sort, name: e.target.value })}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="顧客名（フリガナ）"
              value={sort?.furigana}
              onChange={(e) => setState({ ...sort, furigana: e.target.value })}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="顧客TEL"
              value={sort?.tel_no}
              onChange={(e) => setState({ ...sort, tel_no: e.target.value })}
              className="full_width"
              type="tel"
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">郵便番号</div>
            <div className="item_body item_postal">
              <div>〒&nbsp;
                <Input
                  type="number"
                  value={sort?.post_no1}
                  onChange={(e) => setState({ ...sort, post_no1: e.target.value })}
                />
              </div>
              <div className="hyphen">-</div>
              <div>
                <Input
                  type="number"
                  value={sort?.post_no2}
                  onChange={(e) => setState({ ...sort, post_no2: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_label">顧客都道府県</div>
            <div className="item_body item_select full_width">
              <Select
                value={sort?.prefecture}
                onChange={(data) => setState({ ...sort, prefecture: Number(data) })}
                options={[
                  { text: '全て', value: NaN },
                  ...prefectures.map((v) => (
                    { text: v.label, value: v.value }
                  )),
                ]}
              />
            </div>
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="顧客住所"
              value={sort?.address}
              onChange={(e) => setState({ ...sort, address: e.target.value })}
              className="full_width"
            />
          </div>
        </div>

        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">顧客ランク</div>
            <div className="item_body item_customerRank">
              <Select
                value={sort?.rank}
                onChange={(data) => setState({ ...sort, rank: Number(data) })}
                defaultLabel="全て"
                options={customerRankList.map((v) => ({
                  text: v.name, value: v.customer_rank_koji_id,
                }))}
              />
              <Select
                value={sort?.rank_filter}
                onChange={(data) => setState({ ...sort, rank_filter: Number(data) })}
                options={CommonCollection.pullDownFilterList}
                disabled={!sort?.rank}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_label">顧客見込みランク</div>
            <div className="item_body item_customerRank">
              <Select
                value={sort?.estimated_rank}
                onChange={(data) => setState({
                  ...sort,
                  estimated_rank: Number(data),
                })}
                defaultLabel="全て"
                options={customerEstimatedRank.map((v) => ({
                  text: v.name, value: v.customer_estimated_rank_id,
                }))}
              />
              <Select
                value={sort?.estimated_rank_filter}
                onChange={(data) => setState({ ...sort, estimated_rank_filter: Number(data) })}
                options={CommonCollection.pullDownFilterList}
                disabled={!sort?.estimated_rank_filter}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_label">エリア</div>
            <div className="item_body item_area">
              <Select
                value={sort?.area}
                onChange={(data) => setState({ ...sort, area: Number(data) })}
                defaultLabel="全て"
                options={areaList.map((v) => ({ text: v.name, value: v.id }))}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_label">店舗</div>
            <div className="item_body full_width">
              <Select
                value={sort?.sales_shop}
                onChange={(data) => setState({ ...sort, sales_shop: Number(data) })}
                defaultLabel="全て"
                options={storeList.map((v) => ({ text: v.name, value: v.id }))}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_label">担当者</div>
            <div className="item_body full_width">
              <Select
                value={sort?.sales_contact}
                onChange={(data) => setState({ ...sort, sales_contact: Number(data) })}
                defaultLabel="全て"
                options={employeeList.map((v) => ({ text: v.name, value: v.id }))}
              />
            </div>
          </div>
        </div>

        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">建物分類</div>
            <div className="item_body full_width">
              <Select
                value={sort?.building_category}
                onChange={(data) => setState({ ...sort, building_category: Number(data) })}
                defaultLabel="全て"
                options={buildingCategoryList.map((v) => ({ text: v.name, value: v.id }))}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_label">間取り</div>
            <div className="item_body item_madori">
              <Select
                value={sort?.madori}
                onChange={(data) => setState({ ...sort, madori: Number(data) })}
                defaultLabel="全て"
                options={madoriList.map((v) => ({ text: v.name, value: v.id }))}
              />
              <div className="dummy" />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_label">築年数</div>
            <div className="item_body item_years">
              <Input
                type="number"
                value={sort?.building_age}
                onChange={(e) => setState({ ...sort, building_age: Number(e.target.value) })}
                validationList={ValidationNumberLengthUnder3}
                maxLength={3}
              />
            </div>
          </div>
        </div>

        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">完工時期</div>
            <div className="item_body item_period">
              <div className="item_period__inner">
                <div>
                  <Select
                    value={sort?.completion_start_year}
                    onChange={(data) => setState({ ...sort, completion_start_year: Number(data) })}
                    defaultLabel="全て"
                    options={CommonCollection.year}
                  />
                  <div>年</div>
                </div>
                <div>
                  <Select
                    value={sort?.completion_start_month}
                    onChange={
                      (data) => setState({ ...sort, completion_start_month: Number(data) })
                    }
                    defaultLabel="全て"
                    options={CommonCollection.month}
                  />
                  <div>月</div>
                </div>
              </div>

              <div className="tilde">〜</div>

              <div className="item_period__inner">
                <div>
                  <Select
                    value={sort?.completion_end_year}
                    onChange={(data) => setState({ ...sort, completion_end_year: Number(data) })}
                    defaultLabel="全て"
                    options={CommonCollection.year}
                  />
                  <div>年</div>
                </div>

                <div>
                  <Select
                    value={sort?.completion_end_month}
                    onChange={
                      (data) => setState({ ...sort, completion_start_year: Number(data) })
                    }
                    defaultLabel="全て"
                    options={CommonCollection.month}
                  />
                  <div>月</div>
                </div>
              </div>
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">最終完工時期</div>
            <div className="item_body item_period">
              <div className="item_period__inner">
                <div>
                  <Select
                    value={sort?.last_completion_start_year}
                    onChange={(data) => setState(
                      { ...sort, last_completion_start_year: Number(data) },
                    )}
                    defaultLabel="全て"
                    options={CommonCollection.year}
                  />
                  <div>年</div>
                </div>

                <div>
                  <Select
                    value={sort?.last_completion_end_month}
                    onChange={
                      (data) => setState(
                        { ...sort, last_completion_start_month: Number(data) },
                      )
                    }
                    defaultLabel="全て"
                    options={CommonCollection.month}
                  />
                  <div>月</div>
                </div>
              </div>

              <div className="tilde">〜</div>

              <div className="item_period__inner">
                <div>
                  <Select
                    value={sort?.last_completion_end_year}
                    onChange={(data) => setState(
                      { ...sort, last_completion_start_year: Number(data) },
                    )}
                    defaultLabel="全て"
                    options={CommonCollection.year}
                  />
                  <div>年</div>
                </div>

                <div>
                  <Select
                    value={sort?.last_completion_end_month}
                    onChange={
                      (data) => setState(
                        { ...sort, last_completion_end_month: Number(data) },
                      )
                    }
                    defaultLabel="全て"
                    options={CommonCollection.month}
                  />
                  <div>月</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">総工事金額</div>
            <div className="item_body item_period">
              <div className="item_period__inner">
                <Input
                  type="number"
                  value={sort?.total_work_price_min}
                  onChange={(e) => setState(
                    { ...sort, total_work_price_min: Number(e.target.value) },
                  )}
                />
                <div>万円</div>
              </div>
              <div className="tilde">〜</div>
              <div className="item_period__inner">
                <Input
                  type="number"
                  value={sort?.total_work_price_max}
                  onChange={(e) => setState(
                    { ...sort, total_work_price_max: Number(e.target.value) },
                  )}
                />
                <div>万円</div>
              </div>
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">工事回数</div>
            <div className="item_body item_period">
              <div className="item_period__inner">
                <Input
                  type="number"
                  value={sort?.work_times_min}
                  onChange={(e) => setState(
                    { ...sort, work_times_min: Number(e.target.value) },
                  )}
                />
                <div>回</div>
              </div>

              <div>〜</div>

              <div className="item_period__inner">
                <Input
                  type="number"
                  value={sort?.work_times_max}
                  onChange={(e) => setState(
                    { ...sort, work_times_max: Number(e.target.value) },
                  )}
                />
                <div>回</div>
              </div>
            </div>
          </div>
        </div>

        <div className="category_wrap">
          <div className="item_wrap tags_form">
            <div className="item_label">関連タグ</div>
            <div className="item_body item_checkbox">
              {sort?.tags?.data.map((v, i) => (
                <div
                  key={`rTag${i}`}
                >
                  <RightLabelCheckbox
                    checked={v.flag}
                    label={v.label}
                    onChange={() => {
                      sort.tags?.changeFlag(v.id);
                      setState({ ...sort, tags: lodash.cloneDeep(sort.tags) });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="item_wrap tags_form">
            <div className="item_label">部位</div>
            <div className="item_body item_checkbox">
              {sort?.parts?.data.map((v, i) => (
                <div key={`pTag${i}`}>
                  <RightLabelCheckbox
                    checked={v.flag}
                    label={v.label}
                    onChange={() => {
                      sort.parts?.changeFlag(v.id);
                      setState({ ...sort, parts: lodash.cloneDeep(sort.parts) });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_label">備考</div>
            <div className="item_body full_width">
              <TextArea
                rows={4}
                value={sort?.remarks}
                onChange={(e) => setState(
                  { ...sort, remarks: e.target.value },
                )}
              />
            </div>
          </div>
          <div className="item_wrap tags_form">
            <div className="item_label">不備情報</div>
            <div className="item_body item_checkbox">
              <RightLabelCheckbox
                checked={sort?.is_deficiency}
                label="不備情報のみ"
                onChange={() => {
                  setState({ ...sort, is_deficiency: !(sort?.is_deficiency) });
                }}
                className="single_column"
              />
            </div>
          </div>
        </div>
      </div>
    </SearchBox>
  );
};
