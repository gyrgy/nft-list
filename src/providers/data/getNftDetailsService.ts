import { Alchemy, Network } from 'alchemy-sdk';
import {
  ActionTypes,
  NftItemData,
  QueryLendingData,
} from 'types/dataProviderTypes';
import dataMergeHelper from 'helpers/data/dataMergeHelper';
import { ALCHEMY_KEY } from 'constants/keys';

const settings = {
  apiKey: ALCHEMY_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

type AppDispatch = (value: ActionTypes) => void;

interface GetNftDetailsParams {
  queryData: QueryLendingData;
  dispatch: AppDispatch;
}

const getNftDetailsService = async ({
  queryData,
  dispatch,
}: GetNftDetailsParams) => {
  dispatch({
    type: 'UPDATE_STATE',
    payload: {
      loading: true,
    },
  });

  try {
    const nfts = await Promise.all(
      queryData?.lendings.map(async (lendableNft) =>
        alchemy.nft.getNftMetadata(lendableNft.nftAddress, lendableNft.tokenId),
      ),
    );

    const mergedNftData: NftItemData[] = dataMergeHelper(
      queryData?.lendings || [],
      nfts,
    );

    dispatch({
      type: 'UPDATE_STATE',
      payload: {
        data: mergedNftData,
        loading: false,
      },
    });
  } catch (error) {
    dispatch({
      type: 'UPDATE_STATE',
      payload: {
        error: true,
        loading: false,
      },
    });
  }
};

export default getNftDetailsService;
