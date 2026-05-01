import { useState, useEffect } from "react";

const Item = ({ story }) => (
  <div>
    <h3>
      <a href={story.url} target="_blank" rel="noreferrer">
        {story.title}
      </a>
    </h3>
    <p>Author: {story.author}</p>
    <p>Points: {story.points}</p>
    <p>Comments: {story.num_comments}</p>
    <hr />
  </div>
);

const List = ({ stories }) => (
  <div>
    {stories.map((story) => (
      <Item key={story.objectID} story={story} />
    ))}
  </div>
);

// Step 1 & 2 - Controlled component with destructuring
const Search = ({ searchTerm, onSearch }) => (
  <div>
    <label htmlFor="search">Search stories:</label>
    <input
      type="text"
      id="search"
      value={searchTerm}
      onChange={(event) => onSearch(event.target.value)}
    />
  </div>
);

const Header = () => <h1>Hacker News Stories</h1>;

const App = () => {
  const stories = [
    {
      objectID: 1,
      title: "React is the future of web development",
      url: "https://reactjs.org",
      author: "Dan Abramov",
      points: 500,
      num_comments: 32
    },
    {
      objectID: 2,
      title: "Vite makes React development faster",
      url: "https://vitejs.dev",
      author: "Evan You",
      points: 178,
      num_comments: 21
    },
    {
      objectID: 3,
      title: "JavaScript is everywhere in 2026",
      url: "https://javascript.info",
      author: "Ilya Kantor",
      points: 310,
      num_comments: 45
    },
    {
      objectID: 4,
      title: "GitHub Copilot changes how developers work",
      url: "https://github.com/features/copilot",
      author: "Nat Friedman",
      points: 420,
      num_comments: 58
    }
  ];

  // Step 4 - Initialize state from localStorage with fallback
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("search") || ""
  );

  // Step 5 - useEffect to persist searchTerm in localStorage
  useEffect(() => {
    localStorage.setItem("search", searchTerm);
  }, [searchTerm]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <Search searchTerm={searchTerm} onSearch={handleSearch} />
      <List stories={filteredStories} />
    </div>
  );
};

export default App;

// Step 7 - Reflection:
// 1. A controlled component is an input whose value is controlled by React state
// 2. A side effect is anything that affects something outside the component like localStorage or API calls
// 3. We use useEffect so side effects run at the right time and not during rendering