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

function Header() {
  return <h1>Hacker News Stories</h1>;
}

function Search() {
  return (
    <div>
      <label htmlFor="search">Search stories:</label>
      <input type="text" id="search" />
    </div>
  );
}

function List() {
  return (
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
}

function App() {
  return (
    <div>
      <Header />
      <Search />
      <List />
    </div>
  );
}

export default App;