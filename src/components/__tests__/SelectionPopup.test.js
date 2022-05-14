import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import SelectionPopup from '../SelectionPopup';
import * as utils from '../../helpers/utils';

test('should render correct styles', () => {
  const x = 10;
  const y = 25;
  render(
    <SelectionPopup
      x={x}
      y={y}
      availableSelections={[]}
      currentSelection={''}
      setCurrentSelection={() => {}}
      submitSelection={() => {}}
    />
  );

  expect(screen.getByTestId('selection--popup--div')).toHaveStyle({
    top: `${y}px`,
    left: `${x}px`,
  });
});

test('should render an empty option', () => {
  render(
    <SelectionPopup
      x={1}
      y={1}
      availableSelections={[]}
      currentSelection={''}
      setCurrentSelection={() => {}}
      submitSelection={() => {}}
    />
  );

  expect(screen.getByRole('option', { name: '' })).toBeVisible();
});

test('should render options from provided list', () => {
  render(
    <SelectionPopup
      x={1}
      y={1}
      availableSelections={[
        { name: 'op1', id: 'op1' },
        { name: 'op2', id: 'op2' },
      ]}
      currentSelection={''}
      setCurrentSelection={() => {}}
      submitSelection={() => {}}
    />
  );

  expect(screen.getByRole('option', { name: 'op1' })).toBeVisible();
  expect(screen.getByRole('option', { name: 'op2' })).toBeVisible();
});

test('should call setCurrentSelection after selecting an option', () => {
  const setCurrentSelection = jest.fn();
  const option1 = { name: 'op1', id: 'op1id' };
  render(
    <SelectionPopup
      x={1}
      y={1}
      availableSelections={[option1]}
      currentSelection={''}
      setCurrentSelection={setCurrentSelection}
      submitSelection={() => {}}
    />
  );

  expect(setCurrentSelection).toHaveBeenCalledTimes(0);
  userEvent.selectOptions(screen.getByRole('combobox'), ['op1']);
  expect(setCurrentSelection).toHaveBeenCalledTimes(1);
  expect(setCurrentSelection).toHaveBeenCalledWith('op1id');
});

test('should call submitSelection after clicking submit button', () => {
  const submitSelection = jest.fn();
  const option1 = { name: 'op1', id: 'op1id' };
  render(
    <SelectionPopup
      x={1}
      y={1}
      availableSelections={[option1]}
      currentSelection={''}
      setCurrentSelection={() => {}}
      submitSelection={submitSelection}
    />
  );

  expect(submitSelection).toHaveBeenCalledTimes(0);
  userEvent.click(screen.getByRole('button', { name: /submit/i }));
  expect(submitSelection).toHaveBeenCalledTimes(1);
});

test('should select option based on currentSelection value', () => {
  const option1 = { name: 'op1', id: 'op1id' };
  const option2 = { name: 'op2', id: 'op2id' };
  const currentSelection = 'op1id';
  render(
    <SelectionPopup
      x={1}
      y={1}
      availableSelections={[option1, option2]}
      currentSelection={currentSelection}
      setCurrentSelection={() => {}}
      submitSelection={() => {}}
    />
  );

  expect(screen.getByRole('option', { name: 'op1' }).selected).toBe(true);
  expect(screen.getByRole('option', { name: 'op2' }).selected).toBe(false);
});

test('should call getAvailableOptions with provided options', async () => {
  const availableSelections = [
    { name: 'op1', id: 'op1id' },
    { name: 'op2', id: 'op2id' },
  ];

  const spyGetAvailableOptions = jest.spyOn(utils, 'getAvailableOptions');
  render(
    <SelectionPopup
      x={1}
      y={1}
      availableSelections={availableSelections}
      currentSelection={''}
      setCurrentSelection={() => {}}
      submitSelection={() => {}}
    />
  );

  await waitFor(() => expect(spyGetAvailableOptions).toHaveBeenCalled());
  expect(spyGetAvailableOptions).toHaveBeenCalledWith(availableSelections);
});
