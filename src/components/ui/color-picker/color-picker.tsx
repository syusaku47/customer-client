import { useCallback, useState } from 'react';
import { Color, ColorResult, SketchPicker } from 'react-color';
import { Input } from '../input/input';

type Props = {
  color?: string;
  callbackColor: (v: string) => void;
}

export const ColorPicker = (props: Props) => {
  const {
    color: _color,
    callbackColor,
  } = props;

  // eslint-disable-next-line
  const [isShow, setIsShow] = useState(false);
  const [color, setColor] = useState<Color>(_color || '');
  const [showColor, setShowColor] = useState<Color>(_color || '');

  /* Callback */
  const handleChangeColorComplete = useCallback((v: ColorResult) => {
    setShowColor(v.hex);
    callbackColor(v.hex);
  }, [callbackColor]);

  const handleChangeColor = useCallback((v: ColorResult) => {
    setColor(v.hex);
  }, []);

  const cover: globalThis.React.CSSProperties = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  };

  return (
    <div style={{ display: 'flex' }}>
      <Input
        value={showColor}
        disabled
      />
      <div>
        <button
          onClick={() => setIsShow(!isShow)}
        >Pick Color
        </button>
        { isShow ? (
          <div style={{ position: 'absolute' }}>
            <div style={cover} onClick={() => setIsShow(false)} />
            <SketchPicker
              color={color}
              onChangeComplete={handleChangeColorComplete}
              onChange={handleChangeColor}
            />
          </div>
        ) : null }
      </div>

      {/* <SketchPicker
        color={color}
        onChangeComplete={handleChangeColorComplete}
        onChange={handleChangeColor}
      /> */}
    </div>
  );
};
