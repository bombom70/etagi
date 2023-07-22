import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { FlatList } from '../components/FlatList';
import { Navigation } from '../components/Navigation';
import { Sort } from '../components/Sort';
import { Filter } from '../components/Filter';

const fetchFlats = async (sortParams, filter, skip) => {
  const filterparams = filter.length > 0 ? `&${filter.join("&")}` : "";
  const query = sortParams !== 'all' ? `&sortParams=${sortParams}` : '';
  const { data } = await axios(`http://localhost:3001/api/flats?skip=${skip}${query}${filterparams}`);
  return data;
}

export const MainPage = () => {
  const [filter, setFilter] = useState([]);
  const [sortParams, setSortParams] = useState('all');
  const [page, setPage] = useState(0);
  
  const { data, isLoading, isError } = useQuery(
    ['flats', sortParams, filter, page],
    () => fetchFlats(sortParams, filter, page),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error receiving data</div>
  }

  return (
    <>
      <h1 className='title'>Список квартир</h1>
      <Sort setSortParams={setSortParams}/>
      <div className='content'>
        <Filter setFilter={setFilter} setPage={setPage}/>
        <FlatList flats={data}/>
      </div>
      <Navigation
        setPage={setPage}
        currentPage={page}
        countFlats={data.length}
      />
    </>
  )
}
