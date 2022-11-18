// eslint-disable-next-line import/prefer-default-export
export enum PaymentToken {
  SENTINEL = 0, // denotes non-existence of payment token. i.e. default value signifying it hasn't been set
  WETH = 1,
  DAI = 2,
  USDC = 3,
  USDT = 4,
  TUSD = 5,
  ACS = 7, // 6 is reserved for the RENT token when it is released
}
