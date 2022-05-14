import { convertPositionToPercentage } from '../utils';

describe('test convertPositionToPercentage', () => {
  const result = convertPositionToPercentage(10, 20, 22.5, 45);

  it('returns correct number of positions', () => {
    expect(Object.keys(result).length).toBe(2);
  });
  it('returns given position as percentage with 2 decimals precision', () => {
    expect(result).toMatchObject({ percentageX: 44.44, percentageY: 44.44 });
  });
});
