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

// Step 1 - Arrow function components
const Header = () => <h1>Hacker News Stories</h1>;

// Step 4 - Search uses block body because it has logic inside
const Search = () => {
  // Step 5 - Event handler using arrow function
  const handleChange = (event) => {
    console.log(event);
    console.log(event.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search stories:</label>
      <input type="text" id="search" onChange={handleChange} />
    </div>
  );
};

// Step 2 & 3 - List uses arrow function with concise body in map()
const List = () => (
  <div>
    {stories.map((story) => (
      <div key={story.objectID}>
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
    ))}
  </div>
);

const App = () => (
  <div>
    <Header />
    <Search />
    <List />
  </div>
);

export default App;

// Step 8 - Reflection:
// 1. Concise body arrow functions are used when the function only returns a single expression
// 2. Block body arrow functions are used when we need to add logic like variables or handlers
// 3. The event object contains information about the user interaction including event.target.value