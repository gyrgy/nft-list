import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import GET_LENDINGS from 'operations/queries/lending';
import ThemeProvider from 'providers/theme/ThemeProvider';
import DataContext from 'providers/data/DataProvider';
import App from './App';

const mocks = {
  request: {
    query: GET_LENDINGS,
  },
  result: {
    data: {
      lendings: [
        {
          id: '1',
          nftAddress: '0xc3f733ca98e0dad0386979eb96fb1722a1a05e69',
          tokenId: '20581',
          nftPrice: '0x000005dc',
          paymentToken: '1',
          dailyRentPrice: '0x000005dc',
          renting: null,
        },
      ],
    },
  },
};

test('renders App', async () => {
  render(
    <MockedProvider mocks={[mocks]} addTypename={false}>
      <ThemeProvider>
        <DataContext>
          <App />
        </DataContext>
      </ThemeProvider>
    </MockedProvider>,
  );

  expect(await screen.findByText('NFT List')).toBeInTheDocument();
});
