import { Route, Routes } from 'react-router';
import React from 'react';
import Header from './components/Header';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <div className="p-4">
      <Header />

      <main className="p-4" role="main">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
