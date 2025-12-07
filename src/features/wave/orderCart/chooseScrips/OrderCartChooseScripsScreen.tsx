import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenConfig } from '../../../../common/navigation/conventions';
import { ScreenBaseProps } from '../../../../common/types/ScreenBaseProps';
import { ScreenHeader } from '../common/components/ScreenHeader';
import {
  OrderCartScripInfo,
  ScripWithCheckBoxComponent,
} from '../common/components/scripWithCheckBox/ScripWithCheckBoxComponent';

export default function OrderCartChooseScripsScreen({}: ScreenBaseProps): React.ReactElement {
  const renderScreenHeader = () => {
    return <ScreenHeader title='Choose scrips form cart' onBackPress={() => {}} />;
  };

  const getScripInfoMockData = (): Array<OrderCartScripInfo> => {
    return Array.from({ length: 10 }, (_, index) => {
      return {
        exp: '1980-01-01T00:00:00.000Z',
        sSymbol: `ACC-${index}`,
        sOptionType: '',
        nStrikePrice: '',
        nExpiryDate: 0,
        nExpiryDate1: '',
        nExpiryDate2: '',
        nAssetToken: 0,
        nInstrumentType: 0,
        nMarketSegmentId: 1,
        nNormal_MarketAllowed: 1,
        nPriceBdAttribute: 100,
        nRegularLot: 1,
        nToken: 22,
        sDerivitiveDesc: 'ACC LIMITED--ACC EQ--EQ--ACC--NSE Eq',
        sInstrumentName: 'EQUITIES',
        sSecurityDesc: 'ACC LIMITED',
        sSeries: 'EQ',
        nSPOS: 12,
        nPOS: 0,
        DecimalLocator: 100,
        nNRILimit: 0,
        nFIILimit: 0,
        nPriceTick: 10,
        nSpread: 0,
        sISINCode: 'INE012A01025',
        sGlobalNormalFlag: '0',
        nStrikePrice1: '',
        nFIIFlag: 0,
        nMarginTypeIndicator: 1,
        nAVMBuyMargin: 0,
        nAVMSellMargin: 0,
        nPriceNum: 1,
        nPriceDen: 1,
        nIsAsset: 0,
        nIntrinsicValue: 1,
        nIsIndex: 0,
        nFOExists: 0,
        nCoCode: 6,
        nSectorCode: '00000011',
        nOtherExchToken: 0,
        sSector: 'Cement',
        nExpiryMonth: 0,
        nIssueMaturityDate: 0,
        nIsSIP: 1,
        nScripInstrument: 2,
        sQtyUnit: '',
        sSurvMeasureDescription: null,
        nMaxSingleTransactionQty: 53331,
        nIssuedCapital: 187787263,
        dtLastUpdateTime: '2025-11-14T07:36:42.730Z',
        id: '1-22',
        sExchange: 'NSE',
        sSearchText: 'ACC ACC LIMITED EQ EQUITIES',
        sSymbolNew: 'ACC',
        MktSegId: 1,
        ExchangeSegment: 'NSE_EQ',
      };
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {renderScreenHeader()}
      <ScripWithCheckBoxComponent defaultChecked={true} scriptInfo={getScripInfoMockData()} />
    </SafeAreaView>
  );
}

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'OrderCartChooseScrips',
  component: OrderCartChooseScripsScreen,
  options: {
    headerShown: false,
    title: 'OrderCartChooseScrips Screen',
  },
};
