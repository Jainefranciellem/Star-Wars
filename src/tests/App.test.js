import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockData from './helpers/mockData';
import userEvent from '@testing-library/user-event';

describe('Garantindo a cobertura de testes de 90% da aplicação ', () => {

  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => mockData,
    }));
    render(<App />);
    screen.getByText(/Loading/i);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      screen.findByText(/home/i);
      screen.getByTestId('name-filter');
    });
  });

    it('Testa se todos os filtros são renderizados', async () => {
      const name = screen.getByTestId('name-filter');
      const column = screen.getByTestId('column-filter');
      const comparison = screen.getByTestId('comparison-filter');
      const value = screen.getByTestId('value-filter');

      expect(name).toHaveTextContent('');
      expect(column).toHaveTextContent('population');
      column.childNodes.forEach((option) => {
        expect(option).toHaveTextContent(/population|orbital_period|diameter|rotation_period|surface_water/i);
      });
      expect(comparison).toHaveTextContent('maior que');
      comparison.childNodes.forEach((option) => {
        expect(option).toHaveTextContent(/maior que|menor que|igual a/i);
      });
      expect(value).toHaveValue(0);
    });

    it('Testa se a tabela é renderizada corretamente', async () => {
      screen.getByRole('table');
      screen.getByRole('columnheader', {name: /name/i});
      screen.getByRole('columnheader', {name: /population/i});
      screen.getByRole('columnheader', {name: /orbital period/i });
      screen.getByRole('columnheader', {name: /diameter/i});
      screen.getByRole('columnheader', {name: /gravity/i});
      screen.getByRole('columnheader', {name: /terrain/i});
      screen.getByRole('columnheader', {name: /rotation period/i});
      screen.getByRole('columnheader', {name: /surface water/i});
      screen.getByRole('columnheader', {name: /climate/i});
      screen.getByRole('columnheader', {name: /films/i});
      screen.getByRole('columnheader', {name: /created/i});
      screen.getByRole('columnheader', {name: /edited/i});
      screen.getByRole('columnheader', {name: /url/i});
    });

    it('Testa o filtro de ordernar', () => {
      const columnSort = screen.getByTestId('column-sort');
      const button = screen.getByTestId('column-sort-button');
      const ascSort = screen.getByTestId('column-sort-input-asc');
      const descSort = screen.getByTestId('column-sort-input-desc');

      userEvent.selectOptions(columnSort, 'orbital_period');
      userEvent.click(ascSort);
      userEvent.click(button);

      const results = screen.getAllByTestId('planet-name');
      expect(columnSort).toHaveTextContent('population');
      expect(button).toHaveTextContent(/ordenar/i);
      expect(results).toHaveLength(10);

      userEvent.click(descSort);
      userEvent.click(button);
      const results2 = screen.getAllByTestId('planet-name');
      expect(results2[0]).toHaveTextContent(/bespin/i);
      expect(results2[1]).toHaveTextContent(/yavin/i);

      userEvent.selectOptions(columnSort, 'diameter');
      userEvent.click(ascSort);
      userEvent.click(button);
    });

    it('testa se os filtros são removidos corretamente', () => {
      const name = screen.getByTestId('name-filter');
      const column = screen.getByTestId('column-filter');
      const comparison = screen.getByTestId('comparison-filter');
      const value = screen.getByTestId('value-filter');

      userEvent.clear(name);

      userEvent.selectOptions(column, 'orbital_period');
      userEvent.selectOptions(comparison, 'menor que');
      userEvent.clear(value);
      userEvent.type(value, '10000');
      const button = screen.getByTestId('button-filter');
      userEvent.click(button);
      expect(screen.getAllByTestId('planet-name')).toHaveLength(10);

      userEvent.selectOptions(column, 'population');
      userEvent.selectOptions(comparison, 'maior que');
      userEvent.clear(value);
      userEvent.type(value, '1000000000');
      userEvent.click(button);
      expect(screen.getAllByTestId('planet-name')).toHaveLength(3);

      const removeFilter = screen.getAllByRole('button', { name: /x/i });
      expect(removeFilter).toHaveLength(2);
      userEvent.click(removeFilter[0]);
      expect(screen.getAllByTestId('planet-name')).toHaveLength(3);
      const removeFilters = screen.getByTestId('button-remove-filters');
      userEvent.click(removeFilters);
      expect(screen.getAllByTestId('planet-name')).toHaveLength(10);

      userEvent.selectOptions(column, 'surface_water');
      userEvent.selectOptions(comparison, 'igual a');
      userEvent.clear(value);
      userEvent.type(value, '0');
      userEvent.click(button);
    });
  });
