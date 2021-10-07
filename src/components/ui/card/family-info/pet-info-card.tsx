import { card } from '../../../../selector/card/card-selectors';
import { Pet } from '../../../../type/customer/pet.type';
import './family-info-card.scss';

type Props = {
  petInfo: Pet,
  isActive: boolean
}

export const PetInfoCard = (props: Props) => {
  const { petInfo, isActive } = props;

  return (
    <div className={`family_info_card pet_info_card ${isActive ? 'active' : ''} ${card}`} onClick={() => {}}>
      <div className="family_info_card__row row1">
        <div className="row1__col1 card_info_item">
          <div className="card_info_item__head">名前</div>
          <div className="card_info_item__text">{petInfo.name}</div>

        </div>
        <div className="row1__col2 card_info_item item_pet_age">
          <div className="card_info_item__head">年齢</div>
          <div className="card_info_item__text">{petInfo.age}才</div>

        </div>
      </div>
      <div className="family_info_card__row row2">
        <div className="card_info_item">
          <div className="card_info_item__head">種別</div>
          <div className="card_info_item__text">{petInfo.type}</div>
        </div>
      </div>
      <div className="family_info_card__row row3">
        <div className="card_info_item">
          <div className="card_info_item__head">性別</div>
          <div className="card_info_item__text">{petInfo.sex}</div>
        </div>
      </div>
    </div>
  );
};
