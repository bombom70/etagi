import { useParsedQuery} from './useParsedQuery';
import { useNavigate, useLocation } from 'react-router-dom';
import qs from 'query-string';

export const useMutateQuery = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const query = useParsedQuery();
  return (partialQuery) => {
    const newUrl = qs.stringifyUrl({
      url: pathname,
      query: {
        ...query,
        ...partialQuery
      }
    }, {
      skipEmptyString: true,
      skipNull: true,
    });
    navigate(newUrl)
  }
}