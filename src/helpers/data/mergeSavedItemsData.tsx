import getFavouredStatus from 'helpers/cardHelpers/getFavouredStatus';
import { Saveditems } from 'types/dataProviderTypes';

const mergeSavedItemsData = (id: string, savedItems: Saveditems) => {
  const currentStatus = getFavouredStatus({
    itemId: id,
    favouredItems: savedItems.favouredItems,
    unFavouredItems: savedItems.unFavouredItems,
  });

  let payload = {
    savedItems: {
      favouredItems: savedItems.favouredItems,
      unFavouredItems: savedItems.unFavouredItems,
    },
  };

  if (currentStatus === 'none') {
    payload = {
      ...payload,
      savedItems: {
        ...payload.savedItems,
        favouredItems: [...payload.savedItems.favouredItems, id],
      },
    };
  }

  if (currentStatus === 'favoured') {
    payload = {
      ...payload,
      savedItems: {
        favouredItems: payload.savedItems.favouredItems.filter(
          (itemId) => itemId !== id,
        ),
        unFavouredItems: [...payload.savedItems.unFavouredItems, id],
      },
    };
  }

  if (currentStatus === 'unfavoured') {
    payload = {
      ...payload,
      savedItems: {
        favouredItems: [...payload.savedItems.favouredItems, id],
        unFavouredItems: payload.savedItems.unFavouredItems.filter(
          (itemId) => itemId !== id,
        ),
      },
    };
  }

  return payload;
};

export default mergeSavedItemsData;
