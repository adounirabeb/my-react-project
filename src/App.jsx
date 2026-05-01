import { useState, useEffect } from "react";

// Part 1 - Step 1,2,3 - Reusable InputWithLabel using children
const InputWithLabel = ({ id, value, onInputChange, type = "text", children }) => (
  <div>
    <label htmlFor={id}>{children}</label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onInputChange}
    />
  </div>
);

const Item = ({ story, onRemoveItem }) => (
  <div>
    <h3>
      <a href={story.url} target="_blank" rel="noreferrer">
        {story.title}
      </a>
    </h3>
    <p>Author: {story.author}</p>
    <p>Points: {story.points}</p>
    <p>Comments: {story.num_comments}</p>
    <button onClick={() => onRemoveItem(story)}>Delete</button>
    <hr />
  </div>
);

const List = ({ stories, onRemoveItem }) => (
  <div>
    {stories.map((story) => (
      <Item key={story.objectID} story={story} onRemoveItem={onRemoveItem} />
    ))}
  </div>
);

const Header = () => <h1>Hacker News Stories</h1>;

const App = () => {
  // Step 6 - renamed to initialStories
  const initialStories = [
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

  // Step 7 - stories as state
  const [stories, setStories] = useState(initialStories);

  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("search") || ""
  );

  useEffect(() => {
    localStorage.setItem("search", searchTerm);
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Step 8 - remove handler
  const handleRemoveItem = (item) => {
    const newStories = stories.filter(
      (story) => story.objectID !== item.objectID
    );
    setStories(newStories);
  };

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      {/* Step 4 - using composition with children */}
      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>
      <List stories={filteredStories} onRemoveItem={handleRemoveItem} />
    </div>
  );
};

export default App;

// Step 13 - Reflection:
// 1. A component is reusable when it accepts dynamic props instead of hard-coded values
// 2. Component composition is when a component renders content passed between its tags via children
// 3. We pass handlers down the tree because the parent owns the state and only it can update it