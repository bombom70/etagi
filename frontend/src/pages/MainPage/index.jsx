import React from 'react';
import { useQuery } from 'react-query';
import { FlatList } from './FlatList';
import { Navigation } from './Navigation';
import { Sort } from './Sort';
import { Filter } from './Filter';
import { fetchFlats } from '../../network/flats';
import { useParsedQuery } from '../../hooks/useParsedQuery';
import { FLATS_PER_PAGE } from './config';

const useFetchFlatsQuery = () => {
  const query = useParsedQuery();
   return useQuery(
    ['flats', query],
    () => fetchFlats({
      ...query,
      perPage: FLATS_PER_PAGE,
    }),
    {
      keepPreviousData: true,
    }
  );
}

export const MainPage = () => {
  const { data, isError } = useFetchFlatsQuery();
  if (isError) {
    return <div>Error receiving data</div>
  }
  return (
    <>
      <h1 className='title'>Список квартир</h1>
      <Sort/>
      <div className='content'>
        <Filter/>
        <FlatList flats={data}/>
      </div>
      <Navigation
        countFlats={data.length}
      />
    </>
  )
}
