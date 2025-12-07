import { ScriptCardWithCheckBoxProps } from './ScriptCardWithCheckBox';
import { OrderCartScripInfo } from './ScripWithCheckBoxComponent';

// Helper to format date if needed, though input seems to be string or number.
// Adjusting based on standard conventions (e.g. 08 AUG) if date provided is parseable.
const formatDate = (date: number | string): string => {
  // Placeholder formatting, assuming input might need parsing.
  // If it's a number (timestamp) or ISO string.
  // For now, if it is a number, we might just pass it or format it.
  // The screenshot shows "08 AUG".
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return String(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleString('default', { month: 'short' }).toUpperCase();
    return `${day} ${month}`;
  } catch {
    return String(date);
  }
};

export const ScripWithCheckBoxComponentUtils = {
  getDataBasedOnUiList: (scripData: Array<OrderCartScripInfo>): Array<ScriptCardWithCheckBoxProps> => {
    const dataBasedOnUiList: Array<ScriptCardWithCheckBoxProps> = scripData.map((scrip) => {
      let titleSubText = '';
      const title = scrip.sSymbol;

      // Determine if it is likely a derivative (has strike price, expiry, option type)
      // Or based on Instrument name.
      // Screenshot example 1: TCS EQ (NSE)
      // Screenshot example 2: HDFCBANK 08 AUG 2280.00 CE (NSE)

      const isDerivative =
        scrip.sInstrumentName === 'FUT' ||
        scrip.sOptionType === 'CE' ||
        scrip.sOptionType === 'PE' ||
        (scrip.nStrikePrice && scrip.nStrikePrice !== '0' && scrip.nStrikePrice !== '');

      if (isDerivative) {
        // Construct derivative string: Expiry + Strike + Option Type
        // Note: sSymbol might be HDFCBANK

        // Ensure expiry is formatted if it's a date.
        // nExpiryDate in types is number, mock data has 'exp' string but type def says nExpiryDate number.
        // We will try our best with what we have.
        const expiryStr = scrip.nExpiryDate ? formatDate(scrip.nExpiryDate) : '';
        const strikeStr = scrip.nStrikePrice ? parseFloat(String(scrip.nStrikePrice)).toFixed(2) : '';
        const optionType = scrip.sOptionType || '';

        titleSubText = `${expiryStr} ${strikeStr} ${optionType}`.trim();
      } else {
        // Equity
        // Screenshot: TCS EQ
        // Title: TCS, Sub: EQ
        titleSubText = scrip.sSeries || 'EQ';
      }

      return {
        icon: '', // Placeholder, logic handled in component
        title: title,
        titleSubText: titleSubText,
        subText: scrip.sExchange || 'NSE',
        isChecked: false, // Default state, parent handles actual state usually but prop required
      } as ScriptCardWithCheckBoxProps;
    });
    return dataBasedOnUiList;
  },
};
