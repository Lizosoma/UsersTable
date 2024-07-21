import React from 'react';

const SortButton = ({ sortKey, sortConfig, onSort }) => {
  const getSortDirection = () => {
    if (sortConfig.key === sortKey) {
      return sortConfig.direction;
    }
    return 'none';
  };

  const handleSort = () => {
    onSort(sortKey);
  };

  return (
    <button onClick={handleSort}>
      {getSortDirection() === 'ascending' ? '▲' : getSortDirection() === 'descending' ? '▼' : '↕'}
    </button>
  );
};

export default SortButton;
