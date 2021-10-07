import 'semantic-ui-css/semantic.min.css';
import './App.scss';
import { useEffect, useRef } from 'react';
import BodyClassName from 'react-body-classname';
import { Routes } from './routes/routes';
import { Loading } from './components/ui/loading/loading';
import { Dialog } from './components/dialogs/dialog';
import { noPinch } from './utilities/no-pinch';
import { UserAgent } from './utilities/user-agent';
import { useDidMount } from './hooks/life-cycle';
import { useInitialize } from './hooks/use-initialize';

const App = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pinchCallback = noPinch(ref.current);
    return pinchCallback;
  }, [ref]);

  useDidMount(() => {
    const body = document.getElementById('body');
    if (body) {
      body.className = UserAgent;
    }
  });

  useInitialize();

  return (
    <BodyClassName className={UserAgent}>
      <div
        className="App"
        ref={ref}
        // style={{ height: window.innerHeight }}
      >
        <Routes />
        <Dialog />
        <Loading />
      </div>
    </BodyClassName>
  );
};

export default App;
