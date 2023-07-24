import React from 'react';
import { Link } from 'react-router-dom';

export const FlatItem = ({ id, price, layout_image, area_total, rooms }) => {
  return (
    <div className='flats__item'>
      <img className='flat-img' src={layout_image} alt="фото квартиры"/>
      <div className='flat-info'>
        <p><span className='flat-info__title'>Площадь:</span> {area_total} м²</p>
        <p><span className='flat-info__title'>Кол-во комнат:</span> {rooms}</p>
        <p><span className='flat-info__title'>Цена:</span> {price} Р.</p>
        <Link className='flat-more' to={`flats/${id}`}>Подробнее</Link>
      </div>
    </div>
  )
}
