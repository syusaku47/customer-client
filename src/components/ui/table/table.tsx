import { useEffect, useState, useCallback } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { TableTh } from './table-th/table-th';
import { TableTd } from './table-td/table-td';
import { DisplayElements } from '../../../type/display-elements.type';
import './table.scss';
import { KeyEventListener, KeyEventType } from '../../../utilities/key-event-listener';

export type TableOption = {
  /** tableの横幅指定 */
  tableWidth?: string;
  /** ellipsis */
  ellipsisLine?: number[];
  /** 列の横幅指定 */
  stringWidth?: {
    index: number;
    width: number;
  }[];
  /** tdの文字列の表示位置 */
  tdAlign?: {
    index: number;
    align: 'right' | 'center' | 'left';
  }[];
  /** セルの色の統一 */
  isSingleColor?: boolean;
  /** 行間の線幅強調 */
  borderSpan?: number[];
}

type TableProps = {
  /** ヘッダー部分の表示要素 */
  header: DisplayElements[];
  /** 各項目部分の表示要素 */
  lists: DisplayElements[][];
  idList?: number[];
  /** セルをclick可能かどうか */
  clickable?: boolean;
  rowDataList?: any[];
  /** click時のハンドラ */
  onClickRow?: (v: any) => void;
  onDbClick?: (v: any) => void;
  /** @deprecated 複数Shift・cmdクリック */
  onClickMulti?: (v: any[]) => void;
  option?: TableOption;
  /** rowSpan */
  rowSpanOptionArr?: {
    line: number;
    item: number;
    length: number;
  }[];
  /** 選択したセルのindex */
  selectedTr?: number[];
  /** ソート */
  sort?: {
    index?: number[];
    /** 0=asc 1=desc  */
    onClick: (order: 0 | 1, index: number) => void;
  };
  className?: string;
};

export const Table = (props: TableProps) => {
  const {
    header,
    lists,
    clickable,
    option,
    onClickRow,
    rowSpanOptionArr,
    selectedTr,
    sort,
    rowDataList,
    idList,
    onClickMulti,
    onDbClick,
    className,
  } = props;

  /* State */
  /* sort */
  const [tableLists, setTableLists] = useState<DisplayElements[][]>(lists);
  // eslint-disable-next-line
  const [pressKey, setPressKey] = useState<KeyEventType>('');
  const [multiIndex, setMultiIndex] = useState<number[]>([]);
  const [ctrlSelects, setCtrlSelects] = useState<number[]>([]);
  const [selectRow, setSelectRow] = useState<number>(NaN);

  // Descending:降順, Ascending:昇順
  const [sortOrder, setSortOrder] = useState<'Descending' | 'Ascending'>(
    'Descending',
  );

  /* Callback */
  const handlerClickTr = useCallback(
    (e: any, i: number) => {
      const isSame = selectRow === i;

      /* Ctrl + Click */
      if (pressKey === 'ctrl' && onClickMulti) {
        setMultiIndex([]);
        setSelectRow(NaN);
        const aryIdx = multiIndex.length ? cloneDeep(multiIndex) : cloneDeep(ctrlSelects);

        if (!Number.isNaN(selectRow) && !aryIdx.length) {
          aryIdx.push(selectRow);
        }

        const findIdx = aryIdx.findIndex((v) => v === i);
        if (findIdx !== -1) {
          aryIdx.splice(findIdx, 1);
        } else if (rowDataList) {
          aryIdx.push(i);
        }
        setCtrlSelects(cloneDeep(aryIdx));
        if (onClickMulti && rowDataList) {
          onClickMulti(cloneDeep(aryIdx.map((v) => rowDataList[v])));
        }
      }

      /* Shift + Click */
      if (pressKey === 'shift' && onClickMulti) {
        if (isSame || (Number.isNaN(selectRow) && !ctrlSelects.length)) return;

        let startIndex = NaN;
        let lastIndex = NaN;
        const rowdata = Number.isNaN(selectRow) ? ctrlSelects[ctrlSelects.length - 1] : selectRow;

        if (rowdata < i) {
          startIndex = rowdata;
          lastIndex = i;
        } else if (rowdata > i) {
          startIndex = i;
          lastIndex = rowdata;
        }

        const ary: number[] = [];
        const dataAry = [];
        for (let idx = startIndex; idx <= lastIndex; idx += 1) {
          ary.push(idx);
          if (rowDataList) {
            dataAry.push(rowDataList[idx]);
          }
        }
        setMultiIndex(cloneDeep(ary));

        if (onClickMulti && rowDataList) {
          onClickMulti(cloneDeep(dataAry));
        }
      }

      /* 何もなしクリック */
      if (!pressKey || !onClickMulti) {
        setMultiIndex([]);
        setCtrlSelects([]);

        if (isSame) {
          setSelectRow(NaN);
        } else {
          setSelectRow(i);
        }

        if (onClickRow && rowDataList) {
          onClickRow(isSame ? {} : cloneDeep(rowDataList[i]));
        }
      }
    },
    [
      lists,
      idList,
      onClickRow,
      rowDataList,
      onClickMulti,
      setMultiIndex,
      multiIndex,
      selectRow,
      pressKey,
      ctrlSelects,
    ],
  );

  const handlerDoubleClickTr = useCallback(
    (i) => {
      if (onDbClick && rowDataList) {
        onDbClick(cloneDeep(rowDataList[i]));
        setSelectRow(i);
      }
    },
    [handlerClickTr, rowDataList, onDbClick],
  );

  const sortClickAction = useCallback((index: number) => {
    if (sortOrder === 'Descending') {
      setSortOrder('Ascending');
    } else {
      setSortOrder('Descending');
    }
    if (sort?.onClick) {
      sort.onClick(sortOrder === 'Descending' ? 1 : 0, index);
    }
  }, [sort, sortOrder]);

  /* option */
  const thOptions = {
    stringWidth: option?.stringWidth,
    ellipsisLine: option?.ellipsisLine,
  };

  const tdOptions = {
    tdAlign: option?.tdAlign,
    ellipsisLine: option?.ellipsisLine,
  };

  const sortOption = sort
    ? {
      index: sort?.index || [],
      onClickAction: sortClickAction,
      sortOrder,
    }
    : undefined;

  /* Effect */
  useEffect(() => {
    setTableLists(lists);
  }, [lists]);

  return (
    <KeyEventListener
      callback={setPressKey}
    >
      {/* <div theme={option?.tableWidth}> */}
      <table className={`${className}`}>
        <thead>
          <tr>
            <TableTh thList={header} thOption={thOptions} sort={sortOption} />
          </tr>
        </thead>
        <tbody>
          {tableLists?.map((list, i) => (
            <tr
              key={i}
              className={`
                    ${clickable ? 'isSelectable' : ''}
                    ${selectedTr && selectedTr?.findIndex((v) => v === i) !== -1 ? 'selected' : ''}
                    ${option?.isSingleColor ? ' isSingleColor' : ''}
                  `}
              onClick={(e) => handlerClickTr(e, i)}
              onDoubleClick={() => handlerDoubleClickTr(i)}
              style={option?.borderSpan && option.borderSpan.find((b) => (b === i && i !== tableLists.length - 1)) ? { borderBottom: '3px solid #CCCCCC' } : {}}
            >
              <TableTd
                tdList={list}
                selectable={!!clickable}
                tdOption={tdOptions}
                rowSpanOption={rowSpanOptionArr?.find(
                  (obj) => obj.line === i,
                )}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </KeyEventListener>
  );
};
