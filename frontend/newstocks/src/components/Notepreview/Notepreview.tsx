import styles from './Notepreview.module.css';
import { FaRegComment, FaRegHeart, FaRegBookmark } from "react-icons/fa";

interface Props {
  title?: string
  date?: string
  name?: string
  content: string 
  profile?: string
  image?: string
  // buyPrice?: number
  // sellPrice?: number
  // sellQuantity?: number
  // buyQuantity?: number
  scrapCount?: number
  likeCount?: number
  replyCount?: number
}

export default function Notepreview({ title, date, name, content, profile, image,
  scrapCount, likeCount, replyCount}: Props) {
  const truncateContent = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };
  
  const textClass = image ? styles["Note-preview-text"] : styles["Note-preview-noimage"];
  
  return (
    <div className={styles["Note-preview-wrapper"]}>
        <div className={styles["Note-preview-head"]}>
          <div className={styles["Note-preview-name"]}>
            {profile!='x' && <img src={profile} alt="profileImage" />}
            {name}
          </div>
          <div className={styles["Note-preview-date"]}>
            <div className={styles["Note-preview-date-text"]}>{date}</div>
            
            <div className={styles["Note-preview-likescrap"]}>
              <FaRegHeart className={styles["Note-preview-likescrap-icon"]}/>{likeCount}
              <FaRegBookmark className={styles["Note-preview-likescrap-icon"]}/>{scrapCount}
              <FaRegComment className={styles["Note-preview-likescrap-icon"]}/>{replyCount}
            </div>
          </div>

        </div>
        <div className={styles["Note-preview-body"]}>
          <div className={textClass}>
            <div className={styles["Note-preview-title"]}>
              {title}
            </div>
            <div className={styles["Note-preview-content"]}>
              {truncateContent(content, 100)}
            </div>
          </div>
          <div className={styles["Note-preview-image"]}>
            {image && <img src={image} alt="profileImage" />}
          </div>
        </div>
    </div>
  );
}
