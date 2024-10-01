import { render, screen, waitFor } from '@testing-library/react';
import { MessageItem } from './MessageItem';

it('should render the MessageItem component', async () => {
  render(
    <MessageItem
      message={{ role: 'user', content: 'what year where the beatles formed' }}
    />,
  );
  expect(screen.getByText('Your input:')).toBeInTheDocument();
});

it('should fully render the users question', async () => {
  render(
    <MessageItem
      message={{ role: 'user', content: 'what year where the beatles formed' }}
    />,
  );
  await waitFor(
    () => {
      expect(
        screen.getByText('what year where the beatles formed'),
      ).toBeInTheDocument();
    },
    { timeout: 500 },
  );
});
