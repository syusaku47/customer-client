import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { prefectures } from '../../../../../../collection/prefectures';
import { DialogActions } from '../../../../../../redux/dialog/dialog.action';
import { MasterEditDialogProps } from '../../master.type';
import { Input } from '../../../../../ui/input/input';
import { Required } from '../../../../../ui/required/required';
import { Checkbox } from '../../../../../ui/checkbox/checkbox';
import { LeftLabelInputField } from '../../../../../ui/input-field/left-label-input-field/left-label-input-field';
import { Button } from '../../../../../ui/button/button';
import { Select } from '../../../../../ui/select/select';
import { Radio } from '../../../../../ui/radio/radio';
import './contracted-company-master-edit-dialog.scss';
import { MasterContractedCompanyValidation } from '../../../../../../model/validation/master/master-contracted-company.validation';
import { MasterActions } from '../../../../../../redux/master/master.action';
import { EditPC } from '../../../../../dialogs/edit/edit.pc';
import {
  ValidationLengthUnder255, ValidationPostNum1, ValidationPostNum2, ValidationTel,
} from '../../../../../../model/validation';
import { ValidationMailAddress } from '../../../../../../model/validation/validation-mail-address';
import { ValidationPassword } from '../../../../../../model/validation/validation-password';
import { MapActions } from '../../../../../../redux/map/map.action';
import { useDidMount } from '../../../../../../hooks/life-cycle';
import { changeString } from '../../../../../../utilities/change-string';

export const ContractedCompanyMasterEditDialog = (props: MasterEditDialogProps) => {
  const { id, callback } = props;

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [mailAddress, setMailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [telNo, setTelNo] = useState('');
  const [postalCode1, setPostalCode1] = useState('');
  const [postalCode2, setPostalCode2] = useState('');
  const [prefecture, setPrefecture] = useState(NaN);
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [status, setStatus] = useState('??????');
  const [accounts, setAccounts] = useState(10);
  const [validFlag, setValidFlag] = useState(true);
  const [isValid1, setIsValid1] = useState(false);
  const [isValid2, setIsValid2] = useState(false);
  const [isValid3, setIsValid3] = useState(false);
  const [isValid4, setIsValid4] = useState(false);
  const [isValid5, setIsValid5] = useState(false);

  const [touch, setTouch] = useState(false);

  const handleClickSearchAddress = useCallback(
    () => {
      dispatch(MapActions.api.addressSearch({
        param: {
          zipcode1: String(postalCode1),
          zipcode2: String(postalCode2),
        },
        callback: (searchedAddress) => {
          setPrefecture(Number(searchedAddress.prefcode));
          setCity(searchedAddress.ja.address1);
          setAddress(searchedAddress.ja.address2);
          setBuildingName('');
        },
      }));
    },
    [postalCode1, postalCode2],
  );

  const handleClickPost = useCallback(() => {
    if (MasterContractedCompanyValidation(
      name,
      mailAddress,
      password,
      telNo,
      postalCode1,
      postalCode2,
      city,
      address,
      buildingName,
      accounts,
    )) {
      dispatch(DialogActions.pushMessage({
        title: '???????????? ???????????????',
        message: ['?????????????????????????????????????????????'],
        callback: () => setTouch(true),
      }));
      return;
    }

    dispatch(MasterActions.api.contractedCompany.post({
      param: {
        data: {
          name,
          mail_address: mailAddress,
          password,
          tel_no: telNo,
          post_no: postalCode1 && postalCode2 ? `${postalCode1}${postalCode2}` : '',
          prefecture,
          city,
          address,
          building_name: buildingName,
          status: status === '??????' ? 1 : 2,
          accounts,
          is_valid: validFlag ? 1 : 0,
          is_valid1: isValid1 ? 1 : 0,
          is_valid2: isValid2 ? 1 : 0,
          is_valid3: isValid3 ? 1 : 0,
          is_valid4: isValid4 ? 1 : 0,
          is_valid5: isValid5 ? 1 : 0,
        },
        id,
      },
      onSuccess: () => {
        callback();
      },
      onError: () => {
        setTouch(true);
      },
    }));
    dispatch(DialogActions.pop());
  }, [
    name,
    mailAddress,
    password,
    telNo,
    postalCode1,
    postalCode2,
    prefecture,
    city,
    address,
    buildingName,
    status,
    accounts,
    validFlag,
    callback,
  ]);

  useDidMount(() => {
    if (id) {
      dispatch(MasterActions.api.contractedCompany.get({
        param: { id },
        onSuccess: (data) => {
          if (!data) return;
          setName(data.name);
          setMailAddress(data.mail_address);
          setPassword(data.password);
          setTelNo(data.tel_no);
          setPostalCode1(changeString(data.post_no, '').slice(0, 3));
          setPostalCode2(changeString(data.post_no, '').slice(3, 7));
          setPrefecture(data.prefecture);
          setCity(data.city);
          setAddress(data.address);
          setBuildingName(data.building_name);
          setStatus(data.status === 1 ? '??????' : '??????');
          setAccounts(data.accounts);
          setValidFlag(data.valid_flag);
          setIsValid1(data.valid_flag1);
          setIsValid2(data.valid_flag2);
          setIsValid3(data.valid_flag3);
          setIsValid4(data.valid_flag4);
          setIsValid5(data.valid_flag5);
        },
      }));
    }
  });

  return (
    <EditPC mode="dialog" callback={handleClickPost}>
      <div className="edit_pc_body_inner edit_master">
        <div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">?????????<Required /></div>
              <Input
                className="medium"
                require
                value={name}
                onChange={(e) => setName(e.target.value)}
                validationList={ValidationLengthUnder255}
                touch={touch}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box max_width">
              <div className="item_head">?????????????????????<Required /></div>
              <Input
                className="large"
                value={mailAddress}
                type="email"
                onChange={(e) => setMailAddress(e.target.value)}
                validationList={ValidationMailAddress}
                require
                touch={touch}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">???????????????<Required /></div>
              <div className="password">
                <Input
                  className="mt_10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  validationList={ValidationPassword}
                  require
                  touch={touch}
                />
              </div>
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">????????????</div>
              <Input
                type="number"
                className="tel_no"
                value={telNo}
                onChange={(e) => setTelNo(e.target.value)}
                validationList={ValidationTel}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box max_width">
              <div className="item_head">??????</div>
              <div>
                <div className="item_postal">
                  <LeftLabelInputField
                    className="postal_code_1"
                    label="???"
                    type="number"
                    value={postalCode1}
                    onChange={(e) => { setPostalCode1(e.target.value); }}
                    validationList={ValidationPostNum1}
                    maxLength={3}
                  />
                  <LeftLabelInputField
                    className="postal_code_2"
                    label="-"
                    type="number"
                    value={postalCode2}
                    onChange={(e) => { setPostalCode2(e.target.value); }}
                    validationList={ValidationPostNum2}
                    maxLength={4}
                  />
                  <Button
                    size="sm"
                    color="secondary"
                    className="ml_10"
                    onClick={handleClickSearchAddress}
                  >????????????
                  </Button>
                </div>
                <div className="item_adress">
                  <Select
                    className="add_text_left mt_10"
                    label="????????????"
                    value={prefecture ?? NaN}
                    onChange={(v) => setPrefecture(Number(v))}
                    defaultLabel=""
                    options={[
                      ...prefectures.map((v) => ({
                        text: v.label, value: v.value,
                      })),
                    ]}
                  />
                  <LeftLabelInputField
                    className="city"
                    label="????????????"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    validationList={ValidationLengthUnder255}
                  />
                  <LeftLabelInputField
                    className="address"
                    label="???????????????"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    validationList={ValidationLengthUnder255}
                  />
                  <LeftLabelInputField
                    className="building_name"
                    label="?????????"
                    value={buildingName}
                    onChange={(e) => setBuildingName(e.target.value)}
                    validationList={ValidationLengthUnder255}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">??????</div>
              <Radio
                label="??????"
                name="bank_account"
                checked={status === '??????'}
                onChange={() => {
                  setStatus('??????');
                  setAccounts(10);
                }}
              />
              <Radio
                label="??????"
                name="bank_account"
                checked={status === '??????'}
                onChange={() => {
                  setStatus('??????');
                  setAccounts(NaN);
                }}
              />
              <div>
                <Checkbox
                  label="???????????? ????????????????????????????????????"
                  className=""
                  checked={isValid1}
                  onChange={() => setIsValid1(!isValid1)}
                />
                <Checkbox
                  label="???????????? ????????????????????????????????????"
                  className=""
                  checked={isValid2}
                  onChange={() => setIsValid2(!isValid2)}
                />
                <Checkbox
                  label="???????????? ???????????????"
                  className=""
                  checked={isValid3}
                  onChange={() => setIsValid3(!isValid3)}
                />
                <Checkbox
                  label="??????????????? ???????????????????????????"
                  className=""
                  checked={isValid4}
                  onChange={() => setIsValid4(!isValid4)}
                />
                <Checkbox
                  label="??????????????? ?????????????????????????????????"
                  className=""
                  checked={isValid5}
                  onChange={() => setIsValid5(!isValid5)}
                />
              </div>
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">??????????????????</div>
              <Input
                type="number"
                className="small"
                value={accounts}
                onChange={(e) => {
                  if (status === '??????') {
                    setAccounts(10);
                  } else {
                    setAccounts(Number(e.target.value));
                  }
                }}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">???????????????</div>
              <Checkbox
                label=""
                className="is_valid"
                checked={validFlag}
                onChange={() => setValidFlag(!validFlag)}
              />
            </div>
          </div>
        </div>
      </div>
    </EditPC>
  );
};
