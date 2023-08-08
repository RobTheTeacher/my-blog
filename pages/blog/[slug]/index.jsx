import { useRouter } from "next/router";
import styles from "./blog-post.module.css";
import Comments from "./partials/comments";
import AddComment from "./partials/add-comment";
import Button from "@components/button";
import Heading from "@components/heading";
import BlogImageBanner from "@components/blog-image-banner";
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getPost, deletePost } from "../../../api-routes/posts"

export const cacheKey = "/api/blogs";

export default function BlogPost() {
  const router = useRouter();
  const user = useUser();

  /* Use this slug to fetch the post from the database */
  const { slug } = router.query;

  const { data: { data: post = {} } = {}, error } = useSWR(slug ? `${cacheKey}${slug}` : null, () =>
    getPost({ slug })
  );

  const { trigger: deleteTrigger } = useSWRMutation(cacheKey, deletePost);

  const handleDeletePost = async () => {
    const postId = post.id

    const { data, status, error } = await deleteTrigger(postId);
    if (status === 204) {
      router.push('/blog')
    }
  };

  const handleEditPost = () => {
    router.push(`/blog/${slug}/edit`);
  };

  return (
    <>
      <section className={styles.container}>
        <Heading>{post?.title}</Heading>
        {post?.image && <BlogImageBanner src={post.image} alt={post.title} />}
        <div className={styles.dateContainer}>
          <time className={styles.date}>{post?.createdAt}</time>
          <div className={styles.border} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post?.body }} />
        <span className={styles.author}>Author: {post?.author}</span>
{console.log(post.author)}
        {/* The Delete & Edit part should only be showed if you are authenticated and you are the author */}
        {user?.id=== post?.user_id &&
          <div className={styles.buttonContainer}>
            <Button onClick={handleEditPost}>Edit</Button>
            <Button onClick={handleDeletePost}>Delete</Button>
          </div>
        }
      </section>

      <Comments postId={post?.id} />
      {user && <AddComment postId={post?.id} />}
    </>
  );
}
