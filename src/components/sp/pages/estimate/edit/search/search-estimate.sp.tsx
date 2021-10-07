import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';
import { EstimateCollection } from '../../../../../../collection/estimate/estimatecollection';
import { DialogActions } from '../../../../../../redux/dialog/dialog.action';
import { EstimateActions } from '../../../../../../redux/estimate/estimate.action';
import { TagActions } from '../../../../../../redux/tag/tag.action';
import { Estimate, EstimateSortState } from '../../../../../../type/estimate/estimate.type';
import { Checkbox } from '../../../../../ui/checkbox/checkbox';
import { TopLabelInputField } from '../../../../../ui/input-field/top-label-input-field/top-label-input-field';
import { Select } from '../../../../../ui/select/select';
import { SearchBox } from '../../../../layout/search-box/search-box.sp';
import { SearchEstimateResultSP } from './result/search-estimate-result.sp';
import { useDidMount } from '../../../../../../hooks/life-cycle';
import { TagModel } from '../../../../../../model/tag/tag';
import { State } from '../../../../../../redux/root.reducer';

export const SearchEstimateTitle = '見積検索';

type Props = {
  callback: (v: Estimate) => void;
}

export const SearchEstimateSP = (props:Props) => {
  const { callback } = props;

  /* Hook */
  const dispatch = useDispatch();
  const constructionPartList = useSelector((state: State) => (state.tag.partList));

  /* State */
  const [sort, setSort] = useState(
    EstimateCollection.sortInitialState,
  );

  /* Callback */
  const setState = useCallback(
    (v:EstimateSortState) => {
      setSort(v);
    }, [sort],
  );

  const handleClickSearch = useCallback(
    () => {
      dispatch(EstimateActions.api.estimate.getList({
        param: {
          construction_parts: sort.construction_parts?.getSendData(),
        },
        callback: (data) => {
          dispatch(DialogActions.push({
            title: SearchEstimateTitle,
            element: <SearchEstimateResultSP
              data={data}
              callback={callback}
            />,
          }));
        },
      }));
    }, [sort],
  );

  /* Effect */
  useDidMount(() => {
    dispatch(TagActions.api.part.getList());
  });

  useEffect(() => {
    setSort({
      ...cloneDeep(sort),
      construction_parts: new TagModel(constructionPartList),
    });
  }, [
    constructionPartList,
  ]);

  return (
    <SearchBox callback={handleClickSearch}>
      {/* search_box_body_inner は各画面の共通用 */}
      <div className="search_box_sp_body_inner">

        <div className="category_wrap">
          <div className="item_wrap">
            <TopLabelInputField
              label="案件名"
              value={sort.project_name}
              onChange={(e) => setSort({ ...sort, project_name: e.target.value })}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="顧客名"
              value={sort.customer_name}
              onChange={(e) => setSort({ ...sort, customer_name: e.target.value })}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="明細"
              value={sort.detail}
              onChange={(e) => setSort({ ...sort, detail: e.target.value })}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">店舗</div>
            <Select
              value={sort.sales_shop}
              onChange={(v) => setSort({ ...sort, sales_shop: Number(v) })}
              options={[
                { text: '全て', value: NaN },
                { text: 'hoge', value: 'hoge' },
                { text: 'piyo', value: 'piyo' },
              ]}
            />
          </div>
        </div>

        <div className="category_wrap">
          <div className="item_wrap tags_form">
            <div className="item_label">部位</div>
            <div className="item_body item_checkbox">
              {sort?.construction_parts?.data.map((v, i) => (
                <div key={`tag${i}`}>
                  <Checkbox
                    key={v.id}
                    label={v.label}
                    checked={v.flag}
                    onChange={() => {
                      sort.construction_parts?.changeFlag(v.id);
                      setState({
                        ...sort, construction_parts: cloneDeep(sort.construction_parts),
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SearchBox>
  );
};
