import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/AppNavigation';
import styles from '../admin/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminHome'>;

const AdminHome = ({navigation}: Props) => {
  const item = (title: string, detail: string, onPress: () => void) => (
    <TouchableOpacity style={styles.card} onPress={onPress} accessibilityRole="button" key={title}>
      <Text style={styles.cardTitle}>{title}  ›</Text>
      <Text style={styles.cardDetail}>{detail}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Trang chính Admin</Text>
      <Text style={styles.subtitle}>Quản lý hệ thống thang máy</Text>

      <Text style={styles.section}>Quản lý thang máy</Text>
      {item('Xem danh sách / tra cứu', 'Xem và chọn thang máy', () => navigation.navigate('AdminElevators'))}
      {item('Thêm thang máy', 'Tạo hồ sơ thang máy mới', () => navigation.navigate('AdminElevatorForm'))}
      {item('Chỉnh sửa thông tin', 'Chọn thang máy trong danh sách để sửa', () => navigation.navigate('AdminElevators'))}

      <Text style={styles.section}>Quản lý tài khoản</Text>
      {item('Tạo tài khoản kỹ thuật viên', 'Cấp tài khoản và mã nhân viên', () => navigation.navigate('AdminUserForm', {role: 'technician'}))}
      {item('Tạo tài khoản chủ sở hữu', 'Gắn tài khoản với một thang máy', () => navigation.navigate('AdminUserForm', {role: 'owner'}))}
      {item('Phân quyền', 'Xem và đổi quyền tài khoản', () => navigation.navigate('AdminUsers'))}

      <Text style={styles.section}>Nghiệp vụ</Text>
      {item('Tra cứu / xem thông tin', 'Chọn thang máy để xem chi tiết', () => navigation.navigate('AdminElevators'))}
      {item('Quản lý kiểm định', 'Chọn thang máy để xem hồ sơ kiểm định', () => navigation.navigate('AdminElevators'))}
      {item('Quản lý lịch sử dịch vụ', 'Chọn thang máy để xem lịch sử', () => navigation.navigate('AdminElevators'))}
      <View />
    </ScrollView>
  );
};

export default AdminHome;
