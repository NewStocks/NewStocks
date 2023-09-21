'use client';

import React from 'react';
import styles from './Button.module.css';

import { HiArrowNarrowRight } from "react-icons/hi";
import { MdKeyboardArrowDown } from "react-icons/md";

// interface ButtonProps {
//   /**
//    * Is this the principal call to action on the page?
//    */
//   primary?: boolean;
//   /**
//    * What background color to use
//    */
//   backgroundColor?: string;
//   /**
//    * How large should the button be?
//    */
//   size?: 'small' | 'medium' | 'large';
//   /**
//    * Button contents
//    */
//   label: string;
//   /**
//    * Optional click handler
//    */
//   onClick?: () => void;
// }

/**
 * Primary UI component for user interaction
 */
// export const Button = ({
//   primary = false,
//   size = 'medium',
//   backgroundColor,
//   label,
//   ...props
// }: ButtonProps) => {
//   const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
//   return (
//     <button
//       type="button"
//       className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
//       {...props}
//     >
//       {label}
//       <style jsx>{`
//         button {
//           background-color: ${backgroundColor};
//         }
//       `}</style>
//     </button>
//   );
// };

type Props = {
  text: string,
  highlight: boolean | null,
  kindof: 'arrow' | "sorted" | null,
  // func: () => void | null,
}

export default function Button({ text, highlight, kindof }: Props) {

  if (kindof=="arrow") {
    return (
      <button className={styles["button-box"]} style={highlight ? { color: "#4FE7B0", border: "2px solid #4FE7B0" } : { color: "white" }}>
        <div>{text}</div>
        <HiArrowNarrowRight size="14"/>
      </button>
    );
  } else if (kindof=="sorted") {
    return (
      <button className={styles["button-box"]} id={styles["sorted"]} style={highlight ? { color: "#4FE7B0", border: "2px solid #4FE7B0" } : { color: "white" }}>
        <div>{text}</div>
        <MdKeyboardArrowDown size="23"/>
      </button>
    )
  } else {
    return (
      <button className={styles["button-box"]} style={highlight ? { color: "#4FE7B0", border: "2px solid #4FE7B0" } : { color: "white" }}>
        <div id={styles["basic"]}>{text}</div>
      </button>
    )
  }
};
