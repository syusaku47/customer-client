import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { Select } from 'semantic-ui-react';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { EstimateDetailSearchSecondSP } from '../search-second/estimate-detail-search-second.sp';
import { TopLabelInputField } from '../../../../ui/input-field/top-label-input-field/top-label-input-field';
import { SearchBox } from '../../../layout/search-box/search-box.sp';
import { useDidMount } from '../../../../../hooks/life-cycle';
import { MasterActions } from '../../../../../redux/master/master.action';
import { EstimateActions } from '../../../../../redux/estimate/estimate.action';
import { State } from '../../../../../redux/root.reducer';

type Props = {
  id: number;
  estimateMode: 'add' | 'update';
}

export const EstimateDetailSearchSP = (props:Props) => {
  const { id, estimateMode } = props;

  /* Hook */
  const dispatch = useDispatch();
  const largeCategoryList = useSelector((state:State) => state.master.largeCategoryList, isEqual);
  const middleCategoryList = useSelector((state:State) => state.master.middleCategoryList, isEqual);

  /* State */
  const [daibunrui, setDaibunrui] = useState(NaN);
  const [chubunrui, setChubunrui] = useState(NaN);
  const [meisai, setMeisai] = useState('');

  /* Callback */
  const EstimateDetailSearchSecond = useCallback(() => {
    dispatch(EstimateActions.api.meisai.getList({
      param: {
        id,
        data: {
          category: daibunrui,
          sub_category: chubunrui,
          detail: meisai,
        },
      },
      callback: (list) => {
        dispatch(DialogActions.push({
          title: '明細見積検索',
          element: <EstimateDetailSearchSecondSP
            estimateMode={estimateMode}
            id={id}
            list={list}
          />,
        }));
      },
    }));
  }, [
    daibunrui,
    chubunrui,
    meisai,
    id,
  ]);

  /* Effect */
  useDidMount(() => {
    dispatch(MasterActions.api.largeCategory.getList({}));
    dispatch(MasterActions.api.middleCategory.getList({}));
  });

  return (
    <SearchBox callback={EstimateDetailSearchSecond}>
      <div className="search_box_sp_body_inner">
        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">大分類</div>
            <div className="item_body item_select full_width">
              {/* TODO fukada 自前のSelectへの差し替えと、onChangeへ渡す関数の調整 */}
              <Select
                value={daibunrui}
                defaultLabel="指定無し"
                options={largeCategoryList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
                onChange={(_, v) => setDaibunrui(Number(v.value))}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_label">中分類</div>
            <div className="item_body item_select full_width">
              <Select
                value={chubunrui}
                defaultLabel="指定無し"
                options={middleCategoryList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
                onChange={(_, v) => setChubunrui(Number(v.value))}
              />
            </div>
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="明細"
              value={meisai}
              onChange={(e) => setMeisai(e.target.value)}
              className="full_width"
            />
          </div>
        </div>
      </div>
    </SearchBox>
  );
};
