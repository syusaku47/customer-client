import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import './test-page.sp.scss';
import * as AutoKana from 'vanilla-autokana';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Input } from 'semantic-ui-react';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { RoutingPath } from '../../../../routes/routing-pass';
import { TestActions } from '../../../../redux/test/test.action';
import { DatePicker } from '../../../ui/date-picker/date-picker';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { SearchBoxCustomerSP } from '../customer/serch-box/customer-search-box.sp';
import { Button } from '../../../ui/button/button';
import { RouteDialog } from '../../../dialogs/route-dialog/route-dialog';
import { ChangePasswordDialogSP } from '../../layout/header/change-password-dialog/change-password-dialog.sp';

let autokana: AutoKana.AutoKana | null = null;

const defaultMaterialTheme = createMuiTheme({
  typography: {
  },
});

export const TestPageSP = () => {
  const dispatch = useDispatch();

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

  const handleClickMasterPage = useCallback(
    () => {
      dispatch(push(RoutingPath.master));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(DialogActions.push({
      title: '顧客検索',
      element: <SearchBoxCustomerSP callback={() => {
      }}
      />,
    }));
  }, []);

  const [name, setName] = useState('');
  const [furigana, setFurigana] = useState('');

  const handleNameInput = useCallback(
    (e: globalThis.React.FormEvent<HTMLInputElement>) => {
      setName(e.currentTarget.value);
      if (autokana) { setFurigana(autokana.getFurigana()); }
    },
    [],
  );

  useEffect(() => {
    autokana = AutoKana.bind('name', 'furigana');
  }, []);

  const [state, setstate] = useState<Date | null>(null);

  return (
    <div>
      <h1>Test Page</h1>
      <Button onClick={() => dispatch(DialogActions.push({
        title: 'ルート設定',
        element: <RouteDialog type="customer" callback={() => {}} />,
        className: '',
      }))}
      >
        ルート検索ダイアログ表示
      </Button>

      <ThemeProvider theme={defaultMaterialTheme}>
        <KeyboardDatePicker
          value={state}
          inputVariant="outlined"
          autoOk
          onChange={(v) => setstate(v)}
          format="yyyy/MM/dd"
          InputAdornmentProps={{ position: 'end' }}
        />
      </ThemeProvider>
      <DatePicker
        date={state}
        onChange={(v) => setstate(v)}
      />
      <div>
        <Input />
      </div>
      <div>
        ふりがなテスト
        <input value={name} name="name" id="name" onInput={handleNameInput} />
        <input value={furigana} name="furigana" id="furigana" onChange={(e) => setFurigana(e.target.value)} />
      </div>
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
      <div>
        <button onClick={handleClickMasterPage}>マスタ管理へ</button>
      </div>

      <div>
        <button onClick={() => { dispatch(push(`${RoutingPath.sendPassword}`)); }}>パスワード再発行(reset_password)</button><br />
        <button onClick={() => dispatch(push(`${RoutingPath.changePassword}`))}>パスワード再設定(chgpassword (out))</button><br />
        <button onClick={() => {
          dispatch(DialogActions.push({
            title: 'パスワード変更',
            element: <ChangePasswordDialogSP />,
          }));
        }}
        >パスワード再設定(chgpassword (in))
        </button>
      </div>

      <br /><br />
      <button onClick={() => {
        window.console.log(window.navigator.userAgent.toLowerCase().indexOf('mobile') > -1 ? 'sp' : 'pc');
      }}
      >userAgent
      </button>

    </div>
  );
};
