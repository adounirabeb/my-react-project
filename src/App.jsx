const courseTitle = "React Development";

function App() {
  const studentName = "Rabeb Adouni";

  const student = {
    name: "Rabeb Adouni",
    age: 20,
    track: "Web Development"
  };

  function sayHello() {
    return "Hello " + studentName + ", welcome to the course!";
  }

  return (
    <div>
      <h1>Welcome to My React App</h1>
      <p>{studentName}</p>
      <p>{courseTitle}</p>
      <p>Welcome to {courseTitle}, {studentName}!</p>
      <label htmlFor="name">Enter your name:</label>
      <input type="text" id="name" />
      <p>Name: {student.name}</p>
      <p>Age: {student.age}</p>
      <p>Track: {student.track}</p>
      <p>{sayHello()}</p>
    </div>
  );
}

export default App;

// 1. One thing I understand well: How to display variables and functions in JSX using {}
// 2. One thing that is still confusing: The difference between variables inside and outside components
// 3. One mistake I made and fixed: I tried to render an object directly in JSX which caused an error