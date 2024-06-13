import './App.css';
import TaskList from './components/TaskList';

function App() {
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWM1ZTU2NDNiMDE2ZWI1Mzc3ODI0MCIsImlhdCI6MTcxODI3NjQwNCwiZXhwIjoxNzE4NzA4NDA0fQ.fCyizDvrf3aDpQyxpjXCgVByklX4LmpdIi3QFMi_5tU"
  return (
    <div className="App">
      <h1>Dashboard</h1>
     <TaskList token = {token}/>
    </div>
  );
}

export default App;
