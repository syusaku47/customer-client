import { push } from 'connected-react-router';
import {
  useState, useMemo, useCallback, /* , useEffect, */
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import { ProjectCollection } from '../../../../../../collection/project/project.collection';
import { State } from '../../../../../../redux/root.reducer';
import { RoutingPath } from '../../../../../../routes/routing-pass';
import { DisplayElements } from '../../../../../../type/display-elements.type';
import { ProjectListType } from '../../../../../../type/project/project.type';
import { Table } from '../../../../../ui/table/table';
import Ordered from '../../../../../../asset/images/icon/ordered.svg';
import Alert from '../../../../../../asset/images/icon/alert.svg';
import './project-list.pc.scss';
import { ProjectActions } from '../../../../../../redux/project/project.action';
import { DateFormatter } from '../../../../../../utilities/date-formatter';

type Props = {
  type?: 0 | 1 | 2 | 3;
  data?: ProjectListType[];
  handleCardClick?: (project: ProjectListType) => void;
  callbackSelect?: (projects: ProjectListType[]) => void;
  isMulti?: boolean;
}

export const ProjectListPC = (props: Props) => {
  const {
    type, data, handleCardClick, isMulti, callbackSelect,
  } = props;

  /* Hooks */
  const projectListData = useSelector((state: State) => state.project.list);
  const dispatch = useDispatch();

  /* State */
  const [projectHeader] = useState<DisplayElements[]>(ProjectCollection.header);
  const [selected, setSelected] = useState<number[]>([]);

  /* List */
  const projectList = useMemo(() => (
    !type ? projectListData : projectListData.filter(
      (v) => v.project_rank === type,
    )), [type, projectListData]);

  const dataList = useMemo(() => data || projectList, [projectListData, data]);

  const handleClickCard = useCallback((row: ProjectListType) => {
    if (handleCardClick) {
      const findData = data?.find((v) => v.id === row.id);
      if (findData) {
        handleCardClick(cloneDeep(findData));
      }
    }
    if (callbackSelect) {
      callbackSelect(cloneDeep([row]));
    }
    setSelected([dataList.findIndex((v) => v.id === row.id)]);
  }, [data, handleCardClick, dataList]);

  const handleDbClick = useCallback(
    (v:ProjectListType) => {
      if (handleCardClick) return;
      dispatch(push(`${RoutingPath.projectDetail}/${v.id}`));
    },
    [handleCardClick],
  );

  const handleClickHeader = useCallback((highlow:0 | 1, sort_by:number) => {
    dispatch(ProjectActions.setSort({ highlow, sort_by }));
  }, []);

  return (
    <section className="result_area list_area">
      <div className="inner">
        <div className="table_responsive">
          <Table
            className="table_selectable table_sortable table_sticky"
            header={projectHeader}
            selectedTr={selected}
            rowDataList={dataList}
            onClickRow={(v:ProjectListType) => handleClickCard(v)}
            onDbClick={(v:ProjectListType) => handleDbClick(v)}
            onClickMulti={isMulti ? (v: ProjectListType[]) => {
              if (callbackSelect) {
                callbackSelect(cloneDeep(v));
              }
              setSelected(v.map((v2) => dataList.findIndex((v3) => v3.id === v2.id)));
            } : undefined}
            sort={{ onClick: handleClickHeader }}
            lists={dataList.map((v) => (
              [
                v.order_flag ? <img src={Ordered} alt="受注された案件" title="受注された案件" className="icon" /> : '',
                v.alert_flag ? <img src={Alert} alt="案件作成から1週間以上経過" title="案件作成から1週間以上経過" className="icon" /> : '',
                v.id,
                v.field_name,
                <div className="rank_label" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>{v.customer_rank_name}</div>,
                <div className="rank_label" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>{v.project_rank}</div>,
                v.name,
                v.field_tel_no,
                v.field_place,
                DateFormatter.date2str(v.construction_start_date),
                DateFormatter.date2str(v.completion_end_date),
                DateFormatter.date2str(v.construction_date),
                DateFormatter.date2str(v.completion_date),
                v.contract_no,
                v.source_name,
                v.remarks,
                v.project_representative_name,
                DateFormatter.date2str(v.contract_date),
              ]
            ))}
            option={{
              stringWidth: [
                // { index: 0, width: 50 }, //受注された案件
                // { index: 1, width: 100 }, //案件作成から1週間以上経過
                // { index: 2, width: 50 }, // 案件ID
                { index: 3, width: 100 }, //  現場名称
                { index: 4, width: 100 }, // 顧客ランク
                { index: 5, width: 100 }, // 見込みランク
                // { index: 6, width: 50 }, // 案件名
                { index: 7, width: 100 }, // 現場電話番号
                // { index: 8, width: 50 }, // 現場住所
                { index: 9, width: 50 }, // 着工予定日
                { index: 10, width: 50 }, // 完工予定日
                { index: 11, width: 50 }, // 着工日
                { index: 12, width: 50 }, // 完工日
                // { index: 13, width: 50 }, // 契約番号
                // { index: 14, width: 50 }, // 発生源
                // { index: 15, width: 50 }, // 備考
                // { index: 16, width: 50 }, // 担当名
                { index: 17, width: 50 }, // 契約日
              ],
              tdAlign: [
                { index: 0, align: 'center' },
                { index: 1, align: 'center' },
                { index: 2, align: 'center' },
                { index: 3, align: 'left' },
                { index: 4, align: 'center' },
                { index: 5, align: 'center' },
                { index: 6, align: 'left' },
                { index: 7, align: 'left' },
                { index: 8, align: 'left' },
                { index: 9, align: 'left' },
                { index: 10, align: 'left' },
                { index: 11, align: 'left' },
                { index: 12, align: 'left' },
                { index: 13, align: 'left' },
                { index: 14, align: 'left' },
                { index: 15, align: 'left' },
                { index: 16, align: 'left' },
                { index: 17, align: 'left' },
              ],
            }}
          />
        </div>
      </div>
    </section>

  );
};
