
const supabase = require("../lib/supabaseClient")

export const commentsCacheKey = "/api/comments";

export const getComments = async (postId) => {

  const { data, status, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)

  console.log('comments')
  return { data, error, status };
};

export const addNewComment = async (_, { arg: newComment }) => {
  const { data, status, error } = await supabase
  .from('comments')
  .insert(newComment)
  .single()
  .eq("post_id", newComment.post_id)

  return { data, status, error }
};

export const removeComment = () => {
  //Handle remove comment here
};
