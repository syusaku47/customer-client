/* eslint-disable no-case-declarations */
export type DateFormat =
  'YYYY'
  | 'YYYYMM'
  | 'YYYYMMDD'
  | 'YYYYMMDD_HHmm'
  | 'YYYYMMDD_HHmmSS'
  | 'MMDD'
  | 'MMDD_HHmm'
  | 'MMDD_HHmmSS'
  | 'HHmm'
  | 'HHmmSS'
  | 'JPN_YYYYMD'
  | 'JPN_YYYYMMDD'
  | 'JPN_YYYY M D';

export class DateFormatter {
  /**
   * date -> str
   * @param {Date} date
   * @param {DateFormat} format
   * @param {string} dateSplitStr
   * @return {string}
   */
  static date2str(date: Date | null |string | undefined, format: DateFormat = 'YYYYMMDD', dateSplitStr: string = '/'): string {
    if (!date) {
      // console.log('date is null : ', date);
      return '';
    }

    const changeDate = typeof date === 'string' ? new Date(date) : date;

    const YYYY: string = `${changeDate.getFullYear()}`;
    const MM: string = (`0${String(changeDate.getMonth() + 1)}`).slice(-2);
    const DD: string = (`0${String(changeDate.getDate())}`).slice(-2);
    const HH: string = (`0${String(changeDate.getHours())}`).slice(-2);
    const mm: string = (`0${String(changeDate.getMinutes())}`).slice(-2);
    const SS: string = (`0${String(changeDate.getSeconds())}`).slice(-2);
    // console.group('debug');
    // console.log('date : ', date);
    // console.log(YYYY, MM, DD, HH, MM, SS);
    // console.groupEnd();
    switch (format) {
      case 'YYYY':
        return YYYY;
      case 'YYYYMM':
        return `${YYYY}${dateSplitStr}${MM}`;
      case 'YYYYMMDD':
        return `${YYYY}${dateSplitStr}${MM}${dateSplitStr}${DD}`;
      case 'YYYYMMDD_HHmm':
        return `${YYYY}${dateSplitStr}${MM}${dateSplitStr}${DD} ${HH}:${mm}`;
      case 'YYYYMMDD_HHmmSS':
        return `${YYYY}${dateSplitStr}${MM}${dateSplitStr}${DD} ${HH}:${mm}:${SS}`;
      case 'MMDD':
        return `${MM}${dateSplitStr}${DD}`;
      case 'MMDD_HHmm':
        return `${MM}${dateSplitStr}${DD} ${HH}:${mm}`;
      case 'MMDD_HHmmSS':
        return `${MM}${dateSplitStr}${DD} ${HH}:${mm}:${SS}`;
      case 'HHmm':
        return `${HH}:${mm}`;
      case 'HHmmSS':
        return `${HH}:${mm}:${SS}`;
      case 'JPN_YYYYMD':
        return `${YYYY}年${MM[0] === '0' ? MM[1] : MM}月${DD[0] === '0' ? DD[1] : DD}日`;
      case 'JPN_YYYYMMDD':
        return `${YYYY}年${MM}月${DD}日`;
      case 'JPN_YYYY M D':
        const YYYY2: string = `${changeDate.getFullYear()}`;
        const MM2: string = (` ${String(changeDate.getMonth() + 1)}`).slice(-2);
        const DD2: string = (` ${String(changeDate.getDate())}`).slice(-2);
        return `${YYYY2}年${MM2}月${DD2}日`;
      default:
        window.console.error('this format is undefined !! : ', format);
        return 'error';
    }
  }

  static changeDate(str: string | undefined) {
    return str ? new Date(str) : null;
  }

  /**
   * str -> date
   * @param str
   * @return {Date | null}
   */
  static str2date(str: string): Date | null {
    if (!str) return null;
    const replacedStr: string = str
      .replace(/\//g, '-')
      .replace(/年/g, '-')
      .replace(/月/g, '-')
      .replace(/日/g, '')
      .replace(/\s/g, 'T');
    const yearStr: string = replacedStr.split('-')[0];
    const monthStr: string = (`00${replacedStr.split('-')[1]}`).slice(-2);
    const dateStr: string = (`00${replacedStr.split('-')[2].split('T')[0]}`).slice(-2);
    const timeStr = replacedStr.split('-')[2].split('T').length > 1 ? replacedStr.split('-')[2].split('T')[1] : '';
    const dateString = `${yearStr}-${monthStr}-${dateStr}${timeStr ? `T${timeStr}` : ''}.000+09:00`;
    const date: Date = new Date(dateString);
    // console.group('str2date()');
    // console.log('str : ', str);
    // console.log('replace str : ', replacedStr);
    // console.log('y m d t : ', yearStr, monthStr, dateStr, timeStr);
    // console.log('dateString : ', dateString);
    // console.log('date : ', date);
    // console.groupEnd();
    return (str ? (
      date
    ) : (
      null
    ));
  }

  /**
   * str (YYYY-MM-DD) -> date
   * @param str
   * @return {Date | null}
   */
  static str2dateNoTime(replacedStr: string = ''): Date | null {
    if (replacedStr === '') return null;
    return new Date(replacedStr);
  }

  /**
   * 日付を和暦にして返す
   *
   * @param  日付
   * @return string
   * */
  static date2Wareki(date:Date):string {
    if (date == null) return '';
    const waYear:
      { index: number, name: string, year: number; } = DateFormatter.getWaYearFromSeireki(
        date.getFullYear(),
      );
    if (waYear.name !== '') {
      return `${waYear.name + waYear.year}年${date.getMonth() + 1}月${date.getDate()}日`;
    }
    return '';
  }

  /**
   * 西暦から年号＋年号Index＋年数に変換
   * @param  val    西暦
   * @return Object 和暦
   * */
  static getWaYearFromSeireki(val:number):{index:number, name:string, year:number} {
    const name_era_list:any = ([{ name: '', syear: '' }, { name: '令和', syear: '2018' }, { name: '平成', syear: '1988' }, { name: '昭和', syear: '1925' }, { name: '大正', syear: '1911' }, { name: '明治', syear: '1867' }]);
    const retObj = { index: 0, name: name_era_list[0].name, year: name_era_list[0].syear };
    for (let i:number = 0; i < name_era_list.length; i += 1) {
      if (name_era_list[i].syear !== '' && Number(name_era_list[i].syear) < val) {
        retObj.index = i;
        retObj.name = name_era_list[i].name;
        retObj.year = val - Number(name_era_list[i].syear);
        return retObj;
      }
    }
    return retObj;
  }
}
