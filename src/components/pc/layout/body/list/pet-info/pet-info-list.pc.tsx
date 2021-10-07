import { useState, useCallback } from 'react';
import { Table } from '../../../../../ui/table/table';
import { CustomerCollection } from '../../../../../../collection/customer/customer.collection';

type Props = {
  list: any[];
  callback: (id: number) => void;
  callbackSort?: (order: number, index: number) => void;
}

export const PetInfoList = (props: Props) => {
  const {
    list: petList,
    callback,
    callbackSort,
  } = props;

  /* Hooks */
  // const { petList } = useSelector((state: State) => ({
  //   petList: state.customer.petList,
  // }));

  const [isActive, setIsActive] = useState(NaN);

  const handleClickCard = useCallback((index: number) => {
    callback(index);
    setIsActive(petList.findIndex((v) => v.index === index));
  }, [petList]);

  return (
    <section className="list_area">
      <div className="inner">
        <div className="table_responsive">
          <Table
            className="table_selectable table_sticky"
            header={CustomerCollection.petHeader}
            rowDataList={petList}
            selectedTr={[isActive]}
            onClickRow={(v) => { handleClickCard(Number(v.index)); }}
            sort={{
              index: [],
              onClick: (order, index) => {
                if (callbackSort)callbackSort(order, index);
              },
            }}
            lists={petList.map((v) => (
              [
                v.name,
                v.type,
                v.sex ? 'オス' : 'メス',
                v.age || v.age === 0 ? v.age : '',
              ]
            ))}
            option={{
              stringWidth: [
                { index: 2, width: 50 }, // 続柄
                { index: 3, width: 50 }, // 生年月日
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
