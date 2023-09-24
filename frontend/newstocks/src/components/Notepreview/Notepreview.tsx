import styles from './Notepreview.module.css';

interface Props {
  title?: string;
  date?: string;
  name?: string;
  content?: string
  profile?: string
  image?: string
}

export default function Notepreview({ title, date, name, content, profile, image }: Props) {
  return (
    <div className={styles["Note-preview-wrapper"]}>
        <div className={styles["Note-preview-head"]}>
          <div className={styles["Note-preview-name"]}>
            {profile!='x' && <img src={profile} alt="profileImage" />}
            {name}
          </div>
          <div className={styles["Note-preview-date"]}>
            {date}
          </div>
        </div>
        <div className={styles["Note-preview-body"]}>
          <div>
            <div className={styles["Note-preview-title"]}>
              {title}
            </div>
            <div className={styles["Note-preview-content"]}>
              {content}
            </div>
          </div>
          <div className={styles["Note-preview-image"]}>
            {image && <img src={image} alt="profileImage" />}
          </div>
        </div>
    </div>
  );
}
