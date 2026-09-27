import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors} from './theme';

type Props = {title: string; right?: React.ReactNode};

export default function AppHeader({title, right}: Props) {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()} accessibilityLabel="Quay lại">
        <Text style={styles.backText}>‹</Text>
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <View style={styles.right}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {height: 54, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.line, backgroundColor: colors.white},
  back: {width: 52, height: 54, justifyContent: 'center', paddingLeft: 18},
  backText: {color: colors.navy, fontSize: 34, lineHeight: 39, fontWeight: '300'},
  title: {flex: 1, textAlign: 'center', color: colors.navy, fontSize: 17, fontWeight: '700'},
  right: {width: 52, alignItems: 'center'},
});
