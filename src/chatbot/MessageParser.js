class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {

    const lower = message.toLowerCase();

    if (lower.includes("score")) {
      this.actionProvider.handleCheckScore();
    } 
    else if (lower.includes("improve")) {
      this.actionProvider.handleImproveResume();
    } 
    else if (lower.includes("ranking")) {
      this.actionProvider.handleRankingInfo();
    }
    else {
      // ✅ IMPORTANT: message pass karo
      this.actionProvider.handleGeneralQuestion(message);
    }
  }
}

export default MessageParser;