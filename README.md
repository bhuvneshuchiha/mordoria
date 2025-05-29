# 🎭 Project Mordoria
### AI-Powered Collaborative Chat Game

> An innovative multiplayer chat experience where your messages and emotions combine to create AI-generated responses in various tones and styles.

---

## 🎮 How It Works

**Project Mordoria** transforms ordinary chat into an extraordinary collaborative storytelling experience:

1. **Join the Room** - All players connect to a single shared chat room
2. **Express Yourself** - Write messages and assign emotion scores (0-10) to influence the AI's response style
3. **Collaborative Magic** - When someone starts typing, a 30-second timer begins collecting all messages
4. **AI Response** - After the timer expires, our AI processes all messages with their average emotion score
5. **Dynamic Personalities** - The AI responds in various styles: funny, sad, witty, sensual, or mean - depending on your collective input

---

## 🛠️ Tech Stack

- **Backend**: Go with WebSocket support for real-time communication
- **Frontend**: React (JSX) for a responsive user interface  
- **Communication**: WebSockets for seamless client-server interaction
- **AI Integration**: Groq API for intelligent response generation

---

## 🚀 Quick Start

### Prerequisites

- Go installed on your system
- Node.js and npm
- Air (Go live reload tool)

### 🔑 API Setup (IMPORTANT)

1. Visit [Groq](https://groq.com) and create an account
2. Click on Dev Console on the top right.
3. Click on API keys on the top right.
4. Generate your API key
5. Create a `.env` file in your project's root directory:
   ```env
   GROQ_API_KEY="your-api-key-here"
   ```
   
   ⚠️ **Note**: It's **GROQ** with a "Q", not GROK with a "K"

### 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project_mordoria
   ```

2. **Install Go Air** (if not already installed)
   ```bash
   go install github.com/cosmtrek/air@latest
   ```

3. **Install Go dependencies**
   ```bash
   go mod download
   ```

4. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

### 🎯 Running the Application

You'll need **two terminal tabs/windows**:

**Terminal 1 - Backend Server:**
```bash
cd cmd/server
air
```

**Terminal 2 - Frontend Development Server:**
```bash
cd frontend
npm run dev
```

### 🌐 Access the Game

Once both servers are running, open the URL displayed in your frontend terminal (typically `http://localhost:5173`) and start playing!

---

## 🎨 Features

- **Real-time Collaboration** - See other players typing in real-time
- **Emotion-Driven AI** - Your collective emotions shape the AI's personality
- **Multiple Response Styles** - From hilarious to heartfelt, witty to wicked
- **Single Room Experience** - All players share one dynamic chat space
- **Instant Feedback** - 30-second response cycles keep the energy high

---

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues, feature requests, or pull requests.

---

## 📄 License

This project is open source. Please check the license file for details.

---

## 🎭 Ready to Play?

Join the chat, express your emotions, and watch as AI weaves your collective thoughts into something unexpected and entertaining!

**Happy Gaming! 🚀**
