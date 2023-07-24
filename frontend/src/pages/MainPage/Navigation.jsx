import React from 'react'
import { useParsedQuery } from '../../hooks/useParsedQuery';
import { useMutateQuery} from '../../hooks/useMutateQuery';
import { FLATS_PER_PAGE } from './config';

export const Navigation = ({ countFlats }) => {
  const {page = 0}= useParsedQuery();
  const currentPage = Number(page) || 0;
  const mutateQuery = useMutateQuery();
  const setPage = page => mutateQuery({ page });
  const handleNext = () => {
    if (countFlats < FLATS_PER_PAGE) {
      return;
    }
    const prev = currentPage;
    setPage(prev < 2 ? prev + 1 : prev);
  }

  const handlePrev = () => {
    if (!currentPage) {
      return ;
    }
    setPage(currentPage - 1);
  }
  
  return (
    <div className='nav'>
      <button className={`btn-nav btn ${currentPage === 0 || countFlats === 0 ? 'disable' : ''}`} onClick={handlePrev}>previos</button>
      <button className={`btn-nav btn ${currentPage === 2 || countFlats < 8 ? 'disable' : ''}`} onClick={handleNext}>next</button>
    </div>
  )
}
