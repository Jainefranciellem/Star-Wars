import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [apiData, setApiData] = useState([]);

  const clearResults = (results) => {
    const newResults = results.map((result) => {
      const newResult = { ...result };
      delete newResult.residents;
      return newResult;
    });
    return newResults;
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets');
        if (!response.ok) {
          const data = await response.json();
          throw data.message;
        }
        const data = await response.json();
        const { results } = data;
        setApiData(clearResults(results));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAPI();
  }, []);

  const value = useMemo(() => ({
    apiData,
    setApiData,
  }), [apiData]);

  return (
    <PlanetsContext.Provider value={ value }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
