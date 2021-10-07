import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { cloneDeep } from 'lodash';
import { TagModel } from '../../../../../../model/tag/tag';
import { TagActions } from '../../../../../../redux/tag/tag.action';
import { EstimateSortState } from '../../../../../../type/estimate/estimate.type';
import { Select } from '../../../../../ui/select/select';
import { State } from '../../../../../../redux/root.reducer';
import { RightLabelCheckbox } from '../../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { EstimateActions } from '../../../../../../redux/estimate/estimate.action';
import { LeftIconButton } from '../../../../../ui/button/left-icon-button/left-icon-button';
import { Input } from '../../../../../ui/input/input';
import { useDidMount } from '../../../../../../hooks/life-cycle';
import { MasterActions } from '../../../../../../redux/master/master.action';

type Props = {
  callback: () => void;
}

export const EstimateSearch = (props: Props) => {
  const { callback } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const constructionPart = useSelector((state: State) => state.tag.partList, isEqual);
  const employeeList = useSelector((state: State) => state.master.employeeList, isEqual);
  const sortState = useSelector((state: State) => state.estimate.estimateSearchSort, isEqual);
  const user = useSelector((state: State) => state.auth.user, isEqual);

  /* State */
  const [sort, setSort] = useState(cloneDeep(sortState));

  /* Callback */
  const setState = useCallback((v: EstimateSortState) => {
    setSort(cloneDeep(v));
    dispatch(EstimateActions.setEstimateSearchSort(v));
  }, []);

  const handleClickSearch = useCallback(() => {
    callback();
  }, [callback]);

  /* Effect */
  /* Master */
  useDidMount(() => {
    dispatch(TagActions.api.part.getList());
    dispatch(MasterActions.api.employee.getList({}));
  });

  useEffect(() => {
    setSort({
      ...cloneDeep(sort),
      quote_creator: sort.quote_creator || (user?.employee_id || NaN),
      construction_parts: new TagModel(constructionPart),
    });
  }, [constructionPart]);

  return (
    <div className="EstimateSearch search_area" style={{ display: 'flex' }}>
      <div className="">
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">案件名</div>
            <Input
              value={sort.project_name}
              onChange={(e) => setState({
                ...sort,
                project_name: e.target.value,
              })}
            />
          </div>
          <div className="item_box">
            <div className="item_head">顧客名</div>
            <Input
              label=""
              value={sort.customer_name}
              onChange={(e) => setState({
                ...sort,
                customer_name: e.target.value,
              })}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">明細</div>
            <Input
              value={sort.detail}
              onChange={(e) => setState({
                ...sort,
                detail: e.target.value,
              })}
            />
          </div>
          <div className="item_box">
            <div className="item_head">見積作成者</div>
            <Select
              value={sort.quote_creator}
              defaultLabel="全て"
              onChange={(v) => setState({
                ...sort,
                quote_creator: Number(v),
              })}
              options={employeeList.map((v) => ({
                text: v.name, value: v.id,
              }))}
            />
          </div>
        </div>
        <div className="item_wrap flex_no_wrap_box">
          <div className="item_box">
            <div className="item_head">工事部位</div>
            <div className="flex_wrap_box">
              {sort.construction_parts?.data.map((v) => (
                <RightLabelCheckbox
                  key={v.id}
                  checked={v.flag}
                  label={v.label}
                  onChange={() => {
                    sort.construction_parts?.changeFlag(v.id);
                    setState(cloneDeep({
                      ...sort,
                      construction_part: sort.construction_parts,
                    }));
                  }}
                />
              ))}
            </div>
          </div>
          <LeftIconButton
            label="検索"
            fontAwesomeClass="fas fa-search"
            className="btn_search"
            size="sm"
            color="secondary"
            onClick={handleClickSearch}
          />
        </div>
      </div>
    </div>
  );
};
