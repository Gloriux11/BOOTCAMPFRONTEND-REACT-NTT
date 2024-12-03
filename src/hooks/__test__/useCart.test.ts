import { renderHook } from '@testing-library/react';
import { useCart } from '../useCart';
import { useContext } from 'react';
import { calculateTotal } from '../../utils/cartUtils';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

jest.mock('../../utils/cartUtils', () => ({
  calculateTotal: jest.fn(),
}));

describe('useCart', () => {
  const mockDispatch = jest.fn();
  const mockContext = {
    state: { items: [{ id: 1, name: 'item1', price: 100 }] },
    dispatch: mockDispatch,
  };

  beforeEach(() => {
    (useContext as jest.Mock).mockReturnValue(mockContext);
    (calculateTotal as jest.Mock).mockReturnValue(100);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return items, totalPrice, and dispatch from context', () => {
    const { result } = renderHook(() => useCart());

    expect(result.current.items).toEqual(mockContext.state.items);
    expect(result.current.totalPrice).toBe(100);
    expect(result.current.dispatch).toBe(mockDispatch);
  });

  it('should throw an error if used outside of a CartProvider', () => {
    (useContext as jest.Mock).mockReturnValue(undefined);

    const { result } = renderHook(() => useCart());

    expect(result.error).toEqual(new Error('useCart must be used within a CartProvider'));
  });
});