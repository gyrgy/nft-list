import { FC, useEffect, useRef } from 'react';
import { useDataProvider } from 'providers/data/DataProvider';

const LocalStorageProvider: FC = () => {
  const {
    savedItems: { favouredItems, unFavouredItems },
    setSavedItems,
  } = useDataProvider();

  useEffect(() => {
    const favouredItemsLocalStorage = localStorage.getItem('favouredItems');
    const unFavouredItemsLocalStorage = localStorage.getItem('unFavouredItems');

    if (favouredItemsLocalStorage && unFavouredItemsLocalStorage) {
      setSavedItems({
        favouredItems: JSON.parse(favouredItemsLocalStorage),
        unFavouredItems: JSON.parse(unFavouredItemsLocalStorage),
      });
    }
  }, [setSavedItems]);

  const firstLoad = useRef<boolean>(true);
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    localStorage.setItem('favouredItems', JSON.stringify(favouredItems));
    localStorage.setItem('unFavouredItems', JSON.stringify(unFavouredItems));
  }, [favouredItems, unFavouredItems]);

  return null;
};

export default LocalStorageProvider;
