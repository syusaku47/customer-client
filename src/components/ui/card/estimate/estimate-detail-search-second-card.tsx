import React, { useCallback, useMemo, useState } from 'react';
import { EstimateMeisaiListType } from '../../../../type/estimate/estimate-meisai.type';
import { MathHelper } from '../../../../utilities/math-helper';
import './estimate-detail-search-second-card.scss';

type Props = {
  data: EstimateMeisaiListType,
  className?: string,
  callback: (v:EstimateMeisaiListType) => void;
}

export const EstimateDetailSearchSecondCard = (props: Props) => {
  const { data, className, callback } = props;

  /* State */
  const [isSelect, setIsSelect] = useState(false);

  const totalPrice = useMemo(() => MathHelper.times(
    MathHelper.localStrToNum(data.price),
    Number(data.quantity),
  ).toLocaleString(), [data.price]);

  const handleClickList = useCallback(
    (v:EstimateMeisaiListType) => {
      setIsSelect(!isSelect);
      callback(v);
    },
    [callback, isSelect, data],
  );

  return (
    <div className={`estimate_detail_secondary_card card_base ${className || ''} ${isSelect ? 'is_select' : ''}`} onClick={() => handleClickList(data)}>
      <div className="estimate_detail_secondary_card__row1">{data.component_name}</div>
      <div className="estimate_detail_secondary_card__row2">
        <div className="estimate_detail_secondary_card__row2__col1">&yen;&nbsp;{data.price}&nbsp;× {data.quantity}{data.unit}</div>
        <div className="estimate_detail_secondary_card__row2__col2">&yen;&nbsp;{totalPrice}</div>
      </div>
    </div>
  );
};
