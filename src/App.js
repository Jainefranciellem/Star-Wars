import './App.css';
import Table from './components/Table';
import Header from './components/Header';
import Filters from './components/Filters';
import FiltersList from './components/FiltersList';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Header />
      <Filters />
      <FiltersList />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
