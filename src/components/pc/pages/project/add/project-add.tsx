import { cloneDeep, isEqual } from 'lodash';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { prefectures } from '../../../../../collection/prefectures';
import { ProjectCollection } from '../../../../../collection/project/project.collection';
import { TagModel } from '../../../../../model/tag/tag';
import { ValidationLengthUnder60 } from '../../../../../model/validation/_validation-length-under-60';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { ProjectActions } from '../../../../../redux/project/project.action';
import { State } from '../../../../../redux/root.reducer';
import { TagActions } from '../../../../../redux/tag/tag.action';
import { ProjectEditState } from '../../../../../type/project/project.type';
import { Button } from '../../../../ui/button/button';
import { RightLabelCheckbox } from '../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { RegistrationAddressMapDialogPC } from '../../../../ui/map/registration-address-map-dialog/pc/registration-address-map-dialog.pc';
import { Required } from '../../../../ui/required/required';
import { Select } from '../../../../ui/select/select';
import { CustomerSearch } from '../../../layout/search-box/customer/customer-search/customer-search';
import { useDidMount } from '../../../../../hooks/life-cycle';
import { LeftLabelInputField } from '../../../../ui/input-field/left-label-input-field/left-label-input-field';
import { MapActions } from '../../../../../redux/map/map.action';
import { Customer, CustomerListType } from '../../../../../type/customer/customer.type';
import { LeftIconButton } from '../../../../ui/button/left-icon-button/left-icon-button';
import { ValidationPostNum1 } from '../../../../../model/validation/validation-post-num1';
import { ValidationPostNum2 } from '../../../../../model/validation/validation-post-num2';
import { ValidationLengthUnder100, ValidationLengthUnder40, ValidationLengthUnder50 } from '../../../../../model/validation/validation-length-under';
import { ValidationTel } from '../../../../../model/validation/validation-tel';
import { Input } from '../../../../ui/input/input';
import { ProjectValidation } from '../../../../../model/validation/project/project.validation';
import { MasterActions } from '../../../../../redux/master/master.action';
import { EditPC } from '../../../../dialogs/edit/edit.pc';

type Props = {
  customerData?: Customer | CustomerListType;
  callback?: () => void;
}

export const ProjectAdd = (props: Props) => {
  const { customerData, callback } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => state.project.sort, isEqual);
  const partList = useSelector((state: State) => (state.tag.partList), isEqual);
  const {
    employeeList,
    originList,
    storeList,
    projectRankList,
  } = useSelector((state: State) => (state.master), isEqual);

  /* State */
  const [project, setProject] = useState<ProjectEditState>(ProjectCollection.initialEditState);
  const [customerID, setCustomerID] = useState(NaN);
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [touch, setTouch] = useState(false);

  /* Callback */
  const setState = useCallback(
    (v: ProjectEditState) => {
      setProject(v);
    }, [setProject],
  );

  const handleClickPost = useCallback(
    () => {
      if (ProjectValidation(project)) {
        dispatch(DialogActions.pushMessage({
          title: '??????????????????',
          message: ['?????????????????????????????????????????????'],
          callback: () => setTouch(true),
        }));
        return;
      }
      /* ??????API */
      const prefe = prefectures[project.field_prefecture].label;
      dispatch(MapActions.api.geocoder({
        isRegist: true,
        param: {
          param: {
            address: `${prefe || ''}${project.field_city}${project.field_address}`,
          },
          noMessage: true,
        },
        callback: (data) => {
          dispatch(ProjectActions.api.project.post({
            param: {
              data: {
                ...project,
                field_post_no: `${project.post_no1}${project.post_no2}`,
                construction_parts: project.construction_parts?.getSendData(),
                construction_date: undefined,
                completion_date: undefined,
                complete_date: undefined,
                failure_date: undefined,
                cancel_date: undefined,
                completion_execution_date: undefined,
                construction_execution_date: undefined,
                lat: String(data.position.lat),
                lng: String(data.position.lng),
              },
            },
            onSuccess: () => {
              if (callback) {
                callback();
              }
            },
            onError: () => {
              setTouch(true);
            },
          }));
        },
      }));
    },
    [project, sortState, callback],
  );

  const handleClickRegistrationMap = useCallback(
    () => {
      dispatch(DialogActions.push({
        title: '???????????????????????????????????????????????????????????????',
        className: 'max_height_dialog map_dialog',
        element: <RegistrationAddressMapDialogPC callback={(address) => {
          if (!address) return;
          const { components } = address;
          setState({
            ...project,
            post_no1: components.postal1,
            post_no2: components.postal2,
            field_prefecture: components.prefecture,
            field_city: components.city,
            field_address: components.address,
            field_building_name: components.bill,
          });
        }}
        />,
      }));
    }, [project],
  );

  const handleClickCustomerSearch = useCallback(
    () => {
      dispatch(DialogActions.push({
        title: '????????????',
        className: 'max_height_dialog max_width_dialog search_dialog',
        onCloseClick: () => dispatch(DialogActions.clear()),
        element: <CustomerSearch callback={(data) => {
          setProject({
            ...project,
            customer_id: data.id,
            sales_shop: Number(data.sales_shop) || NaN,
            sales_contact: Number(data.sales_contact) || NaN,
            field_name: `${data.name ? `${data.name}??????` : ''}`,
            post_no1: data.post_no.slice(0, 3),
            post_no2: data.post_no.slice(3, 7),
            source: Number(data.source) || NaN,
            field_prefecture: Number(data.prefecture) || NaN,
            field_city: data.city || '',
            field_address: data.address || '',
            field_building_name: data.building_name || '',
            field_tel_no: data.tel_no || '',
            field_fax_no: data.fax_no || '',
          });
          setCustomerID(data.id);
          setCustomerName(data.name || '');
          setCustomerAddress(
            `${data.prefecture_name || NaN}${data.address || ''}${data.building_name || ''}`,
          );
        }}
        />,
      }));
    }, [project],
  );

  const handleClickSearchAddress = useCallback(
    () => {
      dispatch(MapActions.api.addressSearch({
        param: {
          zipcode1: String(project.post_no1),
          zipcode2: String(project.post_no2),
        },
        callback: (address) => {
          setState({
            ...project,
            field_prefecture: Number(address.prefcode) || NaN,
            field_city: address.ja.address1 || '',
            field_address: address.ja.address2 || '',
          });
        },
      }));
    },
    [project],
  );

  /* Effect */
  // ?????????
  useDidMount(() => {
    dispatch(TagActions.api.part.getList());
    dispatch(MasterActions.api.origin.getList({}));
    dispatch(MasterActions.api.store.getList({}));
    dispatch(MasterActions.api.employee.getList({}));
    dispatch(MasterActions.api.projectRank.getList({}));
  });

  useDidMount(() => {
    if (customerData) {
      setProject({
        ...project,
        customer_id: customerData.id,
        construction_parts: cloneDeep(new TagModel(partList)),
        sales_shop: Number(customerData.sales_shop) || NaN,
        sales_contact: Number(customerData.sales_contact) || NaN,
        field_name: `${customerData.name ? `${customerData.name}??????` : ''}`,
        source: Number(customerData.source) || NaN,
        post_no1: customerData.post_no.slice(0, 3),
        post_no2: customerData.post_no.slice(3, 7),
        field_prefecture: Number(customerData.prefecture) || NaN,
        field_city: customerData.city || '',
        field_address: customerData.address || '',
        field_building_name: customerData.building_name || '',
        field_tel_no: customerData.tel_no || '',
        field_fax_no: customerData.fax_no || '',
      });
      setCustomerID(customerData.id);
      setCustomerName(customerData.name);
      const place = `???${customerData.post_no.slice(0, 3)}-${customerData.post_no.slice(3, 7)} ${customerData.prefecture_name}${customerData.city}${customerData.address}${customerData.building_name || ''}`;
      setCustomerAddress(place);
      return;
    }
    dispatch(DialogActions.push({
      title: '????????????',
      className: 'max_height_dialog max_width_dialog search_dialog',
      onCloseClick: () => dispatch(DialogActions.clear()),
      element: <CustomerSearch callback={(data) => {
        setProject({
          ...project,
          customer_id: data.id,
          construction_parts: cloneDeep(new TagModel(partList)),
          source: Number(data.source) || NaN,
          sales_shop: Number(data.sales_shop) || NaN,
          sales_contact: Number(data.sales_contact) || NaN,
          field_name: `${data.name ? `${data.name}??????` : ''}`,
          post_no1: data.post_no.slice(0, 3),
          post_no2: data.post_no.slice(3, 7),
          field_prefecture: Number(data.prefecture) || NaN,
          field_city: data.city || '',
          field_address: data.address || '',
          field_building_name: data.building_name || '',
          field_tel_no: data.tel_no || '',
          field_fax_no: data.fax_no || '',
        });
        setCustomerID(data.id);
        setCustomerName(data.name);
        setCustomerAddress(
          `${data.prefecture_name || ''}${data.address || ''}${data.building_name || ''}`,
        );
      }}
      />,
    }));
  });

  return (
    <EditPC mode="dialog" callback={handleClickPost}>
      <div className="edit_pc_body_inner edit_project">
        <div className="">
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">??????ID<Required /></div>
              <Input
                type="number"
                value={customerID}
                disabled
                require
                touch={touch}
              />
            </div>
            <div className="item_box">
              <div className="item_head">?????????</div>
              <Input
                value={customerName}
                className="full_width"
                disabled
              />
            </div>
            <div className="item_box">
              <LeftIconButton
                label="????????????"
                fontAwesomeClass="fas fa-search"
                className="btn_search for_detail"
                size="sm"
                color="secondary"
                onClick={handleClickCustomerSearch}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box large">
              <div className="item_head">????????????</div>
              <Input
                value={customerAddress}
                className="large"
                disabled
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box large">
              <div className="item_head">?????????????????????<Required /></div>
              <Input
                value={project.name}
                onChange={(e) => { setState({ ...project, name: e.target.value }); }}
                className="large"
                require
                touch={touch}
                validationList={ValidationLengthUnder40}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">???????????????</div>
              <Select
                value={project.project_rank}
                onChange={(v) => setState({ ...project, project_rank: Number(v) })}
                defaultLabel="????????????"
                options={[
                  ...projectRankList.map((v) => (
                    { text: v.name, value: v.project_rank_id }
                  )),
                ]}
              />
            </div>
            <div className="item_box">
              <div className="item_head">????????????</div>
              <Select
                className="add_text_left"
                label="??????"
                value={project.sales_shop}
                onChange={(v) => setState({ ...project, sales_shop: Number(v) })}
                defaultLabel="????????????"
                options={[
                  ...storeList.map((v) => (
                    { text: v.name, value: v.id }
                  )),
                ]}
              />
              <Select
                className="add_text_left"
                label="?????????"
                value={project.sales_contact}
                onChange={(v) => setState({ ...project, sales_contact: Number(v) })}
                defaultLabel="????????????"
                options={[
                  ...employeeList.map((v) => (
                    { text: v.name, value: v.id }
                  )),
                ]}
                requireLabel
                noRequireLabel
                require
                touch={touch}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">?????????</div>
              <Select
                value={project.source}
                onChange={(v) => setState({ ...project, source: Number(v) })}
                defaultLabel="????????????"
                options={[
                  ...originList.map((v) => (
                    { text: v.name, value: v.id }
                  )),
                ]}
              />
            </div>
          </div>
          <div className="frame">
            <div className="item_wrap">
              <div className="item_box large">
                <div className="item_head">????????????</div>
                <Input
                  value={project.field_name}
                  onChange={(e) => { setState({ ...project, field_name: e.target.value }); }}
                  validationList={ValidationLengthUnder60}
                  className="large"
                  require
                  touch={touch}
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">????????????<Required /></div>
                <Input
                  className="postal_code_1"
                  type="number"
                  value={project.post_no1}
                  onChange={(e) => { setState({ ...project, post_no1: e.target.value }); }}
                  validationList={ValidationPostNum1}
                  maxLength={3}
                  require
                  touch={touch}
                />
                <LeftLabelInputField
                  className="postal_code_2"
                  label="-"
                  type="number"
                  value={project.post_no2}
                  onChange={(e) => { setState({ ...project, post_no2: e.target.value }); }}
                  validationList={ValidationPostNum2}
                  maxLength={4}
                  require
                  noRequireLabel
                  touch={touch}
                />
                <div className="item_map">
                  <Button
                    size="sm"
                    color="secondary"
                    className="ml_10"
                    onClick={handleClickSearchAddress}
                  >
                    ????????????
                  </Button>
                </div>
                <div className="item_map">
                  <Button
                    size="sm"
                    color="secondary"
                    className="ml_10"
                    onClick={handleClickRegistrationMap}
                  >
                    ??????????????????
                  </Button>
                </div>
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box max_width">
                <div className="item_head">??????</div>
                <div className="item_adress">
                  <Select
                    className="add_text_left"
                    label="????????????"
                    value={project.field_prefecture}
                    onChange={(v) => setState({ ...project, field_prefecture: Number(v) })}
                    options={prefectures.map((v) => ({
                      text: v.label, value: v.value,
                    }))}
                    defaultLabel="????????????"
                    require
                    touch={touch}
                  />
                  <LeftLabelInputField
                    label="????????????"
                    value={project.field_city}
                    onChange={(e) => { setState({ ...project, field_city: e.target.value }); }}
                    validationList={ValidationLengthUnder50}
                    className="large"
                    require
                    touch={touch}
                  />
                  <LeftLabelInputField
                    label="???????????????"
                    value={project.field_address}
                    onChange={(e) => { setState({ ...project, field_address: e.target.value }); }}
                    validationList={ValidationLengthUnder50}
                    className="large"
                    require
                    touch={touch}
                  />
                  <LeftLabelInputField
                    label="?????????"
                    value={project.field_building_name}
                    onChange={(e) => {
                      setState({ ...project, field_building_name: e.target.value });
                    }}
                    validationList={ValidationLengthUnder100}
                    className="large"
                  />
                </div>
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">????????????</div>
                <Input
                  value={project.field_tel_no}
                  onChange={(e) => { setState({ ...project, field_tel_no: e.target.value }); }}
                  validationList={ValidationTel}
                  className="full_width"
                  type="tel"
                />
              </div>
              <div className="item_box">
                <div className="item_head">??????FAX</div>
                <Input
                  value={project.field_fax_no}
                  onChange={(e) => { setState({ ...project, field_fax_no: e.target.value }); }}
                  validationList={ValidationTel}
                  className="full_width"
                  type="tel"
                />
              </div>
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">????????????</div>
              <div className="flex_wrap_box">
                {project?.construction_parts?.data.map((v, i) => (
                  <div
                    className="same_width_checkbox"
                    key={`pTag${i}`}
                  >
                    <RightLabelCheckbox
                      checked={v.flag}
                      label={v.label}
                      onChange={() => {
                        project.construction_parts?.changeFlag(v.id);
                        setState(
                          {
                            ...project,
                            construction_parts: cloneDeep(project.construction_parts),
                          },
                        );
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </EditPC>
  );
};
