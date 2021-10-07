import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep, isEqual } from 'lodash';
import '../search-box.pc.scss';
import { Select } from '../../../../ui/select/select';
import { useDidMount } from '../../../../../hooks/life-cycle';
import { MasterActions } from '../../../../../redux/master/master.action';
import { SupportHistorySortState } from '../../../../../type/support-history/support-history.type';
import { DatePicker } from '../../../../ui/date-picker/date-picker';
import { LeftIconButton } from '../../../../ui/button/left-icon-button/left-icon-button';
import { SearchBoxPC } from '../search-box.pc';
import { Radio } from '../../../../ui/radio/radio';
import { State } from '../../../../../redux/root.reducer';
import { SupportHistoryActions } from '../../../../../redux/support-history/support-history.action';
import { Input } from '../../../../ui/input/input';

type Props = {
  callback: () => void;
  openCallback: (v:boolean) => void;
}

export const SupportHistorySearchBox = (props: Props) => {
  const { callback, openCallback } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => (state.supportHistory.sort), isEqual);
  const supportHistoryList = useSelector((state:State) => state.master.supportHistoryList, isEqual);
  const employeeList = useSelector((state:State) => state.master.employeeList, isEqual);
  const storeList = useSelector((state:State) => state.master.storeList, isEqual);

  /* State */
  const [sort, setSort] = useState(cloneDeep(sortState));

  /* Callback */
  const setState = useCallback(
    (v: SupportHistorySortState) => {
      setSort(v);
      dispatch(SupportHistoryActions.setSort(cloneDeep(v)));
    }, [sort],
  );

  const handleClickSearch = useCallback(
    () => {
      callback();
    }, [callback],
  );

  /* Effect */
  useDidMount(() => {
    dispatch(MasterActions.api.store.getList({}));
    dispatch(MasterActions.api.employee.getList({}));
    dispatch(MasterActions.api.supportHistory.getList({}));
  });

  return (
    <SearchBoxPC
      openCallback={openCallback}
      isDetail
    >
      <div onKeyPress={(e) => { if (e.key === 'Enter') handleClickSearch(); }}>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">受付日</div>
            <DatePicker
              date={sort?.reception_date || null}
              onChange={(v) => setState(
                { ...sort, reception_date: v },
              )}
            />
          </div>
          <div className="item_box">
            <div className="item_head">カテゴリ</div>
            <Select
              value={sort?.category}
              onChange={(data) => setState({ ...sort, category: Number(data) })}
              defaultLabel="全て"
              options={supportHistoryList.map((v) => ({
                text: v.supported, value: v.id,
              }))}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">対応区分</div>

            {/* <input
              type="radio"
              name="test"
              // checked
              onChange={() => { setState({ ...sort, supported_kubun: 0 }); }}
            />未対応
            <input
              type="radio"
              name="test"
              // checked
              onChange={() => { setState({ ...sort, supported_kubun: 1 }); }}
            />すべて */}

            <Radio
              label="未対応"
              name="kubun"
              value="kubun0"
              checked={!sort.supported_kubun}
              onChange={() => { setState({ ...sort, supported_kubun: 0 }); }}
            />
            <Radio
              label="すべて"
              name="kubun"
              value="kubun1"
              checked={!!sort.supported_kubun}
              onChange={() => { setState({ ...sort, supported_kubun: 1 }); }}
            />

          </div>
          <div className="item_box">
            <div className="item_head">文字列検索</div>
            <Input
              className="mr_10"
              value={sort?.word}
              onChange={(e) => setState({ ...sort, word: e.target.value })}
            />
            <span className="comment">※検索対象項目：タイトル、詳細内容、対応内容</span>
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
              <div className="item_head">顧客名</div>
              <Input
                value={sort?.customer_name}
                onChange={(e) => setState({ ...sort, customer_name: e.target.value })}
              />
            </div>
            <div className="item_box">
              <div className="item_head">顧客担当</div>
              <Select
                className="add_text_left"
                label="店舗"
                value={sort?.customer_responsible_store}
                onChange={(data) => setState({ ...sort, customer_responsible_store: Number(data) })}
                defaultLabel="全て"
                options={storeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
              />
              <Select
                className="add_text_left"
                label="担当者"
                value={sort?.customer_representative}
                onChange={(data) => setState({ ...sort, customer_representative: Number(data) })}
                defaultLabel="全て"
                options={employeeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
              />
            </div>
          </div>
          <div className="item_wrap flex_no_wrap_box">
            <div className="item_box">
              <div className="item_head">対応日</div>
              <DatePicker
                date={sort?.supported_complete_date || null}
                onChange={(v) => setState(
                  { ...sort, supported_complete_date: v },
                )}
              />
            </div>
            <div className="item_box">
              <div className="item_head">対応担当</div>
              <Select
                className="add_text_left"
                label="店舗"
                value={sort?.supported_responsible_store}
                defaultLabel="全て"
                onChange={(data) => setState({
                  ...sort, supported_responsible_store: Number(data),
                })}
                options={storeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
              />
              <Select
                className="add_text_left"
                label="担当者"
                defaultLabel="全て"
                value={sort?.supported_representative}
                onChange={(data) => setState({ ...sort, supported_representative: Number(data) })}
                options={employeeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
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
  );
};
