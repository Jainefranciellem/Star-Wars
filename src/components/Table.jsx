import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Table() {
  const { search, loading, filtersList,
    apiData, filters } = useContext(PlanetsContext);
  let arrayfiltered = apiData;

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

  const magicNumber = -1;
  arrayfiltered.sort((a, b) => {
    if (b[filters.order.column] === 'unknown') {
      return magicNumber;
    }
    if (filters.order.sort === 'ASC') {
      return Number(a[filters.order.column]) - Number(b[filters.order.column]);
    }
    if (filters.order.sort === 'DESC') {
      return Number(b[filters.order.column]) - Number(a[filters.order.column]);
    }
    return 0;
  });

  filtersList.forEach((filter) => {
    arrayfiltered = filterByNumber(arrayfiltered, filter);
  });

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { loading && <tr><td>...loading</td></tr> }
          {arrayfiltered
            .filter((searchPlanet) => searchPlanet.name.includes(search.toLowerCase()))
            .map((planet) => (
              <tr
                key={ planet.name }
              >
                <td data-testid="planet-name">
                  { planet.name }
                </td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.population }</td>
                <td>
                  {planet.films.map((url, index) => (
                    <span key={ index }>
                      <a href={ url }>{ url }</a>
                    </span>
                  ))}
                </td>
                <td>{ planet.created }</td>
                <td>{ planet.edited }</td>
                <td>
                  <a href={ planet.url }>{ planet.url }</a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}
