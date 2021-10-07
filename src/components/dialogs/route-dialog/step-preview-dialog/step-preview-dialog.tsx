import { useDispatch } from 'react-redux';
import { memo } from 'react';
import { UserAgent } from '../../../../utilities/user-agent';
import { Button } from '../../../ui/button/button';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { StepCard } from './step-card/step-card';
import './step-preview-dialog.scss';

type Props = {
  data: globalThis.google.maps.DirectionsLeg;
  legIndex: number;
  startValue: string;
  endValue: string;
}

export const StepPreviewDialog = memo((props: Props) => {
  // eslint-disable-next-line
  const { data, legIndex, startValue, endValue } = props;

  const dispatch = useDispatch();

  return (
    <div className={`step_preview_dialog route_dialog base_dialog ${UserAgent}`}>
      <div className="route_dialog__body">

        <div className="step_preview_dialog__start">
          {/* <div>出発地</div> */}
          {/* <div>
            {startValue}
          </div> */}
          <div className="important">
            {data.start_address}
          </div>
        </div>

        <div className="step_preview_dialog__via">
          {data.steps.map((v, i) => (
            <StepCard
              key={v.instructions + i}
              img={(v as any).maneuver}
              text={v.instructions}
              m={v.distance?.text || ''}
            />
          ))}
        </div>

        <div className="step_preview_dialog__goal">
          {/* <div className="item_head">目的地</div>
          <div>
            <div>
              {endValue}
            </div>
          </div> */}
          <div className="important">
            {data.end_address}
          </div>
        </div>
      </div>
      <div className={`route_dialog__footer ${UserAgent === 'pc' ? 'base_footer' : ''}`}>
        <Button
          color="dark"
          onClick={() => dispatch(DialogActions.pop())}
          size={UserAgent === 'pc' ? 'sm' : 'md'}
        >戻る
        </Button>
      </div>
    </div>
  );
});
