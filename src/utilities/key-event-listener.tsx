import { useDidMount, useWillUnMount } from '../hooks/life-cycle';

export type KeyEventType = 'shift' | 'ctrl' | '';

type Props = {
  children:HTMLElement | globalThis.JSX.Element
  callback: (key:KeyEventType) => void;
}

export const KeyEventListener = (props:Props) => {
  const { children, callback } = props;

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.shiftKey) {
      callback('shift');
    } else if (e.metaKey || e.ctrlKey) {
      callback('ctrl');
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    e.preventDefault();
    callback('');
  };

  useDidMount(() => {
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keyup', handleKeyUp);
  });

  useWillUnMount(() => {
    document.removeEventListener('keydown', handleKeyPress);
    document.removeEventListener('keyup', handleKeyUp);
  });

  return (
    <div>
      { children }
    </div>
  );
};
