import React, { useRef } from 'react';
import { Button } from '../../../ui/button/button';
import './search-box.sp.scss';

export const sampleValueList = [
  { label: 'hoge', value: 0 },
  { label: 'moge', value: 1 },
  { label: 'piyo', value: 2 },
];

type Props = {
  children: HTMLElement | globalThis.JSX.Element;
  callback?: () => void;
  type?: 'search' | 'determine'
};

export const SearchBox = (props: Props) => {
  const footerEle = useRef<HTMLDivElement>(null);
  const { children, callback, type } = props;

  return (
    <>
      <div className="search_box_body base_dialog_content_inner_body">
        {children}
      </div>

      <div className="search_box_footer base_dialog_content_inner_footer" id="dialog_footer" ref={footerEle}>
        {type === 'search'
          ? <Button color="primary" size="md" onClick={callback}>検索</Button>
          : <Button color="primary" size="md" onClick={callback}>決定</Button>}
      </div>
    </>
  );
};

SearchBox.defaultProps = { type: 'search' };
