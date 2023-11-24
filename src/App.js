import ProtectedLayout from 'layout/ProtectedLayout';
import './App.css';
import AuthLayout from 'layout/AuthLayout';
import { useAuthContext } from 'context/AuthContext';
import { useEffect } from 'react';
import { getToken } from 'util/token';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ShoppingListForm from 'view/ShoppingListForm';
import ShoppingList from 'view/ShoppingList';
import Analytics from 'view/Analytics';


function App() {
  const { setIsAuthenticated, validateToken } = useAuthContext();

  useEffect(() => {
    if (getToken()) {
      validateToken();
    } else {
      setIsAuthenticated(false);
    }
  }, [setIsAuthenticated,validateToken])

  return (
    <Router>
      <Routes>

        <Route path="/auth" element={<AuthLayout />} />

        <Route path="" element={<ProtectedLayout />}>
          <Route path="list" element={<ShoppingListForm />} />
          <Route path="list/:listId" element={<ShoppingList />} />

          <Route path="stats/:year/:month" element={<Analytics />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
