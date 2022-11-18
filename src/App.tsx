import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDataProvider } from 'providers/data/DataProvider';
import AppLayout from 'layouts/AppLayout';
import NftCardList from 'components/card/NftCardList';
import throttle from 'lodash.throttle';
import { LinearProgress, Typography, Box, TextField } from '@mui/material';
import LoadingOverlay from 'components/LoadingOverlay';
import { useThemeContext } from 'providers/theme/ThemeProvider';

const App: FC = () => {
  const { createSxStyles } = useThemeContext();
  const { filter, separator } = createSxStyles({
    filter: {
      position: 'fixed',
      zIndex: 99,
      mt: -6,
      bgcolor: 'background.paper',
      width: '100%',
      pt: 6,
      pb: 2,
    },
    separator: {
      pt: 12,
    },
  });

  const {
    error,
    loading,
    data,
    loadMore,
    savedItems: { favouredItems, unFavouredItems },
    setFavouriteItem,
  } = useDataProvider();

  const [searchText, setSearchText] = useState<string>('');

  const handleSearchFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchText(event.target.value);
  };

  const filteredData = useMemo(
    () =>
      data.filter((item) =>
        item.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()),
      ),
    [data, searchText],
  );

  const handleScroll = useCallback(() => {
    if (searchText) {
      return;
    }

    if (
      document.documentElement.offsetHeight -
        (window.innerHeight + document.documentElement.scrollTop) >
      1
    ) {
      return;
    }

    loadMore();
  }, [loadMore, searchText]);

  useEffect(() => {
    window.addEventListener(
      'scroll',
      throttle(handleScroll, 500, { leading: false, trailing: true }),
    );

    return () =>
      window.removeEventListener(
        'scroll',
        throttle(handleScroll, 500, { leading: false, trailing: true }),
      );
  }, [handleScroll]);

  const handleOnFavouriteClick = useCallback(
    (id: string) => {
      setFavouriteItem(id);
    },
    [setFavouriteItem],
  );

  return (
    <AppLayout>
      <Box sx={filter}>
        <TextField
          value={searchText}
          onChange={handleSearchFieldChange}
          placeholder="Filter results"
          sx={{ minWidth: '20%' }}
        />
      </Box>
      {error && (
        <Typography variant="body1" color="error">
          Something went wrong. Please try again later.
        </Typography>
      )}
      <Box sx={separator} />
      <NftCardList
        data={filteredData}
        onFavouriteClick={handleOnFavouriteClick}
        favouredItems={favouredItems}
        unFavouredItems={unFavouredItems}
      />
      {!searchText && <LinearProgress />}
      {loading && <LoadingOverlay />}
    </AppLayout>
  );
};

export default App;
