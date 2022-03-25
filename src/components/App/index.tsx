import { FunctionComponent } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Home';
import Error404 from '../Error/Error404';
import './App.css';
import UserForm from '../UserForm';

export const App: FunctionComponent = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<UserForm />} />
        <Route path="/edit/:userid" element={<UserForm />} />
        <Route element={Error404} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
