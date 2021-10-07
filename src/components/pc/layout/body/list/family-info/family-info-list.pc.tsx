import { useCallback, useState } from 'react';
import { CustomerCollection } from '../../../../../../collection/customer/customer.collection';
import { Table } from '../../../../../ui/table/table';
import { DateFormatter } from '../../../../../../utilities/date-formatter';

type Props = {
  list: any[];
  callback: (id: number) => void;
  callbackSort?: (order: number, index: number) => void;
}

export const FamilyInfoList = (props: Props) => {
  const {
    list,
    callback,
    callbackSort,
  } = props;

  /* Hooks */
  // const { familyList } = useSelector((state: State) => ({
  //   familyList: state.customer.familyList,
  // }));

  const [isActive, setIsActive] = useState(NaN);

  const handleClickCard = useCallback((index: number) => {
    callback(index);
    setIsActive(list.findIndex((v) => v.index === index));
  },
  [list]);

  return (
    <section className="list_area">
      <div className="inner">
        <div className="table_responsive">
          <Table
            className="table_selectable table_sticky"
            header={CustomerCollection.familyHeader}
            rowDataList={list}
            selectedTr={[isActive]}
            sort={{
              index: [],
              onClick: (order, index) => {
                if (callbackSort)callbackSort(order, index);
              },
            }}
            onClickRow={(v) => { handleClickCard(Number(v.index)); }}
            lists={list.map((v) => (
              [
                v.name,
                v.relationship,
                v.mobile_phone,
                DateFormatter.date2str(v.birth_date),
              ]
            ))}
            option={{
              stringWidth: [
                { index: 1, width: 50 }, // 続柄
                { index: 3, width: 100 }, // 生年月日
              ],
              tdAlign: [
                { index: 0, align: 'center' },
                { index: 1, align: 'center' },
                { index: 2, align: 'center' },
                { index: 3, align: 'center' },
              ],
            }}
          />
        </div>
      </div>
    </section>
  );
};
