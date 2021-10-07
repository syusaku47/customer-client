import { useParams } from 'react-router-dom';
import './estimate-detail.pc.scss';
import { BasePagePC } from '../../base.page.pc';
import { EstimateEditPC } from '../../estimate/edit/estimate-edit.pc';

export const EstimateDetailPC = () => {
  /* Hooks */
  // const dispatch = useDispatch();
  const { id } = useParams<{ id: string, mode: string; }>();

  /* State */
  // const handleClickCopy = useCallback(
  //   () => {
  //     dispatch(DialogActions.push({
  //       title: '見積検索',
  //       element: <EstimateSearchDialog
  //         closeCallback={() => {
  //           if (id) {
  //             dispatch(EstimateActions.api.meisai.getSideMenuList({ id: Number(id) }));
  //             dispatch(DialogActions.pop());
  //           }
  //         }}
  //       />,
  //     }));
  //   },
  //   [id],
  // );

  return (
    <BasePagePC>
      <div id="estimate" className="EstimateEditPC cnt_area estimate ">
        <EstimateEditPC
          id={Number(id)}
        />
      </div>
      {/* <div id="estimate" className="EstimateEditPC cnt_area estimate ">
        <div className="inner">
          <div className="editPc_wrap">
            <div className="editPc_body">
              <div className="edit_pc_body_inner">
                <section style={{ display: 'flex' }}>
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
                      </div>
                      <div className="item_box">
                        <Button
                          size="sm"
                          color="secondary"
                          onClick={handleClickProjectSearch}
                        >案件参照
                        </Button>
                      </div>
                    </div>
                    <div className="item_wrap">
                      <div className="item_box">
                        <div className="item_head">見積日付</div>
                        <DatePicker
                          date={editState.quote_date}
                          label="見積日付"
                          onChange={(v) => setEditState({ ...editState, quote_date: v })}
                          require
                        />
                      </div>
                      <div className="item_box">
                        <div className="item_head">見積番号</div>
                        <Input
                          value="E2099"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="item_wrap">
                      <div className="item_box">
                        <div className="item_head">工期</div>
                        <DatePicker
                          date={editState.order_construction_start}
                          onChange={(v) => setEditState({
                            ...editState, order_construction_start: v,
                          })}
                          require
                        />
                        <label className="ml_10">〜</label>
                        <DatePicker
                          date={editState.order_construction_end}
                          onChange={(v) => setEditState({
                            ...editState, order_construction_end: v,
                          })}
                        />
                        <RightLabelInputField
                          label="日間"
                          value={getTermDay(
                            editState.order_construction_start,
                            editState.order_construction_end,
                          ) || ''}
                          className="during ml_10"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="item_wrap">
                      <div className="item_box">
                        <div className="item_head">見積有効期限</div>
                        <DatePicker
                          date={editState.quote_expiration_date}
                          onChange={(v) => setEditState({ ...editState, quote_expiration_date: v })}
                          require
                        />
                      </div>
                      <div className="item_box">
                        <div className="item_head">発注予定日</div>
                        <DatePicker
                          date={editState.order_expected_date}
                          onChange={(v) => setEditState({ ...editState, order_expected_date: v })}
                          require
                        />
                      </div>
                    </div>
                  </div>
                  <div className="right_box">
                    <div className="item_wrap">
                      <div className="item_box">
                        <div className="item_head">見積作成者</div>
                        <Input
                          label=""
                          value="テスト"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="item_wrap">
                      <div className="item_box">
                        <div className="item_head">備考</div>
                        <TextArea
                          rows={4}
                          value={editState.remarks}
                          onChange={(e) => setEditState({
                            ...editState, remarks: e.target.value,
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <section className="estimate_explore">
                <EstimateExplore
                  id={Number(id)}
                  priceData={priceState}
                />
              </section>
              <section className="estimate_price_area">
                <EstimatePriceAreaPC
                  data={meisaiList}
                  callback={setPriceState}
                />
              </section>
            </div>
          </div>

        </div>
      </div> */}
      {/* <footer className="btn_area">
        <div className="left_box" />
        <div className="right_box">
          <FooterElement
            callback={handleClickPost}
            callbackCopy={handleClickCopy}
            callbackCancel={() => dispatch(push(RoutingPath.estimate))}
          />
        </div>
      </footer> */}

    </BasePagePC>
  );
};
