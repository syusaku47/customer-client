import './base.page.pc.scss';
import { ReactElement } from 'react';
import { HeaderPC } from '../layout/header/header.pc';

export type BaseProps = {
  // title: string,
  className?: string,
  children?: ReactElement | ReactElement[],
};

export const BasePagePC = (props: BaseProps) => {
  const {
    children,
  } = props;

  return (
    <>
      {/* - header - */}
      <HeaderPC />
      {/* - body - */}
      <div className="base_page_body">
        {children}
      </div>
      <footer>
        Copyright&nbsp;&copy;&nbsp;2021 SHIP Inc All Rights Reserved.
      </footer>
    </>
  );
};
