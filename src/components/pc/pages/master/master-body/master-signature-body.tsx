import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { MasterActions } from '../../../../../redux/master/master.action';
import { State } from '../../../../../redux/root.reducer';
import { MasterCollection } from '../master.collection';
import { MasterBodyDirectInput, MasterDirectInputGetListParam } from './body/master-body-direct-input';

export const MasterSignatureBody = () => {
  /* Hook */
  const list = useSelector((state:State) => state.master.signatureList);
  const dispatch = useDispatch();

  /* Callback */
  const getList = useCallback((v:MasterDirectInputGetListParam) => {
    dispatch(MasterActions.api.signature.getList({
      ...v,
    }));
  }, []);

  const openEditDialog = useCallback(() => {
  }, [getList]);

  const tableList = useMemo(() => list.map((v) => ([
    v.item,
    v.name,
  ])), [list]);

  return (
    <MasterBodyDirectInput
      header={MasterCollection.signatureMasterHeader}
      rowDataList={list}
      list={tableList}
      callbackEdit={openEditDialog}
      callbackGetList={getList}
      defaultOrder={14}
    />
  );
};
