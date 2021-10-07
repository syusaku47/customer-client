import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { cloneDeep } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { UserAgent } from '../../../utilities/user-agent';
import { DefaultButton, DefaultInput, SearchBtn } from './route-dialog.component';
import { Button } from '../../ui/button/button';
import { SystemActions } from '../../../redux/system/system.action';
import { RouteDialogCollection as RDC } from './route-dialog.collection';
import { DialogActions } from '../../../redux/dialog/dialog.action';
import { StepPreviewDialog } from './step-preview-dialog/step-preview-dialog';
import { RouteModel } from '../../../model/map/route.mode';
import { MapActions } from '../../../redux/map/map.action';
import { State } from '../../../redux/root.reducer';
import { RouteInfo } from '../../../type/map/map.type';
import './route-dialog.scss';
import { BottomBorderButton } from '../../ui/button/bottom-border/bottom-border-button';
import { SetSelectedClass } from '../../../utilities/set-selected-class';
import iconBicycle, { ReactComponent as IconBicycle } from '../../../asset/images/icon/bicycle-solid.svg';
import iconCar, { ReactComponent as IconCar } from '../../../asset/images/icon/car-solid.svg';
import iconWalking, { ReactComponent as IconWalking } from '../../../asset/images/icon/walking-solid.svg';
import iconExchange from '../../../asset/images/icon/exchange-alt-solid.svg';

type Props = {
  type: 'customer' | 'project';
  start?: string;
  destination?: string;
  callback: () => void;
}

export const RouteDialog = (props: Props) => {
  const {
    // eslint-disable-next-line
    type,
    start: _start,
    destination: _destination,
    callback,
  } = props;

  // eslint-disable-next-line
  const iconList = [iconWalking, iconBicycle, iconCar];
  const iconComponentList = [<IconWalking />, <IconBicycle />, <IconCar />];
  const dispatch = useDispatch();
  const routeInfo = useSelector((state: State) => state.map.routeInfo, isEqual);
  const humanPos = useSelector((state: State) => state.map.humanPos, isEqual);

  /* State */
  const [mode, setMode] = useState<globalThis.google.maps.TravelMode>(
    globalThis.google.maps.TravelMode.WALKING,
  );
  const [previewDisabled, setPreviewDisabled] = useState(true);
  const [legsData, setLegsData] = useState<globalThis.google.maps.DirectionsLeg[]>([]);
  const [start, setStart] = useState('');
  const [showStart, setShowStart] = useState('');
  const [wayPoints, setWayPoints] = useState(['', '', '', '', '', '']);
  const [destination, setDestination] = useState('');
  // テスト用
  // const [start, setStart] = useState('東京都台東区浅草橋');
  // const [wayPoints, setWayPoints] = useState(['スカイツリー', '', '', '', '', '']);
  // const [destination, setDestination] = useState('大阪府大阪市北区西天満2-3-5');

  // eslint-disable-next-line
  const [startAnaly, setStartAnaly] = useState(RDC.initialTotalAnaly());
  const [wayPointsAnaly, setWayPointsAnaly] = useState(new Array(6).fill(RDC.initialAnaly()));
  const [totalAnaly, setTotalAnaly] = useState(RDC.initialTotalAnaly());

  /* Ref */
  const headerEle = useRef<HTMLDivElement>(null);

  /* Callback */
  /* 経由地Input */
  const changePoints = useCallback((v:string, index: number) => {
    wayPoints[index] = v;
    setWayPoints(cloneDeep(wayPoints));
  }, [wayPoints]);

  /* 初期化 */
  const initialize = useCallback(() => {
    setLegsData([]);
    setStartAnaly(RDC.initialTotalAnaly());
    setWayPointsAnaly(cloneDeep(new Array(6).fill(RDC.initialAnaly())));
    setTotalAnaly(RDC.initialTotalAnaly());
  }, []);

  /* 再計算 */
  const reCalc = useCallback((param?:RouteInfo) => {
    initialize();

    // 送るWayPoints
    const sendPoint: { location: string; }[] = [];
    wayPoints.forEach((v) => {
      if (v) {
        sendPoint.push({ location: v });
      }
    });

    // API処理
    console.log(param);

    if (!param) {
      try {
        dispatch(SystemActions.isLoading(true));
        new globalThis.google.maps.DirectionsService().route({
          origin: start,
          destination,
          travelMode: mode,
          waypoints: sendPoint.length
            ? sendPoint
            : undefined,
        }, ((res, status) => {
          // 成功結果判定
          if (status === globalThis.google.maps.DirectionsStatus.OK && res) {
            const { routes } = res;
            const route = cloneDeep(routes[0]);
            const { legs } = route;
            if (!legs) {
              dispatch(SystemActions.isLoading(false));
              return;
            }

            setLegsData(cloneDeep(legs));

            // 経由地があった場合
            if (legs.length > 1) {
              legs.forEach((v, i) => {
                if (i) {
                  wayPointsAnaly[i - 1] = cloneDeep({
                    duration: v.duration?.text || '',
                    distance: v.distance?.text || '',
                  });
                } else {
                  setStartAnaly(cloneDeep({
                    duration: v.duration?.text || '',
                    distance: v.distance?.text || '',
                  }));
                }
              });
              setWayPointsAnaly(cloneDeep(wayPointsAnaly));
              setTotalAnaly(RouteModel.totalDurationDistance(legs));
            } else {
              setStartAnaly(cloneDeep({
                duration: legs[0].duration?.text || '',
                distance: legs[0].distance?.text || '',
              }));
              setTotalAnaly(RouteModel.totalDurationDistance(legs));
            }
            setPreviewDisabled(false);
            dispatch(SystemActions.isLoading(false));
          } else {
            dispatch(DialogActions.pushMessage({
              title: 'ルート検索',
              message: ['ルートの検索に失敗しました'],
            }));
          }
        }));
      } catch (error) {
        dispatch(DialogActions.pushMessage({
          title: 'ルート検索',
          message: ['ルートの検索に失敗しました'],
        }));
      } finally {
        dispatch(SystemActions.isLoading(false));
      }
      return;
    }

    const legs = param?.legs || [];
    setLegsData(cloneDeep(legs));
    if (legs.length > 1) {
      legs.forEach((v, i) => {
        if (i) {
          wayPointsAnaly[i - 1] = cloneDeep({
            duration: v.duration?.text || '',
            distance: v.distance?.text || '',
          });
        } else {
          setStartAnaly(cloneDeep({
            duration: v.duration?.text || '',
            distance: v.distance?.text || '',
          }));
        }
      });
      setWayPointsAnaly(cloneDeep(wayPointsAnaly));
      setTotalAnaly(RouteModel.totalDurationDistance(legs));
      setTotalAnaly({
        duration: legs[0].duration?.text || '',
        distance: legs[0].distance?.text || '',
      });
      setPreviewDisabled(false);
    } else if (legs.length === 1) {
      setStartAnaly(cloneDeep({
        duration: legs[0].duration?.text || '',
        distance: legs[0].distance?.text || '',
      }));
      setTotalAnaly({
        duration: legs[0].duration?.text || '',
        distance: legs[0].distance?.text || '',
      });
      setPreviewDisabled(false);
    }
  }, [
    mode,
    start,
    wayPoints,
    destination,
    wayPointsAnaly,
    totalAnaly,
  ]);

  /* モードの変更 */
  const changeMode = useCallback((i:number) => {
    switch (i) {
      case 0:
        setMode(globalThis.google.maps.TravelMode.WALKING);
        break;
      case 1:
        setMode(globalThis.google.maps.TravelMode.BICYCLING);
        break;
      case 2:
        setMode(globalThis.google.maps.TravelMode.DRIVING);
        break;
      default:
        break;
    }
  }, []);

  /* Input Value 入れ替え */
  const changeUpnDown = useCallback((i: number) => {
    const stay = wayPoints[i];
    wayPoints[i] = wayPoints[i + 1];
    wayPoints[i + 1] = stay;
    setWayPoints(cloneDeep(wayPoints));
  }, [wayPoints]);

  /* 道順 */
  const stepPreview = useCallback((legIndex: number) => {
    const startV = legIndex ? wayPoints[legIndex - 1] : start;

    let endV = '';
    if (!legIndex) {
      if (wayPoints[0]) {
        // eslint-disable-next-line prefer-destructuring
        endV = wayPoints[0];
      } else if (destination) {
        endV = destination;
      }
    } else if (wayPoints[legIndex]) {
      endV = wayPoints[legIndex];
    } else if (destination) {
      endV = destination;
    }

    dispatch(DialogActions.push({
      title: '道順',
      element: <StepPreviewDialog
        startValue={startV}
        endValue={endV}
        data={legsData[legIndex]}
        legIndex={legIndex}
      />,
    }));
  }, [legsData, wayPoints, start, destination]);

  const handleClickShow = useCallback(() => {
    const sendPoint:string[] = [];
    wayPoints.forEach((v) => {
      if (v) {
        sendPoint.push(v);
      }
    });
    dispatch(MapActions.setRouteInfo({
      travelMode: mode,
      start,
      wayPoints: cloneDeep(sendPoint),
      destination,
      legs: cloneDeep(legsData),
    }));
    dispatch(DialogActions.pop());
    callback();
  }, [callback, start, wayPoints, destination, legsData, mode]);

  /* State */
  useEffect(() => {
    if (routeInfo) {
      setStart(routeInfo.start);
      setLegsData(cloneDeep(routeInfo.legs));
      setDestination(routeInfo.destination);
      routeInfo.wayPoints.forEach((v, i) => {
        wayPoints[i] = v;
      });
      setWayPoints(cloneDeep(wayPoints));
      setMode(routeInfo.travelMode);
      reCalc(routeInfo);
      return;
    }

    // 出発地点
    if (_start) {
      setShowStart(_start);
      setStart('現在地');
    } else if (humanPos) {
      setStart(
        `${humanPos.lat}, ${humanPos.lng}`,
      );
      setShowStart('現在地');
    }

    // 目的地
    if (_destination) {
      setDestination(_destination);
    }
  }, []);

  return (
    UserAgent === 'pc'
      ? (
        /* ============================= PC側 ============================= */
        <div className={`route_dialog ${UserAgent} flex_box`}>
          <div className="route_dialog__body flex_box">

            <div className="route_dialog__body__header flex_box">
              {/* 方法選択 */}
              <div
                className="ui attached tabular menu"
                ref={headerEle}
              >
                {RDC.travelMode.map((v, i) => (
                  <button
                    className={`item ${i === 0 ? 'selected' : ''}`}
                    key={v + i}
                    onClick={(e) => {
                      changeMode(i);
                      SetSelectedClass(e.currentTarget, headerEle.current);
                    }}
                  >
                    <>
                      {iconComponentList[i]}
                      <span>{v}</span>
                    </>
                  </button>
                ))}

                <div className="route_dialog__body__header__time flex_box">
                  {/* TODO 総合計算の実装 */}
                  {`総移の合計時間（総距離）: ${totalAnaly.duration}（${totalAnaly.distance}）`}
                  <DefaultButton
                    label="計算"
                    onClick={() => reCalc()}
                    disabled={!start || !destination}
                    icon={<i className="far fa-clock" />}
                    className="icon_btn"
                    size="sm"
                  />
                </div>
              </div>
            </div>

            <div className="route_dialog__body__contents">
              {/* 出発地 */}
              <div className="item_wrap">
                <div className="item_box">
                  <div className="item_head">出発地</div>
                  <DefaultInput
                    label=""
                    value={showStart || start}
                    onChange={(v) => {
                      if (showStart) {
                        setStart('');
                        setShowStart('');
                      } else {
                        setStart(v);
                      }
                    }}
                  />
                  <SearchBtn
                    type="customer"
                    onClick={(v) => {
                      setShowStart('');
                      setStart(v);
                    }}
                    size="sm"
                  />
                  <SearchBtn
                    type="project"
                    onClick={(v) => {
                      setShowStart('');
                      setStart(v);
                    }}
                    size="sm"
                  />
                  <SearchBtn
                    type="address"
                    onClick={(v) => {
                      setShowStart('');
                      setStart(v);
                    }}
                    size="sm"
                  />
                </div>

                <div className="item_box">
                  <Button
                    disabled
                    onClick={() => {}}
                    className="invisible"
                    size="sm"
                  >
                    <img src={iconExchange} alt="" />
                  </Button>
                  <DefaultButton
                    size="sm"
                    label="道順"
                    onClick={() => stepPreview(0)}
                    disabled={
                    ((!start || !wayPoints[0])
                      && (!start || !destination))
                    || previewDisabled
                  }
                    color="white"
                    className="route"
                  />
                  <div className="time_distance">
                    {`${startAnaly.duration}（${startAnaly.distance}）`}
                  </div>
                </div>
              </div>

              {/* 経由地 */}
              {wayPoints.map((v, i, ary) => {
                // input・search
                const disabled = Boolean(i && !ary[i - 1]);
                // 上下ボタン
                const upnDownDisabled = !v || !ary[i + 1];
                // 道順
                const preDisabled = !((v && ary[i + 1]) || (v && destination));
                return (
                  <>
                    <div className="item_wrap" key={v + i}>
                      <div className="item_box">
                        <DefaultInput
                          label={`経由地${i + 1}`}
                          value={v}
                          onChange={(val) => changePoints(val, i)}
                          disabled={disabled}
                        />
                        <SearchBtn
                          type="customer"
                          disabled={disabled}
                          onClick={(val) => changePoints(val, i)}
                          size="sm"
                        />
                        <SearchBtn
                          type="project"
                          disabled={disabled}
                          onClick={(val) => changePoints(val, i)}
                          size="sm"
                        />
                      </div>

                      <div className="item_box">
                        <Button
                          disabled={upnDownDisabled}
                          onClick={() => changeUpnDown(i)}
                          className="exchange"
                          size="sm"
                        >
                          <img src={iconExchange} alt="" />
                        </Button>
                        <DefaultButton
                          label="道順"
                          onClick={() => stepPreview(i + 1)}
                          disabled={preDisabled || previewDisabled}
                          color="white"
                          size="sm"
                          className="route"
                        />
                        <div className="time_distance">
                          {`${wayPointsAnaly[i].duration}（${wayPointsAnaly[i].distance}）`}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}

              {/* 目的地 */}
              <div className="item_wrap">
                <div className="item_box">
                  <DefaultInput
                    label="目的地"
                    value={destination}
                    onChange={setDestination}
                  />
                  <SearchBtn
                    type="customer"
                    onClick={setDestination}
                    size="sm"
                  />
                  <SearchBtn
                    type="project"
                    onClick={setDestination}
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="base_footer">
            <Button
              onClick={handleClickShow}
              disabled={!start || !destination}
              color="primary"
              size="sm"
            >
              ルート表示
            </Button>
          </div>
        </div>
      ) : (
        /* ============================= SP側 ============================= */
        <div className={`route_dialog ${UserAgent}`}>

          {/* 移動手段 */}
          <div
            className="route_dialog__header"
            ref={headerEle}
          >
            {RDC.travelMode.map((v, i) => (
              <BottomBorderButton
                key={v + i}
                label={v}
                icon={<img src={iconList[i]} alt="" />}
                onClick={(e) => {
                  changeMode(i);
                  SetSelectedClass(e.currentTarget, headerEle.current);
                }}
                selected={i === 0}
              />
            ))}
          </div>

          {/* 出発地 */}
          <div className="route_dialog__body">
            <div className="route_dialog__body__route start">
              <div className="route_dialog__body__route__header">
                <span>出発地</span>
                <SearchBtn
                  type="customer"
                  onClick={setStart}
                  icon={<i className="fas fa-search" />}
                  className="icon_btn"
                />
                <SearchBtn
                  type="project"
                  onClick={setStart}
                  icon={<i className="fas fa-search" />}
                  className="icon_btn"
                />
                <SearchBtn
                  type="address"
                  onClick={setStart}
                  icon={<i className="fa fa-map-marked-alt" />}
                  className="map_search"
                />
              </div>

              <div className="route_dialog__body__route__body">
                <DefaultInput
                  value={start}
                  onChange={setStart}
                />
                <div>
                  <Button
                    disabled
                    onClick={() => {}}
                    className="invisible"
                  >
                    <img src={iconExchange} alt="" />
                  </Button>
                  <DefaultButton
                    label="道順"
                    onClick={() => stepPreview(0)}
                    disabled={
                    ((!start || !wayPoints[0])
                      && (!start || !destination))
                    || previewDisabled
                  }
                    color="white"
                    className="route"
                  />
                  <div className="dot_border" />
                  <div>
                    {`${startAnaly.duration}（${startAnaly.distance}）`}
                  </div>
                </div>
              </div>
            </div>

            {/* 経由地 */}
            {wayPoints.map((v, i, ary) => {
            // input・search
              const disabled = Boolean(i && !ary[i - 1]);
              // 上下ボタン
              const upnDownDisabled = !v || !ary[i + 1];
              // 道順
              const preDisabled = !((v && ary[i + 1]) || (v && destination));
              return (
                <div className="route_dialog__body__route" key={v + i}>
                  <div className="route_dialog__body__route__header">
                    <span>{`経由地${i + 1}`}</span>
                    <SearchBtn
                      type="customer"
                      disabled={disabled}
                      onClick={() => {}}
                      icon={<i className="fas fa-search" />}
                      className="icon_btn"
                    />
                    <SearchBtn
                      type="project"
                      disabled={disabled}
                      onClick={() => {}}
                      icon={<i className="fas fa-search" />}
                      className="icon_btn"
                    />
                  </div>

                  <div className="route_dialog__body__route__body">
                    <DefaultInput
                      value={v}
                      onChange={(val) => changePoints(val, i)}
                      disabled={disabled}
                    />
                    <div>
                      <Button
                        disabled={upnDownDisabled}
                        onClick={() => changeUpnDown(i)}
                        className="exchange"
                      >
                        <img src={iconExchange} alt="" />
                      </Button>
                      <div>
                        <DefaultButton
                          label="道順"
                          onClick={() => stepPreview(i + 1)}
                          disabled={preDisabled || previewDisabled}
                          color="white"
                          className="route"
                        />
                      </div>
                      <div className="dot_border" />
                      <div>
                        {`${wayPointsAnaly[i].duration}（${wayPointsAnaly[i].distance}）`}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* 目的地 */}
            <div className="route_dialog__body__route end">
              <div className="route_dialog__body__route__header">
                <span>目的地</span>
                <SearchBtn
                  type={type}
                  onClick={setDestination}
                  icon={<i className="fas fa-search" />}
                  className="icon_btn"
                />
                <SearchBtn
                  type="project"
                  onClick={setDestination}
                  icon={<i className="fas fa-search" />}
                  className="icon_btn"
                />
              </div>
              <div className="route_dialog__body__route__body">
                <DefaultInput
                  value={destination}
                  onChange={setDestination}
                />
              </div>
            </div>
          </div>

          <div className="route_dialog__footer">
            <div>
              {/* TODO 総合計算の実装 */}
              <div>{`移動の合計時間: ${totalAnaly.duration}`}</div>
              <div>{`移動の総距離: ${totalAnaly.distance}`}</div>
            </div>

            <div>
              <DefaultButton
                label="計算"
                onClick={() => reCalc()}
                disabled={!start || !destination}
                icon={<i className="far fa-clock" />}
                className="icon_btn"
              />

              <Button
                onClick={callback}
                disabled={!start || !destination}
                color="primary"
              >
                ルート表示
              </Button>
            </div>
          </div>
        </div>
      )
  );
};
