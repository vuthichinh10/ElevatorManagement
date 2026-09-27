import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/AppNavigation';
import {apiRequest, Elevator} from '../admin/api';
import MenuRow from '../ui/MenuRow';
import {colors} from '../ui/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'TechnicianElevator'>;

const TechnicianElevator = ({navigation, route}: Props) => {
  const {elevatorId} = route.params;
  const [elevator, setElevator] = useState<Elevator | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest<Elevator[]>(`/elevators`)
      .then(items => {
        const item = items.find(candidate => candidate.elevatorId === elevatorId);
        if (!item) throw new Error('Không tìm thấy thang máy.');
        setElevator(item);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [elevatorId]);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.brand}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}><Text style={styles.backText}>‹</Text></TouchableOpacity>
          <View style={{flex: 1}}><Text style={styles.brandName}>ElevatorPro</Text><Text style={styles.brandSub}>Quản lý thang máy thông minh</Text></View>
          <TouchableOpacity onPress={() => navigation.navigate('TechnicianSettings')}><Text style={styles.settings}>⚙</Text></TouchableOpacity>
        </View>
        {loading && <ActivityIndicator color={colors.blue} />}
        {!!error && <Text style={styles.error}>{error}</Text>}
        {elevator && <>
          <View style={styles.selected}><Text style={styles.selectedIcon}>▣</Text><View><Text style={styles.selectedId}>{elevatorId}</Text><Text style={styles.selectedDetail}>{elevator.owner} · {elevator.location}</Text></View></View>
          <MenuRow icon="◇" title="Thông tin chung" featured onPress={() => navigation.navigate('ElevatorInfo', {elevatorId})} />
          <MenuRow icon="▤" title="Thông số kỹ thuật thang" onPress={() => navigation.navigate('TechnicalInfo', {elevatorId})} />
          <MenuRow icon="⬡" title="Dữ liệu kiểm định thang" onPress={() => navigation.navigate('Inspections', {elevatorId})} />
          <MenuRow icon="◷" title="Lịch sử dịch vụ" onPress={() => navigation.navigate('ServiceHistory', {elevatorId})} />
          <MenuRow icon="✎" title="Cập nhật kiểm định" onPress={() => navigation.navigate('TechnicianRecords', {elevatorId, kind: 'inspection'})} />
          <MenuRow icon="✚" title="Cập nhật dịch vụ" onPress={() => navigation.navigate('TechnicianRecords', {elevatorId, kind: 'service'})} />
          <MenuRow icon="⚙" title="Cài đặt" onPress={() => navigation.navigate('TechnicianSettings')} />
          <TouchableOpacity style={styles.banner} onPress={() => navigation.goBack()}>
            <Text style={styles.bannerIcon}>▥</Text><View style={{flex: 1}}><Text style={styles.bannerTitle}>An toàn hơn. Hiệu quả hơn.</Text><Text style={styles.bannerText}>Quản lý kỹ thuật trong một nơi</Text></View><Text style={styles.bannerArrow}>›</Text>
          </TouchableOpacity>
        </>}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: colors.white},
  content: {flexGrow: 1, paddingTop: 15, paddingBottom: 23},
  brand: {paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 13},
  back: {width: 29, marginRight: 4}, backText: {fontSize: 31, color: colors.navy, lineHeight: 36},
  brandName: {fontSize: 21, color: colors.navy, fontWeight: '800'}, brandSub: {fontSize: 11, color: colors.muted}, settings: {fontSize: 23, color: colors.navy},
  selected: {marginHorizontal: 20, backgroundColor: colors.pale, borderRadius: 10, padding: 11, flexDirection: 'row', alignItems: 'center', marginBottom: 12},
  selectedIcon: {fontSize: 24, color: colors.white, backgroundColor: colors.blue, borderRadius: 8, width: 38, height: 38, textAlign: 'center', textAlignVertical: 'center', marginRight: 10},
  selectedId: {fontSize: 15, color: colors.navy, fontWeight: '800'}, selectedDetail: {fontSize: 11, color: colors.muted, marginTop: 3},
  error: {color: '#C73232', marginHorizontal: 20, marginBottom: 10},
  banner: {marginHorizontal: 20, marginTop: 'auto', backgroundColor: colors.pale, minHeight: 78, borderRadius: 11, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14},
  bannerIcon: {fontSize: 34, color: colors.blue, marginRight: 14}, bannerTitle: {fontSize: 13, fontWeight: '700', color: colors.navy}, bannerText: {fontSize: 11, color: colors.muted, marginTop: 3}, bannerArrow: {fontSize: 26, color: colors.blue},
});

export default TechnicianElevator;
