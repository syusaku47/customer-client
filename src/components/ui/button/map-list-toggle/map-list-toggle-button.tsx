import { Button } from '../button';
import { ButtonProps } from '../button.type';
import './map-list-toggle-button.scss';

type Props = {
  showType: 'map' | 'list' | 'date';
  typeNum?: 2 | 3;
} & ButtonProps

export const MapListToggleButton = (props: Props) => {
  const {
    showType, onClick, disabled, typeNum,
  } = props;

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="map_list_toggle_button"
      size="md"
      color="secondary"
    >
      <>
        {showType === 'map' && (
        <>
          <div><i className="fas fa-list" /></div>
          <div><span>リスト表示</span></div>
        </>
        )}

        {showType === 'list' && (
        <>
          <div><i className={`fas fa-${typeNum === 2 ? 'map-marked-alt' : 'calendar-alt'}`} /></div>
          <div><span>{`${typeNum === 2 ? '地図表示' : '年月表示'}`}</span></div>
        </>
        )}

        {showType === 'date' && (
        <>
          <div><i className="fas fa-map-marked-alt" /></div>
          <div><span>地図表示</span></div>
        </>
        )}
      </>
    </Button>
  );
};

MapListToggleButton.defaultProps = { typeNum: 2 };
