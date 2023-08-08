import Button from "@components/button";
import styles from "./comment.module.css";
import { useUser } from '@supabase/auth-helpers-react'


export default function Comment({ comment, createdAt, author, id }) {
  const user = useUser();
  const handleDelete = () => {
    console.log({ id });
  };
  return (
    <div className={styles.container}>
      <p>{comment}</p>
      <p className={styles.author}>{author}</p>
      <time className={styles.date}>{createdAt}</time>

      {user.id === comment.user_id && <div className={styles.buttonContainer}>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
}
    </div>

  );
}
