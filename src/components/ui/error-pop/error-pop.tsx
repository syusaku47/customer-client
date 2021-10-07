import { useMemo } from 'react';
import './error-pop.scss';

export type Props = {
  messages: string[];
  errorPosBottom?: boolean;
}

export const ErrorPop = (props:Props) => {
  const { messages, errorPosBottom } = props;

  const posBottom = useMemo(() => (errorPosBottom ? 'pos_bottom' : ''), [errorPosBottom]);

  return (
    <div className={`error_pop ${posBottom}`}>
      {messages.map((v, i) => (
        <div key={`input${i}`} style={{ marginRight: '5px' }}>
          {v}
        </div>
      ))}
    </div>
  );
};
