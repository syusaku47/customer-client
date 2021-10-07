import { DisplayElements } from '../../../../type/display-elements.type';
import './table-td.scss';

type TableTdProps = {
  tdList: DisplayElements[],
  selectable?: boolean,
  tdOption?: {
    tdAlign?: {
      index: number,
      align: string,
    }[],
    ellipsisLine?: number[],
  },
  rowSpanOption?: {
    line: number,
    item: number,
    length: number,
  } | null,
};

export const TableTd = (props: TableTdProps) => {
  const {
    tdList, tdOption, selectable, rowSpanOption,
  } = props;

  return (
    <>
      {
        tdList.map((data, i) => (
          <td
            key={i}
            className={
              `
              ${selectable ? (' selectable') : ('')}
              ${tdOption?.ellipsisLine ? tdOption?.ellipsisLine.map((v) => (
                i === v ? (' isEllipsis ') : ('')
              ))
                : ('')}
              `
            }
            style={
              tdOption?.tdAlign?.find((v) => i === v.index) ? {
                textAlign: `${tdOption?.tdAlign?.find((v) => v.index === i)?.align}` as any,
              } : { textAlign: 'center' }
            }
            rowSpan={rowSpanOption?.item === i ? rowSpanOption.length : 1}
          >
            {data}
          </td>
        ))
      }
    </>
  );
};
