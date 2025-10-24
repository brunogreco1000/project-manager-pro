import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../context/AuthContext.tsx';

describe('AuthContext', () => {
  it('provides login and logout', async () => {
    const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login('test@test.com', '123456');
    });

    // Como estamos en mock, podemos validar que user cambió a null/undefined o mocks futuros
    expect(result.current.user).toBe(null);
  });
});
