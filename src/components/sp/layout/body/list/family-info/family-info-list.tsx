import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../../../../redux/root.reducer';
import { FamilyInfoCard } from '../../../../../ui/card/family-info/family-info-card';

type Props = {
  callback: (id: number) => void;
  isInDialog?: boolean;
}

export const FamilyInfoListSP = (props:Props) => {
  const { callback, isInDialog } = props;

  /* Hooks */
  const { familyList } = useSelector((state: State) => ({
    familyList: state.customer.familyList,
  }));

  const [isActive, setIsActive] = useState(NaN);

  const handleClickCard = useCallback(
    (familyId:number) => {
      callback(familyId);
      setIsActive(familyId);
    },
    [],
  );

  return (
    <div className="list_base family_info_list_sp">
      {familyList.map((v, i) => (
        <div
          key={`fcard${i}`}
          className="list_base_card_wrap"
          onClick={() => {
            if (isInDialog) {
              handleClickCard(v.family_id);
            }
          }}
        >
          <FamilyInfoCard
            familyInfo={v}
            isActive={v.family_id === isActive}
          />
        </div>
      ))}
    </div>
  );
};

FamilyInfoListSP.defaultProp = { isInDialog: false };
