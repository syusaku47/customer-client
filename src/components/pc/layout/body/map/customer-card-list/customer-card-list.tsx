import { push } from 'connected-react-router';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { RoutingPath } from '../../../../../../routes/routing-pass';
// import { useDispatch } from 'react-redux';
// import { DialogActions } from '../../../../../../redux/dialog/dialog.action';
import { Button } from '../../../../../ui/button/button';
import { IconButton } from '../../../../../ui/button/icon-button/icon-button';
// import { CustomerDetailPC } from '../../../../pages/customer-detail/customer-detail.pc';
// import { CustomerEdit } from '../../../../pages/customer/edit/customer-edit';

type Props = {
  id: number;
}

/** @deprecated 使用しない */
export const CustomerCardList = (props: Props) => {
  const dispatch = useDispatch();

  const { id } = props;
  window.console.log(`id${id}(CustomerCardList)`);

  const handleClickCustomerDetail = useCallback(
    () => {
      // <CustomerEdit mode="update" />;

      // <CustomerDetailPC />;

      dispatch(push(`${RoutingPath.customerDetail}/${id}`));

      // dispatch(DialogActions.push({
      //   title: '顧客登録',
      //   // element: <CustomerNewRegistration />,
      //   element: <CustomerEdit mode="update" />,
      // }));
    }, [],
  );

  return (
    <div className="card">
      <div>山田太郎（ヤマダタロウ）</div><br />
      <div>〒120-0043</div><br />
      <div>東京都足立区千住宮町27-6</div><br />
      <div>TEL: aaaaa@aaaaaa.com<IconButton fontAwesomeClass="" /></div><br />
      <div>担当者：長谷川太郎</div><br />
      <div style={{ display: 'flex' }}>
        <Button value="aaa" onClick={handleClickCustomerDetail}>詳細検索</Button>
        <Button>案件登録</Button>
        <Button>対応登録</Button>
        <br />
      </div>
    </div>
  );
};
