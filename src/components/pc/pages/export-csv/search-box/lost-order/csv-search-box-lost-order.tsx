import lodash, { cloneDeep, isEqual } from 'lodash';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchBoxPC } from '../../../../layout/search-box/search-box.pc';
import { Select } from '../../../../../ui/select/select';
import { LeftIconButton } from '../../../../../ui/button/left-icon-button/left-icon-button';
import { CsvActions } from '../../../../../../redux/csv/csv.action';
import { State } from '../../../../../../redux/root.reducer';
import { CsvLostOrderSort } from '../../../../../../type/csv/csv-sort.type';
import { DatePicker } from '../../../../../ui/date-picker/date-picker';
import { useDidMount } from '../../../../../../hooks/life-cycle';
import { MasterActions } from '../../../../../../redux/master/master.action';
import { TagActions } from '../../../../../../redux/tag/tag.action';
import { TagModel } from '../../../../../../model/tag/tag';
import { Input } from '../../../../../ui/input/input';
import { RightLabelCheckbox } from '../../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';

type Props = {
  openCallback: (v: boolean) => void;
  callback: (v: CsvLostOrderSort) => void;
}

export const CsvSearchBoxLostOrder = (props: Props) => {
  const { openCallback, callback } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => state.csv.lostOrderSort);
  const {
    projectRankList,
    lostOrderList,
    storeList,
    employeeList,
  } = useSelector((state: State) => (state.master), isEqual);
  const {
    partList,
  } = useSelector((state: State) => (state.tag), isEqual);

  /* State */
  const [sort, setSort] = useState(cloneDeep(sortState));

  /* Callback */
  const setState = useCallback((v: CsvLostOrderSort) => {
    setSort(v);
    dispatch(CsvActions.setLostOrderSort(v));
  }, [sort]);

  const handleClickSearch = useCallback(() => {
    callback(sort);
  }, [callback, sort]);

  /* Master */
  useDidMount(() => {
    dispatch(MasterActions.api.projectRank.getList({}));
    dispatch(MasterActions.api.lostOrder.getList({}));
    dispatch(MasterActions.api.store.getList({}));
    dispatch(MasterActions.api.employee.getList({}));
    dispatch(TagActions.api.part.getList());
    setState({
      ...lodash.cloneDeep(sort),
      parts: new TagModel(partList),
    });
  });

  return (
    <>
      <SearchBoxPC
        openCallback={openCallback}
        isDetail
      >
        <div id="csv_lost_order">
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">見込みランク</div>
              <Select
                className="add_text_left"
                value={sort?.project_rank}
                onChange={(data) => setSort({ ...sort, project_rank: Number(data) })}
                defaultLabel="全て"
                options={projectRankList.map((v) => ({
                  text: v.name, value: v.project_rank_id,
                }))}
              />
              <Select
                className=""
                value={sort?.project_rank_filter}
                onChange={(v) => setState({ ...sort, project_rank_filter: Number(v) })}
                options={[
                  { text: 'のみ', value: 1 },
                  { text: '以上', value: 2 },
                  { text: '以下', value: 3 },
                ]}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">最終見積金額</div>
              <Input
                className=""
                type="number"
                value={sort?.last_quote_price_min}
                onChange={(e) => setState(
                  { ...sort, last_quote_price_min: Number(e.target.value) },
                )}
              />
              <label className="ml_10">〜</label>
              <Input
                className=""
                type="number"
                value={sort?.last_quote_price_max}
                onChange={(e) => setState(
                  { ...sort, last_quote_price_max: Number(e.target.value) },
                )}
              />
            </div>
            <div className="item_box">
              <div className="item_head">粗利(%)</div>
              <Input
                className=""
                type="number"
                value={sort?.gross_profit_rate}
                onChange={(e) => setState({ ...sort, gross_profit_rate: e.target.value })}
              />
              <Select
                className=""
                value={sort?.gross_profit_rate_filter}
                onChange={(v) => setState({ ...sort, gross_profit_rate_filter: Number(v) })}
                options={[
                  { text: '以上', value: 1 },
                  { text: '以下', value: 2 },
                ]}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">部位</div>
              <div className="flex_wrap_box">
                {sort?.parts?.data.map((v, i) => (
                  <div key={`tag${i}`}>
                    <RightLabelCheckbox
                      className="customerPC__body__inner__checkbox"
                      key={v.id}
                      label={v.label}
                      checked={v.flag}
                      onChange={() => {
                        sort.parts?.changeFlag(v.id);
                        setState({
                          ...sort, parts: lodash.cloneDeep(sort.parts),
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">失注日</div>
              <DatePicker
                date={sort.failure_start_date || null}
                onChange={(v) => setState(
                  { ...sort, failure_start_date: v },
                )}
              />
              <label className="ml_10">〜</label>
              <DatePicker
                date={sort.failure_end_date || null}
                onChange={(v) => setState(
                  { ...sort, failure_end_date: v },
                )}
              />
            </div>
            <div className="item_box">
              <div className="item_head">失注理由</div>
              <Select
                className="add_text_left"
                value={sort?.failure_cause}
                onChange={(data) => setSort({ ...sort, failure_cause: Number(data) })}
                defaultLabel="全て"
                options={lostOrderList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
              />
            </div>
            <LeftIconButton
              label="検索"
              fontAwesomeClass="fas fa-search"
              className="btn_search for_simple"
              size="sm"
              color="secondary"
              onClick={handleClickSearch}
            />
          </div>

          <div className="search_detail">
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">営業担当</div>
                <Select
                  className="add_text_left"
                  label="店舗"
                  value={sort?.sales_shop}
                  onChange={(data) => setSort({ ...sort, sales_shop: Number(data) })}
                  defaultLabel="全て"
                  options={storeList.map((v) => ({
                    text: v.name, value: v.id,
                  }))}
                />
                <Select
                  className="add_text_left"
                  label="担当者"
                  value={sort?.sales_contact}
                  onChange={(data) => setSort({ ...sort, sales_contact: Number(data) })}
                  defaultLabel="全て"
                  options={employeeList.map((v) => ({
                    text: v.name, value: v.id,
                  }))}
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">顧客名</div>
                <Input
                  className=""
                  value={sort?.customer_name}
                  onChange={(e) => setState({ ...sort, customer_name: e.target.value })}
                />
              </div>
              <div className="item_box">
                <div className="item_head">案件名</div>
                <Input
                  className=""
                  value={sort?.project_name}
                  onChange={(e) => setState({ ...sort, project_name: e.target.value })}
                />
              </div>
            </div>
            <div className="item_wrap">
              <div className="item_box">
                <div className="item_head">現場名称</div>
                <Input
                  className=""
                  value={sort?.field_name}
                  onChange={(e) => setState({ ...sort, field_name: e.target.value })}
                />
              </div>
              <div className="item_box">
                <div className="item_head">現場電話番号</div>
                <Input
                  className=""
                  type="number"
                  value={sort?.field_tel_no}
                  onChange={(e) => setState({ ...sort, field_tel_no: e.target.value })}
                />
              </div>
              <LeftIconButton
                label="検索"
                fontAwesomeClass="fas fa-search"
                className="btn_search for_detail"
                size="sm"
                color="secondary"
                onClick={handleClickSearch}
              />
            </div>
          </div>
        </div>
      </SearchBoxPC>
    </>
  );
};
