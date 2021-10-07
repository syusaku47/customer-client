// ログイン画面のパスワード変更
export type ApiPasswordChangeParamOut = {
  mail_address: string;
  password: string;
  password_confirmation: string;
  token: string;
};

// SP版ユーザー情報のパスワード変更
export type ApiPasswordChangeParamIn = {
  password: string;
  password_confirmation: string;
};

export type ApiPasswordCheckDateParam = {
  mail_address: string;
  token: string;
};

export type ApiPasswordMailSendParam = {
  mail_address: string;
};
