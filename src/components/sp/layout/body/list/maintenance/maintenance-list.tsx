import { push } from 'connected-react-router';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDidMount } from '../../../../../../hooks/life-cycle';
import { DialogActions } from '../../../../../../redux/dialog/dialog.action';
import { State } from '../../../../../../redux/root.reducer';
import { RoutingPath } from '../../../../../../routes/routing-pass';
import { MaintenanceList } from '../../../../../../type/maintenance/maintenance.type';
import { MaintenanceCard } from '../../../../../ui/card/maintenance/maintenance-card';

type Props = {
  type?: 0 | 1 | 2;
  showType?:'map' | 'list' | 'date',
  data?: MaintenanceList[];
  handleCardClick?: (maintenance: MaintenanceList) => void;
  selectDay?: Date;
}

export const MaintenanceListSP = (props: Props) => {
  const {
    type, data, handleCardClick, selectDay, showType,
  } = props;

  /* Hooks */
  const maintenanceListData = useSelector((state: State) => state.maintenance.list);
  const dispatch = useDispatch();
  const [isInCustomerDetail, setIsInCustomerDetail] = useState(false);

  /* Effect */
  useEffect(() => {
  }, []);

  /* List */
  const maintenanceList = useMemo(() => {
    const dateCalc = (d: string) => {
      const day1 = new Date(d);
      return day1.getFullYear() === selectDay?.getFullYear()
        && day1.getMonth() === selectDay?.getMonth()
        && day1.getDay() === selectDay.getDay();
    };
    console.log(showType);
    if (showType === 'date') {
      return (!type
        ? maintenanceListData.filter((v) => dateCalc(v.maintenance_date))
        : maintenanceListData.filter(
          (v) => (v.fixed_flag ? 2 : 1) === type && dateCalc(v.maintenance_date),
        )
      );
    }

    return (!type
      ? maintenanceListData
      : maintenanceListData.filter(
        (v) => (v.fixed_flag ? 2 : 1) === type,
      )
    );
  }, [type, maintenanceListData, selectDay, showType]);

  const handleClickCard = useCallback((id: number) => {
    if (handleCardClick) {
      const findData = data?.find((v) => v.id === id);
      if (findData) handleCardClick(findData);
      dispatch(DialogActions.pop());
      dispatch(DialogActions.pop());
      return;
    }
    dispatch(push(`${RoutingPath.maintenanceDetail}/${id}`));
  }, [data]);

  useDidMount(() => {
    const arr = window.location.href.split('customer/detail');
    setIsInCustomerDetail(arr.length >= 2);
  });

  return (
    <div className="list_base">
      {data ? data.map((v, i) => (
        <div key={`card${i}`} className="list_base_card_wrap">
          <MaintenanceCard
            maintenanceData={v}
            onClick={handleClickCard}
            isInCustomerDetail={isInCustomerDetail}
          />
        </div>
      )) : maintenanceList.map((v, i) => (
        <div key={`card${i}`} className="list_base_card_wrap">
          <MaintenanceCard
            maintenanceData={v}
            onClick={handleClickCard}
            isInCustomerDetail={isInCustomerDetail}
          />
        </div>
      ))}
    </div>
  );
};
