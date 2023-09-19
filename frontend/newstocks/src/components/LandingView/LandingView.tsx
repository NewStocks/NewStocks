import styles from './landingview.module.css'

import LandingBox from './LandingBox/LandingBox'

export default function LandingView() {

  return (
    <>
      <LandingBox position={40} right={false} />
      <LandingBox position={775} right={true} />
    </>
  )
}