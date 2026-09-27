import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from './theme';

type Props = {icon: string; label: string; value?: string | number | null; last?: boolean};

export default function InfoRow({icon, label, value, last}: Props) {
  return (
    <View style={[styles.row, last && styles.last]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value} numberOfLines={2}>{value === null || value === undefined || value === '' ? 'Chưa cập nhật' : String(value)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {minHeight: 47, borderBottomColor: colors.line, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 17, paddingVertical: 6},
  last: {borderBottomWidth: 0},
  icon: {fontSize: 17, color: colors.navy, width: 28, textAlign: 'center', marginRight: 9},
  label: {fontSize: 12, color: colors.muted, flex: 1.2},
  value: {fontSize: 12, color: colors.navy, fontWeight: '600', textAlign: 'right', flex: 1},
});
