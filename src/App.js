import ProtectedLayout from 'layout/ProtectedLayout';
import './App.css';
import AuthLayout from 'layout/AuthLayout';
import { useAuthContext } from 'context/AuthContext';
import { useEffect } from 'react';
import { getToken } from 'util/token';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ShoppingListForm from 'components/shoppingListForm/ShoppingListForm';
import ShoppingList from 'components/shoppingList/ShoppingList';


function App() {
  const { setIsAuthenticated, validateToken } = useAuthContext();

  useEffect(() => {
    if (getToken()) {
      validateToken();
    } else {
      setIsAuthenticated(false);
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="" element={<AuthLayout />} />
        <Route path="/list" element={<ProtectedLayout><ShoppingListForm /></ProtectedLayout>} />
        <Route path="/list/:listId" element={<ProtectedLayout><ShoppingList /></ProtectedLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
