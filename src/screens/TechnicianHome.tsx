import React, {useCallback, useState} from 'react';
import {ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/AppNavigation';
import {apiRequest, Elevator} from '../admin/api';
import styles from '../admin/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'TechnicianHome'>;

const TechnicianHome = ({navigation}: Props) => {
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
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Không gian kỹ thuật viên</Text>
      <Text style={styles.subtitle}>Tra cứu thang máy để xem và cập nhật nghiệp vụ</Text>
      <Text style={styles.label}>Mã thang máy</Text>
      <TextInput style={styles.input} value={query} onChangeText={setQuery} autoCapitalize="characters" placeholder="Ví dụ: 29A1-0001-01" returnKeyType="search" onSubmitEditing={search} />
      <TouchableOpacity style={styles.button} onPress={search} disabled={loading}>
        <Text style={styles.buttonText}>Tra cứu mã thang máy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('TechnicianScanner')}>
        <Text style={styles.secondaryText}>Quét mã QR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.secondaryButton, {marginBottom: 18}]} onPress={() => navigation.navigate('TechnicianSettings')}>
        <Text style={styles.secondaryText}>Cài đặt tài khoản</Text>
      </TouchableOpacity>
      <Text style={styles.section}>Danh sách thang máy</Text>
      {loading && <ActivityIndicator color="#135FC4" />}
      {!!error && <Text style={styles.error}>{error}</Text>}
      {!loading && filtered.length === 0 && <Text>Không có thang máy phù hợp.</Text>}
      {filtered.map(item => (
        <TouchableOpacity key={item.elevatorId} style={styles.card} onPress={() => navigation.navigate('TechnicianElevator', {elevatorId: item.elevatorId})}>
          <Text style={styles.cardTitle}>{item.elevatorId}  ›</Text>
          <Text style={styles.cardDetail}>{item.owner} · {item.location}, {item.city}</Text>
        </TouchableOpacity>
      ))}
      <View />
    </ScrollView>
  );
};

export default TechnicianHome;
