import { ApiMasterAfterMaintenanceGetListParam, ApiMasterAfterMaintenanceGetListResponse, ApiMasterAfterMaintenancePostParam } from './master-after-maintenance/api-master-after-maintenance.type';
import { ApiMasterAreaGetListParam, ApiMasterAreaPostParam, ApiMasterAreaGetListResponse } from './master-area/api-master-area.type';
import { ApiMasterBuildingCategoryGetListParam, ApiMasterBuildingCategoryPostParam, ApiMasterBuildingCategoryGetListResponse } from './master-building-category/api-master-building-category.type';
import { ApiMasterContractedCompanyGetListParam, ApiMasterContractedCompanyPostParam, ApiMasterContractedCompanyGetListResponse } from './master-contracted-company/api-master-contracted-company.type';
import { ApiMasterEmployeeGetListParam, ApiMasterEmployeePostParam, ApiMasterEmployeeGetListResponse } from './master-employee/api-master-employee.type';
import { ApiMasterInquiryGetListParam, ApiMasterInquiryPostParam, ApiMasterInquiryGetListResponse } from './master-inquiry/api-master-inquiry.type';
import { ApiMasterLargeCategoryGetListParam, ApiMasterLargeCategoryPostParam, ApiMasterLargeCategoryGetListResponse } from './master-large-category/api-master-large-category.type';
import { ApiMasterLostOrderGetListParam, ApiMasterLostOrderGetListResponse, ApiMasterLostOrderPostParam } from './master-lost-order/api-master-lost-order.type';
import { ApiMasterMadoriGetListParam, ApiMasterMadoriGetListResponse, ApiMasterMadoriPostParam } from './master-madori/api-master-madori.type';
import { ApiMasterMeisaiGetListParam, ApiMasterMeisaiPostParam, ApiMasterMeisaiGetListResponse } from './master-meisai/api-master-meisai.type';
import { ApiMasterMiddleCategoryGetListParam, ApiMasterMiddleCategoryPostParam, ApiMasterMiddleCategoryGetListResponse } from './master-middle-category/api-master-middle-category.type';
import { ApiMasterOriginGetListParam, ApiMasterOriginPostParam, ApiMasterOriginGetListResponse } from './master-origin/api-master-origin.type';
import { ApiMasterQuoteFixedGetListParam, ApiMasterQuoteFixedGetListResponse, ApiMasterQuoteFixedPostParam } from './master-quote-fixed/api-master-quote-fixed.type';
import { ApiMasterSignatureGetListParam, ApiMasterSignaturePostParam, ApiMasterSignatureGetListResponse } from './master-signature/api-master-signature.type';
import { ApiMasterStoreGetListParam, ApiMasterStorePostParam, ApiMasterStoreGetListResponse } from './master-store/api-master-store.type';
import { ApiMasterSupportHistoryGetListParam, ApiMasterSupportHistoryGetListResponse, ApiMasterSupportHistoryPostParam } from './master-support-history/api-master-support-history.type';
import { ApiMasterTaxGetListParam, ApiMasterTaxPostParam, ApiMasterTaxGetListResponse } from './master-tax/api-master-tax.type';
import { ApiMasterUnitGetListParam, ApiMasterUnitPostParam, ApiMasterUnitGetListResponse } from './master-unit/api-master-unit.type';
import { ApiMasterConstructionPartGetListParam, ApiMasterConstructionPartPostParam, ApiMasterConstructionPartGetListResponse } from './tag/master-construction-part/api-master-construction-part.type';
import { ApiMasterMyCarTypeGetListParam, ApiMasterMyCarTypePostParam, ApiMasterMyCarTypeGetListResponse } from './tag/master-my-car-type/api-master-my-car-type.type';
import { ApiMasterPartGetListParam, ApiMasterPartPostParam, ApiMasterPartGetListResponse } from './tag/master-part/api-master-part.type';
import { ApiMasterProspectPartGetListParam, ApiMasterProspectPartPostParam, ApiMasterProspectPartGetListResponse } from './tag/master-prospect-part/api-master-prospect-part.type';
import { ApiMasterRelevantTagGetListParam, ApiMasterRelevantTagPostParam, ApiMasterRelevantTagGetListResponse } from './tag/master-relevant-tag/api-master-relevant-tag.type';

export declare namespace ApiMaster {
  namespace AfterMaintenance {
    namespace Param {
      type List = ApiMasterAfterMaintenanceGetListParam;
      type Post = ApiMasterAfterMaintenancePostParam;
    }
    namespace Response {
      type List = ApiMasterAfterMaintenanceGetListResponse;
    }
  }

  namespace Area {
    namespace Param {
      type List = ApiMasterAreaGetListParam;
      type Post = ApiMasterAreaPostParam;
    }
    namespace Response {
      type List = ApiMasterAreaGetListResponse;
    }
  }

  namespace BuildingCategory {
    namespace Param {
      type List = ApiMasterBuildingCategoryGetListParam;
      type Post = ApiMasterBuildingCategoryPostParam;
    }
    namespace Response {
      type List = ApiMasterBuildingCategoryGetListResponse;
    }
  }

  namespace ContractedCompany {
    namespace Param {
      type List = ApiMasterContractedCompanyGetListParam;
      type Post = ApiMasterContractedCompanyPostParam;
    }
    namespace Response {
      type List = ApiMasterContractedCompanyGetListResponse;
    }
  }

  namespace CustomerRank {
    namespace Param {
    }
    namespace Response {
    }
  }

  namespace Employee {
    namespace Param {
      type List = ApiMasterEmployeeGetListParam;
      type Post = ApiMasterEmployeePostParam;
    }
    namespace Response {
      type List = ApiMasterEmployeeGetListResponse;
    }
  }

  namespace QuoteFixed {
    namespace Param {
      type List = ApiMasterQuoteFixedGetListParam;
      type Post = ApiMasterQuoteFixedPostParam;
    }
    namespace Response {
      type List = ApiMasterQuoteFixedGetListResponse;
    }
  }

  namespace Inquiry {
    namespace Param {
      type List = ApiMasterInquiryGetListParam;
      type Post = ApiMasterInquiryPostParam;
    }
    namespace Response {
      type List = ApiMasterInquiryGetListResponse;
    }
  }

  namespace LargeCategory {
    namespace Param {
      type List = ApiMasterLargeCategoryGetListParam;
      type Post = ApiMasterLargeCategoryPostParam;
    }
    namespace Response {
      type List = ApiMasterLargeCategoryGetListResponse;
    }
  }

  namespace Madori {
    namespace Param {
      type List = ApiMasterMadoriGetListParam;
      type Post = ApiMasterMadoriPostParam;
    }
    namespace Response {
      type List = ApiMasterMadoriGetListResponse;
    }
  }

  namespace Meisai {
    namespace Param {
      type List = ApiMasterMeisaiGetListParam;
      type Post = ApiMasterMeisaiPostParam;
    }
    namespace Response {
      type List = ApiMasterMeisaiGetListResponse;
    }
  }

  namespace MiddleCategory {
    namespace Param {
      type List = ApiMasterMiddleCategoryGetListParam;
      type Post = ApiMasterMiddleCategoryPostParam;
    }
    namespace Response {
      type List = ApiMasterMiddleCategoryGetListResponse;
    }
  }

  namespace Origin {
    namespace Param {
      type List = ApiMasterOriginGetListParam;
      type Post = ApiMasterOriginPostParam;
    }
    namespace Response {
      type List = ApiMasterOriginGetListResponse;
    }
  }

  namespace Signature {
    namespace Param {
      type List = ApiMasterSignatureGetListParam;
      type Post = ApiMasterSignaturePostParam;
    }
    namespace Response {
      type List = ApiMasterSignatureGetListResponse;
    }
  }

  namespace Store {
    namespace Param {
      type List = ApiMasterStoreGetListParam;
      type Post = ApiMasterStorePostParam;
    }
    namespace Response {
      type List = ApiMasterStoreGetListResponse;
    }
  }

  namespace SupportHistory {
    namespace Param {
      type List = ApiMasterSupportHistoryGetListParam;
      type Post = ApiMasterSupportHistoryPostParam;
    }
    namespace Response {
      type List = ApiMasterSupportHistoryGetListResponse;
    }
  }

  namespace Tax {
    namespace Param {
      type List = ApiMasterTaxGetListParam;
      type Post = ApiMasterTaxPostParam;
    }
    namespace Response {
      type List = ApiMasterTaxGetListResponse;
    }
  }

  namespace Unit {
    namespace Param {
      type List = ApiMasterUnitGetListParam;
      type Post = ApiMasterUnitPostParam;
    }
    namespace Response {
      type List = ApiMasterUnitGetListResponse;
    }
  }

  namespace ConstructionPart {
    namespace Param {
      type List = ApiMasterConstructionPartGetListParam;
      type Post = ApiMasterConstructionPartPostParam;
    }
    namespace Response {
      type List = ApiMasterConstructionPartGetListResponse;
    }
  }

  namespace MyCarType {
    namespace Param {
      type List = ApiMasterMyCarTypeGetListParam;
      type Post = ApiMasterMyCarTypePostParam;
    }
    namespace Response {
      type List = ApiMasterMyCarTypeGetListResponse;
    }
  }

  namespace Part {
    namespace Param {
      type List = ApiMasterPartGetListParam;
      type Post = ApiMasterPartPostParam;
    }
    namespace Response {
      type List = ApiMasterPartGetListResponse;
    }
  }

  namespace ProspectPart {
    namespace Param {
      type List = ApiMasterProspectPartGetListParam;
      type Post = ApiMasterProspectPartPostParam;
    }
    namespace Response {
      type List = ApiMasterProspectPartGetListResponse;
    }
  }

  namespace RelevantTag {
    namespace Param {
      type List = ApiMasterRelevantTagGetListParam;
      type Post = ApiMasterRelevantTagPostParam;
    }
    namespace Response {
      type List = ApiMasterRelevantTagGetListResponse;
    }
  }

  namespace LostOrder {
    namespace Param {
      type List = ApiMasterLostOrderGetListParam;
      type Post = ApiMasterLostOrderPostParam;
    }
    namespace Response {
      type List = ApiMasterLostOrderGetListResponse;
    }
  }
}
