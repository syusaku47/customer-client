import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { DialogActions } from '../../../../../../../redux/dialog/dialog.action';
import { MasterEditDialogProps } from '../../../master.type';
import { Input } from '../../../../../../ui/input/input';
import { Required } from '../../../../../../ui/required/required';
import { Button } from '../../../../../../ui/button/button';
import './meisai-master-edit-dialog.scss';
import { useDidMount } from '../../../../../../../hooks/life-cycle';
import { MasterActions } from '../../../../../../../redux/master/master.action';
import { ValidationLengthUnder13, ValidationLengthUnder255 } from '../../../../../../../model/validation';
import { ValidationMax100Million } from '../../../../../../../model/validation/validation-max-100-million';
import { MasterMeisaiCategoryValidation } from '../../../../../../../model/validation/master/master-meisai-category.validation';
import { RightLabelCheckbox } from '../../../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { EditPC } from '../../../../../../dialogs/edit/edit.pc';
import { State } from '../../../../../../../redux/root.reducer';
import { Select } from '../../../../../../ui/select/select';
import { CommonCollection } from '../../../../../../../collection/common/common.collection';

export const MeisaiMasterEditDialog = (props: MasterEditDialogProps) => {
  const { id, callback } = props;

  const dispatch = useDispatch();
  const largeCategoryList = useSelector((state:State) => state.master.largeCategoryList, isEqual);
  const middleCategoryList = useSelector((state:State) => state.master.middleCategoryList, isEqual);
  const unitList = useSelector((state:State) => state.master.unitList, isEqual);

  const [itemKubun, setItemKubun] = useState(NaN);
  const [largeCategoryId, setLargeCategoryId] = useState(NaN);
  const [middleCategoryId, setMiddleCategoryId] = useState(NaN);
  const [name, setName] = useState('');
  const [standard, setStandard] = useState('');
  const [quantity, setQuantity] = useState(NaN);
  const [creditId, setCreditId] = useState(NaN);
  const [quoteUnitPrice, setQuoteUnitPrice] = useState('');
  const [primeCost, setPrimeCost] = useState('');
  const [image, setImage] = useState('');
  const [validFlag, setValidFlag] = useState(true);

  const [touch, setTouch] = useState(false);

  const handleClickPost = useCallback(() => {
    if (MasterMeisaiCategoryValidation(
      itemKubun,
      largeCategoryId,
      middleCategoryId,
      name,
      standard,
      quantity,
      creditId,
      quoteUnitPrice,
      primeCost,
    )) {
      dispatch(DialogActions.pushMessage({
        title: '?????? ???????????????',
        message: ['?????????????????????????????????????????????'],
        callback: () => setTouch(true),
      }));
      return;
    }

    dispatch(MasterActions.api.meisai.post({
      /* TODO ?????? Redux????????? */
      param: {
        data: {
          product_kubun: itemKubun,
          category_id: largeCategoryId,
          subcategory_id: middleCategoryId,
          name,
          standard,
          quantity,
          credit_id: creditId,
          quote_unit_price: quoteUnitPrice,
          prime_cost: primeCost,
          image,
          is_valid: validFlag ? 1 : 0,
        },
        id,
      },
      onSuccess: () => {
        callback();
      },
      onError: () => {
        setTouch(true);
      },
    }));
    dispatch(DialogActions.pop());
  }, [
    itemKubun,
    largeCategoryId,
    middleCategoryId,
    name,
    standard,
    quantity,
    creditId,
    quoteUnitPrice,
    primeCost,
    image,
    validFlag,
  ]);

  useDidMount(() => {
    if (id) {
      dispatch(MasterActions.api.meisai.get({
        param: { id },
        onSuccess: (data) => {
          if (!data) return;
          setItemKubun(data.product_kubun);
          setLargeCategoryId(data.category_id);
          setMiddleCategoryId(data.subcategory_id);
          setName(data.name);
          setStandard(data.standard);
          setQuantity(data.quantity);
          setCreditId(data.credit_id);
          setQuoteUnitPrice(data.quote_unit_price);
          setPrimeCost(data.prime_cost);
          setImage(data.image);
          setValidFlag(data.valid_flag);
        },
      }));
    }
  });

  return (
    <EditPC mode="dialog" callback={handleClickPost}>
      <div className="edit_pc_body_inner edit_master">
        <div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">????????????<Required /></div>
              <Select
                className=""
                value={itemKubun} // TODO ??????????????????????????????????????????????????????????????????
                onChange={(v) => setItemKubun(Number(v))}
                defaultLabel="????????????"
                options={
                  CommonCollection.shohinKubunList.map((v) => ({
                    text: v.text, value: v.value,
                  }))
                }
                require
                touch={touch}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">???????????????<Required /></div>
              <Select
                className=""
                value={largeCategoryId}
                onChange={(v) => setLargeCategoryId(Number(v))}
                defaultLabel="????????????"
                options={largeCategoryList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
                require
                touch={touch}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">???????????????<Required /></div>
              <Select
                className=""
                value={middleCategoryId}
                // value={100}
                onChange={(v) => setMiddleCategoryId(Number(v))}
                defaultLabel="????????????"
                options={middleCategoryList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
                require
                touch={touch}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">??????<Required /></div>
              <Input
                className="medium"
                require
                label=""
                value={name}
                onChange={(e) => setName(e.target.value)}
                validationList={ValidationLengthUnder255}
                touch={touch}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">??????</div>
              <Input
                className="medium"
                label=""
                value={standard}
                onChange={(e) => setStandard(e.target.value)}
                validationList={ValidationLengthUnder255}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">??????<Required /></div>
              <Input
                className="small"
                type="number"
                require
                label=""
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                validationList={[
                  ...ValidationMax100Million,
                  ...ValidationLengthUnder13,
                ]}
                touch={touch}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">??????<Required /></div>
              <Select
                className=""
                value={creditId}
                onChange={(v) => setCreditId(Number(v))}
                defaultLabel="????????????"
                options={unitList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
                require
                touch={touch}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">????????????<Required /></div>
              <Input
                className=""
                type="number"
                require
                label=""
                value={quoteUnitPrice}
                onChange={(e) => setQuoteUnitPrice(e.target.value)}
                validationList={[
                  ...ValidationMax100Million,
                  ...ValidationLengthUnder13,
                ]}
                touch={touch}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">??????<Required /></div>
              <Input
                className=""
                type="number"
                require
                label=""
                value={primeCost}
                onChange={(e) => setPrimeCost(e.target.value)}
                validationList={[
                  ...ValidationMax100Million,
                  ...ValidationLengthUnder13,
                ]}
                touch={touch}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">????????????????????????</div>
              <div>
                <div className="img_box mb_10">
                  ???????????????????????????????????????????????????<br />
                  ??????????????????????????????????????????????????????
                </div>
                <div className="flex_no_wrap_box">
                  <Button
                    size="sm"
                    color="secondary"
                    className=""
                    onClick={() => {}}
                  >?????????????????????TODO
                  </Button>
                  <Button
                    size="sm"
                    color="dark"
                    className="ml_10"
                    onClick={() => {}}
                  >????????????TODO
                  </Button>
                  <input
                    style={{ display: 'none' }}
                    type="file"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">???????????????</div>
              <RightLabelCheckbox
                label=""
                className="is_valid"
                checked={validFlag}
                onChange={() => setValidFlag(!validFlag)}
              />
            </div>
          </div>
        </div>
      </div>
    </EditPC>
  );
};
