type Props = {
  params: {
    id: string,
  }
}

export default function DetailnotePage({ params: {id} }: Props) {
  return (
    <>
      <h1>노트 상세 페이지: {id}</h1>
    </>
  )
}