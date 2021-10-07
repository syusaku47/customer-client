export type WebShare = {
  callbackError: () => void;
} & globalThis.ShareData

/**
 * Web Share Api
 * @param param
 */
export const webShareApi = (param: WebShare) => {
  try {
    navigator.share(param);
  } catch (err) {
    param.callbackError();
  }
};
