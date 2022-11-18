import { SxProps, Theme } from '@mui/material';

type NamedStyles<T> = { [P in keyof T]: SxProps<Theme> };
export type CreateSxStyles = <T extends NamedStyles<T>>(
  styles: NamedStyles<T>,
) => NamedStyles<T>;

const createSxStyles = <T extends NamedStyles<T>>(styles: NamedStyles<T>) =>
  styles;

export default createSxStyles;
