import { useContext, useState } from 'react';
import planetsContext from '../context/PlanetsContext';

export default function Filters() {
  const [filters, setFilters] = useState({
    column: 'population',
    comparision: 'maior que',
    value: '0',
  });
  const [options, setOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  const { apiData, setFilteredNumber, setFiltersList,
    filtersList } = useContext(planetsContext);

  const handleClick = () => {
    const filterOptions = options.filter((option) => option !== filters.column);
    setOptions(filterOptions);
    setFilters({ ...filters, column: filterOptions[0] });
    setFiltersList([...filtersList, filters]);
  };

  const handleRemove = () => {
    setFiltersList([]);
    setFilteredNumber(apiData);
  };

  return (
    <div>
      <select
        name=""
        id="columnFilter"
        data-testid="column-filter"
        onChange={ ({ target }) => setFilters({ ...filters, column: target.value }) }
      >
        {
          options.map((element) => (
            <option key={ element } value={ element }>{element}</option>
          ))
        }
      </select>
      <select
        id="comparisonFilter"
        data-testid="comparison-filter"
        onChange={ ({ target }) => setFilters({ ...filters, comparision: target.value }) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        id="valueFilter"
        data-testid="value-filter"
        value={ filters.value }
        onChange={ ({ target }) => setFilters({ ...filters, value: target.value }) }
      />
      <button
        type="number"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Adicionar
      </button>
      <button
        type="number"
        data-testid="button-remove-filters"
        onClick={ handleRemove }
      >
        remover filtros
      </button>
    </div>
  );
}
