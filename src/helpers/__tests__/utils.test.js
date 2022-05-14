import { convertPositionToPercentage } from '../utils';

describe('test convertPositionToPercentage', () => {
  it('returns given position as percentage with 2 decimals precision', () => {
    const result = convertPositionToPercentage(10, 20, 22.5, 45);
    expect(result).toMatchObject({ percentageX: 44.44, percentageY: 44.44 });
  });
});
