import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { TextArea } from 'semantic-ui-react';
import { cloneDeep } from 'lodash';
import { OrderCollection } from '../../../../collection/order/order.collection';
import { useDidMount } from '../../../../hooks/life-cycle';
import { OrderActions } from '../../../../redux/order/order.action';
import { OrderEditState } from '../../../../type/order/order.type';
import { DateFormatter } from '../../../../utilities/date-formatter';
import { EditSP } from '../../../dialogs/edit/edit.sp';
import { BottomBorderButton } from '../../../ui/button/bottom-border/bottom-border-button';
import { Button } from '../../../ui/button/button';
import { DatePicker } from '../../../ui/date-picker/date-picker';
import { TopLabelInputField } from '../../../ui/input-field/top-label-input-field/top-label-input-field';
import { Input } from '../../../ui/input/input';
import { } from '../../pages/base.page.sp';
import './order.sp.scss';
import { ValidationNumberLengthUnder10, ValidationNumberLengthUnder8 } from '../../../../model/validation/validation-number-length-under';
import { ValidationDatePicker } from '../../../../model/validation/validation-date-picker';
import { ValidationLengthUnder500 } from '../../../../model/validation';
import { OrderValidation } from '../../../../model/validation/order/order.validation';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { EstimateListType } from '../../../../type/estimate/estimate.type';
import { EstimateActions } from '../../../../redux/estimate/estimate.action';
import { MathHelper } from '../../../../utilities/math-helper';

type OrderSpProps = {
  estimateId: number,
};

export const OrderSP = (props: OrderSpProps) => {
  const { estimateId } = props;
  /* Hooks */
  const dispatch = useDispatch();

  /* State */
  const headerEle = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<0 | 1>(0);
  const [order, setOrder] = useState<OrderEditState>(OrderCollection.editInitialState);
  // eslint-disable-next-line
  const [estimateList, setEstimateList] = useState<EstimateListType[]>([]);
  // eslint-disable-next-line
  const [stayEstimate, setStayEstimate] = useState<EstimateListType | null>(null);
  // eslint-disable-next-line
  const [orderSort, setOrderSort] = useState({ sort_by: 1, highlow: 0 });
  const [selectEstimate, setSelectEstimate] = useState<any>(OrderCollection.editInitialState);
  // eslint-disable-next-line
  const [touch, setTouch] = useState(false);

  /* Callback */
  const setState = useCallback((v: OrderEditState) => {
    setOrder(v);
  }, [order]);

  /* 保存API */
  const handleClickPost = useCallback(() => {
    if (OrderValidation(order, selectEstimate, selectEstimate)) {
      dispatch(DialogActions.pushMessage({
        title: '受注登録',
        message: ['未入力／入力不備項目があります'],
        callback: () => setTouch(true),
      }));
      return;
    }
    dispatch(OrderActions.api.order.post({
      param: {
        ...order,
        contract_date: order.contract_date ? DateFormatter.date2str(order.contract_date) : '',
        construction_start_date: order.construction_start_date ? DateFormatter.date2str(order.construction_start_date) : '',
        completion_end_date: order.completion_end_date ? DateFormatter.date2str(order.completion_end_date) : '',
        groundbreaking_ceremony: order.groundbreaking_ceremony ? DateFormatter.date2str(order.groundbreaking_ceremony) : '',
        completion_based: order.completion_based ? DateFormatter.date2str(order.completion_based) : '',
        contract_billing_date: order.contract_billing_date ? DateFormatter.date2str(order.contract_billing_date) : '',
        contract_expected_date: order.contract_expected_date ? DateFormatter.date2str(order.contract_expected_date) : '',
        start_construction_billing_date: order.start_construction_billing_date ? DateFormatter.date2str(order.start_construction_billing_date) : '',
        start_construction_expected_date: order.start_construction_expected_date ? DateFormatter.date2str(order.start_construction_expected_date) : '',
        intermediate1_billing_date: order.intermediate1_billing_date ? DateFormatter.date2str(order.intermediate1_billing_date) : '',
        intermediate1_expected_date: order.intermediate1_expected_date ? DateFormatter.date2str(order.intermediate1_expected_date) : '',
        intermediate2_billing_date: order.intermediate2_billing_date ? DateFormatter.date2str(order.intermediate2_billing_date) : '',
        intermediate2_expected_date: order.intermediate2_expected_date ? DateFormatter.date2str(order.intermediate2_expected_date) : '',
        completion_billing_date: order.completion_billing_date ? DateFormatter.date2str(order.completion_billing_date) : '',
        completion_expected_date: order.completion_expected_date ? DateFormatter.date2str(order.completion_expected_date) : '',
      },
    }));
  }, [order, selectEstimate]);

  const setEstimateData = useCallback((v:EstimateListType) => {
    setOrder({
      ...order,
      quote_id: v.id,
      groundbreaking_ceremony: v.groundbreaking_ceremony
        ? new Date(v.groundbreaking_ceremony) : null,
      completion_based: v.completion_based
        ? new Date(v.completion_based) : null,
    });
  }, [order]);

  // /* 受注工期から工期から取得 */
  // const getOrderConstructionDate = useCallback(() => {
  //   if (!selectEstimate) return;
  //   setState({
  //     ...order,
  //     construction_start_date: selectEstimate.order_construction_start
  //       ? new Date(selectEstimate.order_construction_start) : order.construction_start_date,
  //     completion_end_date: selectEstimate.order_construction_end
  //       ? new Date(selectEstimate.order_construction_end) : order.completion_end_date,
  //   });
  // }, [order, selectEstimate]);

  /* 見積一覧取得 */
  const getEstimateList = useCallback(() => {
    dispatch(EstimateActions.api.estimate.getList({
      param: {
        project_id: order.project_id,
        limit: 9999,
        sort_by: orderSort.sort_by,
        highlow: orderSort.highlow,
      },
      callback: (v) => {
        if (v.length) {
          setEstimateList(cloneDeep(v));
          setSelectEstimate(cloneDeep(v[0]));
          setEstimateData(v[0]);
        }
      },
    }));
  }, [order, orderSort]);

  /* Effect */
  useDidMount(() => {
    // console.log('id: ', projectId);
    // dispatch(OrderActions.api.order.get({
    //   param: { project_id: projectId },
    //   callback: (getData) => {
    //     console.log('getData: ', getData);
    //     setSelectEstimate(cloneDeep({ ...getData }));
    //   },
    // }));
    dispatch(EstimateActions.api.estimate.get({
      param: { id: estimateId },
      callback: (estimate) => {
        // setSelectEstimate(cloneDeep({ ...v }));
        setSelectEstimate({
          ...selectEstimate,
          ...estimate,
        });
        dispatch(OrderActions.api.order.get({
          param: { project_id: estimate.project_id },
          callback: (res) => {
            setOrder({
              ...order,
              ...res,
            } as any);
          },
        }));
        // dispatch(OrderActions.api.order.get({
        //   param: { project_id: estimate.project_id },
        //   callback: (res) => {
        //     setSelectEstimate({
        //       ...selectEstimate,
        //       ...res,
        //       ...estimate,
        //     });
        //   },
        // }));
      },
    }));
  });

  /* 見積一覧取得 */
  useEffect(() => {
    if (!order.project_id) return;
    getEstimateList();
  }, [order.project_id, orderSort]);

  // - 未割り当て金の計算 -
  // 受注金額 - (契約金 + 着工金 + 中間金1 + 中間金2 + 完工金)
  useEffect(() => {
    setOrder({
      ...order,
      unallocated_money: MathHelper.minus(
        // 受注金額
        selectEstimate?.order_price || 0,
        // 契約金 + 着工金 + 中間金1 + 中間金2 + 完工金
        MathHelper.plus(
          // 契約金
          order.contract_money || 0,
          // 着工金
          order.start_construction_money || 0,
          // 中間金1
          order.intermediate_gold1 || 0,
          // 中間金2
          order.intermediate_gold2 || 0,
          // 完工金
          order.completion_money || 0,
        ),
      ),
    });
  }, [
    // 契約金
    order.contract_money,
    // 着工金
    order.start_construction_money,
    // 中間金1
    order.intermediate_gold1,
    // 中間金2
    order.intermediate_gold2,
    // 完工金
    order.completion_money,
  ]);

  return (
    /* 受注情報 */
    <EditSP mode="add" callback={handleClickPost}>
      <div className="edit_sp_body_inner order_edit_sp">
        <div
          id="page_body_header"
          className="page_body_header"
          onClick={(e) => { e.preventDefault(); }}
          ref={headerEle}
          style={{ display: 'flex' }}
        >
          <BottomBorderButton
            label="受注情報"
            onClick={() => {
              setMode(0);
            }}
            selected={!mode}
          />
          <BottomBorderButton
            label="受注金額"
            onClick={() => {
              setMode(1);
            }}
            selected={mode === 1}
          />
        </div>

        {!mode ? (
          <>
            {/* edit_sp_body_inner は各画面の共通用 */}
            <div className="order_edit_sp__body">
              <div className="category_wrap">
                <div className="item_wrap">
                  <TopLabelInputField
                    label="見積番号"
                    value={selectEstimate?.quote_no}
                    validationList={ValidationNumberLengthUnder10}
                  />
                </div>
                <div className="item_wrap ">
                  <TopLabelInputField
                    label="見積金額"
                    value={selectEstimate?.quote_price}
                    validationList={ValidationNumberLengthUnder10}
                  />
                </div>
                <div className="item_wrap ">
                  <TopLabelInputField
                    label="見積原価"
                    value={selectEstimate?.quote_genka}
                    validationList={ValidationNumberLengthUnder8}
                  />
                </div>
                <div className="item_wrap item_date_picker">
                  <div className="item_wrap">
                    <div className="item_label">見積工期</div>
                    <div className="item_body item_schedule">
                      <Input
                        className="item_schedule__form"
                        value={selectEstimate?.quote_construction_start}
                      />
                      <div className="item_schedule__tilde">〜</div>
                      <Input
                        className="item_schedule__form"
                        value={selectEstimate?.quote_construction_end}
                      />
                    </div>
                  </div>
                </div>
                <div className="item_wrap">
                  <div className="col1">契約日</div>
                  <DatePicker
                    date={order?.contract_date || null}
                    onChange={(v) => setState(
                      { ...order, contract_date: v },
                    )}
                    validationList={ValidationDatePicker}
                  />
                </div>
                <div className="item_wrap ">
                  <TopLabelInputField
                    label="受注金額"
                    value={selectEstimate?.order_price}
                    validationList={ValidationNumberLengthUnder10}
                  />
                </div>
                <div className="item_wrap ">
                  <TopLabelInputField
                    label="受注原価"
                    value={selectEstimate?.order_genka}
                    validationList={ValidationNumberLengthUnder8}
                  />
                </div>
                <div className="item_wrap">
                  <div className="item_body">
                    <div className="item_label">受注工期</div>
                    <div className="item_body item_schedule">
                      <Input
                        className="item_schedule__form"
                        value={selectEstimate?.order_construction_start}
                      />
                      <div className="item_schedule__tilde">〜</div>
                      <Input
                        className="item_schedule__form"
                        value={selectEstimate?.order_construction_end}
                      />
                    </div>
                  </div>
                  <div className="item_wrap">
                    <div className="col1">着工予定日</div>
                    <DatePicker
                      date={order?.construction_start_date || null}
                      onChange={(v) => setState(
                        { ...order, construction_start_date: v },
                      )}
                      validationList={ValidationDatePicker}
                    />
                  </div>
                  <div className="item_wrap">
                    <div className="col1">完工予定日</div>
                    <DatePicker
                      date={order?.completion_end_date || null}
                      onChange={(v) => setState(
                        { ...order, completion_end_date: v },
                      )}
                      validationList={ValidationDatePicker}
                    />
                  </div>
                  <div className="item_wrap">
                    <div className="col1">着工式※TODO削除</div>
                    <DatePicker
                      date={order?.groundbreaking_ceremony || null}
                      onChange={(v) => setState(
                        { ...order, groundbreaking_ceremony: v },
                      )}
                      validationList={ValidationDatePicker}
                    />
                  </div>
                  <div className="item_wrap">
                    <div className="col1">完工式※TODO削除</div>
                    <DatePicker
                      date={order?.completion_based || null}
                      onChange={(v) => setState(
                        { ...order, completion_based: v },
                      )}
                      validationList={ValidationDatePicker}
                    />
                  </div>
                </div>
              </div>

              <div className="category_wrap">
                <div className="item_wrap">
                  <div className="item_label">備考</div>
                  <div className="item_body full_width item_remarks">
                    <TextArea
                      rows={7}
                      value={order?.remarks}
                      onChange={(e) => setState(
                        { ...order, remarks: e.target.value },
                      )}
                      validationList={ValidationLengthUnder500}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
        /* 受注金額 */
          <>
            <div className="order_edit_sp__body">
              <div className="category_wrap">
                <div className="item_wrap ">
                  <TopLabelInputField
                    label="契約金"
                    value={order?.contract_money}
                    onChange={(e) => setState(
                      { ...order, contract_money: Number(e.target.value) },
                    )}
                    type="number"
                  />
                </div>
                <div className="item_wrap">
                  <div className="col1">契約金請求日</div>
                  <DatePicker
                    date={order?.contract_billing_date || null}
                    onChange={(v) => setState(
                      { ...order, contract_billing_date: v },
                    )}
                    validationList={ValidationDatePicker}
                  />
                </div>
                <div className="item_wrap">
                  <div className="col1">契約金入金予定日</div>
                  <DatePicker
                    date={order?.contract_expected_date || null}
                    onChange={(v) => setState(
                      { ...order, contract_expected_date: v },
                    )}
                    validationList={ValidationDatePicker}
                  />
                </div>
              </div>
              <div className="category_wrap">
                <div className="item_wrap ">
                  <TopLabelInputField
                    label="着工金"
                    value={order?.start_construction_money}
                    onChange={(e) => setState(
                      { ...order, start_construction_money: Number(e.target.value) },
                    )}
                    type="number"
                  />
                </div>
                <div className="item_wrap">
                  <div className="col1">着工金請求日</div>
                  <DatePicker
                    date={order?.start_construction_billing_date || null}
                    onChange={(v) => setState(
                      { ...order, start_construction_billing_date: v },
                    )}
                    validationList={ValidationDatePicker}
                  />
                </div>
                <div className="item_wrap">
                  <div className="col1">着工金入金予定日</div>
                  <DatePicker
                    date={order?.start_construction_expected_date || null}
                    onChange={(v) => setState(
                      { ...order, start_construction_expected_date: v },
                    )}
                    validationList={ValidationDatePicker}
                  />
                </div>
              </div>
              <div className="category_wrap">
                <div className="item_wrap ">
                  <TopLabelInputField
                    label="中間金"
                    value={order?.intermediate_gold1}
                    onChange={(e) => setState(
                      { ...order, intermediate_gold1: Number(e.target.value) },
                    )}
                    type="number"
                  />
                </div>
                <div className="item_wrap">
                  <div className="col1">中間金請求日</div>
                  <DatePicker
                    date={order?.intermediate1_billing_date || null}
                    onChange={(v) => setState(
                      { ...order, intermediate1_billing_date: v },
                    )}
                    validationList={ValidationDatePicker}
                  />
                </div>
                <div className="item_wrap">
                  <div className="col1">中間金入金予定日</div>
                  <DatePicker
                    date={order?.intermediate1_expected_date || null}
                    onChange={(v) => setState(
                      { ...order, intermediate1_expected_date: v },
                    )}
                    validationList={ValidationDatePicker}
                  />
                </div>
              </div>
              <div className="category_wrap">
                <div className="item_wrap ">
                  <TopLabelInputField
                    label="中間金"
                    value={order?.intermediate_gold2}
                    onChange={(e) => setState(
                      { ...order, intermediate_gold2: Number(e.target.value) },
                    )}
                    type="number"
                  />
                </div>
                <div className="item_wrap">
                  <div className="col1">中間金請求日</div>
                  <DatePicker
                    date={order?.intermediate2_billing_date || null}
                    onChange={(v) => setState(
                      { ...order, intermediate2_billing_date: v },
                    )}
                    validationList={ValidationDatePicker}
                  />
                </div>
                <div className="item_wrap">
                  <div className="col1">中間金入金予定日</div>
                  <DatePicker
                    date={order?.intermediate2_expected_date || null}
                    onChange={(v) => setState(
                      { ...order, intermediate2_expected_date: v },
                    )}
                    validationList={ValidationDatePicker}
                  />
                </div>
              </div>
              <div className="category_wrap">
                <div className="item_wrap ">
                  <TopLabelInputField
                    label="完工金"
                    value={order?.completion_money}
                    onChange={(e) => setState(
                      { ...order, completion_money: Number(e.target.value) },
                    )}
                    type="number"
                  />
                </div>
                <div className="item_wrap">
                  {/* TODO 値が表示されない */}
                  <div className="col1">完工金請求日</div>
                  <DatePicker
                    date={order?.completion_billing_date || null}
                    onChange={(v) => setState(
                      { ...order, completion_billing_date: v },
                    )}
                    validationList={ValidationDatePicker}
                  />
                </div>
                <div className="item_wrap">
                  <div className="col1">完工金入金予定日</div>
                  <DatePicker
                    date={order?.completion_expected_date || null}
                    onChange={(v) => setState(
                      { ...order, completion_expected_date: v },
                    )}
                    validationList={ValidationDatePicker}
                  />
                </div>
                <div className="item_wrap ">
                  <TopLabelInputField
                    label="未割当金"
                    value={order?.unallocated_money}
                    onChange={(e) => setState(
                      { ...order, unallocated_money: Number(e.target.value) },
                    )}
                    type="number"
                  />
                </div>
                <div className="item_wrap item_map">
                  <Button
                    size="md"
                    color="secondary"
                    onClick={() => setState(
                      {
                        ...order,
                        completion_money: Number(
                          order?.completion_money,
                        ) + Number(order?.unallocated_money),
                      },
                    )}
                  >
                    未割当金を完工金に含める
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </EditSP>
  );
};
