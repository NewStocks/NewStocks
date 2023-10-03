import styles from './ImagePreview.module.css'
import Image from 'next/image';

import { AiOutlineCloseSquare } from 'react-icons/ai'

export default function ImagePreview({ index, image, deleteImage }) {
  return (
    <div className={styles["image-box"]}>
      <Image
      src={image.url}
      alt="image preview"
      width={200}
      height={100}
      className={styles["image"]}
      />
      <button className={styles["delete-button"]} onClick={() => deleteImage(index, image)}><AiOutlineCloseSquare size="28"/></button>
    </div>
  )
}