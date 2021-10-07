import { cloneDeep } from 'lodash';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchBoxPC } from '../../../../layout/search-box/search-box.pc';
import { DatePicker } from '../../../../../ui/date-picker/date-picker';
import { LeftIconButton } from '../../../../../ui/button/left-icon-button/left-icon-button';
import { CsvActions } from '../../../../../../redux/csv/csv.action';
import { State } from '../../../../../../redux/root.reducer';
import { CsvCustomerRankSort } from '../../../../../../type/csv/csv-sort.type';

type Props = {
  callback: (v: CsvCustomerRankSort) => void;
}

export const CsvSearchBoxCustomerRank = (props: Props) => {
  const { callback } = props;

  /* Hooks */
  // eslint-disable-next-line
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => state.csv.customerRankSort);

  /* State */
  const [sort, setSort] = useState(cloneDeep(sortState));

  /* Callback */
  const setState = useCallback((v: CsvCustomerRankSort) => {
    setSort(v);
    dispatch(CsvActions.setCustomerRankSort(v));
  }, [sort]);

  const handleClickSearch = useCallback(() => {
    callback(sort);
  }, [callback, sort]);

  return (
    <>
      <SearchBoxPC
        openCallback={() => {}}
      >
        <div id="csv_customer_rank">
          <div className="item_wrap flex_no_wrap_box">
            <div className="item_box">
              <div className="item_head">更新日</div>
              <DatePicker
                date={sort.updated_start_date || null}
                onChange={(v) => setState(
                  { ...sort, updated_start_date: v },
                )}
              />
              <label className="ml_10">〜</label>
              <DatePicker
                date={sort.updated_end_date || null}
                onChange={(v) => setState(
                  { ...sort, updated_end_date: v },
                )}
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
      </SearchBoxPC>
    </>
  );
};
