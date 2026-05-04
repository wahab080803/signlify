import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import PredictionPage from './pages/PredictionPage';
import LearningPage from './pages/LearningPage';
import BlogPage from './pages/BlogPage'; 
import AuthorsPage from './pages/AuthorsPage';
import ASLGuidePage from './pages/ASLGuidePage';
import SupportPage from './pages/SupportPage';
import DashboardLayout from './components/DashboardLayout'; // Import the new layout

console.log("App is loading!");

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes (No Sidebar/Navbar) */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/authors" element={<AuthorsPage />} />

            {/* Protected/App Routes (With Sidebar & Navbar) */}
            {/* We wrap these in DashboardLayout to meet your professor's requirement */}
            <Route 
              path="/dashboard" 
              element={
                <DashboardLayout>
                  <DashboardPage />
                </DashboardLayout>
              } 
            />
            <Route 
              path="/prediction" 
              element={
                <DashboardLayout>
                  <PredictionPage />
                </DashboardLayout>
              } 
            />
            <Route 
              path="/learning" 
              element={
                <DashboardLayout>
                  <LearningPage />
                </DashboardLayout>
              } 
            />
            <Route 
              path="/guide-on-asl" 
              element={
                <DashboardLayout>
                  <ASLGuidePage />
                </DashboardLayout>
              } 
            />
            <Route 
              path="/support" 
              element={
                <DashboardLayout>
                  <SupportPage />
                </DashboardLayout>
              } 
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;