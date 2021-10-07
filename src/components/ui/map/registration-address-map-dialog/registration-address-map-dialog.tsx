import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDidMount } from '../../../../hooks/life-cycle';
import { CustomerActions } from '../../../../redux/customer/customer.action';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { MapActions } from '../../../../redux/map/map.action';
import { ProjectActions } from '../../../../redux/project/project.action';
import { CustomerListType } from '../../../../type/customer/customer.type';
import { MaintenanceList } from '../../../../type/maintenance/maintenance.type';
import { Address } from '../../../../type/map/map.type';
import { ProjectListType } from '../../../../type/project/project.type';
import { noPinch } from '../../../../utilities/no-pinch';
import { MapBase } from '../map-base';
import './registration-address-map-dialog.scss';

export type Props = {
  type?: 'customer' | 'project' | 'maintenance'
  callbackData?: (data:CustomerListType | MaintenanceList | ProjectListType) => void;
  callback?: (address: Address | null) => void;
};

export const RegistrationAddressMapDialog = (props:Props) => {
  const { callback, type, callbackData } = props;
  const ele = useRef<HTMLDivElement>(null);

  /* Hooks */
  const dispatch = useDispatch();

  /* Callback */
  const mapHeight = window.innerHeight * 0.83;
  // const mapHeight = window.innerHeight * 0.79;

  const searchOption = useMemo(() => {
    switch (type) {
      case 'customer':
        return ({
          customerOption: {
            type: 0,
            callbackMapRegist: callbackData,
          },
        });
      case 'project':
        return ({
          projectOption: {
            type: 0,
            callbackMapRegist: callbackData,
          },
        });
      case 'maintenance':
        return ({
          maintenanceOption: {
            type: 0,
            callbackMapRegist: callbackData,
          },
        });
      default:
        return ({
          searchOption: {
            isRegistrationAddress: {
              callback: (address: Address | null) => {
                if (callback) callback(address);
                dispatch(DialogActions.pop());
              },
            },
          },
        });
    }
  }, [type, callbackData]);

  /* Effect */
  useEffect(() => () => {
    dispatch(MapActions.setSearchPos(null));
    dispatch(MapActions.setSearchAddress(null));
  }, []);

  useEffect(() => {
    const pinchCallback = noPinch(ele.current);
    return pinchCallback;
  }, [ele]);

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
  });

  return (
    <div className="registrationAddressMapDialog" style={{ width: '100%', height: mapHeight }} ref={ele}>
      <MapBase {...searchOption} />
    </div>
  );
};
