import { FavouredStatus } from 'components/card/NftCard';

interface GetFavouredStatusParams {
  itemId: string;
  favouredItems: string[];
  unFavouredItems: string[];
}

const getFavouredStatus = ({
  itemId,
  favouredItems,
  unFavouredItems,
}: GetFavouredStatusParams): FavouredStatus => {
  const isFavoured = favouredItems.includes(itemId);

  if (isFavoured) {
    return 'favoured';
  }

  const isUnFavoured = unFavouredItems.includes(itemId);

  if (isUnFavoured) {
    return 'unfavoured';
  }

  return 'none';
};

export default getFavouredStatus;
