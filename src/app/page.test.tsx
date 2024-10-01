import { render, screen } from '@testing-library/react';
import Page from './page';

it('App Router: Works with Server Components', async () => {
  render(<Page />);
  expect(screen.getByRole('button')).toBeInTheDocument();
  screen.getByRole('textbox');
});
