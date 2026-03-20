import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./Options";

const config = {
  botName: "ResumeBot",

  initialMessages: [
    createChatBotMessage(
      "Hello 👋 I can help you analyze your resume.",
      {
        widget: "options",
      }
    ),
  ],

  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
  ],
};

export default config;