import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Select } from 'semantic-ui-react';
import lodash from 'lodash';
import { RightLabelCheckbox } from '../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { TopLabelInputField } from '../../../../ui/input-field/top-label-input-field/top-label-input-field';
import { sampleValueList, SearchBox } from '../../../layout/search-box/search-box.sp';
import './support-history-search-box.sp.scss';
import { SupportHistorySortState } from '../../../../../type/support-history/support-history.type';
import { SupportHistoryCollection } from '../../../../../collection/support-history/support-history.collection';
import { SupportHistoryActions } from '../../../../../redux/support-history/support-history.action';
import { Store } from '../../../../../redux/store';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { DateFormatter } from '../../../../../utilities/date-formatter';

type Props = {
  callback?:(data:SupportHistorySortState)=>void
}

export const SearchBoxSupportHistorySP = (props?:Props) => {
  /* Hooks */
  const dispatch = useDispatch();

  /* State */
  const [sort, setSort] = useState<SupportHistorySortState>(
    SupportHistoryCollection.initialSortState,
  );

  /* Callback */
  const handleClickSearch = useCallback(
    () => {
      dispatch(SupportHistoryActions.api.supportHistory.getList({
        param: {
          ...sort,
          is_fixed: undefined,
          offset: undefined,
          reception_date: DateFormatter.date2str(sort.reception_date),
          supported_complete_date: DateFormatter.date2str(sort.supported_complete_date),
          limit: 99999,
        },
      }));
      Store.dispatch(DialogActions.pop());
    }, [sort, props],
  );

  const setState = useCallback(
    (v: SupportHistorySortState) => {
      setSort(v);
      if (props?.callback) return;
      dispatch(SupportHistoryActions.setSort(v));
    }, [props],
  );

  /* Effect */
  useEffect(() => {
    setSort(lodash.cloneDeep(sort));
  }, []);

  return (
    <SearchBox callback={handleClickSearch}>
      {/* search_box_body_inner は各画面の共通用 */}
      <div className="search_box_sp_body_inner support_history_search_box_sp">
        <div className="category_wrap">
          <div className="item_wrap">
            <TopLabelInputField
              label="顧客名"
              value={sort?.customer_name}
              onChange={(e) => setState({ ...sort, customer_name: e.target.value })}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="案件名"
              value={sort?.project_name}
              onChange={(e) => setState({ ...sort, project_name: e.target.value })}
              className="full_width"
            />
          </div>
        </div>

        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">受付日</div>
            <div className="item_body item_period">
              <div className="item_period__inner">
                <div className="item_period__inner__year">
                  {/* TODO fukada 自前のSelectへの差し替えと、onChangeへ渡す関数の調整 */}
                  <Select
                    value={sort?.date_time_start_year}
                    onChange={
                    (_, data) => setState({ ...sort, date_time_start_year: Number(data.value) })
                  }
                    options={[
                      { text: '全て', value: NaN },
                      ...sampleValueList.map((v) => (
                        { text: v.label, value: v.value }
                      )),
                    ]}
                  />
                  <div>年</div>
                </div>
                <div className="item_period__inner__month">
                  <Select
                    value={sort?.date_time_start_month}
                    onChange={
                    (_, data) => setState({ ...sort, date_time_start_month: Number(data.value) })
                  }
                    options={[
                      { text: '全て', value: NaN },
                      ...sampleValueList.map((v) => (
                        { text: v.label, value: v.value }
                      )),
                    ]}
                  />
                  <div>月</div>
                </div>
                <div className="item_period__inner__day">
                  <Select
                    value={sort?.date_time_start_date}
                    onChange={
                    (_, data) => setState({ ...sort, date_time_start_date: Number(data.value) })
                  }
                    options={[
                      { text: '全て', value: NaN },
                      ...sampleValueList.map((v) => (
                        { text: v.label, value: v.value }
                      )),
                    ]}
                  />
                  <div>日</div>
                </div>
              </div>

              <div className="tilde">〜</div>

              <div className="item_body item_period">
                <div className="item_period__inner">
                  <div className="item_period__inner__year">
                    <Select
                      value={sort?.date_time_end_year}
                      onChange={
                    (_, data) => setState({ ...sort, date_time_end_year: Number(data.value) })
                  }
                      options={[
                        { text: '全て', value: NaN },
                        ...sampleValueList.map((v) => (
                          { text: v.label, value: v.value }
                        )),
                      ]}
                    />
                    <div>年</div>
                  </div>

                  <div className="item_period__inner__month">
                    <Select
                      value={sort?.date_time_end_month}
                      onChange={
                    (_, data) => setState({ ...sort, date_time_end_month: Number(data.value) })
                  }
                      options={[
                        { text: '全て', value: NaN },
                        ...sampleValueList.map((v) => (
                          { text: v.label, value: v.value }
                        )),
                      ]}
                    />
                    <div>月</div>
                  </div>

                  <div className="item_period__inner__day">
                    <Select
                      value={sort?.date_time_end_date}
                      onChange={
                    (_, data) => setState({ ...sort, date_time_end_date: Number(data.value) })
                  }
                      options={[
                        { text: '全て', value: NaN },
                        ...sampleValueList.map((v) => (
                          { text: v.label, value: v.value }
                        )),
                      ]}
                    />
                    <div>日</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">カテゴリ</div>
            <div className="item_body">
              <Select
                value={sort?.category}
                onChange={
                    (_, data) => setState({ ...sort, category: Number(data.value) })
                  }
                options={[
                  { text: '全て', value: NaN },
                  ...sampleValueList.map((v) => (
                    { text: v.label, value: v.value }
                  )),
                ]}
              />
            </div>

            <div className="item_wrap">
              <TopLabelInputField
                label="件名"
                value={sort?.subject}
                onChange={(e) => setState(
                  { ...sort, subject: e.target.value },
                )}
              />
            </div>

            <div className="item_wrap">
              <div className="item_label">対応者</div>
              <Select
                value={sort?.supported_person}
                onChange={
                    (_, data) => setState({ ...sort, supported_person: Number(data.value) })
                  }
                options={[
                  { text: '全て', value: NaN },
                  ...sampleValueList.map((v) => (
                    { text: v.label, value: v.value }
                  )),
                ]}
              />
            </div>
          </div>
        </div>

        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">対応日</div>
            <div className="item_body item_period">
              <div className="item_period__inner">
                <div className="item_period__inner__year">
                  <Select
                    value={sort?.supported_complete_start_year}
                    onChange={
                    (_, data) => setState(
                      { ...sort, supported_complete_start_year: Number(data.value) },
                    )
                  }
                    options={[
                      { text: '全て', value: NaN },
                      ...sampleValueList.map((v) => (
                        { text: v.label, value: v.value }
                      )),
                    ]}
                  />
                  <div>年</div>
                </div>

                <div className="item_period__inner__month">
                  <Select
                    value={sort?.supported_complete_start_month}
                    onChange={
                    (_, data) => setState(
                      { ...sort, supported_complete_start_month: Number(data.value) },
                    )
                  }
                    options={[
                      { text: '全て', value: NaN },
                      ...sampleValueList.map((v) => (
                        { text: v.label, value: v.value }
                      )),
                    ]}
                  />
                  <div>月</div>
                </div>

                <div className="item_period__inner__day">
                  <Select
                    value={sort?.supported_complete_start_date}
                    onChange={
                    (_, data) => setState(
                      { ...sort, supported_complete_start_date: Number(data.value) },
                    )
                  }
                    options={[
                      { text: '全て', value: NaN },
                      ...sampleValueList.map((v) => (
                        { text: v.label, value: v.value }
                      )),
                    ]}
                  />
                  <div>日</div>
                </div>
              </div>

              <div className="tilde">〜</div>

              <div className="item_body item_period">
                <div className="item_period__inner">
                  <div className="item_period__inner__year">
                    <Select
                      value={sort?.supported_complete_end_year}
                      onChange={
                    (_, data) => setState(
                      { ...sort, supported_complete_end_year: Number(data.value) },
                    )
                  }
                      options={[
                        { text: '全て', value: NaN },
                        ...sampleValueList.map((v) => (
                          { text: v.label, value: v.value }
                        )),
                      ]}
                    />
                    <div>年</div>
                  </div>

                  <div className="item_period__inner__month">
                    <Select
                      value={sort?.supported_complete_end_month}
                      onChange={
                    (_, data) => setState(
                      { ...sort, supported_complete_end_month: Number(data.value) },
                    )
                  }
                      options={[
                        { text: '全て', value: NaN },
                        ...sampleValueList.map((v) => (
                          { text: v.label, value: v.value }
                        )),
                      ]}
                    />
                    <div>月</div>
                  </div>

                  <div className="item_period__inner__day">
                    <Select
                      value={sort?.supported_complete_end_date}
                      onChange={
                    (_, data) => setState(
                      { ...sort, supported_complete_end_date: Number(data.value) },
                    )
                  }
                      options={[
                        { text: '全て', value: NaN },
                        ...sampleValueList.map((v) => (
                          { text: v.label, value: v.value }
                        )),
                      ]}
                    />
                    <div>日</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="category_wrap">
          <div className="item_wrap tags_form">
            <div className="item_body item_checkbox">
              <RightLabelCheckbox
                checked={!!sort?.is_fixed}
                label="対応済みフラグ"
                onChange={() => {
                  setState({ ...sort, is_fixed: !sort?.is_fixed ? 1 : 0 });
                }}
                className="single_column"
              />
            </div>
          </div>
        </div>
      </div>
    </SearchBox>
  );
};
