import styles from "./comments.module.css";
import Comment from "../comment";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { commentsCacheKey, getComments,  removeComment } from "../../../../../api-routes/comments"

export default function Comments({postId}) {
  const { data: { data: comments = [] } = {}, error } = useSWR(postId  ? `${commentsCacheKey}${postId}`  : null,
    () => getComments(postId)
  )

  return (
    <div className={styles.container}>
      <h2>Comments</h2>
      {comments?.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
}
