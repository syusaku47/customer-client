import lodash, { isEqual } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import { State } from '../../../../../redux/root.reducer';
import { RightLabelCheckbox } from '../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { TopLabelInputField } from '../../../../ui/input-field/top-label-input-field/top-label-input-field';
import { SearchBox } from '../../../layout/search-box/search-box.sp';
// import { ProjectActions } from '../../../../../redux/project/project.action';
import { prefectures } from '../../../../../collection/prefectures';
import { ProjectListType, ProjectSortState } from '../../../../../type/project/project.type';
import { ProjectActions } from '../../../../../redux/project/project.action';
import { TagActions } from '../../../../../redux/tag/tag.action';
import { ProjectCollection } from '../../../../../collection/project/project.collection';
import { TagModel } from '../../../../../model/tag/tag';
import { Select } from '../../../../ui/select/select';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { ProjectListSP } from '../../../layout/body/list/project-list/project-list';
import { Store } from '../../../../../redux/store';
import { ValidationLengthUnder255, ValidationLengthUnder40, ValidationLengthUnder60 } from '../../../../../model/validation/validation-length-under';
import { ValidationTel } from '../../../../../model/validation/validation-tel';
import { MasterActions } from '../../../../../redux/master/master.action';
import { CommonCollection } from '../../../../../collection/common/common.collection';
import { MapActions } from '../../../../../redux/map/map.action';
import { Customer } from '../../../../../type/customer/customer.type';
import { useDidMount } from '../../../../../hooks/life-cycle';

type Props = {
  customerData?: Customer,
  callback?: (data: ProjectListType) => void,
}

export const ProjectSearchBoxSP = (props: Props) => {
  const { customerData } = props;
  /* Hooks */

  const sortState = useSelector((state: State) => (state.project.sort), isEqual);
  const partList = useSelector((state: State) => (state.tag.partList), isEqual);
  const {
    projectRankList,
    storeList,
    employeeList,
  } = useSelector((state: State) => (state.master), isEqual);
  const dispatch = useDispatch();

  /* State */
  const [sort, setSort] = useState<ProjectSortState | null>(cloneDeep(sortState));

  /* Callback */
  const setState = useCallback(
    (v: ProjectSortState) => {
      setSort(cloneDeep(v));
      if (props?.callback) return;
      dispatch(ProjectActions.setSort(lodash.cloneDeep(v)));
    }, [props],
  );

  const handleClickSearch = useCallback((customer?: Customer) => {
    dispatch(MapActions.setGpsStatus('out'));
    const param = {
      customer_id: customer ? customer.id : undefined,
      customer_prefecture: sort?.customer_prefecture,
      sales_contact: sort?.sales_contact,
      field_place: sort?.field_place,
      name: sort?.name,
      field_name: sort?.field_name,
      field_tel_no: sort?.field_tel_no,
      customer_name: sort?.customer_name,
      sales_shop: sort?.sales_shop,
      construction_parts: sort?.construction_parts?.getSendData(),
      construction_status: sort?.construction_status?.getSendData(),
      limit: 99999,
      sort_by: 1,
      highlow: 1,
    };

    if (props && props?.callback) {
      dispatch(ProjectActions.api.project.getCallbackList({
        param,
        onSuccess: (data) => {
          const { callback } = props;
          dispatch(DialogActions.push({
            onCloseClick: () => {
              if (!customer) return;
              dispatch(DialogActions.clear());
            },
            title: '案件検索',
            element: <ProjectListSP data={data} handleCardClick={callback} />,
          }));
        },
      }));
      dispatch(DialogActions.pop());
      return;
    }
    dispatch(ProjectActions.api.project.getCallbackList({
      param: { ...param },
      onSuccess: (res) => {
        dispatch(ProjectActions.setList(res));
        dispatch(MapActions.setCenterPos({
          lat: Number(res[0].lat), lng: Number(res[0].lng),
        }));
        dispatch(DialogActions.pop());
      },
    }));
    Store.dispatch(DialogActions.pop());
  }, [sort, props]);

  /* Effect */
  useDidMount(() => {
    if (customerData) {
      handleClickSearch(customerData);
    }
  });

  useEffect(() => {
    dispatch(TagActions.api.part.getList());
    dispatch(MasterActions.api.projectRank.getList({}));
    dispatch(MasterActions.api.employee.getList({}));
    dispatch(MasterActions.api.store.getList({}));
  }, []);

  useEffect(() => {
    console.log(sortState?.construction_parts);

    setState({
      ...lodash.cloneDeep(sort),
      construction_parts: sortState?.construction_parts?.data.length
        ? sortState?.construction_parts : new TagModel(partList),
      construction_status: sortState?.construction_status
        ?? new TagModel(ProjectCollection.constructionStatusList),
    });
  }, [
    partList, sortState?.construction_parts,
  ]);

  return (
    <SearchBox callback={handleClickSearch}>
      {/* search_box_body_inner は各画面の共通用 */}
      <div className="search_box_sp_body_inner project_search_box_sp">

        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">店舗</div>
            <div className="item_body full_width">
              <Select
                value={sort?.sales_shop}
                onChange={(v) => setState({ ...sort, sales_shop: Number(v) })}
                defaultLabel="全て"
                options={storeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_label">担当者</div>
            <div className="item_body full_width">
              <Select
                value={sort?.sales_contact}
                onChange={(v) => setState({ ...sort, sales_contact: Number(v) })}
                defaultLabel="全て"
                options={employeeList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
              />
            </div>
          </div>
        </div>

        <div className="category_wrap">
          <div className="item_wrap">
            {/* TODO バリデーション情報を後で確認 */ }
            <TopLabelInputField
              label="顧客ID"
              value={sort?.customer_id}
              type="number"
              onChange={(e) => { setState({ ...sort, customer_id: Number(e.target.value) }); }}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="顧客名"
              value={sort?.customer_name}
              onChange={(e) => setState({ ...sort, customer_name: e.target.value })}
              validationList={ValidationLengthUnder60}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="案件名"
              value={sort?.name}
              onChange={(e) => setState({ ...sort, name: e.target.value })}
              validationList={ValidationLengthUnder40}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="案件現場名称"
              value={sort?.field_name}
              onChange={(e) => setState({ ...sort, field_name: e.target.value })}
              validationList={ValidationLengthUnder60}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="案件現場電話番号"
              type="tel"
              value={sort?.field_tel_no}
              onChange={(e) => setState({ ...sort, field_tel_no: e.target.value })}
              validationList={ValidationTel}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">案件現場都道府県</div>
            <div className="item_body item_select full_width">
              <Select
                value={sort?.customer_prefecture}
                onChange={(v) => setState({ ...sort, customer_prefecture: Number(v) })}
                options={[
                  { text: '全て', value: NaN },
                  ...prefectures.map((v) => (
                    { text: v.label, value: v.value }
                  )),
                ]}
              />
            </div>
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="案件現場住所"
              value={sort?.field_place}
              onChange={(e) => setState({ ...sort, field_place: e.target.value })}
              className="full_width"
              validationList={ValidationLengthUnder255}
            />
          </div>
        </div>

        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label">案件ランク</div>
            <div className="item_body item_projectRank">
              <Select
                value={sort?.project_rank}
                onChange={(v) => setState({ ...sort, project_rank: Number(v) })}
                defaultLabel="全て"
                options={projectRankList.map((v) => ({
                  text: v.name, value: v.project_rank_id,
                }))}
              />
              <Select
                value={sort?.project_rank_filter}
                onChange={(v) => setState(
                  { ...sort, project_rank_filter: Number(v) },
                )}
                options={CommonCollection.pullDownFilterList}
              />
            </div>
          </div>
        </div>

        <div className="category_wrap">
          <div className="item_wrap tags_form">
            <div className="item_label">工事部位</div>
            <div className="item_body item_checkbox">
              {sort?.construction_parts?.data.map((v, i) => (
                <div key={`rTag${i}`}>
                  <RightLabelCheckbox
                    checked={v.flag}
                    label={v.label}
                    onChange={() => {
                      sort.construction_parts?.changeFlag(v.id);
                      setState(
                        {
                          ...sort,
                          construction_parts: lodash.cloneDeep(sort.construction_parts),
                        },
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="item_wrap tags_form">
            <div className="item_label">工事状況</div>
            <div className="item_body item_checkbox">
              {sort?.construction_status?.data.map((v, i) => (
                <div
                  key={`rTag${i}`}
                >
                  <RightLabelCheckbox
                    checked={v.flag}
                    label={v.label}
                    onChange={() => {
                      sort.construction_status?.changeFlag(v.id);
                      setState(
                        {
                          ...sort,
                          construction_status: lodash.cloneDeep(sort.construction_status),
                        },
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SearchBox>
  );
};
