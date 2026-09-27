import React, {useCallback, useState} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/AppNavigation';
import {apiRequest, Elevator, ManagedUser} from '../admin/api';
import AppHeader from '../ui/AppHeader';
import {colors} from '../ui/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ServiceHistory'>;
type Service = {id: number; type: string; date: string; technicianId: string | null; description: string | null};
const filters = [
  {key: 'all', label: 'Tất cả'}, {key: 'maintenance', label: 'Bảo trì'},
  {key: 'inspection', label: 'Kiểm định'}, {key: 'repair', label: 'Sửa chữa'},
  {key: 'replacement', label: 'Thay thế'},
];
const serviceMeta: Record<string, {label: string; color: string; icon: string}> = {
  maintenance: {label: 'Bảo trì định kỳ', color: colors.green, icon: '⌁'},
  inspection: {label: 'Kiểm định', color: colors.blue, icon: '⬡'},
  repair: {label: 'Sửa chữa', color: colors.orange, icon: '⚠'},
  replacement: {label: 'Thay thế', color: '#7E62D9', icon: '✚'},
};
const formatDate = (date: string) => /^\d{4}-\d{2}-\d{2}$/.test(date) ? `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(0, 4)}` : date;

const ServiceHistory = ({navigation, route}: Props) => {
  const selectedId = route.params?.elevatorId;
  const [elevatorId, setElevatorId] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [filter, setFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [canEdit, setCanEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useFocusEffect(useCallback(() => {
    let active = true;
    setLoading(true);
    Promise.all([apiRequest<Elevator[]>('/elevators'), apiRequest<ManagedUser>('/me')])
      .then(async ([elevators, user]) => {
        const elevator = selectedId ? elevators.find(value => value.elevatorId === selectedId) : elevators[0];
        if (!elevator) throw new Error('Không tìm thấy thang máy được phân quyền.');
        const records = await apiRequest<Service[]>(`/elevators/${encodeURIComponent(elevator.elevatorId)}/services`);
        if (active) {setElevatorId(elevator.elevatorId); setServices(records); setCanEdit(user.role === 'technician' || user.role === 'admin'); setError('');}
      })
      .catch(err => {if (active) setError(err.message);})
      .finally(() => {if (active) setLoading(false);});
    return () => {active = false;};
  }, [selectedId]));

  const visible = filter === 'all' ? services : services.filter(item => item.type === filter);
  return (
    <SafeAreaView style={styles.screen}>
      <AppHeader title="Lịch sử dịch vụ" />
      <View style={styles.body}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters} contentContainerStyle={styles.filterContent}>
          {filters.map(item => <TouchableOpacity key={item.key} onPress={() => setFilter(item.key)} style={[styles.chip, filter === item.key && styles.chipActive]}><Text style={[styles.chipText, filter === item.key && styles.chipTextActive]}>{item.label}</Text></TouchableOpacity>)}
        </ScrollView>
        <ScrollView contentContainerStyle={styles.listContent}>
          {!!elevatorId && <Text style={styles.elevatorId}>Mã thang máy: {elevatorId}</Text>}
          {loading && <ActivityIndicator color={colors.blue} style={{marginTop: 35}} />}
          {!!error && <Text style={styles.error}>{error}</Text>}
          {!loading && !error && visible.length === 0 && <Text style={styles.empty}>Chưa có lịch sử dịch vụ phù hợp.</Text>}
          {visible.map(item => {
            const meta = serviceMeta[item.type] || {label: item.type, color: colors.blue, icon: '●'};
            const expanded = expandedId === item.id;
            return <View style={styles.timelineRow} key={item.id}>
              <View style={styles.timelineRail}><View style={[styles.dot, {backgroundColor: meta.color}]} /><View style={styles.line} /></View>
              <TouchableOpacity style={styles.item} onPress={() => setExpandedId(expanded ? null : item.id)} activeOpacity={0.8}>
                <View style={[styles.typeIcon, {backgroundColor: meta.color}]}><Text style={styles.typeIconText}>{meta.icon}</Text></View>
                <View style={{flex: 1}}>
                  <Text style={styles.itemTitle}>{meta.label}</Text>
                  <Text style={styles.date}>{formatDate(item.date)}</Text>
                  <Text style={styles.detail}>Kỹ thuật viên: {item.technicianId || 'Chưa cập nhật'}</Text>
                  <Text style={styles.description} numberOfLines={expanded ? undefined : 2}>{item.description || 'Không có mô tả'}</Text>
                  {expanded && canEdit && elevatorId && <TouchableOpacity onPress={() => navigation.navigate('AdminRecordForm', {elevatorId, kind: 'service', recordId: item.id})}><Text style={styles.edit}>Cập nhật bản ghi  ›</Text></TouchableOpacity>}
                </View>
                <Text style={styles.chevron}>{expanded ? '⌄' : '›'}</Text>
              </TouchableOpacity>
            </View>;
          })}
        </ScrollView>
        {canEdit && elevatorId && <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AdminRecordForm', {elevatorId, kind: 'service'})}><Text style={styles.addText}>＋  Thêm bản ghi dịch vụ</Text></TouchableOpacity>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: colors.white}, body: {flex: 1},
  filters: {maxHeight: 55, flexGrow: 0}, filterContent: {paddingHorizontal: 17, paddingTop: 11, paddingBottom: 9, gap: 7},
  chip: {height: 32, borderWidth: 1, borderColor: colors.line, borderRadius: 9, paddingHorizontal: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.paleBlue},
  chipActive: {backgroundColor: colors.blueDark, borderColor: colors.blueDark}, chipText: {fontSize: 11, fontWeight: '600', color: colors.muted}, chipTextActive: {color: colors.white},
  listContent: {paddingHorizontal: 17, paddingBottom: 32}, elevatorId: {color: colors.muted, fontSize: 11, marginBottom: 9},
  error: {fontSize: 12, color: '#C73232', marginTop: 12}, empty: {color: colors.muted, fontSize: 13, textAlign: 'center', marginTop: 40},
  timelineRow: {flexDirection: 'row', minHeight: 91}, timelineRail: {width: 16, alignItems: 'center'}, dot: {width: 8, height: 8, borderRadius: 4, marginTop: 23, zIndex: 1}, line: {width: 1, backgroundColor: '#D7E6F3', flex: 1},
  item: {flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.line, paddingVertical: 12, paddingLeft: 4},
  typeIcon: {width: 35, height: 35, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginRight: 11}, typeIconText: {color: colors.white, fontSize: 17, fontWeight: '700'},
  itemTitle: {fontSize: 13, color: colors.navy, fontWeight: '700'}, date: {fontSize: 11, color: colors.muted, marginTop: 2},
  detail: {fontSize: 10, color: colors.navy, marginTop: 3}, description: {fontSize: 10, lineHeight: 14, color: colors.muted, marginTop: 1},
  chevron: {color: colors.muted, fontSize: 23, marginLeft: 8}, edit: {color: colors.blue, fontSize: 11, fontWeight: '700', marginTop: 8},
  addButton: {height: 48, backgroundColor: colors.blueDark, borderRadius: 7, alignItems: 'center', justifyContent: 'center', marginHorizontal: 17, marginBottom: 12}, addText: {color: colors.white, fontSize: 13, fontWeight: '700'},
});

export default ServiceHistory;
