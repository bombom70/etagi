import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { FilterItem } from './FIlterItem';
import { translateWOrd } from '../untils/utils';

const fetchFilterParams = async () => {
  const { data } = await axios(`http://localhost:3001/api/flats/get-filter-params`);
  return data;
}

export const Filter = ({ setFilter, setPage }) => {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isShowAdditionalFilter, setIsShowAdditionalFilter] = useState(false);

  const { data } = useQuery({
    queryFn: () => fetchFilterParams(),
    keepPreviousData: true
  });

  useEffect(() => {
    if (!isShowAdditionalFilter) {
      setFilter(prev => prev.filter(v => v.split('_').length < 2));
    }
  }, [isShowAdditionalFilter]);

  const handleChange = () => {
    setIsShowAdditionalFilter(prev => !prev);
  }

  return (
    <div className='filter'>
      <span className='filter__title'>Фильтр:</span>
      {data?.main && Object.keys(data?.main).map(key => {
        return (
          <div key={key}>
            <label className='filter__label'>{translateWOrd(key)}:</label>
            <div>
              {data?.main[key].map(filter => {
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
      <button className='btn' onClick={handleChange}>Доп фильтр</button>
      {isShowAdditionalFilter && 
        data?.additional && Object.keys(data?.additional).map(key => {
        return (
          <div key={key}>
            <label className='filter__label'>{translateWOrd(key)}:</label>
            <div>
              {data?.additional[key].map(filter => {
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
      })
      }
    </div>
  )
}
