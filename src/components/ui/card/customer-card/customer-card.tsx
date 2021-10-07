/* eslint-disable no-irregular-whitespace */
import { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { CustomerListType } from '../../../../type/customer/customer.type';
import { RectLabel } from '../../label/rect-label/rect-label';
import './customer-card.scss';
import obIcon from '../../../../asset/images/icon_customer_ob.svg';
import mikomiIcon from '../../../../asset/images/icon_customer_uncontracted.svg';
import { ShowTypeLabel } from '../../label/show-type/show-type-label';
// import { DummyCustomerImg } from '../../../../collection/customer/customer.collection';
import { joinStr } from '../../../../utilities/join-str';
import { MapActions } from '../../../../redux/map/map.action';
import { UserAgent } from '../../../../utilities/user-agent';
import { StreetViewImg } from '../../street-view-img/street-view-img';

type Props = {
  onClick: (id: number) => void,
  customerData: CustomerListType,
  className?: string,
  // isSP?: boolean
  index: number,
}

export const CustomerCard = memo((props: Props) => {
  const {
    onClick, customerData, className, index,
  } = props;

  /* Hook */
  const dispatch = useDispatch();

  /* Callback */
  const handleClickCustomerDetail = useCallback(
    () => {
      dispatch(MapActions.setZoomLevel(20));
      dispatch(MapActions.setGpsStatus('out'));
      onClick(customerData.id);
    }, [onClick, customerData.id],
  );

  return (
    <>
      {UserAgent === 'sp'
        ? (
          <div className={`customer_card ${UserAgent} card_base ${className}`} onClick={handleClickCustomerDetail}>
            <div className="card_base_row">

              <div className="customer_card__col1 card_base_row__col_left">

                <div className="card_info_item">
                  <div className="card_info_item__head">
                    顧客名
                  </div>
                  <div className="card_info_item__text important">
                    {`${customerData.name || ''}`}{/* <span>({customerData.furigana || '---' })</span>*/}
                  </div>
                </div>

                <div className="card_info_item">
                  <div className="card_info_item__head">
                    住所
                  </div>
                  <div className="card_info_item__text">
                    {`〒${joinStr(customerData.post_no, 3, '-')}`}<br />
                    {`${customerData.prefecture_name || ''}${customerData.city || ''}${customerData.address || ''}`}
                  </div>
                </div>

                <div className="card_info_item">
                  <div className="card_info_item__head">
                    TEL
                  </div>
                  <div className="card_info_item__text">
                    {customerData.tel_no || '---'}
                  </div>
                </div>

                <div className="card_info_item">
                  <div className="card_info_item__head">
                    担当者
                  </div>
                  <div className="card_info_item__text emphasis">
                    {customerData.sales_contact_name || '---'}
                  </div>
                </div>
              </div>

              <div className="customer_card__col2 card_base_row__col_right">
                <div className="thumb google">
                  {/* FIXME 仮 */}
                  <StreetViewImg isShow={index < 3} lat={customerData.lat} lng={customerData.lng} />
                  {/* <img src={customerData.img_url || DummyCustomerImg} alt="" /> */}
                </div>

                <div>
                  <ShowTypeLabel
                    label={customerData.ob_flag === 1 ? 'OB' : '見込み'}
                    showTypeImg={customerData.ob_flag === 1 ? obIcon : mikomiIcon}
                    className={customerData.ob_flag === 1 ? 'ob' : 'mikomi'}
                  />
                  {/* {customerData.rank && <RectLabel label={customerData.rank_name} />}*/}
                  <RectLabel
                    label={customerData.rank_name || 'ランクなし'}/* ★顧客ランク略称abbreviation */
                    bgColor={customerData.rank ? 'gray' : 'gray'}/* ★TODO 背景色（background_color）*/
                    color={customerData.rank ? '#FFF' : '#FFF'}
                  />
                </div>
              </div>
            </div>
          </div>
        )

        : (
          <div className={`customer_card_pc card_base ${className}`} onClick={handleClickCustomerDetail}>
            <div className="row1 card_base_row">
              <div className="row1_col1">
                <div className="important">{`${customerData.name || ''}`}{/* <span>({customerData.furigana || '---' })</span>*/}</div>
                <div className="">
                  {`〒${joinStr(customerData.post_no, 3, '-')}`}<br />
                  {`${customerData.prefecture_name || ''}${customerData.city || ''}${customerData.address || ''}`}
                </div>
              </div>
              <div className="row1_col2">
                <ShowTypeLabel
                  label={customerData.ob_flag === 1 ? 'OB' : '見込み'}
                  showTypeImg={customerData.ob_flag === 1 ? obIcon : mikomiIcon}
                  className={customerData.ob_flag === 1 ? 'ob' : 'mikomi'}
                />
                {/* {customerData.rank && <RectLabel label={customerData.rank_name} />}*/}
                <RectLabel
                  label={customerData.rank_name || 'ランクなし'}/* ★顧客ランク略称abbreviation */
                  bgColor={customerData.rank ? 'gray' : 'gray'}/* ★TODO 背景色（background_color）*/
                  color={customerData.rank ? '#FFF' : '#FFF'}
                />
              </div>
              <div className="row1_col3">
                <div className="thumb google">
                  {/* <img src={customerData.img_url || DummyCustomerImg} alt="" /> */}
                  <StreetViewImg isShow={index < 3} lat={customerData.lat} lng={customerData.lng} />
                </div>
              </div>
            </div>
            <div className="card_base_row row2">
              <div className="row2_col1 tel_no">TEL：{customerData.tel_no || '---'}</div>
              <div className="row2_col2 sales_contact">担当者：{customerData.sales_contact_name || '---'}</div>
            </div>
          </div>
        )}
    </>
  );
});
