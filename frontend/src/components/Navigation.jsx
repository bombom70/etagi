import React from 'react'

export const Navigation = ({ setPage, countFlats, currentPage }) => {
  const handleNext = () => {
    if (countFlats < 8) {
      return ;
    }
    setPage(prev => prev < 2 ? prev + 1 : prev);
  }

  const handlePrev = () => {
    if (currentPage === 0) {
      return ;
    }
    setPage(prev => prev - 1);
  }
  
  return (
    <div className='nav'>
      <button className={`btn-nav btn ${currentPage === 0 || countFlats === 0 ? 'disable' : ''}`} onClick={handlePrev}>previos</button>
      <button className={`btn-nav btn ${currentPage === 2 || countFlats < 8 ? 'disable' : ''}`} onClick={handleNext}>next</button>
    </div>
  )
}
