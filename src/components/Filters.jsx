import { useContext, useState } from 'react';
import planetsContext from '../context/PlanetsContext';

export default function Filters() {
  const [options, setOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [sorterd, setSorterd] = useState({
    order: { column: 'population', sort: 'ASC' },
  });

  const { apiData, setFilteredNumber, setFiltersList,
    filtersList, filters, setFilters } = useContext(planetsContext);

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
        Filtrar
      </button>
      <select
        id="ordenar"
        data-testid="column-sort"
        value={ sorterd.order.column }
        onChange={ ({ target }) => setSorterd({ order: { column: target.value } }) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      ASC
      <input
        type="radio"
        id="ASC"
        value="ASC"
        name="order"
        data-testid="column-sort-input-asc"
        onChange={ ({ target }) => {
          setSorterd(
            { order: { column: sorterd.order.column, sort: target.value } },
          );
        } }
      />
      DESC
      <input
        type="radio"
        id="DESC"
        value="DESC"
        name="order"
        data-testid="column-sort-input-desc"
        onChange={ ({ target }) => {
          setSorterd(
            { order: { column: sorterd.order.column, sort: target.value } },
          );
        } }
      />
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => setFilters({ ...filters, ...sorterd }) }
      >
        Ordenar
      </button>
      <button
        type="number"
        data-testid="button-remove-filters"
        onClick={ handleRemove }
      >
        Remover filtros
      </button>
    </div>
  );
}
