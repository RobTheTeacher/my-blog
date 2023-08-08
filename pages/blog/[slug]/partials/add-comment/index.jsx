import { useRef } from "react";
import Button from "@components/button";
import Input from "@components/input";
import Label from "@components/label";
import TextArea from "@components/text-area";
import styles from "./add-comment.module.css";
import useSWRMutation from "swr/mutation";
import { commentsCacheKey, addNewComment } from "../../../../../api-routes/comments"
import { useUser } from '@supabase/auth-helpers-react'

export default function AddComment({ postId }) {
  const formRef = useRef(); // create a reference
  const { trigger: addTrigger, isMutating } = useSWRMutation(`${commentsCacheKey}${postId}` , addNewComment);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    // Alternative way to get the form data
    const formData = new FormData(event.target);
    const { author, comment } = Object.fromEntries(formData);
    const user = useUser()

    const newComment = {
      author,
      comment,
      post_id: postId,
      user_id: user?.id
    }

    const { data, status, error } = addTrigger(newComment);

    // Reset the form after submission?
    formRef.current.reset();
  };

  return (
    <div className={styles.container}>
      <h2>Add a comment</h2>
      <form ref={formRef} className={styles.form} onSubmit={handleOnSubmit}>
        <div className={styles.inputContainer}>
          <Label htmlFor="author">Author</Label>
          <Input id="author" name="author" />
        </div>

        <div className={styles.inputContainer}>
          <Label htmlFor="comment">Comment</Label>
          <TextArea id="comment" name="comment" />
        </div>

        <Button className={styles.addCommentButton} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
