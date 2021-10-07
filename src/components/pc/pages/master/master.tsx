/* eslint-disable  */
import './master.scss';
import { useState, useCallback, useMemo } from 'react';
import { BasePagePC } from '../base.page.pc';
import { MasterCollection } from './master.collection';
import { SideMenu } from './side-menu/side-menu';
import { getMasterBody } from './get-master-body';

const Body = (props:{detailType:number}) => getMasterBody(props.detailType);

export const Master = () => {
  /* State */
  const [menuType, setMenuType] = useState(0);
  const [detailType, setDetailType] = useState(0);

  /* Memo */
  const detailMenu = useMemo(() => MasterCollection.sideMenu.find(
    (v) => v.type === menuType,
  )?.child || [], [menuType]);

  /* Callback */
  const handleClickSideMenu = useCallback(
    (type: number) => {
      setMenuType(type);
      setDetailType(MasterCollection.sideMenu[type].child[0].type ?? 0);
    }, [],
  );

  return (
    <BasePagePC>
      <div id="master" className="cnt_area">
        <div className="inner">
          <SideMenu
            activeId={menuType}
            list={MasterCollection.sideMenu}
            callback={handleClickSideMenu}
          />
          <SideMenu
            activeId={detailType}
            list={detailMenu}
            callback={setDetailType}
          />
        <Body detailType={detailType} />
        </div>
      </div>
    </BasePagePC>
  );
};
