import React, {
  useCallback, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep, isEqual } from 'lodash';
import { MaintenanceCollection } from '../../../../../collection/maintenance/maintenance.collection';
import { useDidMount } from '../../../../../hooks/life-cycle';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { MaintenanceActions } from '../../../../../redux/maintenance/maintenance.action';
import { MaintenanceEditState } from '../../../../../type/maintenance/maintenance.type';
import { Project, ProjectListType } from '../../../../../type/project/project.type';
import { DateFormatter } from '../../../../../utilities/date-formatter';
import { EditSP, EditType } from '../../../../dialogs/edit/edit.sp';
import { Button } from '../../../../ui/button/button';
import { RightLabelCheckbox } from '../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { DatePicker } from '../../../../ui/date-picker/date-picker';
import { Input } from '../../../../ui/input/input';
import { Required } from '../../../../ui/required/required';
import './maintenance-edit.sp.scss';
import { ProjectSearchBoxSP } from '../../project/search-box/project-search-box.sp';
import { State } from '../../../../../redux/root.reducer';
import { TextArea } from '../../../../ui/text-area/text-area';
import { ValidationLengthUnder255, ValidationLengthUnder500 } from '../../../../../model/validation';
import { MaintenanceValidation } from '../../../../../model/validation/maintenance/maintenance.validation';
import { ValidationDatePicker } from '../../../../../model/validation/validation-date-picker';
import { Customer } from '../../../../../type/customer/customer.type';

export type Props = {
  mode: EditType;
  id?: number;
  projectData?: Project;
  customerData?: Customer;
  callback?: () => void;
}

export const MaintenanceEditSP = (props: Props) => {
  const {
    mode, id, projectData, customerData, callback,
  } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => (state.maintenance.sort), isEqual);

  /* State */
  const [maintenance, setMaintenance] = useState(MaintenanceCollection.editInitialState);
  const [customerName, setCustomerName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [constructionDate, setConstructionDate] = useState('');
  // eslint-disable-next-line
  const [contractedDate, setContractedDate] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [touch, setTouch] = useState(false);

  /* Memo */
  const today = useMemo(() => new Date(), []);

  /* Callback */
  const setState = useCallback(
    (v: Partial<MaintenanceEditState>) => {
      setMaintenance({
        ...maintenance,
        ...v,
      });
    }, [maintenance],
  );

  const setProjectData = useCallback(
    (v: Project | ProjectListType) => {
      setCustomerName(v.customer_name);
      setCreatorName('テスト');
      setProjectName(v.name);
      setConstructionDate(DateFormatter.date2str(v.construction_date));
      setCompletionDate(DateFormatter.date2str(v.completion_date));
      setContractedDate(DateFormatter.date2str(v.contract_date));
      setState({
        customer_id: v.customer_id,
        project_id: v.id,
        lat: v.lat,
        lng: v.lng,
      });
    }, [setState],
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
  }, [today, customerName, projectName]);

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
          if (callback) {
            callback();
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
    [maintenance, sortState, id],
  );

  const handleClickProjectSearch = useCallback(
    (customer?: Customer) => {
      dispatch(DialogActions.push({
        title: '案件検索',
        onCloseClick: () => dispatch(DialogActions.clear()),
        element: <ProjectSearchBoxSP
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
          setCreatorName(v.project_representative_name);
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
    <EditSP mode={mode} callback={handleClickPost}>
      {/* edit_sp_body_inner は各画面の共通用 */}
      <div className="edit_sp_body_inner maintenance_edit_sp">
        <div className="category_wrap">

          <div className="item_wrap">
            <div className="item_label">
              顧客名<Required />
              <Button
                size="md"
                color="secondary"
                onClick={() => handleClickProjectSearch()}
              >
                案件検索
              </Button>
            </div>
            <div className="item_body">
              <Input
                value={customerName}
                disabled
                require
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_body item_maintenance">
              <div className="item_label">案件名<Required /></div>
              <Input
                value={projectName}
                disabled
                require
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_body item_maintenance">
              <div className="item_label">見積作成者<Required /></div>
              <Input
                value={creatorName}
                disabled
                require
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">
              <div style={{ flex: 1 }}>着工日</div>
              <div className="dummy_tilde_space" />
              <div style={{ flex: 1 }}>完工日</div>
            </div>
            <div className="item_body item_schedule">
              <Input
                value={constructionDate}
                disabled
                className="item_schedule__form"
              />
              <div className="item_schedule__tilde">〜</div>
              <Input
                value={completionDate}
                disabled
                require
                className="item_schedule__form"
              />
            </div>
          </div>
        </div>

        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_body maintenance_date">
              <DatePicker
                date={maintenance.maintenance_date || null}
                onChange={(v) => setState({ maintenance_date: v })}
                validationList={ValidationDatePicker}
                touch={touch}
                label="メンテナンス日"
                require
              />
              <div className="maintenance_date__buttons">
                <Button
                  size="md"
                  onClick={() => dateCalc('m', 1)}
                >
                  1ヶ月
                </Button>

                <Button
                  size="md"
                  onClick={() => dateCalc('m', 3)}
                >
                  3ヶ月
                </Button>

                <Button
                  size="md"
                  onClick={() => dateCalc('m', 6)}
                >
                  6ヶ月
                </Button>

                <Button
                  size="md"
                  onClick={() => dateCalc('y', 1)}
                >
                  1年
                </Button>

                <Button
                  size="md"
                  onClick={() => dateCalc('y', 2)}
                >
                  2年
                </Button>

                <Button
                  size="md"
                  onClick={() => dateCalc('y', 5)}
                >
                  5年
                </Button>

              </div>
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">タイトル<Required /></div>
            <div className="item_body">
              <Input
                value={maintenance?.title}
                onChange={(e) => setState({ title: e.target.value })}
                require
                validationList={ValidationLengthUnder255}
                touch={touch}
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">詳細内容</div>
            <div className="item_body full_width item_remarks">
              <TextArea
                rows={7}
                value={maintenance?.detail}
                onChange={(e) => setState({ detail: e.target.value })}
                validationList={ValidationLengthUnder500}
                touch={touch}
              />
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_label">対応日</div>
            <DatePicker
              date={maintenance.supported_date || null}
              onChange={(v) => setState({ supported_date: v })}
              validationList={ValidationDatePicker}
            />
          </div>

          <div className="item_wrap">
            <div className="item_label">対応内容</div>
            <div className="item_body full_width item_remarks">
              <TextArea
                rows={7}
                value={maintenance?.supported_content}
                onChange={(e) => setState({ supported_content: e.target.value })}
                validationList={ValidationLengthUnder500}
                touch={touch}
              />
            </div>
          </div>
        </div>

        {/* TODO 編集時に入れたis_handlingの値が変わらない */}
        <div className="category_wrap">
          <div className="item_wrap tags_form">
            <div className="item_body item_checkbox">
              <RightLabelCheckbox
                checked={Boolean(maintenance.is_fixed)}
                label="対応済みフラグ"
                onChange={() => setState({ is_fixed: maintenance.is_fixed ? 0 : 1 })}
                className="single_column"
              />
            </div>
          </div>
          {/* TODO 編集時に入れたis_handlingの値が変わらない */}
          <div className="item_wrap tags_form">
            <div className="item_body item_checkbox">
              <RightLabelCheckbox
                checked={Boolean(maintenance?.is_muko)}
                label="無効フラグ"
                onChange={() => setState({ is_muko: maintenance.is_muko === 1 ? 0 : 1 })}
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
