import {
  ReactElement, useEffect, useRef,
} from 'react';
import { noPinch } from '../../../utilities/no-pinch';
import { HeaderSP, SearchBoxDialogProps } from '../layout/header/header.sp';
import './base.page.sp.scss';
import '../../ui/info-window/info-window.sp.scss';

export type BaseProps = {
  searchBoxDialog?: SearchBoxDialogProps;
  className?: string;
  children?: ReactElement | ReactElement[];
  menuOpen?: boolean;
  /* TODO fukada 呼び出し箇所で検索用コールバック渡すのお願いします */
  searchCallback?: (val:string)=>void,
};

export const BasePageSP = (props: BaseProps) => {
  const headerEle = useRef<HTMLElement>(null);
  const footerEle = useRef<HTMLElement>(null);
  const {
    searchBoxDialog, className, children, menuOpen, searchCallback,
  } = props;

  /* effect */
  useEffect(() => {
    const target = headerEle.current;
    const pinchCallback = noPinch(target);
    return pinchCallback;
  }, [headerEle]);

  return (
    <div className={`base_page_sp ${className}`}>
      {/* - header - */}
      <HeaderSP
        userInfo={{
          employeeCD: '9999',
          storeName: 'ABC',
          userName: 'デモ太郎',
          userAltName: 'デモ',
          userFurigana: 'デモタロウ',
          jobPost: '社員',
          email: 'demo-taro@demo.co.jp',
        }}
        headerRef={headerEle}
        searchBoxDialog={searchBoxDialog}
        menuOpen={menuOpen}
        searchCallback={searchCallback}
      />

      {/* - body - */}
      <div
        className="base_page_sp_body"
      >
        {children}
      </div>
      <footer className="base_page_sp_footer" ref={footerEle}>
        Copyright&nbsp;&copy;&nbsp;2021 SHIP Inc All Rights Reserved.
      </footer>
    </div>
  );
};
