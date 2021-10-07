import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { prefectures } from '../../../../../../../collection/prefectures';
import { DialogActions } from '../../../../../../../redux/dialog/dialog.action';
import { EditPC } from '../../../../../../dialogs/edit/edit.pc';
import { MasterEditDialogProps } from '../../../master.type';
import './store-master-edit-dialog.scss';
import { Radio } from '../../../../../../ui/radio/radio';
import { MasterActions } from '../../../../../../../redux/master/master.action';
import { Select } from '../../../../../../ui/select/select';
import { useDidMount } from '../../../../../../../hooks/life-cycle';
import { Input } from '../../../../../../ui/input/input';
import { LeftLabelInputField } from '../../../../../../ui/input-field/left-label-input-field/left-label-input-field';
import { RightLabelCheckbox } from '../../../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { Required } from '../../../../../../ui/required/required';
import { Button } from '../../../../../../ui/button/button';
import {
  ValidationLengthUnder255,
  ValidationPostNum1,
  ValidationPostNum2,
  ValidationTel,
} from '../../../../../../../model/validation';
import { MasterStoreValidation } from '../../../../../../../model/validation/master/master-store.validation';
import { MapActions } from '../../../../../../../redux/map/map.action';
import { convertFileList2FileArray } from '../../../../../../../utilities/convert2files';
import { FileUploadButton } from '../../../../../../ui/file-upload/file-upload-button';
import { changeString } from '../../../../../../../utilities/change-string';

export const StoreMasterEditDialog = (props: MasterEditDialogProps) => {
  const { id, callback } = props;

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [furigana, setFurigana] = useState('');
  const [shortName, setShortName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [faxNum, setFaxNum] = useState('');
  const [freeDial, setFreeDial] = useState('');
  const [postalCode1, setPostalCode1] = useState('');
  const [postalCode2, setPostalCode2] = useState('');
  const [prefecture, setPrefecture] = useState(NaN);
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccountNum, setBankAccountNum] = useState('');
  const [holder, setHolder] = useState('');
  const [bankAccount, setBankAccount] = useState(1);
  const [validFlag, setValidFlag] = useState(false);
  const [logo, setLogo] = useState<Blob | null>(null);

  const [imageName, setImageName] = useState('');
  const [touch, setTouch] = useState(false);
  const [img, setImg] = useState('');

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
    if (MasterStoreValidation(
      name,
      furigana,
      shortName,
      phoneNum,
      faxNum,
      freeDial,
      postalCode1,
      postalCode2,
      city,
      address,
      buildingName,
    )) {
      dispatch(DialogActions.pushMessage({
        title: '店舗 編集／追加',
        message: ['未入力／入力不備項目があります'],
        callback: () => setTouch(true),
      }));
      return;
    }

    dispatch(MasterActions.api.store.post({
      param: {
        data: {
          name,
          furigana,
          short_name: shortName,
          tel_no: phoneNum,
          fax_no: faxNum,
          free_dial: freeDial,
          post_no: postalCode1 && postalCode2 ? `${postalCode1}${postalCode2}` : '',
          prefecture,
          city,
          address,
          building_name: buildingName,
          bank_name: bankName,
          bank_account_no: bankAccountNum,
          holder,
          bank_account: bankAccount,
          is_valid: validFlag ? 1 : 0,
          logo,
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
    furigana,
    shortName,
    phoneNum,
    faxNum,
    freeDial,
    postalCode1,
    postalCode2,
    prefecture,
    city,
    address,
    buildingName,
    bankName,
    bankAccountNum,
    holder,
    bankAccount,
    validFlag,
    logo,
    callback,
  ]);

  const file2Img = useCallback((file:File | undefined | null) => {
    if (!file) {
      setImg('');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const res = e.target?.result ? e.target.result : '';
      if (typeof res === 'string') {
        setImg(res);
      }
    };
  }, []);

  const onFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList?.length) {
      const file = convertFileList2FileArray(fileList)[0];
      setImageName(file.name);
      setLogo(file);
      // setState({
      //   ...supportHistory,
      //   image: file,
      // });
      file2Img(file);
    }
  }, [logo, file2Img]);

  const handleClickImgDelete = useCallback(() => {
    setImg('');
    setLogo(null);
    // setState({
    //   ...supportHistory,
    //   image: null,
    // });
    setImageName('');
  }, [logo]);

  useDidMount(() => {
    if (id) {
      dispatch(MasterActions.api.store.get({
        param: { id },
        onSuccess: (data) => {
          if (!data) return;
          setName(data.name);
          setFurigana(data.furigana);
          setShortName(data.short_name);
          setPhoneNum(data.tel_no);
          setFaxNum(data.fax_no);
          setFreeDial(data.free_dial);
          setPostalCode1(changeString(data.post_no, '').slice(0, 3));
          setPostalCode2(changeString(data.post_no, '').slice(3, 7));
          setPrefecture(data.prefecture);
          setCity(data.city);
          setAddress(data.address);
          setBuildingName(data.building_name);
          setBankName(data.bank_name);
          setBankAccountNum(data.bank_account_no);
          setHolder(data.holder);
          setBankAccount(data.bank_account);
          setValidFlag(data.valid_flag);
          setLogo(data.logo);
        },
      }));
    }
  });

  return (
    <EditPC mode="dialog" callback={handleClickPost}>
      <div className="edit_pc_body_inner edit_master">
        <div className="left_box">
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">名称<Required /></div>
              <Input
                className="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                require
                validationList={ValidationLengthUnder255}
                touch={touch}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">フリガナ</div>
              <Input
                className="furigana"
                value={furigana}
                onChange={(e) => setFurigana(e.target.value)}
                validationList={ValidationLengthUnder255}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">

              <div className="item_head">略称</div>
              <Input
                className="short_name"
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
                validationList={ValidationLengthUnder255}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">

              <div className="item_head">電話番号</div>
              <Input
                type="number"
                className="tel_no"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
                validationList={ValidationTel}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">

              <div className="item_head">FAX番号</div>
              <Input
                type="number"
                className="fax_no"
                value={faxNum}
                onChange={(e) => setFaxNum(e.target.value)}
                validationList={ValidationTel}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">

              <div className="item_head">フリーダイヤル</div>
              <Input
                type="number"
                className="free_dial"
                value={freeDial}
                onChange={(e) => setFreeDial(e.target.value)}
                validationList={ValidationTel}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box max_width">
              <div className="item_head">住所</div>
              <div>
                <div className="item_postal">
                  <LeftLabelInputField
                    className="postal_code_1"
                    label="〒"
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
                  >住所入力
                  </Button>
                </div>
                <div className="item_adress">
                  <Select
                    className="add_text_left mt_10"
                    label="都道府県"
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
                    label="市区町村"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    validationList={ValidationLengthUnder255}
                  />
                  <LeftLabelInputField
                    className="address"
                    label="地名・番地"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    validationList={ValidationLengthUnder255}
                  />
                  <LeftLabelInputField
                    className="building_name"
                    label="建物名"
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
              <div className="item_head">PDF用ロゴ画像</div>

              {/* <div className="img_box mb_10">
                登録されている場合はロゴ画像表示し、inputは非表示<br />
                登録されていない場合はこの領域非表示
              </div>
 */}
              {/*  <div className="flex_no_wrap_box">
                  <Button
                    size="sm"
                    color="secondary"
                    className=""
                    onClick={() => {}}
                  >ファイル選択★TODO
                  </Button>
                  <Button
                    size="sm"
                    color="dark"
                    className="ml_10"
                    onClick={() => {}}
                  >クリア★TODO
                  </Button>
                  <input
                    style={{ display: 'none' }}
                    type="file"
                    value=""
                    onChange={() => {}}
                  />
                </div>
              </div> */}

              <div>
                {img
                && (
                <div className="img_box mb_10">
                  <img src={img} alt="img" />
                </div>
                )}
                <div className="flex_no_wrap_box">
                  <FileUploadButton
                    value=""
                    onChange={onFileInputChange}
                    accept="image/*"
                  />
                  {img
                  && (
                  <Button
                    size="sm"
                    color="dark"
                    className=""
                    onClick={handleClickImgDelete}
                  >削除
                  </Button>
                  )}
                </div>
                <Input
                  className="display_none"
                  value={imageName}
                  // accept="image/*"
                  id="input"
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">有効フラグ</div>
              <RightLabelCheckbox
                label=""
                className="is_valid"
                checked={validFlag}
                onChange={() => setValidFlag(!validFlag)}
              />
            </div>
          </div>
        </div>
        <div className="right_box">
          <div className="item_wrap">
            <div className="item_box">

              <div className="item_head">口座名義</div>
              <Input
                className="bank_account_name"
                value={holder}
                onChange={(e) => setHolder(e.target.value)}
              />

            </div>
            <div className="frame bank_info">
              <div className="item_wrap">
                <div className="item_box">
                  <div className="item_head">口座1</div>
                  <div className="">
                    <LeftLabelInputField
                      className="bank_name"
                      label="銀行名"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                    <LeftLabelInputField
                      className="bank_store_name mt_10"
                      label="店舗名"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                    <div className="flex_no_wrap_box mt_10">
                      <label className="for_radio">口座</label>
                      <Radio
                        label="普通"
                        name="bank_account"
                        checked={bankAccount === 1}
                        onChange={() => { setBankAccount(bankAccount === 1 ? 2 : 1); }}
                      />
                      <Radio
                        label="当座"
                        name="bank_account"
                        checked={bankAccount === 2}
                        onChange={() => { setBankAccount(bankAccount === 1 ? 2 : 1); }}
                      />
                    </div>
                    <LeftLabelInputField
                      className="bank_account_number mt_10"
                      label="口座番号"
                      type="number"
                      value={bankAccountNum}
                      onChange={(e) => setBankAccountNum(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="item_wrap">
                <div className="item_box">
                  <div className="item_head">口座2</div>
                  <div className="">
                    <LeftLabelInputField
                      className="bank_name"
                      label="銀行名"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                    <LeftLabelInputField
                      className="bank_store_name mt_10"
                      label="店舗名"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                    <div className="flex_no_wrap_box mt_10">
                      <label className="for_radio">口座</label>
                      <Radio
                        label="普通"
                        name="bank_account"
                        checked={bankAccount === 1}
                        onChange={() => { setBankAccount(bankAccount === 1 ? 2 : 1); }}
                      />
                      <Radio
                        label="当座"
                        name="bank_account"
                        checked={bankAccount === 2}
                        onChange={() => { setBankAccount(bankAccount === 1 ? 2 : 1); }}
                      />
                    </div>
                    <LeftLabelInputField
                      className="bank_account_number mt_10"
                      label="口座番号"
                      type="number"
                      value={bankAccountNum}
                      onChange={(e) => setBankAccountNum(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="item_wrap">
                <div className="item_box">
                  <div className="item_head">口座3</div>
                  <div className="">
                    <LeftLabelInputField
                      className="bank_name"
                      label="銀行名"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                    <LeftLabelInputField
                      className="bank_store_name mt_10"
                      label="店舗名"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                    <div className="flex_no_wrap_box mt_10">
                      <label className="for_radio">口座</label>
                      <Radio
                        label="普通"
                        name="bank_account"
                        checked={bankAccount === 1}
                        onChange={() => { setBankAccount(bankAccount === 1 ? 2 : 1); }}
                      />
                      <Radio
                        label="当座"
                        name="bank_account"
                        checked={bankAccount === 2}
                        onChange={() => { setBankAccount(bankAccount === 1 ? 2 : 1); }}
                      />
                    </div>
                    <LeftLabelInputField
                      className="bank_account_number mt_10"
                      label="口座番号"
                      type="number"
                      value={bankAccountNum}
                      onChange={(e) => setBankAccountNum(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="item_wrap">
                <div className="item_box">
                  <div className="item_head">口座4</div>
                  <div className="">
                    <LeftLabelInputField
                      className="bank_name"
                      label="銀行名"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                    <LeftLabelInputField
                      className="bank_store_name mt_10"
                      label="店舗名"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                    <div className="flex_no_wrap_box mt_10">
                      <label className="for_radio">口座</label>
                      <Radio
                        label="普通"
                        name="bank_account"
                        checked={bankAccount === 1}
                        onChange={() => { setBankAccount(bankAccount === 1 ? 2 : 1); }}
                      />
                      <Radio
                        label="当座"
                        name="bank_account"
                        checked={bankAccount === 2}
                        onChange={() => { setBankAccount(bankAccount === 1 ? 2 : 1); }}
                      />
                    </div>
                    <LeftLabelInputField
                      className="bank_account_number mt_10"
                      label="口座番号"
                      type="number"
                      value={bankAccountNum}
                      onChange={(e) => setBankAccountNum(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="item_wrap">
                <div className="item_box">
                  <div className="item_head">口座5</div>
                  <div className="">
                    <LeftLabelInputField
                      className="bank_name"
                      label="銀行名"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                    <LeftLabelInputField
                      className="bank_store_name mt_10"
                      label="店舗名"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                    <div className="flex_no_wrap_box mt_10">
                      <label className="for_radio">口座</label>
                      <Radio
                        label="普通"
                        name="bank_account"
                        checked={bankAccount === 1}
                        onChange={() => { setBankAccount(bankAccount === 1 ? 2 : 1); }}
                      />
                      <Radio
                        label="当座"
                        name="bank_account"
                        checked={bankAccount === 2}
                        onChange={() => { setBankAccount(bankAccount === 1 ? 2 : 1); }}
                      />
                    </div>
                    <LeftLabelInputField
                      className="bank_account_number mt_10"
                      label="口座番号"
                      type="number"
                      value={bankAccountNum}
                      onChange={(e) => setBankAccountNum(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="item_wrap">
                <div className="item_box">
                  <div className="item_head">口座6</div>
                  <div className="">
                    <LeftLabelInputField
                      className="bank_name"
                      label="銀行名"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                    <LeftLabelInputField
                      className="bank_store_name mt_10"
                      label="店舗名"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                    <div className="flex_no_wrap_box mt_10">
                      <label className="for_radio">口座</label>
                      <Radio
                        label="普通"
                        name="bank_account"
                        checked={bankAccount === 1}
                        onChange={() => { setBankAccount(bankAccount === 1 ? 2 : 1); }}
                      />
                      <Radio
                        label="当座"
                        name="bank_account"
                        checked={bankAccount === 2}
                        onChange={() => { setBankAccount(bankAccount === 1 ? 2 : 1); }}
                      />
                    </div>
                    <LeftLabelInputField
                      className="bank_account_number mt_10"
                      label="口座番号"
                      type="number"
                      value={bankAccountNum}
                      onChange={(e) => setBankAccountNum(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EditPC>
  );
};
