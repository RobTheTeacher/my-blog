import BlogEditor from "@/components/blog-editor";
import { createSlug } from "@/utils/createSlug";
import { addPost } from "../../api-routes/posts"
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
export const cacheKey = "/api/blogs";

export default function CreatePost() {
  const user = useUser(); 
  const router = useRouter();
  const { trigger: addTrigger, isMutating } = useSWRMutation(
    cacheKey,
    addPost
  );

  const handleOnSubmit = async ({editorContent, titleInput, image}) => {
    const slug = createSlug(titleInput);
    const userId = user.id;

    const newPost = {
      title: titleInput, 
      slug: slug, 
      body: editorContent, 
      user_id: userId, 
      author: user.email,
      image: image
    }

    const { data, status, error} = await addTrigger({...newPost});
    
    if(status === 201) {
      router.push(`/blog/${slug}`);
    }
  };

  return (
    <BlogEditor
      heading="Create post"
      onSubmit={handleOnSubmit}
      buttonText="Upload post"
    />
  );
}
