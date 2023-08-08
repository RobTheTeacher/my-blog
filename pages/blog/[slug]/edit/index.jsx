import { useRouter } from "next/router";
import BlogEditor from "../../../../components/blog-editor";
import {getPost, editPost} from '../../../../api-routes/posts'
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
export const cacheKey = "/api/blogs";
// const mockData = {
//   title: "Community-Messaging Fit",
//   body: "<p>This is a good community fit!</p>",
//   image:
//     "https://media.wired.com/photos/598e35fb99d76447c4eb1f28/16:9/w_2123,h_1194,c_limit/phonepicutres-TA.jpg",
// };

export default function EditBlogPost() {
  const router = useRouter();
  /* Use this slug to fetch the post from the database */
  const { slug } = router.query;
  const { trigger: editTrigger, isMutating } = useSWRMutation(cacheKey, editPost);

  const { data: { data: post = {} } = {}, error } = useSWR(slug ? `${cacheKey}${slug}` : null, () =>
    getPost({ slug })
  );

  const handleOnSubmit = async ({editorContent, titleInput, image }) => {
    const id = post.id

    const editedPost = {
      id: id, 
      body: editorContent, 
      title: titleInput, 
      image: image}

    const {data, status, error} = await editTrigger(editedPost)

    if (status === 200) {
      router.push(`/blog/${slug}`)
    }
  };

  return (
    <BlogEditor
      heading="Edit blog post"
      title={post.title}
      src={post.image}
      alt={post.title}
      content={post.body}
      buttonText="Save changes"
      onSubmit={handleOnSubmit}
    />
  );
}
