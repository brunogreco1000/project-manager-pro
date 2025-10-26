import { render, screen } from '@testing-library/react';
import TaskCard from '../../components/TaskCard';

describe('TaskCard', () => {
  it('renders title, project, and progress', () => {
    render(<TaskCard title="Tarea 1" project="Proyecto A" progress={75} />);

    // Verifica que el título se muestre
    expect(screen.getByText('Tarea 1')).toBeInTheDocument();

    // Verifica que el nombre del proyecto se muestre
    expect(screen.getByText(/Proyecto: Proyecto A/i)).toBeInTheDocument();

    // Verifica que el progreso se muestre correctamente
    expect(screen.getByText('75%')).toBeInTheDocument();
  });
});
