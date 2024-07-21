import React, { useState, useEffect } from 'react';
import SortButton from '../sort-button/sort-button';
import UserModal from '../user-modal';

const UsersTable = ({ users }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    phone: '',
    city: '',
    address: '',
  });
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Загрузка пользователей при монтировании компонента
  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  useEffect(() => {
    const applyFilters = async () => {
      try {
        let filteredData = users;
        for (const key in filters) {
          if (filters[key]) {
            filteredData = await filterUsersByKey(key, filters[key]);
          }
        }
        setFilteredUsers(filteredData);
      } catch (error) {
        console.error('Failed to apply filters:', error);
      }
    };

    applyFilters();
  }, [filters, users]);

  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig.key !== null && sortConfig.direction !== 'none') {
      sortableUsers.sort((a, b) => {
        if (getDescendantProp(a, sortConfig.key) < getDescendantProp(b, sortConfig.key)) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (getDescendantProp(a, sortConfig.key) > getDescendantProp(b, sortConfig.key)) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = 'none';
      } else {
        direction = 'ascending';
      }
    } else {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
  };

  function getDescendantProp(obj, desc) {
    let arr = desc.split('.');
    while (arr.length && (obj = obj[arr.shift()]));
    return obj;
  }

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  return (
    <>
      <table className="table">
        <thead className="thead">
          <tr className="tr-head">
            <th className="th">
              Name
              <SortButton sortKey="firstName" sortConfig={sortConfig} onSort={requestSort} />
            </th>
            <th className="th">
              Age
              <SortButton sortKey="age" sortConfig={sortConfig} onSort={requestSort} />
            </th>
            <th className="th">
              Gender
              <SortButton sortKey="gender" sortConfig={sortConfig} onSort={requestSort} />
            </th>
            <th className="th">Phone number</th>
            <th className="th">
              Address
              <SortButton sortKey="address.city" sortConfig={sortConfig} onSort={requestSort} />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id} className="tr" onClick={() => handleUserClick(user)}>
              <td className="td">
                {user.firstName} {user.lastName}
              </td>
              <td className="td">{user.age}</td>
              <td className="td">{user.gender}</td>
              <td className="td">{user.phone}</td>
              <td className="td">
                {user.address.city}, {user.address.address}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && <UserModal user={selectedUser} onClose={closeModal} />}
    </>
  );
};

export default UsersTable;
