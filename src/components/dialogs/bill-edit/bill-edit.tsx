import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, InputMoney } from '../../ui/input/input';
import { Button } from '../../ui/button/button';
// import { Required } from '../../ui/required/required';
// import { DatePicker } from '../../ui/date-picker/date-picker';
// import { ValidationDatePicker } from '../../../model/validation/validation-date-picker';
// import { Select } from '../../ui/select/select';
import { TextArea } from '../../ui/text-area/text-area';
import { ValidationLengthUnder500 } from '../../../model/validation';
import { DialogActions } from '../../../redux/dialog/dialog.action';
import { useDidMount } from '../../../hooks/life-cycle';
import { EstimateListType } from '../../../type/estimate/estimate.type';
import { BillValidation } from '../../../model/validation/bill/biil.validation';
import { BillListType } from '../../../type/bill/bill.type';

type Props = {
  data?: BillListType
  estimate?: EstimateListType;
  callback: () => void;
}

export const BillEdit = (props: Props) => {
  // eslint-disable-next-line
  const { estimate, callback, data } = props;

  /* Hooks */
  const dispatch = useDispatch();

  /* State */
  // eslint-disable-next-line
  const [projectId, setProjectId] = useState(NaN);
  const [filedName, setFiledName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [price, setPrice] = useState(0);
  const [payment, setPayment] = useState('');
  const [priceTaxIn, setPriceTaxIn] = useState(0);
  const [remarks, setRemarks] = useState('');

  const [touch, setTouch] = useState(false);

  /* Callback */
  const post = useCallback(() => {
    if (BillValidation({
      filedName,
      projectName,
      price,
      payment,
      priceTaxIn,
      remarks,
    })) {
      dispatch(DialogActions.pushMessage({
        title: '顧客情報登録',
        message: ['未入力／入力不備項目があります'],
        callback: () => setTouch(true),
      }));
      return;
    }

    dispatch(DialogActions.pop());
    callback();
  }, [
    projectId,
    estimate,
    filedName,
    projectName,
    price,
    payment,
    priceTaxIn,
    remarks,
  ]);

  /* Effect */
  useDidMount(() => {
    /* TODO API Get処理 */
  });

  return (
    <div className="editPc_wrap">
      <div className="editPc_body show_all">
        <div className="editPC_body_inner FamilyEditDialog">
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">現場名称</div>
              <Input
                className=""
                value={filedName}
                disabled
                onChange={(e) => setFiledName(e.target.value)}
              />
            </div>
            <div className="item_box">
              <div className="item_head">案件名</div>
              <Input
                className=""
                value={projectName}
                disabled
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
          </div>
          {/* ★19日以降 要対応★
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">請求日<Required /></div>
              <DatePicker
                date={null}
                onChange={() => {}}
                validationList={ValidationDatePicker}
              />
            </div>
            <div className="item_box">
              <div className="item_head">請求項目<Required /></div>
              <Select
                value=""
                defaultLabel=""
                onChange={() => {}}
                options={[
                  { text: '', value: 0 },
                  { text: '契約金', value: 1 },
                  { text: '着工金', value: 2 },
                  { text: '中間金', value: 3 },
                  { text: '中間金', value: 4 },
                  { text: '完成金', value: 5 },
                ]}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">入金予定日<Required /></div>
              <DatePicker
                date={null}
                onChange={() => {}}
                validationList={ValidationDatePicker}
              />
            </div>
            <div className="item_box">
              <div className="item_head">入金方法</div>
              <Input
                className=""
                disabled
                onChange={() => {}}
              />
            </div>
          </div>
              */}
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">金額</div>
              <InputMoney
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                alignRight
                decimalPlace={price}
                callbackBlur={() => {}}
              />
            </div>
            <div className="item_box">
              <div className="item_head">消費税額</div>
              <Input
                value={payment}
                disabled
                onChange={(e) => setPayment(e.target.value)}
              />
            </div>
            <div className="item_box">
              <div className="item_head">税込み金額</div>
              <InputMoney
                value={priceTaxIn}
                onChange={(e) => setPriceTaxIn(Number(e.target.value))}
                alignRight
                decimalPlace={price}
                callbackBlur={() => {}}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box large">
              <div className="item_head">備考</div>
              <TextArea
                rows={4}
                className="large"
                value={remarks}
                touch={touch}
                onChange={(e) => setRemarks(e.target.value)}
                validationList={ValidationLengthUnder500}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="editPc_footer base_footer">
        <Button
          size="md"
          color="primary"
          onClick={post}
        >
          登録
        </Button>
        <Button
          size="md"
          color="dark"
          onClick={() => dispatch(DialogActions.pop())}
        > 閉じる
        </Button>
      </div>
    </div>
  );
};
