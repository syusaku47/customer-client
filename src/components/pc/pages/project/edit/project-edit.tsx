/* eslint-disable no-undef */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep, isEqual } from 'lodash';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { State } from '../../../../../redux/root.reducer';
import { EditType } from '../../../../dialogs/edit/edit.sp';
import { Button } from '../../../../ui/button/button';
import { RightLabelCheckbox } from '../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { Input } from '../../../../ui/input/input';
import { Required } from '../../../../ui/required/required';
import { prefectures } from '../../../../../collection/prefectures';
import { TagActions } from '../../../../../redux/tag/tag.action';
import { TagModel } from '../../../../../model/tag/tag';
import { Select } from '../../../../ui/select/select';
import { RegistrationAddressMapDialog } from '../../../../ui/map/registration-address-map-dialog/registration-address-map-dialog';
import { LeftLabelInputField } from '../../../../ui/input-field/left-label-input-field/left-label-input-field';
import { ProjectActions } from '../../../../../redux/project/project.action';
import { ProjectCollection } from '../../../../../collection/project/project.collection';
import { ProjectEditState, Project } from '../../../../../type/project/project.type';
import { DatePicker } from '../../../../ui/date-picker/date-picker';
// import { Table } from '../../../../ui/table/table';
import { dummy, ProjectEditModel } from './project-edit.model';
import { EditPC } from '../../../../dialogs/edit/edit.pc';
import { DateFormatter } from '../../../../../utilities/date-formatter';
import { TextArea } from '../../../../ui/text-area/text-area';
import { MapActions } from '../../../../../redux/map/map.action';
import { CustomerSearch } from '../../../layout/search-box/customer/customer-search/customer-search';
import {
  ValidationLengthUnder100,
  ValidationLengthUnder255,
  ValidationLengthUnder40,
  ValidationLengthUnder50,
  ValidationLengthUnder60,
  ValidationPostNum1,
  ValidationPostNum2,
  ValidationTel,
} from '../../../../../model/validation';
import { ProjectValidation } from '../../../../../model/validation/project/project.validation';
import { MasterActions } from '../../../../../redux/master/master.action';
import { ValidationDatePicker } from '../../../../../model/validation/validation-date-picker';
import { OrderPC } from '../../order/order.pc';

type Props = {
  mode: EditType,
  projectID?: number,
}

export const ProjectEdit = (props: Props) => {
  const {
    mode, projectID,
  } = props;

  /* Hooks */
  const sortState = useSelector((state:State) => state.project.sort);
  const dispatch = useDispatch();
  const partList = useSelector((state: State) => (state.tag.partList), isEqual);
  const {
    originList,
    employeeList,
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
  const [postNoErrorMessage, setPostNoErrorMessage] = useState<string[]>([]);
  const [table, setTable] = useState<ProjectEditModel>(new ProjectEditModel(dummy()));

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
          title: '案件情報登録',
          message: ['未入力／入力不備項目があります'],
          callback: () => setTouch(true),
        }));
        return;
      }
      /* 保存API */
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
                construction_execution_date: project.construction_execution_date
                  ? DateFormatter.date2str(project.construction_execution_date) : undefined,
                completion_execution_date: project.completion_execution_date
                  ? DateFormatter.date2str(project.completion_execution_date) : undefined,
                lat: String(data.position.lat),
                lng: String(data.position.lng),
              },
              id: projectID,
            },
            onError: () => {
              setTouch(true);
            },
          }));
        },
      }));
    },
    [project, projectID, sortState],
  );

  const handleClickRegistrationMap = useCallback(
    () => {
      dispatch(DialogActions.push({
        title: '住所を登録したい場所をクリックしてください',
        className: 'max_height_dialog map_dialog',
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
        className: 'max_height_dialog max_width_dialog search_dialog',
        element: <CustomerSearch callback={(data) => {
          setState({
            ...project,
            customer_id: data.id,
            sales_shop: Number(data.sales_shop) || NaN,
            sales_contact: Number(data.sales_contact) || NaN,
            field_name: `${data.name ? `${data.name}様邸` : ''}`,
            source: Number(data.source) || NaN,
            post_no1: data.post_no.slice(0, 3),
            post_no2: data.post_no.slice(3, 7),
            field_prefecture: Number(data.prefecture) || NaN,
            field_city: data.city || '',
            field_address: data.address || '',
            field_building_name: data.building_name || '',
            field_tel_no: data.tel_no || '',
            field_fax_no: data.fax_no || '',
          });
          setCustomerName(data.name);
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
            field_prefecture: Number(address.prefcode),
            field_city: address.ja.address1,
            field_address: address.ja.address2,
          });
        },
      }));
    },
    [project],
  );

  const handleClickOrder = useCallback(() => {
    if (!projectInfo) return;
    dispatch(DialogActions.push({
      title: '受注登録',
      className: 'max_height_dialog max_width_dialog order_dialog',
      element: <OrderPC projectData={projectInfo} />,
    }));
  }, [projectInfo]);

  /* Effect */
  useEffect(() => {
    dispatch(TagActions.api.part.getList());
    dispatch(MasterActions.api.origin.getList({}));
    dispatch(MasterActions.api.store.getList({}));
    dispatch(MasterActions.api.employee.getList({}));
    dispatch(MasterActions.api.lostOrder.getList({}));
    dispatch(MasterActions.api.projectRank.getList({}));
  }, []);

  useEffect(() => {
    setTable(table);
  }, [table]);

  useEffect(() => {
    if (mode === 'update'
      && projectID
    ) {
      dispatch(ProjectActions.api.project.get({
        param: { id: projectID },
        callback: (data) => {
          setProjectInfo(cloneDeep(data));
          dispatch(ProjectActions.setProject(data));
          setCustomerName(data.customer_name || '');
          setCustomerAddress(data.customer_place || '');
          setState({
            ...data,
            post_no1: data.field_post_no.slice(0, 3),
            post_no2: data.field_post_no.slice(3, 7),
            construction_parts: new TagModel(partList, data.construction_parts),
            construction_date: data.construction_date ? new Date(data.construction_date) : null,
            completion_date: data.completion_date ? new Date(data.completion_date) : null,
            complete_date: data.complete_date ? new Date(data.complete_date) : null,
            failure_date: data.failure_date ? new Date(data.failure_date) : null,
            cancel_date: data.cancel_date ? new Date(data.cancel_date) : null,
            construction_execution_date:
              data.construction_execution_date ? new Date(data.construction_execution_date) : null,
            completion_execution_date:
            data.completion_execution_date ? new Date(data.completion_execution_date) : null,
            sales_contact: data.project_representative,
          });
        },
      }));
    }
  }, [projectID, partList]);

  return (
    mode && (
      <EditPC
        buttonArea={(
          <>
            <Button size="md" color="primary" onClick={handleClickPost}>
              更新
            </Button>
            <Button size="md" color="secondary" onClick={() => {}}>
              見積登録★TODO
            </Button>
            <Button size="md" color="secondary" onClick={handleClickOrder}>
              受注登録
            </Button>
          </>
        )}
        mode={mode === 'add' ? 'dialog' : 'detail'}
      >
        {/* <div mode={mode} callback={handleClickPost}> */}
        <div className="edit_pc_body_inner edit_project">
          <div className="left_box">
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">顧客ID<Required /></div>
                <div className="flex_wrap_box">
                  <Input
                    className="small"
                    type="number"
                    value={project.customer_id}
                    disabled
                    touch={touch}
                    require
                  />
                </div>
              </div>
              <div className="item_box">
                <div className="item_head">顧客名</div>
                <Input
                  value={customerName}
                  className=""
                  disabled
                />
                <Button
                  size="sm"
                  color="secondary"
                  className="ml_10"
                  onClick={handleClickCustomerSearch}
                >
                  顧客検索
                </Button>
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box large">
                <div className="item_head">顧客住所</div>
                <Input
                  value={customerAddress}
                  className="large"
                  disabled
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box large">
                <div className="item_head">案件名（工事）<Required /></div>
                <Input
                  value={project.name}
                  onChange={(e) => { setState({ ...project, name: e.target.value }); }}
                  className="large"
                  require
                  validationList={ValidationLengthUnder40}
                  touch={touch}
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">発生源</div>
                <Select
                  value={project.source || NaN}
                  onChange={(v) => setState({ ...project, source: Number(v) })}
                  defaultLabel="指定無し"
                  options={[
                    ...originList.map((v) => (
                      { text: v.name, value: v.id }
                    )),
                  ]}
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">案件ランク</div>
                <Select
                  value={project.project_rank || NaN}
                  onChange={(v) => setState({ ...project, project_rank: Number(v) })}
                  defaultLabel="指定無し"
                  options={
                    projectRankList.map((v) => (
                      { text: v.name, value: v.project_rank_id }
                    ))
                  }
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">案件担当</div>
                <Select
                  className="add_text_left"
                  label="店舗"
                  value={project.sales_shop || NaN}
                  onChange={(v) => setState({ ...project, sales_shop: Number(v) })}
                  defaultLabel="指定無し"
                  options={storeList.map((v) => (
                    { text: v.name, value: v.id }
                  ))}
                />
                <Select
                  className="add_text_left"
                  label="担当者"
                  value={project.sales_contact || NaN}
                  onChange={(v) => setState({ ...project, sales_contact: Number(v) })}
                  defaultLabel="指定無し"
                  options={employeeList.map((v) => (
                    { text: v.name, value: v.id }
                  ))}
                  touch={touch}
                  require
                />
              </div>
            </div>
            <div className="frame">
              <div className="item_wrap">
                <div className="item_box large">
                  <div className="item_head">現場名称<Required /></div>
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
                  <div className="item_head">郵便番号<Required /></div>
                  <div className="item_postal">
                    <div
                      onFocus={() => setPostNoErrorMessage([])}
                    >
                      <LeftLabelInputField
                        className="postal_code_1"
                        label="〒"
                        type="number"
                        value={project.post_no1}
                        onChange={(e) => { setState({ ...project, post_no1: e.target.value }); }}
                        validationList={ValidationPostNum1}
                        touch={touch}
                        require
                        noRequireLabel
                        maxLength={3}
                      />
                    </div>

                    <div
                      onFocus={() => setPostNoErrorMessage([])}
                    >
                      <LeftLabelInputField
                        className="postal_code_2"
                        label="-"
                        type="number"
                        value={project.post_no2}
                        onChange={(e) => { setState({ ...project, post_no2: e.target.value }); }}
                        validationList={ValidationPostNum2}
                        touch={touch}
                        require
                        noRequireLabel
                        maxLength={4}
                      />
                    </div>
                  </div>
                  <Button
                    size="sm"
                    color="secondary"
                    className="ml_10"
                    onClick={handleClickSearchAddress}
                  >
                    住所入力
                  </Button>
                  <Button
                    size="sm"
                    color="secondary"
                    className="ml_10"
                    onClick={handleClickRegistrationMap}
                  >
                    地図から入力
                  </Button>

                </div>
                <div style={{ color: 'red' }}>
                  {postNoErrorMessage.map((v, i) => (
                    <span key={v + i} style={{ marginRight: '10px' }}>
                      {v},
                    </span>
                  ))}
                </div>
              </div>
              <div className="item_wrap">
                <div className="item_box max_width">
                  <div className="item_head">住所</div>
                  <div className="item_adress">
                    <Select
                      className="add_text_left"
                      label="都道府県"
                      value={project.field_prefecture || NaN}
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
                    <LeftLabelInputField
                      label="市区町村"
                      value={project.field_city}
                      onChange={(e) => { setState({ ...project, field_city: e.target.value }); }}
                      validationList={ValidationLengthUnder50}
                      className="large"
                      require
                      touch={touch}
                    />
                    <LeftLabelInputField
                      label="地名・番地"
                      value={project.field_address}
                      onChange={(e) => { setState({ ...project, field_address: e.target.value }); }}
                      validationList={ValidationLengthUnder50}
                      className="large"
                      require
                      touch={touch}
                    />
                    <LeftLabelInputField
                      label="建物名"
                      value={project.field_building_name}
                      onChange={(e) => {
                        setState({ ...project, field_building_name: e.target.value });
                      }}
                      validationList={ValidationLengthUnder100}
                      className="large"
                      touch={touch}
                    />
                  </div>
                </div>
              </div>
              <div className="item_wrap">
                <div className="item_box">
                  <div className="item_head">現場電話</div>
                  <Input
                    type="tel"
                    value={project.field_tel_no}
                    onChange={(e) => { setState({ ...project, field_tel_no: e.target.value }); }}
                    validationList={ValidationTel}
                    className="large"
                  />
                </div>
              </div>
              <div className="item_wrap">
                <div className="item_box">
                  <div className="item_head">現場FAX</div>
                  <Input
                    type="tel"
                    value={project.field_fax_no}
                    onChange={(e) => { setState({ ...project, field_fax_no: e.target.value }); }}
                    validationList={ValidationTel}
                    className="large"
                  />
                </div>
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">工事部位</div>
                <div className="flex_wrap_box">
                  {project?.construction_parts?.data.map((v, i) => (
                    <div
                      className="item_body item_checkbox same_width_checkbox"
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

          <div className="right_box">
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">見込み金額</div>
                <Input
                  value={project?.expected_amount}
                  className="large"
                  disabled
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">契約番号</div>
                <Input
                  value={project?.contract_no}
                  className="size_datepicker"
                  disabled
                />
              </div>
              <div className="item_box">
                <div className="item_head">契約日</div>
                <Input
                  value={DateFormatter.date2str(project?.contract_date)}
                  className="size_datepicker"
                  disabled
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">受注工期</div>
                <Input
                  value={DateFormatter.date2str(project?.construction_period_start)}
                  className="construction_period_start size_datepicker"
                  disabled
                />
                <label className="ml_5 mr_5">〜</label>
                <Input
                  label="〜"
                  value={DateFormatter.date2str(project?.construction_period_end)}
                  className="construction_period_end size_datepicker"
                  disabled
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">着工予定日</div>
                <Input
                  value={DateFormatter.date2str(project?.construction_start_date)}
                  className="size_datepicker"
                  disabled
                />
              </div>
              <div className="item_box">
                <div className="item_head">完工予定日</div>
                <Input
                  value={DateFormatter.date2str(project?.completion_end_date)}
                  className="size_datepicker"
                  disabled
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">着工日</div>
                <DatePicker
                  date={project.construction_date || null}
                  onChange={(v) => setState(
                    { ...project, construction_date: v },
                  )}
                  disabled={projectInfo?.order_flag}
                  validationList={ValidationDatePicker}
                />
              </div>
              <div className="item_box">
                <div className="item_head">完工日</div>
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
              <div className="item_box">
                <div className="item_head">着工式※TODO削除</div>
                <DatePicker
                  date={project.construction_execution_date || null}
                  onChange={(v) => setState(
                    { ...project, construction_execution_date: v },
                  )}
                  disabled={projectInfo?.order_flag}
                  validationList={ValidationDatePicker}
                />
              </div>
              <div className="item_box">
                <div className="item_head">完工式※TODO削除</div>
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
              <div className="item_box">
                <div className="item_head">完了日</div>
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
              <div className="item_box">
                <div className="item_head">失注日</div>
                <DatePicker
                  date={project.failure_date || null}
                  onChange={(v) => setState(
                    { ...project, failure_date: v },
                  )}
                  validationList={ValidationDatePicker}
                />
              </div>
              <div className="item_box">
                <div className="item_head">失注理由</div>
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
              <div className="item_box large">
                <div className="item_head">備考</div>
                {/* バリデーションの追加 */}
                <TextArea
                  rows={3}
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
              <div className="item_box">
                <div className="item_head">キャンセル日</div>
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
              <div className="item_box large">
                <div className="item_head">キャンセル理由</div>
                {/* バリデーションの追加 */}
                <TextArea
                  rows={3}
                  value={project?.cancel_reason}
                  className="large"
                  onChange={(e) => { setState({ ...project, cancel_reason: e.target.value }); }}
                  validationList={ValidationLengthUnder255}
                />
              </div>
            </div>
            {/*
            //★使用しない（2021/8/10）
            <div className="item_wrap ">
              <div className="item_box large">
                <RightLabelCheckbox
                  className="ml_auto"
                  checked={project?.execution_end}
                  label="実行終了"
                  onChange={() => {
                    setState({ ...project, execution_end: !(project?.execution_end) });
                  }}
                />
              </div>
            </div>
                */}
            {/*
            //★使用しない（2021/8/10）
            <div className="">
              <Table
                className=""
                header={[
                  <Button
                    size="sm"
                    color="secondary"
                    onClick={() => {}}
                  >再計算
                  </Button>,
                  ...ProjectCollection.estimateHeader,
                ]}
                lists={
                    table.data.map((v, i) => ([
                      ProjectCollection.estimateSideHeader[i],
                      v.contract,
                      v.budget,
                      v.id === 't1' || v.id === 't2'
                        ? (
                          <Input
                            className="align_r"
                            type="number"
                            value={v.finalPrice}
                            // disabled
                            onChange={(e) => {
                              table.changeInput(v.id, Number(e.target.value));
                              setTable(cloneDeep(table));
                              if (v.id === 't1') {
                                setState({ ...project, order_detail1: Number(e.target.value) });
                              } else if (v.id === 't2') {
                                setState({ ...project, order_detail2: Number(e.target.value) });
                              }
                            }}
                          />
                        )
                        : v.finalPrice,
                      v.completion,
                      v.contrast,
                    ]))
                  }
                option={{
                  stringWidth: [
                    // { index: 0, width: 50 }, //項目
                    { index: 1, width: 100 }, // 契約
                    { index: 2, width: 100 }, // 実行予算
                    { index: 3, width: 100 }, //  最終原価
                    { index: 4, width: 100 }, // 完工
                    { index: 5, width: 100 }, // 対比
                  ],
                  tdAlign: [
                    { index: 0, align: 'center' },
                    { index: 1, align: 'right' },
                    { index: 2, align: 'right' },
                    { index: 3, align: 'right' },
                    { index: 4, align: 'right' },
                    { index: 5, align: 'right' },
                  ],
                }}
              />
            </div>
             */}
          </div>
        </div>
      </EditPC>
    )
  );
};
