import React, { useEffect, useMemo, useRef } from 'react'
import styles from './Chat.module.css'
import Markdown from 'react-markdown'

const WELCOME_MESSAGE_GROUP=[
  {
    role:"assistant",
    content:"Hello! How may I assist you?"
  },
];

function Chat({messages}) {
  const messagesEndRef=useRef(null);
  const messagesGroup=useMemo(
    ()=> 
      messages.reduce((groups,message)=>{
        if (message.role==='user') groups.push([]);
        groups[groups.length -1].push(message);
        return groups;
  }, []),
  [messages]
  );

  useEffect(()=>{
    messagesEndRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages])

  return (
    <div className={styles.Chat}>
      {[WELCOME_MESSAGE_GROUP,...messagesGroup].map((messages, groupIndex)=>(
        <div key={groupIndex} className={styles.Group}>
            {messages.map(({role,content},index)=>(
            <div key={index} className={styles.Message} data-role={role}>
              <Markdown>{content}</Markdown>
            </div>
        ))}
        </div>
      )
      )}
        <div ref={messagesEndRef}/>
    </div>
  )
}
export default Chat