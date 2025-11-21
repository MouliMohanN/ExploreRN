import { FlashList } from '@shopify/flash-list';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { ScripData } from '../../utils/types/Scrip';
import { ScriptCardWithCheckBox, ScriptCardWithCheckBoxProps } from './ScriptCardWithCheckBox';
import { ScripWithCheckBoxComponentUtils } from './utils';

export type OrderCartScripInfo = Pick<
  ScripData,
  'sSymbol' | 'sExchange' | 'sSeries' | 'nExpiryDate' | 'nStrikePrice' | 'sOptionType' | 'sInstrumentName'
>;

type ScripWithCheckBoxComponentProps = {
  scriptInfo: Array<OrderCartScripInfo>;
  defaultChecked: boolean;
};

export const ScripWithCheckBoxComponent: React.FC<ScripWithCheckBoxComponentProps> = (props) => {
  const { scriptInfo } = props;
  const [selectedScripsCount] = useState(0);

  const [dataBasedOnUi] = useState<Array<ScriptCardWithCheckBoxProps>>(
    ScripWithCheckBoxComponentUtils.getDataBasedOnUiList(scriptInfo),
  );

  const renderSelectedScrips = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <Text style={{ fontSize: 12 }}>{`selected (${selectedScripsCount}/${scriptInfo.length})`}</Text>
      </View>
    );
  };

  const renderFlashList = () => {
    return (
      <View style={{ flex: 1 }}>
        <FlashList
          data={dataBasedOnUi}
          renderItem={({ item }) => <ScriptCardWithCheckBox {...item} />}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingVertical: 8 }}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Select Scrips</Text>
      {renderSelectedScrips()}
      {renderFlashList()}
    </View>
  );
};
