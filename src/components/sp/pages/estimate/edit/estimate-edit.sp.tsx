import { push } from 'connected-react-router';
import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EstimateCollection } from '../../../../../collection/estimate/estimatecollection';
import { useDidMount, useWillUnMount } from '../../../../../hooks/life-cycle';
import { ValidationLengthUnder500 } from '../../../../../model/validation';
import { EstimateValidation } from '../../../../../model/validation/estimate/estimate.validation';
import { ValidationDatePicker } from '../../../../../model/validation/validation-date-picker';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { ApiEstimateMeisaiPostList } from '../../../../../redux/estimate/api/meisai/api-estimate-meisai';
import { EstimateActions } from '../../../../../redux/estimate/estimate.action';
import { ProjectActions } from '../../../../../redux/project/project.action';
import { State } from '../../../../../redux/root.reducer';
import { RoutingPath } from '../../../../../routes/routing-pass';
import { EstimateMeisaiListType } from '../../../../../type/estimate/estimate-meisai.type';
import { Project } from '../../../../../type/project/project.type';
import { constructionPeriodCalculation } from '../../../../../utilities/construction-period-calculation';
import { DateFormatter } from '../../../../../utilities/date-formatter';
import { getTermDay } from '../../../../../utilities/get-term-day';
import { MathHelper } from '../../../../../utilities/math-helper';
import { EditType } from '../../../../dialogs/edit/edit.sp';
import { EstimatePriceAreaCollectionPC } from '../../../../pc/pages/estimate/edit/price-area/estimate-price-area.collection.pc';
import { Button } from '../../../../ui/button/button';
import { DatePicker } from '../../../../ui/date-picker/date-picker';
import { TopLabelInputField } from '../../../../ui/input-field/top-label-input-field/top-label-input-field';
import { Input } from '../../../../ui/input/input';
import { Required } from '../../../../ui/required/required';
import { TextArea } from '../../../../ui/text-area/text-area';
import { ProjectSearchBoxSP } from '../../project/search-box/project-search-box.sp';
import './estimate-edit.sp.scss';
import { EstimateEditDialogTitle } from './estimate-edit.type.sp';
import { SearchEstimateSP, SearchEstimateTitle } from './search/search-estimate.sp';

type Props = {
  mode: EditType;
  // data?: EstimateEditState;
  closeCallback?: (id:number) => void;
  projectData?: Project;
  id?: number;
  callback?: () => void;
  meisaiList?: EstimateMeisaiListType[],
}

export const EstimateEditSP = (props: Props) => {
  const {
    mode, id, /* data */ projectData, closeCallback, callback, meisaiList: _meisaiList,
  } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const estimateInfo = useSelector((state:State) => state.estimate.estimate);

  const footerEle = useRef<HTMLDivElement>(null);

  /* State */
  const [editId, setEditId] = useState<number | undefined>(id);
  const [filedName, setFiledName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [estimateCreator, setEstimateCreator] = useState('');
  const [meisaiList, setMeisaiList] = useState<EstimateMeisaiListType[]>(_meisaiList || []);
  // eslint-disable-next-line
  const [priceState, setPriceState] = useState(EstimatePriceAreaCollectionPC.initialEditState);
  const [editState, setEditState] = useState(EstimateCollection.editInitialState);

  const [touch, setTouch] = useState(false);

  /* お金 */
  const allPrice = useMemo(() => {
    let price = 0;
    meisaiList.forEach((v) => {
      price = MathHelper.plus(price, MathHelper.localStrToNum(v.price));
    });
    return price;
  }, [meisaiList]);
  const tax = useMemo(() => MathHelper.times(allPrice, 0.1), [allPrice]);
  const totalPrice = useMemo(() => MathHelper.minus(allPrice, tax), [meisaiList, tax]);
  const [termDay, setTermDay] = useState<number | undefined>(undefined);

  /* Callback */
  // const handleClickAddMeisai = useCallback(() => {
  //   if (!editId) return;
  //   dispatch(DialogActions.push({
  //     title: '見積明細作成',
  //     element: <EstimateDetailEditSP
  //       estimateId={editId}
  //       callback={() => dispatch(
  //         EstimateActions.api.meisai.getList({
  //           param: { id: editId },
  //           callback: (v) => setMeisaiList(v),
  //         }),
  //       )}
  //     />,
  //   }));
  // }, [editId]);

  // eslint-disable-next-line
  const handleClickCopy = useCallback(() => {
    // dispatch(DialogActions.push({
    //   title: '見積検索',
    //   className: 'max_height_dialog',
    //   element: <EstimateSearchDialog
    //     estimateId={Number(editId)}
    //     closeCallback={() => {
    //       if (editId) {
    //         dispatch(EstimateActions.api.meisai.getList({
    //           param: {
    //             id: editId,
    //           },
    //           callback: (data) => {
    //             setMeisaiList(cloneDeep(data));
    //           },
    //         }));
    //         // dispatch(EstimateActions.api.meisai.getSideMenuList({ param: { id: editId } }));
    //         dispatch(DialogActions.pop());
    //       }
    //     }}
    //   />,
    // }));
  },
  [editId]);

  const handleClickRegistration = useCallback(
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
          if (id === undefined) {
            dispatch(push(RoutingPath.estimate));
            if (callback)callback();
          } else {
            dispatch(EstimateActions.api.estimate.get({ param: { id } }));
          }
        },
        onError: () => {
          setTouch(true);
        },
      }));
    },
    [editId, editState, priceState, callback],
  );

  // const handleClickMeisai = useCallback((v:EstimateMeisaiListType) => {
  //   callback;
  // },
  // [input]);

  const projectSearch = useCallback(
    (openMode:'add' | 'edit', searchCallback?:(projectId:number)=>void) => {
      dispatch(DialogActions.push({
        title: '案件検索',
        onCloseClick: () => {
          if (openMode === 'add') { dispatch(DialogActions.clear()); }
        },
        element: <ProjectSearchBoxSP
          callback={(v) => {
            setFiledName(v.field_place);
            setProjectName(v.name);
            if (openMode === 'add') {
              setFiledName(v.field_name);
              setProjectName(v.name);
              setEditState({
                ...editState,
                project_id: v.id,
              });
              // if (openMode === 'add')setQuoteCreatorName('ログイン者');
              if (searchCallback)searchCallback(v.id);
            }
          }}
        />,
      }));
    },
    [editState, editId],
  );

  const handleClickLeftBtn = useCallback(() => {
    if (mode === 'add') {
      dispatch(DialogActions.push({
        title: SearchEstimateTitle,
        element: <SearchEstimateSP
          callback={(value) => {
            dispatch(ProjectActions.api.project.get({
              param: { id: value.project_id },
              callback: (res) => {
                setProjectName(res.name);
                setFiledName(res.field_place);
                setEstimateCreator('テスト');
                setEditState({
                  ...editState,
                  ...value,
                  quote_date: new Date(value.quote_date),
                  order_construction_start: new Date(value.order_construction_start),
                  order_construction_end: new Date(value.order_construction_end),
                  quote_expiration_date: new Date(value.quote_expiration_date),
                  order_expected_date: new Date(value.order_expected_date),
                });
                dispatch(EstimateActions.api.meisai.getList({
                  param: { id: value.id },
                  callback: (meisai) => {
                    new ApiEstimateMeisaiPostList({
                      id: editId || 0,
                      detail_id: meisai.map((v) => (v.id)),
                    }).run()
                      .then(() => {
                        setMeisaiList(meisai);
                      });
                  },
                }));
              },
            }));
          }}
        />,
      }));
      return;
    }
    dispatch(EstimateActions.api.id.get({
      project_id: estimateInfo?.project_id || 0,
      callback: (data) => {
        setEditId(data.id);
        /** 明細複写 */
        new ApiEstimateMeisaiPostList({
          id: data.id,
          detail_id: meisaiList.map((v) => (v.id)),
        }).run()
          .then(() => {
            dispatch(EstimateActions.api.meisai.getList({
              param: {
                id: data.id,
              },
              callback: (meisai) => {
                setMeisaiList(meisai);
              },
            }));
          });
      },
    }));
    dispatch(DialogActions.pop());
    if (estimateInfo) {
      dispatch(DialogActions.push({
        title: EstimateEditDialogTitle.add,
        element: <EstimateEditSP
          mode="add"
          // data={editState}
          projectData={projectData}
        />,
      }));
    }
  }, [
    mode,
    editState,
    projectName,
    estimateInfo?.project_id,
    filedName,
    estimateCreator,
    projectData,
  ]);

  useDidMount(() => {
    console.log(editId);
    console.log(projectData);
    if (editId) {
      dispatch(EstimateActions.api.estimate.get({
        param: { id: editId },
        callback: (data) => {
          setFiledName(data.field_name);
          setProjectName(data.project_name);
          // setQuoteCreatorName(data.quote_creator_name);
          // setQuoteNo(data.quote_no);

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
      projectSearch('add', (projectId) => {
        dispatch(EstimateActions.api.id.get({
          project_id: projectId,
          callback: (data) => {
            setEditId(data.id);
            if (closeCallback) {
              closeCallback(data.id);
            }
          },
        }));
      });
    }
  });

  useWillUnMount(() => {
    // dispatch(EstimateActions.setEstimate(null));
    // dispatch(EstimateActions.setMeisaiList([]));
    // dispatch(EstimateActions.setMeisaiSideMenu(null));
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

  return (
    <>
      <div className="edit_sp_body estimate_edit_sp">
        {/* edit_sp_body_inner は各画面の共通用 */}
        {/* 顧客から開いたとき顧客情報(現場名称？)入力済み、案件から開いたとき顧客と案件入力済み */}
        <div className="edit_sp_body_inner estimate_edit_sp__contents">

          <div className="estimate_edit_sp__contents__up_side">
            <div className="category_wrap">
              <div className="item_wrap item_site">
                <div className="item_label">
                  <span>現場名称</span>
                  <Button
                    onClick={() => projectSearch('edit')}
                    size="md"
                    color="secondary"
                  >案件検索
                  </Button>
                </div>
                <Input
                  value={filedName}
                  disabled
                />
              </div>
              <div className="item_wrap">
                <TopLabelInputField
                  className="full_width"
                  label="案件名"
                  value={projectName}
                  disabled
                />
              </div>
              <div className="item_wrap">
                <TopLabelInputField
                  label="見積作成者"
                  value={estimateCreator}
                  disabled
                  className="full_width"
                />
              </div>
            </div>

            <div className="category_wrap">
              <div className="item_wrap item_date_picker">
                <div className="item_label">見積日付<Required /></div>
                <div className="item_body">
                  <DatePicker
                    date={editState.quote_date}
                    onChange={(v) => setEditState({ ...editState, quote_date: v })}
                    validationList={ValidationDatePicker}
                    touch={touch}
                  />
                </div>
              </div>
              <div className="item_wrap item_date_picker item_construction_period">
                <div className="item_label">
                  <div className="col1">工期<Required /></div>
                  <div className="col2">
                    <Input
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
                      className="during"
                    />
                    <span>日間
                    </span>
                  </div>
                </div>
                <div className="item_body">
                  <DatePicker
                    date={editState.order_construction_start}
                    onChange={(v) => setEditState({ ...editState, order_construction_start: v })}
                    validationList={ValidationDatePicker}
                    touch={touch}
                  />
                  <div className="tilde">〜</div>
                  <DatePicker
                    date={editState.order_construction_end}
                    onChange={(v) => setEditState({ ...editState, order_construction_end: v })}
                    validationList={ValidationDatePicker}
                    touch={touch}
                  />
                </div>
              </div>
              <div className="item_wrap item_date_picker">
                <div className="item_label">見積有効期限<Required /></div>
                <div className="item_body">
                  <DatePicker
                    date={editState.quote_expiration_date}
                    onChange={(v) => setEditState({ ...editState, quote_expiration_date: v })}
                    validationList={ValidationDatePicker}
                    touch={touch}
                  />
                </div>
              </div>
              <div className="item_wrap item_date_picker">
                <div className="item_label">発注予定日<Required /></div>
                <div className="item_body">
                  <DatePicker
                    date={editState.order_expected_date}
                    onChange={(v) => setEditState({ ...editState, order_expected_date: v })}
                    validationList={ValidationDatePicker}
                    touch={touch}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="estimate_edit_sp__secondary_contents">
            {/* <div className="secondary_header">
              <div><span>明細</span></div>
              <div>
                <i
                  className="fas fa-plus-circle fa-2x"
                  onClick={handleClickAddMeisai}
                />
              </div>
              <div>
                <Button onClick={() => dispatch(DialogActions.pushReady())} size="md" color="white">
                  並べ替え
                </Button>
              </div>
            </div>
            <EstimateDetailListSP
              data={meisaiList}
              handleClickCard={() => {}}
              // handleClickDelete={() => {}}
            /> */}

            <div className="estimate_edit_sp__secondary_contents__remarks">
              <div>備考</div>
              <TextArea
                value={editState.remarks}
                rows={10}
                onChange={(e) => setEditState({ ...editState, remarks: e.target.value })}
                validationList={ValidationLengthUnder500}
              />
            </div>

          </div>
        </div>  {/* .edit_sp_body_inner */}

        <div className="estimate_edit_sp__secondary_footer">
          <div className="estimate_edit_sp__secondary_footer__wrap">
            <div className="row">
              <div className="row__col1">小計:</div>
              <div className="row__col2">&yen;&nbsp;{MathHelper.localStr(totalPrice)}</div>
              {/* <div className="row__col2">{
                    mode === 'update' ? `${'1,025,000'}` : '---'}</div> */}
            </div>
            <div className="row">
              <div className="row__col1">消費税:</div>
              <div className="row__col2">&yen;&nbsp;{MathHelper.localStr(tax)}</div>
            </div>
            <div className="row">
              <div className="row__col1">総合計:</div>
              <div className="row__col2">&yen;&nbsp;{MathHelper.localStr(allPrice)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="edit_sp_footer estimate_edit_sp_footer" ref={footerEle}>
        <Button
          size="md"
          color="primary"
          onClick={handleClickLeftBtn}
        >{mode === 'add' ? '過去見積コピー' : '複写して新規作成'}
        </Button>
        <Button size="md" color="primary" onClick={handleClickRegistration}>登録</Button>
        <Button size="md" color="dark" onClick={() => { dispatch(DialogActions.pop()); }}>キャンセル</Button>
      </div>
    </>
  );
};
