import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AppRoutes from '../src/Routes/AppRoutes';
import Footer from './components/Footer/Footer'; 

function App() {
  return (
    <Router>
     
      <div className="min-h-screen bg-slate-50 flex flex-col">
        

        <Navbar />


        <main className="flex-grow">
          <AppRoutes />
        </main>


        <Footer />

      </div>
    </Router>
  );
}

export default App;