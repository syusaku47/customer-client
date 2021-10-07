import { createHashHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import { RootReducer, State } from './root.reducer';
import { RootSaga } from './root.saga';

// history
export const history = createHashHistory();

// redux-saga
const sagaMiddleWare = createSagaMiddleware();

// redux-persist
const persistedReducer = persistReducer({
  key: 'auth',
  whitelist: ['auth'],
  // blacklist: ["user", "event"],5
  storage,
  debug: true,
}, RootReducer(history));

// redux-logger
const reduxLogger = createLogger({
  collapsed: true,
  diff: true,
  duration: true,
});

// redux-loggerの切り替え
const isLogger = false;

// ストア生成
export const ConfigureStore = (preloadState?: State) => {
  // const middleware = [sagaMiddleWare, routerMiddleware(history)];
  const middleware = isLogger
    ? [reduxLogger, sagaMiddleWare, routerMiddleware(history)]
    : [sagaMiddleWare, routerMiddleware(history)];
  const middlewareEnhancer = applyMiddleware(...middleware);
  const store = createStore(
    persistedReducer,
    preloadState as any,
    middlewareEnhancer,
  );
  const persist = persistStore(store);
  sagaMiddleWare.run(RootSaga);
  return { store, persist };
};

const obj = ConfigureStore();
export const Store = obj.store;
export const Persist = obj.persist;
