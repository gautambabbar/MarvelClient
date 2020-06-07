import FAQFunctionsService from '../services/FAQFunctionsService';


export function fetchFAQAPI(url) {
  return FAQFunctionsService.fetchFAQ(url);
}
