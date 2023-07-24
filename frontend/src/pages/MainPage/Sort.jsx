import React from 'react'
import { useParsedQuery } from '../../hooks/useParsedQuery';
import { useMutateQuery } from '../../hooks/useMutateQuery';

export const Sort = () => {
  const mutateQuery = useMutateQuery();
  const { sortParams } = useParsedQuery();
  const onSelect = ({target: { value }}) => {
    console.log(value);
    mutateQuery({sortParams: value, page: 0});
  }
  const selectId = 'sort-select';
  return (
    <div className='sort-wrapper'>
      <label htmlFor={selectId}>Сортировка:</label>
      <select value={sortParams || "all"} onChange={onSelect} id={selectId}>
        {sortOpts.map(({ label, value }) => (
          <option value={value} key={value}>{label}</option>
        ))}
      </select>
    </div>
  )
}

const sortOpts = [
  {
    label: 'Все',
    value: 'all,'
  },
  {
    label: 'Этаж',
    value: 'floor'
  },
  {
    label: 'Цена',
    value: 'price'
  },
  {
    label: 'Колличество комнат',
    value: 'rooms'
  },
  {
    label: 'Общая площадь',
    value: 'area_total'
  },
  {
    label: 'Площадь кухни',
    value: 'area_kitchen'
  },
  {
    label: 'Жилая площадь',
    value: 'area_live'
  },
];