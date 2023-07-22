import React from 'react';
import { FlatItem } from './FlatItem';
 

export const FlatList = ({ flats }) => {
  return (
    <div className='flats-wrapper'>
      <div className='flats'>
        {flats.map(f => <FlatItem key={f.id} {...f}/>)}
      </div>
    </div>
  )
}
