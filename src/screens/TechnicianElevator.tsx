import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, Text, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/AppNavigation';
import {apiRequest, Elevator} from '../admin/api';
import styles from '../admin/styles';

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

  const links: {title: string; screen: 'ElevatorInfo' | 'TechnicalInfo' | 'Inspections' | 'ServiceHistory'}[] = [
    {title: 'Thông tin chung', screen: 'ElevatorInfo'},
    {title: 'Thông số kỹ thuật', screen: 'TechnicalInfo'},
    {title: 'Dữ liệu kiểm định', screen: 'Inspections'},
    {title: 'Lịch sử dịch vụ', screen: 'ServiceHistory'},
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{elevatorId}</Text>
      {loading && <ActivityIndicator color="#135FC4" />}
      {!!error && <Text style={styles.error}>{error}</Text>}
      {elevator && <>
        <Text style={styles.subtitle}>{elevator.owner} · {elevator.location}, {elevator.city}</Text>
        <Text style={styles.section}>Thông tin thang máy</Text>
        {links.map(link => (
          <TouchableOpacity key={link.screen} style={styles.card} onPress={() => navigation.navigate(link.screen, {elevatorId})}>
            <Text style={styles.cardTitle}>{link.title}  ›</Text>
          </TouchableOpacity>
        ))}
        <Text style={styles.section}>Cập nhật nghiệp vụ</Text>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TechnicianRecords', {elevatorId, kind: 'inspection'})}>
          <Text style={styles.cardTitle}>Quản lý bản ghi kiểm định  ›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TechnicianRecords', {elevatorId, kind: 'service'})}>
          <Text style={styles.cardTitle}>Quản lý bản ghi dịch vụ  ›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AdminRecordForm', {elevatorId, kind: 'inspection'})}>
          <Text style={styles.buttonText}>+ Thêm kiểm định</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AdminRecordForm', {elevatorId, kind: 'service'})}>
          <Text style={styles.buttonText}>+ Thêm bảo trì / sửa chữa</Text>
        </TouchableOpacity>
      </>}
    </ScrollView>
  );
};

export default TechnicianElevator;
