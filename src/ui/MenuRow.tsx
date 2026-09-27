import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from './theme';

type Props = {icon: string; title: string; onPress: () => void; featured?: boolean};

export default function MenuRow({icon, title, onPress, featured}: Props) {
  return (
    <TouchableOpacity style={[styles.row, featured && styles.featured]} onPress={onPress} activeOpacity={0.8} accessibilityRole="button">
      <View style={[styles.iconBox, featured && styles.featuredIcon]}><Text style={[styles.icon, featured && styles.featuredText]}>{icon}</Text></View>
      <Text style={[styles.title, featured && styles.featuredText]}>{title}</Text>
      <Text style={[styles.chevron, featured && styles.featuredText]}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {height: 58, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.line, paddingHorizontal: 15, marginHorizontal: 20},
  featured: {height: 58, backgroundColor: '#277FC0', borderRadius: 10, borderBottomWidth: 0, marginBottom: 4, marginTop: 8},
  iconBox: {width: 31, height: 31, borderRadius: 9, borderWidth: 1, borderColor: '#C5D9F0', alignItems: 'center', justifyContent: 'center', marginRight: 13},
  featuredIcon: {borderColor: '#B9DEFC'},
  icon: {color: colors.navy, fontSize: 18, lineHeight: 22},
  title: {flex: 1, color: colors.navy, fontSize: 14, fontWeight: '500'},
  chevron: {color: '#7EA4D8', fontSize: 25, fontWeight: '300'},
  featuredText: {color: colors.white, fontWeight: '700'},
});
