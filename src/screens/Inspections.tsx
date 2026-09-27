import React, {useCallback, useState} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/AppNavigation';
import {apiRequest, Elevator, ManagedUser} from '../admin/api';
import AppHeader from '../ui/AppHeader';
import {colors} from '../ui/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Inspections'>;
type Inspection = {id: number; inspectionDate: string; inspectionUnit: string | null; result: string | null; description: string | null};
const formatDate = (date: string) => /^\d{4}-\d{2}-\d{2}$/.test(date) ? `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(0, 4)}` : date;

const Inspections = ({navigation, route}: Props) => {
  const selectedId = route.params?.elevatorId;
  const [elevatorId, setElevatorId] = useState<string | null>(null);
  const [records, setRecords] = useState<Inspection[]>([]);
  const [canEdit, setCanEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useFocusEffect(useCallback(() => {
    let active = true;
    setLoading(true);
    Promise.all([apiRequest<Elevator[]>('/elevators'), apiRequest<ManagedUser>('/me')])
      .then(async ([elevators, user]) => {
        const elevator = selectedId ? elevators.find(value => value.elevatorId === selectedId) : elevators[0];
        if (!elevator) throw new Error('Không tìm thấy thang máy được phân quyền.');
        const items = await apiRequest<Inspection[]>(`/elevators/${encodeURIComponent(elevator.elevatorId)}/inspections`);
        if (active) {setElevatorId(elevator.elevatorId); setRecords(items); setCanEdit(user.role === 'technician' || user.role === 'admin'); setError('');}
      })
      .catch(err => {if (active) setError(err.message);})
      .finally(() => {if (active) setLoading(false);});
    return () => {active = false;};
  }, [selectedId]));

  return (
    <SafeAreaView style={styles.screen}>
      <AppHeader title="Dữ liệu kiểm định" />
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.content}>
          {!!elevatorId && <View style={styles.summary}><Text style={styles.summaryIcon}>⬡</Text><View><Text style={styles.summaryTitle}>{elevatorId}</Text><Text style={styles.summaryNote}>Hồ sơ kiểm định thang máy</Text></View></View>}
          {loading && <ActivityIndicator color={colors.blue} style={{marginTop: 36}} />}
          {!!error && <Text style={styles.error}>{error}</Text>}
          {!loading && !error && records.length === 0 && <Text style={styles.empty}>Chưa có dữ liệu kiểm định.</Text>}
          {records.map((item, index) => {
            const passed = item.result?.toLowerCase().includes('đạt') && !item.result?.toLowerCase().includes('không');
            const color = passed ? colors.green : colors.orange;
            const expanded = expandedId === item.id;
            return <View style={styles.timelineRow} key={item.id}>
              <View style={styles.rail}><View style={[styles.dot, {backgroundColor: color}]} /><View style={styles.line} /></View>
              <TouchableOpacity style={styles.card} onPress={() => setExpandedId(expanded ? null : item.id)}>
                <View style={[styles.iconCircle, {backgroundColor: color}]}><Text style={styles.iconText}>✓</Text></View>
                <View style={{flex: 1}}>
                  <Text style={styles.title}>Kiểm định lần {records.length - index}</Text>
                  <Text style={styles.date}>{formatDate(item.inspectionDate)}</Text>
                  <Text style={styles.info}>Kết quả: {item.result || 'Chưa cập nhật'}</Text>
                  <Text style={styles.info} numberOfLines={expanded ? undefined : 2}>{item.description || 'Không có mô tả'}</Text>
                  {expanded && <Text style={styles.unit}>Đơn vị: {item.inspectionUnit || 'Chưa cập nhật'}</Text>}
                  {expanded && canEdit && elevatorId && <TouchableOpacity onPress={() => navigation.navigate('AdminRecordForm', {elevatorId, kind: 'inspection', recordId: item.id})}><Text style={styles.edit}>Cập nhật bản ghi  ›</Text></TouchableOpacity>}
                </View>
                <Text style={styles.chevron}>{expanded ? '⌄' : '›'}</Text>
              </TouchableOpacity>
            </View>;
          })}
        </ScrollView>
        {canEdit && elevatorId && <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AdminRecordForm', {elevatorId, kind: 'inspection'})}><Text style={styles.addText}>＋  Thêm bản ghi kiểm định</Text></TouchableOpacity>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: colors.white}, content: {paddingHorizontal: 17, paddingTop: 15, paddingBottom: 30},
  summary: {backgroundColor: colors.pale, borderRadius: 9, minHeight: 71, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginBottom: 14},
  summaryIcon: {fontSize: 24, color: colors.white, backgroundColor: colors.blueDark, width: 43, height: 43, textAlign: 'center', textAlignVertical: 'center', borderRadius: 8, overflow: 'hidden', marginRight: 12},
  summaryTitle: {fontSize: 15, fontWeight: '800', color: colors.navy}, summaryNote: {fontSize: 11, color: colors.muted, marginTop: 4},
  error: {color: '#BE2E34', fontSize: 12}, empty: {color: colors.muted, textAlign: 'center', marginTop: 30},
  timelineRow: {flexDirection: 'row', minHeight: 87}, rail: {width: 15, alignItems: 'center'}, dot: {width: 8, height: 8, borderRadius: 4, marginTop: 22}, line: {width: 1, backgroundColor: '#D7E6F3', flex: 1},
  card: {flex: 1, flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.line},
  iconCircle: {width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginRight: 10}, iconText: {fontSize: 18, color: colors.white, fontWeight: '800'},
  title: {fontSize: 13, fontWeight: '700', color: colors.navy}, date: {fontSize: 11, color: colors.muted, marginTop: 2}, info: {fontSize: 10, color: colors.muted, marginTop: 2}, unit: {fontSize: 10, color: colors.navy, marginTop: 4},
  chevron: {fontSize: 23, color: colors.muted, marginLeft: 8}, edit: {fontSize: 11, color: colors.blue, fontWeight: '700', marginTop: 8},
  addButton: {height: 48, backgroundColor: colors.blueDark, marginHorizontal: 17, marginBottom: 12, borderRadius: 7, alignItems: 'center', justifyContent: 'center'}, addText: {fontSize: 13, color: colors.white, fontWeight: '700'},
});

export default Inspections;
