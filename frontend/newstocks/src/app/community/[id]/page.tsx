import styles from './detailpage.module.css'

type Props = {
  params: {
    id: string,
  }
}

export default function DetailnotePage({ params: {id} }: Props) {
  return (
    <div className={styles.main}>
      <h1>노트 상세 페이지: {id}</h1>
    </div>
  )
}