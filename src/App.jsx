import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import Footer from './components/Footer';

function App() {
  const [activeQuizFile, setActiveQuizFile] = useState(null);
  const [theme, setTheme] = useState('light');

  // Apply Bootstrap theme to the HTML body
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App min-vh-100 d-flex flex-column">
      {/* Global Navigation Bar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href="#" onClick={() => setActiveQuizFile(null)}>
            <i className="bi bi-heart-pulse-fill me-2"></i>
            MedBoard Prep
          </a>
          <button className="btn btn-outline-secondary btn-sm" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'light' ? <i className="bi bi-moon-fill"></i> : <i className="bi bi-sun-fill text-warning"></i>}
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow-1 bg-body">
        {!activeQuizFile ? (
          <Dashboard onStartQuiz={setActiveQuizFile} />
        ) : (
          <Quiz quizFile={activeQuizFile} onBack={() => setActiveQuizFile(null)} />
        )}
      </main>

      {/* Footer - Hidden during quiz sessions */}
      <Footer isQuizActive={!!activeQuizFile} />
    </div>
  );
}

export default App;
