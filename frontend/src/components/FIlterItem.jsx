import React from 'react'

export const FilterItem = ({ uniqKey, value, setFilter, keyName, setPage }) => {
  const handaleChange = ({ target }) => {
    const currentValue = `${keyName}=${String(value)}`;
    if (target.checked) {
      setFilter((prev) => [...prev, currentValue]);
      setPage(0);
    } else {
      setFilter((prev) => {
        return prev.filter(val => val !== currentValue);
      });
      setPage(0);
    }
  };
  return (
    <div key={uniqKey}>
      <label>
        <input onChange={handaleChange} type="checkbox" name={value} /> {value}
      </label>
    </div>
  )
}
