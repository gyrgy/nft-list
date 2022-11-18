import { DataProviderState } from 'types/dataProviderTypes';

const initialStateData: DataProviderState = {
  loading: false,
  error: false,
  data: [],
  savedItems: {
    favouredItems: [],
    unFavouredItems: [],
  },
};

export default initialStateData;
