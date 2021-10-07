import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import { OrderCollection } from '../../../../collection/order/order.collection';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { OrderActions } from '../../../../redux/order/order.action';
import { OrderEditState } from '../../../../type/order/order.type';
import { DateFormatter as DF } from '../../../../utilities/date-formatter';
import { Button } from '../../../ui/button/button';
import { DatePicker } from '../../../ui/date-picker/date-picker';
import { OrderListPC } from '../../layout/body/list/order-list/order-list.pc';
import { Input } from '../../../ui/input/input';
import './order.pc.scss';
import { useDidMount } from '../../../../hooks/life-cycle';
import { ProjectSearch } from '../../layout/search-box/project/project-search/project-search';
import { EstimateActions } from '../../../../redux/estimate/estimate.action';
import { EstimateListType } from '../../../../type/estimate/estimate.type';
import { MathHelper } from '../../../../utilities/math-helper';
import { OrderValidation } from '../../../../model/validation/order/order.validation';
import { ValidationLengthUnder40, ValidationLengthUnder500, ValidationLengthUnder60 } from '../../../../model/validation';
import { TextArea } from '../../../ui/text-area/text-area';
import { ValidationNumberLengthUnder10, ValidationNumberLengthUnder8 } from '../../../../model/validation/validation-number-length-under';
import { ValidationDatePicker } from '../../../../model/validation/validation-date-picker';
import { Project } from '../../../../type/project/project.type';
import { LeftIconButton } from '../../../ui/button/left-icon-button/left-icon-button';

type Props = {
  projectData?: Project;
  callback?: () => void;
}

export const OrderPC = (props: Props) => {
  const { projectData, callback } = props;
  /* Hooks */
  const dispatch = useDispatch();

  /* State */
  const [filedName, setFiledName] = useState('');
  const [projectName, setProjectName] = useState('');
  // eslint-disable-next-line
  const [touch, setTouch] = useState(false);

  const [order, setOrder] = useState<OrderEditState>(OrderCollection.editInitialState);
  const [estimateList, setEstimateList] = useState<EstimateListType[]>([]);
  const [selectEstimate, setSelectEstimate] = useState<EstimateListType | null>(null);
  const [stayEstimate, setStayEstimate] = useState<EstimateListType | null>(null);
  const [orderSort, setOrderSort] = useState({ sort_by: 1, highlow: 0 });

  /* Callback */
  const setState = useCallback((v: OrderEditState) => {
    setOrder(v);
  }, [order]);

  const setEstimateData = useCallback((v: EstimateListType) => {
    setOrder({
      ...order,
      quote_id: v.id,
      groundbreaking_ceremony: v.groundbreaking_ceremony
        ? new Date(v.groundbreaking_ceremony) : null,
      completion_based: v.completion_based
        ? new Date(v.completion_based) : null,
    });
  }, [order]);

  /* 受注工期から工期から取得 */
  const getOrderConstructionDate = useCallback(() => {
    if (!selectEstimate) return;
    setState({
      ...order,
      construction_start_date: selectEstimate.order_construction_start
        ? new Date(selectEstimate.order_construction_start) : order.construction_start_date,
      completion_end_date: selectEstimate.order_construction_end
        ? new Date(selectEstimate.order_construction_end) : order.completion_end_date,
    });
  }, [order, selectEstimate]);

  /* 見積一覧取得 */
  const getEstimateList = useCallback(() => {
    dispatch(EstimateActions.api.estimate.getList({
      param: {
        project_id: projectData?.id || order.project_id,
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
  }, [order, orderSort, projectData]);

  /* 案件検索 */
  const handleClickProjectSearch = useCallback((mode: 'new' | 'edit') => {
    dispatch(DialogActions.push({
      title: '案件検索',
      className: 'max_height_dialog max_width_dialog search_dialog',
      onCloseClick: () => {
        if (mode === 'new') dispatch(DialogActions.pop());
      },
      element: <ProjectSearch
        callback={(v) => {
          setEstimateList([]);
          setFiledName(v.field_name);
          setProjectName(v.name);
          setOrder({
            ...order,
            contract_date: v.contract_date ? new Date(v.contract_date) : null,
            project_id: v.id,
          });
        }}
      />,
    }));
  }, [order]);

  /* 未割当金を完工金に含める */
  const handleClickInMoney = useCallback(() => {
    setOrder({
      ...order,
      completion_money: MathHelper.plus(
        order.unallocated_money || 0,
        order.completion_money || 0,
      ),
    });
  }, [order]);

  /* 保存 */
  const handleClickPost = useCallback(() => {
    const validationResult = OrderValidation(
      order, estimateList, selectEstimate, filedName, projectName,
    );
    if (validationResult.length) {
      dispatch(DialogActions.pushMessage({
        title: '受注登録',
        message: validationResult,
        callback: () => setTouch(true),
      }));
      return;
    }
    dispatch(OrderActions.api.order.post({
      param: {
        project_id: order.project_id,
        quote_id: order.quote_id,
        contract_money: order.contract_money,
        start_construction_money: order.start_construction_money,
        intermediate_gold1: order.intermediate_gold1,
        intermediate_gold2: order.intermediate_gold2,
        completion_money: order.completion_money,
        unallocated_money: order.unallocated_money,
        remarks: order.remarks,
        contract_date: DF.date2str(order.contract_date),
        construction_start_date: DF.date2str(order.construction_start_date),
        completion_end_date: DF.date2str(order.completion_end_date),
        groundbreaking_ceremony: DF.date2str(order.groundbreaking_ceremony),
        completion_based: DF.date2str(order.completion_based),
        contract_billing_date: DF.date2str(order.contract_billing_date),
        contract_expected_date: DF.date2str(order.contract_expected_date),
        start_construction_billing_date: DF.date2str(
          order.start_construction_billing_date,
        ),
        start_construction_expected_date: DF.date2str(
          order.start_construction_expected_date,
        ),
        intermediate1_billing_date: DF.date2str(order.intermediate1_billing_date),
        intermediate1_expected_date: DF.date2str(order.intermediate1_expected_date),
        intermediate2_billing_date: DF.date2str(order.intermediate2_billing_date),
        intermediate2_expected_date: DF.date2str(order.intermediate2_expected_date),
        completion_billing_date: DF.date2str(order.completion_billing_date),
        completion_expected_date: DF.date2str(order.completion_expected_date),
      },
      onSuccess: () => {
        if (callback) callback();
      },
      onError: () => {
        setTouch(true);
      },
    }));
  }, [order, callback]);

  /* 見積選択変更 */
  const handleClickChangeEstimateSelect = useCallback(() => {
    if (stayEstimate) {
      setEstimateData(stayEstimate);
      setSelectEstimate(cloneDeep(stayEstimate));
    }
  }, [stayEstimate]);

  /* Effect */
  /* 案件参照 */
  useDidMount(() => {
    if (projectData) {
      setFiledName(projectData.field_name);
      setProjectName(projectData.name);
      setOrder({
        ...order,
        contract_date: projectData.contract_date ? new Date(projectData.contract_date) : null,
        project_id: projectData.id,
      });
      return;
    }
    handleClickProjectSearch('new');
  });

  /* 見積一覧取得 */
  useEffect(() => {
    if (!order.project_id && !projectData) return;
    console.log(projectData);
    getEstimateList();
  }, [order.project_id, orderSort, projectData]);

  useEffect(() => {
    if (!order.project_id) return;
    dispatch(OrderActions.api.order.get({
      param: {
        project_id: order.project_id,
      },
      callback: (v) => {
        setOrder({
          ...order,
          quote_id: order.quote_id,
          contract_money: v.contract_money,
          start_construction_billing_date: DF.changeDate(v.start_construction_billing_date),
          start_construction_expected_date: DF.changeDate(v.start_construction_expected_date),
          intermediate_gold1: v.intermediate_gold1,
          intermediate1_billing_date: DF.changeDate(v.intermediate1_billing_date),
          intermediate1_expected_date: DF.changeDate(v.intermediate1_expected_date),
          intermediate_gold2: v.intermediate_gold2,
          intermediate2_billing_date: DF.changeDate(v.intermediate2_billing_date),
          intermediate2_expected_date: DF.changeDate(v.intermediate2_expected_date),
          unallocated_money: v.unallocated_money,
          remarks: v.remarks,
        });
      },
    }));
  }, [order.project_id, projectData]);

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
    <>
      <div id="order" className="editPc_wrap">
        <div className="editPc_body ">
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">現場名称</div>
              <Input
                value={filedName}
                disabled
                validationList={ValidationLengthUnder60}
              />
            </div>
            <div className="item_box">
              <div className="item_head">案件名</div>
              <Input
                value={projectName}
                disabled
                validationList={ValidationLengthUnder40}
              />
            </div>
          </div>

          <OrderListPC
            list={estimateList}
            selectEstimate={selectEstimate}
            callbackSort={setOrderSort}
            callback={setStayEstimate}
          />

          <div className="order_area">
            <div className="item_wrap flex_no_wrap_box">
              <div className="item_box">
                <div className="item_head">見積番号</div>
                <Input
                  value={selectEstimate?.quote_no}
                  disabled
                  validationList={ValidationNumberLengthUnder10}
                />
              </div>
              <div className="item_box">
                <div className="item_head">見積金額</div>
                <Input
                  value={selectEstimate?.quote_price.toLocaleString()}
                  disabled
                  alignRight
                  validationList={ValidationNumberLengthUnder10}
                />
              </div>
              <div className="item_box">
                <div className="item_head">見積原価</div>
                <Input
                  value={selectEstimate?.including_tax_total_quote.toLocaleString()}
                  disabled
                  alignRight
                  validationList={ValidationNumberLengthUnder8}
                />
              </div>
              <div className="item_box">
                <div className="item_head">見積工期</div>
                <Input
                  value={DF.date2str(selectEstimate?.order_construction_start)}
                  disabled
                />
                <label className="ml_5 mr_5">〜</label>
                <Input
                  value={DF.date2str(selectEstimate?.order_construction_end)}
                  disabled
                />
              </div>
              <div className="item_box right_side">
                <LeftIconButton
                  fontAwesomeClass="fas fa-retweet"
                  label="見積選択変更"
                  size="sm"
                  color="secondary"
                  className=""
                  onClick={handleClickChangeEstimateSelect}
                />
              </div>
            </div>
            <div className="item_wrap flex_no_wrap_box">
              <div className="item_box">
                <div className="item_head">契約日</div>
                <DatePicker
                  date={order?.contract_date || null}
                  onChange={(v) => setState(
                    { ...order, contract_date: v },
                  )}
                  validationList={ValidationDatePicker}
                  require
                />
              </div>
              <div className="item_box">
                <div className="item_head">受注金額</div>
                <Input
                  value={selectEstimate?.order_price.toLocaleString()}
                  disabled
                  alignRight
                  validationList={ValidationNumberLengthUnder10}
                />
              </div>
              <div className="item_box">
                <div className="item_head">受注原価</div>
                <Input
                  value={selectEstimate?.order_cost.toLocaleString()}
                  disabled
                  alignRight
                  validationList={ValidationNumberLengthUnder8}
                />
              </div>
              <div className="item_box">
                <div className="item_head">受注工期</div>
                <Input
                  value={DF.date2str(selectEstimate?.order_construction_start)}
                  disabled
                />
                <label className="ml_5 mr_5">〜</label>
                <Input
                  value={DF.date2str(selectEstimate?.order_construction_end)}
                  disabled
                />
              </div>
            </div>
            <div className="item_wrap flex_no_wrap_box">
              <div className="item_box">
                <div className="item_head">着工予定日</div>
                <DatePicker
                  date={order?.construction_start_date}
                  onChange={(v) => setState(
                    { ...order, construction_start_date: v },
                  )}
                  validationList={ValidationDatePicker}
                  touch={touch}
                  require
                />
              </div>
              <div className="item_box">
                <div className="item_head">完工予定日</div>
                <DatePicker
                  date={order?.completion_end_date}
                  onChange={(v) => setState(
                    { ...order, completion_end_date: v },
                  )}
                  validationList={ValidationDatePicker}
                  touch={touch}
                  require
                />
                <Button
                  size="sm"
                  color="secondary"
                  className="ml_10"
                  onClick={getOrderConstructionDate}
                >
                  受注工期から取得
                </Button>
              </div>
              <div className="item_box">
                <div className="item_head">着工式※TODO削除</div>
                <DatePicker
                  date={order?.groundbreaking_ceremony || null}
                  onChange={(v) => setState(
                    { ...order, groundbreaking_ceremony: v },
                  )}
                  validationList={ValidationDatePicker}
                />
              </div>
              <div className="item_box">
                <div className="item_head">完工式※TODO削除</div>
                <DatePicker
                  date={order?.completion_based || null}
                  onChange={(v) => setState(
                    { ...order, completion_based: v },
                  )}
                  validationList={ValidationDatePicker}
                />
              </div>
            </div>
            <div className="bottom">
              <div className="price_box">
                <div className="item_wrap flex_no_wrap_box">
                  <div className="item_box">
                    <div className="item_head">契約金</div>
                    <Input
                      value={order?.contract_money}
                      onChange={(e) => setOrder({
                        ...order, contract_money: Number(e.target.value),
                      })}
                      type="number"
                      alignRight
                    />
                  </div>
                  <div className="item_box">
                    <div className="item_head">請求日</div>
                    <DatePicker
                      date={order?.contract_billing_date || null}
                      onChange={(v) => setState(
                        { ...order, contract_billing_date: v },
                      )}
                      validationList={ValidationDatePicker}
                    />
                  </div>
                  <div className="item_box">
                    <div className="item_head">入金予定日</div>
                    <DatePicker
                      date={order?.contract_expected_date || null}
                      onChange={(v) => setState(
                        { ...order, contract_expected_date: v },
                      )}
                      validationList={ValidationDatePicker}
                    />
                  </div>
                </div>

                <div className="item_wrap flex_no_wrap_box">
                  <div className="item_box">
                    <div className="item_head">着工金</div>
                    <Input
                      value={order?.start_construction_money}
                      onChange={(e) => setOrder(
                        { ...order, start_construction_money: Number(e.target.value) },
                      )}
                      type="number"
                      alignRight
                    />
                  </div>
                  <div className="item_box">
                    <div className="item_head">請求日</div>
                    <DatePicker
                      date={order?.start_construction_billing_date || null}
                      onChange={(v) => setState(
                        { ...order, start_construction_billing_date: v },
                      )}
                      validationList={ValidationDatePicker}
                    />
                  </div>
                  <div className="item_box">
                    <div className="item_head">入金予定日</div>
                    <DatePicker
                      date={order?.start_construction_expected_date || null}
                      onChange={(v) => setState(
                        { ...order, start_construction_expected_date: v },
                      )}
                      validationList={ValidationDatePicker}
                    />
                  </div>
                </div>
                <div className="item_wrap flex_no_wrap_box">
                  <div className="item_box">
                    <div className="item_head">中間金</div>
                    <Input
                      value={order?.intermediate_gold1}
                      onChange={(e) => setOrder({
                        ...order, intermediate_gold1: Number(e.target.value),
                      })}
                      type="number"
                      alignRight
                    />
                  </div>
                  <div className="item_box">
                    <div className="item_head">請求日</div>
                    <DatePicker
                      date={order?.intermediate1_billing_date || null}
                      onChange={(v) => setState(
                        { ...order, intermediate1_billing_date: v },
                      )}
                      validationList={ValidationDatePicker}
                    />
                  </div>
                  <div className="item_box">
                    <div className="item_head">入金予定日</div>
                    <DatePicker
                      date={order?.intermediate1_expected_date || null}
                      onChange={(v) => setState(
                        { ...order, intermediate1_expected_date: v },
                      )}
                      validationList={ValidationDatePicker}
                    />
                  </div>
                </div>
                <div className="item_wrap flex_no_wrap_box">
                  <div className="item_box">
                    <div className="item_head">中間金</div>
                    <Input
                      value={order?.intermediate_gold2}
                      onChange={(e) => setOrder({
                        ...order, intermediate_gold2: Number(e.target.value),
                      })}
                      type="number"
                      alignRight
                    />
                  </div>
                  <div className="item_box">
                    <div className="item_head">請求日</div>
                    <DatePicker
                      date={order?.intermediate2_billing_date || null}
                      onChange={(v) => setState(
                        { ...order, intermediate2_billing_date: v },
                      )}
                      validationList={ValidationDatePicker}
                    />
                  </div>
                  <div className="item_box">
                    <div className="item_head">入金予定日</div>
                    <DatePicker
                      date={order?.intermediate2_expected_date || null}
                      onChange={(v) => setState(
                        { ...order, intermediate2_expected_date: v },
                      )}
                      validationList={ValidationDatePicker}
                    />
                  </div>
                </div>
                <div className="item_wrap flex_no_wrap_box">
                  <div className="item_box">
                    <div className="item_head">完工金</div>
                    <Input
                      value={order?.completion_money}
                      onChange={(e) => setOrder({
                        ...order, completion_money: Number(e.target.value),
                      })}
                      type="number"
                      alignRight
                    />
                  </div>
                  <div className="item_box">
                    <div className="item_head">請求日</div>
                    <DatePicker
                      date={order?.completion_billing_date || null}
                      onChange={(v) => setState(
                        { ...order, completion_billing_date: v },
                      )}
                      validationList={ValidationDatePicker}
                    />
                  </div>
                  <div className="item_box">
                    <div className="item_head">入金予定日</div>
                    <DatePicker
                      date={order?.completion_expected_date || null}
                      onChange={(v) => setState(
                        { ...order, completion_expected_date: v },
                      )}
                      validationList={ValidationDatePicker}
                    />
                  </div>
                </div>
                <div className="item_wrap flex_no_wrap_box">
                  <div className="item_box">
                    <div className="item_head">未割当金</div>
                    <Input
                      value={order?.unallocated_money}
                      onChange={(e) => setOrder({
                        ...order, unallocated_money: Number(e.target.value),
                      })}
                      type="number"
                      disabled
                      alignRight
                    />
                    <Button
                      size="sm"
                      color="secondary"
                      className="ml_10"
                      onClick={handleClickInMoney}
                    >
                      未割当金を完工金に含める
                    </Button>
                  </div>
                </div>
              </div>
              <div className="remarks_box">
                <div className="item_wrap">
                  <div className="item_box mr_0">
                    <div className="item_head">備考</div>
                    <TextArea
                      className="large"
                      rows={10}
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
          </div>
        </div>

        <footer className="editPc_footer base_footer">
          <div className="center_box">
            <Button size="md" color="primary" onClick={handleClickPost}>登録</Button>
            <Button size="md" color="dark" onClick={() => dispatch(DialogActions.pop())}>キャンセル</Button>
          </div>
        </footer>
      </div>
      {/* </BasePagePC> */}
    </>
  );
};
