import { useState } from 'react';
import { IconButton } from '../../../ui/button/icon-button/icon-button';
import './search-box.pc.scss';

type Props = {
  children: HTMLElement | globalThis.JSX.Element;
  isDetail?: boolean;
  openCallback: (v: boolean) => void;
};

/* detail 部分は className="search_detail" */
export const SearchBoxPC = (props:Props) => {
  const {
    children, isDetail, openCallback,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      className={`search_area ${isOpen ? 'detail_on' : ''} ${!isDetail ? 'only_simple' : ''}`}
    >
      {children}
      {isDetail && (
      <div className="btn_box">
        <IconButton
          fontAwesomeClass="fas fa-angle-double-down"
          className="for_detail_down"
          color="default"
          onClick={() => {
            openCallback(true);
            setIsOpen(true);
          }}
        />
        <IconButton
          fontAwesomeClass="fas fa-angle-double-up"
          className="for_detail_up"
          color="default"
          onClick={() => {
            openCallback(false);
            setIsOpen(false);
          }}
        />
      </div>
      )}
    </section>
  );
};
