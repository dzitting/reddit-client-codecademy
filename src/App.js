import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  fetchPopularData,
  createComment,
} from "./features/data/dataSlice";
import { setSelected } from "./features/selected/selectedSlice";
import { setSelectedId } from "./features/selectedId/selectedIdSlice";
import { selectedComments, addComment } from "./features/comments/commentsSlice";
import { setQueryValue } from "./features/queryValue/queryValueSlice";
import { fetchComments } from "./data/fetchComments";
import { handleSearch } from "./data/handleSearch";
import SearchPage from "./components/SearchPage";
import Item from "./components/Item";
import { store } from "./store/store";

function App() {
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const popular = useSelector((state) => state.data); // Get the 'popular' data from Redux store
  const selected = useSelector((state) => state.selected); // Get the 'selected' from Redux store
  const selectedId = useSelector((state) => state.selectedId); //Get selected id from store
  const comments = useSelector((state) => state.comments);
  const { userComment } = useSelector((state) => state.comments);
  const queryValueSlice = useSelector((state) => state.queryValue);

  useEffect(() => {
    dispatch(fetchPopularData());
    // Dispatch the action to fetch popular data when the component mounts
  },[]);

  const handleQueryChange = (e) => {
    e.preventDefault();
    dispatch(setQueryValue(e.target.value));
  }
  const handleQuerySubmit = (e) => {
    e.preventDefault();
    handleSearch(queryValueSlice.queryValue);
  }

  const handleSelectionChange = async (id) => {
    const selection = Object.values(popular.popular).find((topic) => topic.data.id === id);
    dispatch(setSelectedId(selection.data.id));
    dispatch(setSelected(selection));
    await fetchInfo(selection.data.id, selection.data.subreddit);
    // setSelectedInfo(Object.keys(popular).find((topic) => topic.data.id === id));
  };
  
  const fetchInfo = async (id, subred) => {
    const comments = await fetchComments(id, subred);
    dispatch(selectedComments(comments)); // Dispatch the setSelected action
  };

  const commentValueChange = (e) => {
    e.preventDefault();
    dispatch(addComment(e.target.value));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new comment object to simulate the added comment
    const newComment = {
      data: {
        body: userComment, // Use the input text as the comment body
        author: "YourUsername", // You can set the author's name
        id: "unique-comment-id", // Generate a unique comment ID
        replies: { data: { children: [] } }, // Initialize empty replies
      },
    };
    
    // Update the 'popular' state with the new comment
    dispatch(createComment(newComment)); // Dispatch the createComment action
    alert(userComment);
  
    // Clear the input field
    dispatch(addComment(""));
  };

  return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <SearchPage
                popular={popular.popular}
                handleSelectionChange={handleSelectionChange}
                queryValue={queryValueSlice.queryValue}
                handleQueryChange={handleQueryChange}
                submit={handleQuerySubmit}
              />
            }
          />
          <Route
            path="r/:subreddit/:title"
            element={
              <Item
                selected={selected.selected}
                selectedId={selectedId}
                fetchInfo={fetchInfo}
                popular={popular.popular}
                comments={comments.comments}
                handleSelectionChange={handleSelectionChange}
                userComment={userComment}
                handleSubmit={handleSubmit}
                commentValueChange={commentValueChange}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
