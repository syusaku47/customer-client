import React, {
  useCallback, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep, isEqual } from 'lodash';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { EditType } from '../../../../dialogs/edit/edit.sp';
import { Button } from '../../../../ui/button/button';
import { RightLabelCheckbox } from '../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { DatePicker } from '../../../../ui/date-picker/date-picker';
import './maintenance-edit.pc.scss';
import { useDidMount } from '../../../../../hooks/life-cycle';
import { MaintenanceCollection } from '../../../../../collection/maintenance/maintenance.collection';
import { MaintenanceActions } from '../../../../../redux/maintenance/maintenance.action';
import { EditPC } from '../../../../dialogs/edit/edit.pc';
import { Project, ProjectListType } from '../../../../../type/project/project.type';
import { Input } from '../../../../ui/input/input';
import { DateFormatter } from '../../../../../utilities/date-formatter';
import { ProjectSearch } from '../../../layout/search-box/project/project-search/project-search';
import { Required } from '../../../../ui/required/required';
import { State } from '../../../../../redux/root.reducer';
import { TextArea } from '../../../../ui/text-area/text-area';
import { Checkbox } from '../../../../ui/checkbox/checkbox';
import { ValidationLengthUnder255, ValidationLengthUnder500 } from '../../../../../model/validation';
import { MaintenanceValidation } from '../../../../../model/validation/maintenance/maintenance.validation';
import { ValidationDatePicker } from '../../../../../model/validation/validation-date-picker';
import { Customer } from '../../../../../type/customer/customer.type';

type Props = {
  mode: EditType;
  id?: number;
  projectData?: Project;
  customerData?: Customer;
  callbackGetList?: () => void;
}

export const MaintenanceEditPC = (props: Props) => {
  const {
    mode, id, projectData, customerData, callbackGetList,
  } = props;
  const sortState = useSelector((state: State) => (state.maintenance.sort), isEqual);

  /* Hooks */
  const dispatch = useDispatch();

  /* State */
  const [maintenance, setMaintenance] = useState(MaintenanceCollection.editInitialState);
  const [projectName, setProjectName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [constructionDate, setConstructionDate] = useState('');
  const [contractedDate, setContractedDate] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [touch, setTouch] = useState(false);

  /* Memo */
  const today = useMemo(() => new Date(), []);

  /* Callback */
  const setProjectData = useCallback(
    (v: Project | ProjectListType) => {
      setProjectName(v.name);
      setCustomerName(v.customer_name);
      setConstructionDate(DateFormatter.date2str(v.construction_date));
      setCompletionDate(DateFormatter.date2str(v.completion_date));
      setContractedDate(DateFormatter.date2str(v.contract_date));
      setMaintenance({
        ...cloneDeep(maintenance),
        customer_id: v.customer_id,
        project_id: v.id,
        lat: v.lat,
        lng: v.lng,
      });
    }, [maintenance],
  );

  const dateCalc = useCallback((ym:'y' | 'm', after:number) => {
    const afterDate = cloneDeep(today);
    if (ym === 'm') {
      afterDate.setMonth(afterDate.getMonth() + after);
    } else {
      afterDate.setFullYear(afterDate.getFullYear() + after);
    }
    const calcMonth = ym === 'y' ? after * 24 : after;
    setMaintenance({
      ...maintenance,
      title: `${customerName}様<${projectName}> ${calcMonth}ヶ月後メンテ`,
      maintenance_date: afterDate,
    });
  }, [today, maintenance, customerName, projectName]);

  const handleClickPost = useCallback(
    () => {
      if (MaintenanceValidation(maintenance)) {
        dispatch(DialogActions.pushMessage({
          title: 'メンテナンス情報入力',
          message: ['未入力／入力不備項目があります'],
          callback: () => setTouch(true),
        }));
        return;
      }
      /* 保存API */
      dispatch(MaintenanceActions.api.maintenance.post({
        param: {
          data: {
            customer_id: maintenance.customer_id,
            project_id: maintenance.project_id,
            title: maintenance.title,
            detail: maintenance.detail,
            supported_content: maintenance.supported_content,
            maintenance_date: DateFormatter.date2str(maintenance.maintenance_date),
            supported_date: DateFormatter.date2str(maintenance.supported_date),
            is_fixed: maintenance.is_fixed ? 1 : 0,
            is_muko: maintenance.is_muko ? 1 : 0,
            lat: maintenance.lat,
            lng: maintenance.lng,
          },
          id,
        },
        onSuccess: () => {
          if (callbackGetList) {
            callbackGetList();
            return;
          }
          dispatch(MaintenanceActions.api.maintenance.getList({
            param: {
              ...sortState,
              maintenance_date: DateFormatter.date2str(sortState.maintenance_date),
              maintenance_date_start: DateFormatter.date2str(sortState.maintenance_date_start),
              maintenance_date_end: DateFormatter.date2str(sortState.maintenance_date_end),
              completion_date_start: DateFormatter.date2str(sortState.completion_date_start),
              completion_date_end: DateFormatter.date2str(sortState.completion_date_end),
              construction_date: DateFormatter.date2str(sortState.construction_date),
              completion_date: DateFormatter.date2str(sortState.completion_date),
              supported_date: DateFormatter.date2str(sortState.supported_date),
              is_muko: sortState.is_muko ? 1 : 0,
            },
          }));
        },
        onError: () => {
          setTouch(true);
        },
      }));
    },
    [maintenance, id, sortState],
  );

  const handleClickProjectSearch = useCallback(
    (customer?: Customer) => {
      dispatch(DialogActions.push({
        title: '案件検索',
        className: 'max_height_dialog max_width_dialog search_dialog',
        onCloseClick: () => dispatch(DialogActions.pop()),
        element: <ProjectSearch
          callback={setProjectData}
          customerData={customer}
        />,
      }));
    }, [setProjectData],
  );

  /* Effect */
  useDidMount(() => {
    if (mode === 'add' && projectData) {
      setProjectData(projectData);
      return;
    }
    if (mode === 'add' && customerData) {
      handleClickProjectSearch(customerData);
      return;
    }
    if (mode === 'add') {
      handleClickProjectSearch();
      return;
    }
    if (mode === 'update' && id) {
      dispatch(MaintenanceActions.api.maintenance.get({
        param: { id },
        callback: (v) => {
          setConstructionDate(v.construction_date);
          setCompletionDate(v.completion_date);
          setProjectName(v.project_name);
          setCustomerName(v.customer_name);
          setMaintenance({
            ...v,
            maintenance_date: v.maintenance_date ? new Date(v.maintenance_date) : null,
            supported_date: v.supported_date ? new Date(v.supported_date) : null,
            is_fixed: v.fixed_flag ? 1 : 0,
            is_muko: v.is_muko ? 1 : 0,
          });
        },
      }));
    }
  });

  return (
    mode && (
    <EditPC mode="dialog" callback={handleClickPost}>
      <div className="">
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">案件名<Required /></div>
            <Input
              value={projectName}
              require
              disabled
            />
            <Button
              size="sm"
              color="secondary"
              className="ml_10 py_0"
              onClick={() => handleClickProjectSearch()}
            >
              案件参照
            </Button>
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">契約日</div>
            <Input value={DateFormatter.date2str(contractedDate)} disabled />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">着工日</div>
            <Input value={DateFormatter.date2str(constructionDate)} disabled />
            <label className="ml_10">〜</label>
            <div className="item_head">完工日</div>
            <Input value={DateFormatter.date2str(completionDate)} disabled />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box item_maintenance">
            <div className="item_head">メンテナンス日<Required /></div>
            <DatePicker
              date={maintenance.maintenance_date}
              onChange={(v) => setMaintenance(
                { ...maintenance, maintenance_date: v },
              )}
              require
              validationList={ValidationDatePicker}
              touch={touch}
            />
            <Button
              size="sm"
              color="secondary"
              className="ml_10"
              onClick={() => dateCalc('m', 1)}
            >
              1ヶ月
            </Button>
            <Button
              size="sm"
              color="secondary"
              className="ml_10"
              onClick={() => dateCalc('m', 3)}
            >
              3ヶ月
            </Button>
            <Button
              size="sm"
              color="secondary"
              className="ml_10"
              onClick={() => dateCalc('m', 6)}
            >
              6ヶ月
            </Button>
            <Button
              size="sm"
              color="secondary"
              className="ml_10"
              onClick={() => dateCalc('y', 1)}
            >
              1年
            </Button>
            <Button
              size="sm"
              color="secondary"
              className="ml_10"
              onClick={() => dateCalc('y', 2)}
            >
              2年
            </Button>
            <Button
              size="sm"
              color="secondary"
              className="ml_10"
              onClick={() => dateCalc('y', 5)}
            >
              5年
            </Button>
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box large">
            <div className="item_head">タイトル<Required /></div>
            <Input
              className="large"
              value={maintenance?.title}
              onChange={(e) => setMaintenance({
                ...maintenance,
                title: e.target.value,
              })}
              require
              validationList={ValidationLengthUnder255}
              touch={touch}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box large">
            <div className="item_head">詳細内容</div>
            <TextArea
              className="large"
              rows={7}
              value={maintenance?.detail}
              onChange={(e) => setMaintenance({
                ...maintenance,
                detail: e.target.value,
              })}
              validationList={ValidationLengthUnder500}
              touch={touch}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">対応日</div>
            <DatePicker
              date={maintenance?.supported_date || null}
              onChange={(v) => setMaintenance({
                ...maintenance,
                supported_date: v,
              })}
              validationList={ValidationDatePicker}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box large">
            <div className="item_head">対応内容</div>
            <TextArea
              className="large"
              rows={7}
              value={maintenance?.supported_content}
              onChange={(e) => setMaintenance({
                ...maintenance,
                supported_content: e.target.value,
              })}
              validationList={ValidationLengthUnder500}
              touch={touch}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box large">
            <div className="item_head">対応済みフラグ</div>
            <RightLabelCheckbox
              checked={Boolean(maintenance?.is_fixed)}
              label=""
              onChange={() => setMaintenance({
                ...maintenance,
                is_fixed: maintenance.is_fixed ? 0 : 1,
              })}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box large">
            <div className="item_head">無効フラグ</div>
            <Checkbox
              checked={Boolean(maintenance?.is_muko)}
              onChange={() => setMaintenance({
                ...maintenance,
                is_muko: maintenance.is_muko ? 0 : 1,
              })}
            />
          </div>
        </div>
      </div>

    </EditPC>
    )
  );
};
