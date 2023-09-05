type Props = {
  params: {
    tab: string,
  }
}

export default function MainTabsPage({ params: {tab} }: Props) {
  return (
    <>
    <h1>오른쪽 사이드 탭</h1>
    <p>{tab}</p>
    </>
  )
}