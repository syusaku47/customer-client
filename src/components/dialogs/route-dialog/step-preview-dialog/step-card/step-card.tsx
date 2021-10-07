import { UserAgent } from '../../../../../utilities/user-agent';
import './step-card.scss';
import { ManeuverImg } from './maneuver-img/maneuver-img';

type Props = {
  img: string;
  text: string;
  m: string;
}

export const StepCard = (props: Props) => {
  const {
    img, text, m,
  } = props;

  return (
    <div className={`step_card ${UserAgent}`}>
      <div className="step_card__row">
        <div className="step_card__row__left">
          {/* <img src={imgPath} alt="" /> */}
          <ManeuverImg type={img} />
        </div>
        <div className="step_card__row__right">
          <span dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      </div>
      <div className="step_card__row">
        {UserAgent === 'pc' && <div className="step_card__row__left" />}
        <div className={`step_card__row__${UserAgent === 'sp' ? 'left' : 'middle'}`}>{m}</div>
        <div className="step_card__row__right border" />
      </div>
    </div>
  );
};
