import { useContext } from 'react';
import { ParsedQueryCtx } from '../providers/parsedQuery';

export const useParsedQuery = () => {
  return useContext(ParsedQueryCtx);
}