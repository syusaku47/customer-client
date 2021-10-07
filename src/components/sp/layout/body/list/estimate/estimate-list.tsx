import { push } from 'connected-react-router';
import { cloneDeep } from 'lodash';
import {
  useCallback, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../../../../redux/root.reducer';
import { RoutingPath } from '../../../../../../routes/routing-pass';
import { EstimateListType } from '../../../../../../type/estimate/estimate.type';
// import { File } from '../../../../../../type/file/file';
import { EstimateCard } from '../../../../../ui/card/estimate/estimate-card';

type Props = {
  data?: EstimateListType[];
  handleCardClick?:(estimate: EstimateListType) => void;
}

export const EstimateListSP = (props:Props) => {
  const { data, handleCardClick } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const estimateList = useSelector((state: State) => state.estimate.list);
  const dataList = useMemo(() => data || estimateList, [estimateList, data]);

  /* State */
  // eslint-disable-next-line
  const [selectRow, setSelectRow] = useState<EstimateListType | null>(null);

  /* Callback */
  const handleClickCard = useCallback((row:EstimateListType) => {
    if (handleCardClick) {
      handleCardClick(cloneDeep(row));
      setSelectRow(cloneDeep(row));
      return;
    }
    dispatch(push(`${RoutingPath.estimateDetail}/${row.id}`));
  }, [dataList, handleCardClick]);

  return (
    <div className="list_base">
      {dataList.map((v, i) => (
        <div key={`card${i}`} className="list_base_card_wrap" style={{ color: selectRow?.id === v.id ? 'red' : '' }}>
          <EstimateCard
            data={v}
            callback={handleClickCard}
          />
        </div>
      ))}
    </div>
  );
};
