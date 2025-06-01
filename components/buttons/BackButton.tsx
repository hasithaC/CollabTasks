import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { CaretLeft } from 'phosphor-react-native';
import { theme } from '@/constants/theme';

type Props = {
  onPress: () => void;
};

const BackButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <CaretLeft size={24} color= {theme.colors.dark} /> 
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.backgrounds.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
});
