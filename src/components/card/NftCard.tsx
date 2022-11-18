import { FC } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import { NftItemData } from 'types/dataProviderTypes';
import { useThemeContext } from 'providers/theme/ThemeProvider';
import imgNotFound from 'assets/img-not-found.png';
import {
  HeartBroken as HeartBrokenIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';

type NftCardDetails = Omit<NftItemData, 'id'>;

export type FavouredStatus = 'none' | 'favoured' | 'unfavoured';
interface NftCardProps extends NftCardDetails {
  onFavouriteClick: () => void;
  favouredStatus: FavouredStatus;
}

const NftCard: FC<NftCardProps> = ({
  title,
  available,
  collateral,
  costOfRent,
  paymentToken,
  thumbnail,
  onFavouriteClick,
  favouredStatus,
}) => {
  const { createSxStyles } = useThemeContext();

  const { container, favIcon, titleBox, titleText, image, chipBox } =
    createSxStyles({
      container: {
        position: 'relative',
      },
      favIcon: {
        position: 'absolute',
        top: 1,
        right: 1,
      },
      titleBox: {
        minHeight: 66,
      },
      titleText: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: '2',
        WebkitBoxOrient: 'vertical',
      },
      image: {
        objectFit: 'cover',
      },
      chipBox: {
        mb: 2,
      },
    });

  return (
    <Card sx={container}>
      <CardMedia
        component="img"
        height="240"
        image={thumbnail || imgNotFound}
        alt={title}
        sx={image}
      />
      <IconButton sx={favIcon} onClick={onFavouriteClick}>
        {favouredStatus === 'favoured' && <FavoriteIcon color="error" />}
        {favouredStatus === 'unfavoured' && <HeartBrokenIcon color="error" />}
        {favouredStatus === 'none' && <FavoriteBorderIcon color="error" />}
      </IconButton>
      <CardContent>
        <Box sx={titleBox}>
          <Typography gutterBottom variant="h5" component="div" sx={titleText}>
            {title}
          </Typography>
        </Box>
        <Box sx={chipBox}>
          {available ? (
            <Chip label="Available" color="success" />
          ) : (
            <Chip label="Rented" color="secondary" />
          )}
        </Box>
        <Typography variant="body2" color="text.secondary">
          Collateral: {collateral} {paymentToken}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cost of Rent: {costOfRent} {paymentToken}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NftCard;
