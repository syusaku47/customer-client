import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DummyImg from '../../../../../asset/images/ei-picture.svg';
import { State } from '../../../../../redux/root.reducer';
import '../../info-tab-contents.sp.scss';
import { DateFormatter } from '../../../../../utilities/date-formatter';
import { splitStr } from '../../../../../utilities/split-str';

import { IconButton } from '../../../button/icon-button/icon-button';
import { openTel } from '../../../../../utilities/open-tel';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { SupportHistoryEditDialogTitle } from '../../../../sp/pages/support-history/edit/support-history-edit.type';
import { SupportHistoryEditSP } from '../../../../sp/pages/support-history/edit/support-history-edit.sp';
import { Project } from '../../../../../type/project/project.type';

export const ProjectInfoTabContentsSP = () => {
  /* Hook */
  const { project } = useSelector((state:State) => state.project);
  const dispatch = useDispatch();

  const dummyImg = useMemo(() => DummyImg, [DummyImg]);
  const handleClickTel = useCallback((tel: string | undefined) => {
    dispatch(DialogActions.pushMessage({
      title: '',
      message: [`${project?.customer_name}宛に電話をかけます`],
      label: 'はい',
      isCancel: true,
      cancelLabel: 'いいえ',
      callback: () => {
        dispatch(DialogActions.push({
          title: SupportHistoryEditDialogTitle.add,
          element: <SupportHistoryEditSP
            mode="add"
            projectData={project as Project}
          />,
        }));
        openTel({ tel: tel || '' });
      },
    }));
  }, [project]);
  /* Effect */

  /* TODO front 画像の有無判定お願いします。 */
  const imgSrc = '';
  return (
    <div className="detail_info_table row_table_style">
      {(!imgSrc || imgSrc === '')
        ? <></>
        : (
          <div style={{ height: '200px' }}>
            <img src={dummyImg} alt="" style={{ width: '100%', maxHeight: '200px' }} />
          </div>
        )}

      <div className="t_row">
        <div className="t_header">案件名</div>
        <div className="t_body">{project?.name || '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">案件ID</div>
        <div className="t_body">{project?.id || '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">顧客名</div>
        <div className="t_body">{project?.customer_name ? `${project?.customer_name} 様` : '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">顧客ID</div>
        <div className="t_body">{project?.customer_id || '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">顧客住所</div>
        <div className="t_body address">
          {`${project?.post_no ? `〒${project.post_no}` : '---'}`}<br />
          {project?.customer_place || '---'}
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">案件ランク</div>
        <div className="t_body">{project?.project_rank_name || '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">現場名称</div>
        <div className="t_body">{project?.field_name || '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">現場住所</div>
        <div className="t_body address">
          {project?.field_post_no ? `〒${project?.field_post_no}` : '---'}<br />
          {project?.field_place || '---'}
          {project?.field_building_name || '---'}
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">現場電話</div>
        <div className="t_body">{project?.field_tel_no || '---'}</div>
        <div>
          <IconButton
            fontAwesomeClass="fas fa-phone"
            onClick={() => handleClickTel(project?.field_tel_no)}
            size="md"
            color="secondary"
            disabled={!project?.field_tel_no}
          />
        </div>

      </div>

      <div className="t_row">
        <div className="t_header">現場FAX</div>
        <div className="t_body">{project?.field_fax_no || '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">案件担当店舗</div>
        <div className="t_body">{project?.project_store_name || '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">案件担当者</div>
        <div className="t_body">{project?.project_representative_name || '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">発生源</div>
        <div className="t_body">{project?.source_name || '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">工事部位</div>
        <div className="t_body">{splitStr(project?.construction_part_names) || '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">見込み金額</div>
        <div className="t_body">{project?.expected_amount || '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">契約番号</div>
        <div className="t_body">{project?.contract_no || '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">契約日</div>
        <div className="t_body">{project?.contract_date ? DateFormatter.date2str(project?.contract_date) : '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">受注工期（開始）</div>
        <div className="t_body">{project?.construction_period_start ? DateFormatter.date2str(project?.construction_period_start) : '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">受注工期（終了）</div>
        <div className="t_body">{project?.construction_period_end ? DateFormatter.date2str(project?.construction_period_end) : '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">着工予定日</div>
        <div className="t_body">{project?.construction_start_date ? DateFormatter.date2str(project?.construction_start_date) : '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">完工予定日</div>
        <div className="t_body">{project?.completion_end_date ? DateFormatter.date2str(project?.completion_end_date) : '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">着工日</div>
        <div className="t_body">{project?.construction_date ? DateFormatter.date2str(project?.construction_date) : '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">完工日</div>
        <div className="t_body">{project?.completion_date ? DateFormatter.date2str(project?.completion_date) : '---'}</div>
      </div>

      {/* TODO fukada, masuda 着工式、完工式のプロパティ追加お願いします。*/}
      <div className="t_row">
        <div className="t_header">着工式※TODO削除</div>
        <div className="t_body">{project?.construction_date ? DateFormatter.date2str(project?.construction_date) : '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">完工式※TODO削除</div>
        <div className="t_body">{project?.completion_date ? DateFormatter.date2str(project?.completion_date) : '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">完了日</div>
        <div className="t_body">{project?.complete_date ? DateFormatter.date2str(project?.complete_date) : '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">失注日</div>
        <div className="t_body">{project?.failure_date ? DateFormatter.date2str(project?.failure_date) : '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">失注理由</div>
        <div className="t_body">{project?.failure_cause_name || '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">備考</div>
        <div className="t_body">{project?.failure_remarks || '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">キャンセル日</div>
        <div className="t_body">{project?.cancel_date ? DateFormatter.date2str(project?.cancel_date) : '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">キャンセル理由</div>
        <div className="t_body">{project?.cancel_reason || '---'}</div>
      </div>
      {/*
      //★使用しない（2021/8/10）
      <div className="t_row">
        <div className="t_header">実行終了</div>
        //eslint-disable-next-line no-nested-ternary
        <div className="t_body">
        {project?.execution_end === undefined ? '---' : project?.execution_end ? '終了' : '未終了' }
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">最終原価１</div>
        <div className="t_body">{project?.order_detail1 ? `${project?.order_detail1}` : '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">最終原価２</div>
        <div className="t_body">{project?.order_detail2 || '---'}</div>
      </div>
      */}
    </div>
  );
};
