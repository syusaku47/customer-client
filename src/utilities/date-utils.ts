import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format';

export class ExtendedUtils extends DateFnsUtils {
  getCalendarHeaderText(date:Date) {
    return format(date, 'yyyy MMM', { locale: this.locale });
  }

  getDatePickerHeaderText(date:Date) {
    return format(date, 'MMMd日', { locale: this.locale });
  }
}
