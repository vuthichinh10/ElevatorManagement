import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/AppNavigation';
import MenuRow from '../ui/MenuRow';
import {colors} from '../ui/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminHome'>;

const AdminHome = ({navigation}: Props) => (
  <SafeAreaView style={styles.screen}>
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.brand}><Text style={styles.brandName}>ElevatorPro</Text><Text style={styles.brandSub}>Quản lý thang máy thông minh · Admin</Text></View>
      <Text style={styles.section}>Quản lý thang máy</Text>
      <MenuRow icon="▣" title="Danh sách / tra cứu thang máy" featured onPress={() => navigation.navigate('AdminElevators')} />
      <MenuRow icon="＋" title="Thêm thang máy" onPress={() => navigation.navigate('AdminElevatorForm')} />
      <MenuRow icon="✎" title="Chỉnh sửa thông tin" onPress={() => navigation.navigate('AdminElevators')} />
      <Text style={styles.section}>Quản lý tài khoản</Text>
      <MenuRow icon="♙" title="Tạo tài khoản kỹ thuật viên" onPress={() => navigation.navigate('AdminUserForm', {role: 'technician'})} />
      <MenuRow icon="♧" title="Tạo tài khoản chủ sở hữu" onPress={() => navigation.navigate('AdminUserForm', {role: 'owner'})} />
      <MenuRow icon="⚙" title="Phân quyền tài khoản" onPress={() => navigation.navigate('AdminUsers')} />
      <Text style={styles.section}>Nghiệp vụ</Text>
      <MenuRow icon="◇" title="Tra cứu thông tin thang máy" onPress={() => navigation.navigate('AdminElevators')} />
      <MenuRow icon="⬡" title="Quản lý kiểm định" onPress={() => navigation.navigate('AdminElevators')} />
      <MenuRow icon="◷" title="Quản lý lịch sử dịch vụ" onPress={() => navigation.navigate('AdminElevators')} />
      <View style={styles.banner}><Text style={styles.bannerIcon}>▥</Text><View><Text style={styles.bannerTitle}>An toàn hơn. Hiệu quả hơn.</Text><Text style={styles.bannerText}>Quản lý thang máy thông minh</Text></View></View>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: colors.white}, content: {paddingTop: 20, paddingBottom: 27},
  brand: {paddingHorizontal: 21, marginBottom: 9}, brandName: {fontSize: 22, color: colors.navy, fontWeight: '800'}, brandSub: {fontSize: 11, color: colors.muted, marginTop: 3},
  section: {marginHorizontal: 21, marginTop: 17, marginBottom: 3, color: colors.navy, fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.6},
  banner: {marginHorizontal: 20, marginTop: 24, backgroundColor: colors.pale, borderRadius: 11, minHeight: 80, paddingHorizontal: 17, flexDirection: 'row', alignItems: 'center'},
  bannerIcon: {fontSize: 33, color: colors.blue, marginRight: 16}, bannerTitle: {fontSize: 13, color: colors.navy, fontWeight: '700'}, bannerText: {fontSize: 11, color: colors.muted, marginTop: 4},
});

export default AdminHome;
