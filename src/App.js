import './App.css';
import Table from './components/Table';
import Header from './components/Header';
import Filters from './components/Filters';
import FiltersList from './components/FiltersList';

function App() {
  return (
    <>
      <Header />
      <Filters />
      <FiltersList />
      <Table />
    </>
  );
}

export default App;
