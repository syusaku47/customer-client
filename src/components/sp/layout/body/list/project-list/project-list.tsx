import { push } from 'connected-react-router';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDidMount } from '../../../../../../hooks/life-cycle';
import { DialogActions } from '../../../../../../redux/dialog/dialog.action';
import { State } from '../../../../../../redux/root.reducer';
import { RoutingPath } from '../../../../../../routes/routing-pass';
import { ProjectListType, ProjectShowType } from '../../../../../../type/project/project.type';
import { ProjectCard } from '../../../../../ui/card/project/project-card';

type Props = {
  type?: ProjectShowType;
  data?: ProjectListType[];
  handleCardClick?:(project: ProjectListType) => void;
}

export const ProjectListSP = (props: Props) => {
  const {
    type, data, handleCardClick,
  } = props;

  /* Hooks */
  const projectListData = useSelector((state: State) => state.project.list);
  const dispatch = useDispatch();
  const [isInCustomerDetail, setIsInCustomerDetail] = useState(false);

  /* List */
  const projectList = useMemo(() => {
    const list = data || projectListData;
    return type ? list.filter((v) => v.koji_flag === type) : list;
  }, [type, projectListData, data]);

  const handleClickCard = useCallback((id: number) => {
    if (handleCardClick) {
      const findData = data?.find((v) => v.id === id);
      if (findData) handleCardClick(findData);
      dispatch(DialogActions.pop());
      return;
    }
    dispatch(push(`${RoutingPath.projectDetail}/${id}/project`));
  }, [data]);

  useDidMount(() => {
    const arr = window.location.href.split('customer/detail');
    setIsInCustomerDetail(arr.length >= 2);
  });

  return (
    <div className="list_base">
      {data ? data.map((v, i) => (
        <div key={`card${i}`} className="list_base_card_wrap">
          <ProjectCard
            projectData={v}
            onClick={handleClickCard}
            isInCustomerDetail={isInCustomerDetail}
            index={i}
          />
        </div>
      )) : projectList.map((v, i) => (
        <div key={`card${i}`} className="list_base_card_wrap">
          <ProjectCard
            projectData={v}
            onClick={handleClickCard}
            isInCustomerDetail={isInCustomerDetail}
            index={i}
          />
        </div>
      ))}
    </div>
  );
};
