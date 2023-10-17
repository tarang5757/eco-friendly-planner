import { useState } from 'react'
import reactLogo from './assets/react.svg'
//import viteLogo from './react.svg' // Specify the correct path to the Vite logo
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'

const API_KEY = "";

function App() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am Customer Service Bot",
      sender: "ChatGPT"
    }
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    }
  

    const newMessages = [...messages, newMessage]; // all the old messages + new messages
    // update our messages state 
    setMessages(newMessages);

    // typing indicator
    setTyping(true);
    // process message to ChatGPT (send it over)
    await processMessageToChatGPT(newMessages);
  }
    // since chatMessages are either user or chatGPT
    // apiMessages {role: "user"}

    // making an array of apiMessages

  async function processMessageToChatGPT(chatMessages){
    
    let apiMessages= chatMessages.map((messageObject) => {
      let role ="";
      if(messageObject.sender === "ChatGPT"){
        role = "assistant"
      }else{
        role = "user"
      }
      return {role: role, content: messageObject.message}
    });

    const systemMessage ={
      role: "system",
      content : "Speak like a travel agent."
    }

    const apiRequestBody ={
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages // this is gonna me [message1, message2, etc]
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) =>{
      return data.json();
    }).then((data) => {
      console.log(data);
      // console.log(data.choices[0].message.content);
      // setMessages(
      //   [...chatMessages, {
      //     message: data.choices[0].message.content,
      //     sender: "ChatGPT"
      //   }]
      // );
      // setTyping(false);
    });
}

  return(
    <div className='App'>
      <div style={{ position: "relative", height: "800px", width: "700px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={typing ? <TypingIndicator content="Checking for solutions" /> : null}
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}

            </MessageList>
            <MessageInput placeholder='How can I help you' onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default App
