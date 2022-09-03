import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Index from './pages/Index';
import Create from './pages/Create'
import View from './pages/View';
import Store from './store/Store';
import React from 'react';

function App() {
  return (
    <div>
      <Store>{/*  //store => {children} */}
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/create' element={<Create />} />
            <Route path='/view/:bookId' element={<View />} />
          </Routes>
        </BrowserRouter>
      </Store>
    </div>
  );
}

export default App;
