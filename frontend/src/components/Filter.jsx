import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { FilterItem } from './FIlterItem';
import { translateWOrd } from '../untils/utils';

const fetchFilterParams = async () => {
  const { data } = await axios(`http://localhost:3001/api/flats/get-filter-params`);
  return data;
}

export const Filter = ({ setFilter, setPage }) => {
  const { data } = useQuery({
    queryFn: () => fetchFilterParams(),
    keepPreviousData: true
  });

  return (
    <div className='filter'>
      <span className='filter__title'>Фильтр:</span>
      {data && Object.keys(data).map(key => {
        return (
          <div key={key}>
            <label className='filter__label'>{translateWOrd(key)}:</label>
            <div>
              {data[key].map(filter => {
                const uniqKey = `${key}${filter[key]}`;
                return (
                  <FilterItem
                    key={uniqKey}
                    uniqKey={uniqKey}
                    value={filter[key]}
                    setFilter={setFilter}
                    keyName={key}
                    setPage={setPage}
                  />
                );
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
