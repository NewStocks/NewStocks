import styles from './landingview.module.css'

import LandingBox from './LandingBox/LandingBox'

export default function LandingView() {

  return (
    <>
      <LandingBox position={60} right={false} />
      <LandingBox position={785} right={true} />
    </>
  )
}