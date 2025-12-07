export interface ScripData {
  exp: string;
  sSymbol: string;
  sOptionType: string;
  nStrikePrice: string; // Appears as empty string in JSON
  nExpiryDate: number;
  nExpiryDate1: string;
  nExpiryDate2: string;
  nAssetToken: number;
  nInstrumentType: number;
  nMarketSegmentId: number;
  nNormal_MarketAllowed: number; // Likely 0 or 1 (Boolean logic)
  nPriceBdAttribute: number;
  nRegularLot: number;
  nToken: number;
  sDerivitiveDesc: string;
  sInstrumentName: string;
  sSecurityDesc: string;
  sSeries: string;
  nSPOS: number;
  nPOS: number;
  DecimalLocator: number;
  nNRILimit: number;
  nFIILimit: number;
  nPriceTick: number;
  nSpread: number;
  sISINCode: string;
  sGlobalNormalFlag: string; // Appears as "0" (string)
  nStrikePrice1: string;
  nFIIFlag: number;
  nMarginTypeIndicator: number;
  nAVMBuyMargin: number;
  nAVMSellMargin: number;
  nPriceNum: number;
  nPriceDen: number;
  nIsAsset: number;
  nIntrinsicValue: number;
  nIsIndex: number;
  nFOExists: number;
  nCoCode: number;
  nSectorCode: string; // Appears as "00000011" (string)
  nOtherExchToken: number;
  sSector: string;
  nExpiryMonth: number;
  nIssueMaturityDate: number;
  nIsSIP: number;
  nScripInstrument: number;
  sQtyUnit: string;
  sSurvMeasureDescription: string | null;
  nMaxSingleTransactionQty: number;
  nIssuedCapital: number;
  dtLastUpdateTime: string;
  id: string;
  sExchange: string;
  sSearchText: string;
  sSymbolNew: string;
  MktSegId: number;
  ExchangeSegment: string;
}
