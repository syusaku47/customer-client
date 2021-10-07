import { InfoWindow, Marker } from '@react-google-maps/api';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { MapActions } from '../../../../../redux/map/map.action';
import { Position, Size, Address } from '../../../../../type/map/map.type';
import { UserAgent } from '../../../../../utilities/user-agent';
import { RouteDialog } from '../../../../dialogs/route-dialog/route-dialog';
// import { Button } from '../../../button/button';
import { LeftIconButton } from '../../../button/left-icon-button/left-icon-button';

export type SearchMarkerProps = {
  position: Position;
  address: Address | null;
  option?: {
    pixelOffset?: Size;
    isRegistrationAddress?: {
      callback: (address: Address | null) => void;
      label?: string;
    };
  };
};

export const SearchMarker = (props: SearchMarkerProps) => {
  const dispatch = useDispatch();
  const {
    position, address, option,
  } = props;

  const [isInfo, setIsInfo] = useState(true);
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    if (option?.isRegistrationAddress) return;
    dispatch(
      MapActions.api.getLocationImg({
        param: {
          size: { h: 100, w: 100 },
          location: position,
        },
        callback: (url) => {
          setImgUrl(url || '');
        },
      }),
    );
  }, [position]);

  const handleClickRegistration = useCallback(
    () => {
      if (!option?.isRegistrationAddress) return;
      option.isRegistrationAddress.callback(address);
    },
    [address],
  );

  const handleClickHere = useCallback(() => {
    dispatch(DialogActions.push({
      title: 'ルート設定',
      element: <RouteDialog
        type="customer"
        destination={address?.formattedAddress}
        callback={() => { }}
      />,
    }));
    setIsInfo(false);
  }, [address]);

  return (
    <>
      <Marker
        onClick={() => setIsInfo(true)}
        position={position}
        animation={globalThis.google.maps.Animation.DROP}
        zIndex={99}
        onDragStart={() => {
          dispatch(MapActions.setRouteInfo(null));
          setIsInfo(false);
        }}
        onDragEnd={(e) => {
          const pos = e.latLng;
          if (pos) {
            dispatch(MapActions.api.geocoder({
              param: {
                param: {
                  location: pos,
                },
              },
              callback: () => {
                setIsInfo(true);
                dispatch(MapActions.setZoomLevel(null));
              },
            }));
          }
        }}
        draggable
        clickable
      />
      {isInfo && (
        <InfoWindow
          position={position}
          onCloseClick={() => setIsInfo(false)}
          options={option}
        >
          <div className={`searchMarkerWindow ${UserAgent}`}>
            <div className="flex_box">
              <div className="google">{imgUrl && <img src={imgUrl} alt="" />}</div>
              <div className="text_box">
                <div className="address">{address?.formattedAddress}</div>
                <div className="to_google">
                  <a
                    href={`https://maps.google.co.jp/maps?q=${position.lat},${position.lng}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    &raquo; GoogleMapで開く
                  </a>
                </div>
                <div className="btn_box">
                  {!option?.isRegistrationAddress && (
                  <LeftIconButton
                    label="ルート表示"
                    fontAwesomeClass="fas fa-route"
                    className="ml_10"
                    size="sm"
                    color="secondary"
                    onClick={handleClickHere}
                    // disabled
                  />
                  )}
                  {option?.isRegistrationAddress && (
                  <LeftIconButton
                    label={option?.isRegistrationAddress.label || 'この住所で登録'}
                    fontAwesomeClass="fas fa-edit"
                    className="ml_10"
                    size="sm"
                    color="secondary"
                    onClick={handleClickRegistration}
                  />
                  )}
                </div>
              </div>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};
