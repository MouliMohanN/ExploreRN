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
  const [dataBasedOnUi, setDataBasedOnUi] = useState<Array<ScriptCardWithCheckBoxProps>>(
    ScripWithCheckBoxComponentUtils.getDataBasedOnUiList(scriptInfo),
  );

  const handlePress = (index: number) => {
    const newData = [...dataBasedOnUi];
    newData[index].isChecked = !newData[index].isChecked;
    setDataBasedOnUi(newData);
  };

  const selectedScripsCount = dataBasedOnUi.filter((item) => item.isChecked).length;

  const renderSelectedScrips = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 8 }}>
        <Text style={{ fontSize: 12, color: '#666' }}>{`selected (${selectedScripsCount}/${scriptInfo.length})`}</Text>
      </View>
    );
  };

  const renderFlashList = () => {
    return (
      <View style={{ flex: 1 }}>
        <FlashList
          data={dataBasedOnUi}
          renderItem={({ item, index }) => <ScriptCardWithCheckBox {...item} onPress={() => handlePress(index)} />}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          extraData={dataBasedOnUi} // Ensure list updates on state change
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 16 }}
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
