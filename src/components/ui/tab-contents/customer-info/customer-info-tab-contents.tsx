/* eslint-disable no-undef */
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';
import { State } from '../../../../redux/root.reducer';
import { joinStr } from '../../../../utilities/join-str';
import { emailTemp } from '../../../../utilities/open-email';
import {
  openTwitter, openInstagram, openFacebook, openLink,
} from '../../../../utilities/open-link';
import { IconButton } from '../../button/icon-button/icon-button';
import '../info-tab-contents.sp.scss';
import { DateFormatter } from '../../../../utilities/date-formatter';
import { splitStr } from '../../../../utilities/split-str';
import { openTel } from '../../../../utilities/open-tel';
import { FamilyInfoListSP } from '../../../sp/layout/body/list/family-info/family-info-list';
import { PetInfoListSP } from '../../../sp/layout/body/list/pet-info/pet-info-list';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { SupportHistoryEditDialogTitle } from '../../../sp/pages/support-history/edit/support-history-edit.type';
import { SupportHistoryEditSP } from '../../../sp/pages/support-history/edit/support-history-edit.sp';

export const CustomerInfoTabContents = () => {
  /* Hooks */
  const customerInfo = useSelector((state:State) => state.customer.customer);
  const familyList = useSelector((state:State) => state.customer.familyList);
  const petList = useSelector((state:State) => state.customer.petList);
  const dispatch = useDispatch();

  /* Callback */
  const handleClickMail = useCallback((mail: string | undefined) => {
  /* TODO fukada メール処理、Email2,3も対応できるよう調整お願いします。 */
    if (!customerInfo) return;
    dispatch(DialogActions.pushMessage({
      title: '',
      message: [`${customerInfo.name}にメールを送信します`],
      label: 'はい',
      isCancel: true,
      cancelLabel: 'いいえ',
      callback: () => {
        dispatch(DialogActions.push({
          title: SupportHistoryEditDialogTitle.add,
          element: <SupportHistoryEditSP
            mode="add"
            customerData={customerInfo}
          />,
        }));
        emailTemp({
          emailAddress: mail || '',
          address: `${'東京都' || ''}${'東京都台東区1-1-1' || ''}`,
          companyName: 'テスト株式会社',
          name: customerInfo.name || '',
          postNo: joinStr(1111111 || '', 3, '-'),
          fax: '010-1111-1111' || '',
          tel: '010-1111-1111' || '',
          message: ['', 'テスト', 'テスト', 'テスト', ''],
        });
      },
    }));
  }, [customerInfo]);

  /* TODO fukada 電話かける処理、不都合あれば調整お願いします。 */
  const handleClickPhone = useCallback((tel: string | undefined) => {
    dispatch(DialogActions.pushMessage({
      title: '',
      message: [`${customerInfo?.name}宛に電話をかけます`],
      label: 'はい',
      isCancel: true,
      cancelLabel: 'いいえ',
      callback: () => {
        dispatch(DialogActions.push({
          title: SupportHistoryEditDialogTitle.add,
          element: <SupportHistoryEditSP
            mode="add"
            customerData={customerInfo || undefined}
          />,
        }));
        openTel({ tel: tel || '' });
      },
    }));
  }, [customerInfo]);

  const handleClickLine = useCallback(() => {
    dispatch(DialogActions.pushMessage({
      title: '',
      message: ['友達追加しますか？'],
      callback: () => {
        openLink('https://line.me/R/nv/addFriends');
      },
    }));
  }, []);

  return (
    <div className="detail_info_table row_table_style">
      <div className="t_row">
        <div className="t_header">顧客名</div>
        <div className="t_body">{customerInfo?.name ? `${customerInfo?.name} 様` : '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">顧客名（カナ）</div>
        <div className="t_body">{customerInfo?.furigana || '---'}</div>
      </div>

      <div className="t_row">
        <div className="t_header">顧客ID</div>
        <div className="t_body">
          <div>{customerInfo?.id}</div>
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">住所</div>
        <div className="t_body">
          {customerInfo?.post_no ? `〒 ${customerInfo?.post_no}` : '---'}<br />
          {customerInfo?.prefecture_name}{customerInfo?.city}{customerInfo?.address}
          {customerInfo?.building_name || ''}
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">電話番号</div>
        <div className="t_body">
          {customerInfo?.tel_no || '---'}
        </div>
        <div>
          <IconButton
            fontAwesomeClass="fas fa-phone"
            onClick={() => handleClickPhone(customerInfo?.tel_no)}
            size="md"
            color="secondary"
            disabled={!customerInfo?.tel_no}
          />
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">電話番号２</div>
        <div className="t_body">
          {customerInfo?.tel_no2 || '---'}
        </div>
        <div>
          <IconButton
            fontAwesomeClass="fas fa-phone"
            onClick={() => handleClickPhone(customerInfo?.tel_no2)}
            size="md"
            color="secondary"
            disabled={!customerInfo?.tel_no2}
          />
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">電話番号３</div>
        <div className="t_body">
          {customerInfo?.tel_no3 || '---'}
        </div>
        <div>
          <IconButton
            fontAwesomeClass="fas fa-phone"
            onClick={() => handleClickPhone(customerInfo?.tel_no3)}
            size="md"
            color="secondary"
            disabled={!customerInfo?.tel_no3}
          />
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">Email</div>
        <div className="t_body email flex_box flex_space_between flex_align_center">
          <div>
            {customerInfo?.mail_address || '---'}
          </div>
          <IconButton
            fontAwesomeClass="fas fa-envelope"
            onClick={() => handleClickMail(customerInfo?.mail_address)}
            size="md"
            color="secondary"
            disabled={!customerInfo?.mail_address}
          />
        </div>
        <div />
      </div>

      <div className="t_row">
        <div className="t_header">Email ２</div>
        <div className="t_body">
          {customerInfo?.mail_address2 || '---'}
        </div>
        <div>
          <IconButton
            fontAwesomeClass="fas fa-envelope"
            onClick={() => handleClickMail(customerInfo?.mail_address2)}
            size="md"
            color="secondary"
            disabled={!customerInfo?.mail_address2}
          />
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">Email ３</div>
        <div className="t_body">
          {customerInfo?.mail_address3 || '---'}
        </div>
        <div>
          <IconButton
            fontAwesomeClass="fas fa-envelope"
            onClick={() => handleClickMail(customerInfo?.mail_address3)}
            size="md"
            color="secondary"
            disabled={!customerInfo?.mail_address3}
          />
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">FAX</div>
        <div className="t_body">
          {customerInfo?.fax_no || '---'}
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">営業担当店舗</div>
        <div className="t_body">
          {customerInfo?.sales_shop_name || '---'}
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">営業担当者</div>
        <div className="t_body">
          {customerInfo?.sales_contact_name || '---'}
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">LINE ID</div>
        <div className="t_body">
          {customerInfo?.line_id || '---'}
          {customerInfo?.line_id
            && (
              <CopyToClipboard text={customerInfo?.line_id || ''}>
                <IconButton
                  className="ml_10"
                  fontAwesomeClass="fas fa-external-link-alt"
                  size="sm"
                  color="white"
                  onClick={handleClickLine}
                  disabled={!customerInfo?.line_id}
                />
              </CopyToClipboard>
            )}
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">FaceBook ID</div>
        <div className="t_body flex_box flex_space_between flex_align_center">
          {customerInfo?.facebook_id || '---'}
          {customerInfo?.facebook_id
          && (
          <IconButton
            className="ml_10"
            fontAwesomeClass="fas fa-external-link-alt"
            size="sm"
            color="white"
            onClick={() => openFacebook(customerInfo?.facebook_id)}
            disabled={!customerInfo?.facebook_id}
          />
          )}
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">Twitter ID</div>
        <div className="t_body flex_box flex_space_between flex_align_center">
          {customerInfo?.twitter_id || '---'}
          {customerInfo?.twitter_id
          && (
          <IconButton
            className="ml_10"
            fontAwesomeClass="fas fa-external-link-alt"
            size="sm"
            color="white"
            onClick={() => openTwitter(customerInfo?.twitter_id)}
            disabled={!customerInfo?.twitter_id}
          />
          )}
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">Instagram ID</div>
        <div className="t_body flex_box flex_space_between flex_align_center">
          {customerInfo?.instagram_id || '---'}
          {customerInfo?.instagram_id
          && (
          <IconButton
            className="ml_10"
            fontAwesomeClass="fas fa-external-link-alt"
            size="sm"
            color="white"
            onClick={() => openInstagram(customerInfo?.instagram_id)}
            disabled={!customerInfo?.instagram_id}
          />
          )}
        </div>
      </div>

      {/* <div className="t_row">
        <div className="t_header">LINE ID</div>
        <div className="t_body">
          {customerInfo?.line_id || '---'}
          <IconButton
            className="ml_10"
            fontAwesomeClass="fas fa-external-link-alt"
            size="sm"
            color="white"
            onClick={() => {}}
            disabled
          />
        </div>
      </div> */}

      <div className="t_row">
        <div className="t_header">顧客ランク</div>
        <div className="t_body">
          {customerInfo?.rank_name || '---'}
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">見込みランク</div>
        <div className="t_body">
          {customerInfo?.estimated_rank_name || '---'}
        </div>
      </div>

      {/* TODO なにこれ */}
      {/* <div className="t_row">
        <div className="t_header">見積タイプ</div>
        <div className="t_body">
          {customerInfo?.estimated_rank_name || '---'}
        </div>
      </div> */}

      <div className="t_row">
        <div className="t_header">発生源</div>
        <div className="t_body">
          {customerInfo?.source_name || '---'}
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">エリア</div>
        <div className="t_body">
          {customerInfo?.area_name || '---'}
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">見込み部位</div>
        <div className="t_body">
          {splitStr(customerInfo?.expected_part_list_name) || '---'}
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">部位</div>
        <div className="t_body">
          {splitStr(customerInfo?.part_list_name) || '---'}
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">建物分類</div>
        <div className="t_body">
          {customerInfo?.building_category_name || '---'}
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">間取り</div>
        <div className="t_body">
          {customerInfo?.madori_name || '---'}
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">築年数</div>
        <div className="t_body">
          {customerInfo?.building_age ?? '---'}
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">備考</div>
        <div className="t_body">
          {customerInfo?.remarks || '---'}
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">メモ１</div>
        <div className="t_body">
          {customerInfo?.memo1 || '---'}
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">メモ２</div>
        <div className="t_body">
          {customerInfo?.memo2 || '---'}
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">マイカー種別</div>
        <div className="t_body">
          {splitStr(customerInfo?.my_car_type_name) || '---'}
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">マイカー種別<br />（その他）</div>
        <div className="t_body">
          {customerInfo?.my_car_type_other || '---'}
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">関連タグ</div>
        <div className="t_body">
          {splitStr(customerInfo?.tag_list_name) || '---'}
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">紹介者</div>
        <div className="t_body">
          {customerInfo?.introducer || '---'}
        </div>
      </div>

      <div className="t_row">
        <div className="t_header">結婚記念日</div>
        <div className="t_body">
          {customerInfo?.wedding_anniversary ? DateFormatter.date2str(customerInfo?.wedding_anniversary) : '---'}
        </div>
      </div>

      <div className={`t_row ${familyList.length ? 'block' : ''}`}>
        <div className="t_header">ご家族情報</div>
        <div className="t_body">
          {familyList.length
            ? <FamilyInfoListSP callback={() => {}} />
            : '未入力'}
        </div>
      </div>

      <div className={`t_row ${petList.length ? 'block' : ''}`}>
        <div className="t_header">ペット情報</div>
        <div className="t_body">
          {petList.length
            ? <PetInfoListSP callback={() => {}} />
            : '未入力'}
        </div>
      </div>

      {/* TODO 詳細情報の過不足精査・調整 */}

    </div>
  );
};
