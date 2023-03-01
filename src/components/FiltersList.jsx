import React, { useContext } from 'react';
import planetsContext from '../context/PlanetsContext';

export default function FiltersList() {
  const { filtersList, setFiltersList,
    setFilteredNumber } = useContext(planetsContext);
  const handleClick = (column) => {
    const deleteFilter = filtersList.filter((filter) => filter.column !== column);
    setFiltersList(deleteFilter);
    setFilteredNumber();
  };

  return (
    <div>
      {
        filtersList.map(({ column, comparision, value }) => (
          <div data-testid="filter" key={ column }>
            <p>{`${column} ${comparision} ${value}`}</p>
            <button
              type="button"
              onClick={ () => handleClick(column) }
            >
              excluir
            </button>
          </div>

        ))
      }
    </div>
  );
}
