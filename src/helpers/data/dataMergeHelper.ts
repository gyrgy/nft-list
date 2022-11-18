import { Nft } from 'alchemy-sdk';
import { LendingData, NftItemData } from 'types/dataProviderTypes';
import { PaymentToken } from 'types/paymentTokenType';
import formatNumber from 'helpers/data/formatNumber';

const dataMergeHelper = (data: LendingData[], nfts: Nft[]): NftItemData[] =>
  nfts.map((nft, index) => {
    const queryDataMatch = data.filter(
      (queryDataItem) =>
        queryDataItem.nftAddress === nft.contract.address &&
        queryDataItem.tokenId === nft.tokenId,
    )[0];

    return {
      id: `${nft.contract.address}-${nft.tokenId}-${index}`,
      title: nft.title || 'No title available',
      nftAddress: nft.contract.address,
      tokenId: nft.tokenId,
      available: queryDataMatch?.renting === null,
      collateral: queryDataMatch?.nftPrice
        ? formatNumber(queryDataMatch.nftPrice)
        : '',
      costOfRent: queryDataMatch?.dailyRentPrice
        ? formatNumber(queryDataMatch.dailyRentPrice)
        : '',
      paymentToken: queryDataMatch?.paymentToken
        ? PaymentToken[Number(queryDataMatch?.paymentToken)]
        : '',
      thumbnail: nft.media[0]?.thumbnail || '',
    };
  });
export default dataMergeHelper;
