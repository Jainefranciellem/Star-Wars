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

  const { apiData, setApiData } = useContext(planetsContext);

  const filterByNumber = (planetsFilter, filter) => {
    const { column, comparision, value } = filter;
    if (comparision === 'maior que') {
      return planetsFilter.filter((planet) => Number(planet[column]) > Number(value));
    }
    if (comparision === 'menor que') {
      return planetsFilter.filter((planet) => Number(planet[column]) < Number(value));
    }
    return planetsFilter.filter((planet) => Number(planet[column]) === Number(value));
  };

  const handleClick = (filter) => {
    setApiData(filterByNumber(apiData, filter));
    const filterOptions = options.filter((option) => option !== filter.column);
    setOptions(filterOptions);
    setFilters({ ...filters, column: filterOptions[0] });
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
        onClick={ () => handleClick(filters) }
      >
        Adicionar
      </button>
    </div>
  );
}
