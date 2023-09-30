
import styles from './chatmessage.module.css'

interface Message {
  role: string;
  message: string;
}

export default function ChatMessage({chatmessage}: {chatmessage: Message}) {


  return (
    <>
      <div className={chatmessage.role === 'human'? styles['bubble-human']: styles['bubble-bot']}>
        {chatmessage.message}
      </div>

    </>
  )
}