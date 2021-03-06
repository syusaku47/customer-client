import { goBack } from 'connected-react-router';
import { cloneDeep } from 'lodash';
import isEqual from 'lodash/isEqual';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { EstimateCalcModelPC } from '../../../../collection/estimate/estimate-calc.model.pc';
import { EstimateCollection } from '../../../../collection/estimate/estimatecollection';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { EstimateActions } from '../../../../redux/estimate/estimate.action';
import { GetTax } from '../../../../redux/master/api/master-tax/api-master-tax';
import { ProjectActions } from '../../../../redux/project/project.action';
import { State } from '../../../../redux/root.reducer';
import { EditPriceAreaState, Estimate } from '../../../../type/estimate/estimate.type';
import { DateFormatter } from '../../../../utilities/date-formatter';
import { getTermDay } from '../../../../utilities/get-term-day';
import { MathHelper } from '../../../../utilities/math-helper';
import { openEmail } from '../../../../utilities/open-email';
import { Button } from '../../../ui/button/button';
import { IconButton } from '../../../ui/button/icon-button/icon-button';
import { LeftIconButton } from '../../../ui/button/left-icon-button/left-icon-button';
import { EstimateDetailListSP } from '../../layout/body/list/estimate/estimate-detail-list';
import { OrderSP } from '../../layout/order/order.sp';
import { BasePageSP } from '../base.page.sp';
import { EstimateEditSP } from '../estimate/edit/estimate-edit.sp';
import { EstimateEditDialogTitle } from '../estimate/edit/estimate-edit.type.sp';
import { EstimateSearchBoxSP } from '../estimate/serch-box/estimate-search-box.sp';
import { DetailPriceEditSP } from './edit/detail-price-edit.sp';
import { EstimateDetailEditSP } from './edit/estimate-detail-edit.sp';
import './estimate-detail.sp.scss';

export const EstimateDetailSP = () => {
  /* Hooks */
  const { id } = useParams<{ id: string; }>();
  const _estimateInfo = useSelector((state:State) => state.estimate.estimate);
  /** ???????????????????????????????????????????????????????????? */
  const [estimateInfo, setEstimateInfo] = useState<Estimate | null>(_estimateInfo);
  const meisaiList = useSelector((state: State) => state.estimate.meisaiList, isEqual);
  const dispatch = useDispatch();

  /* State */
  const [editState, setEditState] = useState(
    EstimateCollection.editInitialState,
  );
  const [isSort, setIsSort] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpenPriceArea, setIsOpenPriceArea] = useState(false);
  const [
    priceArea,
    setPriceArea,
  ] = useState<EditPriceAreaState>(EstimateCollection.priceAreaInitialState);
  const [estimateTax, setEstimateTax] = useState(0);

  /* ref */
  const priceDetailEditButton = React.createRef();

  /* Callback */
  const handleClickEdit = useCallback(() => {
    dispatch(DialogActions.push({
      title: '??????????????????',
      element: <EstimateDetailEditSP
        estimateId={Number(id)}
        callback={() => dispatch(
          EstimateActions.api.meisai.getList({ param: { id: Number(id) } }),
        )}
      />,
    }));
  }, []);
  const handlerChangeSortMode = useCallback(() => {
    if (isSort) {
      setSelectedIndex(-1);
      // TODO ??????????????????????????????
      // dispatch(EstimateActions.api.meisai.postList({
      //   param: {
      //     id: estimateInfo?.id || 0,
      //     detail_id: [],
      //   },
      // }));
    }
    setIsSort(!isSort);
  }, [isSort, estimateInfo, meisaiList]);

  const handleClickCopy = useCallback(() => {
    if (!estimateInfo?.project_id) return;
    dispatch(ProjectActions.api.project.get({
      param: { id: estimateInfo.project_id },
      callback: (res) => {
        /** ?????????ID?????? */
        dispatch(EstimateActions.api.id.get({
          project_id: estimateInfo.project_id,
          callback: (data) => {
            /** ???????????? */
            dispatch(EstimateActions.api.meisai.postList({
              param: {
                id: data.id,
                detail_id: meisaiList.map((v) => (v.id)),
              },
              onSuccess: () => {
                /** ??????????????????????????? */
                dispatch(EstimateActions.api.meisai.getList({
                  param: {
                    id: data.id,
                  },
                  callback: (meisai) => {
                    dispatch(DialogActions.push({
                      title: EstimateEditDialogTitle.add,
                      element: <EstimateEditSP
                        mode="add"
                        // data={editState}
                        projectData={cloneDeep(res)}
                        id={data.id}
                        meisaiList={meisai}
                      />,
                    }));
                  },
                }));
              },
            }));
          },
        }));
      },
    }));
  }, [estimateInfo?.project_id, editState, meisaiList]);

  const handleClickMail = useCallback(() => {
    openEmail({
      address: '',
      /* TODO ?????? */
      subject: '????????????',
      body: ['Test'],
    });
  }, [estimateInfo]);

  /* TODO ????????????????????????estimate??????????????????????????????????????? */
  const handleClickOrder = useCallback(() => {
    dispatch(DialogActions.push({
      title: '????????????',
      element: <OrderSP estimateId={Number(id)} />,
    }));
  }, []);
  const handlerClickMeisaiUp = useCallback(() => {
    if (!meisaiList[selectedIndex] || !meisaiList[selectedIndex - 1]) {
      return;
    }
    const temp = meisaiList[selectedIndex - 1];
    meisaiList[selectedIndex - 1] = meisaiList[selectedIndex];
    meisaiList[selectedIndex] = temp;
    dispatch(EstimateActions.setMeisaiList(meisaiList));
    setSelectedIndex(selectedIndex - 1);
  }, [meisaiList, selectedIndex]);
  const handlerClickMeisaiDown = useCallback(() => {
    if (!meisaiList[selectedIndex] || !meisaiList[selectedIndex + 1]) {
      return;
    }
    const temp = meisaiList[selectedIndex + 1];
    meisaiList[selectedIndex + 1] = meisaiList[selectedIndex];
    meisaiList[selectedIndex] = temp;
    dispatch(EstimateActions.setMeisaiList(meisaiList));
    setSelectedIndex(selectedIndex + 1);
  }, [meisaiList, selectedIndex]);

  /* Effect */
  useEffect(() => {
    if (!_estimateInfo) return;
    setEditState({
      ...editState,
      ...estimateInfo,
      quote_date: new Date(_estimateInfo.quote_date),
      order_construction_start: new Date(_estimateInfo.order_construction_start),
      order_construction_end: new Date(_estimateInfo.order_construction_end),
      quote_expiration_date: new Date(_estimateInfo.quote_expiration_date),
      order_expected_date: new Date(_estimateInfo.order_expected_date),
    });
    setEstimateInfo(_estimateInfo);
  }, [_estimateInfo]);

  useEffect(() => {
    dispatch(EstimateActions.api.estimate.get({
      param: { id: Number(id) },
    }));
    dispatch(EstimateActions.api.meisai.getList({
      param: { id: Number(id) },
    }));

    return () => {
      dispatch(EstimateActions.setEstimate(null));
      dispatch(EstimateActions.setMeisaiList([]));
    };
  }, [id]);

  const termDay = useMemo(() => {
    if (!estimateInfo?.order_construction_start || !estimateInfo?.order_construction_end) { return ''; }
    return getTermDay(
      new Date(estimateInfo.order_construction_start),
      new Date(estimateInfo.order_construction_end),
    );
  }, [
    estimateInfo?.order_construction_start,
    estimateInfo?.order_construction_end,
  ]);

  // price area????????????
  useEffect(() => {
    console.log('price area', estimateTax);

    if (estimateTax) {
      // PC????????????????????????
      setPriceArea(EstimateCalcModelPC.calc(
        priceArea,
        meisaiList,
        estimateTax,
      ));
    } else if (estimateInfo) {
      GetTax(estimateInfo.quote_date)
        .then((res) => {
          setEstimateTax(res);
          // PC????????????????????????
          setPriceArea(EstimateCalcModelPC.calc(
            priceArea,
            meisaiList,
            res,
          ));
        });
    }
  }, [meisaiList, estimateInfo, estimateTax]);

  return (
    <BasePageSP
      className="estimateDetail estimate_detail_sp"
      searchBoxDialog={{
        title: '????????????',
        element: <EstimateSearchBoxSP callback={() => dispatch(DialogActions.pop())} />,
      }}
    >
      <div className="detail_wrap">
        <div className="detail_header estimate_detail_sp__header">
          <div
            className="detail_header_inner estimate_detail_sp__header__inner"
            onClick={() => dispatch(goBack())}
          >
            <div
              className="detail_header_inner__back_btn"
            >
              <i className="fas fa-chevron-circle-left" />
            </div>
            <span>
              ????????????
            </span>
          </div>
        </div>

        <div className="estimate_detail_sp__container">
          <div className="estimate_detail_sp__container__info">
            <div className="estimate_detail_sp__container__info__top">
              <div className="col1">
                <div className="row">
                  <div className="row__col1">?????????</div>
                  <div className="row__col2">???</div>
                  <div className="row__col3">{estimateInfo?.project_name || '---'}</div>
                </div>
                <div className="row">
                  <div className="row__col1">?????????</div>
                  <div className="row__col2">???</div>
                  {/* TODO front ??????????????????????????????????????????????????????????????????????????????EstimateListType??????????????????????????????????????? */}
                  <div className="row__col3">{estimateInfo?.customer_name || '---'}</div>
                </div>
                <div className="row">
                  <div className="row__col1">????????????</div>
                  <div className="row__col2">???</div>
                  <div className="row__col3">{estimateInfo?.field_name || '---'}</div>
                </div>
                <div className="row">
                  <div className="row__col1">???????????????</div>
                  <div className="row__col2">???</div>
                  <div className="row__col3">{estimateInfo?.quote_creator_name || '---'}</div>
                </div>
                <div className="row">
                  <div className="row__col1">????????????</div>
                  <div className="row__col2">???</div>
                  {/* TODO front ??????????????????????????????????????????????????????????????????????????????EstimateListType??????????????????????????????????????? */}
                  <div className="row__col3 important">{estimateInfo?.quote_price || '---'}</div>
                </div>
              </div>
              <div className="col2">
                <Button
                  onClick={() => {
                    dispatch(DialogActions.push({
                      title: EstimateEditDialogTitle.update,
                      element: <EstimateEditSP mode="update" id={Number(id)} meisaiList={meisaiList} />,
                    }));
                  }}
                  size="md"
                  color="secondary"
                  className="estimateDetail-content__btn"
                >??????
                </Button>
              </div>
            </div>
            <div className="estimate_detail_sp__container__info__bottom">
              <div className="row">
                <div className="row__col1">????????????</div>
                <div className="row__col2">???</div>
                <div className="row__col3">{DateFormatter.date2str(estimateInfo?.quote_date)}</div>
              </div>
              <div className="row">
                <div className="row__col1">??????</div>
                <div className="row__col2">???</div>
                <div className="row__col3">{DateFormatter.date2str(estimateInfo?.order_construction_start)}
                  ???{DateFormatter.date2str(estimateInfo?.order_construction_end)}{termDay ? `???${termDay}?????????` : ''}
                </div>
              </div>
              <div className="row">
                <div className="row__col1">??????????????????</div>
                <div className="row__col2">???</div>
                <div className="row__col3">{DateFormatter.date2str(estimateInfo?.quote_expiration_date)}</div>
              </div>
              <div className="row">
                <div className="row__col1">???????????????</div>
                <div className="row__col2">???</div>
                <div className="row__col3">{DateFormatter.date2str(estimateInfo?.order_expected_date)}</div>
              </div>
            </div>
          </div>

          <div className="detail_header estimate_detail_sp__header secondary">
            <div className="estimate_detail_sp__header__inner">
              <div>??????</div>
              <div className="" onClick={handleClickEdit}>
                {isSort ? (<div />) : (
                  <i className="fas fa-plus-circle fa-2x" />
                )}
              </div>
              <div>
                {isSort ? (
                  <>
                    <Button
                      size="md"
                      color="secondary"
                      className="estimateDetail-header__center__btn"
                      onClick={handlerClickMeisaiUp}
                    >
                      <i className="fas fa-arrow-up" />
                    </Button>
                    <Button
                      size="md"
                      color="secondary"
                      className="estimateDetail-header__center__btn"
                      onClick={handlerClickMeisaiDown}
                    >
                      <i className="fas fa-arrow-down" />
                    </Button>
                  </>
                ) : (<></>)}
                <LeftIconButton
                  size="md"
                  color={isSort ? 'dark' : 'secondary'}
                  className="estimateDetail-header__center__btn"
                  onClick={handlerChangeSortMode}
                  fontAwesomeClass={`fas fa-${isSort ? 'list' : 'sort'}`}
                  label={`${isSort ? '??????' : '????????????'}`}
                />
              </div>
            </div>
          </div>

          <div className="estimate_detail_sp__container__list">
            <EstimateDetailListSP
              id={Number(id)}
              handleClickCard={() => {}}
              // handleClickDelete={() => {}}
              isSort={isSort}
              selectedIndex={selectedIndex}
              callbackSelect={setSelectedIndex}
            />
          </div>

          {/* price area */}
          <div
            className="estimate_detail_sp__container__price_detail__label"
            onClick={(e) => {
              if (e.target === priceDetailEditButton.current) {
                return;
              }
              setIsOpenPriceArea(!isOpenPriceArea);
            }}
          >
            <span>{isOpenPriceArea ? '???' : '??????'}</span>
            <span>????????????</span>
            <Button
              color="secondary"
                    // disabled={!isOpenPriceArea}
              onClick={() => dispatch(DialogActions.push({
                title: '??????????????????',
                element: <DetailPriceEditSP priceArea={priceArea} />,
              }))}
              ref={priceDetailEditButton}
            >??????
            </Button>
          </div>

          <div className={`estimate_detail_sp__container__price_detail__body ${isOpenPriceArea ? 'opened' : ''}`}>
            <div className="col">
              <div className="row">
                <div className="row__col1">????????????</div>
                <div className="row__col2">???</div>
                <div className="row__col3">&yen;&nbsp;{MathHelper.localStr(priceArea.estimate_price)}</div>
              </div>
              <div className="row">
                <div className="row__col1">????????????</div>
                <div className="row__col2">???</div>
                <div className="row__col3">&yen;&nbsp;{MathHelper.localStr(priceArea.estimate_total_price)}</div>
              </div>
              <div className="row">
                <div className="row__col1">????????????</div>
                <div className="row__col2">???</div>
                <div className="row__col3">&yen;&nbsp;{MathHelper.localStr(priceArea.estimate_tax)}</div>
              </div>
              <div className="row">
                <div className="row__col1">????????????????????????</div>
                <div className="row__col2">???</div>
                <div className="row__col3">&yen;&nbsp;{MathHelper.localStr(priceArea.estimate_total_price_tax_in)}</div>
              </div>
              <div className="row">
                <div className="row__col1">???????????????????????????</div>
                <div className="row__col2">???</div>
                <div className="row__col3">&yen;&nbsp;{MathHelper.localStr(priceArea.adjustment_amount)}</div>
              </div>
              <div className="row">
                <div className="row__col1">????????????</div>
                <div className="row__col2">???</div>
                <div className="row__col3">&yen;&nbsp;{MathHelper.localStr(priceArea.genka_price)}</div>
              </div>
              <div className="row">
                <div className="row__col1">????????????</div>
                <div className="row__col2">???</div>
                <div className="row__col3">&yen;&nbsp;{MathHelper.localStr(priceArea.genka_total_price)}</div>
              </div>
              <div className="row">
                <div className="row__col1">????????????</div>
                <div className="row__col2">???</div>
                <div className="row__col3">&yen;&nbsp;{MathHelper.localStr(priceArea.genka_tax)}</div>
              </div>
              <div className="row">
                <div className="row__col1">????????????????????????</div>
                <div className="row__col2">???</div>
                <div className="row__col3">&yen;&nbsp;{MathHelper.localStr(priceArea.genka_total_price_tax_in)}</div>
              </div>
              <div className="row">
                <div className="row__col1">????????????</div>
                <div className="row__col2">???</div>
                <div className="row__col3">&yen;&nbsp;{MathHelper.localStr(priceArea.arari_price)}</div>
              </div>
              <div className="row">
                <div className="row__col1">?????????</div>
                <div className="row__col2">???</div>
                <div className="row__col3">&yen;&nbsp;{MathHelper.localStr(priceArea.arari_percent)}</div>
              </div>
              <div className="row">
                <div className="row__col1">???????????????</div>
                <div className="row__col2">???</div>
                <div className="row__col3">?????? &yen;&nbsp;{MathHelper.localStr(priceArea.genba_estimate_price)} ({priceArea.field_cost_quote}%)</div>
              </div>
              <div className="row">
                <div className="row__col1" />
                <div className="row__col2" />
                <div className="row__col3">?????? &yen;&nbsp;{MathHelper.localStr(priceArea.genba_genka_price)} ({priceArea.field_cost}%)</div>
              </div>
              <div className="row">
                <div className="row__col1">????????????</div>
                <div className="row__col2">???</div>
                <div className="row__col3">?????? &yen;&nbsp;{MathHelper.localStr(priceArea.yobi_estimate_price)} ({priceArea.call_cost_quote}%)</div>
              </div>
              <div className="row">
                <div className="row__col1" />
                <div className="row__col2" />
                <div className="row__col3">?????? &yen;&nbsp;{MathHelper.localStr(priceArea.yobi_genka_price)} ({priceArea.call_cost}%)</div>
              </div>
            </div>
          </div>

          <div className="estimate_detail_sp__container__remarks">
            <div className="estimate_detail_sp__container__remarks__label">??????</div>
            <div className="estimate_detail_sp__container__remarks__content">{estimateInfo?.remarks}</div>
          </div>
        </div>

        <div className="estimate_detail_sp__footer_secondary">
          <div className="estimate_detail_sp__footer_secondary__wrap">
            <div className="row">
              <div className="row__col1">??????:</div>
              <div className="row__col2">&yen;&nbsp;{MathHelper.localStr(priceArea.estimate_price)}</div>
            </div>
            <div className="row">
              <div className="row__col1">?????????:</div>
              <div className="row__col2">&yen;&nbsp;{MathHelper.localStr(priceArea.estimate_tax)}</div>
            </div>
            <div className="row">
              <div className="row__col1">?????????:</div>
              <div className="row__col2">&yen;&nbsp;{MathHelper.localStr(priceArea.estimate_total_price)}</div>
            </div>
          </div>

          <div className="page_body_footer estimate_detail_sp__footer">
            <div>
              <Button
                size="md"
                color="primary"
                onClick={handleClickCopy}
              >????????????????????????
              </Button>
            </div>
            <div>
              <IconButton className="email" fontAwesomeClass="fas fa-envelope" size="md" color="primary" onClick={handleClickMail} />
              <Button size="md" color="primary" onClick={handleClickOrder}>??????</Button>
            </div>
          </div>
        </div>
      </div>
    </BasePageSP>
  );
};
