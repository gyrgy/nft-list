type Renting = {
  rentedAt: string;
  rentDuration: string;
};

export interface LendingData {
  nftAddress: string;
  tokenId: string;
  nftPrice: string;
  paymentToken: string;
  dailyRentPrice: string;
  renting: Renting | null;
}

export type QueryLendingData = {
  lendings: LendingData[];
};

export type NftItemData = {
  id: string; // address + tokenId
  title: string; // nft title
  available: boolean; // query renting is null
  collateral: string; // query nft price
  costOfRent: string; // qurey daily rent price
  paymentToken: string; // query payment token
  thumbnail: string; // nft media/thumbnail
};

export type Saveditems = {
  favouredItems: string[];
  unFavouredItems: string[];
};

export type DataProviderState = {
  loading: boolean;
  error: boolean;
  data: NftItemData[];
  savedItems: Saveditems;
};

export type DataContextProps = DataProviderState & {
  loadMore: () => void;
  setFavouriteItem: (id: string) => void;
  setSavedItems: (data: Saveditems) => void;
};

const UPDATE_STATE = 'UPDATE_STATE';
export type ActionTypes = {
  type: typeof UPDATE_STATE;
  payload: Partial<DataProviderState>;
};
