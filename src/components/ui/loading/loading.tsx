import { useSelector } from 'react-redux';
import './loading.scss';
import { Dimmer, Loader } from 'semantic-ui-react';
import { State } from '../../../redux/root.reducer';

export const Loading = () => {
  const isLoading = useSelector((state: State) => state.system.isLoadingCount);
  return isLoading > 0 ? (
    <Dimmer active style={{ zIndex: 10000000 }}>
      <Loader size="massive" inverted content="Loading" />
    </Dimmer>
  ) : (
    <></>
  );
};
