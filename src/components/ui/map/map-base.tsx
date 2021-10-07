import './map-base.scss';
import {
  GoogleMap,
  GoogleMapProps,
  // Marker,
  MarkerClusterer,
} from '@react-google-maps/api';
import React, {
  memo,
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomerListType } from '../../../type/customer/customer.type';
import { CustomerMarker } from './marker/customer-marker/customer-marker';
import { MapActions } from '../../../redux/map/map.action';
import { HumanMarker } from './marker/human-marker/human-marker';
import { State } from '../../../redux/root.reducer';
import { SearchMarker } from './marker/search-marker/search-marker';
import {
  MapMouseEvent, MapType, Size, Address, Position,
} from '../../../type/map/map.type';
import { ProjectListType } from '../../../type/project/project.type';
import { useDidMount, useWillUnMount } from '../../../hooks/life-cycle';
import { ProjectMarker } from './marker/project-marker/project-marker';
import { SystemActions } from '../../../redux/system/system.action';
import { GpsButton } from './gps-button/gps-button';
import { MapCollection } from '../../../collection/map/map.collection';
import { UserAgent } from '../../../utilities/user-agent';
import { ProjectInfoWindowPC } from '../info-window/project-info-window/pc/project-info-window.pc';
import { ProjectInfoWindowSP } from '../info-window/project-info-window/sp/project-info-window.sp';
import { Direction } from './direction/direction';
import { CustomerInfoWindowSP } from '../info-window/customer-info-window/sp/customer-info-window.sp';
import { CustomerInfoWindowPC } from '../info-window/customer-info-window/pc/customer-info-window.pc';
import { MaintenanceList } from '../../../type/maintenance/maintenance.type';
import { MaintenanceMarker } from './marker/maintenance-marker/maintenance-marker';
import { MaintenanceInfoWindowPC } from '../info-window/maintenance-info-window/pc/maintenance-info-window.pc';
import { MaintenanceInfoWindowSP } from '../info-window/maintenance-info-window/sp/maintenance-info-window.sp';
import { LeftIconButton } from '../button/left-icon-button/left-icon-button';
import { DialogActions } from '../../../redux/dialog/dialog.action';
import { SearchAddressDialog } from './search-address-dialog.tsx/search-address-dialog';

type CommonOptionType<T = any> = {
  type: number;
  selectInfo?: T | null;
  selectIndex?: number;
  callbackActiveMarker?: (id: number) => void;
  callbackMapRegist?: (v: T) => void;
}

export type MapProps = {
  customerOption?: CommonOptionType<CustomerListType>,
  projectOption?: CommonOptionType<ProjectListType>,
  maintenanceOption?: CommonOptionType<MaintenanceList>,
  searchOption?: {
    isRegistrationAddress?: {
      callback: (address: Address | null) => void;
      label?: string;
    };
  },
  isNowPoint?: boolean;
  label?: string;
  noGps?: boolean;
} & GoogleMapProps;

export const MapBase = memo((props: MapProps) => {
  const {
    children,
    customerOption,
    projectOption,
    maintenanceOption,
    searchOption,
    onLoad,
    onTilesLoaded,
    onClick,
    label,
    noGps,
  } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const {
    searchPos,
    searchAddress,
    centerPos,
    humanPos,
    gpsStatus,
    routeInfo,
    zoomLevel,
  } = useSelector((state: State) => state.map);

  const cList = useSelector((state: State) => state.customer.list);
  const pList = useSelector((state: State) => state.project.list);
  const mList = useSelector((state: State) => state.maintenance.list);

  /* State */
  const [maps, setMaps] = useState<MapType | null>(null);
  const [size, setSize] = useState<undefined | Size>(undefined);
  const [isGpsLoad, setIsGpsLoad] = useState(true);
  // eslint-disable-next-line
  const [southPos, setSouthPos] = useState<Position | null>(null);
  // eslint-disable-next-line
  const [northPos, setNorthPos] = useState<Position | null>(null);

  // eslint-disable-next-line
  const mapType = useMemo(() => (UserAgent === 'sp' ? globalThis.google.maps.MapTypeControlStyle.DROPDOWN_MENU : undefined), [UserAgent]);

  // Customer
  const [customer, setCustomer] = useState<CustomerListType | null>(null);
  const [customerIndex, setCustomerIndex] = useState(NaN);
  const [customerInfo, setCustomerInfo] = useState(false);
  const [customerActiveId, setCustomerActiveId] = useState(NaN);
  const customerList = useMemo(() => (!customerOption?.type
    ? cList
    : cList.filter(
      (v) => v.ob_flag === customerOption.type,
    )
  ), [customerOption?.type, cList]);

  useEffect(() => {
    if (maps && customerOption) {
      const bounds = new globalThis.google.maps.LatLngBounds();
      cList.forEach((v) => {
        bounds.extend(new globalThis.google.maps.LatLng(Number(v.lat), Number(v.lng)));
      });

      // maps.fitBounds(bounds);
    }
  }, [cList, maps]);

  // Project
  const [project, setProject] = useState<ProjectListType | null>(null);
  const [projectIndex, setProjectIndex] = useState(NaN);
  const [projectInfo, setProjectInfo] = useState(false);
  const [projectActiveId, setProjectActiveId] = useState(NaN);
  const projectList = useMemo(() => (!projectOption?.type
    ? pList
    : pList.filter(
      (v) => v.koji_flag === projectOption.type,
    )
  ), [projectOption?.type, pList]);

  useEffect(() => {
    if (maps && projectOption) {
      const bounds = new globalThis.google.maps.LatLngBounds();
      pList.forEach((v) => {
        bounds.extend(new globalThis.google.maps.LatLng(Number(v.lat), Number(v.lng)));
      });
      // maps.fitBounds(bounds);
    }
  }, [pList, maps]);

  // Maintenance
  const [maintenance, setMaintenance] = useState<MaintenanceList | null>(null);
  const [maintenanceIndex, setMaintenanceIndex] = useState(NaN);
  const [maintenanceInfo, setMaintenanceInfo] = useState(false);
  const [maintenanceActiveId, setMaintenanceActiveId] = useState(NaN);
  const maintenanceList = useMemo(() => (!maintenanceOption?.type
    ? mList
    : mList.filter(
      (v) => (v.fixed_flag ? 2 : 1) === maintenanceOption.type,
    )
  ), [maintenanceOption?.type, mList]);

  useEffect(() => {
    if (maps && maintenanceOption) {
      const bounds = new globalThis.google.maps.LatLngBounds();
      mList.forEach((v) => {
        bounds.extend(new globalThis.google.maps.LatLng(Number(v.lat), Number(v.lng)));
      });
      // maps.fitBounds(bounds);
    }
  }, [mList, maps]);

  /* Callback */
  const createOffsetSize = () => {
    setSize(new window.google.maps.Size(0, -45));
  };

  const handleGpsOut = useCallback(
    () => {
      if (gpsStatus === 'watch') {
        dispatch(MapActions.setGpsStatus('out'));
      }
    },
    [gpsStatus, isGpsLoad],
  );

  const handleOnLoad = useCallback(
    (map: MapType) => {
      setMaps(map);

      if (!searchOption?.isRegistrationAddress) {
        // dispatch(SystemActions.isLoading(true));
      }
      createOffsetSize();
      map.setOptions({
        mapTypeControlOptions: {
          style: mapType,
          position: globalThis.google.maps.ControlPosition.TOP_RIGHT,
        },
        zoomControlOptions: {
          position: UserAgent === 'pc' ? 7.0 : 8.0,
        },
        streetViewControlOptions: {
          position: UserAgent === 'pc' ? 7.0 : 8.0,
        },
        controlSize: 40,
      });
      if (onLoad) onLoad(map);
    },
    [onLoad, mapType],
  );

  const handleOnTilesLoaded = useCallback(
    () => {
      if (maps) {
        const bounds = maps.getBounds();
        if (!bounds) return;
        const sPos = bounds.getSouthWest();

        const nPos = bounds.getNorthEast();
        if (sPos && nPos) {
          dispatch(MapActions.setMapAreaPosition({
            s: {
              lat: sPos.lat(),
              lng: sPos.lng(),
            },
            n: {
              lat: nPos.lat(),
              lng: nPos.lng(),
            },
          }));
        }
      }
      dispatch(SystemActions.isLoading(false));
      if (onTilesLoaded) onTilesLoaded();
    },
    [onTilesLoaded, maps],
  );

  const handleOnClick = useCallback(
    (e:MapMouseEvent) => {
      dispatch(SystemActions.isLoading(false));

      if (customerOption) {
        if (customerOption.callbackActiveMarker) { customerOption.callbackActiveMarker(NaN); }
        setCustomerActiveId(NaN);
        setCustomerIndex(NaN);
        setCustomerInfo(false);
        dispatch(MapActions.setSearchAddress(null));
        dispatch(MapActions.setSearchPos(null));
      }

      if (projectOption) {
        if (projectOption.callbackActiveMarker) { projectOption.callbackActiveMarker(NaN); }
        setProjectActiveId(NaN);
        setProjectInfo(false);
        setProjectIndex(NaN);
        dispatch(MapActions.setSearchAddress(null));
        dispatch(MapActions.setSearchPos(null));
      }

      if (maintenanceOption) {
        if (maintenanceOption.callbackActiveMarker) { maintenanceOption.callbackActiveMarker(NaN); }
        setMaintenanceActiveId(NaN);
        setMaintenanceInfo(false);
        setMaintenanceIndex(NaN);
        dispatch(MapActions.setSearchAddress(null));
        dispatch(MapActions.setSearchPos(null));
      }

      if (searchOption?.isRegistrationAddress) {
        dispatch(MapActions.setGpsStatus('out'));
        if (!e.latLng) return;
        if (searchPos) {
          dispatch(MapActions.setSearchPos(null));
          dispatch(MapActions.setSearchAddress(null));
          return;
        }
        const res = new globalThis.google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
        dispatch(MapActions.api.geocoder({
          param: {
            param: {
              location: res,
            },
          },
        }));
      }
      if (onClick) onClick(e);
    },
    [
      onClick,
      searchOption,
      searchPos,
      setCustomerInfo,
      projectOption,
      customerOption,
      maintenanceOption,
    ],
  );

  const handleClickGps = useCallback(
    () => {
      // setEndPosition(humanPos);
      setIsGpsLoad(true);
      dispatch(MapActions.setCenterPos(humanPos));
      dispatch(MapActions.setGpsStatus('watch'));
      setIsGpsLoad(false);
    },
    [humanPos],
  );

  const handleOnZoomChanged = useCallback(
    () => {
      const nowZoomLevel = maps?.getZoom();
      if (nowZoomLevel) dispatch(MapActions.setZoomLevel(nowZoomLevel));
    }, [maps],
  );

  const handleClickAddressSearch = useCallback(
    () => {
      dispatch(DialogActions.push({
        title: '住所検索',
        element: <SearchAddressDialog />,
      }));
    },
    [],
  );

  /* Effect */
  useDidMount(() => {
    // if (customerOption) { dispatch(CustomerActions.api.customer.getList({})); }
    // if (projectOption) { dispatch(ProjectActions.api.project.getList({})); }

    dispatch(MapActions.gps.start({
      onFirstLoaded: true,
      callback: () => {
        setIsGpsLoad(false);
        if (gpsStatus === 'watch') {
          // dispatch(MapActions.setCenterPos(v));
        }
      },
    }));
    if (noGps) {
      dispatch(MapActions.setGpsStatus('out'));
    } else {
      dispatch(MapActions.setGpsStatus('watch'));
    }
    dispatch(MapActions.setSearchPos(null));
    dispatch(MapActions.setRouteInfo(null));
    dispatch(MapActions.setZoomLevel(null));
  });

  useEffect(() => {
    setCustomerInfo(false);
    setProjectInfo(false);
    setMaintenanceInfo(false);
  }, [routeInfo]);

  useEffect(() => {
    if (searchPos) {
      setProjectActiveId(NaN);
      setCustomerActiveId(NaN);
      setMaintenanceActiveId(NaN);
      setCustomerIndex(NaN);
      setProjectIndex(NaN);
      setMaintenanceIndex(NaN);
    }
  }, [searchPos]);

  useEffect(() => {
    const val = customerOption?.selectInfo;
    const index = customerOption?.selectIndex;
    if (val && !Number.isNaN(index) && index !== undefined) {
      setCustomer(val);
      setCustomerIndex(index);
      setCustomerActiveId(val.id);
      setCustomerInfo(true);
    }
  }, [customerOption?.selectInfo, customerOption?.selectIndex]);

  useEffect(() => {
    const val = projectOption?.selectInfo;
    const index = projectOption?.selectIndex;
    if (val && !Number.isNaN(index) && index !== undefined) {
      setProject(val);
      setProjectIndex(index);
      setProjectActiveId(val.id);
      setProjectInfo(true);
    }
  }, [projectOption?.selectInfo, projectOption?.selectIndex]);

  useEffect(() => {
    const val = maintenanceOption?.selectInfo;
    const index = maintenanceOption?.selectIndex;
    if (val && !Number.isNaN(index) && index !== undefined) {
      setMaintenance(val);
      setMaintenanceIndex(index);
      setMaintenanceActiveId(val.id);
      setMaintenanceInfo(true);
    }
  }, [maintenanceOption?.selectInfo, maintenanceOption?.selectIndex]);

  useWillUnMount(() => {
    setMaps(null);
  });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '100%',
        }}
        center={centerPos || MapCollection.testCenter}
        clickableIcons={false}
        zoom={zoomLevel}
        onDragEnd={() => {
          handleGpsOut();
          if (maps) {
            const bounds = maps.getBounds();
            if (!bounds) return;
            const sPos = bounds.getSouthWest();
            const nPos = bounds.getNorthEast();
            if (sPos && nPos) {
              dispatch(MapActions.setMapAreaPosition({
                s: {
                  lat: sPos.lat(),
                  lng: sPos.lng(),
                },
                n: {
                  lat: nPos.lat(),
                  lng: nPos.lng(),
                },
              }));
              // setSouthPos({
              // });
              // setNorthPos({
              //   lat: nPos.lat(),
              //   lng: nPos.lng(),
              // });
            }
          }
        }}
        onLoad={handleOnLoad}
        onTilesLoaded={handleOnTilesLoaded}
        onClick={handleOnClick}
        onZoomChanged={handleOnZoomChanged}
      >
        {/* Googleアイコン制御禁止用Div */}
        <div
          className="icon_cover"
          onClick={(e) => e.stopPropagation()}
        />

        {/* 現在地マーカー */}
        { humanPos && <HumanMarker position={humanPos} />}

        {/* 検索結果マーカー */}
        {(searchOption && searchPos) && (
          <SearchMarker
            position={searchPos}
            address={searchAddress}
            option={searchOption.isRegistrationAddress ? {
              pixelOffset: size,
              isRegistrationAddress: {
                callback: (address) => {
                  searchOption.isRegistrationAddress?.callback(address);
                },
                label: searchOption.isRegistrationAddress.label,
              },
            } : {
              pixelOffset: size,
            }}
          />
        )}

        { customerOption && (
          <MarkerClusterer options={{
            imagePath: MapCollection.clusterImg,
            maxZoom: MapCollection.clusterMaxZoom,
          }}
          >
            {(clusterer) => customerList.map((v, i) => (
              <CustomerMarker
                key={`c${Number(v.lat)}${Number(v.lng)}${i}`}
                customer={v}
                activeId={customerActiveId}
                callback={() => {
                  setCustomerActiveId(v.id);
                  setCustomerIndex(i);
                  if (customerOption.callbackActiveMarker) {
                    customerOption.callbackActiveMarker(v.id);
                  }
                  setCustomer(v);
                  setCustomerInfo(true);
                  dispatch(MapActions.setZoomLevel(20));
                }}
                clusterer={clusterer}
              />
            ))}
          </MarkerClusterer>
        )}

        {/* 顧客マーカー */}
        {/* { customerOption && customerList.map((v, i) => (
        // {zoomLevel > 13 && customerOption && customerList.map((v, i) => (
          <CustomerMarker
            key={`customer-marker${i}`}
            customer={v}
            activeId={customerActiveId}
            callback={() => {
              setCustomerActiveId(v.id);
              if (customerOption.callbackActiveMarker) {
                customerOption.callbackActiveMarker(v.id);
              }
              setCustomer(v);
              setCustomerInfo(true);
            }}
          />
        ))} */}

        {/* 案件マーカー */}
        { projectOption && (
          <MarkerClusterer options={{
            imagePath: MapCollection.clusterImg,
            maxZoom: MapCollection.clusterMaxZoom,
          }}
          >
            {(clusterer) => projectList.map((v, i) => (
              <ProjectMarker
                key={`p${Number(v.lat)}${Number(v.lng)}${i}`}
                project={v}
                activeId={projectActiveId}
                callback={() => {
                  setProjectActiveId(v.id);
                  if (projectOption.callbackActiveMarker) {
                    projectOption.callbackActiveMarker(v.id);
                  }
                  setProject(v);
                  setProjectIndex(i);
                  setProjectInfo(true);
                }}
                clusterer={clusterer}
              />
              // <CustomerMarker
              //   key={Number(v.lat) + Number(v.lng)}
              //   customer={v}
              //   activeId={customerActiveId}
              //   callback={() => {
              //     setCustomerActiveId(v.id);
              //     if (customerOption.callbackActiveMarker) {
              //       customerOption.callbackActiveMarker(v.id);
              //     }
              //     setCustomer(v);
              //     setCustomerInfo(true);
              //     dispatch(MapActions.setZoomLevel(20));
              //   }}
              //   clusterer={clusterer}
              // />
            ))}
          </MarkerClusterer>
        )}
        {/* {projectOption && projectList.map((v, i) => (
        // {zoomLevel > 13 && projectOption && projectList.map((v, i) => (
          <ProjectMarker
            key={`project-marker${i}`}
            project={v}
            activeId={projectActiveId}
            callback={() => {
              setProjectActiveId(v.id);
              if (projectOption.callbackActiveMarker) {
                projectOption.callbackActiveMarker(v.id);
              }
              setProject(v);
              setProjectInfo(true);
            }}
          />
        ))} */}

        {/* メンテナンスマーカー */}
        { maintenanceOption && (
          <MarkerClusterer options={{
            imagePath: MapCollection.clusterImg,
            maxZoom: MapCollection.clusterMaxZoom,
          }}
          >
            {(clusterer) => maintenanceList.map((v, i) => (
              <MaintenanceMarker
                key={`m${Number(v.lat)}${Number(v.lng)}${i}`}
                maintenance={v}
                activeId={maintenanceActiveId}
                callback={() => {
                  setMaintenanceActiveId(v.id);
                  if (maintenanceOption.callbackActiveMarker) {
                    maintenanceOption.callbackActiveMarker(v.id);
                  }
                  setMaintenance(v);
                  setMaintenanceIndex(i);
                  setMaintenanceInfo(true);
                }}
                clusterer={clusterer}
              />
              // <CustomerMarker
              //   key={Number(v.lat) + Number(v.lng)}
              //   customer={v}
              //   activeId={customerActiveId}
              //   callback={() => {
              //     setCustomerActiveId(v.id);
              //     if (customerOption.callbackActiveMarker) {
              //       customerOption.callbackActiveMarker(v.id);
              //     }
              //     setCustomer(v);
              //     setCustomerInfo(true);
              //     dispatch(MapActions.setZoomLevel(20));
              //   }}
              //   clusterer={clusterer}
              // />
            ))}
          </MarkerClusterer>
        )}
        {/* {maintenanceOption && maintenanceList.map((v, i) => (
          <MaintenanceMarker
            key={`maintenance-marker${i}`}
            maintenance={v}
            activeId={maintenanceActiveId}
            callback={() => {
              setMaintenanceActiveId(v.id);
              if (maintenanceOption.callbackActiveMarker) {
                maintenanceOption.callbackActiveMarker(v.id);
              }
              setMaintenance(v);
              setMaintenanceInfo(true);
            }}
          />
        ))} */}

        {/* ルート検索 */}
        {routeInfo && <Direction />}
        {children}

      </GoogleMap>

      <LeftIconButton
        label="住所検索"
        fontAwesomeClass="fas fa-map"
        className="search-address"
        onClick={handleClickAddressSearch}
        size="md"
        color="white"
      />

      <GpsButton onClick={handleClickGps} />

      {/* 顧客Info */}
      {customerInfo && customer && !searchPos && (
        UserAgent === 'pc'
          ? (
            <CustomerInfoWindowPC
              callbackRegist={customerOption?.callbackMapRegist}
              customer={customer}
              callbackClose={() => {
                if (customerOption?.callbackActiveMarker) {
                  customerOption.callbackActiveMarker(NaN);
                }
                setCustomerActiveId(NaN);
                setCustomerInfo(false);
              }}
              index={customerIndex}
              label={label}
            />
          )
          : (
            <CustomerInfoWindowSP
              customer={customer}
              callbackRegist={customerOption?.callbackMapRegist}
              callBack={() => setCustomerInfo(false)}
              index={customerIndex}
              label={label}
            />
          )
      )}
      {projectInfo && project && !searchPos && (
        UserAgent === 'pc'
          ? (
            <ProjectInfoWindowPC
              callbackRegist={projectOption?.callbackMapRegist}
              project={project}
              callbackClose={() => {
                if (projectOption?.callbackActiveMarker) {
                  projectOption.callbackActiveMarker(NaN);
                }
                setProjectActiveId(NaN);
                setProjectInfo(false);
              }}
              index={projectIndex}
              label={label}
            />
          )
          : (
            <ProjectInfoWindowSP
              project={project}
              callBack={() => setProjectInfo(false)}
              callbackRegist={projectOption?.callbackMapRegist}
              index={projectIndex}
              label={label}
            />
          )
      )}

      {maintenanceInfo && maintenance && !searchPos && (
        UserAgent === 'pc'
          ? (
            <MaintenanceInfoWindowPC
              callbackRegist={maintenanceOption?.callbackMapRegist}
              maintenance={maintenance}
              callbackClose={() => {
                if (maintenanceOption?.callbackActiveMarker) {
                  maintenanceOption.callbackActiveMarker(NaN);
                }
                setMaintenanceActiveId(NaN);
                setMaintenanceInfo(false);
              }}
              index={maintenanceIndex}
            />
          )
          : (
            <MaintenanceInfoWindowSP
              maintenance={maintenance}
              callBack={() => setMaintenanceInfo(false)}
              index={maintenanceIndex}
            />
          )
      )}
    </div>
  );
});
