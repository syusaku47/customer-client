import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../../../../redux/root.reducer';
import { PetInfoCard } from '../../../../../ui/card/family-info/pet-info-card';

type Props = {
  callback: (id: number) => void;
  isInDialog?: boolean;
}

export const PetInfoListSP = (props: Props) => {
  const { callback, isInDialog } = props;

  /* Hooks */
  const { petList } = useSelector((state: State) => ({
    petList: state.customer.petList,
  }));

  const [isActive, setIsActive] = useState(NaN);

  const handleClickCard = useCallback(
    (petId: number) => {
      callback(petId);
      setIsActive(petId);
    },
    [],
  );

  return (
    <div className="list_base family_info_list_sp">
      {petList.map((v, i) => (
        <div
          key={`pcard${i}`}
          className="list_base_card_wrap"
          onClick={() => {
            if (isInDialog) {
              handleClickCard(v.pet_id);
            }
          }}
        >
          <PetInfoCard
            petInfo={v}
            isActive={v.pet_id === isActive}
          />
        </div>
      ))}
    </div>
  );
};
