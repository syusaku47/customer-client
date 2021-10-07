import React, {
  useCallback, useState,
} from 'react';
import { cloneDeep, isEqual } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { FileCollection } from '../../../../../collection/file/file.collection';
import { useDidMount } from '../../../../../hooks/life-cycle';
import { FileValidation } from '../../../../../model/validation/file/file.validation';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { FileActions } from '../../../../../redux/file/file.action';
import { FileEditState } from '../../../../../type/file/file.type';
import { EditSP, EditType } from '../../../../dialogs/edit/edit.sp';
import { Button } from '../../../../ui/button/button';
import { Input } from '../../../../ui/input/input';
import { Required } from '../../../../ui/required/required';
import { SearchBoxCustomerSP } from '../../customer/serch-box/customer-search-box.sp';
import { ProjectSearchBoxSP } from '../../project/search-box/project-search-box.sp';
import './file-edit.sp.scss';
import {
  ValidationLengthUnder40,
  ValidationLengthUnder50,
  ValidationLengthUnder500,
  ValidationLengthUnder60,
} from '../../../../../model/validation';
import { TextArea } from '../../../../ui/text-area/text-area';
import { Customer, CustomerListType } from '../../../../../type/customer/customer.type';
import { Project, ProjectListType } from '../../../../../type/project/project.type';
import { convertFileList2FileArray } from '../../../../../utilities/convert2files';
import { State } from '../../../../../redux/root.reducer';
import { DateFormatter } from '../../../../../utilities/date-formatter';
import { FileUploadButton } from '../../../../ui/file-upload/file-upload-button';
import { RegistrationAddressMapDialog } from '../../../../ui/map/registration-address-map-dialog/registration-address-map-dialog';
import { CommonCollection } from '../../../../../collection/common/common.collection';

export const createFileName = (target: string | undefined, fileType: string | undefined) => {
  if (!target || !fileType) return '';
  const isMatch = target.match(`.${fileType}`);
  if (isMatch) return target;
  return `${target}.${fileType}`;
};

type Props = {
  mode: EditType;
  id?: number;
  customerData?: Customer;
  projectData?: Project;
  callback?: () => void;
}

export const FileEditSP = (props: Props) => {
  const {
    mode, customerData, id, projectData, callback,
  } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => (state.file.sort), isEqual);

  /* State */
  const [file, setFile] = useState(FileCollection.editInitialState);
  const [fileType, setFileType] = useState('');
  const [touch, setTouch] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [projectName, setProjectName] = useState('');

  /* Callback */
  const setState = useCallback(
    (v: FileEditState) => {
      setFile(v);
    }, [file],
  );

  const handleClickPost = useCallback(
    () => {
      if (FileValidation(file, customerName, projectName)) {
        dispatch(DialogActions.pushMessage({
          title: 'ファイル情報入力',
          message: ['未入力／入力不備項目があります'],
          callback: () => setTouch(true),
        }));
        return;
      }

      /* 保存API */
      dispatch(FileActions.api.file.post({
        param: {
          data: {
            customer_id: file.customer_id,
            project_id: file.project_id,
            file_name: createFileName(file.file_name, fileType),
            format: file.format,
            file: file.file,
            comment: file.comment,
          },
          id,
        },
        onSuccess: () => {
          if (callback) {
            callback();
            return;
          }
          dispatch(FileActions.api.file.getList({
            param: {
              ...sortState,
              upload_date_start: DateFormatter.date2str(sortState.upload_date_start),
              upload_date_end: DateFormatter.date2str(sortState.upload_date_end),
              upload_date: DateFormatter.date2str(sortState.upload_date),
            },
          }));
        },
        onError: () => setTouch(true),
      }));
    },
    [file, fileType],
  );

  const handleClickCustomerSearch = useCallback(
    () => {
      dispatch(DialogActions.push({
        title: '顧客検索',
        element: <SearchBoxCustomerSP callback={(data) => {
          const isSame = data.id === file.customer_id;
          setFile({
            ...file,
            customer_id: data.id,
            project_id: !isSame ? NaN : file.project_id,
          });
          setCustomerName(data.name);
          setProjectName(!isSame ? '' : projectName);
        }}
        />,
      }));
    }, [file],
  );

  const handleClickProjectSearch = useCallback(
    () => {
      dispatch(DialogActions.push({
        title: '案件検索',
        element: <ProjectSearchBoxSP
          callback={(data) => {
            setFile({
              ...file,
              customer_id: data.customer_id,
              project_id: data.id,
            });
            setCustomerName(data.customer_name);
            setProjectName(data.name);
          }}
        />,
      }));
    }, [file],
  );

  const onFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList?.length) {
      const fileData = convertFileList2FileArray(fileList)[0];
      const fileNames = fileData.name.split('.');
      setFileType(fileNames[fileNames.length - 1]);
      /* TODO 拡張子に対してファイル拡張子に対してもバリデーションをかける */
      setFile({
        ...file,
        file_name: fileData.name,
        file: fileData,
        format: fileData.type,
      });
    }
  }, [file]);

  const handleClickMapSearch = useCallback(
    (type: 'customer' | 'project') => {
      const str = type === 'customer' ? '顧客' : '案件';
      dispatch(DialogActions.push({
        title: `登録したい${str}をクリックしてください`,
        className: 'max_height_dialog map_dialog',
        element: <RegistrationAddressMapDialog
          type={type}
          callbackData={(data) => {
            if (type === 'customer') {
              const value = data as CustomerListType;
              const isSame = data.id === file.customer_id;
              setCustomerName(value.name);
              setProjectName(!isSame ? '' : projectName);
              setFile({
                ...file,
                customer_id: value.id,
                project_id: !isSame ? NaN : file.project_id,
              });
            } else {
              const value = data as ProjectListType;
              setCustomerName(value.customer_name);
              setProjectName(value.name);
              setFile({
                ...cloneDeep(file),
                customer_id: value.customer_id,
                project_id: value.id,
              });
            }
            dispatch(DialogActions.pop());
          }}
        />,
      }));
    }, [file, projectName],
  );

  useDidMount(() => {
    if (mode === 'update' && id) {
      dispatch(FileActions.api.file.get({
        param: { id },
        callback: (data) => {
          setState({
            ...file,
            customer_id: data.customer_id,
            project_id: data.project_id,
            file_name: data.file_name,
            comment: data.comment,
            format: data.format,
            file: data.file as File,
          });
          setCustomerName(data.customer_name);
          setProjectName(data.project_name);
          const fileNames = data.file_name.split('.');
          setFileType(fileNames[fileNames.length - 1]);
        },
      }));
    }

    if (customerData) {
      setState({
        ...file,
        customer_id: customerData.id,
      });
      setCustomerName(customerData.name);
    }

    if (projectData) {
      setState({
        ...file,
        customer_id: projectData.customer_id,
        project_id: projectData.id,
      });
      setCustomerName(projectData.customer_name);
      setProjectName(projectData.name);
    }
  });

  const handleClickDelete = useCallback(() => {
    setState({
      ...file,
      file: null,
      file_name: '',
      format: '',
    });
  }, [file]);

  return (
    mode && (
    <EditSP mode={mode} callback={handleClickPost}>
      <div className="edit_sp_body_inner file_edit_sp">
        <div className="category_wrap">

          <div className="item_wrap">
            <div className="item_label">
              顧客名
              <Required />
              <Button
                size="md"
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
            <div className="item_body">
              <Input
                value={customerName}
                disabled
                require
                validationList={ValidationLengthUnder60}
                touch={touch}
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">
              案件名
              <Button
                size="md"
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
            </div>
            <div className="item_body">
              <Input
                value={projectName}
                disabled
                validationList={ValidationLengthUnder40}
              />
            </div>
          </div>
        </div>

        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">
              ファイル名
              <Required />
            </div>
            <div className="item_body item_file_upload">
              <div>
                <Input
                  value={file?.file_name}
                  id="input"
                  onChange={(e) => setFile({
                    ...file,
                    file_name: e.target.value,
                  })}
                  require
                  validationList={ValidationLengthUnder50}
                  touch={touch}
                  className="mb_10"
                  disabled={!file.file}
                />
              </div>
              <div className="item_file_upload__buttons">
                <FileUploadButton
                  value=""
                  onChange={onFileInputChange}
                  accept={CommonCollection.acceptFile}
                  multiple
                />
                {file.file
                  && (
                  <Button
                    size="md"
                    color="dark"
                    className="ml_10"
                    onClick={handleClickDelete}
                  >削除
                  </Button>
                  )}
              </div>

            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">コメント</div>
            <div className="item_body">
              <TextArea
                rows={7}
                value={file?.comment}
                onChange={(e) => setState(
                  { ...file, comment: e.target.value },
                )}
                validationList={ValidationLengthUnder500}
              />
            </div>
          </div>
        </div>
      </div>
    </EditSP>
    )
  );
};
