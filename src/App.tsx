import { Route, Routes } from 'react-router';
import React from 'react';
import Header from './components/Header';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <div className="h-screen flex flex-col p-2 sm:p-4">
      <Header />

      <main className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
