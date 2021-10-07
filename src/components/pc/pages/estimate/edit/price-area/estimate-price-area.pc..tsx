import { useCallback, useEffect, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { LeftLabelInputField } from '../../../../../ui/input-field/left-label-input-field/left-label-input-field';
import { RightLabelInputField } from '../../../../../ui/input-field/right-label-input-field/right-label-input-field';
import { EstimatePriceAreaCollectionPC } from './estimate-price-area.collection.pc';
import { EditPriceAreaState, EstimateEditState } from '../../../../../../type/estimate/estimate.type';
import { EstimateMeisaiListType } from '../../../../../../type/estimate/estimate-meisai.type';
import { EstimateCalcModelPC as Calc } from '../../../../../../collection/estimate/estimate-calc.model.pc';
import { Input } from '../../../../../ui/input/input';
import { ValidationNumberLengthUnder20, ValidationNumberLengthUnder5 } from '../../../../../../model/validation/validation-number-length-under';
import { GetTax } from '../../../../../../redux/master/api/master-tax/api-master-tax';

type Props = {
  estimateState: EstimateEditState;
  data: EstimateMeisaiListType[];
  callback: (v: EditPriceAreaState) => void;
  allowEdit?: boolean;
}

export const EstimatePriceAreaPC = (props: Props) => {
  const {
    data, callback, estimateState, allowEdit,
  } = props;

  /* State */
  const [editState, setEditState] = useState(EstimatePriceAreaCollectionPC.initialEditState);

  console.log('editState.adjustment_amount', editState.adjustment_amount);

  /* Callback */
  const setState = useCallback((v: EditPriceAreaState) => {
    setEditState(cloneDeep(v));
  }, [setEditState]);

  const handleOnBlur = useCallback(
    () => {
      if (
        !data.length
        || !estimateState
        || !(estimateState as any).id
        || !estimateState.quote_date
      ) { return; }
      GetTax(estimateState.quote_date)
        .then((tax) => {
          setEditState(Calc.calc(editState, data, tax));
        });
    },
    [editState, data, estimateState],
  );

  /* Effect */
  useEffect(() => callback(cloneDeep(editState)), [editState]);

  // useEffect(() => {
  //   setEditState({
  //     ...editState,
  //     call_cost: estimateState.call_cost || 2.2,
  //     call_cost_quote: estimateState.call_cost_quote || 0,
  //     field_cost: estimateState.field_cost || 0,
  //     field_cost_quote: estimateState.field_cost_quote || 0,
  //     adjustment_amount: estimateState.adjustment_amount || 0,
  //   });
  // }, [estimateState]);

  useEffect(() => {
    if (
      !data.length
      || !estimateState
      || !(estimateState as any).id
      || !estimateState.quote_date
    ) { return; }
    GetTax(estimateState.quote_date)
      .then((tax) => {
        setEditState(Calc.calc({
          ...editState,
          call_cost: estimateState.call_cost || 2.2,
          call_cost_quote: estimateState.call_cost_quote || 0,
          field_cost: estimateState.field_cost || 0,
          field_cost_quote: estimateState.field_cost_quote || 0,
          adjustment_amount: estimateState.adjustment_amount || 0,
        }, data, tax));
      });
  }, [estimateState]);

  useEffect(() => {
    if (
      !data.length
      || !estimateState
      || !(estimateState as any).id
      || !estimateState.quote_date
    ) { return; }
    GetTax(estimateState.quote_date)
      .then((tax) => {
        setEditState(Calc.calc(editState, data, tax));
      });
  }, [data]);

  return (
    <div className="EstimatePriceAreaPC">
      <div className="item_wrap flex_no_wrap_box">
        <div className="item_box">
          <div className="item_head">見積金額</div>
          <Input
            value={editState.estimate_price.toLocaleString()}
            disabled
            alignRight
          />
        </div>
        <div className="item_box">
          <div className="item_head">見積合計</div>
          <Input
            value={editState.estimate_total_price.toLocaleString()}
            disabled
            alignRight
          />
        </div>
        <div className="item_box">
          <div className="item_head">消費税額</div>
          <Input
            value={editState.estimate_tax.toLocaleString()}
            disabled
            alignRight
          />
        </div>
        <div className="item_box">
          <div className="item_head">税込合計見積金額</div>
          <Input
            value={editState.estimate_total_price_tax_in.toLocaleString()}
            disabled
            alignRight
          />
        </div>
        <div className="item_box">
          <div className="item_head">調整金額（値引き）</div>
          <RightLabelInputField
            value={editState.adjustment_amount}
            type="number"
            onBlur={handleOnBlur}
            onChange={(e) => {
              setState({
                ...editState,
                adjustment_amount: Number(e.target.value),
              });
            }}
            alignRight
            validationList={ValidationNumberLengthUnder20}
            disabled={!allowEdit}
            decimalPlace={editState.adjustment_amount}
            callbackBlur={() => {}}
          />
        </div>
      </div>
      <div className="item_wrap flex_no_wrap_box">
        <div className="item_box">
          <div className="item_head">原価金額</div>
          <Input
            value={editState.genka_price.toLocaleString()}
            disabled
            alignRight
          />
        </div>
        <div className="item_box">
          <div className="item_head">原価合計</div>
          <Input
            value={editState.genka_total_price.toLocaleString()}
            disabled
            alignRight
          />
        </div>
        <div className="item_box">
          <div className="item_head">消費税額</div>
          <Input
            value={editState.genka_tax.toLocaleString()}
            disabled
            alignRight
          />
        </div>
        <div className="item_box">
          <div className="item_head">税込合計原価金額</div>
          <Input
            value={editState.genka_total_price_tax_in.toLocaleString()}
            disabled
            alignRight
          />
        </div>
      </div>
      <div className="flex_no_wrap_box">
        <div className="left">
          <div className="item_wrap flex_no_wrap_box">
            <div className="item_box">
              <div className="item_head">粗利金額</div>
              <Input
                label=""
                value={editState.arari_price.toLocaleString()}
                disabled
                alignRight
              />
            </div>
            <div className="item_box">
              <div className="item_head">粗利率</div>
              <RightLabelInputField
                label="%"
                type="number"
                value={editState.arari_percent.toLocaleString()}
                disabled
                alignRight
              />
            </div>
          </div>
        </div>
        <div className="right">
          <div className="item_wrap flex_no_wrap_box">
            <div className="item_box">
              <div className="item_head">現場協力費</div>
              <LeftLabelInputField
                className="mr_10 w30"
                label="見積"
                value={editState.genba_estimate_price.toLocaleString()}
                disabled
                alignRight
                validationList={ValidationNumberLengthUnder5}
              />
              <RightLabelInputField
                label="%"
                type="number"
                value={editState.field_cost_quote}
                onBlur={handleOnBlur}
                onChange={(e) => setState({
                  ...editState,
                  field_cost_quote: Number(e.target.value),
                })}
                alignRight
                validationList={ValidationNumberLengthUnder5}
                disabled={!allowEdit}
              />
              <LeftLabelInputField
                label="原価"
                className="ml_10 mr_10 w30"
                value={editState.genba_genka_price.toLocaleString()}
                disabled
                alignRight
                validationList={ValidationNumberLengthUnder5}
              />
              <RightLabelInputField
                label="%"
                type="number"
                value={editState.field_cost.toLocaleString()}
                onBlur={handleOnBlur}
                onChange={(e) => setState({
                  ...editState,
                  field_cost: Number(e.target.value),
                })}
                alignRight
                validationList={ValidationNumberLengthUnder5}
                disabled={!allowEdit}
              />
            </div>
          </div>
          <div className="item_wrap flex_no_wrap_box">
            <div className="item_box">
              <div className="item_head">予備原価</div>
              <LeftLabelInputField
                className="mr_10 w30"
                label="見積"
                value={editState.yobi_estimate_price}
                disabled
                alignRight
              />
              <RightLabelInputField
                label="%"
                type="number"
                value={editState.call_cost_quote}
                onBlur={handleOnBlur}
                onChange={(e) => setState({
                  ...editState,
                  call_cost_quote: Number(e.target.value),
                })}
                alignRight
                validationList={ValidationNumberLengthUnder5}
                disabled={!allowEdit}
              />
              <LeftLabelInputField
                className="ml_10 mr_10 w30"
                label="原価"
                value={editState.yobi_genka_price.toLocaleString()}
                disabled
                alignRight
              />
              <RightLabelInputField
                label="%"
                type="number"
                value={editState.call_cost}
                onBlur={handleOnBlur}
                onChange={(e) => setState({
                  ...editState,
                  call_cost: Number(e.target.value),
                })}
                alignRight
                validationList={ValidationNumberLengthUnder5}
                disabled={!allowEdit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EstimatePriceAreaPC.defaultProps = {
  allowEdit: true,
};
