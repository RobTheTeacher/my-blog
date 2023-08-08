const supabase = require("../lib/supabaseClient")

export async function getPosts() {
  try {
    const { data, status, error } = await supabase.from('posts')
    .select(`*`)
    return {data, status, error};
  } catch(e) 
    {console.log(e)}
};

export async function getPost({slug} ) {
  try {
    const { data, status, error } = await supabase.from('posts')
    .select(`*`)
    .eq('slug', slug)
    .single()
    return {data, status, error};
  } catch(e) 
    {console.log(e)}
};

export async function addPost(_, { arg: newPost}) {
  try {
    const { data, status, error } = await supabase.from('posts')
    .insert({...newPost})
    return {data, status, error};
  } catch(e) 
    {console.log(e)}
};

export const deletePost = async (_, {arg: id} ) => {
  const { data, status, error } = await supabase.from('posts')
    .delete().eq('id', id)

  return {data, status, error}
};

export const editPost = async (_, {arg: editedPost}) => {
  const { data, status, error } = await supabase.from('posts')
    .update({...editedPost})
    .select()
    .single()
    .eq("id", editedPost.id)

  return {data, status, error}
};

