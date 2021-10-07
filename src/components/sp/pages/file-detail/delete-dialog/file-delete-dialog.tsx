import { useDispatch } from 'react-redux';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { Button } from '../../../../ui/button/button';
import './file-delete-dialog.scss';

type Props = {
  fileName: string;
  callbackOK: ()=>void
}

export const FileDeleteDialog = (props: Props) => {
  const dispatch = useDispatch();
  const { fileName, callbackOK } = props;

  return (
    <div className="file_delete_dialog">
      <div className="file_delete_dialog__body">
        {fileName}を削除します。<br />
        よろしいですか？
      </div>
      <div className="file_delete_dialog__footer">
        <Button color="primary" size="md" onClick={callbackOK}>OK</Button>
        <Button color="dark" size="md" onClick={() => dispatch(DialogActions.pop())}>キャンセル</Button>
      </div>
    </div>
  );
};
