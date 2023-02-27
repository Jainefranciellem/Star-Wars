import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Header() {
  const { setSearch } = useContext(PlanetsContext);
  return (
    <div>
      <input
        type="text"
        id="filterInput"
        placeholder="Pesquisar"
        data-testid="name-filter"
        onChange={ ({ target }) => setSearch(target.value) }
      />
    </div>
  );
}
