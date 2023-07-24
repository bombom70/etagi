import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { FilterItem } from './FIlterItem';
import { fetchAvailableFlatFilters } from '../../network/flats';
import { useMutateQuery } from '../../hooks/useMutateQuery';

export const Filter = () => {
  const [isShowAdditionalFilter, setIsShowAdditionalFilter] = useState(false);
  const mutateQuery = useMutateQuery();
  const { data } = useQuery(
    ['flat-filters'],
    fetchAvailableFlatFilters
  );
  const handleChange = () => {
    if (isShowAdditionalFilter) {
      if(data?.additional) {
        const extraKeys = Object.keys(data.additional);
        mutateQuery(extraKeys.reduce((acc, key) => {
          return {...acc, [key]: null }
        }, {}));
      }
    }
    setIsShowAdditionalFilter(prev => !prev);
  }
  const renderFiltersSection = data => (
    <>
    {Object.keys(data).map(key => {
        return (
          <div key={key}>
            <label className='filter__label'>{translateFilterName(key)}:</label>
            <div>
              {data[key].map(filter => {
                const uniqKey = `${key}${filter[key]}`;
                return (
                  <FilterItem
                    key={uniqKey}
                    uniqKey={uniqKey}
                    value={filter[key]}
                    keyName={key}
                  />
                );
              })}
            </div>
          </div>
        )
      })}
    </>
  )
  return (
    <div className='filter'>
      <span className='filter__title'>Фильтр:</span>
      {data?.main && renderFiltersSection(data.main)}
      <button className='btn' onClick={handleChange}>Доп фильтр</button>
      {isShowAdditionalFilter && data?.additional && renderFiltersSection(data.additional) }
    </div>
  )
}

const translateFilterName = (name) => {
  switch (name) {
    case "floor":
      return "Этаж";
    case "price":
      return "Цена";
    case "rooms":
      return "Колличество комнат";
    case "area_total":
      return "Общая площадь";
    case "area_kitchen":
      return "Площадь кухни";
    case "area_live":
      return "Жилая площадь";
    default:
      return "Неизвестное слово";
  }
}