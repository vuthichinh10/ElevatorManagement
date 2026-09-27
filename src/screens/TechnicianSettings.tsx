import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/AppNavigation';
import {apiRequest, ManagedUser} from '../admin/api';
import styles from '../admin/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'TechnicianSettings'>;

const TechnicianSettings = ({navigation}: Props) => {
  const [user, setUser] = useState<ManagedUser | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiRequest<ManagedUser>('/me').then(setUser).catch(err => setError(err.message));
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.reset({index: 0, routes: [{name: 'Login'}]});
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Cài đặt tài khoản</Text>
      <Text style={styles.subtitle}>Thông tin đăng nhập của kỹ thuật viên</Text>
      {!!error && <Text style={styles.error}>{error}</Text>}
      {user && <>
        <Text style={styles.label}>Tên đăng nhập</Text>
        <Text style={styles.card}>{user.username}</Text>
        <Text style={styles.label}>Mã nhân viên</Text>
        <Text style={styles.card}>{user.employeeId || 'Chưa cập nhật'}</Text>
      </>}
      <TouchableOpacity style={styles.button} onPress={() => {void logout();}}>
        <Text style={styles.buttonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TechnicianSettings;
