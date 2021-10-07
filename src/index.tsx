import { render } from 'react-dom';
import './index.css';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { LoadScript } from '@react-google-maps/api';
import jaLocale from 'date-fns/locale/ja';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { history, Store } from './redux/store';
import { ExtendedUtils } from './utilities/date-utils';
import { MapCollection } from './collection/map/map.collection';

render(
  <Provider store={Store}>
    <ConnectedRouter history={history}>
      <LoadScript googleMapsApiKey={MapCollection.apiKey}>
        <MuiPickersUtilsProvider utils={ExtendedUtils} locale={jaLocale}>
          <App />
        </MuiPickersUtilsProvider>
      </LoadScript>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
