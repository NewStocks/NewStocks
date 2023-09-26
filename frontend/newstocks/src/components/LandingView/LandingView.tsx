import styles from './landingview.module.css'

import LandingBox from './LandingBox/LandingBox'
import LandingFooter from './LandingFooter/LandingFooter'

export default function LandingView() {

  return (
    <>
      <LandingBox position={60} right={1} />
      <LandingBox position={700} right={2} />
      <LandingBox position={1300} right={3} />
      <LandingFooter />
    </>
  )
}