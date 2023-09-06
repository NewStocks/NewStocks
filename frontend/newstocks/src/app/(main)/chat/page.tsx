import styles from './chat.module.css';
import PastMessages from './PastMessages/PastMessages';
import MessageInput from './MessageInput/MessageInput';

export default function MainsideChatPage() {
  return (
    <>
      <h1>오른쪽 사이드 AI chat</h1>
      <div className={styles.container}>
        <PastMessages /> 
        <MessageInput />

      </div>
    </>

  )
}