import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { Button } from '../../../../ui/button/button';
import { EstimateEditDialogTitle } from '../../estimate/edit/estimate-edit.type.sp';
import './estimate-detail-info.sp.scss';
import { EstimateActions } from '../../../../../redux/estimate/estimate.action';
import { State } from '../../../../../redux/root.reducer';
import { EstimateDetailEditSP } from '../edit/estimate-detail-edit.sp';

type Props = {
  id: number;
  meisaiId: number;
}

export const EstimateDetailInfoSP = (props:Props) => {
  const { meisaiId, id } = props;

  /* Hook */
  const meisai = useSelector((state:State) => state.estimate.meisai);
  const dispatch = useDispatch();

  /* Hook */
  useEffect(() => {
    dispatch(EstimateActions.api.meisai.get({
      param: {
        id,
        meisai_id: meisaiId,
      },
    }));
    return () => {
      dispatch(EstimateActions.setMeisai(null));
    };
  }, [meisaiId]);

  return (
    <>
      <div className="estimate_detail_info_sp base_dialog_content_inner_body">
        <div className="row_table_style">
          <div className="t_row">
            <div className="t_header">商品区分</div>
            <div className="t_body">{meisai?.item_kubun_name}</div>
          </div>
          <div className="t_row">
            <div className="t_header">大分類</div>
            <div className="t_body">{meisai?.category_name}</div>
          </div>
          <div className="t_row">
            <div className="t_header">中分類</div>
            <div className="t_body">{meisai?.sub_category_name}</div>
          </div>
          <div className="t_row">
            <div className="t_header">工事・<br />資材名</div>
            <div className="t_body">{meisai?.construction_materials_name}</div>
          </div>
          <div className="t_row">
            <div className="t_header">規格</div>
            <div className="t_body">{meisai?.standard}</div>
          </div>
          <div className="t_row">
            <div className="t_header">数量</div>
            <div className="t_body">{meisai?.quantity}</div>
          </div>
          <div className="t_row">
            <div className="t_header">単位</div>
            <div className="t_body">{meisai?.unit_name}</div>
          </div>
          <div className="t_row">
            <div className="t_header">見積単価</div>
            <div className="t_body">¥{meisai?.quote_unit_price.toLocaleString()}</div>
          </div>
          <div className="t_row">
            <div className="t_header">原価</div>
            <div className="t_body">¥{meisai?.prime_cost.toLocaleString()}</div>
          </div>
        </div>
      </div>
      <div className="base_dialog_content_inner_footer">
        <Button
          size="md"
          color="secondary"
          className="item_btn_right"
          onClick={() => {
            dispatch(DialogActions.push({
              title: EstimateEditDialogTitle.update,
              element: <EstimateDetailEditSP
                estimateId={Number(id)}
                callback={() => {
                  dispatch(EstimateActions.api.meisai.getList({
                    param: {
                      id: Number(id),
                    },
                  }));
                }}
                data={meisai || undefined}
              />,
            }));
          }}
        >編集
        </Button>

        <Button
          size="md"
          color="dark"
          className="item_btn_right"
          onClick={() => {
            dispatch(DialogActions.pop());
          }}
        >戻る
        </Button>
      </div>
    </>
  );
};
