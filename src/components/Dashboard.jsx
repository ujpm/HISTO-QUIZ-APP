import { useState, useEffect } from 'react';

export default function Dashboard({ onStartQuiz }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/data/courses.json')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error("Error loading courses:", err));
  }, []);

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="row mb-5 justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="display-5 fw-bold mb-3">For lazy people, who don't want to read</h1>
          <p className="lead text-muted">
            Comprehensive question banks designed for BLS studs. sourced directly from books like linda, Robert, Kageruka and other past papers. Select a course below to begin your session.
          </p>
        </div>
      </div>

      {/* Course Grid */}
      <div className="row g-4">
        {courses.map(course => (
          <div key={course.courseId} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0 bg-body-tertiary transition-transform" style={{ cursor: 'default' }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
                  <div className="bg-primary bg-opacity-10 text-primary rounded p-3 me-3">
                    <i className="bi bi-journal-medical fs-3"></i>
                  </div>
                  <h4 className="card-title fw-bold mb-0">{course.title}</h4>
                </div>
                
                <div className="d-grid gap-3">
                  {course.quizzes.map(quiz => (
                    <button
                      key={quiz.quizId}
                      className={`btn d-flex justify-content-between align-items-center p-3 shadow-sm ${quiz.status === 'available' ? 'btn-primary' : 'btn-secondary disabled bg-opacity-50 border-0'}`}
                      onClick={() => quiz.status === 'available' && onStartQuiz(quiz.file)}
                    >
                      <span className="fw-semibold text-start">{quiz.title}</span>
                      {quiz.status === 'available' ? (
                        <i className="bi bi-arrow-right-circle-fill fs-5"></i>
                      ) : (
                        <span className="badge bg-dark bg-opacity-50">Soon</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
