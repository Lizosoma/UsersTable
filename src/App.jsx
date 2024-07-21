import React, { useEffect, useState } from 'react';
import './app.css';
import { fetchUsers, searchUsers } from './services/users';
import UsersTable from './components/users-table';
import SearchComponent from './components/search-input/search-component';
import LoadingSpinner from './components/loading-spinner';

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
        setFilteredUsers(usersData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleSearch = async (filters) => {
    setLoading(true);
    try {
      const data = await searchUsers(filters);
      setFilteredUsers(data);
    } catch (error) {
      console.error('Failed to search users:', error);
      setError('Failed to search users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {error && <p className="error">{error}</p>}
      {loading && <LoadingSpinner />}
      <SearchComponent onSearch={handleSearch} />
      <UsersTable users={filteredUsers} />
    </div>
  );
};

export default App;
