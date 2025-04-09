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
  
  function addMessage(message){
    setMessages((prevMessage)=>[...prevMessage,message])
  }

  async function handleContentSend(content){
    addMessage({content, role:"user"})
    try{
      setIsLoading(true);
      const result =await assistant.chat(content)
      addMessage({content: result, role:"assistant"});      
    }catch(error){
      addMessage({
        content: "Sorry, it seems I am facing an issue processing your request. Kindly try again.", 
        role:"system",
      });      
    }finally{
      setIsLoading(false);
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
      <Controls isDisabled={isLoading} onSend={handleContentSend}/>
    </div>
  )
}

export default App
