import React from 'react'

export const Sort = ({ setSortParams }) => {
  const handleFilter = ({ target }) => {
    const dataAttr = target.dataset.fitler;
    setSortParams(dataAttr);
  }
  return (
    <div className='sort-wrapper'>
      <button className='sort-wrapper__btn btn' onClick={handleFilter} data-fitler="all">Все</button>
      <button className='sort-wrapper__btn btn' onClick={handleFilter} data-fitler="floor">Этаж</button>
      <button className='sort-wrapper__btn btn' onClick={handleFilter} data-fitler="price">Цена</button>
      <button className='sort-wrapper__btn btn' onClick={handleFilter} data-fitler="rooms">Колличество комнат</button>
      <button className='sort-wrapper__btn btn' onClick={handleFilter} data-fitler="area_total">Общая площадь</button>
      <button className='sort-wrapper__btn btn' onClick={handleFilter} data-fitler="area_kitchen">Площадь кухни</button>
      <button className='sort-wrapper__btn btn' onClick={handleFilter} data-fitler="area_live">Жилая площадь</button>
    </div>
  )
}
