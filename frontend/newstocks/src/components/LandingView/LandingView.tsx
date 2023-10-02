'use client'
import styles from './landingview.module.css'

import LandingBox from './LandingBox/LandingBox'
import LandingFooter from './LandingFooter/LandingFooter'
import React, { useRef, useEffect, useState } from 'react';

export default function LandingView() {
  const scrollArrowRef = useRef(null);
  const [hideArrow, setHideArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHideArrow(window.scrollY > 1400);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: 700,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <LandingBox position={60} right={1} />
      <LandingBox position={700} right={2} />
      <LandingBox position={1300} right={3} />
      <LandingFooter />

      <div
        ref={scrollArrowRef}
        className={`${styles.arrow} ${hideArrow ? styles.hide : ''}`}
        onClick={scrollToContent}
      >
        &#9660;
      </div>
    </>
  );
}