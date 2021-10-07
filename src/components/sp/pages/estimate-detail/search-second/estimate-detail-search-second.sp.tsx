import { cloneDeep } from 'lodash';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { EstimateActions } from '../../../../../redux/estimate/estimate.action';
import { EstimateMeisaiListType } from '../../../../../type/estimate/estimate-meisai.type';
import { Button } from '../../../../ui/button/button';
import { EstimateDetailSearchSecondCard } from '../../../../ui/card/estimate/estimate-detail-search-second-card';
import { EstimateDetailRegistrationSP } from '../registration/estimate-detail-registration.sp';

type Props = {
  id: number;
  list: EstimateMeisaiListType[]
  estimateMode: 'add' | 'update';
}

export const EstimateDetailSearchSecondSP = (props:Props) => {
  const { list, id, estimateMode } = props;

  /* Hook */
  const dispatch = useDispatch();

  /* State */
  const [selectList, setSelectList] = useState<EstimateMeisaiListType[]>([]);

  /* Callback */
  const handleClickRegistration = useCallback(() => {
    dispatch(EstimateActions.api.meisai.postList({
      param: {
        detail_id: selectList.map((v) => v.id),
        id,
      },
      onSuccess: () => {
        dispatch(DialogActions.push({
          title: '',
          element: <EstimateDetailRegistrationSP
            estimateMode={estimateMode}
            id={id}
          />,
        }));
      },
    }));
  }, [id, selectList]);

  const handleClickList = useCallback(
    (val: EstimateMeisaiListType) => {
      let previousList = cloneDeep(selectList);
      const isFind = previousList.find((v) => v.id === val.id);

      if (!isFind) {
        previousList.push(cloneDeep(val));
      } else {
        previousList = cloneDeep(previousList.filter((v) => v.id !== val.id));
      }

      setSelectList(cloneDeep(previousList));
    },
    [selectList],
  );

  return (
    <>
      <div id="detail_estimate_list" className="list_base base_dialog_content_inner_body">
        {list.map((v, i) => (
          <div key={`card${i}`} className="list_base_card_wrap">
            <EstimateDetailSearchSecondCard
              data={v}
              callback={handleClickList}
            />
          </div>
        ))}
      </div>
      <div className="base_dialog_content_inner_footer">
        <Button size="md" color="primary" className="item_btn" onClick={handleClickRegistration}>明細登録</Button>
        <Button
          size="md"
          color="dark"
          onClick={() => dispatch(DialogActions.pop())}
        >戻る
        </Button>
      </div>
    </>
  );
};
