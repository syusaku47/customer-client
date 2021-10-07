import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { CustomerCard } from '../../../../../ui/card/customer-card/customer-card';
import { State } from '../../../../../../redux/root.reducer';
import { RoutingPath } from '../../../../../../routes/routing-pass';
import { CustomerListType } from '../../../../../../type/customer/customer.type';
import { DialogActions } from '../../../../../../redux/dialog/dialog.action';

type Props = {
  type?: 0 | 1 | 2;
  data?: CustomerListType[];
  handleCardClick?:(customer: CustomerListType) => void;
}

export const CustomerListSP = (props: Props) => {
  const { type, data, handleCardClick } = props;

  /* Hooks */
  const customerListData = useSelector((state: State) => state.customer.list);
  const dispatch = useDispatch();

  /* List */
  const customerList = !type ? customerListData : customerListData.filter(
    (v) => v.ob_flag === type,
  );

  const handleClickCard = useCallback((id: number) => {
    if (handleCardClick) {
      const findData = data?.find((v) => v.id === id);
      if (findData) handleCardClick(findData);
      dispatch(DialogActions.pop());
      return;
    }
    dispatch(push(`${RoutingPath.customerDetail}/${id}/customer`));
  }, [data]);

  return (
    <div className="list_base">
      {/* <div className="customer_list_sp_inner"> */}
      {data ? data.map((v, i) => (
        <div key={`card${i}`} className="list_base_card_wrap">
          <CustomerCard customerData={v} onClick={handleClickCard} index={i} />
        </div>
      )) : customerList.map((v, i) => (
        <div key={`card${i}`} className="list_base_card_wrap">
          <CustomerCard customerData={v} onClick={handleClickCard} index={i} />
        </div>
      ))}
      {/* </div> */}
    </div>
  );
};
