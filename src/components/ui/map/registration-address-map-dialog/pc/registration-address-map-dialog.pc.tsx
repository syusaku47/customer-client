import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { MapBase } from '../../map-base';
import './registration-address-map-dialog.pc.scss';
import { MapActions } from '../../../../../redux/map/map.action';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { Address } from '../../../../../type/map/map.type';
import { InputField } from '../../../input-field/input-field';
import { LeftIconButton } from '../../../button/left-icon-button/left-icon-button';
import { CustomerListType } from '../../../../../type/customer/customer.type';
import { MaintenanceList } from '../../../../../type/maintenance/maintenance.type';
import { ProjectListType } from '../../../../../type/project/project.type';
import { useDidMount } from '../../../../../hooks/life-cycle';
import { CustomerActions } from '../../../../../redux/customer/customer.action';
import { ProjectActions } from '../../../../../redux/project/project.action';
import { MaintenanceActions } from '../../../../../redux/maintenance/maintenance.action';

export type Props = {
  type?: 'customer' | 'project' | 'maintenance'
  callbackData?: (data: CustomerListType | MaintenanceList | ProjectListType) => void;
  callback?: (address: Address | null) => void;
  label?: string;
};

export const RegistrationAddressMapDialogPC = (props:Props) => {
  const {
    callback, type, callbackData, label,
  } = props;

  /* Hooks */
  const dispatch = useDispatch();

  /* State */
  const [searchValue, setSearchValue] = useState('');

  /* Callback */
  const handleClickSearch = useCallback(() => {
    dispatch(MapActions.setGpsStatus('out'));
    dispatch(MapActions.api.geocoder({
      param: {
        param: {
          address: searchValue,
        },
      },
      callback: () => dispatch(MapActions.setZoomLevel(null)),
    }));
  },
  [searchValue]);

  const searchOption = useMemo(() => {
    switch (type) {
      case 'customer':
        return ({
          customerOption: {
            type: 0,
            callbackMapRegist: callbackData,
          },
          label: label || '登録',
        });
      case 'project':
        return ({
          projectOption: {
            type: 0,
            callbackMapRegist: callbackData,
          },
          label: label || '登録',
        });
      case 'maintenance':
        return ({
          maintenanceOption: {
            type: 0,
            callbackMapRegist: callbackData,
          },
          label: label || '登録',
        });
      default:
        return ({
          searchOption: {
            isRegistrationAddress: {
              callback: (address:Address | null) => {
                if (callback) callback(address);
                dispatch(DialogActions.pop());
              },
              label: label || '登録',
            },
          },
        });
    }
  }, [type, callbackData]);

  /* Effect */
  useEffect(() => () => {
    dispatch(MapActions.setGpsStatus('out'));
    dispatch(MapActions.setSearchPos(null));
    dispatch(MapActions.setSearchAddress(null));
  }, []);

  useDidMount(() => {
    if (type === 'customer') {
      dispatch(CustomerActions.api.customer.getList({
        limit: 9999,
      }));
    }

    if (type === 'project') {
      dispatch(ProjectActions.api.project.getList({
        limit: 9999,
      }));
    }

    if (type === 'maintenance') {
      dispatch(MaintenanceActions.api.maintenance.getList({
        param: {
          limit: 9999,
        },
      }));
    }
  });

  return (
    <div className="registrationAddressMapDialog">
      <MapBase {...searchOption} noGps />
      <div className="map_search_box">
        <div className="search_box item_wrap">
          <div className="item_box">
            <InputField
              onEnterKeyPress={handleClickSearch}
              // labelPlace="left"
              // label="場所を検索"
              className="item_box"
              value={searchValue}
              placeholder="場所を検索"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <LeftIconButton
              label="検索"
              fontAwesomeClass="fas fa-search"
              className="ml_10"
              size="sm"
              color="secondary"
              onClick={handleClickSearch}
            />
          </div>
        </div>
      </div>
    </div>

  );
};
