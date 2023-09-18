import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { popularContents } from './data/popularContents';
import SearchPage from "./components/SearchPage";
import Item from "./components/Item";

function App() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const getTopics = async () => {
      const topics = await popularContents();
      setPopular(topics);
    }
    getTopics();
  },[]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage popular={popular} />} />
        <Route path=":subreddit" element={<Item popular={popular} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
