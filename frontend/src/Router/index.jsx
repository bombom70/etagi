import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from '../pages/MainPage';
import { CurrentFlatPage } from '../pages/CurrentFlatPage';
import { NotFound } from '../pages/NotFound';

const Router = () => (
    <Routes>
          <Route path="/" element={<MainPage/>}></Route>
          <Route path="flats/:id" element={<CurrentFlatPage/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
)

export default Router;