import React from 'react'
import { useMutateQuery } from '../../hooks/useMutateQuery';
import { useParsedQuery } from '../../hooks/useParsedQuery';

export const FilterItem = ({ uniqKey, value, keyName }) => {
  const mutateQuery = useMutateQuery();
  const checkedContext = useParsedQuery();
  const handleChange = ({ target }) => {
    mutateQuery({
      [keyName]: target.checked ? value : null,
      page: 0,
    })
  };
  const isChecked = String(checkedContext[keyName]) === String(value);
  return (
    <div key={uniqKey}>
      <label>
        <input onChange={handleChange} type="checkbox" name={value} checked={isChecked}/> {value}
      </label>
    </div>
  )
}
