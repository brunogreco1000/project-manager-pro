import { render, screen, fireEvent } from '@testing-library/react';
import InputField from '../../components/InputField.tsx';
import { vi } from 'vitest';

describe('InputField', () => {
  it('renders label and input', () => {
    render(
      <InputField
        label="Email"
        type="email"
        value=""
        setValue={() => {}}
        valid={true}
      />
    );
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('calls setValue on change', () => {
    const setValue = vi.fn();
    render(
      <InputField
        label="Email"
        type="email"
        value=""
        setValue={setValue}
        valid={false}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test@test.com' } });
    expect(setValue).toHaveBeenCalledWith('test@test.com');
  });
});
