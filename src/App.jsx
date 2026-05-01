import { useState } from "react";

// Step 3 - Item component renders a single story
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

// Step 2 - List receives stories as props
const List = ({ stories }) => (
  <div>
    {stories.map((story) => (
      <Item key={story.objectID} story={story} />
    ))}
  </div>
);

// Step 5 - Search receives handler as prop
const Search = ({ onSearch }) => {
  console.log("Search renders");

  const handleChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search stories:</label>
      <input type="text" id="search" onChange={handleChange} />
    </div>
  );
};

const Header = () => <h1>Hacker News Stories</h1>;

// Step 1 - App owns the data
const App = () => {
  console.log("App renders");

  // Step 1 - stories moved inside App
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

  // Step 4 - state for search term
  const [searchTerm, setSearchTerm] = useState("");

  // Step 5 - handler to update state
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Step 8 - filter stories based on searchTerm
  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <Search onSearch={handleSearch} />
      <List stories={filteredStories} />
    </div>
  );
};

export default App;

// Step 10 - Reflection:
// 1. Props are read-only data passed from parent to child. State is data owned by a component that can change.
// 2. We lift state up so that multiple components can share and react to the same data.
// 3. Filtering logic should live in App because it owns both the data and the search term.