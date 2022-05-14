import { convertPositionToPercentage, getSelection } from '../utils';

describe('test convertPositionToPercentage', () => {
  const result = convertPositionToPercentage(10, 20, 22.5, 45);

  it('returns correct number of positions', () => {
    expect(Object.keys(result).length).toBe(2);
  });
  it('returns given position as percentage with 2 decimals precision', () => {
    expect(result).toMatchObject({ percentageX: 44.44, percentageY: 44.44 });
  });
});

describe('test getSelection', () => {
  it('should return undefined if selection does not exist', () => {
    const result = getSelection([{ id: 0 }, { id: 1 }], 2);

    expect(result).toBeUndefined();
  });

  it('should return correct selection if exists', () => {
    const correctSelection = { id: 1 };
    const result = getSelection([{ id: 0 }, correctSelection], correctSelection.id);

    expect(result).toMatchObject(correctSelection);
  });
});
