export class CommonCollection {
  static readonly pullDownFilterList = [
    { text: 'のみ', value: 1 },
    { text: '以上', value: 2 },
    { text: '以下', value: 3 },
  ]

  private static _month = [
    { text: '1', value: 1 },
    { text: '2', value: 2 },
    { text: '3', value: 3 },
    { text: '4', value: 4 },
    { text: '5', value: 5 },
    { text: '6', value: 6 },
    { text: '7', value: 7 },
    { text: '8', value: 8 },
    { text: '9', value: 9 },
    { text: '10', value: 10 },
    { text: '11', value: 11 },
    { text: '12', value: 12 },
  ];

  private static _year = [
    { text: '1990', value: 1990 },
    { text: '1991', value: 1991 },
    { text: '1992', value: 1992 },
    { text: '1993', value: 1993 },
    { text: '1994', value: 1994 },
    { text: '1995', value: 1995 },
    { text: '1996', value: 1996 },
    { text: '1997', value: 1997 },
    { text: '1998', value: 1998 },
    { text: '1999', value: 1999 },
    { text: '2000', value: 2000 },
    { text: '2001', value: 2001 },
    { text: '2002', value: 2002 },
    { text: '2003', value: 2003 },
    { text: '2004', value: 2004 },
    { text: '2005', value: 2005 },
    { text: '2006', value: 2006 },
    { text: '2007', value: 2007 },
    { text: '2008', value: 2008 },
    { text: '2009', value: 2009 },
    { text: '2010', value: 2010 },
    { text: '2011', value: 2011 },
    { text: '2012', value: 2012 },
    { text: '2013', value: 2013 },
    { text: '2014', value: 2014 },
    { text: '2015', value: 2015 },
    { text: '2016', value: 2016 },
    { text: '2017', value: 2017 },
    { text: '2018', value: 2018 },
    { text: '2019', value: 2019 },
    { text: '2020', value: 2020 },
    { text: '2021', value: 2021 },
    { text: '2022', value: 2022 },
    { text: '2023', value: 2023 },
    { text: '2024', value: 2024 },
    { text: '2025', value: 2025 },
    { text: '2026', value: 2026 },
    { text: '2027', value: 2027 },
    { text: '2028', value: 2028 },
    { text: '2029', value: 2029 },
    { text: '2030', value: 2030 },
    { text: '2031', value: 2031 },
    { text: '2032', value: 2032 },
    { text: '2033', value: 2033 },
    { text: '2034', value: 2034 },
    { text: '2035', value: 2035 },
    { text: '2036', value: 2036 },
    { text: '2037', value: 2037 },
    { text: '2038', value: 2038 },
    { text: '2039', value: 2039 },
    { text: '2040', value: 2040 },
    { text: '2041', value: 2041 },
    { text: '2042', value: 2042 },
    { text: '2043', value: 2043 },
    { text: '2044', value: 2044 },
    { text: '2045', value: 2045 },
    { text: '2046', value: 2046 },
    { text: '2047', value: 2047 },
    { text: '2048', value: 2048 },
    { text: '2049', value: 2049 },
    { text: '2050', value: 2050 },
  ];

  static get month() {
    return CommonCollection._month;
  }

  static get year() {
    return CommonCollection._year;
  }

  static shohinKubunList = [
    { value: 1, text: '資材' },
    { value: 2, text: '工事' },
    { value: 3, text: '設備' },
    { value: 4, text: '材公共' },
    { value: 5, text: 'その他' },
  ]

  static readonly acceptFile = '.xlsx, .xls, .doc, .docx, .ppt, .pptx, .pdf, .jpg, .png, .jpeg, .png, .gif, .svg, .mp4, .m4a, .avi, .mov, .wmv, .flv, .mkv, .mpg, .mpg, .webm, .wave, .aif, .mp3, .aac, .flac, .zip'
}
