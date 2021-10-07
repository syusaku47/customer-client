import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import * as lodash from 'lodash';
import { useDispatch } from 'react-redux';
import { EstimateMeisaiSideMenu } from '../../../../../type/estimate/estimate-meisai.type';
import { EstimateSideMenuModePC } from './estimate-side-menu.model.pc';
import './estimate-side-menu.pc.scss';
import { Button } from '../../../../ui/button/button';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { ChangePrintNameDialogPC } from '../edit/change-print-name-dialog/change-print-name-dialog.pc';
import { EstimateActions } from '../../../../../redux/estimate/estimate.action';

type FolderIconProps = {
  isOpen?: boolean;
  callback: () => void;
}

const FolderIcon = (props: FolderIconProps) => {
  const { isOpen, callback } = props;
  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        callback();
      }}
    >
      {isOpen
        ? <i className="far fa-folder-open" />
        : <i className="far fa-folder" />}
    </span>
  );
};

export type Props = {
  data: EstimateMeisaiSideMenu | null;
  callback: (data: { daibunrui?: number, chubunrui?: number; }) => void;
  estimateId?: number;
  masterAdd?: boolean;
  allowEdit?: boolean;
}

export const EstimateSideMenu = (props:Props) => {
  const {
    data,
    callback,
    masterAdd,
    allowEdit,
    estimateId,
  } = props;

  const dispatch = useDispatch();

  /* State */
  const [state, setState] = useState<EstimateSideMenuModePC | null>(null);
  const [selectFolder, setSelectFolder] = useState<{
    daibunrui?: number, chubunrui?: number, isAll?: boolean; detail_id?:number
  } | null>({ isAll: true });

  const disabledChangePrint = useMemo(() => {
    if (!selectFolder) {
      return true;
    }
    if (selectFolder.isAll) {
      return true;
    }
    return false;
  }, [selectFolder]);

  /* Callback */
  const handleClickFolder = useCallback(
    (param: { daibunrui?: number, chubunrui?: number; isAll?: boolean; detail_id?:number}) => {
      setSelectFolder(lodash.cloneDeep(param));
      callback(lodash.cloneDeep(param));
    },
    [state, callback],
  );

  const handleClickFolderIcon = useCallback(
    (param: {
      isAll?: boolean;
      daibunrui?: number;
      chubunrui?: number;
      detail_id?: number;
    }) => {
      state?.changeOpen(param);
      setState(lodash.cloneDeep(state));
      handleClickFolder(param);
    },
    [state, handleClickFolder],
  );

  const handleClickMoveFolder = useCallback(
    (isUp: boolean) => {
      if (selectFolder?.daibunrui === undefined) return;
      state?.moveFolder({
        daibunrui: selectFolder?.daibunrui,
        chuBunrui: selectFolder?.chubunrui,
        isUp,
      });
      setState(lodash.cloneDeep(state));
    },
    [state, selectFolder],
  );

  const handleClickChangePrintName = useCallback(() => {
    if (!selectFolder && !state) return;
    let selectData:{
      name: string,
      printName: string,
      detail_id: number,
      category: number | undefined,
      sub_category: number | undefined,
    } = {
      name: '',
      printName: '',
      detail_id: NaN,
      category: NaN,
      sub_category: NaN,
    };
    if (selectFolder?.daibunrui && !selectFolder.chubunrui) {
      const find = state?.data.daibunrui.find((v) => v.id === selectFolder.daibunrui);
      if (find) {
        selectData = {
          name: find.title,
          printName: find.title,
          detail_id: find.detail_id,
          category: find.parent_id,
          sub_category: undefined,
        };
      }
    } else if (selectFolder?.daibunrui && selectFolder.chubunrui) {
      const findDaibunrui = state?.data.daibunrui.find((v) => v.id === selectFolder.daibunrui);
      if (findDaibunrui) {
        const find = findDaibunrui.chubunrui.find((v2) => v2.id === selectFolder.chubunrui);
        if (find) {
          selectData = {
            name: find.title,
            printName: find.title,
            detail_id: findDaibunrui.detail_id,
            category: findDaibunrui.parent_id,
            sub_category: find.id,
          };
        }
      }
    }
    if (!estimateId) return;
    dispatch(DialogActions.push({
      title: '見積印刷名称設定',
      element: <ChangePrintNameDialogPC
          id={estimateId}
          isTree
          category={selectData.category}
          sub_category={selectData.sub_category}
          meisaiId={selectData.detail_id}
          name={selectData.name}
          printName={selectData.printName || selectData.name}
          callback={() => {
            dispatch(DialogActions.pop());
            dispatch(EstimateActions.api.meisai.getSideMenuList({ param: { id: estimateId } }));
          }}
      />,
    }));
  }, [selectFolder, state, estimateId]);

  /* Effect */
  useEffect(() => {
    if (data) {
      // setSelectFolder({ isAll: true });
      setState(new EstimateSideMenuModePC(data));
    }
  }, [data]);

  return (
    <section className="tree_box">
      <div
        className="all"
      >
        {/* ALL */}
        {state?.data.daibunrui.length
          ? (
            <div
              className={`tree_item ${selectFolder?.isAll ? 'is_select' : ''}`}
              onClick={() => handleClickFolderIcon({
                isAll: true,
                daibunrui: undefined,
                chubunrui: undefined,
                detail_id: undefined,
              })}
            >
              <FolderIcon
                isOpen={state?.data.isOpen}
                callback={() => {}}
              />
              {state?.data.title}&nbsp;{ !masterAdd && <>[{state?.data.percent}%]</>}
            </div>
          ) : <></>}

        {/* 大分類 */}
        {state?.data.isOpen
        && (
        <div className="daibunrui">
          {state?.data.daibunrui.map((v) => (
            <div key={v.id + v.title}>
              <div
                onClick={() => handleClickFolderIcon({
                  isAll: false,
                  daibunrui: v.id,
                  chubunrui: undefined,
                  detail_id: v.detail_id,
                })}
                className={`tree_item ${selectFolder?.daibunrui === v.id && selectFolder.chubunrui === undefined ? 'is_select' : ''}`}
              >
                <FolderIcon
                  isOpen={v.isOpen}
                  callback={() => {}}
                />
                {v.title}&nbsp;{ !masterAdd && <>[{v.percent}%]</>}
              </div>
              {v.isOpen
              && (
              <div className="chubunrui_wrap">
                {v.chubunrui.map((v2) => (
                  <div
                    key={v2.title + v2.id}
                    className={`chubunrui tree_item ${selectFolder?.daibunrui === v.id && selectFolder.chubunrui === v2.id ? 'is_select' : ''}`}
                    onClick={() => handleClickFolder({
                      isAll: false,
                      daibunrui: v.id,
                      chubunrui: v2.id,
                      detail_id: v.id,
                    })}
                  >
                    <i className="far fa-folder" />{v2.title}&nbsp;{ !masterAdd && <>[{v2.percent}%]</>}
                  </div>
                ))}
              </div>
              )}
            </div>
          ))}
        </div>
        )}
      </div>
      {!masterAdd
      && (
      <div className="btn_box">
        { allowEdit && (
          <>
            <Button size="sm" color="secondary" onClick={() => handleClickMoveFolder(true)} disabled={!selectFolder?.daibunrui && !selectFolder?.chubunrui}>移動 ▲</Button>
            <Button size="sm" color="secondary" onClick={() => handleClickMoveFolder(false)} disabled={!selectFolder?.daibunrui && !selectFolder?.chubunrui}>移動 ▼</Button>
            <Button size="sm" color="secondary" disabled={disabledChangePrint} onClick={handleClickChangePrintName}>印刷名称変更</Button>
          </>
        ) }
      </div>
      )}
    </section>
  );
};

EstimateSideMenu.defaultProps = {
  allowEdit: true,
};
