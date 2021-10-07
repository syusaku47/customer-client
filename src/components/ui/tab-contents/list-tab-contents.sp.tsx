import React from 'react';
import { Button } from '../button/button';
import { ButtonProps } from '../button/button.type';
import './list-tab-contents.sp.scss';

type Props = {
  list: HTMLElement | globalThis.JSX.Element;
  buttonLabel: string;
} & ButtonProps

export const ListTabContentsSP = (props: Props) => {
  const { list, buttonLabel, onClick } = props;
  return (
    <div className="listTabContentsSP">
      {list}
      <div className="attached_btn">
        <Button
          onClick={onClick}
          size="md"
          color="secondary"
        >{buttonLabel}
        </Button>
      </div>
    </div>
  );
};
