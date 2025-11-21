import { ScriptCardWithCheckBoxProps } from './ScriptCardWithCheckBox';
import { OrderCartScripInfo } from './ScripWithCheckBoxComponent';

export const ScripWithCheckBoxComponentUtils = {
  getDataBasedOnUiList: (scripData: Array<OrderCartScripInfo>): Array<ScriptCardWithCheckBoxProps> => {
    const dataBasedOnUiList: Array<ScriptCardWithCheckBoxProps> = scripData.map((scrip) => {
      let titleSubText = '';
      if (scrip.sInstrumentName === 'FUT') {
        titleSubText = `${scrip.nExpiryDate}`;
      } else {
        titleSubText = scrip.sSeries;
      }
      return {
        icon: '',
        title: scrip.sSymbol,
        titleSubText: titleSubText,
        subText: scrip.sExchange,
      } as ScriptCardWithCheckBoxProps;
    });
    return dataBasedOnUiList;
  },
};
