import { useState } from 'react';
import { DisplayElements } from '../../../../type/display-elements.type';
import './table-th.scss';

type TableThProps = {
  thList: DisplayElements[],
  thOption?: {
    stringWidth?: {
      index: number,
      width: number,
    }[],
    ellipsisLine?: number[],
  },
  sort?: {
    index: number[] | undefined,
    onClickAction: (index: number) => void,
    sortOrder: 'Descending' | 'Ascending',
  },
};

export const TableTh = (props: TableThProps) => {
  const {
    thList, thOption, sort,
  } = props;

  const [focus, setFocus] = useState(NaN);

  return (
    <>
      {
        thList.map((data, i) => (
          <th
            key={i}
            style={
              thOption?.stringWidth?.find((v) => i === v.index) ? {
                maxWidth: `${thOption?.stringWidth?.find((v) => v.index === i)?.width}px`,
                minWidth: `${thOption?.stringWidth?.find((v) => v.index === i)?.width}px`,
                width: `${thOption?.stringWidth?.find((v) => v.index === i)?.width}px`,
              } : {}
            }
            className={
              `
              ${thOption?.ellipsisLine ? thOption.ellipsisLine.map((v) => (v === i ? ' isEllipsis' : '')) : ('')}
              ${sort?.index ? sort.index.map((v) => (v === i ? (' isSortable') : (''))) : ('')}
              ${sort?.sortOrder === 'Descending' ? ' isDescending' : ' isAscending'}
              `
            }
            onClick={() => {
              if ((sort?.index?.find((v) => v === i) !== undefined || sort?.index?.length === 0)) {
                setFocus(i);
                sort?.onClickAction(i);
              }
            }}
          >
            {data}
            {/* TODO  Sort矢印 */}
            {focus === i
              && (sort?.index?.find((v) => v === i) !== undefined
                || sort?.index?.length === 0)
              && <span className="sort_arrow">{sort?.sortOrder === 'Descending' ? '▲' : '▼'}</span>}

            {/* ↓↓↓ stickyの弊害対策 ↓↓↓ */}
            <div className="topBorder" />
            {i !== 0 ? (
              <><div className="sideBorder" /></>
            ) : (<></>)}
            {/* ↑↑↑ stickyの弊害対策 ↑↑↑ */}
          </th>
        ))
      }
    </>
  );
};
