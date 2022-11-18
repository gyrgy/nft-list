import { Grid } from '@mui/material';
import getFavouredStatus from 'helpers/cardHelpers/getFavouredStatus';
import { FC } from 'react';
import { NftItemData } from 'types/dataProviderTypes';
import NftCard from './NftCard';

interface NftCardListProps {
  data: NftItemData[];
  onFavouriteClick: (id: string) => void;
  favouredItems: string[];
  unFavouredItems: string[];
}

const NftCardList: FC<NftCardListProps> = ({
  data,
  onFavouriteClick,
  favouredItems,
  unFavouredItems,
}) => (
  <Grid container spacing={6}>
    {data.map((item) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
        <NftCard
          title={item.title}
          available={item.available}
          collateral={item.collateral}
          costOfRent={item.costOfRent}
          paymentToken={item.paymentToken}
          thumbnail={item.thumbnail}
          onFavouriteClick={() => onFavouriteClick(item.id)}
          favouredStatus={getFavouredStatus({
            itemId: item.id,
            favouredItems,
            unFavouredItems,
          })}
        />
      </Grid>
    ))}
  </Grid>
);

export default NftCardList;
