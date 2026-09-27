import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/AppNavigation';
import MenuRow from '../ui/MenuRow';
import {colors} from '../ui/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'OwnerHome'>;

const OwnerHome = ({navigation}: Props) => (
  <SafeAreaView style={styles.screen}>
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.brand}>
        <View>
          <Text style={styles.brandName}>ElevatorPro</Text>
          <Text style={styles.brandSub}>Quản lý thang máy thông minh</Text>
        </View>
        <View style={styles.bell}><Text style={styles.bellText}>♢</Text></View>
      </View>
      <MenuRow icon="◇" title="Thông tin chung" featured onPress={() => navigation.navigate('ElevatorInfo')} />
      <MenuRow icon="▤" title="Thông số kỹ thuật thang" onPress={() => navigation.navigate('TechnicalInfo')} />
      <MenuRow icon="⬡" title="Dữ liệu kiểm định thang" onPress={() => navigation.navigate('Inspections')} />
      <MenuRow icon="◷" title="Lịch sử dịch vụ" onPress={() => navigation.navigate('ServiceHistory')} />
      <TouchableOpacity style={styles.banner} onPress={() => navigation.navigate('ElevatorInfo')}>
        <Text style={styles.bannerIcon}>▥</Text>
        <View style={{flex: 1}}>
          <Text style={styles.bannerTitle}>An toàn hơn. Hiệu quả hơn.</Text>
          <Text style={styles.bannerText}>Vì những tòa nhà thông minh hơn</Text>
        </View>
        <Text style={styles.bannerArrow}>›</Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: colors.white},
  content: {flexGrow: 1, paddingTop: 20, paddingBottom: 24},
  brand: {paddingHorizontal: 21, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  brandName: {fontSize: 22, fontWeight: '800', color: colors.navy, letterSpacing: -0.6},
  brandSub: {fontSize: 11, color: colors.muted, marginTop: 3},
  bell: {width: 34, height: 34, alignItems: 'center', justifyContent: 'center'},
  bellText: {fontSize: 26, color: colors.navy},
  banner: {marginHorizontal: 20, marginTop: 'auto', backgroundColor: colors.pale, borderRadius: 11, minHeight: 91, paddingHorizontal: 17, flexDirection: 'row', alignItems: 'center'},
  bannerIcon: {fontSize: 37, color: colors.blue, marginRight: 18},
  bannerTitle: {fontSize: 13, color: colors.navy, fontWeight: '700'},
  bannerText: {fontSize: 11, color: colors.muted, marginTop: 4},
  bannerArrow: {fontSize: 27, color: colors.blue},
});

export default OwnerHome;
