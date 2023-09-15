import styles from './createpage.module.css'

import CreatePostForm from '@/components/CreatePostForm/CreatePostForm'

export default function CreatePage() {
  return (
    <div className={styles["main"]}>
      <div>
        <div>뒤로가기</div>
        <div>오답노트 작성</div>
      </div>

      <CreatePostForm />
    </div>
  )
}