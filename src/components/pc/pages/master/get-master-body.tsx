import { MasterAfterMaintenanceBody } from './master-body/master-after-maintenance-body';
import { MasterAreaBody } from './master-body/master-area-body';
import { MasterBuildingCategoryBody } from './master-body/master-building-category-body';
import { MasterContractedCompanyBody } from './master-body/master-contracted-company-body';
import { MasterCustomerExpectedRankBody } from './master-body/master-customer-expected-rank-body';
import { MasterCustomerRankBody } from './master-body/master-customer-rank-body';
import { MasterCustomerRankUpdateBody } from './master-body/master-customer-rank-update-body';
import { MasterEmployeeBody } from './master-body/master-employee-body';
import { MasterInquiryBody } from './master-body/master-inquiry-body';
import { MasterLargeCategoryBody } from './master-body/master-large-category-body';
import { MasterLostOrderBody } from './master-body/master-lost-order-body';
import { MasterMadoriBody } from './master-body/master-madori-body';
import { MasterMeisaiBody } from './master-body/master-meisai-category-body';
import { MasterMiddleCategoryBody } from './master-body/master-middle-category-body';
import { MasterMyCarTypeBody } from './master-body/master-my-car-type-body';
import { MasterOriginBody } from './master-body/master-origin-body';
import { MasterPartBody } from './master-body/master-part-body';
import { MasterProjectRankBody } from './master-body/master-project-rank-body';
import { MasterQuoteFixedBody } from './master-body/master-quote-fixed-body';
import { MasterRelevantTagBody } from './master-body/master-relevant-tag-body';
import { MasterSignatureBody } from './master-body/master-signature-body';
import { MasterStoreBody } from './master-body/master-store-body';
import { MasterSupportHistoryBody } from './master-body/master-support-history-body';
import { MasterTaxBody } from './master-body/master-tax-body';
import { MasterUnitBody } from './master-body/master-unit-body';
import { MasterCustomerRankFinalCompleteDateBody } from './master-body/master-customer-rank-final-complete-date-body';

export const getMasterBody = (detailType: number): globalThis.JSX.Element => {
  switch (detailType) {
    case 0:
      return <MasterStoreBody />;
    case 1:
      return <MasterEmployeeBody />;
    case 2:
      return <MasterTaxBody />;
    case 3:
      return <MasterLargeCategoryBody />;
    case 4:
      return <MasterMiddleCategoryBody />;
    case 5:
      return <MasterMeisaiBody />;
    case 6:
      return <MasterUnitBody />;
    case 7:
      return <MasterOriginBody />;
    case 8:
      return <MasterBuildingCategoryBody />;
    case 9:
      return <MasterAreaBody />;
    case 10:
      return <MasterMadoriBody />;
    case 11:
      return <MasterInquiryBody />;
    case 12:
      return <MasterLostOrderBody />;
    case 13:
      return <MasterSupportHistoryBody />;
    case 14:
      return <MasterAfterMaintenanceBody />;
    case 15:
      return <MasterSignatureBody />;
    case 16:
      return <MasterQuoteFixedBody />;
    case 17:
      return <MasterCustomerExpectedRankBody />;
    case 18:
      return <MasterCustomerRankBody />;
    case 19:
      return <MasterProjectRankBody />;
    case 20:
      return <MasterCustomerRankUpdateBody />;
    case 23:
      return <MasterRelevantTagBody />;
    case 24:
      return <MasterPartBody />;
    case 25:
      return <MasterMyCarTypeBody />;
    case 26:
      return <MasterContractedCompanyBody />;
    case 27:
      return <MasterCustomerRankFinalCompleteDateBody />;
    default:
      return <></>;
  }
};
