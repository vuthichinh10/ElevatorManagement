import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/AppNavigation';
import {apiRequest, Elevator} from '../admin/api';
import AppHeader from '../ui/AppHeader';
import InfoRow from '../ui/InfoRow';
import {colors} from '../ui/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ElevatorInfo'>;

const ElevatorInfo = ({route}: Props) => {
  const selectedId = route.params?.elevatorId;
  const [elevator, setElevator] = useState<Elevator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    apiRequest<Elevator[]>('/elevators')
      .then(items => {
        const item = selectedId ? items.find(value => value.elevatorId === selectedId) : items[0];
        if (!item) throw new Error('Không tìm thấy thang máy được phân quyền.');
        if (active) {setElevator(item); setError('');}
      })
      .catch(err => {if (active) setError(err.message);})
      .finally(() => {if (active) setLoading(false);});
    return () => {active = false;};
  }, [selectedId]);

  const running = elevator?.status?.toLowerCase().includes('hoạt động') || elevator?.status?.toLowerCase() === 'active';
  return (
    <SafeAreaView style={styles.screen}>
      <AppHeader title="Thông tin thang máy" />
      <ScrollView contentContainerStyle={styles.content}>
        {loading && <ActivityIndicator style={{marginTop: 40}} color={colors.blue} />}
        {!!error && <Text style={styles.error}>{error}</Text>}
        {elevator && <>
          <View style={styles.summary}>
            <View style={styles.elevatorIcon}><Text style={styles.elevatorGlyph}>⇅</Text><View style={styles.door} /></View>
            <View style={{flex: 1}}>
              <Text style={styles.id}>{elevator.elevatorId}</Text>
              <Text style={[styles.status, !running && styles.statusInactive]}>{elevator.status || 'Chưa cập nhật'}</Text>
              <Text style={styles.summaryText}>Tòa nhà: {elevator.owner}</Text>
              <Text style={styles.summaryText}>Vị trí: {elevator.location}, {elevator.city}</Text>
            </View>
          </View>
          <View style={styles.rows}>
            <InfoRow icon="▥" label="Mã định danh thang" value={elevator.elevatorId} />
            <InfoRow icon="♙" label="Chủ sở hữu" value={elevator.owner} />
            <InfoRow icon="◎" label="Địa chỉ lắp đặt" value={elevator.location} />
            <InfoRow icon="▤" label="Tỉnh / thành" value={elevator.city} />
            <InfoRow icon="▣" label="Hãng sản xuất" value={elevator.manufacturer} />
            <InfoRow icon="▦" label="Ngày đưa vào sử dụng" value={elevator.installationDate} />
            <InfoRow icon="◫" label="Loại thang" value={elevator.type} />
            <InfoRow icon="◴" label="Tải trọng" value={elevator.capacity} />
            <InfoRow icon="⌁" label="Trạng thái hoạt động" value={elevator.status} last />
          </View>
        </>}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: colors.white},
  content: {paddingHorizontal: 17, paddingTop: 15, paddingBottom: 26},
  error: {color: '#C93434', fontSize: 13, marginTop: 20},
  summary: {backgroundColor: colors.pale, borderRadius: 10, padding: 12, flexDirection: 'row', alignItems: 'center', minHeight: 103, marginBottom: 10},
  elevatorIcon: {width: 60, height: 66, borderRadius: 9, backgroundColor: colors.blueDark, alignItems: 'center', justifyContent: 'center', marginRight: 13},
  elevatorGlyph: {color: colors.white, fontSize: 18, lineHeight: 19, fontWeight: '700'},
  door: {height: 24, width: 25, borderWidth: 2, borderColor: colors.white, borderRadius: 3, marginTop: 1},
  id: {fontSize: 16, color: colors.navy, fontWeight: '800', marginBottom: 4},
  status: {alignSelf: 'flex-start', fontSize: 10, color: '#08724B', backgroundColor: '#D8F5E7', borderRadius: 5, paddingHorizontal: 6, paddingVertical: 3, overflow: 'hidden', marginBottom: 5},
  statusInactive: {color: '#9D5E14', backgroundColor: '#FFF0D8'},
  summaryText: {color: colors.muted, fontSize: 10, lineHeight: 15},
  rows: {borderWidth: 1, borderColor: colors.line, borderRadius: 9, overflow: 'hidden'},
});

export default ElevatorInfo;
