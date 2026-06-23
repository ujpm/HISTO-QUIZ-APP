# 🏥 MedBoard Prep

> *Study smarter, not harder.* For lazy med students who just know how to code.

---

## 🎯 What's This?

A **medical exam prep quiz app** built with React + Vite. Because studying is pain, but flashcards are easier. We made it prettier so you'll actually use it.

- 📚 **Interactive quizzes** for medical exams (Histology, Anatomy, etc.)
- 🌓 **Dark mode** (because your eyes matter at 3 AM)
- 💾 **Persistent progress** - your answers don't disappear (unlike your confidence)
- 🎨 **Bootstrap-powered UI** - looks good without us stressing about CSS

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (just assume you have it)
- npm or yarn (obviously)

### Installation

```bash
# Clone this repo (if you haven't already)
git clone <repo-url>
cd HISTO-QUIZ-APP

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser and go to `http://localhost:5173` - boom, you're in.

---

## 📁 Project Structure

```
HISTO-QUIZ-APP/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx     # The boring list of courses
│   │   ├── Quiz.jsx          # Where the magic happens
│   │   └── Footer.jsx        # Slide into our DMs
│   ├── App.jsx               # The main thing
│   ├── main.jsx              # Entry point
│   └── App.css               # We tried, okay?
├── public/
│   └── data/
│       ├── courses.json      # Course metadata
│       └── histo_q1.json     # Actual quiz questions
├── index.html                # HTML skeleton
├── package.json              # Dependencies (bootstrap ftw)
└── vite.config.js            # Vite config (don't touch)
```

---

## 🛠️ Scripts

```bash
npm run dev       # Start dev server (localhost:5173)
npm run build     # Build for production (dist/)
npm run preview   # Preview production build locally
npm run lint      # Check code with oxlint (optional)
```

---

## 📝 How to Add Quizzes

1. Create a JSON file in `public/data/` with your questions:

```json
{
  "title": "Histology 101",
  "description": "Cells and tissues",
  "questions": [
    {
      "id": 1,
      "question": "What is a mitochondrion?",
      "options": ["Power station", "Nope", "Still nope", "OK this one"],
      "correctOptionIndex": 0,
      "explanation": "It's the powerhouse of the cell"
    }
  ]
}
```

2. Add it to `public/data/courses.json`:

```json
{
  "courseId": "histo_102",
  "courseTitle": "Histology 102",
  "quizFile": "histo_q2.json"
}
```

3. Reload and boom - new quiz is live.

---

## 🎨 Features

✅ **Dashboard** - Browse all available quizzes  
✅ **Quiz Mode** - Answer questions like you know what you're doing  
✅ **Progress Tracking** - Your marks are saved (mostly)  
✅ **Dark/Light Mode** - Choose your vibe  
✅ **Responsive Design** - Works on phone too (barely)  
✅ **Footer Easter Egg** - Hit us up with suggestions  

---

## 🐛 Known Issues

- Sometimes Bootstrap classes are weird
- CSS can be... creative
- Probably some typos in the questions
- The footer disappears during quizzes (on purpose, we swear)

---

## 📦 Tech Stack

- **React 19** - UI library we love
- **Vite 8** - Fast build tool (goodbye webpack)
- **Bootstrap 5** - CSS framework for lazy people
- **JavaScript (ES6+)** - You know this already

---

## 🤝 Contributing

Found a bug? Have a better quiz? Want to make it less ugly?

**Hit us up on WhatsApp:** Available in the footer 👀

---

## 📄 License

Honestly? Do whatever. It's for students, so just study and pass your exams.

---

## 👨‍💻 Built By

Someone who just knows how to write code and also struggles with med school.

**"Code is poetry. Medical school is a nightmare."** - Us

---

## 🎓 Final Words

> "We built this because studying is pain. We coded it because we love pain."

Now stop reading this and **start studying**. Your exams won't pass themselves. ✌️

---

*Made with ☕ and probably too much caffeine at 2 AM*
