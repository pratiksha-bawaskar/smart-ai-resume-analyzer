import { getResumeScore, getResumeSuggestion } from "../services/api";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  addMessageToState = (message) => {
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  // ✅ SCORE (FIXED)
 handleCheckScore = async () => {
  try {
    const typing = this.createChatBotMessage("⏳ Analyzing resume...");
    this.addMessageToState(typing);

    const res = await getResumeScore(); // ✅ CORRECT

    setTimeout(() => {
      const message = this.createChatBotMessage(
        `📊 Your resume score is ${res.score}`
      );
      this.addMessageToState(message);
    }, 1000);

  } catch (error) {
    console.error(error);
    const message = this.createChatBotMessage("❌ Unable to fetch score");
    this.addMessageToState(message);
  }
};

handleImproveResume = async () => {
  try {
    const typing = this.createChatBotMessage("⏳ Generating suggestions...");
    this.addMessageToState(typing);

    const res = await getResumeSuggestion(); // ✅ CORRECT

    setTimeout(() => {
      const message = this.createChatBotMessage(
        `💡 ${res.suggestion}`
      );
      this.addMessageToState(message);
    }, 1000);

  } catch (error) {
    console.error(error);
    const message = this.createChatBotMessage("❌ Unable to fetch suggestion");
    this.addMessageToState(message);
  }
};

  // ✅ SMART CHAT
  handleGeneralQuestion = (text = "") => {
    const lower = text.toLowerCase();

    let reply = "";

    if (lower.includes("hello") || lower.includes("hi")) {
      reply = "👋 Hello! I can help you analyze your resume.";
    } 
    else if (lower.includes("job")) {
      reply = "💼 Focus on Java, Spring Boot, React, Microservices.";
    } 
    else if (lower.includes("skill")) {
      reply = "🧠 Key skills: Java, React, SQL, Spring Boot.";
    }
    else {
      reply = "⚠️ Try: 'check score', 'improve resume', 'ranking'";
    }

    const message = this.createChatBotMessage(reply);
    this.addMessageToState(message);
  };
}

export default ActionProvider;