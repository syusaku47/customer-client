import React, { useCallback, useState } from 'react';
import { cloneDeep } from 'lodash';
import { useDispatch } from 'react-redux';
import { EstimateListSP } from '../../../../../layout/body/list/estimate/estimate-list';
import { SearchBox } from '../../../../../layout/search-box/search-box.sp';
import './search-estimate-result.sp.scss';
import { EstimateListType, Estimate } from '../../../../../../../type/estimate/estimate.type';
import { EstimateActions } from '../../../../../../../redux/estimate/estimate.action';
import { DialogActions } from '../../../../../../../redux/dialog/dialog.action';

export const sampleValueList = [
  { label: 'hoge', value: 0 },
  { label: 'moge', value: 1 },
  { label: 'piyo', value: 2 },
];

type Props = {
  data: EstimateListType[]
  callback: (v:Estimate) => void;
}

export const SearchEstimateResultSP = (props:Props) => {
  const { data, callback } = props;

  /* Hook */
  const dispatch = useDispatch();

  /* State */
  const [selectData, setSelectData] = useState<EstimateListType | null>(null);

  /* Callback */
  const handleClickDetermine = useCallback(() => {
    if (!selectData) return;
    dispatch(EstimateActions.api.estimate.get({
      param: { id: selectData.id },
      callback: (v) => {
        dispatch(DialogActions.pop());
        dispatch(DialogActions.pop());
        callback(cloneDeep(v));
      },
    }));
  }, [selectData, callback]);

  return (
    <SearchBox
      callback={handleClickDetermine}
      type="determine"
    >
      <EstimateListSP
        data={data}
        handleCardClick={setSelectData}
      />
    </SearchBox>
  );
};
