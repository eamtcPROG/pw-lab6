import Idto from "interfaces/idto.interface";
import RequestFilterDTO from "dto/app/requestfilter.dto";
import RequestSortCriteriaDTO from "dto/app/requestsortcriteria.dto";
import RequestPopulateDTO from "dto/app/requestpopulate.dto";


export default class RequestListDTO implements Idto {
  filters?: Array<RequestFilterDTO>;
  page?: number;
  onpage?: number;
  sortcriteria?: Array<RequestSortCriteriaDTO>;
  populate?: RequestPopulateDTO;
  
}
