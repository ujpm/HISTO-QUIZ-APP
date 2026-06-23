import { useState } from 'react';

export default function Footer() {
  const [step, setStep] = useState('idle');

  return (
    <footer className="mt-auto py-5 bg-body-tertiary border-top text-center transition-all">
      <div className="container">
        <p className="text-muted mb-3 fst-italic" style={{ fontSize: '0.9rem' }}>
          developed by anonymous. for lazy people.
        </p>
        
        {step === 'idle' && (
          <div className="mt-2 animate-fade-in">
            <p className="mb-2 text-secondary" style={{ fontSize: '0.85rem' }}>do u have a suggestion of quiz to cover next?</p>
            <button 
              className="btn btn-sm btn-outline-secondary rounded-pill px-3 opacity-75" 
              onClick={() => setStep('confirm')}
            >
              yea i got one
            </button>
          </div>
        )}

        {step === 'confirm' && (
          <div className="mt-2 animate-fade-in text-warning-emphasis">
            <p className="mb-2 fw-semibold" style={{ fontSize: '0.85rem' }}>are u sure u wanna text me??</p>
            <div className="d-flex justify-content-center gap-2">
              <button 
                className="btn btn-sm btn-warning rounded-pill px-3 shadow-sm fw-bold text-dark" 
                onClick={() => setStep('revealed')}
              >
                yup, give me the digits
              </button>
              <button 
                className="btn btn-sm btn-outline-secondary rounded-pill px-3" 
                onClick={() => setStep('idle')}
              >
                nah nvm
              </button>
            </div>
          </div>
        )}

        {step === 'revealed' && (
          <div className="mt-3 mx-auto p-3 bg-body rounded-4 shadow-sm border d-inline-block animate-fade-in">
            <p className="mb-1 text-success fw-bold">
              <i className="bi bi-whatsapp me-2"></i>
              this is my number: 0790180545
            </p>
            <p className="small text-muted mb-0 fst-italic">
              dont show it anyone promise... 🤫
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
