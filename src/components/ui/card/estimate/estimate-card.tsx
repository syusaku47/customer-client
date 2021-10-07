import cloneDeep from 'lodash/cloneDeep';
import { EstimateListType } from '../../../../type/estimate/estimate.type';
import { DateFormatter } from '../../../../utilities/date-formatter';
import { MathHelper } from '../../../../utilities/math-helper';
import { UserAgent } from '../../../../utilities/user-agent';
import './estimate-card.scss';

type Props = {
  data: EstimateListType,
  className?: string,
  callback:(data:EstimateListType)=>void,
}

export const EstimateCard = (props: Props) => {
  const { data, className, callback } = props;

  return (
    <div
      className={`estimate_card ${UserAgent} card_base ${className || ''}`}
      onClick={() => callback(cloneDeep(data))}
    >
      <div className="card_base_row">
        <div>
          <div className="card_info_item">
            <div className="card_info_item__head">
              案件名
            </div>
            <div className="card_info_item__text emphasis">
              {data.project_name || '---'}
            </div>
          </div>

          <div className="card_info_item">
            <div className="card_info_item__head">
              顧客名
            </div>
            <div className="card_info_item__text">
              {data.customer_name || '---'}
            </div>
          </div>

          <div className="card_info_item">
            <div className="card_info_item__head">
              現場名称
            </div>
            <div className="card_info_item__text">
              {data.field_name || '---'}
            </div>
          </div>

          <div className="card_info_item">
            <div className="card_info_item__head">
              案件担当者
            </div>
            <div className="card_info_item__text">
              {data.project_representative_name || '---'}
            </div>
          </div>

          <div className="card_info_item">
            <div className="card_info_item__head">
              作成日
            </div>
            <div className="card_info_item__text">
              {DateFormatter.date2str(data.quote_date) || '---'}
            </div>
          </div>

          <div className="card_info_item">
            <div className="card_info_item__head">
              見積金額
            </div>
            <div className="card_info_item__text important">
              {data.quote_price ? `¥${MathHelper.localStr(data.quote_price)}` : '---'}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
