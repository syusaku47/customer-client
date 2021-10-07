import lodash, { isEqual } from 'lodash';
import React, {
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import * as AutoKana from 'vanilla-autokana';
import { CustomerCollection } from '../../../../../collection/customer/customer.collection';
import { prefectures } from '../../../../../collection/prefectures';
import { useDidMount } from '../../../../../hooks/life-cycle';
import { TagModel } from '../../../../../model/tag/tag';
import {
  ValidationLengthUnder100,
  ValidationLengthUnder20,
  ValidationLengthUnder254,
  ValidationLengthUnder255,
  ValidationLengthUnder4,
  ValidationLengthUnder50,
  ValidationLengthUnder60,
  ValidationLineId,
  ValidationPostNum1,
  ValidationPostNum2,
  ValidationTel,
  ValidationTwitterId,
} from '../../../../../model/validation';
import { CustomerValidation } from '../../../../../model/validation/customer/customer.validation';
import { ValidationDatePicker } from '../../../../../model/validation/validation-date-picker';
import { ValidationFacebookId } from '../../../../../model/validation/validation-facebook-id';
import { ValidationInstagramId } from '../../../../../model/validation/validation-instagram-id';
import { ValidationNotEmpty } from '../../../../../model/validation/validation-not-empty';
import { ValidationNumberLengthUnder3 } from '../../../../../model/validation/validation-number-length-under';
import { CustomerActions } from '../../../../../redux/customer/customer.action';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { MapActions } from '../../../../../redux/map/map.action';
import { MasterActions } from '../../../../../redux/master/master.action';
import { State } from '../../../../../redux/root.reducer';
import { TagActions } from '../../../../../redux/tag/tag.action';
import { EditState } from '../../../../../type/customer/customer.type';
import { autoKana } from '../../../../../utilities/auto-kana';
import { changeString } from '../../../../../utilities/change-string';
import { DateFormatter } from '../../../../../utilities/date-formatter';
import { EditSP, EditType } from '../../../../dialogs/edit/edit.sp';
import { Button } from '../../../../ui/button/button';
import { RightLabelCheckbox } from '../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { DatePicker } from '../../../../ui/date-picker/date-picker';
import { TopLabelInputField } from '../../../../ui/input-field/top-label-input-field/top-label-input-field';
import { Input } from '../../../../ui/input/input';
import { RegistrationAddressMapDialog } from '../../../../ui/map/registration-address-map-dialog/registration-address-map-dialog';
import { Required } from '../../../../ui/required/required';
import { Select } from '../../../../ui/select/select';
import { TextArea } from '../../../../ui/text-area/text-area';
import { FamilyInfoListSP } from '../../../layout/body/list/family-info/family-info-list';
import { PetInfoListSP } from '../../../layout/body/list/pet-info/pet-info-list';
import './customer-edit.sp.scss';
import { FamilyEditDialog } from './family/family-edit-dialog.sp';
import { PetEditDialog } from './pet/pet-edit-dialog.sp';
import { ValidationMailAddressEmptyOk } from '../../../../../model/validation/validation-mail-address-empty-ok';

type Props = {
  mode: EditType;
  customerID?: number;
  closeCallback?: (id: number) => void;
  idDetail?: boolean;
}

export const CustomerEditSP = (props: Props) => {
  const {
    mode, customerID, closeCallback, idDetail,
  } = props;

  /* Hooks */
  const sortState = useSelector((state:State) => state.customer.sort);
  const {
    partList, masterMyCarTypeList, relevantTagList,
  } = useSelector((state: State) => ({
    partList: state.tag.partList,
    masterMyCarTypeList: state.tag.masterMyCarTypeList,
    relevantTagList: state.tag.relevantTagList,
  }), isEqual);
  const {
    buildingCategoryList,
    madoriList,
    areaList,
    storeList,
    employeeList,
    originList,
    customerRankList,
    customerEstimatedRank,
  } = useSelector((state: State) => ({
    buildingCategoryList: state.master.buildingCategoryList,
    madoriList: state.master.madoriList,
    areaList: state.master.areaList,
    employeeList: state.master.employeeList,
    storeList: state.master.storeList,
    originList: state.master.originList,
    customerRankList: state.master.customerRankList,
    customerEstimatedRank: state.master.customerEstimatedRankList,
  }), isEqual);
  const dispatch = useDispatch();

  /* State */
  const [editId, setEditId] = useState<number | undefined>(customerID);
  const [customer, setCustomer] = useState<EditState>(
    CustomerCollection.customerEditInitialState,
  );
  const [touch, setTouch] = useState(false);
  const [familyId, setFamilyId] = useState(NaN);
  const [petId, setPetId] = useState(NaN);
  const [autoFurigana, setAutoFurigana] = useState<AutoKana.AutoKana | null>();

  /* Callback */
  const setState = useCallback(
    (v: EditState) => {
      setCustomer(v);
    }, [customer],
  );

  const setCustomerName = useCallback(
    (v: EditState) => {
      if (autoFurigana) {
        setCustomer({ ...v, furigana: autoFurigana.getFurigana() });
      } else {
        setCustomer(v);
      }
    }, [customer, autoFurigana],
  );

  const handleClickPost = useCallback(
    () => {
      if (CustomerValidation(customer)) {
        dispatch(DialogActions.pushMessage({
          title: '顧客情報登録',
          message: ['未入力／入力不備項目があります'],
          callback: () => setTouch(true),
        }));
        return;
      }
      const prefe = prefectures.find((v) => v.value === customer.prefecture)?.label;
      /* 保存API */
      dispatch(MapActions.api.geocoder({
        isRegist: true,
        param: {
          param: {
            address: `${prefe || ''}${customer.city}${customer.address}`,
          },
          noMessage: true,
        },
        callback: (data) => {
          dispatch(CustomerActions.api.customer.post({
            param: {
              data: {
                ...customer,
                post_no: customer.post_no1 && customer.post_no2 ? `${customer.post_no1}${customer.post_no2}` : '',
                tag_list: customer?.tag_list?.getSendData(),
                part_list: customer?.part_list?.getSendData(),
                my_car_type: customer?.my_car_type?.getSendData(),
                building_age: customer.building_age || 0,
                expected_part_list: customer?.expected_part_list?.getSendData(),
                wedding_anniversary: customer.wedding_anniversary
                  ? DateFormatter.date2str(customer.wedding_anniversary) : undefined,
                lat: String(data.position.lat),
                lng: String(data.position.lng),
              },
              id: editId,
            },
            onSuccess: () => {
              dispatch(CustomerActions.api.customer.get({
                param: { id: Number(editId) },
              }));
              dispatch(CustomerActions.api.customer.getList({
                ...sortState,
                tags: sortState?.tags?.getSendData(),
                parts: sortState?.parts?.getSendData(),
                is_deficiency: sortState.is_deficiency ? 1 : 0,
                post_no: `${sortState.post_no1 || ''}${sortState.post_no2 || ''}`,
              }));
            },
            onError: () => {
              setTouch(true);
            },
          }));
        },
      }));
    },
    [customer, editId, prefectures, sortState],
  );

  const handleClickRegistrationMap = useCallback(
    () => {
      dispatch(DialogActions.push({
        title: '住所を登録したい場所をクリックしてください',
        className: 'auto_height_dialog map_dialog',
        element: <RegistrationAddressMapDialog callback={(address) => {
          if (!address) return;
          const { components } = address;
          setState({
            ...customer,
            post_no1: components.postal1,
            post_no2: components.postal2,
            prefecture: components.prefecture,
            city: components.city,
            address: components.address,
            building_name: components.bill,
            sales_contact: customer.sales_contact,
          });
        }}
        />,
      }));
    }, [customer],
  );

  const handleClickFamily = useCallback(
    (id: number) => {
      setFamilyId(id);
    }, [],
  );

  const handleClickPet = useCallback(
    (id: number) => {
      setPetId(id);
    }, [],
  );

  const handleClickSearchAddress = useCallback(
    () => {
      dispatch(MapActions.api.addressSearch({
        param: {
          zipcode1: String(customer.post_no1),
          zipcode2: String(customer.post_no2),
        },
        callback: (address) => {
          setState({
            ...customer,
            prefecture: Number(address.prefcode),
            city: address.ja.address1,
            address: address.ja.address2,
            building_name: '',
          });
        },
      }));
    },
    [customer],
  );

  /* Effect */
  useEffect(() => {
    dispatch(TagActions.api.part.getList());
    dispatch(TagActions.api.masterMyCarType.getList());
    dispatch(TagActions.api.relevantTag.getList());
    dispatch(MasterActions.api.buildingCategory.getList({}));
    dispatch(MasterActions.api.madori.getList({}));
    dispatch(MasterActions.api.area.getList({}));
    dispatch(MasterActions.api.store.getList({}));
    dispatch(MasterActions.api.employee.getList({}));
    dispatch(MasterActions.api.area.getList({}));
    dispatch(MasterActions.api.origin.getList({}));
    dispatch(MasterActions.api.customerRank.getList({}));
    dispatch(MasterActions.api.customerExpectedRank.getList({}));
    setAutoFurigana(autoKana('name', 'furigana', true));
    return () => {
      if (mode === 'add') {
        dispatch(CustomerActions.setCustomer(null));
      }
      if (!idDetail) {
        dispatch(CustomerActions.setFamilyList([]));
        dispatch(CustomerActions.setPetList([]));
      }
    };
  }, []);

  useEffect(() => {
    setCustomer({
      ...lodash.cloneDeep(customer),
      expected_part_list: new TagModel(partList),
      part_list: new TagModel(partList),
      my_car_type: new TagModel(masterMyCarTypeList),
      tag_list: new TagModel(relevantTagList),
    });
  }, [
    partList,
    masterMyCarTypeList,
    relevantTagList,
  ]);

  useEffect(() => {
    /* 家族 */
    if (mode === 'update' && editId) {
      dispatch(CustomerActions.api.family.getList({
        id: editId,
      }));
    }
  }, [editId]);

  useEffect(() => {
    /* ペット*/
    if (mode === 'update' && editId) {
      dispatch(CustomerActions.api.pet.getList({
        id: editId,
      }));
    }
  }, [editId]);

  useEffect(() => {
    if (mode === 'update'
    && editId
      && partList.length
      && masterMyCarTypeList.length
      && relevantTagList.length
    ) {
      dispatch(CustomerActions.api.customer.get({
        param: { id: editId },
        callback: (data) => {
          setState({
            ...data,
            post_no1: changeString(data.post_no, '').slice(0, 3),
            post_no2: changeString(data.post_no, '').slice(3, 7),
            tel_no: changeString(data.tel_no, ''),
            tel_no2: changeString(data.tel_no2, ''),
            tel_no3: changeString(data.tel_no3, ''),
            wedding_anniversary: data.wedding_anniversary
              ? new Date(data.wedding_anniversary) : null,
            expected_part_list:
              new TagModel(partList, data.expected_part_list),
            part_list: new TagModel(partList, data.part_list),
            my_car_type: new TagModel(masterMyCarTypeList, data.my_car_type),
            tag_list: new TagModel(relevantTagList, data.tag_list),
          });
        },
      }));
    }
  }, [editId, partList, masterMyCarTypeList, relevantTagList]);

  useDidMount(() => {
    if (!editId) {
      dispatch(CustomerActions.api.id.get({
        callback: (data) => {
          setEditId(data.id);
          if (closeCallback) {
            closeCallback(data.id);
          }
        },
      }));
    }
    setCustomer({
      ...lodash.cloneDeep(customer),
      expected_part_list: new TagModel(partList),
      part_list: new TagModel(partList),
      my_car_type: new TagModel(masterMyCarTypeList),
      tag_list: new TagModel(relevantTagList),
    });
  });

  return (
    mode && (
    <EditSP mode={mode} callback={handleClickPost} isShowSwitch>
      <div className="edit_sp_body_inner customerEditSP">
        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_body item_map">
              <Button
                size="md"
                color="secondary"
                onClick={() => {
                  handleClickRegistrationMap();
                }}
              >
                地図から登録
              </Button>
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_body item_customer">
              <TopLabelInputField
                label="顧客名"
                value={customer?.name || ''}
                onChange={(e) => setCustomerName({ ...customer, name: e.target.value })}
                require
                id="name"
                validationList={ValidationLengthUnder60}
                touch={touch}
              />
              <TopLabelInputField
                label="敬称"
                value={customer?.keisho}
                onChange={(e) => setState({ ...customer, keisho: e.target.value })}
                validationList={ValidationLengthUnder4}
              />
            </div>

          </div>
          <div className="item_wrap">
            <TopLabelInputField
              id="furigana"
              className="full_width"
              label="顧客名（フリガナ）"
              value={customer?.furigana || ''}
              onChange={(e) => setState({ ...customer, furigana: e.target.value })}
              validationList={ValidationLengthUnder60}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">郵便番号<Required /></div>
            <div className="item_body item_postal">
              <div>〒&nbsp;
                <Input
                  value={customer?.post_no1 || ''}
                  type="number"
                  onChange={(e) => setState({ ...customer, post_no1: e.target.value })}
                  validationList={[
                    ...ValidationNotEmpty,
                    ...ValidationPostNum1,
                  ]}
                  touch={touch}
                  maxLength={3}
                />
              </div>
              <div className="hyphen">-</div>
              <div>
                <Input
                  value={customer.post_no2 || ''}
                  type="number"
                  onChange={(e) => setState({ ...customer, post_no2: e.target.value })}
                  validationList={[
                    ...ValidationNotEmpty,
                    ...ValidationPostNum2,
                  ]}
                  touch={touch}
                  maxLength={4}
                />
              </div>
              <Button
                size="md"
                color="secondary"
                onClick={handleClickSearchAddress}
                className="ml_10"
              >
                住所入力
              </Button>
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_label">顧客都道府県<Required /></div>
            <div className="item_body item_select full_width">
              <Select
                value={customer?.prefecture || NaN}
                onChange={(v) => setState({ ...customer, prefecture: Number(v) })}
                defaultLabel="指定無し"
                options={[
                  ...prefectures.map((v) => ({
                    text: v.label, value: v.value,
                  })),
                ]}
                require
                touch={touch}
              />
            </div>
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="顧客住所（市区町村）"
              value={customer?.city || ''}
              onChange={(e) => setState({ ...customer, city: e.target.value })}
              validationList={ValidationLengthUnder50}
              className="full_width"
              require
              touch={touch}
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="顧客住所（地名番地）"
              value={customer?.address || ''}
              onChange={(e) => setState({ ...customer, address: e.target.value })}
              validationList={ValidationLengthUnder50}
              className="full_width"
              require
              touch={touch}
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="建物名等"
              value={customer?.building_name || ''}
              onChange={(e) => setState({ ...customer, building_name: e.target.value })}
              validationList={ValidationLengthUnder100}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="電話番号"
              type="tel"
              value={customer?.tel_no || ''}
              onChange={(e) => setState({ ...customer, tel_no: e.target.value })}
              validationList={ValidationTel}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="電話番号２"
              type="tel"
              value={customer?.tel_no2 || ''}
              onChange={(e) => setState({ ...customer, tel_no2: e.target.value })}
              validationList={ValidationTel}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="電話番号３"
              type="tel"
              value={customer?.tel_no3 || ''}
              onChange={(e) => setState({ ...customer, tel_no3: e.target.value })}
              validationList={ValidationTel}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="Email"
              type="email"
              value={customer?.mail_address || ''}
              onChange={(e) => setState({ ...customer, mail_address: e.target.value })}
              validationList={[
                ...ValidationLengthUnder254,
                ...ValidationMailAddressEmptyOk,
              ]}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="Email２"
              type="email"
              value={customer?.mail_address2 || ''}
              onChange={(e) => setState({ ...customer, mail_address2: e.target.value })}
              validationList={[
                ...ValidationLengthUnder254,
                ...ValidationMailAddressEmptyOk,
              ]}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="Email３"
              type="email"
              value={customer?.mail_address3 || ''}
              onChange={(e) => setState({ ...customer, mail_address3: e.target.value })}
              validationList={[
                ...ValidationLengthUnder254,
                ...ValidationMailAddressEmptyOk,
              ]}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="FAX"
              type="tel"
              value={customer?.fax_no || ''}
              onChange={(e) => setState({ ...customer, fax_no: e.target.value })}
              validationList={ValidationTel}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="LINE ID"
              value={customer?.line_id || ''}
              onChange={(e) => setState({ ...customer, line_id: e.target.value })}
              validationList={ValidationLineId}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="Facebook ID"
              value={customer?.facebook_id || ''}
              onChange={(e) => setState({ ...customer, facebook_id: e.target.value })}
              validationList={ValidationFacebookId}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="Twitter ID"
              value={customer?.twitter_id || ''}
              onChange={(e) => setState({ ...customer, twitter_id: e.target.value })}
              validationList={ValidationTwitterId}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="Instagram ID"
              value={customer?.instagram_id || ''}
              onChange={(e) => setState({ ...customer, instagram_id: e.target.value })}
              validationList={ValidationInstagramId}
              className="full_width"
            />
          </div>
        </div>

        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">エリア</div>
            <div className="item_body item_area">
              <Select
                value={customer?.area || NaN}
                defaultLabel="指定無し"
                options={
                  areaList.map((v) => (
                    { text: v.name, value: v.area_id }
                  ))
                }
                onChange={(v) => setState({ ...customer, area: Number(v) })}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_label">営業担当 店舗</div>
            <div className="item_body item_shop">
              <Select
                value={customer?.sales_shop || NaN}
                defaultLabel="指定無し"
                options={
                  storeList.map((v) => (
                    { text: v.name, value: v.id }
                  ))
                }
                onChange={(v) => setState({ ...customer, sales_shop: Number(v) })}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_label">営業担当 担当者<Required /></div>
            <div className="item_body item_supporter">
              <Select
                value={customer?.sales_contact || NaN}
                defaultLabel="指定無し"
                options={
                  employeeList.map((v) => (
                    { text: v.name, value: v.id }
                  ))
                }
                onChange={(v) => setState({ ...customer, sales_contact: Number(v) })}
                require
                touch={touch}
              />
            </div>
          </div>

          <div className="hidden_category offset">
            <div className="item_wrap">
              <div className="item_label">顧客見込みランク</div>
              <div className="item_body item_customerRank">
                <Select
                  value={customer?.estimated_rank || NaN}
                  defaultLabel="指定無し"
                  options={customerEstimatedRank.map((v) => ({
                    text: v.name, value: v.customer_estimated_rank_id,
                  }))}
                  onChange={(v) => setState({ ...customer, estimated_rank: Number(v) })}
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_label">顧客ランク</div>
              <div className="item_body item_customerRank">
                <Select
                  value={customer?.rank || NaN}
                  defaultLabel="指定無し"
                  options={customerRankList.map((v) => ({
                    text: v.name, value: v.customer_rank_koji_id,
                  }))}
                  onChange={(v) => setState({ ...customer, rank: Number(v) })}
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_label">発生源</div>
              <div className="item_body item_source">
                <Select
                  value={customer?.source || NaN}
                  defaultLabel="指定無し"
                  options={originList.map((v) => ({
                    text: v.name, value: v.id,
                  }))}
                  onChange={(v) => setState({ ...customer, source: Number(v) })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="hidden_category">
          <div className="category_wrap">
            <div className="item_wrap tags_form">
              <div className="item_label">見込み部位</div>
              <div className="item_body item_checkbox">
                {customer?.expected_part_list?.data.map((v, i) => (
                  <div
                    key={`eTag${i}`}
                  >
                    <RightLabelCheckbox
                      checked={v.flag}
                      label={v.label}
                      onChange={() => {
                        customer.expected_part_list?.changeFlag(v.id);
                        setState({
                          ...customer,
                          expected_part_list: lodash.cloneDeep(customer.expected_part_list),
                        });
                      }}
                    />
                  </div>
                ))}

              </div>
            </div>
            <div className="item_wrap tags_form">
              <div className="item_label">部位</div>
              <div className="item_body item_checkbox">
                {customer?.part_list?.data.map((v, i) => (
                  <div
                    key={`pTag${i}`}
                  >
                    <RightLabelCheckbox
                      checked={v.flag}
                      label={v.label}
                      onChange={() => {
                        customer.part_list?.changeFlag(v.id);
                        setState({
                          ...customer,
                          part_list: lodash.cloneDeep(customer.part_list),
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="category_wrap">
            <div className="item_wrap">
              <div className="item_label">建物分類</div>
              <div className="item_body full_width">
                <Select
                  value={customer?.building_category || NaN}
                  defaultLabel="指定無し"
                  options={
                    buildingCategoryList.map((v) => (
                      { text: v.name, value: v.building_id }
                    ))
                  }
                  onChange={(v) => setState(
                    { ...customer, building_category: Number(v) },
                  )}
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_label">間取り</div>
              <div className="item_body item_madori">
                <Select
                  value={customer?.madori || NaN}
                  defaultLabel="指定無し"
                  options={
                    madoriList.map((v) => (
                      { text: v.name, value: v.madori_id }
                    ))
                  }
                  onChange={(v) => setState({ ...customer, madori: Number(v) })}
                />
                <div className="dummy" />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_label">築年数</div>
              <div className="item_body item_years">
                <Input
                  value={customer?.building_age || 0}
                  type="number"
                  onChange={(e) => setState({ ...customer, building_age: Number(e.target.value) })}
                  validationList={ValidationNumberLengthUnder3}
                  maxLength={3}
                />
              </div>
            </div>
          </div>
          <div className="category_wrap">
            <div className="item_wrap">
              <TopLabelInputField
                label="社内メモ1"
                value={customer?.memo1 || ''}
                onChange={(e) => setState({ ...customer, memo1: e.target.value })}
                validationList={ValidationLengthUnder255}
                className="full_width"
              />
            </div>
            <div className="item_wrap">
              <TopLabelInputField
                label="社内メモ2"
                value={customer?.memo2 || ''}
                onChange={(e) => setState({ ...customer, memo2: e.target.value })}
                validationList={ValidationLengthUnder255}
                className="full_width"
              />
            </div>
          </div>
          <div className="category_wrap">
            <div className="item_wrap tags_form">
              <div className="item_label">マイカー種別</div>
              <div className="item_body item_checkbox">
                {customer?.my_car_type?.data.map((v, i) => (
                  v.id !== 13
                    ? (
                      <div
                        key={`mTag${i}`}
                      >
                        <RightLabelCheckbox
                          checked={v.flag}
                          label={v.label}
                          onChange={() => {
                            customer.my_car_type?.changeFlag(v.id);
                            setState(
                              { ...customer, my_car_type: lodash.cloneDeep(customer.my_car_type) },
                            );
                          }}
                        />
                      </div>
                    )
                    : (
                      <div className="single_column width_inputField">
                        <RightLabelCheckbox
                          label={v.label}
                          checked={v.flag}
                          onChange={() => {
                            customer.my_car_type?.changeFlag(v.id);
                            setState(
                              { ...customer, my_car_type: lodash.cloneDeep(customer.my_car_type) },
                            );
                          }}
                        />
                        <div className="inputField">
                          <span>（</span>
                          <Input
                            value={customer?.my_car_type_other}
                            type="text"
                            onChange={(e) => v.flag && setState(
                              { ...customer, my_car_type_other: e.target.value },
                            )}
                            validationList={ValidationLengthUnder20}
                          /><span>）</span>
                        </div>
                      </div>
                    )
                ))}
                {/* <div className="single_column width_inputField">
                  <RightLabelCheckbox
                    label="その他"
                    checked={other}
                    onChange={() => {
                      setOther(!other);
                    }}
                  />
                  <div className="inputField">
                    <span>（</span>
                    <Input
                      value={customer?.my_car_type_other || ''}
                      type="text"
                      onChange={(e) => other && setState(
                        { ...customer, my_car_type_other: e.target.value },
                      )}
                      validationList={ValidationLengthUnder20}
                    /><span>）</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="category_wrap">
            <div className="item_wrap tags_form">
              <div className="item_label">関連タグ</div>
              <div className="item_body item_checkbox">
                {customer?.tag_list?.data.map((v, i) => (
                  <div
                    key={`rTag${i}`}
                  >
                    <RightLabelCheckbox
                      checked={v.flag}
                      label={v.label}
                      onChange={() => {
                        customer.tag_list?.changeFlag(v.id);
                        setState({ ...customer, tag_list: lodash.cloneDeep(customer.tag_list) });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="category_wrap">
            <div className="item_wrap">
              <div className="item_label">備考</div>
              <div className="item_body full_width item_remarks">
                <TextArea
                  rows={7}
                  value={customer?.remarks}
                  onChange={(e) => setState(
                    { ...customer, remarks: e.target.value },
                  )}
                  validationList={ValidationLengthUnder255}
                />
              </div>
            </div>
          </div>

          <div className="category_wrap">
            <div className="item_wrap">
              <TopLabelInputField
                label="紹介者"
                value={customer?.introducer}
                onChange={(e) => setState({ ...customer, introducer: e.target.value })}
                validationList={ValidationLengthUnder60}
                className="full_width"
              />
            </div>
            <div className="item_wrap">
              <div className="item_label">結婚記念日</div>
              <DatePicker
                date={customer.wedding_anniversary || null}
                onChange={(v) => setState(
                  { ...customer, wedding_anniversary: v },
                )}
                validationList={ValidationDatePicker}
              />
            </div>

            <div className="item_wrap">
              <div className="item_label">ご家族情報</div>
              <div className="item_body full_width item_cardList">
                <div className="body">
                  <Segment>
                    <FamilyInfoListSP
                      callback={handleClickFamily}
                      isInDialog
                    />
                  </Segment>
                </div>
                <div className="footer">
                  <Button
                    size="md"
                    color="secondary"
                    onClick={() => {
                      dispatch(DialogActions.push({
                        title: 'ご家族情報登録',
                        className: 'auto_height_dialog',
                        element: <FamilyEditDialog
                          id={Number(editId)}
                        />,
                      }));
                    }}
                  >登録
                  </Button>
                  <Button
                    size="md"
                    color="secondary"
                    disabled={!familyId && familyId !== 0}
                    onClick={() => {
                      dispatch(DialogActions.push({
                        title: 'ご家族情報登録',
                        element: <FamilyEditDialog
                          id={Number(editId)}
                          isEdit
                          familyId={familyId}
                        />,
                      }));
                    }}
                  >編集
                  </Button>
                  <Button
                    size="md"
                    color="dark"
                    disabled={!familyId && familyId !== 0}
                    onClick={() => {
                      dispatch(DialogActions.pushMessage({
                        title: 'ご家族情報削除',
                        message: ['削除しますか'],
                        isCancel: true,
                        callback: () => {
                          dispatch(CustomerActions.api.family.delete({
                            param: {
                              id: Number(editId),
                              family_id: familyId,
                            },
                            onSuccess: () => setFamilyId(NaN),
                          }));
                        },
                      }));
                    }}
                  >削除
                  </Button>
                </div>
              </div>
            </div>

            <div className="item_wrap">
              <div className="item_label">ペット情報</div>
              <div className="item_body full_width item_cardList">
                <div className="body">
                  <Segment><PetInfoListSP callback={handleClickPet} isInDialog /></Segment>
                </div>
                <div className="footer">
                  <Button
                    size="md"
                    color="secondary"
                    onClick={() => {
                      dispatch(DialogActions.push({
                        title: 'ペット情報登録',
                        element: <PetEditDialog
                          id={Number(editId)}
                        />,
                      }));
                    }}
                  >登録
                  </Button>
                  <Button
                    size="md"
                    color="secondary"
                    disabled={!petId && petId !== 0}
                    onClick={() => {
                      dispatch(DialogActions.push({
                        title: 'ペット情報登録',
                        element: <PetEditDialog
                          id={Number(editId)}
                          isEdit
                          petId={petId}
                        />,
                      }));
                    }}
                  >編集
                  </Button>
                  <Button
                    size="md"
                    color="dark"
                    disabled={!petId && petId !== 0}
                    onClick={() => {
                      dispatch(DialogActions.pushMessage({
                        title: 'ペット情報削除',
                        message: ['削除しますか'],
                        isCancel: true,
                        callback: () => {
                          dispatch(CustomerActions.api.pet.delete({
                            param: {
                              id: Number(editId),
                              pet_id: petId,
                            },
                            onSuccess: () => setPetId(NaN),
                          }));
                        },
                      }));
                    }}
                  >削除
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EditSP>
    )
  );
};
