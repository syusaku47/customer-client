import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import './test-page.pc.scss';
import { Rnd } from 'react-rnd';
import { RoutingPath } from '../../../../routes/routing-pass';
import { TestActions } from '../../../../redux/test/test.action';
import { useDidMount } from '../../../../hooks/life-cycle';
import { DatePicker } from '../../../ui/date-picker/date-picker';
import { ColorPicker } from '../../../ui/color-picker/color-picker';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { RouteDialog } from '../../../dialogs/route-dialog/route-dialog';
import { Button } from '../../../ui/button/button';
// import { InputTel } from '../../../ui/input/input-tel';
import { InputNumber } from '../../../ui/input/input-number';

const Example = () => {
  const [state, setstate] = useState(0);

  return (
    <div onClick={() => setstate(state + 1)}>
      初期は0:{state}
    </div>
  );
};

export const TestPagePC = () => {
  const dispatch = useDispatch();

  const [state, setstate] = useState<Date | null>(null);

  const handleClick = useCallback(
    () => {
      dispatch(push(`${RoutingPath.testDetail}/1`));
    },
    [dispatch],
  );
  const click2BasePage = useCallback(
    () => {
      dispatch(push(RoutingPath.customer));
    },
    [dispatch],
  );

  const handleClickReduxTestAlert = useCallback(
    () => {
      dispatch(TestActions.testAlert('アラート テスト 成功'));
    },
    [dispatch],
  );

  const handleClickReduxTestApi = useCallback(
    (type: 'POST' | 'GET' | 'DELETE') => {
      const action = TestActions.api.str;
      const str = `${type} API`;
      switch (type) {
        case 'GET':
          dispatch(action.get(str));
          break;
        case 'POST':
          dispatch(action.post(str));
          break;
        case 'DELETE':
          dispatch(action.delete(str));
          break;
        default:
          break;
      }
    },
    [dispatch],
  );

  useDidMount(() => {

    // new globalThis.google.maps.DirectionsService().route({
    //   origin: '東京駅',
    //   destination: 'スカイツリー',
    //   travelMode: globalThis.google.maps.TravelMode.DRIVING,
    //   waypoints: [
    //     { location: '秋葉原駅' },
    //     { location: '浅草橋駅' },
    //   ],
    // }, ((res) => {
    //   console.log(res);
    // }));
  });

  const [color, setcolor] = useState('');
  const [tel, setTel] = useState(0);

  const [count, setcount] = useState(0);
  return (
    <div>

      <Button onClick={() => dispatch(DialogActions.push({
        title: 'ルート設定',
        element: <RouteDialog type="customer" callback={() => {}} />,
        className: 'max_width_dialog',
      }))}
      >
        ルート検索ダイアログ表示
      </Button>
      <button onClick={() => handleClickReduxTestApi('GET')}>ルート検索</button>
      <h1>Test Page</h1>
      <DatePicker
        type="year/month"
        date={state}
        onChange={setstate}
      />
      <div>
        API TEST：
        <button onClick={() => handleClickReduxTestApi('GET')}>GET</button>
        <button onClick={() => handleClickReduxTestApi('POST')}>POST</button>
        <button onClick={() => handleClickReduxTestApi('DELETE')}>DELETE</button>
      </div>
      <div>
        <button onClick={handleClickReduxTestAlert}>Redux Test Alert</button>
      </div>
      <div>
        <button onClick={handleClick}>テスト2へ</button>
      </div>
      <div>
        <button onClick={click2BasePage}>BasePageへ</button>
      </div>

      <br />
      <div>
        <button onClick={() => { dispatch(push(`${RoutingPath.sendPassword}`)); }}>パスワード再発行(reset_password)</button><br />
        <button onClick={() => dispatch(push(`${RoutingPath.changePassword}`))}>パスワード再設定(chgpassword (out))</button><br />
      </div>

      <div>
        ------------------------------------------------------------------------------
      </div>

      <Rnd
        style={{ backgroundColor: 'orange' }}
        default={{
          x: 0,
          y: 0,
          width: '100px',
          height: '100px',
        }}
        disableDragging
        dragAxis="y"
        enableResizing={{
          top: false,
          left: false,
          right: true,
          bottom: true,
          bottomLeft: false,
          bottomRight: false,
          topRight: false,
          topLeft: false,
        }}
        resizeHandleComponent={{
          right: <div>aaaaaa</div>,
        }}
      >
        <div
          style={{ backgroundColor: 'green' }}
        >aaa
        </div>
      </Rnd>
      <ColorPicker
        color={color}
        callbackColor={setcolor}
      />
      <div>
        tel : <InputNumber
          decimalPlace={0}
          value={tel}
          onChange={setTel}
          minusPermission
          maxPlace={5}
        />
        {/* tel : <InputTel value={tel} onChange={setTel} /> */}
      </div>
      <button onClick={() => setcount(count + 1)}>aaaaa</button>
      <Example key={`ex${count}`} />
    </div>
  );
};
