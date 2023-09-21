import styles from './ImagePreview.module.css'
import Image from 'next/image';

import { AiOutlineCloseSquare } from 'react-icons/ai'

export default function ImagePreview({ index, url, deleteImage }) {
  return (
    <div className={styles["image"]}>
      <Image
      src={url}
      alt="image preview"
      width="200"
      height="100"
      >
      </Image>
      <button className={styles["delete-button"]} onClick={() => deleteImage(index)}><AiOutlineCloseSquare size="28"/></button>
    </div>
  )
}