import { createContext } from 'react';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';

export const ParsedQueryCtx = createContext();

export const ParsedQueryProvider = ({ children }) => {
  const { search } = useLocation();
  const parsedQuery = useMemo(() => {
    return qs.parse(search, {
      decode: true,
    });
  }, [search])
  return (
      <ParsedQueryCtx.Provider value={parsedQuery}>{children}</ParsedQueryCtx.Provider>
  )
}