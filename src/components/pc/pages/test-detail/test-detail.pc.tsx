import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import './test-detail.pc.scss';
import { push } from 'connected-react-router';

import { useParams } from 'react-router-dom';
import { RoutingPath } from '../../../../routes/routing-pass';

export const TestDetailPC = () => {
  const { id } = useParams<{ id: string; }>();
  const dispatch = useDispatch();

  const handleClickBack = useCallback(() => {
    dispatch(push(RoutingPath.testPage));
  }, []);

  return (
    <div>
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
