const userAgent = navigator.userAgent.toLowerCase();
export const UserAgent = userAgent.indexOf('mobile') > -1
  || userAgent.indexOf('ipad') > -1
  || userAgent.indexOf('android') > -1
  || (userAgent.indexOf('macintosh') > -1 && 'ontouchend' in document)
  ? 'sp'
  : 'pc';
export const isiPhon14_6Safari = userAgent.match('iphone')
  && userAgent.match('14_6')
  && !userAgent.match('edge')
  && !userAgent.match('crios')
  && !userAgent.match('firefox');
