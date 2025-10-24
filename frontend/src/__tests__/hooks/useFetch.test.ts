import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { useFetch } from '../../hooks/useFetch.tsx';
import { vi } from 'vitest';
import { api } from '../../services/api.ts';

vi.mock('../../services/api.ts');

describe('useFetch', () => {
  it('fetches data successfully', async () => {
    const mockData = [{ id: 1, name: 'Proyecto Test', progress: 50 }];
    (api.get as any).mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => useFetch('/projects'));

    // Espera hasta que result.current.loading sea false
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });
});
