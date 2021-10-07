/**
 * FileList -> File[] 変換
 * @param fileList
 */
export const convertFileList2FileArray = (fileList: FileList)
  : File[] => [...new Array(fileList.length)]
    .map((_, i) => fileList.item(i))
    .filter((v) => Boolean(v)) as File[];
