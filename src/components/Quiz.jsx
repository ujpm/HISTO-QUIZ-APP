import { useState, useEffect } from 'react';

const BATCH_SIZE = 100;

export default function Quiz({ quizFile, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [appState, setAppState] = useState('loading'); 
  const [currentBatchIndex, setCurrentBatchIndex] = useState(null);
  const [currentIndexInBatch, setCurrentIndexInBatch] = useState(0);
  const [batchAnswers, setBatchAnswers] = useState({}); 
  const [savedMarks, setSavedMarks] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (!quizFile) return; 
    fetch(`/data/${quizFile}`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        const marks = JSON.parse(localStorage.getItem(`marks_${quizFile}`)) || {};
        setSavedMarks(marks);
        setAppState('selector');
      })
      .catch(err => console.error("Error loading quiz data:", err));
  }, [quizFile]);

  if (appState === 'loading') {
    return (
      <div className="container mt-5 text-center text-muted">
        <div className="spinner-border mb-3" role="status"></div>
        <h4>wait a little bit...</h4>
      </div>
    );
  }

  const totalBatches = Math.ceil(questions.length / BATCH_SIZE);

  const startBatch = (index) => {
    setCurrentBatchIndex(index);
    setCurrentIndexInBatch(0);
    setBatchAnswers({});
    setAppState('playing');
    if (window.innerWidth > 768) setIsSidebarOpen(true);
  };

  const handleOptionClick = (optionIndex) => {
    if (batchAnswers[currentIndexInBatch] !== undefined) return;
    setBatchAnswers(prev => ({ ...prev, [currentIndexInBatch]: optionIndex }));
  };

  const finishBatch = () => {
    const batchStartIndex = currentBatchIndex * BATCH_SIZE;
    const actualBatchSize = Math.min(BATCH_SIZE, questions.length - batchStartIndex);
    let calculatedScore = 0;
    for (let i = 0; i < actualBatchSize; i++) {
      const selectedOpt = batchAnswers[i];
      if (selectedOpt !== undefined && selectedOpt === questions[batchStartIndex + i].correctAnswerIndex) {
        calculatedScore++;
      }
    }
    const newMarks = { ...savedMarks, [currentBatchIndex]: calculatedScore };
    setSavedMarks(newMarks);
    localStorage.setItem(`marks_${quizFile}`, JSON.stringify(newMarks));
    setAppState('milestone');
  };

  if (appState === 'selector') {
    return (
      <div className="container py-5" style={{ maxWidth: '900px' }}>
        <button className="btn btn-link text-decoration-none px-0 mb-4 fw-bold" onClick={onBack}>
          <i className="bi bi-arrow-left me-2"></i> Back to Dashboard
        </button>
        <div className="d-flex align-items-center mb-4">
          <i className="bi bi-stack fs-2 text-primary me-3"></i>
          <div>
            <h2 className="mb-0 fw-bold">Question Explorer</h2>
            <p className="text-muted mb-0">Total Bank: {questions.length} questions</p>
          </div>
        </div>
        
        <div className="row g-4">
          {Array.from({ length: totalBatches }).map((_, i) => {
            const startNum = (i * BATCH_SIZE) + 1;
            const endNum = Math.min((i + 1) * BATCH_SIZE, questions.length);
            const pastScore = savedMarks[i];

            return (
              <div key={i} className="col-md-6 col-lg-4">
                <div className="card shadow-sm border-0 h-100 bg-body-tertiary">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">Batch {i + 1}</h5>
                    <p className="text-muted small mb-3">Questions {startNum} - {endNum}</p>
                    
                    <div className="mt-auto">
                      {pastScore !== undefined ? (
                        <div className="bg-success bg-opacity-10 text-success rounded p-2 mb-3 text-center fw-bold">
                          <i className="bi bi-bar-chart-fill me-2"></i>
                          Score: {pastScore} / {endNum - startNum + 1}
                        </div>
                      ) : (
                        <div className="bg-secondary bg-opacity-10 text-secondary rounded p-2 mb-3 text-center">
                          <i className="bi bi-circle me-2"></i>
                          Unattempted
                        </div>
                      )}
                      <button className={`btn w-100 fw-bold ${pastScore !== undefined ? 'btn-outline-primary' : 'btn-primary'}`} onClick={() => startBatch(i)}>
                        {pastScore !== undefined ? 'Review Session' : 'Start Session'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (appState === 'milestone') {
    const pastScore = savedMarks[currentBatchIndex];
    const actualBatchSize = Math.min(BATCH_SIZE, questions.length - (currentBatchIndex * BATCH_SIZE));
    const questionsRemaining = questions.length - Math.min((currentBatchIndex + 1) * BATCH_SIZE, questions.length);
    const isCourseComplete = questionsRemaining <= 0;
    
    return (
      <div className="container py-5 text-center">
        <div className="card shadow-lg border-0 p-5 mx-auto bg-body-tertiary" style={{ maxWidth: '600px' }}>
          <div className="mb-4">
            {isCourseComplete ? (
              <i className="bi bi-trophy-fill text-warning" style={{ fontSize: '5rem' }}></i>
            ) : (
              <i className="bi bi-flag-fill text-primary" style={{ fontSize: '4rem' }}></i>
            )}
          </div>
          
          <h2 className="fw-bold mb-4">
            {isCourseComplete ? 'Module Mastered!' : 'Batch Completed!'}
          </h2>
          
          <div className="bg-body rounded p-4 mb-4 shadow-sm">
            <h4 className="text-success fw-bold mb-3">
              <i className="bi bi-check2-circle me-2"></i>
              Score: {pastScore} / {actualBatchSize}
            </h4>
            <hr className="my-3 opacity-25" />
            {isCourseComplete ? (
              <p className="mb-0 text-success fw-bold">You have successfully completed every batch in this module. Incredible work!</p>
            ) : (
              <p className="mb-0 text-muted">
                <i className="bi bi-info-circle me-2"></i>
                You have <strong>{questionsRemaining}</strong> questions remaining in this module. Keep the momentum going!
              </p>
            )}
          </div>

          <button className="btn btn-primary btn-lg fw-bold" onClick={() => setAppState('selector')}>
            <i className="bi bi-grid-fill me-2"></i>
            Return to Explorer
          </button>
        </div>
      </div>
    );
  }

  const batchStartIndex = currentBatchIndex * BATCH_SIZE;
  const actualBatchSize = Math.min(BATCH_SIZE, questions.length - batchStartIndex);
  const actualQuestionIndex = batchStartIndex + currentIndexInBatch;
  const currentQuestion = questions[actualQuestionIndex];
  const selectedOptionIndex = batchAnswers[currentIndexInBatch];
  const isAnswered = selectedOptionIndex !== undefined;

  return (
    <div className="d-flex bg-body position-relative" style={{ minHeight: 'calc(100vh - 56px)' }}>
      
      {/* Mobile overlay backdrop */}
      {isSidebarOpen && window.innerWidth < 768 && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-25" style={{ zIndex: 990 }} onClick={() => setIsSidebarOpen(false)}></div>
      )}
      
      <div className={`bg-body-tertiary border-end shadow-sm flex-shrink-0 transition-all ${isSidebarOpen ? 'd-flex' : 'd-none'}`} style={{ 
        width: '280px', 
        flexDirection: 'column', 
        height: 'calc(100vh - 56px)', 
        position: window.innerWidth < 768 ? 'fixed' : 'sticky', 
        top: window.innerWidth < 768 ? '56px' : 0,
        left: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease'
      }}>
        <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-primary text-white">
          <h6 className="mb-0 fw-bold"><i className="bi bi-compass me-2"></i>Batch {currentBatchIndex + 1}</h6>
          <button className="btn-close btn-close-white" onClick={() => setIsSidebarOpen(false)}></button>
        </div>
        
        <div className="p-3 flex-grow-1 overflow-auto custom-scrollbar">
          <div className="d-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
            {Array.from({ length: actualBatchSize }).map((_, i) => {
              const ans = batchAnswers[i];
              const isCurrent = i === currentIndexInBatch;
              let btnClass = "btn btn-sm fw-bold rounded border ";
              if (ans === undefined) {
                btnClass += "btn-outline-secondary"; 
              } else {
                const isCorrect = ans === questions[batchStartIndex + i].correctAnswerIndex;
                btnClass += isCorrect ? "btn-success text-white border-success" : "btn-danger text-white border-danger";
              }
              if (isCurrent) btnClass += " ring ring-primary border-dark border-2 opacity-75";

              return (
                <button key={i} className={btnClass} onClick={() => {
                  setCurrentIndexInBatch(i);
                  // Close sidebar on mobile after selecting a question
                  if (window.innerWidth < 768) {
                    setIsSidebarOpen(false);
                  }
                }} style={{ padding: '6px 0' }}>
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-3 border-top bg-body">
          <button className="btn btn-warning w-100 fw-bold shadow-sm" onClick={finishBatch}>
            <i className="bi bi-box-arrow-right me-2"></i>Submit Batch
          </button>
        </div>
      </div>

      <div className="flex-grow-1" style={{ height: 'calc(100vh - 56px)', overflowY: 'auto' }}>
        <div className="container py-4 mx-auto" style={{ maxWidth: '800px' }}>
          
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex gap-2">
              {!isSidebarOpen && (
                <button className="btn btn-primary btn-sm shadow-sm" onClick={() => setIsSidebarOpen(true)}>
                  <i className="bi bi-layout-sidebar me-1"></i> Nav
                </button>
              )}
              <button className="btn btn-outline-secondary btn-sm" onClick={() => setAppState('selector')}>
                Exit Session
              </button>
            </div>
            <span className="badge bg-secondary fs-6 rounded-pill px-3 py-2">
              Q {currentIndexInBatch + 1} of {actualBatchSize}
            </span>
          </div>

          <div className="card shadow-sm border-0 mb-4 rounded-4 bg-body-tertiary">
            <div className="card-body p-4 p-md-5">
              <h4 className="card-title mb-4 lh-base fw-semibold">{currentQuestion.question}</h4>
              
              <div className="d-grid gap-3 mt-4">
                {currentQuestion.options.map((option, index) => {
                  let buttonClass = "btn btn-outline-primary text-start p-3 fs-5 rounded-3";
                  let icon = "";
                  if (isAnswered) {
                    if (index === currentQuestion.correctAnswerIndex) {
                      buttonClass = "btn btn-success text-white text-start p-3 fs-5 fw-bold rounded-3";
                      icon = <i className="bi bi-check-circle-fill float-end fs-4"></i>;
                    } else if (index === selectedOptionIndex) {
                      buttonClass = "btn btn-danger text-white text-start p-3 fs-5 rounded-3";
                      icon = <i className="bi bi-x-circle-fill float-end fs-4"></i>;
                    } else {
                      buttonClass = "btn btn-outline-secondary text-start p-3 fs-5 rounded-3 opacity-50"; 
                    }
                  }
                  return (
                    <button key={index} className={buttonClass} onClick={() => handleOptionClick(index)}>
                      {option.text} {icon}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className={`alert mt-4 rounded-3 border-0 shadow-sm d-flex ${selectedOptionIndex === currentQuestion.correctAnswerIndex ? 'alert-success' : 'alert-danger'}`}>
                  <div className="me-3 fs-3">
                    {selectedOptionIndex === currentQuestion.correctAnswerIndex ? <i className="bi bi-lightbulb-fill"></i> : <i className="bi bi-exclamation-triangle-fill"></i>}
                  </div>
                  <div>
                    <h5 className="alert-heading fw-bold">
                      {selectedOptionIndex === currentQuestion.correctAnswerIndex ? 'Correct Explanation' : 'Incorrect Explanation'}
                    </h5>
                    <p className="mb-0 fs-5">{currentQuestion.options[selectedOptionIndex].feedback}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-between pb-5">
            <button className="btn btn-outline-primary btn-lg px-4" disabled={currentIndexInBatch === 0} onClick={() => setCurrentIndexInBatch(prev => prev - 1)}>
              <i className="bi bi-arrow-left me-2"></i>Prev
            </button>
            
            {currentIndexInBatch + 1 < actualBatchSize ? (
              <button className="btn btn-primary btn-lg px-5 shadow-sm fw-bold" onClick={() => setCurrentIndexInBatch(prev => prev + 1)}>
                Next<i className="bi bi-arrow-right ms-2"></i>
              </button>
            ) : (
              <button className="btn btn-warning btn-lg px-5 shadow fw-bold text-dark" onClick={finishBatch}>
                Finish Batch<i className="bi bi-flag-fill ms-2"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
