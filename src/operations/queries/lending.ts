import { gql } from '@apollo/client';

const GET_LENDINGS = gql`
  query GetLandings($first: Int!, $skip: Int!) {
    lendings(first: $first, skip: $skip) {
      nftAddress
      tokenId
      nftPrice
      paymentToken
      dailyRentPrice
      renting {
        rentedAt
        rentDuration
      }
    }
  }
`;

export default GET_LENDINGS;
