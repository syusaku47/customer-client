import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../../ui/button/button';
import './estimate-detail-registration.sp.scss';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { EstimateActions } from '../../../../../redux/estimate/estimate.action';

type Props = {
  id: number;
  estimateMode: 'add' | 'update';
}

export const EstimateDetailRegistrationSP = (props:Props) => {
  const { id, estimateMode } = props;

  /* Hook */
  const dispatch = useDispatch();

  /* Callback */
  const handleClickReSearch = useCallback(
    () => {
      dispatch(DialogActions.pop());
      dispatch(DialogActions.pop());
    },
    [],
  );
  const handleClickBack = useCallback(
    () => {
      if (estimateMode === 'add') {
        dispatch(DialogActions.pop());
        dispatch(DialogActions.pop());
        dispatch(DialogActions.pop());
      } else {
        dispatch(DialogActions.clear());
      }
      dispatch(EstimateActions.api.meisai.getList({ param: { id } }));
    },
    [id, estimateMode],
  );

  return (
    <div className="registration_block">
      <div className="registration_wrap">
        <div className="registration_font">明細を登録しました。</div>
      </div>
      <div className="estimate_detail_search_footer">
        <Button size="md" color="primary" className="item_btn" onClick={handleClickReSearch}>続けて検索</Button>
        <Button size="md" color="dark" className="item_btn" onClick={handleClickBack}>見積詳細に戻る</Button>
      </div>
    </div>
  );
};
