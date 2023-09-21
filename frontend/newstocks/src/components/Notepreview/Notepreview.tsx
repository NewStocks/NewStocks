import styles from './Notepreview.module.css';

interface Props {
  title: string;
  date: string;
  name: string;
  content: string
}

export default function Notepreview({ title, date, name, content }: Props) {
  return (
    <div className={styles["Note-preview-wrapper"]}>
      <div className={styles["Note-preview-head"]}>
        <div className={styles["Note-preview-name"]}>
          {name}
        </div>
        <div className={styles["Note-preview-date"]}>
          {date}
        </div>
      </div>
        <div className={styles["Note-preview-title"]}>
          {title}
        </div>
        <div className={styles["Note-preview-content"]}>
          {content}
        </div>
      
    </div>
  );
}
