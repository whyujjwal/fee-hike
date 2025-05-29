import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import Navigation from './components/Navigation/Navigation';
import DataVisualization from './components/DataVisualization/DataVisualization';
import StorytellingSection from './components/StorytellingSection/StorytellingSection';
import BitsAffordabilityGame from './components/BitsAffordabilityGame/BitsAffordabilityGame';
import TimeMachineGame from './components/TimeMachineGame/TimeMachineGame';
// import CallToAction from './components/CallToAction/CallToAction';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Navigation />
      <HeroSection />
      <DataVisualization />
      <StorytellingSection />
      <BitsAffordabilityGame />
      <TimeMachineGame />
      {/* <CallToAction /> */}
      <Footer />
    </div>
  );
}

export default App; 