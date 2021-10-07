import { EditPC } from '../../../../../../dialogs/edit/edit.pc';
import { Input } from '../../../../../../ui/input/input';
import { Required } from '../../../../../../ui/required/required';
import { ValidationLengthUnder255 } from '../../../../../../../model/validation';
import { RightLabelCheckbox } from '../../../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
// import { IconButton } from '../../../../../../ui/button/icon-button/icon-button';

export const ProjectRankMasterEditDialog = () => {
  window.console.log();

  return (
    <EditPC mode="dialog">
      <div className="edit_pc_body_inner edit_master project_rank_master">
        <div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">案件見込みランク名<Required /></div>
              <Input
                className=""
                value=""
                onChange={() => {}}
                require
                validationList={ValidationLengthUnder255}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">略式表示<Required /></div>
              <Input
                className=""
                value=""
                onChange={() => {}}
                require
                validationList={ValidationLengthUnder255}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">背景色<Required /></div>
              <Input
                className=""
                value=""
                onChange={() => {}}
                require
                validationList={ValidationLengthUnder255}
              />
              {/* datepickerと同じようにinput内にアイコンの形にする  */}
              {/*
              <IconButton
                title="カラーピッカー"
                fontAwesomeClass="fas fa-eye-dropper"
                className="secondary"
                disabled
                onClick={() => {}}
              />
              */}
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">文字色<Required /></div>
              <Input
                className="color_picker"
                value=""
                onChange={() => {}}
                require
                validationList={ValidationLengthUnder255}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">有効フラグ</div>
              <RightLabelCheckbox
                label=""
                className="is_valid"
                onChange={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </EditPC>
  );
};
