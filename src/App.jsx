import { useState, useEffect } from "react";

// Step 1 - API endpoint
const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

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
  const [stories, setStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("search") || "React"
  );

  // Step 13 - url state for explicit fetching
  const [url, setUrl] = useState(
    `${API_ENDPOINT}${localStorage.getItem("search") || "React"}`
  );

  // Step 7 - loading state
  const [isLoading, setIsLoading] = useState(false);

  // Step 9 - error state
  const [isError, setIsError] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    localStorage.setItem("search", event.target.value);
  };

  // Step 14 - update url on submit
  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  // Step 2,3,4 - fetch data from API
  useEffect(() => {
    if (!searchTerm) return;

    setIsLoading(true);
    setIsError(false);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setStories(data.hits);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [url]); // Step 15 - url as dependency

  const handleRemoveItem = (item) => {
    const newStories = stories.filter(
      (story) => story.objectID !== item.objectID
    );
    setStories(newStories);
  };

  return (
    <div>
      <Header />
      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      {/* Step 12 - submit button disabled when empty */}
      <button
        onClick={handleSearchSubmit}
        disabled={!searchTerm}
      >
        Submit
      </button>

      {/* Step 10 - error message */}
      {isError && <p>Something went wrong. Please try again.</p>}

      {/* Step 8 - loading message */}
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List stories={stories} onRemoveItem={handleRemoveItem} />
      )}
    </div>
  );
};

export default App;

// Step 17 - Reflection:
// 1. We use useEffect for fetching because it runs after render and keeps side effects separate
// 2. Loading state means data is on the way. Error state means something went wrong.
// 3. We control fetching to avoid unnecessary API calls on every keystroke