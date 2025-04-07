import React from 'react'
import styles from './Chat.module.css'

const WELCOME_MESSAGE={
    role:"assistant",
    content:"Hello! How may I assist you?"
}

function Chat({messages}) {
  return (
    <div className={styles.Chat}>
        {[WELCOME_MESSAGE, ...messages].map(({role,content},index)=>(
            <div key={index} className={styles.Message} data-role={role}>{content}<br/><br/></div>
        ))}
    </div>
  )
}
export default Chat