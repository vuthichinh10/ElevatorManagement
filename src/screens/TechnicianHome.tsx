import React, {useCallback, useState} from 'react';
import {ActivityIndicator, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/AppNavigation';
import {apiRequest, Elevator} from '../admin/api';
import {colors} from '../ui/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'TechnicianHome'>;

const TechnicianHome = ({navigation}: Props) => {
  const {height} = useWindowDimensions();
  const [elevators, setElevators] = useState<Elevator[]>([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useFocusEffect(useCallback(() => {
    let active = true;
    setLoading(true);
    apiRequest<Elevator[]>('/elevators')
      .then(items => {if (active) {setElevators(items); setError('');}})
      .catch(err => {if (active) setError(err.message);})
      .finally(() => {if (active) setLoading(false);});
    return () => {active = false;};
  }, []));

  const filtered = elevators.filter(item =>
    [item.elevatorId, item.owner, item.location].some(value =>
      value.toLowerCase().includes(query.trim().toLowerCase())));

  const search = () => {
    const elevator = elevators.find(item => item.elevatorId.toLowerCase() === query.trim().toLowerCase());
    if (!elevator) {
      setError('Không tìm thấy mã thang máy này.');
      return;
    }
    setError('');
    navigation.navigate('TechnicianElevator', {elevatorId: elevator.elevatorId});
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <ImageBackground source={require('../../assets/background.jpg')} style={[styles.hero, {height: Math.max(285, Math.min(height * 0.49, 440))}]} resizeMode="cover" />
        <View style={styles.panel}>
          <Text style={styles.title}>ELEVATOR{'\n'}MANAGEMENT APP</Text>
          <Text style={styles.subtitle}>Quản lý thang máy hiệu quả</Text>
          <Text style={styles.label}>NHẬP ID THANG MÁY</Text>
          <View style={styles.inputWrap}><Text style={styles.inputIcon}>▣</Text><TextInput style={styles.input} value={query} onChangeText={setQuery} autoCapitalize="characters" placeholder="XXXX-XXXX-XX" placeholderTextColor="#9BAAC4" returnKeyType="search" onSubmitEditing={search} /></View>
          <TouchableOpacity style={styles.searchButton} onPress={search} disabled={loading}><Text style={styles.searchText}>⌕  TRA CỨU</Text></TouchableOpacity>
          <Text style={styles.or}>hoặc</Text>
          <TouchableOpacity style={styles.qrButton} onPress={() => navigation.navigate('TechnicianScanner')}><Text style={styles.qrText}>▣  Quét mã QR</Text></TouchableOpacity>
          {loading && <ActivityIndicator style={{marginTop: 16}} color={colors.blue} />}
          {!!error && <Text style={styles.error}>{error}</Text>}
          {!loading && <>
            <Text style={styles.section}>Thang máy có thể tra cứu</Text>
            {filtered.length === 0 && <Text style={styles.empty}>Không có thang máy phù hợp.</Text>}
            {filtered.map(item => (
              <TouchableOpacity key={item.elevatorId} style={styles.result} onPress={() => navigation.navigate('TechnicianElevator', {elevatorId: item.elevatorId})}>
                <View style={styles.resultIcon}><Text style={styles.resultIconText}>▣</Text></View>
                <View style={{flex: 1}}><Text style={styles.resultId}>{item.elevatorId}</Text><Text style={styles.resultDetail}>{item.owner} · {item.location}</Text></View><Text style={styles.resultArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </>}
          <TouchableOpacity style={styles.settingsLink} onPress={() => navigation.navigate('TechnicianSettings')}><Text style={styles.settingsText}>Cài đặt tài khoản  ›</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: colors.white},
  hero: {width: '100%'},
  panel: {backgroundColor: colors.white, marginTop: -12, borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingHorizontal: 22, paddingTop: 17, paddingBottom: 30},
  title: {fontSize: 24, lineHeight: 25, letterSpacing: -0.6, fontWeight: '900', color: colors.navy},
  subtitle: {fontSize: 12, color: colors.muted, marginTop: 2, marginBottom: 18},
  label: {fontSize: 10, fontWeight: '700', letterSpacing: 0.6, color: colors.navy, marginBottom: 6},
  inputWrap: {borderWidth: 1, borderColor: '#BCD8F3', borderRadius: 6, height: 43, flexDirection: 'row', alignItems: 'center'},
  inputIcon: {fontSize: 18, color: colors.muted, marginLeft: 12, marginRight: 8},
  input: {flex: 1, color: colors.navy, fontSize: 13, paddingVertical: 0},
  searchButton: {height: 44, backgroundColor: colors.blueDark, borderRadius: 6, justifyContent: 'center', alignItems: 'center', marginTop: 12},
  searchText: {fontSize: 13, color: colors.white, fontWeight: '800', letterSpacing: 0.8},
  or: {fontSize: 11, color: colors.muted, textAlign: 'center', marginVertical: 9},
  qrButton: {height: 44, borderRadius: 6, borderWidth: 1, borderColor: colors.blue, alignItems: 'center', justifyContent: 'center'},
  qrText: {color: colors.blue, fontSize: 13, fontWeight: '700'},
  error: {color: '#BE2E34', fontSize: 12, marginTop: 12},
  section: {color: colors.navy, fontSize: 15, fontWeight: '700', marginTop: 25, marginBottom: 10},
  empty: {fontSize: 12, color: colors.muted},
  result: {height: 63, borderTopWidth: 1, borderTopColor: colors.line, flexDirection: 'row', alignItems: 'center'},
  resultIcon: {width: 32, height: 32, borderRadius: 7, backgroundColor: colors.pale, alignItems: 'center', justifyContent: 'center', marginRight: 11},
  resultIconText: {fontSize: 18, color: colors.blue},
  resultId: {fontSize: 13, fontWeight: '700', color: colors.navy}, resultDetail: {fontSize: 11, color: colors.muted, marginTop: 3}, resultArrow: {fontSize: 25, color: colors.blue},
  settingsLink: {alignItems: 'center', marginTop: 18, padding: 10}, settingsText: {fontSize: 12, color: colors.muted},
});

export default TechnicianHome;
