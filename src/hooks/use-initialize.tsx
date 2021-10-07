import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { DialogActions } from '../redux/dialog/dialog.action';
import { useDidMount } from './life-cycle';
import { Config } from '../config/config';

export const useInitialize = () => {
  const dispatch = useDispatch();
  const path = useLocation().pathname;

  useDidMount(() => {
    console.log('Start Mode : ', Config.mode);
    // dispatch(AuthActions.api.user());
  });

  useEffect(() => {
    dispatch(DialogActions.clear());
  }, [path]);
};
