import { render, screen } from '@testing-library/react';
import Todo from './Todo';

test('renders todo text', () => {
    const todo = { text: 'Test Todo', done: false };
    render(<Todo todo={todo} onDelete={() => { }} onComplete={() => { }} />);
    const todoText = screen.getByText(/Test Todo/i);
    expect(todoText).toBeInTheDocument();
}
);

