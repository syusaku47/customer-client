import {
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDidMount } from '../../../../../../hooks/life-cycle';
import { EstimateActions } from '../../../../../../redux/estimate/estimate.action';
import { State } from '../../../../../../redux/root.reducer';
import { EstimateMeisaiListType } from '../../../../../../type/estimate/estimate-meisai.type';
import { EstimateDetailCard } from '../../../../../ui/card/estimate/estimate-detail-card';
import './estimate-detail-list.scss';

type Props = {
  id?: number;
  data?: EstimateMeisaiListType[];
  handleClickCard: (v:EstimateMeisaiListType) => void;
  // handleClickDelete: (v:EstimateMeisaiListType) => void;
  isSort?: boolean,
  selectedIndex?: number,
  callbackSelect?: (v: number) => void,
}

export const EstimateDetailListSP = (props:Props) => {
  const {
    data, id, handleClickCard, isSort, selectedIndex, callbackSelect,
  } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const meisaiList = useSelector((state: State) => state.estimate.meisaiList);
  const dataList = useMemo(() => data || meisaiList, [meisaiList, data]);

  /* State */
  // eslint-disable-next-line
 const [selectRow, setSelectRow] = useState<EstimateMeisaiListType | null>(null);
  // eslint-disable-next-line

  /* Callback */
  const handleClick = useCallback((v:EstimateMeisaiListType, index: number) => {
    handleClickCard(v);
    callbackSelect?.(index);
  }, [handleClickCard, callbackSelect]);

  /* Effect */
  useDidMount(() => {
    if (data || id === undefined) return;
    dispatch(EstimateActions.api.meisai.getList({
      param: { id: id as number },
    }));
  });

  return (
    <div className="estimate_detail_list_sp">
      {dataList.map((v, i) => (
        <div key={`card${i}_${selectedIndex}`}>
          <EstimateDetailCard
            data={v}
            className={`${i === dataList.length - 1 ? 'last_type' : ''}`}
            handleClickCard={() => handleClick(v, i)}
            isSort={isSort}
            selected={i === selectedIndex}
            // handleClickDelete={() => handleClickDelete(v)}
          />
        </div>
      ))}
    </div>
  );
};
