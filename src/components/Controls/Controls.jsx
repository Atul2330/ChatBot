import React, { useEffect, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import styles from './Controls.module.css'


function Controls({isDisabled=false,onSend}) {
  const textareaRef=useRef(null);
  const [content,setContent]=useState("")

  useEffect(()=>{
    if(!isDisabled){
      textareaRef.current.focus();
    }
  }, [isDisabled])
  function handleContentChange(event){
    setContent(event.target.value);
  }

  function handleContentSend(){
    if (content.length >0){
      onSend(content)
      setContent("")
    }
  }

  function handleEnterPress(event){
    if(event.key==="Enter" && !event.shiftKey){
      event.preventDefault()
      handleContentSend()
    }
  }
    return (
      <div className={styles.Controls}>
          <div className={styles.TextAreaContainer}>
            <TextareaAutosize
              ref={textareaRef}
              className={styles.TextArea} placeholder='Please feel free to ask anything'
              value={content}
              disabled={isDisabled}
              minRows={1}
              maxRows={4}
              onChange={handleContentChange}
              onKeyDown={handleEnterPress}
            />
          </div>
          <button 
          className={styles.Button} onClick={handleContentSend} disabled={isDisabled}>
            <SendIcon/>
          </button>
      </div>
    )
}
function SendIcon(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M120-160v-243.33L428-480l-308-78v-242l760 320-760 320Z"/></svg>
    )
}
export default Controls