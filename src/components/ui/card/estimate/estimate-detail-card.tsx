import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { EstimateActions } from '../../../../redux/estimate/estimate.action';
import { EstimateMeisaiListType } from '../../../../type/estimate/estimate-meisai.type';
import { MathHelper } from '../../../../utilities/math-helper';
import { UserAgent } from '../../../../utilities/user-agent';
import { EstimateDetailInfoSP } from '../../../sp/pages/estimate-detail/info/estimate-detail-info.sp';
import { AngleIcon } from '../../angle-icon/angle-icon';
import './estimate-detail-card.scss';

type Props = {
  data: EstimateMeisaiListType,
  className?: string,
  handleClickCard?: () => void;
  // handleClickDelete?: () => void;
  isSort?: boolean,
  selected?: boolean,
}

export const EstimateDetailCard = (props: Props) => {
  const {
    data, className, handleClickCard, isSort, selected,
  } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const id = Number(useParams<{id:string}>().id);

  const baseClassName = 'estimate_detail_card';
  const defaultClassName = UserAgent === 'sp' ? `${baseClassName}_sp` : `${baseClassName}_pc`;

  const totalPrice = useMemo(() => MathHelper.times(
    MathHelper.localStrToNum(data.price),
    Number(data.quantity),
  ).toLocaleString(), [data.price]);

  /* callback */
  const handleClickInfo = useCallback(() => {
    // if (handleClickCard) {
    //   handleClickCard();
    //   return;
    // }
    if (isSort) {
      handleClickCard?.();
    } else {
      dispatch(DialogActions.push({
        title: '明細情報',
        element: <EstimateDetailInfoSP
          id={id}
          meisaiId={data.id}
        />,
      }));
    }
  }, [handleClickCard, id, data.id, isSort]);

  const handleClickRemove = useCallback((e:globalThis.React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    // if (handleClickDelete) {
    //   handleClickDelete();
    //   return;
    // }
    dispatch(DialogActions.pushMessage({
      title: '見積明細削除',
      message: ['削除しますか'],
      isCancel: true,
      callback: () => {
        dispatch(EstimateActions.api.meisai.delete({
          param: [{
            id,
            meisai_id: data.id,
          }],
          onSuccess: () => {
            dispatch(EstimateActions.api.meisai.getList({
              param: { id: Number(id) },
            }));
          },
        }));
      },
    }));
  }, [id]);

  return (
    <div className={`${defaultClassName} ${className || ''}`} onClick={handleClickInfo} style={selected ? { backgroundColor: '#FFF9D9' } : {}}>
      {/* TODO row1, row2 の日付と顧客名の切り替えについて確認。条件分岐？DOMを分ける？両方記載していいか？ */}
      {isSort ? (<div className="col1" />) : (
        <div className="col1">
          <i
            className="fas fa-minus-circle fa-lg"
            onClick={handleClickRemove}
          />
        </div>
      )}
      <div className="col2">
        <div className="col2__row1">{data.component_name || '---'}</div>
        <div className="col2__row2">
          <div className="col2__row2__con1">&yen;&nbsp;{data.price.toLocaleString()} ×&nbsp;{data.quantity}{data.unit_name}</div>
          <div className="col2__row2__con2">&yen;&nbsp;{totalPrice}</div>
        </div>
      </div>
      {isSort ? <div className="col3" />
        : (
          <div className="col3">
            <AngleIcon direction="right" />
          </div>
        )}
    </div>
  );
};
