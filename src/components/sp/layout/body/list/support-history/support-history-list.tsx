import { push } from 'connected-react-router';
import {
  useCallback, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDidMount } from '../../../../../../hooks/life-cycle';
import { DialogActions } from '../../../../../../redux/dialog/dialog.action';
import { State } from '../../../../../../redux/root.reducer';
import { RoutingPath } from '../../../../../../routes/routing-pass';
import { SupportHistoryListType } from '../../../../../../type/support-history/support-history.type';
import { SupportHistoryCard } from '../../../../../ui/card/support-history/support-history-card';

type Props = {
  type?: 0 | 1 | 2;
  data?: SupportHistoryListType[];
  handleCardClick?:(supportHistory: SupportHistoryListType) => void;
}

export const SupportHistoryListSP = (props: Props) => {
  const { type, data, handleCardClick } = props;

  /* Hooks */
  const supportHistoryListData = useSelector((state: State) => state.supportHistory.list);
  const dispatch = useDispatch();
  const [isInCustomerDetail, setIsInCustomerDetail] = useState(false);

  /* List */
  const supportHistoryList = useMemo(() => {
    const list = supportHistoryListData || data;
    return !type ? list : list.filter((v) => {
      const kubun: number = v.fixed_flag ? 2 : 1;
      return kubun === type;
    });
  }, [type, data, supportHistoryListData]);

  const handleClickCard = useCallback((id: number) => {
    if (handleCardClick) {
      const findData = data?.find((v) => v.id === id);
      if (findData) handleCardClick(findData);
      dispatch(DialogActions.pop());
      dispatch(DialogActions.pop());
      return;
    }
    dispatch(push(`${RoutingPath.supportHistoryDetail}/${id}`));
  }, [data]);

  useDidMount(() => {
    const arr = window.location.href.split('customer/detail');
    setIsInCustomerDetail(arr.length >= 2);
  });

  return (
    <div className="list_base">
      {data ? data.map((v, i) => (
        <div key={`card${i}`} className="list_base_card_wrap">
          <SupportHistoryCard
            supportHistoryData={v}
            onClick={handleClickCard}
            isInCustomerDetail={isInCustomerDetail}
          />
        </div>
      )) : supportHistoryList.map((v, i) => (
        <div key={`card${i}`} className="list_base_card_wrap">
          <SupportHistoryCard
            supportHistoryData={v}
            onClick={handleClickCard}
            isInCustomerDetail={isInCustomerDetail}
          />
        </div>
      ))}
    </div>
  );
};
