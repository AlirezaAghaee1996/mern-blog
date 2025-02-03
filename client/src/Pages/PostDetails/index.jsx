import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fetchData from "../../Utils/fetchData"; // Assuming fetchData is a utility for API calls
import { AuthContext } from "../../Utils/AuthContext";
import notify from "../../Utils/notify";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading,setLoading]=useState(false)
  const {token}=useContext(AuthContext)
  // Fetch post details
  useEffect(() => {
    (async () => {
      const res = await fetchData(`posts/${id}?populate=categoryId`);
      const resCn = await fetchData(`comments/post-comments/${id}`);
      setComments(resCn.data);
      setPost(res.data);
    })();
  }, [id]);



  // Handle submitting a new comment
  const handleSubmitComment = async (e) => {
    setLoading(true)
    e.preventDefault();
    if (!newComment.trim()) return;

    const res = await fetchData("comments", {
      method: "POST",
      headers:{
        'authorization':`brear ${token}`,
        'content-type':'application/json'
      },
      body: JSON.stringify({
        postId: id,
        content: newComment,
      }),
    });


    if (res.success) {
      notify(res.message,'success')
      setNewComment("");
    }
    setLoading(false)
  };

  if (!post) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-500 hover:text-blue-700"
      >
        &larr; Back
      </button>

      {/* Post Details */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {post.images.length > 0 && (
          <img
            src={import.meta.env.VITE_BASE_FILE+post.images[0]}
            alt={post.title}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600 mb-4">{post.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Category: {post.categoryId?.name || "Uncategorized"}
            </span>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>

        {/* Display Comments */}
        {comments?.length > 0 ? (
          comments?.map((comment) => (
            <div
              key={comment._id}
              className="bg-gray-50 p-4 rounded-lg mb-4 shadow-sm"
            >
              <p className="text-gray-700">{comment.content}</p>
              <span className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}

        {/* Add Comment Form */}
        <form onSubmit={handleSubmitComment} className="mt-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
          <button
            type="submit"
            disabled={!token || loading}
            className="mt-4 px-6 disabled:opacity-20 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {token?'Submit Comment':loading?'loading .... ':'Login first'}
          </button>
        </form>
      </div>
    </div>
  );
}