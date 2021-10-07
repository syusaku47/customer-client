import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import lodash from 'lodash';
import * as AutoKana from 'vanilla-autokana';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import CopyToClipboard from 'react-copy-to-clipboard';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { EditType } from '../../../../dialogs/edit/edit.sp';
import { Button } from '../../../../ui/button/button';
import { IconButton } from '../../../../ui/button/icon-button/icon-button';
import { RightLabelCheckbox } from '../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { DateFormatter } from '../../../../../utilities/date-formatter';
import { ValidationNotEmpty } from '../../../../../model/validation/validation-not-empty';
import { deleteHyphen } from '../../../../../utilities/delete-str';
import { Input } from '../../../../ui/input/input';
import { Required } from '../../../../ui/required/required';
import './customer-edit.scss';
import { CustomerActions } from '../../../../../redux/customer/customer.action';
import { prefectures } from '../../../../../collection/prefectures';
import { TagModel } from '../../../../../model/tag/tag';
import { State } from '../../../../../redux/root.reducer';
import { TagActions } from '../../../../../redux/tag/tag.action';
import { CustomerCollection } from '../../../../../collection/customer/customer.collection';
import { EditState } from '../../../../../type/customer/customer.type';
import { DatePicker } from '../../../../ui/date-picker/date-picker';
import { Select } from '../../../../ui/select/select';
import { FamilyEditDialog } from './family/family-edit-dialog';
import { PetEditDialog } from './pet/pet-edit-dialog';
import { changeString } from '../../../../../utilities/change-string';
import { autoKana } from '../../../../../utilities/auto-kana';
import { RegistrationAddressMapDialogPC } from '../../../../ui/map/registration-address-map-dialog/pc/registration-address-map-dialog.pc';
import { MapActions } from '../../../../../redux/map/map.action';
import { EditPC } from '../../../../dialogs/edit/edit.pc';
import { PetInfoList } from '../../../layout/body/list/pet-info/pet-info-list.pc';
import { FamilyInfoList } from '../../../layout/body/list/family-info/family-info-list.pc';
import { MasterActions } from '../../../../../redux/master/master.action';
import { TextArea } from '../../../../ui/text-area/text-area';
import { CustomerValidation } from '../../../../../model/validation/customer/customer.validation';
import { LeftLabelInputField } from '../../../../ui/input-field/left-label-input-field/left-label-input-field';
import { useDidMount } from '../../../../../hooks/life-cycle';
import {
  ValidationFacebookId,
  ValidationInstagramId,
  ValidationLengthUnder100,
  ValidationLengthUnder20,
  ValidationLengthUnder254,
  ValidationLengthUnder255,
  ValidationLengthUnder4,
  ValidationLengthUnder50,
  ValidationLengthUnder60,
  ValidationLineId,
  ValidationMailAddressEmptyOk,
  ValidationPostNum1,
  ValidationPostNum2,
  ValidationTel,
  ValidationTwitterId,
} from '../../../../../model/validation';
import { openLink } from '../../../../../utilities/open-link';
import { ValidationNumberLengthUnder3 } from '../../../../../model/validation/validation-number-length-under';
import { ValidationDatePicker } from '../../../../../model/validation/validation-date-picker';
import { SearchAddressDialog } from '../../../../ui/map/search-address-dialog.tsx/search-address-dialog';
import { PetListModel } from '../../../../../model/customer/pet-list.model';
import { FamilyListModel } from '../../../../../model/customer/family-list.model';

type Props = {
  mode: EditType;
  customerID?: number;
  callback: () => void;
  closeCallback?: (id: number) => void;
}

export const CustomerEdit = (props: Props) => {
  const {
    mode, customerID, callback, closeCallback,
  } = props;

  const sortState = useSelector((state: State) => state.customer.sort, isEqual);

  /* Hooks */
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
    // const [other, setOther] = useState(false);
  const [touch, setTouch] = useState(false);
  const [familyId, setFamilyId] = useState(NaN);
  const [petId, setPetId] = useState(NaN);
  const [autoFurigana, setAutoFurigana] = useState<AutoKana.AutoKana | null>();
  // const [petOrderSort, setPetOrderSort] = useState<{
  //     order: number;
  //     sort: number;
  //   } | undefined>(undefined);
  // const [familyOrderSort, setFamilyOrderSort] = useState<{
  //     order: number;
  //     sort: number;
  //   } | undefined>(undefined);
  const [familyListModel, setFamilyListModel] = useState<FamilyListModel>(new FamilyListModel());
  const [famEditCount, setFamEditCount] = useState(0);
  const [petListModel, setPetListModel] = useState<PetListModel>(new PetListModel());
  const [petEditCount, setPetEditCount] = useState(0);

  /* Memo */
  const ob = useMemo(() => {
    if (customerID === undefined) {
      return '';
    }
    return customer.ob_flag === 1 ? 'OB' : '見込み';
  }, [customerID]);

  /* Callback */
  const setState = useCallback(
    (v: EditState) => {
      setCustomer(cloneDeep(v));
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
                expected_part_list: customer?.expected_part_list?.getSendData(),
                building_age: customer.building_age || 0,
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
    [customer, editId, prefectures, callback, sortState],
  );

  const handleClickRegistrationMap = useCallback(
    () => {
      dispatch(DialogActions.push({
        title: '住所を登録したい場所をクリックしてください',
        className: 'max_height_dialog map_dialog',
        element: <RegistrationAddressMapDialogPC
          label="登録"
          callback={(address) => {
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
            });
          }}
        />,
      }));
    }, [customer],
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

  const editFamily = useCallback((isEdit?: 'edit') => {
    if (isEdit && Number.isNaN(familyId)) return;
    const data = isEdit ? familyListModel.list.find((v) => v.index === familyId) : undefined;
    dispatch(DialogActions.push({
      title: `ペット情報${isEdit ? '編集' : '登録'}`,
      className: 'auto_height_dialog',
      element: <FamilyEditDialog
        id={Number(editId)}
        isEdit={!!isEdit}
        data={isEdit ? data : undefined}
        callbackPost={(res) => {
          if (isEdit) {
            familyListModel.edit(res);
          } else {
            familyListModel.add(res);
            setFamEditCount(famEditCount + 1);
            setFamilyId(NaN);
          }
          dispatch(DialogActions.pop());
          setFamilyListModel(cloneDeep(familyListModel));
        }}
      />,
    }));
  }, [familyId, familyListModel, famEditCount]);

  const editPet = useCallback((isEdit?: 'edit') => {
    if (isEdit && Number.isNaN(petId)) return;
    const data = isEdit ? petListModel.list.find((v) => v.index === petId) : undefined;
    dispatch(DialogActions.push({
      title: `ペット情報${isEdit ? '編集' : '登録'}`,
      className: 'auto_height_dialog',
      element: <PetEditDialog
        id={Number(editId)}
        isEdit={!!isEdit}
        data={isEdit ? data : undefined}
        callbackPost={(res) => {
          if (isEdit) {
            petListModel.edit(res);
          } else {
            petListModel.add(res);
            setPetId(NaN);
            setPetEditCount(petEditCount + 1);
          }
          dispatch(DialogActions.pop());
          setPetListModel(cloneDeep(petListModel));
        }}
      />,
    }));
  }, [petId, petListModel, petEditCount]);

  const removeFamily = useCallback(() => {
    const data = familyListModel.list.find((v) => v.index === familyId);
    if (!data) return;
    dispatch(DialogActions.pushMessage({
      title: '家族情報削除',
      message: ['削除しますか'],
      isCancel: true,
      callback: () => {
        setFamilyId(NaN);
        familyListModel.remove(data);
        setFamilyListModel(cloneDeep(familyListModel));
      },
    }));
  }, [familyId]);

  const removePet = useCallback(() => {
    const data = petListModel.list.find((v) => v.index === petId);
    if (!data) return;
    dispatch(DialogActions.pushMessage({
      title: 'ペット情報削除',
      message: ['削除しますか'],
      isCancel: true,
      callback: () => {
        setPetId(NaN);
        petListModel.remove(data);
        setPetListModel(cloneDeep(petListModel));
      },
    }));
  }, [petId]);

  const familySort = useCallback((order:number, sort: number) => {
    familyListModel.sortHeader(order ? 'desc' : 'asc', sort);
    setFamilyListModel(cloneDeep(familyListModel));
  }, [familyListModel]);

  const petSort = useCallback((order:number, sort: number) => {
    petListModel.sortHeader(order ? 'desc' : 'asc', sort);
    setPetListModel(cloneDeep(petListModel));
  }, [petListModel]);

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
      dispatch(CustomerActions.setCustomer(null));
      dispatch(CustomerActions.setFamilyList([]));
      dispatch(CustomerActions.setPetList([]));
    };
  }, []);

  useEffect(() => {
    /* 家族 */
    if (mode === 'update' && editId) {
      setFamilyListModel(new FamilyListModel([]));
      dispatch(CustomerActions.setPetList([]));
      // dispatch(CustomerActions.api.family.getList({
      //   id: editId,
      //   sort_by: familyOrderSort?.sort,
      //   highlow: familyOrderSort?.order,
      // }));
    }
  }, [editId]);

  useEffect(() => {
    /* ペット*/
    if (mode === 'update' && editId) {
      setPetListModel(new PetListModel([]));
      dispatch(CustomerActions.setPetList([]));
    //   dispatch(CustomerActions.api.pet.getList({
    //     id: editId,
    //     sort_by: familyOrderSort?.sort,
    //     highlow: familyOrderSort?.order,
    //   }));
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
          dispatch(CustomerActions.setCustomer(data));
          setState({
            ...data,
            fax_no: deleteHyphen(data.fax_no),
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
      <EditPC mode={mode === 'add' ? 'dialog' : 'detail'} callback={handleClickPost}>
        {/* editPC_body_inner は各画面の共通用 */}
        <div className="edit_pc_body_inner edit_customer">
          <div className="left_box">
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">顧客ID</div>
                <div className="flex_wrap_box">
                  <Input
                    className="mr_10"
                    label="顧客ID"
                    value={customerID || ''}
                    disabled
                  />
                  <Input
                    className="small"
                    value={ob}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">名称<Required /></div>
                <Input
                  value={customer?.name}
                  onChange={(e) => setCustomerName({ ...customer, name: e.target.value })}
                  require
                  id="name"
                  validationList={ValidationLengthUnder60}
                  touch={touch}
                />
              </div>
              <div className="item_box">
                <div className="item_head">敬称</div>
                <Input
                  className="small"
                  label=""
                  value={customer?.keisho || ''}
                  onChange={(e) => setState({ ...customer, keisho: e.target.value })}
                  validationList={ValidationLengthUnder4}
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">フリガナ</div>
                <Input
                  id="furigana"
                  className="full_width"
                  label="フリガナ"
                  value={customer?.furigana || ''}
                  onChange={(e) => setState({ ...customer, furigana: e.target.value })}
                  validationList={ValidationLengthUnder60}
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">郵便番号<Required /></div>
                {/* TODO  */}
                <div className="item_postal">
                  <LeftLabelInputField
                    className="postal_code_1"
                    label="〒"
                    type="number"
                    value={customer?.post_no1 || ''}
                    onChange={(e) => setState({ ...customer, post_no1: e.target.value })}
                    validationList={[
                      ...ValidationNotEmpty,
                      ...ValidationPostNum1,
                    ]}
                    touch={touch}
                    maxLength={3}
                  />
                  <LeftLabelInputField
                    className="postal_code_2"
                    label="-"
                    type="number"
                    value={customer.post_no2 || ''}
                    onChange={(e) => setState({ ...customer, post_no2: e.target.value })}
                    validationList={[
                      ...ValidationNotEmpty,
                      ...ValidationPostNum2,
                    ]}
                    touch={touch}
                    maxLength={4}
                  />
                  <Button
                    size="sm"
                    color="secondary"
                    className="ml_10"
                    onClick={handleClickSearchAddress}
                  >住所入力
                  </Button>
                  <Button
                    size="sm"
                    color="secondary"
                    className="ml_10"
                    onClick={() => {
                      dispatch(DialogActions.push({
                        title: '住所検索',
                        element: <SearchAddressDialog />,
                      }));
                    }}
                  >TODO 住所入力
                  </Button>
                  <Button
                    size="sm"
                    className="ml_10"
                    color="secondary"
                    onClick={handleClickRegistrationMap}
                  >地図から入力
                  </Button>
                </div>
              </div>

            </div>
            <div className="item_wrap">
              <div className="item_box max_width">
                <div className="item_head">住所<Required /></div>
                <div className="item_adress">
                  <Select
                    className="add_text_left"
                    label="都道府県"
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
                  <LeftLabelInputField
                    label="市区町村"
                    value={customer?.city || NaN}
                    onChange={(e) => setState({ ...customer, city: e.target.value })}
                    validationList={ValidationLengthUnder50}
                    className="large"
                    require
                    touch={touch}
                  />
                  <LeftLabelInputField
                    label="地名・番地"
                    value={customer?.address || ''}
                    onChange={(e) => setState({ ...customer, address: e.target.value })}
                    validationList={ValidationLengthUnder50}
                    className="large"
                    require
                    touch={touch}
                  />
                  <LeftLabelInputField
                    label="建物名等"
                    value={customer?.building_name || ''}
                    onChange={(e) => setState({ ...customer, building_name: e.target.value })}
                    validationList={ValidationLengthUnder100}
                    className="large"
                  />
                </div>
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box max_width">
                <div className="item_head">Email</div>
                <Input
                  value={customer?.mail_address || ''}
                  onChange={(e) => setState({ ...customer, mail_address: e.target.value })}
                  validationList={[
                    ...ValidationLengthUnder254,
                    ...ValidationMailAddressEmptyOk,
                  ]}
                  className="large"
                  type="email"
                />
                {/* TODO
                <IconButton
                  title="メール"
                  fontAwesomeClass="fas fa-route"
                  className="secondary"
                  onClick={() => {}}
                />*/}
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">電話</div>
                <Input
                  type="tel"
                  value={customer?.tel_no || ''}
                  onChange={(e) => setState({ ...customer, tel_no: e.target.value })}
                  className="full_width"
                  validationList={
                    ValidationTel
                  }
                />
              </div>
              <div className="item_box">
                <div className="item_head">FAX</div>
                <Input
                  type="tel"
                  value={customer?.fax_no || ''}
                  onChange={(e) => setState({ ...customer, fax_no: e.target.value })}
                  className="full_width"
                  validationList={ValidationTel}
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">電話番号２</div>
                <Input
                  type="tel"
                  value={customer?.tel_no2 || ''}
                  onChange={(e) => setState({ ...customer, tel_no2: e.target.value })}
                  validationList={ValidationTel}
                  className="full_width"
                />
              </div>
              <div className="item_box">
                <div className="item_head">電話番号３</div>
                <Input
                  type="tel"
                  value={customer?.tel_no3 || ''}
                  onChange={(e) => setState({ ...customer, tel_no3: e.target.value })}
                  validationList={ValidationTel}
                  className="full_width"
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box max_width">
                <div className="item_head">Email2</div>
                <Input
                  type="email"
                  value={customer?.mail_address2 || ''}
                  onChange={(e) => setState({ ...customer, mail_address2: e.target.value })}
                  validationList={[
                    ...ValidationLengthUnder254,
                    ...ValidationMailAddressEmptyOk,
                  ]}
                  className="large"
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box max_width">
                <div className="item_head">Email3</div>
                <Input
                  value={customer?.mail_address3 || ''}
                  type="email"
                  onChange={(e) => setState({ ...customer, mail_address3: e.target.value })}
                  validationList={[
                    ...ValidationLengthUnder254,
                    ...ValidationMailAddressEmptyOk,
                  ]}
                  className="large"
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">エリア</div>
                <div className="item_body item_area">
                  <Select
                    value={customer?.area}
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
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">営業担当</div>
                <Select
                  className="add_text_left"
                  label="店舗"
                  value={customer?.sales_shop || NaN}
                  defaultLabel="指定無し"
                  options={
                    storeList.map((v) => (
                      { text: v.name, value: v.id }
                    ))
                  }
                  onChange={(v) => setState({ ...customer, sales_shop: Number(v) })}
                />
                <Select
                  className="add_text_left"
                  label="担当者"
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
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">顧客見込みランク</div>
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
              <div className="item_box">
                <div className="item_head">顧客ランク</div>
                <div className="item_body item_customerRank">
                  <Select
                    value={customer?.rank || NaN}
                    defaultLabel="指定無し"
                    options={customerRankList.map((v) => ({
                      // TODO ID
                      text: v.name, value: v.customer_rank_koji_id,
                    }))}
                    onChange={(v) => setState({ ...customer, rank: Number(v) })}
                  />
                </div>
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">発生源</div>
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

            <div className="item_wrap tags_form">
              <div className="item_box">
                <div className="item_head">見込み部位</div>
                <div className="flex_wrap_box">
                  {customer?.expected_part_list?.data.map((v, i) => (
                    <div className="same_width_checkbox" key={`eTag${i}`}>
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
            </div>
            <div className="item_wrap tags_form">
              <div className="item_box">
                <div className="item_head">部位</div>
                <div className="flex_wrap_box">
                  {customer?.part_list?.data.map((v, i) => (
                    <div className="same_width_checkbox" key={`pTag${i}`}>
                      <RightLabelCheckbox
                        checked={v.flag}
                        label={v.label}
                        onChange={() => {
                          customer.part_list?.changeFlag(v.id);
                          setState({
                            ...customer, part_list: lodash.cloneDeep(customer.part_list),
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">LINE ID</div>
                <Input
                  value={customer?.line_id || ''}
                  onChange={(e) => setState({ ...customer, line_id: e.target.value })}
                  validationList={ValidationLineId}
                  className="full_width"
                />
                {mode === 'update'
                  && (
                  <CopyToClipboard text={customer?.line_id || ''}>
                    <IconButton
                      fontAwesomeClass="fas fa-copy"
                      className="sns"
                      size="sm"
                      color="white"
                      onClick={() => dispatch(DialogActions.pushMessage({
                        title: '',
                        message: ['コピーしました'],
                      }))}
                      disabled={!customer?.line_id}
                    />
                  </CopyToClipboard>
                  )}
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">Facebook ID</div>
                <Input
                  value={customer?.facebook_id || ''}
                  onChange={(e) => setState({ ...customer, facebook_id: e.target.value })}
                  validationList={ValidationFacebookId}
                  className="full_width"
                />
                {mode === 'update'
                  && (
                    <IconButton
                      fontAwesomeClass="fas fa-external-link-alt"
                      className="sns"
                      size="sm"
                      color="white"
                      onClick={() => openLink(`https://www.facebook.com/${customer?.facebook_id}`)}
                      disabled={!customer?.facebook_id}
                    />
                  )}
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">Twitter ID</div>
                <Input
                  value={customer?.twitter_id || ''}
                  onChange={(e) => setState({ ...customer, twitter_id: e.target.value })}
                  validationList={ValidationTwitterId}
                  className="full_width"
                />
                {mode === 'update'
                  && (
                    <IconButton
                      fontAwesomeClass="fas fa-external-link-alt"
                      className="sns"
                      size="sm"
                      color="white"
                      onClick={() => openLink(`https://twitter.com/${customer?.twitter_id}`)}
                      disabled={!customer?.twitter_id}
                    />
                  )}
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">Instagram ID</div>
                <Input
                  value={customer?.instagram_id || ''}
                  onChange={(e) => setState({ ...customer, instagram_id: e.target.value })}
                  validationList={ValidationInstagramId}
                  className="full_width"
                />
                {mode === 'update'
                  && (
                    <IconButton
                      fontAwesomeClass="fas fa-external-link-alt"
                      className="sns"
                      size="sm"
                      color="white"
                      onClick={() => openLink(`https://www.instagram.com/${customer?.instagram_id}`)}
                      disabled={!customer?.instagram_id}
                    />
                  )}
              </div>
            </div>
          </div>
          <div className="right_box">
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">建物分類</div>
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
              <div className="item_box">
                <div className="item_head">間取り</div>
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
              <div className="item_box">
                <div className="item_head">築年数</div>
                <Input
                  className="small"
                  value={customer?.building_age || 0}
                  type="number"
                  onChange={(e) => setState({ ...customer, building_age: Number(e.target.value) })}
                  validationList={ValidationNumberLengthUnder3}
                  maxLength={3}
                />
              </div>
            </div>

            <div className="item_wrap">
              <div className="item_box max_width">
                <div className="item_head">備考</div>
                <TextArea
                  className="large"
                  rows={5}
                  value={customer?.remarks || ''}
                  onChange={(e) => setState(
                    { ...customer, remarks: e.target.value },
                  )}
                  validationList={ValidationLengthUnder255}
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box max_width">
                <div className="item_head">社内メモ1</div>
                <TextArea
                  className="large"
                  rows={5}
                  value={customer?.memo1 || ''}
                  onChange={(e) => setState(
                    { ...customer, memo1: e.target.value },
                  )}
                  validationList={ValidationLengthUnder255}
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box max_width">
                <div className="item_head">社内メモ2</div>
                <TextArea
                  className="large"
                  rows={5}
                  value={customer?.memo2 || ''}
                  onChange={(e) => setState(
                    { ...customer, memo2: e.target.value },
                  )}
                  validationList={ValidationLengthUnder255}
                />
              </div>
            </div>
            <div className="item_wrap tags_form">
              <div className="item_box">
                <div className="item_head">マイカー種別</div>
                <div className="flex_wrap_box">
                  {customer?.my_car_type?.data.map((v, i) => (
                    v.id !== 13
                      ? (
                        <div className="same_width_checkbox" key={`mTag${i}`}>
                          <RightLabelCheckbox
                            checked={v.flag}
                            label={v.label}
                            onChange={() => {
                              customer.my_car_type?.changeFlag(v.id);
                              setState(
                                {
                                  ...customer,
                                  my_car_type:
                                    lodash.cloneDeep(customer.my_car_type),
                                },
                              );
                            }}
                          />
                        </div>
                      )
                      : (
                        <div className="single_column">
                          <RightLabelCheckbox
                            label={v.label}
                            checked={v.flag}
                            onChange={() => {
                              customer.my_car_type?.changeFlag(v.id);
                              setState(
                                {
                                  ...customer,
                                  my_car_type:
                                    lodash.cloneDeep(customer.my_car_type),
                                },
                              );
                            }}
                          />
                          <span>（&nbsp;</span>
                          <Input
                            className="other"
                            value={customer?.my_car_type_other}
                            type="text"
                            onChange={(e) => v.flag && setState(
                              { ...customer, my_car_type_other: e.target.value },
                            )}
                            validationList={ValidationLengthUnder20}
                          /><span>&nbsp;）</span>
                        </div>
                      )
                  ))}
                  {/* <div className="single_column">
                    <RightLabelCheckbox
                      label="その他"
                      checked={customer}
                      onChange={() => {
                        setOther(!other);
                      }}
                    />
                    <span>（&nbsp;</span>
                    <Input
                      className="other"
                      value={customer?.my_car_type_other}
                      type="text"
                      onChange={(e) => other && setState(
                        { ...customer, my_car_type_other: e.target.value },
                      )}
                      validationList={ValidationLengthUnder20}
                    /><span>&nbsp;）</span>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="item_wrap tags_form">
              <div className="item_box">
                <div className="item_head">関連タグ</div>
                <div className="flex_wrap_box">
                  {customer?.tag_list?.data.map((v, i) => (
                    <div
                      className="item_body item_checkbox same_width_checkbox"
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
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">紹介者</div>
                <Input
                  value={customer?.introducer}
                  onChange={(e) => setState({ ...customer, introducer: e.target.value })}
                  validationList={ValidationLengthUnder60}
                  className="full_width"
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">結婚記念日</div>
                <div className="wedding_anniversary">
                  <DatePicker
                    date={customer.wedding_anniversary || null}
                    errorPosBottom
                    onChange={(v) => setState(
                      { ...customer, wedding_anniversary: v },
                    )}
                    validationList={ValidationDatePicker}
                  />
                </div>
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box max_width">
                <div className="item_head">ご家族情報</div>
                <div className="segment_wrap">
                  <Segment>
                    <FamilyInfoList
                      key={`fam${famEditCount}`}
                      list={familyListModel.list}
                      callback={handleClickFamily}
                      callbackSort={familySort}
                    />
                  </Segment>
                  <div className="btn_box">
                    <Button
                      size="md"
                      color="secondary"
                      onClick={() => editFamily()}
                    >登録
                    </Button>
                    <Button
                      size="md"
                      color="secondary"
                      disabled={!familyId && familyId !== 0}
                      onClick={() => editFamily('edit')}
                    >編集
                    </Button>
                    <Button
                      size="md"
                      color="dark"
                      disabled={!familyId && familyId !== 0}
                      onClick={removeFamily}
                    >削除
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box max_width">
                <div className="item_head">ペット情報</div>
                <div className="segment_wrap">
                  <Segment><PetInfoList
                    key={`pet${petEditCount}`}
                    list={petListModel?.list || []}
                    callback={handleClickPet}
                    callbackSort={petSort}
                  />
                  </Segment>
                  <div className="btn_box">
                    <Button
                      size="md"
                      color="secondary"
                      onClick={() => editPet()}
                    >登録
                    </Button>
                    <Button
                      size="md"
                      color="secondary"
                      disabled={!petId && petId !== 0}
                      onClick={() => editPet('edit')}
                    >編集
                    </Button>
                    <Button
                      size="md"
                      color="dark"
                      disabled={!petId && petId !== 0}
                      onClick={removePet}
                    >削除
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </EditPC>
    )
  );
};
