import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { Input } from 'semantic-ui-react';
import { MapActions } from '../../../../redux/map/map.action';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { Button } from '../../button/button';
import { noPinch } from '../../../../utilities/no-pinch';

export const SearchAddressDialog = () => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState('');
  const searchRef = useRef<any | null>(null);
  const ele = useRef<HTMLDivElement>(null);

  const handleClickSearch = useCallback(
    () => {
      dispatch(MapActions.setGpsStatus('out'));
      dispatch(MapActions.api.geocoder({
        param: { param: { address: searchValue } },
        callback: () => {
          dispatch(DialogActions.pop());
          dispatch(MapActions.setZoomLevel(null));
        },
      }));
    },
    [searchValue],
  );

  useEffect(() => searchRef?.current.focus(), [searchRef]);

  useEffect(() => {
    const pinchCallback = noPinch(ele.current);
    return pinchCallback;
  }, [ele]);

  return (
    <div className="googlg_map_search" style={{ textAlign: 'center', padding: '10px 20px' }} ref={ele}>
      <div style={{ marginTop: '40px' }}>
        <div style={{ marginBottom: '10px' }}>場所または住所を入力してください</div>
        <div onKeyPress={(e) => { if (e.key === 'Enter') handleClickSearch(); }}>
          <Input onChange={(e) => setSearchValue(e.target.value)} ref={searchRef} />
        </div>
      </div>

      <div className="base_dialog_content_inner_footer" style={{ marginTop: '30px' }}>
        <Button size="md" color="primary" onClick={handleClickSearch}>検索</Button>
      </div>
    </div>
  );
};
