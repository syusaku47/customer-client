import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../ui/button/button';
import { DialogActions } from '../../../redux/dialog/dialog.action';
import { EstimateActions } from '../../../redux/estimate/estimate.action';
import { Estimate, EstimateListType } from '../../../type/estimate/estimate.type';
import { EstimatePdfModule } from '../../../modules/pdf/mitsumori/mitsumori.pdf-module';
import { BillPdfModule } from '../../../modules/pdf/seikyu/bill.pdf-module';
import { EstimateShanaiPdfModule } from '../../../modules/pdf/mitsumori-shanai/mitsumori.pdf-module';
import { BillLitePdfModule } from '../../../modules/pdf/seikyu-kanni/bill-lite.pdf-module';
import { MultiPrintPdfModule } from '../../../modules/pdf/multi-print.pdf-module';
import { MitsumoriKoujiPdfModule } from '../../../modules/pdf/mitsumori/mitsumori-kouji.pdf-module';
import { MitsumoriUtiwake1PdfModule } from '../../../modules/pdf/mitsumori/mitsumori-utiwake1.pdf-module';
import { MitsumoriUtiwake2PdfModule } from '../../../modules/pdf/mitsumori/mitsumori-utiwake2.pdf-module';

import { MitsumoriShanaiKoujiPdfModule } from '../../../modules/pdf/mitsumori-shanai/mitsumori-shanai-kouji.pdf-module';
import { MitsumoriShanaiUtiwake1PdfModule } from '../../../modules/pdf/mitsumori-shanai/mitsumori-shanai-utiwake1.pdf-module';
import { MitsumoriShanaiUtiwake2PdfModule } from '../../../modules/pdf/mitsumori-shanai/mitsumori-shanai-utiwake2.pdf-module';

import { SeikyuKoujiPdfModule } from '../../../modules/pdf/seikyu/seikyu-kouji.pdf-module';
import { SeikyuUtiwake1PdfModule } from '../../../modules/pdf/seikyu/seikyu-utiwake1.pdf-module';
import { SeikyuUtiwake2PdfModule } from '../../../modules/pdf/seikyu/seikyu-utiwake2.pdf-module';
import { ApiEstimateGet } from '../../../redux/estimate/api/estimate/api-estiamte';

export type PrintType =
  'estimate'
  | 'estimateIn'
  | 'claim'
  | 'claimIn'

type Props = {
  data: any;
  type: PrintType;
  estimate?: Estimate;
  estimateListData?: EstimateListType;
}

export const PrintPreview = (props: Props) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    data, type, estimate, estimateListData,
  } = props;
  /* Hooke */
  const dispatch = useDispatch();
  /* State */
  const [index, setIndex] = useState(0);
  const [templateList, setTemplateList] = useState<string[]>([]);
  const handleClickPrint = useCallback(
    () => {
      dispatch(EstimateActions.api.print({
        id: 1,
        data: {
          files: [],
        },
      }));
      dispatch(DialogActions.pop());
    },
    [],
  );
  /* effect */
  useEffect(() => {
    // - 見積 -
    if (type === 'estimate') {
      const mod = new MultiPrintPdfModule(
        new EstimatePdfModule(),
        new MitsumoriKoujiPdfModule(),
        new MitsumoriUtiwake1PdfModule(),
        new MitsumoriUtiwake2PdfModule(),
      );
      // -- データのセット --
      (async () => {
        // eslint-disable-next-line
        const [estimate] = await Promise.all([
          new ApiEstimateGet({ id: data.id }),
        ]);
      })();
      mod.createSvgList(
        undefined,
        new MitsumoriKoujiPdfModule().test(),
        new MitsumoriUtiwake1PdfModule().test(),
        new MitsumoriUtiwake2PdfModule().test(),
      ).then((v) => {
        setTemplateList(v);
      });
    }
    // - 見積 (社内) -
    if (type === 'estimateIn') {
      const mod = new MultiPrintPdfModule(
        new EstimateShanaiPdfModule(),
        new MitsumoriShanaiKoujiPdfModule(),
        new MitsumoriShanaiUtiwake1PdfModule(),
        new MitsumoriShanaiUtiwake2PdfModule(),
      );
      // -- データのセット --
      mod.createSvgList(
        undefined,
        new MitsumoriShanaiKoujiPdfModule().test(),
        new MitsumoriShanaiUtiwake1PdfModule().test(),
        new MitsumoriShanaiUtiwake2PdfModule().test(),
      ).then((v) => {
        setTemplateList(v);
      });
    }
    // - 請求 -
    if (type === 'claimIn') {
      const mod = new MultiPrintPdfModule(
        new BillPdfModule(),
        new SeikyuKoujiPdfModule(),
        new SeikyuUtiwake1PdfModule(),
        new SeikyuUtiwake2PdfModule(),
      );
      // -- データのセット --
      mod.createSvgList(
        undefined,
        new SeikyuKoujiPdfModule().test(),
        new SeikyuUtiwake1PdfModule().test(),
        new SeikyuUtiwake2PdfModule().test(),
      ).then((v) => {
        setTemplateList(v);
      });
    }
    // - 請求 (簡易) -
    if (type === 'claim') {
      const mod = new BillLitePdfModule();
      mod.createSvgList(
        new BillLitePdfModule().test(),
      ).then((v) => {
        setTemplateList(v);
      });
    }
    setIndex(0);
  }, [type]);
  return (
    <div
      style={{
        maxHeight: '800px',
      }}
      className="PrintPreview"
    >
      <div
        className="preview_area"
        dangerouslySetInnerHTML={{ __html: (templateList.length && templateList[index]) || '' }}
      />
      <div className="base_footer">
        <div>
          ※印刷方向を
          <span style={{ color: 'red' }}> 横 </span>、
          用紙サイズを
          <span style={{ color: 'red' }}> 縦 </span>
          にしてください。
        </div>
        <div style={{ display: 'flex' }}>
          <div>
            <Button
              size="md"
              color="primary"
              onClick={handleClickPrint}
            >
              印刷
            </Button>
            <Button
              size="md"
              color="dark"
              onClick={() => dispatch(DialogActions.pop())}
            >
              キャンセル
            </Button>
          </div>
          <div>
            <Button
              disabled={!(index >= 1)}
              size="md"
              color="primary"
              onClick={() => setIndex(index - 1)}
            >
              前へ
            </Button>
            <Button
              disabled={!(index <= templateList.length - 2)}
              size="md"
              color="primary"
              onClick={() => setIndex(index + 1)}
            >
              次へ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
