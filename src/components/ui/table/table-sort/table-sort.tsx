import { useEffect, useState, useMemo } from 'react';
import { Pagination } from '../../pagination/pagination';
import { Select } from '../../select/select';

export type Limit = 100 | 200 | 300 | 400 | 500 | 9999

type Props = {
  /** 表示件数 100 | 200 | 300 | 400 | 500 */
  limit: Limit;
  /** 全体件数 */
  hitCount: number;
  page: number;
  className?: string,
  callback: (page: number, limit: Limit) => void;
}

export const TableSort = (props: Props) => {
  const {
    limit, hitCount, page, className, callback,
  } = props;

  /* State */
  const [limitState, setLimitState] = useState(limit);
  const [pageState, setPageState] = useState(page);

  /* Memo */

  const limitCount = useMemo(() => {
    if (!(hitCount % limit)) {
      return Math.ceil(hitCount / limitState) + 1;
    } if (hitCount < limitState) {
      setPageState(0);
      return 1;
    }
    return Math.ceil(hitCount / limitState);
  }, [hitCount, limitState]);

  console.log(hitCount);
  console.log(limit);
  console.log(limitCount);

  /* Effect */
  useEffect(() => {
    callback(pageState, limitState);
  }, [limitState, pageState]);

  return (
    <div className={`table_sort ${className || ''}`}>
      <div className="left">
        <div className="count">ヒット件数：&nbsp;<span> {hitCount}</span>&emsp;件</div>
      </div>
      <div className="right pagenation">
        <Select
          className=""
          value={limitState}
          onChange={(v) => setLimitState(Number(v) as Limit)}
          options={[
            { text: '100', value: 100 },
            { text: '200', value: 200 },
            { text: '300', value: 300 },
            { text: '400', value: 400 },
            { text: '500', value: 500 },
            { text: '全て', value: 9999 },
          ]}
        />
        <Pagination
          page={pageState + 1}
          limitCount={limitCount}
          onChange={setPageState}
        />
      </div>
    </div>
  );
};
