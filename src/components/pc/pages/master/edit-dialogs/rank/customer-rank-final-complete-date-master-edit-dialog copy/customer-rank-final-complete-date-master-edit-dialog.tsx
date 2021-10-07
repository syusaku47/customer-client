import { EditPC } from '../../../../../../dialogs/edit/edit.pc';
import { Input } from '../../../../../../ui/input/input';
import { Required } from '../../../../../../ui/required/required';
import { ValidationLengthUnder255 } from '../../../../../../../model/validation';
import { RightLabelCheckbox } from '../../../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
// import { IconButton } from '../../../../../../ui/button/icon-button/icon-button';

export const CustomerRankFinalCompleteDateMasterEditDialog = () => {
  window.console.log();

  return (
    <EditPC mode="dialog">
      <div className="edit_pc_body_inner edit_master cusomer_rank_final_complete_date_master">
        <div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">顧客ランク（最終完工日）名<Required /></div>
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
              <div className="item_head">最終完工日数<Required /></div>
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
