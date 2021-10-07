import React, {
  useCallback, useState,
} from 'react';
import { cloneDeep, isEqual } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { EditSP, EditType } from '../../../../dialogs/edit/edit.sp';
import { Button } from '../../../../ui/button/button';
import { RightLabelCheckbox } from '../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { DatePicker } from '../../../../ui/date-picker/date-picker';
import { TopLabelInputField } from '../../../../ui/input-field/top-label-input-field/top-label-input-field';
import { Select } from '../../../../ui/select/select';
import './support-history-edit.sp.scss';
import { SupportHistoryEditState } from '../../../../../type/support-history/support-history.type';
import { SupportHistoryCollection } from '../../../../../collection/support-history/support-history.collection';
import { RegistrationAddressMapDialog } from '../../../../ui/map/registration-address-map-dialog/registration-address-map-dialog';
import { Input } from '../../../../ui/input/input';
import { SupportHistoryActions } from '../../../../../redux/support-history/support-history.action';
import { useDidMount } from '../../../../../hooks/life-cycle';
import { SearchBoxCustomerSP } from '../../customer/serch-box/customer-search-box.sp';
import { ProjectSearchBoxSP } from '../../project/search-box/project-search-box.sp';
import { DateFormatter } from '../../../../../utilities/date-formatter';
import { IconButton } from '../../../../ui/button/icon-button/icon-button';
import { SupportHistoryValidation } from '../../../../../model/validation/support-history/support-history.validation';
import {
  ValidationLengthUnder40,
  ValidationLengthUnder500,
  ValidationLengthUnder60,
} from '../../../../../model/validation';
import { TextArea } from '../../../../ui/text-area/text-area';
import { Customer, CustomerListType } from '../../../../../type/customer/customer.type';
import { Project, ProjectListType } from '../../../../../type/project/project.type';
import { State } from '../../../../../redux/root.reducer';
import { MasterActions } from '../../../../../redux/master/master.action';
import { convertFileList2FileArray } from '../../../../../utilities/convert2files';
import { FileUploadButton } from '../../../../ui/file-upload/file-upload-button';
import { ValidationDatePicker } from '../../../../../model/validation/validation-date-picker';
import { Required } from '../../../../ui/required/required';
import { hours, minutes } from '../../../../../collection/time';
import { getNowDate } from '../../../../../utilities/get-now-time';

type Props = {
  mode: EditType;
  id?: number;
  customerData?: Customer | CustomerListType;
  projectData?: Project | ProjectListType;
  callback?: () => void;
}

export const SupportHistoryEditSP = (props: Props) => {
  const {
    mode, id, customerData, projectData, callback,
  } = props;

  /* Hooks */
  const dispatch = useDispatch();

  /* Master */
  const storeList = useSelector((state: State) => (state.master.storeList), isEqual);
  const employeeList = useSelector((state: State) => (state.master.employeeList), isEqual);
  const originList = useSelector((state: State) => (state.master.originList), isEqual);
  const largeCategoryList = useSelector((state: State) => (
    state.master.largeCategoryList), isEqual);

  /* State */
  const [touch, setTouch] = useState(false);
  const [img, setImg] = useState('');
  const [supportHistory, setSupportHistory] = useState(SupportHistoryCollection.editInitialState);
  const sortState = useSelector((state: State) => (state.supportHistory.sort), isEqual);

  /* Callback */
  const setState = useCallback(
    (v: SupportHistoryEditState) => {
      setSupportHistory(v);
    }, [supportHistory],
  );

  const handleClickPost = useCallback(() => {
    /* 保存API */
    if (SupportHistoryValidation(supportHistory)) {
      dispatch(DialogActions.pushMessage({
        title: '対応履歴新規登録',
        message: ['未入力／入力不備項目があります'],
        callback: () => setTouch(true),
      }));
      return;
    }

    dispatch(SupportHistoryActions.api.supportHistory.post({
      param: {
        data: {
          customer_id: supportHistory.customer_id,
          project_id: supportHistory.project_id,
          reception_hour: supportHistory.reception_hour,
          reception_minutes: supportHistory.reception_minutes,
          customer_responsible_store: supportHistory.customer_responsible_store,
          customer_representative: supportHistory.customer_representative,
          category: supportHistory.category,
          media: supportHistory.media,
          customer_name: supportHistory.customer_name,
          project_name: supportHistory.project_name,
          supported_content: supportHistory.supported_content,
          supported_responsible_store: supportHistory.supported_responsible_store,
          supported_representative: supportHistory.supported_representative,
          is_fixed: supportHistory.is_fixed,
          supported_history_name: supportHistory.supported_history_name,
          supported_person: supportHistory.supported_person,
          supported_detail: supportHistory.supported_detail,
          reception_time: DateFormatter.date2str(supportHistory.reception_time),
          supported_complete_date: DateFormatter.date2str(supportHistory.supported_complete_date),
          image: supportHistory.image || undefined,
        },
        id,
      },
      onSuccess: () => {
        if (callback) {
          callback();
          return;
        }
        dispatch(SupportHistoryActions.api.supportHistory.getList({
          param: {
            ...sortState,
            is_fixed: undefined,
            offset: undefined,
            reception_date: DateFormatter.date2str(sortState.reception_date),
            supported_complete_date: DateFormatter.date2str(sortState.supported_complete_date),
          },
        }));
      },
      onError: () => setTouch(true),
    }));
  },
  [supportHistory]);

  const handleClickRegistrationMap = useCallback(
    (type: 'customer' | 'project') => {
      const str = type === 'customer' ? '顧客' : '案件';
      dispatch(DialogActions.push({
        title: `登録したい${str}をクリックしてください`,
        element: <RegistrationAddressMapDialog
          type={type}
          callbackData={(data) => {
            if (type === 'customer') {
              const value = data as CustomerListType;
              const isSame = data.id === supportHistory.customer_id;
              setSupportHistory({
                ...supportHistory,
                customer_name: value.name,
                customer_id: value.id,
                project_name: !isSame ? '' : supportHistory.project_name,
                project_id: !isSame ? NaN : supportHistory.project_id,
              });
            } else {
              const value = data as ProjectListType;
              setSupportHistory({
                ...cloneDeep(supportHistory),
                customer_name: value.customer_name,
                customer_id: value.customer_id,
                project_id: value.id,
                project_name: value.name,
              });
            }
            dispatch(DialogActions.pop());
            window.console.log(data);
          }}
        />,
      }));
    }, [supportHistory],
  );

  const handleClickCustomerSearch = useCallback(
    () => {
      dispatch(DialogActions.push({
        title: '顧客検索',
        element: <SearchBoxCustomerSP callback={(data) => {
          const isSame = data.id === supportHistory.customer_id;
          setState({
            ...supportHistory,
            customer_name: data.name,
            customer_id: data.id,
            project_name: !isSame ? '' : supportHistory.project_name,
            project_id: !isSame ? NaN : supportHistory.project_id,
          });
        }}
        />,
      }));
    }, [supportHistory],
  );

  /* TODO 案件検索の途中 */
  const handleClickProjectSearch = useCallback(
    () => {
      dispatch(DialogActions.push({
        title: '案件検索',
        element: <ProjectSearchBoxSP callback={(data) => {
          setState({
            ...supportHistory,
            project_name: data.name,
            customer_name: data.customer_name,
            customer_id: data.customer_id,
            project_id: data.id,
          });
        }}
        />,
      }));
    }, [supportHistory],
  );

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
      setState({
        ...supportHistory,
        image: file,
      });
      file2Img(file);
    }
  }, [supportHistory, file2Img]);

  const handleClickImgDelete = useCallback(() => {
    setImg('');
    setState({
      ...supportHistory,
      image: null,
    });
  }, [supportHistory]);

  useDidMount(() => {
    if (mode === 'update' && id) {
      dispatch(SupportHistoryActions.api.supportHistory.get({
        param: { id },
        callback: (data) => {
          setState({
            ...data,
            reception_time: data.reception_date ? new Date(data.reception_date) : null,
            supported_complete_date:
              data.supported_complete_date ? new Date(data.supported_complete_date) : null,
            image: null,
            is_fixed: data.fixed_flag ? 1 : 0,
          });
          setImg(data.image as any);
          // if (typeof data.image !== 'string') {
          //   file2Img(data.image);
          // }
        },
      }));
      return;
    }

    const { date, hour, min } = getNowDate();
    if (customerData) {
      setState({
        ...supportHistory,
        customer_id: customerData.id,
        customer_name: customerData.name,
        reception_time: date,
        reception_hour: hour,
        reception_minutes: min,
      });
      return;
    }

    if (projectData) {
      setState({
        ...supportHistory,
        customer_id: projectData.customer_id,
        customer_name: projectData.customer_name,
        project_id: projectData.id,
        project_name: projectData.name,
        reception_time: date,
        reception_hour: hour,
        reception_minutes: min,
      });
      return;
    }

    setState({
      ...supportHistory,
      reception_time: date,
      reception_hour: hour,
      reception_minutes: min,
    });
  });

  useDidMount(() => {
    dispatch(MasterActions.api.store.getList({}));
    dispatch(MasterActions.api.employee.getList({}));
    dispatch(MasterActions.api.supportHistory.getList({}));
    dispatch(MasterActions.api.largeCategory.getList({}));
    dispatch(MasterActions.api.origin.getList({}));
  });

  return (
    mode && (
    <EditSP mode={mode} callback={handleClickPost}>
      {/* edit_sp_body_inner は各画面の共通用 */}
      <div className="edit_sp_body_inner support_history_edit_sp">
        <div className="category_wrap">

          <div className="item_wrap">
            <div className="item_label">
              <span>顧客名<Required /></span>
              <Button
                size="md"
                color="secondary"
                onClick={handleClickCustomerSearch}
              >
                顧客検索
              </Button>
              <IconButton
                size="md"
                color="secondary"
                onClick={() => {
                  handleClickRegistrationMap('customer');
                }}
                fontAwesomeClass="fa fa-map-marked-alt"
              />
            </div>

            <div className="item_body">
              <Input
                disabled
                value={supportHistory?.customer_name}
                onChange={(e) => setState({ ...supportHistory, customer_name: e.target.value })}
                require
                touch={touch}
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">
              <span>案件名</span>
              <Button
                size="md"
                color="secondary"
                onClick={handleClickProjectSearch}
              >
                案件検索
              </Button>
              <IconButton
                size="md"
                color="secondary"
                onClick={() => {
                  handleClickRegistrationMap('project');
                }}
                fontAwesomeClass="fa fa-map-marked-alt"
              />
            </div>

            <div className="item_body">
              <Input
                value={supportHistory?.project_name}
                disabled
                validationList={ValidationLengthUnder40}
              />
            </div>
          </div>
        </div>

        <div className="category_wrap">
          <div className="item_wrap">
            {/* <div className="item_label">受付日時<Required /></div> */}
            <DatePicker
              label="受付日時"
              date={supportHistory.reception_time || null}
              onChange={(v) => setState(
                { ...supportHistory, reception_time: v },
              )}
              validationList={ValidationDatePicker}
              touch={touch}
              require
            />
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_label">時</div>
              <Select
                className=""
                value={supportHistory.reception_hour}
                onChange={(v) => setState(
                  { ...supportHistory, reception_hour: Number(v) },
                )}
                defaultLabel="指定無し"
                options={
                  hours.map((v) => ({
                    text: v.label, value: v.value,
                  }))
                  }
              />
            </div>
            <div className="item_box">
              <div className="item_label">分</div>
              <Select
                className=""
                value={supportHistory.reception_minutes}
                onChange={(v) => setState(
                  { ...supportHistory, reception_minutes: Number(v) },
                )}
                defaultLabel="指定無し"
                options={
                  minutes.map((v) => ({
                    text: v.label, value: v.value,
                  }))
                  }
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_body">
              <TopLabelInputField
                label="対応履歴名"
                value={supportHistory?.supported_history_name}
                onChange={(e) => setState(
                  { ...supportHistory, supported_history_name: e.target.value },
                )}
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">カテゴリ</div>
            <div className="item_body">
              <Select
                value={supportHistory?.category}
                defaultLabel="指定無し"
                options={largeCategoryList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
                onChange={(v) => setState({ ...supportHistory, category: Number(v) })}
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">媒体</div>
            <div className="item_body">
              <Select
                value={supportHistory?.media}
                defaultLabel="指定無し"
                options={originList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
                onChange={(v) => setState({ ...supportHistory, media: Number(v) })}
                validationList={ValidationLengthUnder60}
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">
              画像ファイル
            </div>
            <div className="item_body">
              <div className="item_file_upload">
                {img
                && (
                <div className="item_file_upload__img mb_10">
                  <img src={img} alt="img" />
                </div>
                )}
                <div className="item_file_upload__buttons">
                  <FileUploadButton
                    value=""
                    onChange={onFileInputChange}
                    accept="image/*"
                  />
                  {img
                  && (
                  <Button
                    size="md"
                    color="dark"
                    className="ml_10"
                    onClick={handleClickImgDelete}
                  >削除
                  </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">対応内容</div>
            <div className="item_body">
              <TextArea
                rows={7}
                value={supportHistory?.supported_content}
                onChange={(e) => setState(
                  { ...supportHistory, supported_content: e.target.value },
                )}
                validationList={ValidationLengthUnder500}
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">対応店舗</div>
            <div className="item_body">
              <Select
                value={supportHistory?.customer_responsible_store}
                defaultLabel="指定無し"
                options={storeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
                onChange={(v) => setState({
                  ...supportHistory, customer_responsible_store: Number(v),
                })}
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">対応者</div>
            <div className="item_body">
              <Select
                value={supportHistory?.supported_person}
                defaultLabel="指定無し"
                options={employeeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
                onChange={(v) => setState({ ...supportHistory, supported_person: Number(v) })}
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">対応日</div>
            <DatePicker
              date={supportHistory.supported_complete_date || null}
              onChange={(v) => setState(
                { ...supportHistory, supported_complete_date: v },
              )}
              validationList={ValidationDatePicker}
            />
          </div>

          <div className="item_wrap">
            <div className="item_label">対応詳細</div>
            <div className="item_body">
              <TextArea
                rows={7}
                value={supportHistory?.supported_detail}
                onChange={(e) => setState(
                  { ...supportHistory, supported_detail: e.target.value },
                )}
              />
            </div>
          </div>

          {/* TODO 編集時に入れたis_handlingの値が変わらない */}
          <div className="item_wrap tags_form">
            <div className="item_body item_checkbox">
              <RightLabelCheckbox
                checked={Boolean(supportHistory?.is_fixed)}
                label="対応済みフラグ"
                onChange={() => {
                  setState({ ...supportHistory, is_fixed: supportHistory?.is_fixed ? 0 : 1 });
                }}
                className="single_column"
              />
            </div>
          </div>
        </div>
      </div>
    </EditSP>
    )
  );
};
