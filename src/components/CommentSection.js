import React, { useState } from "react";
import styles from "../styles/comments.modules.css";

function CommentSection({ info, comments, popular, newComment, newCommentValue, commentValueChange }) {
  const [openReplies, setOpenReplies] = useState(
    Array.from({ length: comments.length }, () => false)
  );
  const [targetElement, setTargetElement] = useState(null);
  const [isLoading, setIsLoading] = useState(
    Array.from({ length: comments.length }, () => false)
  );

  const handleReplyButtonClick = (event, comment) => {
    event.preventDefault();
    setTargetElement(comment);
  };

  const handleReplies = (index) => {
    setOpenReplies((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });

    // Set loading to true when opening replies
    setIsLoading((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });

    // Simulate loading for a few seconds (you can replace this with actual API calls)
    setTimeout(() => {
      setIsLoading((prevState) => {
        const newState = [...prevState];
        newState[index] = false; // Set loading back to false when done
        return newState;
      });
    }, 2000); // Simulating a 2-second loading delay
  };

  return comments ? (
    <div className="comment-container">
      <h2>Comments</h2>
      {comments.map((comment, key) => (
        <div key={key} className="comment">
          <p>{comment.data.body}</p>
          <p style={{ marginTop: 10, textAlign: "left", fontSize: 12 }}>
            {comment.data.author}
          </p>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => handleReplies(key)}
              style={{
                backgroundColor: "transparent",
                border: "none",
                fontWeight: "bold",
              }}
            >
              Replies
            </button>

            <p style={{ textAlign: "right" }}>
              {comment.data?.replies?.data?.children?.length.toString()}
            </p>

            <button onClick={(e) => handleReplyButtonClick(e, comment)}>
              Reply
            </button>
          </div>
          {openReplies[key] &&
            comment.data.replies &&
            comment.data.replies.data &&
            comment.data.replies.data.children &&
            comment.data.replies.data.children.length > 0 && (
              <div className="comment">
                {comment.data.replies.data.children.map((reply, replyKey) => (
                  <p key={replyKey}>{reply.data.body}</p>
                ))}
              </div>
            )}
          {targetElement === comment && (
            <div className="reply-box">
              <form onSubmit={(e) => newComment(e)}>
                <input onChange={(e) => commentValueChange(e)} type="text" value={newCommentValue} />
                <button type="submit">Submit</button>
              </form>
            </div>
          )}
        </div>
      ))}
    </div>
  ) : (
    "loading..."
  );
}

export default CommentSection;
