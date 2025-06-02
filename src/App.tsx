import React from 'react';
import './App.css';
import HeroSection from './components/HeroSection/HeroSection';
import Navigation from './components/Navigation/Navigation';
import DataVisualization from './components/DataVisualization/DataVisualization';
import StorytellingSection from './components/StorytellingSection/StorytellingSection';
import BitsAffordabilityGame from './components/BitsAffordabilityGame/BitsAffordabilityGame';
import TimeMachineGame from './components/TimeMachineGame/TimeMachineGame';
import Developers from './components/Developers/Developers';
import PetitionPopup from './components/PetitionPopup/PetitionPopup';
import { Analytics } from '@vercel/analytics/react';
// import CallToAction from './components/CallToAction/CallToAction';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navigation />
      <HeroSection />
      <DataVisualization />
      <StorytellingSection />
      <BitsAffordabilityGame />
      <TimeMachineGame />
      {/* <CallToAction /> */}
      <Footer />
      <Developers />
      <PetitionPopup />
      <Analytics />
    </div>
  );
}

export default App; 