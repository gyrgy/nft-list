import {
  FC,
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useReducer,
  useMemo,
  useCallback,
} from 'react';
import {
  DataContextProps,
  QueryLendingData,
  Saveditems,
} from 'types/dataProviderTypes';
import { useQuery } from '@apollo/client';
import GET_LENDINGS from 'operations/queries/lending';
import debounce from 'lodash.debounce';
import mergeSavedItemsData from 'helpers/data/mergeSavedItemsData';
import reducer from './reducer';
import initialStateData from './initialState';
import getNftDetailsService from './getNftDetailsService';

const DataContext = createContext<DataContextProps>({
  ...initialStateData,
  loadMore: () => {
    throw new Error(
      "loadMore cannot be called outside of the DataProvider's context.",
    );
  },
  setFavouriteItem: () => {
    throw new Error(
      "setFavouriteItem cannot be called outside of the DataProvider's context.",
    );
  },
  setSavedItems: () => {
    throw new Error(
      "setSavedItems cannot be called outside of the DataProvider's context.",
    );
  },
});

interface DataProviderProps {
  children: ReactNode;
}

const DataProvider: FC<DataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialStateData);

  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
    refetch: refetchLendings,
  } = useQuery<QueryLendingData>(GET_LENDINGS, {
    variables: {
      first: 40,
      skip: 0,
    },
    nextFetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (!queryData) {
      return;
    }

    getNftDetailsService({ queryData, dispatch });
  }, [queryData]);

  const debouncedRefetchLendings = useMemo(
    () => debounce(refetchLendings, 300),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const loadMore = useCallback(() => {
    debouncedRefetchLendings({
      first: 40,
      skip: state.data.length || 40,
    });
  }, [debouncedRefetchLendings, state.data.length]);

  const setFavouriteItem = useCallback(
    (id: string) => {
      const payload = mergeSavedItemsData(id, state.savedItems);

      dispatch({
        type: 'UPDATE_STATE',
        payload,
      });
    },
    [state.savedItems],
  );

  const setSavedItems = useCallback((data: Saveditems) => {
    dispatch({
      type: 'UPDATE_STATE',
      payload: {
        savedItems: data,
      },
    });
  }, []);

  const value = useMemo(
    () => ({
      data: state.data,
      loading: queryLoading || state.loading,
      error: !!queryError?.message || state.error,
      loadMore,
      savedItems: state.savedItems,
      setFavouriteItem,
      setSavedItems,
    }),
    [
      loadMore,
      queryError?.message,
      queryLoading,
      setFavouriteItem,
      setSavedItems,
      state.data,
      state.error,
      state.loading,
      state.savedItems,
    ],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;

export const useDataProvider = () => useContext(DataContext);
