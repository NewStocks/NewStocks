import styles from './detailpage.module.css'

type Props = {
  params: {
    id: string,
  }
  searchParams: {
    [key: string]: string | string[] | undefined 
  }
}

export default function DetailnotePage({ params, searchParams, }: Props) {
  return (
    <div className={styles.main}>
      <h1>노트 상세 페이지: {params.id}</h1>
      <h2>{searchParams.a}</h2>
    </div>
  )
}