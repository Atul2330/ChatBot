import { useState } from "react"
import { Assistant } from "./assistant/googleai";
import styles from "./App.module.css"
import Chat from "./components/Chat/Chat"
import Controls from "./components/Controls/Controls";
import Loader from "./components/Loader/Loader";


function App() {
  const assistant =new Assistant();
  const [messages,setMessages]=useState([]);
  const [isLoading, setIsLoading]=useState(false);
  const [isStreaming, setIsStreaming]=useState(false);

  function updateLastMessageContent(content){
    setMessages((prevMessage)=>prevMessage.map((message,index)=>
      index ===prevMessage.length-1 
    ? {...message,content:`${message.content}${content}`}
    :message))
  }
  
  function addMessage(message){
    setMessages((prevMessage)=>[...prevMessage,message])
  }

  async function handleContentSend(content){
    addMessage({content, role:"user"})
    setIsLoading(true);
    try{
      const result =await assistant.chatStream(content)
      let isFirstChunk =false

      for await(const chunk of result){
        if(!isFirstChunk){
          isFirstChunk=true
          addMessage({content:"",role: "assistant"})
          setIsLoading(false)
          setIsStreaming(true)
        }

        updateLastMessageContent(chunk)
      }
      setIsStreaming(false)
    }catch(error){
      addMessage({
        content: "Sorry, it seems I am facing an issue processing your request. Kindly try again.", 
        role:"system",
      });      
      setIsLoading(false);
      setIsStreaming(false)
    }
  }
  return (
    <div className={styles.App}>
      { isLoading && <Loader/>}
      <header className={styles.Header}>
        <img className={styles.Logo} src="/icon.png" />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages}/>
      </div>
      <Controls isDisabled={isLoading || isStreaming} onSend={handleContentSend}/>
    </div>
  )
}

export default App
