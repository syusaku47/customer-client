import React from 'react';
import { useDispatch } from 'react-redux';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { EditPriceAreaState } from '../../../../../type/estimate/estimate.type';
import { MathHelper } from '../../../../../utilities/math-helper';
import { Button } from '../../../../ui/button/button';
import { Input } from '../../../../ui/input/input';
import './detail-price-edit.sp.scss';

type Props = {
  priceArea: EditPriceAreaState
}

export const DetailPriceEditSP = (props:Props) => {
  const { priceArea } = props;

  /* Hook */
  const dispatch = useDispatch();

  return (
    <>
      <div className="base_dialog_content_inner_body detail_price_edit_sp">
        <div className="row_table_style">
          <div className="t_row">
            <div className="t_header">見積金額</div>
            <div className="t_body">
              <Input
                value={MathHelper.localStr(priceArea.estimate_price)}
                disabled
              />
            </div>
          </div>
          <div className="t_row">
            <div className="t_header">見積合計</div>
            <div className="t_body">
              <Input
                value={MathHelper.localStr(priceArea.estimate_total_price)}
                disabled
              />
            </div>
          </div>
          <div className="t_row">
            <div className="t_header">消費税額</div>
            <div className="t_body">
              <Input
                value={MathHelper.localStr(priceArea.estimate_tax)}
                disabled
              />
            </div>
          </div>
          <div className="t_row">
            <div className="t_header">税込合計<br />見積金額</div>
            <div className="t_body">
              <Input
                value={MathHelper.localStr(priceArea.estimate_total_price_tax_in)}
                disabled
              />
            </div>
          </div>
          <div className="t_row">
            <div className="t_header">調整金額<br />(値引き)</div>
            <div className="t_body">
              <Input value={MathHelper.localStr(priceArea.adjustment_amount)} />
            </div>
          </div>
          <div className="t_row">
            <div className="t_header">原価金額</div>
            <div className="t_body">
              <Input
                value={MathHelper.localStr(priceArea.genka_price)}
                disabled
              />
            </div>
          </div>
          <div className="t_row">
            <div className="t_header">原価合計</div>
            <div className="t_body">
              <Input
                value={MathHelper.localStr(priceArea.genka_total_price)}
                disabled
              />
            </div>
          </div>
          <div className="t_row">
            <div className="t_header">消費税額</div>
            <div className="t_body">
              <Input
                value={MathHelper.localStr(priceArea.genka_tax)}
                disabled
              />
            </div>
          </div>
          <div className="t_row">
            <div className="t_header">税込合計<br />原価金額</div>
            <div className="t_body">
              <Input
                value={MathHelper.localStr(priceArea.genka_total_price_tax_in)}
                disabled
              />
            </div>
          </div>
          <div className="t_row">
            <div className="t_header">粗利金額</div>
            <div className="t_body">
              <Input
                value={MathHelper.localStr(priceArea.arari_price)}
                disabled
              />
            </div>
          </div>
          <div className="t_row">
            <div className="t_header">粗利率</div>
            <div className="t_body">
              <Input
                value={MathHelper.localStr(priceArea.arari_percent)}
                disabled
              />
            </div>
          </div>
          <div className="t_row genba_support_price">
            <div className="t_header">現場協力費</div>
            <div className="t_body">
              <div>
                <span>見積</span>
                <Input
                  value={MathHelper.localStr(priceArea.genba_estimate_price)}
                  disabled
                />
                <Input
                  value={MathHelper.localStr(priceArea.field_cost_quote)}
                  disabled
                />
                <span>％</span>
              </div>
              <div>
                <span>原価</span>
                <Input
                  value={MathHelper.localStr(priceArea.genba_genka_price)}
                  disabled
                />
                <Input
                  value={MathHelper.localStr(priceArea.field_cost)}
                  disabled
                />
                <span>％</span>
              </div>
            </div>
          </div>
          <div className="t_row yobi_genka">
            <div className="t_header">予備原価</div>
            <div className="t_body">
              <div>
                <span>見積</span>
                <Input
                  value={MathHelper.localStr(priceArea.yobi_estimate_price)}
                  disabled
                />
                <Input
                  value={MathHelper.localStr(priceArea.call_cost_quote)}
                  disabled
                />
                <span>％</span>
              </div>
              <div>
                <span>原価</span>
                <Input
                  value={MathHelper.localStr(priceArea.yobi_genka_price)}
                  disabled
                />
                <Input
                  value={MathHelper.localStr(priceArea.call_cost)}
                  disabled
                />
                <span>％</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="base_dialog_content_inner_footer">
        <Button
          size="md"
          color="secondary"
          className="item_btn_right"
          onClick={() => {
            /* TODO front 更新処理の追加お願いいたします。 */
            dispatch(DialogActions.pop());
          }}
        >更新
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
