import React, {
  useCallback, useState,
} from 'react';
import { cloneDeep } from 'lodash';
import { useDispatch } from 'react-redux';
import { EditType } from '../../../../dialogs/edit/edit.sp';
import { Button } from '../../../../ui/button/button';
import './file-edit.pc.scss';
import { useDidMount } from '../../../../../hooks/life-cycle';
import { EditPC } from '../../../../dialogs/edit/edit.pc';
import { FileEditState } from '../../../../../type/file/file.type';
import { FileCollection } from '../../../../../collection/file/file.collection';
import { FileActions } from '../../../../../redux/file/file.action';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { CustomerSearch } from '../../../layout/search-box/customer/customer-search/customer-search';
import { Customer, CustomerListType } from '../../../../../type/customer/customer.type';
import { Project, ProjectListType } from '../../../../../type/project/project.type';
import { Input } from '../../../../ui/input/input';
import { Required } from '../../../../ui/required/required';
import { TextArea } from '../../../../ui/text-area/text-area';
import { ProjectSearch } from '../../../layout/search-box/project/project-search/project-search';
import { FileValidation } from '../../../../../model/validation/file/file.validation';
import { FileUploadButton } from '../../../../ui/file-upload/file-upload-button';
import { convertFileList2FileArray } from '../../../../../utilities/convert2files';
import { RegistrationAddressMapDialogPC } from '../../../../ui/map/registration-address-map-dialog/pc/registration-address-map-dialog.pc';
import { ValidationLengthUnder50, ValidationLengthUnder500, ValidationLengthUnder60 } from '../../../../../model/validation';
import { CommonCollection } from '../../../../../collection/common/common.collection';
import { IconButton } from '../../../../ui/button/icon-button/icon-button';

type Props = {
  mode: EditType;
  customerData?: Customer;
  projectData?: Project;
  id?: number;
  callbackGetList: () => void;
}

export const createFileName = (target: string | undefined, fileType: string | undefined) => {
  if (!target || !fileType) return '';
  const isMatch = target.match(`.${fileType}`);
  if (isMatch) return target;
  return `${target}.${fileType}`;
};

export const FileEditPC = (props: Props) => {
  const {
    mode, customerData, id, projectData, callbackGetList,
  } = props;

  /* Hooks */
  const dispatch = useDispatch();

  /* State */
  const [file, setFile] = useState<FileEditState>(FileCollection.editInitialState);
  const [fileType, setFileType] = useState('');
  const [touch, setTouch] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [projectName, setProjectName] = useState('');

  /* Callback */
  const setState = useCallback((v: FileEditState) => setFile(v), [file]);

  const handleClickPost = useCallback(() => {
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
      onSuccess: callbackGetList,
      onError: () => setTouch(true),
    }));
  },
  [file, id, callbackGetList, fileType]);

  console.log(file.file_name);

  const handleClickCustomerSearch = useCallback(() => {
    dispatch(DialogActions.push({
      title: '顧客検索',
      className: 'max_height_dialog',
      element: <CustomerSearch
        callback={(data) => {
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
  }, [file, projectName]);

  const handleClickProjectSearch = useCallback(() => {
    dispatch(DialogActions.push({
      title: '案件検索',
      className: 'max_height_dialog max_width_dialog search_dialog',
      element: <ProjectSearch
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
  }, [file]);

  const onFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList?.length) {
      const fileData = convertFileList2FileArray(fileList)[0];
      const fileNames = fileData.name.split('.');
      setFileType(fileNames[fileNames.length - 1]);

      /* TODO ファイル拡張子に対してもバリデーションをかける */
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
        element: <RegistrationAddressMapDialogPC
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

  const handleClickDownload = useCallback(() => {
    dispatch(FileActions.api.file.download({ file_id: Number(id) }));
  }, []);

  const handleClickDelete = useCallback(() => {
    dispatch(DialogActions.pushMessage({
      title: 'ファイル削除',
      message: ['削除しますか'],
      isCancel: true,
      callback: () => {
        dispatch(FileActions.api.file.delete({
          param: { id: Number(id) },
          callback: callbackGetList,
        }));
      },
    }));
  }, [callbackGetList]);

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

  return (
    mode && (
      <EditPC
        mode="dialog"
        callback={handleClickPost}
        buttonArea={mode === 'update' ? (
          <>
            <Button
              size="md"
              color="primary"
              onClick={handleClickPost}
            >
              更新
            </Button>
            <Button
              size="md"
              color="primary"
              onClick={handleClickDownload}
            >
              ダウンロード
            </Button>
            <Button
              size="md"
              color="primary"
              onClick={handleClickDelete}
            >
              削除
            </Button>
          </>
        ) : undefined}
      >
        {/* edit_sp_body_inner は各画面の共通用 */}
        <div className="">
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">顧客名<Required /></div>
              <Input
                value={customerName}
                disabled
                errorPosBottom
                require
                validationList={ValidationLengthUnder60}
                touch={touch}
              />
              <Button
                size="sm"
                color="secondary"
                className="ml_10"
                onClick={handleClickCustomerSearch}
              >
                顧客参照
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
                value={projectName}
                disabled
                validationList={ValidationLengthUnder60}
              />
              <Button
                size="sm"
                color="secondary"
                className="ml_10"
                onClick={handleClickProjectSearch}
              >
                案件参照
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
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">ファイル名<Required /></div>
              <Input
                className="mr_10"
                value={file?.file_name}
                onChange={(e) => setState({ ...file, file_name: e.target.value })}
                require
                validationList={ValidationLengthUnder50}
                touch={touch}
                disabled={!file.file}
              />
              <FileUploadButton
                value=""
                onChange={onFileInputChange}
                accept={CommonCollection.acceptFile}
                multiple
              />
              <IconButton
                title="【1回でアップロード可能なデータサイズ】&#013;100MB &#013;&#013;【アップロード可能な拡張子】 &#013;xlsx,xls,doc,docx,ppt,pptx,pdf, &#013;jpg,png,jpeg,png,gif,svg, &#013;mp4,m4a,avi,mov,wmv,flv,mkv,mpg,mpg,webm, &#013;wave,aif,mp3,aac,flac, &#013;zip"
                fontAwesomeClass="fas fa-question-circle"
                className="btn_tips"
                onClick={() => { }}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box large">
              <div className="item_head">コメント</div>
              <TextArea
                rows={7}
                className="large"
                value={file?.comment}
                onChange={(e) => setState(
                  { ...file, comment: e.target.value },
                )}
                validationList={ValidationLengthUnder500}
              />
            </div>
          </div>
        </div>
      </EditPC>
    )
  );
};
