import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import './test-detail.sp.scss';
import { push } from 'connected-react-router';

import { useParams } from 'react-router-dom';
import { RoutingPath } from '../../../../routes/routing-pass';
import { Button } from '../../../ui/button/button';
import { RouteDialog } from '../../../dialogs/route-dialog/route-dialog';
import { DialogActions } from '../../../../redux/dialog/dialog.action';

export const TestDetailSP = () => {
  const { id } = useParams<{ id: string; }>();
  const dispatch = useDispatch();

  const handleClickBack = useCallback(() => {
    dispatch(push(RoutingPath.testPage));
  }, []);

  return (
    <div>
      <Button onClick={() => dispatch(DialogActions.push({
        title: 'ルート設定',
        element: <RouteDialog type="customer" callback={() => {}} />,
      }))}
      >
        ルート検索ダイアログ表示
      </Button>
      <h2>TestDetail</h2>
      <div>
        id :  {id}
      </div>
      <div>
        <button onClick={handleClickBack}>戻る</button>
      </div>
    </div>
  );
};
