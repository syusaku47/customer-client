import { push } from 'connected-react-router';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDidMount } from '../../../../../../hooks/life-cycle';
import { DialogActions } from '../../../../../../redux/dialog/dialog.action';
import { State } from '../../../../../../redux/root.reducer';
import { RoutingPath } from '../../../../../../routes/routing-pass';
import { FileListType } from '../../../../../../type/file/file.type';
import { FileCard } from '../../../../../ui/card/file/file-card';

type Props = {
  data?: FileListType[];
  handleCardClick?:(file: FileListType) => void;
}

export const FileListSP = (props: Props) => {
  const { data, handleCardClick } = props;

  /* Hooks */
  const fileListData = useSelector((state: State) => state.file.list);
  const dispatch = useDispatch();
  const [isInCustomerDetail, setIsInCustomerDetail] = useState(false);

  const handleClickCard = useCallback((id: number) => {
    if (handleCardClick) {
      const findData = data?.find((v) => v.id === id);
      if (findData) handleCardClick(findData);
      dispatch(DialogActions.pop());
      dispatch(DialogActions.pop());
      return;
    }
    dispatch(push(`${RoutingPath.fileDetail}/${id}/file`));
  }, [data]);

  useDidMount(() => {
    const arr = window.location.href.split('customer/detail');
    setIsInCustomerDetail(arr.length >= 2);
  });

  return (
    <div className="list_base">
      {data ? data.map((v, i) => (
        <div key={`card${i}`} className="list_base_card_wrap">
          <FileCard
            fileData={v}
            onClick={handleClickCard}
            isInCustomerDetail={isInCustomerDetail}
          />
        </div>
      )) : fileListData.map((v, i) => (
        <div key={`card${i}`} className="list_base_card_wrap">
          <FileCard
            fileData={v}
            onClick={handleClickCard}
            isInCustomerDetail={isInCustomerDetail}
          />
        </div>
      ))}
    </div>
  );
};
