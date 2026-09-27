import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/AppNavigation';
import {apiRequest, Elevator} from '../admin/api';
import AppHeader from '../ui/AppHeader';
import InfoRow from '../ui/InfoRow';
import {colors} from '../ui/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'TechnicalInfo'>;

const TechnicalInfo = ({route}: Props) => {
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

  return (
    <SafeAreaView style={styles.screen}>
      <AppHeader title="Thông số kỹ thuật" />
      <ScrollView contentContainerStyle={styles.content}>
        {loading && <ActivityIndicator color={colors.blue} style={{marginTop: 40}} />}
        {!!error && <Text style={styles.error}>{error}</Text>}
        {elevator && <>
          <View style={styles.summary}><Text style={styles.icon}>▣</Text><View><Text style={styles.id}>{elevator.elevatorId}</Text><Text style={styles.note}>{elevator.manufacturer || 'Thang máy'} · {elevator.type || 'Chưa rõ loại'}</Text></View></View>
          <View style={styles.rows}>
            <InfoRow icon="◷" label="Số điểm dừng" value={elevator.numberOfStops} />
            <InfoRow icon="◴" label="Tốc độ" value={elevator.speed == null ? null : `${elevator.speed} m/s`} />
            <InfoRow icon="▤" label="Độ sâu hố pit" value={elevator.pitDepth == null ? null : `${elevator.pitDepth} mm`} />
            <InfoRow icon="⇧" label="Chiều cao overhead" value={elevator.overheadHeight == null ? null : `${elevator.overheadHeight} mm`} />
            <InfoRow icon="⚙" label="Loại truyền động" value={elevator.driveType} />
            <InfoRow icon="◫" label="Tải trọng" value={elevator.capacity} last />
          </View>
        </>}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: colors.white},
  content: {padding: 17, paddingBottom: 30},
  error: {fontSize: 13, color: '#BE2E34'},
  summary: {backgroundColor: colors.pale, borderRadius: 10, padding: 15, flexDirection: 'row', alignItems: 'center', marginBottom: 12},
  icon: {color: colors.white, backgroundColor: colors.blue, width: 47, height: 47, fontSize: 26, textAlign: 'center', textAlignVertical: 'center', borderRadius: 8, overflow: 'hidden', marginRight: 12},
  id: {fontSize: 16, fontWeight: '800', color: colors.navy},
  note: {fontSize: 11, color: colors.muted, marginTop: 5},
  rows: {borderColor: colors.line, borderWidth: 1, borderRadius: 9, overflow: 'hidden'},
});

export default TechnicalInfo;
