import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
  IconComponent: React.ComponentType<{ name: string; size: number; color?: string }>;
  iconName: string;
  label: string;
  onPress: () => void;
}

export default function IconButton({ IconComponent, iconName, label, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <IconComponent name={iconName} size={32} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    margin: 8,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  label: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
  },
});
