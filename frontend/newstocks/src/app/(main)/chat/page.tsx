import styles from './chat.module.css';
import ChatContainer from './ChatContainer/ChatContainer';

export default function MainsideChatPage() {
  return (
    <>
      <h1>오른쪽 사이드 AI chat</h1>
      <div className={styles.container}>
        <ChatContainer />

      </div>
    </>

  )
}