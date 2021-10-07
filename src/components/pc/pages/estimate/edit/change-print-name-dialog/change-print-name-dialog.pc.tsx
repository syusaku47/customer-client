import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { EditPC } from '../../../../../dialogs/edit/edit.pc';
// import { DialogActions } from '../../../../../../redux/dialog/dialog.action';
import { EstimateActions } from '../../../../../../redux/estimate/estimate.action';
import { Input } from '../../../../../ui/input/input';

type Props = {
  id: number;
  meisaiId?: number;
  name: string;
  printName: string;
  callback: () => void;
  isTree?: boolean;
  category?: number;
  sub_category?: number;
}

export const ChangePrintNameDialogPC = (props: Props) => {
  const {
    id, name, printName, meisaiId, callback, isTree, category, sub_category,
  } = props;

  /* Hooks */
  const dispatch = useDispatch();

  /* State */
  const [afterPrintName, setAfterPrintName] = useState(printName);

  /* Callback */
  const handleClickSave = useCallback(
    () => {
      if (isTree) {
        if (!meisaiId) return;
        dispatch(EstimateActions.api.meisai.printName({
          param: {
            data: {
              print_name: afterPrintName,
              category,
              sub_category,
            },
            id,
            meisai_id: meisaiId,
          },
          onSuccess: () => callback(),
        }));
        return;
      }
      if (!meisaiId) return;
      dispatch(EstimateActions.api.meisai.printName({
        param: {
          data: {
            print_name: afterPrintName,
          },
          id,
          meisai_id: meisaiId,
        },
        onSuccess: () => callback(),
      }));
      // dispatch(DialogActions.pushMessage({
      //   title: '',
      //   message: ['変更が完了しました'],
      //   callback: () => {
      //     dispatch(DialogActions.pop());
      //   },
      // }));
    },
    [id, afterPrintName, meisaiId, isTree, category, sub_category],
  );

  return (
    <EditPC
      mode="dialog"
      callback={handleClickSave}
    >
      <div className="ChangePrintNameDialogPC">
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">表示名</div>
            <Input
              label=""
              value={name}
              disabled
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">印刷名</div>
            <Input
              label=""
              value={afterPrintName}
              onChange={(e) => setAfterPrintName(e.target.value)}
            />
          </div>
        </div>
      </div>
    </EditPC>
  );
};
