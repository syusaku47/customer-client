import React, {
  useCallback, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep, isEqual } from 'lodash';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { EditType } from '../../../../dialogs/edit/edit.sp';
import { Button } from '../../../../ui/button/button';
import { DatePicker } from '../../../../ui/date-picker/date-picker';
import { Select } from '../../../../ui/select/select';
import './support-history-edit.pc.scss';
import { SupportHistoryEditState } from '../../../../../type/support-history/support-history.type';
import { SupportHistoryCollection } from '../../../../../collection/support-history/support-history.collection';
import { Input } from '../../../../ui/input/input';
import { SupportHistoryActions } from '../../../../../redux/support-history/support-history.action';
import { useDidMount } from '../../../../../hooks/life-cycle';
import { LeftLabelCheckbox } from '../../../../ui/checkbox/left-label-checkbox/left-label-checkbox';
import { EditPC } from '../../../../dialogs/edit/edit.pc';
import { DateFormatter } from '../../../../../utilities/date-formatter';
import { Customer, CustomerListType } from '../../../../../type/customer/customer.type';
import { Project, ProjectListType } from '../../../../../type/project/project.type';
import { CustomerSearch } from '../../../layout/search-box/customer/customer-search/customer-search';
import { ProjectSearch } from '../../../layout/search-box/project/project-search/project-search';
import { Required } from '../../../../ui/required/required';
import { RegistrationAddressMapDialogPC } from '../../../../ui/map/registration-address-map-dialog/pc/registration-address-map-dialog.pc';
import {
  ValidationLengthUnder40,
  ValidationLengthUnder500,
  ValidationLengthUnder60,
} from '../../../../../model/validation';
import { SupportHistoryValidation } from '../../../../../model/validation/support-history/support-history.validation';
import { TextArea } from '../../../../ui/text-area/text-area';
import { MasterActions } from '../../../../../redux/master/master.action';
import { State } from '../../../../../redux/root.reducer';
// import { convertFileList2FileArray } from '../../../../../utilities/convert2files';
import { FileUploadButton } from '../../../../ui/file-upload/file-upload-button';
import { ValidationDatePicker } from '../../../../../model/validation/validation-date-picker';
import { hours, minutes } from '../../../../../collection/time';
import { getNowDate } from '../../../../../utilities/get-now-time';
import { IconButton } from '../../../../ui/button/icon-button/icon-button';
import { file2Object } from '../../../../../utilities/file2obj';

type Props = {
  mode: EditType;
  id?: number;
  customerData?: Customer | CustomerListType;
  projectData?: Project;
  callback?: () => void;
}

 type InputFile = {
  src: string;
  /** 変更後の名前 */
  reName: string;
   /** 拡張子名前 */
   reType: string;
 } & File;

export const SupportHistoryEditPC = (props: Props) => {
  const {
    mode, id, customerData, projectData, callback,
  } = props;

  /* Hooks */
  const dispatch = useDispatch();

  /* State */
  const storeList = useSelector((state: State) => (state.master.storeList), isEqual);
  const employeeList = useSelector((state: State) => (state.master.employeeList), isEqual);
  const originList = useSelector((state: State) => (state.master.originList), isEqual);
  const largeCategoryList = useSelector((state: State) => (
    state.master.largeCategoryList), isEqual);
  const [supportHistory, setSupportHistory] = useState(SupportHistoryCollection.editInitialState);
  const sortState = useSelector((state: State) => (state.supportHistory.sort), isEqual);

  /* State */
  const [imageName, setImageName] = useState('');
  const [touch, setTouch] = useState(false);
  // eslint-disable-next-line
  const [img, setImg] = useState('');
  const [files, setFiles] = useState<InputFile[]>([]);

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
          supported_person: supportHistory.supported_representative,
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
  [supportHistory, sortState, callback]);

  const handleClickCustomerSearch = useCallback(
    () => {
      dispatch(DialogActions.push({
        title: '顧客検索',
        className: 'max_height_dialog',
        element: <CustomerSearch
          callback={(data) => {
            const isSame = data.id === supportHistory.customer_id;
            setSupportHistory({
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

  const handleClickMapSearch = useCallback(
    (type: 'customer' | 'project') => {
      const str = type === 'customer' ? '顧客' : '案件';
      dispatch(DialogActions.push({
        title: `登録したい${str}をクリックしてください`,
        className: 'max_height_dialog map_dialog',
        element: <RegistrationAddressMapDialogPC
          type={type}
          label="登録"
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

  const handleClickClear = useCallback(() => {
    setSupportHistory({
      ...supportHistory,
      customer_id: NaN,
      customer_name: '',
      project_id: NaN,
      project_name: '',
    });
  }, [supportHistory]);

  const handleClickProjectSearch = useCallback(
    () => {
      dispatch(DialogActions.push({
        title: '案件検索',
        className: 'max_height_dialog',
        element: <ProjectSearch callback={(data) => {
          setSupportHistory({
            ...cloneDeep(supportHistory),
            customer_name: data.customer_name,
            customer_id: data.customer_id,
            project_id: data.id,
            project_name: data.name,
          });
        }}
        />,
      }));
    }, [supportHistory],
  );

  // const file2Img = useCallback((file:File | undefined | null) => {
  //   if (!file) {
  //     setImg('');
  //     return;
  //   }
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = (e) => {
  //     const res = e.target?.result ? e.target.result : '';
  //     if (typeof res === 'string') {
  //       setImg(res);
  //     }
  //   };
  // }, []);

  const onFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    // const reader = new FileReader();
    if (fileList?.length) {
      for (let i = 0; i < fileList.length; i += 1) {
        file2Object(fileList[i]).then(({
          file, src, name, type,
        }) => {
          files.push(cloneDeep({
            ...file,
            src,
            reName: name,
            reType: type,
          }));
          setFiles(cloneDeep(files));
        });
      }
    }
  }, [supportHistory, file2Object, files]);

  // eslint-disable-next-line
  const handleClickImgDelete = useCallback(() => {
    setImg('');
    setState({
      ...supportHistory,
      image: null,
    });
    setImageName('');
  }, [supportHistory]);

  const deleteFile = useCallback((index: number) => {
    console.log(files);

    files.splice(index, 1);

    setFiles(cloneDeep(files));
  }, [files]);

  /* Effect */
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
            image: data.image || null,
            is_fixed: data.fixed_flag ? 1 : 0,
          });
          // if (typeof data.image !== 'string') {
          //   file2Img(data.image);
          // }
          setImg(data.image as any);
          setImageName(data.image_name);
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
      <EditPC mode="dialog" callback={handleClickPost}>
        <div className="">
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">受付日時<Required /></div>
              <DatePicker
                date={supportHistory.reception_time || null}
                onChange={(v) => {
                  setState({
                    ...supportHistory,
                    reception_time: v,
                    reception_hour: 0,
                    reception_minutes: 0,
                  });
                }}
                require
                validationList={ValidationDatePicker}
                touch={touch}
                errorPosBottom
              />
            </div>
            <div className="item_box">
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
              /><label>時</label>
            </div>
            <div className="item_box">
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
              /><label>分</label>
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">受付担当</div>
              <Select
                className="add_text_left"
                label="店舗"
                value={supportHistory?.customer_responsible_store}
                defaultLabel="指定無し"
                options={storeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
                onChange={(v) => setState(
                  { ...supportHistory, customer_responsible_store: Number(v) },
                )}
              />
            </div>
            <div className="item_box">
              <Select
                className="add_text_left"
                label="担当者"
                value={supportHistory?.customer_representative}
                defaultLabel="指定無し"
                options={employeeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
                onChange={(v) => setState(
                  { ...supportHistory, customer_representative: Number(v) },
                )}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">対応履歴名</div>
              <Input
                value={supportHistory?.supported_history_name}
                onChange={(e) => setState(
                  { ...supportHistory, supported_history_name: e.target.value },
                )}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">カテゴリ</div>
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
            <div className="item_box">
              <div className="item_head">媒体</div>
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
            <div className="item_box">
              <div className="item_head">顧客名<Required /></div>
              <Input
                value={supportHistory?.customer_name}
                disabled
                require
                touch={touch}
              />
              <Button
                className="ml_10"
                size="sm"
                color="secondary"
                onClick={handleClickCustomerSearch}
              >
                顧客検索
              </Button>
              <Button
                className="ml_10"
                size="sm"
                color="secondary"
                onClick={() => {
                  handleClickMapSearch('customer');
                }}
              >
                地図から検索
              </Button>
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">案件名</div>
              <Input
                disabled
                value={supportHistory?.project_name}
                validationList={ValidationLengthUnder40}
              />
              <Button
                className="ml_10"
                size="sm"
                color="secondary"
                onClick={handleClickProjectSearch}
              >
                案件検索
              </Button>

              <Button
                className="ml_10"
                size="sm"
                color="secondary"
                onClick={() => {
                  handleClickMapSearch('project');
                }}
              >
                地図から検索
              </Button>

              <Button
                className="ml_10"
                size="sm"
                color="dark"
                onClick={handleClickClear}
              >
                クリア
              </Button>
            </div>

          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">画像ファイル</div>
              <div>
                {Boolean(files.length)
                && (
                <div className="img_wrap flex_box">
                  {files.map((v, i) => (
                    <div className="img_box mb_10" key={`files${i}`}>
                      <img src={v.src} alt="img" />
                      <IconButton
                        fontAwesomeClass="fas fa-times"
                        size="sm"
                        color="dark"
                        onClick={() => deleteFile(i)}
                      />
                    </div>
                  ))}

                  {/* <div className="img_box mb_10">
                        <img src={img} alt="img" />
                        <IconButton
                          fontAwesomeClass="fas fa-times"
                          size="sm"
                          color="dark"
                          className=""
                          onClick={handleClickImgDelete}
                        />
                      </div>
                      <div className="img_box mb_10">
                        <img src={img} alt="img" />
                        <IconButton
                          fontAwesomeClass="fas fa-times"
                          size="sm"
                          color="dark"
                          className=""
                          onClick={handleClickImgDelete}
                        />
                      </div>
                      <div className="img_box mb_10">
                        <img src={img} alt="img" />
                        <IconButton
                          fontAwesomeClass="fas fa-times"
                          size="sm"
                          color="dark"
                          className=""
                          onClick={handleClickImgDelete}
                        />
                      </div>
                      <div className="img_box mb_10">
                        <img src={img} alt="img" />
                        <IconButton
                          fontAwesomeClass="fas fa-times"
                          size="sm"
                          color="dark"
                          className=""
                          onClick={handleClickImgDelete}
                        />
                      </div>
                      <div className="img_box mb_10">
                        <img src={img} alt="img" />
                        <IconButton
                          fontAwesomeClass="fas fa-times"
                          size="sm"
                          color="dark"
                          className=""
                          onClick={handleClickImgDelete}
                      /> */}
                </div>
                )}
                <div className="flex_no_wrap_box">
                  <FileUploadButton
                    value=""
                    onChange={onFileInputChange}
                    accept="image/*"
                    multiple
                  />
                  {/*
                  {img
                  && (

                    <!--Button
                    size="sm"
                    color="dark"
                    className=""
                    onClick={handleClickImgDelete}
                  >削除
                  </Button-->

                  )}
                  */}
                  {/* <input
                  // style={{ display: 'none' }}
                  type="file"
                  value=""
                  onChange={onFileInputChange}
                  accept="image/*"
                /> */}
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
            <div className="item_box large">
              <div className="item_head">対応内容</div>
              <TextArea
                className="large"
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
            <div className="item_box">
              <div className="item_head">対応担当</div>
              <Select
                style={{ minWidth: '10em' }}
                className="add_text_left"
                label="店舗"
                value={supportHistory?.supported_responsible_store}
                defaultLabel="指定無し"
                options={storeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
                onChange={(v) => setState(
                  { ...supportHistory, supported_responsible_store: Number(v) },
                )}
              />
              <Select
                className="add_text_left"
                label="担当者"
                value={supportHistory?.supported_representative}
                defaultLabel="指定無し"
                options={employeeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
                onChange={(v) => setState(
                  { ...supportHistory, supported_representative: Number(v) },
                )}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">対応日</div>
              <DatePicker
                date={supportHistory.supported_complete_date || null}
                onChange={(v) => setState(
                  { ...supportHistory, supported_complete_date: v },
                )}
                validationList={ValidationDatePicker}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">対応済みフラグ</div>
              <LeftLabelCheckbox
                checked={Boolean(supportHistory?.is_fixed)}
                label=""
                onChange={() => {
                  setState({ ...supportHistory, is_fixed: supportHistory?.is_fixed ? 0 : 1 });
                }}
              />
            </div>
          </div>
        </div>
      </EditPC>
    )
  );
};
