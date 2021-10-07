import {
  useCallback, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import cloneDeep from 'lodash/cloneDeep';
import { DisplayElements } from '../../../../../../type/display-elements.type';
import { Table } from '../../../../../ui/table/table';
import { CustomerCollection } from '../../../../../../collection/customer/customer.collection';
import './customer-list.pc.scss';
import { State } from '../../../../../../redux/root.reducer';
import { CustomerListType } from '../../../../../../type/customer/customer.type';
import { RoutingPath } from '../../../../../../routes/routing-pass';
import { joinStr } from '../../../../../../utilities/join-str';
import { useWillUnMount } from '../../../../../../hooks/life-cycle';
import { CustomerActions } from '../../../../../../redux/customer/customer.action';
import Alert from '../../../../../../asset/images/icon/alert.svg';

type Props = {
  type?: 0 | 1 | 2;
  data?: CustomerListType[];
  isSearch?: boolean;
  handleCardClick?: (customer: CustomerListType) => void;
  callbackSort?: (order: number, index: number) => void;
}

export const CustomerListPC = (props: Props) => {
  const {
    type, data, handleCardClick, callbackSort, isSearch,
  } = props;

  /* Hooks */
  const customerListData = useSelector((state: State) => state.customer.list);
  const dispatch = useDispatch();

  /* State */
  const [customerHeader] = useState<DisplayElements[]>(CustomerCollection.customerHeader);
  const [selected, setSelected] = useState<number[]>([]);

  /* List */
  const customerList = useMemo(() => (
    !type ? customerListData : customerListData.filter(
      (v) => v.ob_flag === type,
    )), [type, customerListData]);

  const dataList = useMemo(() => data || customerList, [customerListData, data]);

  const handleClickCard = useCallback((id: number) => {
    if (handleCardClick) {
      const findData = dataList?.find((v) => v.id === id);
      if (findData) {
        handleCardClick(findData);
      }
    }
    setSelected([dataList.findIndex((v) => v.id === id)]);
  }, [handleCardClick, dataList]);

  const handleDbClick = useCallback((v:CustomerListType) => {
    if (handleCardClick) {
      handleCardClick(cloneDeep(v));
      return;
    }
    dispatch(push(`${RoutingPath.customerDetail}/${v.id}`));
  },
  [handleCardClick]);

  useWillUnMount(() => {
    dispatch(CustomerActions.setSort(null));
  });

  return (
    <section className="result_area list_area">
      <div className="inner">
        <div className="table_responsive">
          {/* <Table /> */}
          <Table
            className="table_selectable table_sortable table_sticky"
            header={customerHeader}
            onDbClick={handleDbClick}
            selectedTr={selected}
            rowDataList={dataList}
            onClickRow={(v:CustomerListType) => { handleClickCard(Number(v.id)); }}
            onClickMulti={isSearch ? undefined : (v:CustomerListType[]) => {
              setSelected(v.map((v2) => dataList.findIndex((v3) => v3.id === v2.id)));
            }}
            sort={{
              index: [],
              onClick: (order, index) => {
                if (callbackSort)callbackSort(order, index);
              },
            }}
            lists={dataList.map((v) => (
              [
                v.deficiency_flag ? <img src={Alert} alt="入力不備" title="入力不備" className="icon" /> : '',
                v.ob_flag === 1 ? 'OB' : '見込',
                v.sales_contact_name,
                v.id,
                v.name,
                v.furigana,
                joinStr(v.post_no, 3, '-'),
                v.prefecture_name,
                v.city + v.address,
                v.tel_no,
                <div className="rank_label" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>{v.estimated_rank_name}</div>,
                <div className="rank_label" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>{v.rank_name}</div>,
                v.area_name,
                v.building_category_name,
                v.madori_name,
                v.building_age,
                v.remarks,
              ]
            ))}
            option={{
              stringWidth: [
                // { index: 0, width: 50 }, // 入力不備
                // { index: 1, width: 100 }, // OBフラグ
                // { index: 2, width: 50 }, // 顧客担当営業
                // { index: 3, width: 50 }, //  顧客ID
                // { index: 4, width: 50 }, // 顧客名
                { index: 5, width: 100 }, // フリガナ
                // { index: 6, width: 50 }, // 郵便番号
                // { index: 7, width: 50 }, // 都道府県
                // { index: 8, width: 50 }, // 住所
                // { index: 9, width: 50 }, // TEL
                // { index: 10, width: 50 }, // 見込みランク
                // { index: 11, width: 50 }, // 顧客ランク
                // { index: 12, width: 50 }, // エリア
                // { index: 13, width: 50 }, // 建物分類
                // { index: 14, width: 50 }, // 間取り
                // { index: 15, width: 50 }, // 築年数
                // { index: 16, width: 50 }, // 備考
              ],
              tdAlign: [
                { index: 0, align: 'center' },
                { index: 1, align: 'center' },
                { index: 2, align: 'left' },
                { index: 3, align: 'left' },
                { index: 4, align: 'left' },
                { index: 5, align: 'left' },
                { index: 6, align: 'left' },
                { index: 7, align: 'left' },
                { index: 8, align: 'left' },
                { index: 9, align: 'left' },
                { index: 10, align: 'center' },
                { index: 11, align: 'center' },
                { index: 12, align: 'left' },
                { index: 13, align: 'left' },
                { index: 14, align: 'left' },
                { index: 15, align: 'right' },
                { index: 16, align: 'left' },
              ],
            }}
          />
        </div>
      </div>
    </section>
  );
};
