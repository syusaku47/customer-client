import './emplyee-master-edit-dialog.scss';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { IconButton } from '../../../../../../ui/button/icon-button/icon-button';
import { DialogActions } from '../../../../../../../redux/dialog/dialog.action';
import { MasterEditDialogProps } from '../../../master.type';
import { EditPC } from '../../../../../../dialogs/edit/edit.pc';
import { MasterActions } from '../../../../../../../redux/master/master.action';
import { Input } from '../../../../../../ui/input/input';
import { RightLabelCheckbox } from '../../../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { Required } from '../../../../../../ui/required/required';
import { LeftLabelInputField } from '../../../../../../ui/input-field/left-label-input-field/left-label-input-field';
import { useDidMount } from '../../../../../../../hooks/life-cycle';
import { ValidationLengthUnder255, ValidationLengthUnder8 } from '../../../../../../../model/validation';
import { ValidationPassword } from '../../../../../../../model/validation/validation-password';
import { ValidationMailAddress } from '../../../../../../../model/validation/validation-mail-address';
import { ValidationNumberLengthUnder14 } from '../../../../../../../model/validation/validation-number-length-under';
import { ValidationEisuzi } from '../../../../../../../model/validation/validation-eisuzi';
import { MasterEmployeeValidation } from '../../../../../../../model/validation/master/master-employee.validation';
import { Select } from '../../../../../../ui/select/select';
import { State } from '../../../../../../../redux/root.reducer';

export const EmployeeMasterEditDialog = (props: MasterEditDialogProps) => {
  const { id, callback } = props;
  window.console.log(id, callback);

  const dispatch = useDispatch();
  const storeList = useSelector((state:State) => state.master.storeList, isEqual);

  const [employeeCode, setEmployeeCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [store, setStore] = useState(NaN);
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [furigana, setFurigana] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [mailAddress, setMailAddress] = useState('');
  const [salesTarget, setSalesTarget] = useState('');
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [authority1, setAuthority1] = useState(false);
  const [authority4, setAuthority4] = useState(false);

  const [touch, setTouch] = useState(false);

  const handleClickPost = useCallback(() => {
    if (MasterEmployeeValidation(
      employeeCode,
      newPassword,
      passwordCheck,
      store,
      name,
      shortName,
      furigana,
      jobTitle,
      mailAddress,
      salesTarget,
    )) {
      dispatch(DialogActions.pushMessage({
        title: '?????? ???????????????',
        message: ['?????????????????????????????????????????????'],
        callback: () => setTouch(true),
      }));
      return;
    }

    dispatch(MasterActions.api.employee.post({
      param: {
        data: {
          employee_cd: employeeCode,
          new_password: newPassword,
          confirm_password: passwordCheck,
          store_id: store,
          name,
          short_name: shortName,
          furigana,
          job_title: jobTitle,
          mail_address: mailAddress,
          sales_target: salesTarget,
          is_delete: deleteFlag ? 1 : 0,
          authority1: authority1 ? 1 : 0,
          authority4: authority4 ? 1 : 0,
        },
        id,
      },
      onSuccess: () => {
        callback();
      },
      onError: () => {
        setTouch(true);
      },
    }));
    dispatch(DialogActions.pop());
  }, [
    employeeCode,
    newPassword,
    passwordCheck,
    store,
    name,
    shortName,
    furigana,
    jobTitle,
    mailAddress,
    salesTarget,
    deleteFlag,
    authority1,
    authority4,
    callback,
  ]);

  useDidMount(() => {
    if (id) {
      dispatch(MasterActions.api.employee.get({
        param: { id },
        onSuccess: (data) => {
          if (!data) return;
          setEmployeeCode(data.employee_cd);
          // setNewPassword(data)
          // setPasswordCheck(data)
          setStore(data.store_id);
          setName(data.name);
          setShortName(data.short_name);
          setFurigana(data.furigana);
          setJobTitle(data.job_title);
          setMailAddress(data.mail_address);
          setSalesTarget(data.sales_target);
          setDeleteFlag(data.is_delete);
          setAuthority1(data.authority1);
          setAuthority4(data.authority4);
        },
      }));
    }
  });

  return (
    <EditPC mode="dialog" callback={handleClickPost}>
      <div className="edit_pc_body_inner edit_master">
        <div className="left_box">
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">??????CD<Required /></div>
              <Input
                className=""
                require
                value={employeeCode}
                onChange={(e) => setEmployeeCode(e.target.value)}
                validationList={[
                  ...ValidationLengthUnder8,
                  ...ValidationEisuzi,
                ]}
                touch={touch}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">???????????????</div>
              <div className="password">
                ??????????????????????????????????????????????????????????????????
                <LeftLabelInputField
                  label="????????????????????????"
                  className="mt_10"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  validationList={ValidationPassword}
                />
                <LeftLabelInputField
                  label="?????????????????????"
                  className="mt_10"
                  value={passwordCheck}
                  onChange={(e) => setPasswordCheck(e.target.value)}
                  validationList={ValidationPassword}
                />
              </div>
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">??????<Required /></div>
              <Select
                className="add_text_left"
                value={store}
                onChange={(v) => setStore(Number(v))}
                defaultLabel="????????????"
                options={storeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
                require
                touch={touch}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">??????_??????<Required /></div>
              <Input
                className=""
                value={name}
                onChange={(e) => setName(e.target.value)}
                validationList={ValidationLengthUnder255}
                require
                touch={touch}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">??????_??????</div>
              <Input
                className=""
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
                validationList={ValidationLengthUnder255}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">??????_????????????</div>
              <Input
                className=""
                value={furigana}
                onChange={(e) => setFurigana(e.target.value)}
                validationList={ValidationLengthUnder255}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">??????</div>
              <Input
                className=""
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                validationList={ValidationLengthUnder255}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box max_width">
              <div className="item_head">?????????????????????<Required /></div>
              <Input
                className="large"
                value={mailAddress}
                type="email"
                onChange={(e) => setMailAddress(e.target.value)}
                validationList={ValidationMailAddress}
                require
                touch={touch}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">????????????</div>
              <Input
                className=""
                type="number"
                value={salesTarget}
                onChange={(e) => setSalesTarget(e.target.value)}
                validationList={ValidationNumberLengthUnder14}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">???????????????</div>
              <RightLabelCheckbox
                label=""
                className=""
                checked={deleteFlag}
                onChange={() => setDeleteFlag(!deleteFlag)}
              />
            </div>
          </div>
        </div>
        <div className="right_box">
          <div className="frame">
            <div className="item_wrap">
              <RightLabelCheckbox
                label="???????????????????????????"
                className=""
                checked={authority1}
                onChange={() => setAuthority1(!authority1)}
              />
              <IconButton
                title="?????????????????????????????????????????????????????????????????????"
                fontAwesomeClass="fas fa-question-circle"
                className=""
                onClick={() => {}}
              />
            </div>
            <div className="item_wrap">
              <RightLabelCheckbox
                label="???????????????????????????"
                className=""
                checked={authority4}
                onChange={() => setAuthority4(!authority4)}
              />
              <IconButton
                title="?????????????????????????????????????????????"
                fontAwesomeClass="fas fa-question-circle"
                className=""
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </EditPC>
  );
};
