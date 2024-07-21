const API_URL = 'https://dummyjson.com';

const fetchFilteredUsers = async (key, value) => {
  const response = await fetch(
    `${API_URL}/users/filter?key=${key}&value=${encodeURIComponent(value)}`,
  );
  console.log(response);
  if (!response.ok) {
    throw new Error(`Failed to fetch filtered users by ${key}`);
  }
  const data = await response.json();
  return data.users;
};

export const fetchUsers = async () => {
  let allUsers = [];
  let totalUsers = 0;
  let limit = 100;
  let skip = 0;

  try {
    do {
      const response = await fetch(`${API_URL}/users?limit=${limit}&skip=${skip}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      allUsers = [...allUsers, ...data.users];
      totalUsers = data.total;
      skip += limit;
    } while (allUsers.length < totalUsers);
    return allUsers;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const searchUsers = async (filters) => {
  if (!filters || Object.keys(filters).length === 0) return fetchUsers();

  try {
    const filterKeys = Object.keys(filters);
    const promises = filterKeys.map((key) => fetchFilteredUsers(key, filters[key]));

    const results = await Promise.allSettled(promises);

    const filteredUsers = results
      .filter((result) => result.status === 'fulfilled')
      .flatMap((result) => result.value);

    const uniqueUsers = Array.from(new Set(filteredUsers.map((user) => user.id))).map((id) =>
      filteredUsers.find((user) => user.id === id),
    );

    return uniqueUsers;
  } catch (error) {
    console.error('Failed to search users:', error);
    throw error;
  }
};
