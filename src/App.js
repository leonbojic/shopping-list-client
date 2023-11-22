import ProtectedLayout from 'layout/ProtectedLayout';
import './App.css';
import AuthLayout from 'layout/AuthLayout';


function App() {
  return (
    <div className="App">
      <ProtectedLayout/>
    </div>
  );
}

export default App;
