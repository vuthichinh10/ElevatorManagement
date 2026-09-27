import React, {useCallback, useState} from 'react';
import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/AppNavigation';
import {apiRequest} from '../admin/api';
import styles from '../admin/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'TechnicianRecords'>;
type RecordItem = {id: number; inspectionDate?: string; date?: string; result?: string; type?: string; description?: string};

const TechnicianRecords = ({navigation, route}: Props) => {
  const {elevatorId, kind} = route.params;
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useFocusEffect(useCallback(() => {
    let active = true;
    setLoading(true);
    apiRequest<RecordItem[]>(`/elevators/${encodeURIComponent(elevatorId)}/${kind === 'inspection' ? 'inspections' : 'services'}`)
      .then(items => {if (active) {setRecords(items); setError('');}})
      .catch(err => {if (active) setError(err.message);})
      .finally(() => {if (active) setLoading(false);});
    return () => {active = false;};
  }, [elevatorId, kind]));

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{kind === 'inspection' ? 'Kiểm định' : 'Lịch sử dịch vụ'}</Text>
      <Text style={styles.subtitle}>Thang máy {elevatorId}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AdminRecordForm', {elevatorId, kind})}>
        <Text style={styles.buttonText}>+ Thêm bản ghi</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator color="#135FC4" />}
      {!!error && <Text style={styles.error}>{error}</Text>}
      {!loading && !error && records.length === 0 && <Text>Chưa có bản ghi.</Text>}
      {records.map(item => (
        <View style={styles.card} key={item.id}>
          <Text style={styles.cardTitle}>{item.inspectionDate || item.date} · {item.result || item.type}</Text>
          <Text style={styles.cardDetail}>{item.description || 'Không có mô tả'}</Text>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('AdminRecordForm', {elevatorId, kind, recordId: item.id})}>
            <Text style={styles.secondaryText}>Cập nhật bản ghi</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default TechnicianRecords;
