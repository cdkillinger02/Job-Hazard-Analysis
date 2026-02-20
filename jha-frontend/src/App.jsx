import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import JHAList from './pages/JHAList';
import JHAEdit from './pages/JHAEdit';
import JHAView from './pages/JHAView';

function App() {
  const [activeStep, setActiveStep] = useState(1);
  return (
    <div className='page'>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<JHAList />} />
            <Route path="/jha/new" element={<JHAEdit activeStep={activeStep} setActiveStep={setActiveStep} />} />
            <Route path="/jha/:id/edit" element={<JHAEdit activeStep={activeStep} setActiveStep={setActiveStep} />} />
            <Route path="/jha/:id/view" element={<JHAView />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;