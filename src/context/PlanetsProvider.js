import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import PlanetsContext from './PlanetsContext';
import fetchAPI from '../services/requestApi';

function PlanetsProvider({ children }) {
  const [apiData, setApiData] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredNumber, setFilteredNumber] = useState([]);

  const clearResults = (results) => {
    const newResults = results.map((result) => {
      const newResult = { ...result };
      delete newResult.residents;
      return newResult;
    });
    return newResults;
  };

  useEffect(() => {
    fetchAPI('https://swapi.dev/api/planets/')
      .then((data) => {
        const results = data;
        setApiData(clearResults(results));
        setLoading(false);
        setFilteredNumber(clearResults(results));
      });
  }, []);

  const value = useMemo(() => ({
    apiData,
    setApiData,
    search,
    setSearch,
    loading,
    filteredNumber,
    setFilteredNumber,
  }), [apiData, search, loading, filteredNumber]);

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
