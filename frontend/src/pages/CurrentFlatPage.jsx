import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { fetchFlatById } from '../network/flats';



export const CurrentFlatPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery(
    ['flats', id],
    () => fetchFlatById(id),
    {
      keepPreviousData: true,
    }
    );
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>{error.response.data}. Вернитесь на глвную <Link to='/'>страницу</Link></div>
  }

  return (
    <>
      <div className='flat-detail'>
        <img className='flat-detail__img' src={data.layout_image} alt='фото плана квартиры'/>
        <div className='flat-detail__info'>
          <p><span className='flat-info__title'>Этаж:</span> {data.floor}</p>
          <p><span className='flat-info__title'>Кол-во комнат:</span> {data.rooms}</p>
          <p><span className='flat-info__title'>Общая площадь:</span> {data.area_total} м²</p>
          <p><span className='flat-info__title'>Площадь кухни:</span> {data.area_kitchen} м²</p>
          <p><span className='flat-info__title'>Жила площадь:</span> {data.area_live} м²</p>
          <p><span className='flat-info__title'>Цена:</span> {data.price} Р.</p>
        </div>
      </div>
      <Link className='back-btn btn' to='/'>Вернуться назад</Link>
    </>
  )
}
