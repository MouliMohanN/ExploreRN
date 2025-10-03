import React, { useRef, useState } from 'react';
import {
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ScreenConfig } from '../../common/navigation/conventions';
import { ScreenBaseProps } from '../../common/types/ScreenBaseProps';

export default function InputTextScreen({}: ScreenBaseProps): React.ReactElement {
  const [numericValue, setNumericValue] = useState('');
  const textInputRef = useRef<TextInput>(null);

  const getTextInputStyle = () => {
    if (Platform.OS === 'android') {
      // For Android, always use left alignment but adjust padding when empty
      return [
        styles.textInput,
        {
          textAlign: 'left',
          paddingLeft: numericValue ? 16 : '45%',
          paddingRight: 16,
          textAlignVertical: 'center',
        },
      ];
    }

    // For iOS, use the original approach
    return [
      styles.textInput,
      {
        textAlign: numericValue ? 'left' : 'center',
        textAlignVertical: 'center',
      },
    ];
  };

  const handleNumericInput = (text: string) => {
    // Remove any non-numeric characters
    const numericText = text.replace(/[^0-9]/g, '');
    setNumericValue(numericText);
  };

  const clearInput = () => {
    setNumericValue('');
    textInputRef.current?.blur();
  };

  const formatNumber = (num: string) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleTouchOutside = () => {
    Keyboard.dismiss();
    textInputRef.current?.blur();
  };

  const handleInputFocus = () => {
    // Move cursor to the end when input is focused and has content
    // For empty input, let it use the centered alignment
    setTimeout(() => {
      if (textInputRef.current) {
        if (numericValue) {
          // If has content, move cursor to end
          textInputRef.current.setSelection(numericValue.length, numericValue.length);
        } else {
          // If empty, set cursor to position 0 (will appear centered due to textAlign)
          textInputRef.current.setSelection(0, 0);
        }
      }
    }, 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={handleTouchOutside}>
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>Numeric Input</Text>
            <Text style={styles.subtitle}>Enter numbers with beautiful formatting</Text>
          </View>

          {/* Input Card */}
          <View style={styles.card}>
            <Text style={styles.inputLabel}>Enter Amount</Text>
            <TextInput
              ref={textInputRef}
              style={getTextInputStyle()}
              placeholder='0'
              placeholderTextColor='#A0A0A0'
              value={numericValue}
              onChangeText={handleNumericInput}
              onFocus={handleInputFocus}
              keyboardType='numeric'
              maxLength={15}
              multiline={false}
            />

            {/* Formatted Display */}
            {numericValue ?
              <View style={styles.displayContainer}>
                <Text style={styles.displayLabel}>Formatted:</Text>
                <Text style={styles.displayValue}>{formatNumber(numericValue)}</Text>
              </View>
            : null}
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearInput} disabled={!numericValue}>
              <Text style={[styles.buttonText, !numericValue && styles.disabledText]}>Clear</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.primaryButton]} disabled={!numericValue}>
              <Text style={[styles.buttonText, styles.primaryButtonText, !numericValue && styles.disabledText]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>

          {/* Info Section */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>💡 Only numeric characters are allowed</Text>
            <Text style={styles.infoText}>🔢 Numbers are automatically formatted</Text>
            <Text style={styles.infoText}>👆 Tap outside to dismiss keyboard</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  textInput: {
    fontSize: 24,
    fontWeight: '500',
    color: '#1E293B',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#F8FAFC',
  },
  displayContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  displayLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
    fontWeight: '500',
  },
  displayValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButton: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  disabledText: {
    opacity: 0.5,
  },
  infoContainer: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  infoText: {
    fontSize: 14,
    color: '#92400E',
    marginBottom: 4,
    lineHeight: 20,
  },
});

// Screen configuration for auto-discovery
export const screenConfig: ScreenConfig = {
  name: 'InputText',
  component: InputTextScreen,
  options: {
    headerShown: true,
    title: 'Numeric Input',
  },
};
