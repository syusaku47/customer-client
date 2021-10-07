/* eslint-disable no-undef */
import React, { useCallback, useEffect, useState } from 'react';
import { isEqual, cloneDeep } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import * as lodash from 'lodash';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { State } from '../../../../../redux/root.reducer';
import { EditSP, EditType } from '../../../../dialogs/edit/edit.sp';
import { Button } from '../../../../ui/button/button';
import { RightLabelCheckbox } from '../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { TopLabelInputField } from '../../../../ui/input-field/top-label-input-field/top-label-input-field';
import { Input } from '../../../../ui/input/input';
import { Required } from '../../../../ui/required/required';
import './project-edit.sp.scss';
import { Project, ProjectEditState } from '../../../../../type/project/project.type';
import { ProjectCollection } from '../../../../../collection/project/project.collection';
import { ProjectActions } from '../../../../../redux/project/project.action';
import { prefectures } from '../../../../../collection/prefectures';
import { TagActions } from '../../../../../redux/tag/tag.action';
import { TagModel } from '../../../../../model/tag/tag';
import { ValidationLengthUnder60 } from '../../../../../model/validation/_validation-length-under-60';
import { Select } from '../../../../ui/select/select';
import { RegistrationAddressMapDialog } from '../../../../ui/map/registration-address-map-dialog/registration-address-map-dialog';
import { SearchBoxCustomerSP } from '../../customer/serch-box/customer-search-box.sp';
import {
  ValidationLengthUnder100,
  ValidationLengthUnder255,
  ValidationLengthUnder40,
  ValidationLengthUnder50,
} from '../../../../../model/validation/validation-length-under';
import { ValidationPostNum1 } from '../../../../../model/validation/validation-post-num1';
import { ValidationPostNum2 } from '../../../../../model/validation/validation-post-num2';
import { ValidationTel } from '../../../../../model/validation/validation-tel';
import { ProjectValidation } from '../../../../../model/validation/project/project.validation';
import { MapActions } from '../../../../../redux/map/map.action';
import { Customer } from '../../../../../type/customer/customer.type';
import { DateFormatter } from '../../../../../utilities/date-formatter';
import { MasterActions } from '../../../../../redux/master/master.action';
import { changeString } from '../../../../../utilities/change-string';
import { DatePicker } from '../../../../ui/date-picker/date-picker';
import { TextArea } from '../../../../ui/text-area/text-area';
import { ValidationDatePicker } from '../../../../../model/validation/validation-date-picker';

type Props = {
  mode: EditType,
  projectID?: number;
  customerData?: Customer;
  callback?: () => void;
}

export const ProjectEditSP = (props: Props) => {
  const {
    mode, projectID, customerData, callback,
  } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state:State) => state.project.sort);
  const partList = useSelector((state: State) => (state.tag.partList), isEqual);
  const {
    employeeList,
    originList,
    lostOrderList,
    storeList,
    projectRankList,
  } = useSelector((state: State) => (state.master), isEqual);

  /* State */
  const [projectInfo, setProjectInfo] = useState<Project | null>(null);
  const [project, setProject] = useState<ProjectEditState>(ProjectCollection.initialEditState);
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
      /* 保存API */
      if (ProjectValidation(project)) {
        dispatch(DialogActions.pushMessage({
          title: '案件情報登録',
          message: ['未入力／入力不備項目があります'],
          callback: () => setTouch(true),
        }));
        return;
      }
      const prefe = prefectures.find((v) => v.value === project.field_prefecture)?.label;
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
                construction_date: project.construction_date
                  ? DateFormatter.date2str(project.construction_date) : undefined,
                completion_date: project.completion_date
                  ? DateFormatter.date2str(project.completion_date) : undefined,
                complete_date: project.complete_date
                  ? DateFormatter.date2str(project.complete_date) : undefined,
                failure_date: project.failure_date
                  ? DateFormatter.date2str(project.failure_date) : undefined,
                cancel_date: project.cancel_date
                  ? DateFormatter.date2str(project.cancel_date) : undefined,
                completion_execution_date: project.completion_execution_date
                  ? DateFormatter.date2str(project.completion_execution_date) : undefined,
                construction_execution_date: project.construction_execution_date
                  ? DateFormatter.date2str(project.construction_execution_date) : undefined,
                lat: String(data.position.lat),
                lng: String(data.position.lng),
              },
              id: projectID,
            },
            onSuccess: () => {
              if (callback) {
                callback();
                return;
              }
              if (mode === 'add') {
                dispatch(ProjectActions.api.project.getList({
                  construction_parts: sortState?.construction_parts?.getSendData(),
                  construction_status: sortState?.construction_status?.getSendData(),
                }));
              }
            },
            onError: () => {
              setTouch(true);
            },
          }));
        },
      }));
    },
    [project, sortState],
  );

  const handleClickRegistrationMap = useCallback(
    () => {
      dispatch(DialogActions.push({
        title: '住所を登録したい場所をクリックしてください',
        element: <RegistrationAddressMapDialog callback={(address) => {
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
        title: '顧客検索',
        element: <SearchBoxCustomerSP callback={(data) => {
          setState({
            ...project,
            customer_id: data.id,
            sales_shop: Number(data.sales_shop) || NaN,
            sales_contact: Number(data.sales_contact) || NaN,
            field_name: `${data.name ? `${data.name}様邸` : ''}`,
            post_no1: data.post_no.slice(0, 3),
            post_no2: data.post_no.slice(3, 7),
            field_prefecture: Number(data.prefecture) || NaN,
            source: Number(data.source) || NaN,
            field_city: data.city || '',
            field_address: data.address || '',
            field_building_name: data.building_name || '',
            field_tel_no: data.tel_no || '',
            field_fax_no: data.fax_no || '',
          });
          setCustomerName(data.name);
          setCustomerAddress(`${data.prefecture_name}${data.address}${data.building_name || ''}`);
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
            field_prefecture: Number(address.prefcode),
            field_city: address.ja.address1,
            field_address: address.ja.address2,
            field_building_name: '',
          });
        },
      }));
    },
    [project],
  );

  /* Effect */
  useEffect(() => {
    dispatch(TagActions.api.part.getList());
    dispatch(MasterActions.api.origin.getList({}));
    dispatch(MasterActions.api.store.getList({}));
    dispatch(MasterActions.api.employee.getList({}));
    dispatch(MasterActions.api.lostOrder.getList({}));
    dispatch(MasterActions.api.projectRank.getList({}));
  }, []);

  /* TODO 新規登録を開く際にエラーが発生 */
  useEffect(() => {
    if (mode === 'update'
      && projectID
      && partList.length
    ) {
      dispatch(ProjectActions.api.project.get({
        param: { id: projectID },
        callback: (data) => {
          setProjectInfo(cloneDeep(data));
          setCustomerName(data.customer_name);
          setCustomerAddress(data.customer_place);
          setState({
            ...data,
            post_no1: changeString(data.post_no, '').slice(0, 3),
            post_no2: changeString(data.post_no, '').slice(3, 7),
            construction_parts: new TagModel(
              partList,
              data.construction_parts,
            ),
            construction_date: data.construction_date
              ? new Date(data.construction_date) : null,
            completion_date: data.completion_date
              ? new Date(data.completion_date) : null,
            complete_date: data.complete_date
              ? new Date(data.complete_date) : null,
            failure_date: data.failure_date
              ? new Date(data.failure_date) : null,
            cancel_date: data.cancel_date
              ? new Date(data.cancel_date) : null,
            construction_execution_date: data.construction_execution_date
              ? new Date(data.construction_execution_date) : null,
            completion_execution_date: data.completion_execution_date
              ? new Date(data.completion_execution_date) : null,
            sales_contact: data.project_representative,
          });
        },
      }));
    }
  }, [projectID, partList]);

  useEffect(() => {
    if (customerData) {
      setState({
        ...project,
        customer_id: customerData.id,
        construction_parts: lodash.cloneDeep(new TagModel(partList)),
        sales_shop: Number(customerData.sales_shop) || NaN,
        source: customerData.source || NaN,
        sales_contact: Number(customerData.sales_contact) || NaN,
        field_name: `${customerData.name ? `${customerData.name}様邸` : ''}`,
        post_no1: customerData.post_no.slice(0, 3),
        post_no2: customerData.post_no.slice(3, 7),
        field_prefecture: Number(customerData.prefecture) || NaN,
        field_city: customerData.city || '',
        field_address: customerData.address || '',
        field_building_name: customerData.building_name || '',
        field_tel_no: customerData.tel_no || '',
        field_fax_no: customerData.fax_no || '',
      });
      setCustomerName(customerData.name || '');
      setCustomerAddress(customerData.address || '');
      return;
    }
    if (mode === 'add' && !customerData && partList.length) {
      dispatch(DialogActions.push({
        title: '顧客検索',
        onCloseClick: () => dispatch(DialogActions.clear()),
        element: <SearchBoxCustomerSP callback={(data) => {
          setState({
            ...project,
            customer_id: data.id,
            construction_parts: lodash.cloneDeep(new TagModel(partList)),
            sales_shop: Number(data.sales_shop) || NaN,
            sales_contact: Number(data.sales_contact) || NaN,
            field_name: `${data.name ? `${data.name}様邸` : ''}`,
            post_no1: data.post_no.slice(0, 3),
            source: Number(data.source) || NaN,
            post_no2: data.post_no.slice(3, 7),
            field_prefecture: Number(data.prefecture) || NaN,
            field_city: data.city || '',
            field_address: data.address || '',
            field_building_name: data.building_name || '',
            field_tel_no: data.tel_no || '',
            field_fax_no: data.fax_no || '',
          });
          setCustomerName(data.name);
          setCustomerAddress(`${data.prefecture_name || ''}${data.address || ''}${data.building_name || ''}`);
        }}
        />,
      }));
    }
  }, [partList]);

  return (
    mode && (
    <EditSP mode={mode} callback={handleClickPost}>
      {/* edit_sp_body_inner は各画面の共通用 */}
      <div className="edit_sp_body_inner projectEditSP">
        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">顧客ID<Required /></div>
            <div className="item_body item_customerID">
              <Input
                type="number"
                value={project.customer_id}
                disabled
                require
                touch={touch}
              />
              <Button size="md" color="secondary" onClick={handleClickCustomerSearch}>顧客検索</Button>
            </div>
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="顧客名"
              value={customerName}
              className="full_width"
              disabled
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="顧客住所"
              value={customerAddress}
              className="full_width"
              disabled
            />
          </div>
        </div>

        <div className="category_wrap">
          <div className="item_wrap">
            <TopLabelInputField
              label="案件名"
              value={project.name}
              onChange={(e) => { setState({ ...project, name: e.target.value }); }}
              className="full_width"
              require
              touch={touch}
              validationList={ValidationLengthUnder40}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">発生源</div>
            <div className="item_body item_select full_width">
              <Select
                value={project.source}
                onChange={(v) => setState({ ...project, source: Number(v) })}
                defaultLabel="指定なし"
                options={[
                  ...originList.map((v) => (
                    { text: v.name, value: v.id }
                  )),
                ]}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_label">案件ランク</div>
            <div className="item_body item_select full_width">
              <Select
                value={project.project_rank}
                onChange={(v) => setState({ ...project, project_rank: Number(v) })}
                defaultLabel="指定なし"
                options={[
                  ...projectRankList.map((v) => (
                    { text: v.name, value: v.project_rank_id }
                  )),
                ]}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_label">案件担当 店舗</div>
            <div className="item_select">
              <Select
                value={project.sales_shop}
                onChange={(v) => setState({ ...project, sales_shop: Number(v) })}
                defaultLabel="指定なし"
                options={[
                  ...storeList.map((v) => (
                    { text: v.name, value: v.id }
                  )),
                ]}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_label">案件担当 担当者<Required /></div>
            <div className="item_select">
              <Select
                value={project.sales_contact}
                onChange={(v) => setState({ ...project, sales_contact: Number(v) })}
                defaultLabel="指定なし"
                options={[
                  ...employeeList.map((v) => (
                    { text: v.name, value: v.id }
                  )),
                ]}
                require
                touch={touch}
              />
            </div>
          </div>
        </div>

        <div className="category_wrap">
          <div className="item_wrap ">
            <div className="item_label">
              現場名称
              <Button
                size="md"
                color="secondary"
                onClick={handleClickRegistrationMap}
              >
                地図から登録
              </Button>
            </div>
          </div>
          <div className="item_body">
            <Input
              value={project.field_name}
              onChange={(e) => { setState({ ...project, field_name: e.target.value }); }}
              validationList={ValidationLengthUnder60}
              className="full_width"
              require
              touch={touch}
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">郵便番号<Required /></div>
            <div className="item_body item_postal">
              <div>〒&nbsp;
                <Input
                  type="number"
                  value={project.post_no1}
                  onChange={(e) => { setState({ ...project, post_no1: e.target.value }); }}
                  validationList={ValidationPostNum1}
                  require
                  touch={touch}
                />
              </div>
              <div className="hyphen">-</div>
              <div>
                <Input
                  type="number"
                  value={project.post_no2}
                  onChange={(e) => { setState({ ...project, post_no2: e.target.value }); }}
                  validationList={ValidationPostNum2}
                  require
                  touch={touch}
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
            <div className="item_body item_select">
              <Select
                value={project.field_prefecture}
                defaultLabel="-"
                onChange={(v) => setState({ ...project, field_prefecture: Number(v) })}
                options={
                  prefectures.map((v) => ({
                    text: v.label, value: v.value,
                  }))
                }
                require
                touch={touch}
              />
            </div>
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="市区町村"
              value={project.field_city}
              onChange={(e) => { setState({ ...project, field_city: e.target.value }); }}
              validationList={ValidationLengthUnder50}
              className="full_width"
              require
              touch={touch}
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="地名・番地"
              value={project.field_address}
              onChange={(e) => { setState({ ...project, field_address: e.target.value }); }}
              validationList={ValidationLengthUnder50}
              className="full_width"
              require
              touch={touch}
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="建物名"
              value={project.field_building_name}
              onChange={(e) => { setState({ ...project, field_building_name: e.target.value }); }}
              validationList={ValidationLengthUnder100}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="現場電話"
              type="tel"
              value={project.field_tel_no}
              onChange={(e) => { setState({ ...project, field_tel_no: e.target.value }); }}
              validationList={ValidationTel}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="現場FAX"
              type="tel"
              value={project.field_fax_no}
              onChange={(e) => { setState({ ...project, field_fax_no: e.target.value }); }}
              validationList={ValidationTel}
              className="full_width"
            />
          </div>
        </div>

        <div className="category_wrap">
          <div className="item_wrap tags_form">
            <div className="item_label">工事部位</div>
            <div className="item_body item_checkbox">
              {project?.construction_parts?.data.map((v, i) => (
                <div key={`pTag${i}`}>
                  <RightLabelCheckbox
                    checked={v.flag}
                    label={v.label}
                    onChange={() => {
                      project.construction_parts?.changeFlag(v.id);
                      setState(
                        {
                          ...project,
                          construction_parts: lodash.cloneDeep(project.construction_parts),
                        },
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TODO fukada コールバックやバリデーションの調整、着工式・完工式のプロパティ追加お願いします。 */}
        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">着工日※TODO削除</div>
            <div className="item_body">
              <DatePicker
                date={project.construction_date || null}
                onChange={(v) => setState(
                  { ...project, construction_date: v },
                )}
                disabled={projectInfo?.order_flag}
                validationList={ValidationDatePicker}
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">完工日※TODO削除</div>
            <div className="item_body">
              <DatePicker
                date={project.completion_date || null}
                onChange={(v) => setState(
                  { ...project, completion_date: v },
                )}
                disabled={projectInfo?.order_flag}
                validationList={ValidationDatePicker}
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">着工式</div>
            <div className="item_body">
              <DatePicker
                date={project.construction_execution_date || null}
                onChange={(v) => setState(
                  { ...project, construction_execution_date: v },
                )}
                disabled={projectInfo?.order_flag}
                validationList={ValidationDatePicker}
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">完工式</div>
            <div className="item_body">
              <DatePicker
                date={project.completion_execution_date || null}
                onChange={(v) => setState(
                  { ...project, completion_execution_date: v },
                )}
                disabled={projectInfo?.order_flag}
                validationList={ValidationDatePicker}
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">完了日</div>
            <div className="item_body">
              <DatePicker
                date={project.complete_date || null}
                onChange={(v) => setState(
                  { ...project, complete_date: v },
                )}
                validationList={ValidationDatePicker}
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">失注日</div>
            <div className="item_body">
              <DatePicker
                date={project.failure_date || null}
                onChange={(v) => setState(
                  { ...project, failure_date: v },
                )}
                validationList={ValidationDatePicker}
              />
            </div>
          </div>

          {/* TODO fukada project.failure_cause_name 参照できなくて project.failure_causeにしています。
          詳細情報と値が異なっているので、確認お願いします。 */}
          <div className="item_wrap">
            <div className="item_label">失注理由</div>
            <div className="item_body">
              <Select
                value={project.failure_cause || NaN}
                onChange={(v) => setState({ ...project, failure_cause: Number(v) })}
                defaultLabel="指定無し"
                options={
                    lostOrderList.map((v) => (
                      { text: v.lost_reason, value: v.id }
                    ))
                  }
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">備考</div>
            <div className="item_body">
              <TextArea
                rows={7}
                value={project?.failure_remarks || ''}
                className="large"
                onChange={(e) => {
                  setState(
                    { ...project, failure_remarks: e.target.value },
                  );
                }}
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">キャンセル日</div>
            <div className="item_body">
              <DatePicker
                date={project.cancel_date || null}
                onChange={(v) => setState(
                  { ...project, cancel_date: v },
                )}
                validationList={ValidationDatePicker}
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">キャンセル理由</div>
            <div className="item_body">
              <TextArea
                rows={7}
                value={project?.cancel_reason}
                onChange={(e) => { setState({ ...project, cancel_reason: e.target.value }); }}
                validationList={ValidationLengthUnder255}
              />
            </div>
          </div>

        </div>
      </div>
    </EditSP>
    )
  );
};
