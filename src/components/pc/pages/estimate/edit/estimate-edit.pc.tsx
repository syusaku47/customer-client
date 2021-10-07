/* eslint-disable no-irregular-whitespace */
import './estimate-edit.pc.scss';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import { goBack } from 'connected-react-router';
import { EditPC } from '../../../../dialogs/edit/edit.pc';
import { Button } from '../../../../ui/button/button';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { DatePicker } from '../../../../ui/date-picker/date-picker';
import { RightLabelInputField } from '../../../../ui/input-field/right-label-input-field/right-label-input-field';
import { EstimateExplore } from '../explore/estimate-explore.pc';
import { EstimatePriceAreaPC } from './price-area/estimate-price-area.pc.';
import { useDidMount, useWillUnMount } from '../../../../../hooks/life-cycle';
import { EstimateSearchDialog } from '../../../layout/dialogs/estimate-search-dialog/estimate-search-dialog';
import { EstimateActions } from '../../../../../redux/estimate/estimate.action';
import { EstimateCollection } from '../../../../../collection/estimate/estimatecollection';
import { getTermDay } from '../../../../../utilities/get-term-day';
import { EstimatePriceAreaCollectionPC } from './price-area/estimate-price-area.collection.pc';
import { EstimateMeisaiListType } from '../../../../../type/estimate/estimate-meisai.type';
import { Project } from '../../../../../type/project/project.type';
import { Input } from '../../../../ui/input/input';
import { ProjectSearch } from '../../../layout/search-box/project/project-search/project-search';
import { TextArea } from '../../../../ui/text-area/text-area';
import { Required } from '../../../../ui/required/required';
import { DateFormatter } from '../../../../../utilities/date-formatter';
import { ValidationLengthUnder500 } from '../../../../../model/validation';
import { EstimateValidation } from '../../../../../model/validation/estimate/estimate.validation';
import { ValidationDatePicker } from '../../../../../model/validation/validation-date-picker';
import { LeftIconButton } from '../../../../ui/button/left-icon-button/left-icon-button';
import { constructionPeriodCalculation } from '../../../../../utilities/construction-period-calculation';

type Props = {
  id?: number;
  projectData?: Project;
  closeCallback?: (id:number) => void;
  callback?: () => void;
}

export const EstimateEditPC = (props: Props) => {
  const {
    id, projectData, closeCallback, callback,
  } = props;

  /* Hooks */
  const dispatch = useDispatch();

  /* State */
  const [filedName, setFiledName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [quoteCreatorName, setQuoteCreatorName] = useState('');
  const [quoteNo, setQuoteNo] = useState('');

  const [editId, setEditId] = useState<number | undefined>(id);
  const [editState, setEditState] = useState(EstimateCollection.editInitialState);
  const [meisaiList, setMeisaiList] = useState<EstimateMeisaiListType[]>([]);
  const [priceMeisaiList, setPriceMeisaiList] = useState<EstimateMeisaiListType[]>([]);
  const [priceState, setPriceState] = useState(EstimatePriceAreaCollectionPC.initialEditState);
  const [termDay, setTermDay] = useState<number | undefined>(undefined);
  const [touch, setTouch] = useState(false);
  const [selectData, setSelectData] = useState<{
    daibunrui?: number, chubunrui?: number;
  } | null>(null);

  // -- 編集可能かどうかを制御するためのやつ --
  const [allowEdit, setAllowEdit] = useState(true);

  /* Callback */
  const handleClickCopy = useCallback(
    () => {
      dispatch(DialogActions.push({
        title: '見積検索',
        className: 'max_height_dialog max_width_dialog',
        element: <EstimateSearchDialog
          estimateId={Number(editId)}
          closeCallback={() => {
            if (editId) {
              dispatch(EstimateActions.api.meisai.getList({
                param: {
                  id: editId,
                  data: {
                    category: selectData?.daibunrui,
                    sub_category: selectData?.chubunrui,
                  },
                },
                callback: (data) => {
                  setMeisaiList(cloneDeep(data));
                },
              }));
              dispatch(EstimateActions.api.meisai.getSideMenuList({ param: { id: editId } }));
              dispatch(DialogActions.pop());
            }
          }}
        />,
      }));
    },
    [editId, selectData],
  );

  const handleClickProjectSearch = useCallback(
    (searchCallback?:(projectId:number)=>void, add?:boolean) => {
      dispatch(DialogActions.push({
        title: '案件検索',
        className: 'max_height_dialog max_width_dialog search_dialog',
        onCloseClick: () => {
          if (add)dispatch(DialogActions.clear());
        },
        element: <ProjectSearch
          callback={(v) => {
            setFiledName(v.field_name);
            setProjectName(v.name);
            setEditState({
              ...editState,
              project_id: v.id,
            });
            if (add)setQuoteCreatorName('ログイン者');
            if (searchCallback)searchCallback(v.id);
          }}
        />,
      }));
    },
    [editState, editId],
  );

  const handleClickPost = useCallback(
    () => {
      if (EstimateValidation(editState)) {
        dispatch(DialogActions.pushMessage({
          title: '案件情報登録',
          message: ['未入力／入力不備項目があります'],
          callback: () => setTouch(true),
        }));
        return;
      }

      dispatch(EstimateActions.api.estimate.post({
        param: {
          data: {
            project_id: editState.project_id,
            quote_date: DateFormatter.date2str(editState.quote_date),
            order_construction_start: DateFormatter.date2str(editState.order_construction_start),
            order_construction_end: DateFormatter.date2str(editState.order_construction_end),
            quote_expiration_date: DateFormatter.date2str(editState.quote_expiration_date),
            order_expected_date: DateFormatter.date2str(editState.order_expected_date),
            remarks: editState.remarks,
            adjustment_amount: priceState.adjustment_amount,
            field_cost_quote: priceState.field_cost_quote,
            field_cost: priceState.field_cost,
            call_cost_quote: priceState.call_cost_quote,
            call_cost: priceState.call_cost,
          },
          id: editId,
        },
        onSuccess: () => {
          // dispatch(DialogActions.clear());
          if (callback)callback();
        },
        onError: () => {
          setTouch(true);
        },
      }));
    },
    [editId, editState, priceState, callback],
  );

  useDidMount(() => {
    if (editId) {
      dispatch(EstimateActions.api.estimate.get({
        param: { id: editId },
        callback: (data) => {
          setAllowEdit(!data.order_flag);
          setFiledName(data.field_name);
          setProjectName(data.project_name);
          setQuoteCreatorName(data.quote_creator_name);
          setQuoteNo(data.quote_no);
          setEditState({
            ...editState,
            ...data,
            quote_date: data.quote_date
              ? new Date(data.quote_date) : null,
            order_construction_start: data.order_construction_start
              ? new Date(data.order_construction_start) : null,
            order_construction_end: data.order_construction_end
              ? new Date(data.order_construction_end) : null,
            quote_expiration_date: data.quote_expiration_date
              ? new Date(data.quote_expiration_date) : null,
            order_expected_date: data.order_expected_date
              ? new Date(data.order_expected_date) : null,
          });
        },
      }));
    }

    if (editId === undefined && projectData) {
      setFiledName(projectData.field_name);
      setProjectName(projectData.name);
      setEditState({
        ...editState,
        project_id: projectData.id,
      });
      dispatch(EstimateActions.api.id.get({
        project_id: projectData.id,
        callback: (data) => {
          setEditId(data.id);
          if (closeCallback) {
            closeCallback(data.id);
          }
        },
      }));
      return;
    }

    if (editId === undefined) {
      handleClickProjectSearch((projectId) => {
        dispatch(EstimateActions.api.id.get({
          project_id: projectId,
          callback: (data) => {
            setEditId(data.id);
            if (closeCallback) {
              closeCallback(data.id);
            }
          },
        }));
      }, true);
    }
  });

  useWillUnMount(() => {
    dispatch(EstimateActions.setEstimate(null));
    dispatch(EstimateActions.setMeisaiList([]));
    dispatch(EstimateActions.setMeisaiSideMenu(null));
  });

  useEffect(() => {
    setTermDay(getTermDay(
      editState.order_construction_start,
      editState.order_construction_end,
    ));
  }, [
    editState.order_construction_start,
    editState.order_construction_end,
  ]);

  useEffect(() => {
    if (editId) {
      dispatch(EstimateActions.api.meisai.getList({
        noLoad: true,
        param: {
          id: editId,
        },
        callback: (data) => {
          setPriceMeisaiList(cloneDeep(data));
        },
      }));
    }
  }, [meisaiList, editId]);

  return (
    <EditPC
      mode="dialog"
      className="sepalate"
      buttonArea={(
        <>
          <div className="left_box">
            <LeftIconButton
              label="過去見積から明細をコピー"
              fontAwesomeClass="fas fa-copy"
              size="md"
              color="primary"
              onClick={handleClickCopy}
              disabled={!allowEdit}
            />
          </div>
          <div className="center_box display_none">
            <Button // LeftIconButton
              // label="見積書印刷"
              // fontAwesomeClass="fas fa-calculator"
              size="md"
              color="secondary"
              // disabled={!estimate}
              // onClick={() => handleClickPrint('estimate')}
              onClick={() => {}}
            >見積書印刷
            </Button>
            <Button // LeftIconButton
              // label="見積書印刷（社内用）"
              // fontAwesomeClass="fas fa-calculator"
              size="md"
              color="secondary"
              // disabled={!estimate}
              // onClick={() => handleClickPrint('estimateIn')}
              onClick={() => {}}
            >見積書印刷（社内用）
            </Button>
            <Button // LeftIconButton
              // label="請求書印刷（簡易版）"
              // fontAwesomeClass="fas fa-file-invoice"
              size="md"
              color="secondary"
              // disabled={!estimate}
              // onClick={() => handleClickPrint('claim')}
              onClick={() => {}}
            >請求書印刷（簡易版）
            </Button>
            <Button // LeftIconButton
              // label="請求書印刷（明細付）"
              // fontAwesomeClass="fas fa-file-invoice"
              size="md"
              color="secondary"
              // disabled={!estimate}
              // onClick={() => handleClickPrint('claimIn')}
              onClick={() => {}}
            >請求書印刷（明細付）
            </Button>
            <Button // LeftIconButton
              // label="請求登録"
              // fontAwesomeClass="fas fa-edit"
              size="md"
              color="secondary"
              // disabled={!estimate}
              // onClick={handleClickBillRegist}
              onClick={() => {}}
            >請求登録
            </Button>
          </div>
          <div className="right_box">
            <Button color="primary" size="md" onClick={handleClickPost} disabled={!allowEdit}>
              登録
            </Button>
            <LeftIconButton
              label={id ? '戻る' : '閉じる'}
              fontAwesomeClass="fas fa-arrow-left"
              size="md"
              color="dark"
              onClick={() => {
                if (id) {
                  dispatch(goBack());
                  return;
                }
                dispatch(DialogActions.pop());
              }}
            />
          </div>
        </>
      )}
    >
      <div className="EstimateEditPC">
        <section className="estimate_detail">
          <div className="left_box">
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">現場名称</div>
                <Input
                  value={filedName}
                  disabled
                />
              </div>
              <div className="item_box">
                <div className="item_head">案件名</div>
                <Input
                  value={projectName}
                  disabled
                />
                <Button
                  size="sm"
                  color="secondary"
                  className="ml_10"
                  onClick={() => handleClickProjectSearch()}
                  disabled={!allowEdit}
                >案件参照
                </Button>
              </div>
              <div className="item_box">
                <div className="item_head">見積作成者</div>
                <Input
                  value={quoteCreatorName}
                  disabled
                />
              </div>
              <div className="item_box">
                <div className="item_head">見積日付<Required /></div>
                <DatePicker
                  date={editState.quote_date}
                  label="見積日付"
                  onChange={(v) => setEditState({ ...editState, quote_date: v })}
                  require
                  validationList={ValidationDatePicker}
                  touch={touch}
                  disabled={!allowEdit}
                />
              </div>
              <div className="item_box">
                <div className="item_head">見積番号</div>
                <Input
                  value={quoteNo}
                  disabled
                />
              </div>
              <div className="item_box">
                <div className="item_head">工期<Required /></div>
                <DatePicker
                  date={editState.order_construction_start}
                  onChange={(v) => setEditState({ ...editState, order_construction_start: v })}
                  require
                  validationList={ValidationDatePicker}
                  touch={touch}
                  disabled={!allowEdit}
                />
                <label className="ml_10">〜</label>
                <DatePicker
                  date={editState.order_construction_end}
                  onChange={(v) => setEditState({ ...editState, order_construction_end: v })}
                  require
                  validationList={ValidationDatePicker}
                  touch={touch}
                  disabled={!allowEdit}
                />
                <RightLabelInputField
                  label="日間"
                  value={termDay}
                  onBlur={() => {
                    setEditState({
                      ...editState,
                      order_construction_end: constructionPeriodCalculation(
                        editState.order_construction_start,
                        editState.order_construction_end,
                        Number(termDay),
                      ),
                    });
                  }}
                  onChange={(e) => {
                    setTermDay(Number(e.target.value) || undefined);
                  }}
                  className="during ml_10 align_r"
                />
              </div>
              <div className="item_box">
                <div className="item_head">見積有効期限<Required /></div>
                <DatePicker
                  date={editState.quote_expiration_date}
                  onChange={(v) => setEditState({ ...editState, quote_expiration_date: v })}
                  require
                  validationList={ValidationDatePicker}
                  touch={touch}
                  disabled={!allowEdit}
                />
              </div>
              <div className="item_box">
                <div className="item_head">発注予定日<Required /></div>
                <DatePicker
                  date={editState.order_expected_date}
                  onChange={(v) => setEditState({ ...editState, order_expected_date: v })}
                  require
                  validationList={ValidationDatePicker}
                  touch={touch}
                  disabled={!allowEdit}
                />
              </div>
            </div>
          </div>
          <div className="right_box">

            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">備考</div>
                <TextArea
                  rows={4}
                  className="large"
                  value={editState.remarks}
                  onChange={(e) => setEditState({ ...editState, remarks: e.target.value })}
                  validationList={ValidationLengthUnder500}
                  disabled={!allowEdit}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="estimate_explore">
          <EstimateExplore
            id={editId}
            priceData={priceState}
            callback={setMeisaiList}
            allowEdit={allowEdit}
            meisaiList={meisaiList}
            callbackSelectCategory={setSelectData}
          />
        </section>
        <section className="estimate_price_area">
          <EstimatePriceAreaPC
            estimateState={editState}
            data={priceMeisaiList}
            callback={setPriceState}
            allowEdit={allowEdit}
          />
        </section>
      </div>
    </EditPC>
  );
};
