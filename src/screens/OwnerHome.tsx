import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/AppNavigation';

const OwnerHome = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.background}
      resizeMode="cover">

      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>

          {/* ================= HEADER ================= */}
          <View style={styles.header}>
            <Text style={styles.title}>
              Elevator Management
            </Text>

            <Text style={styles.subtitle}>
              Quản lý thang máy thông minh
            </Text>
          </View>


          {/* ================= THÔNG TIN CHUNG ================= */}
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ElevatorInfo')}>

            <View style={styles.iconBox}>
              <Text style={styles.icon}>
                ①
              </Text>
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>
                Thông tin chung
              </Text>

              <Text style={styles.cardDescription}>
                Xem tổng quan thông tin thang máy.
              </Text>
            </View>

            <Text style={styles.arrow}>
              ›
            </Text>

          </TouchableOpacity>


          {/* ================= THÔNG SỐ KỸ THUẬT ================= */}
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('TechnicalInfo')}>

            <View style={styles.iconBox}>
              <Text style={styles.icon}>
                ▤
              </Text>
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>
                Thông số kỹ thuật
              </Text>

              <Text style={styles.cardDescription}>
                Xem chi tiết các thông số kỹ thuật.
              </Text>
            </View>

            <Text style={styles.arrow}>
              ›
            </Text>

          </TouchableOpacity>


          {/* ================= DỮ LIỆU KIỂM ĐỊNH ================= */}
            <TouchableOpacity
             style={styles.card}
             activeOpacity={0.8} 
             onPress={() => navigation.navigate('Inspections')}> 

            <View style={styles.iconBox}>
              <Text style={styles.icon}>
                ◉
              </Text>
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>
                Dữ liệu kiểm định
              </Text>

              <Text style={styles.cardDescription}>
                Xem hồ sơ và kết quả kiểm định.
              </Text>
            </View>

            <Text style={styles.arrow}>
              ›
            </Text>

          </TouchableOpacity>


          {/* ================= LỊCH SỬ DỊCH VỤ ================= */}
           <TouchableOpacity
             style={styles.card}
             activeOpacity={0.8}
             onPress={() => navigation.navigate('ServiceHistory')}>

            <View style={styles.iconBox}>
              <Text style={styles.icon}>
                ◷
              </Text>
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>
                Lịch sử dịch vụ
              </Text>

              <Text style={styles.cardDescription}>
                Theo dõi lịch sử bảo trì và sửa chữa.
              </Text>
            </View>

            <Text style={styles.arrow}>
              ›
            </Text>

          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({

  /* ================= BACKGROUND ================= */

  background: {
    flex: 1,
  },


  /* ================= OVERLAY ================= */

  container: {
    flex: 1,

    // Làm ảnh nền dịu lại nhưng vẫn nhìn thấy
    backgroundColor: 'rgba(255,255,255,0.48)',
  },


  /* ================= MAIN CONTENT ================= */

  content: {
    flexGrow: 1,

    paddingHorizontal: 20,
    paddingVertical: 25,

    /*
     * Quan trọng:
     * Đưa toàn bộ nhóm nội dung vào giữa màn hình.
     *
     * Khi màn hình cao:
     * → không bị dồn lên phía trên.
     *
     * Khi màn hình thấp:
     * → ScrollView vẫn cho phép cuộn.
     */
    justifyContent: 'center',
  },


  /* ================= HEADER ================= */

  header: {
    marginBottom: 22,
  },

  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#123B78',
  },

  subtitle: {
    fontSize: 15,
    marginTop: 6,
    color: '#42658F',
  },


  /* ================= CARD ================= */

  card: {
    minHeight: 102,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: 'rgba(255,255,255,0.94)',

    borderRadius: 20,

    paddingHorizontal: 17,
    paddingVertical: 16,

    marginBottom: 14,

    borderWidth: 1,
    borderColor: 'rgba(80,160,230,0.22)',

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.12,
    shadowRadius: 5,

    elevation: 3,
  },


  /* ================= ICON ================= */

  iconBox: {
    width: 55,
    height: 55,

    borderRadius: 28,

    backgroundColor: '#E5F2FF',

    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    fontSize: 27,
    color: '#135FC4',
  },


  /* ================= CARD CONTENT ================= */

  cardContent: {
    flex: 1,

    marginLeft: 16,

    paddingRight: 8,
  },

  cardTitle: {
    fontSize: 18,

    fontWeight: 'bold',

    color: '#123B78',
  },

  cardDescription: {
    fontSize: 13,

    lineHeight: 19,

    color: '#607A9B',

    marginTop: 6,
  },


  /* ================= ARROW ================= */

  arrow: {
    fontSize: 32,

    color: '#1469D8',

    marginLeft: 5,

    marginRight: 2,
  },

});

export default OwnerHome;