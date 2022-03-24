import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from '../Home/Home';
import Error404 from '../Error/Error404';
import './App.css';

export const App: FunctionComponent = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={Error404} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
