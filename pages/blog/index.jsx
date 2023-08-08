import Link from "next/link";
import styles from "./blog.module.css";
import Heading from "@components/heading";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { getPosts } from "../../api-routes/posts"

export const cacheKey = "/api/blogs";

export default function Blog() {
  const { data: { data = [] } = {} } = useSWR(cacheKey, getPosts, {
    onError: () => {
      setToaster({
        message: "Unable to fetch blogs, is your server up and running?",
        type: "error",
      });
    },
  });

  return (
    <section>
      <Heading>Blogs</Heading>
      {data?.map((post) => (
        
        <Link
          key={post.slug}
          className={styles.link}
          href={`/blog/${post.slug}`}
        >
          <div className="w-full flex flex-col">
            <p>{post.title}</p>
            <time className={styles.date}>{post.created_at}</time>
            <p>Author: {post.author}</p>
            {console.log(post.user_id)}
          </div>
        </Link>
      ))}
    </section>
  );
}
