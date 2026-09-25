import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ServiceHistory = () => {
  const [elevatorId, setElevatorId] = useState<string | null>(null);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getServices = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          Alert.alert(
            'Lỗi',
            'Không tìm thấy thông tin đăng nhập.',
          );
          return;
        }

        // Lấy thang máy được phân quyền cho Owner
        const elevatorResponse = await fetch(
          'http://192.168.0.104:3000/elevators',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const elevatorData =
          await elevatorResponse.json();

        if (!elevatorResponse.ok) {
          Alert.alert(
            'Lỗi',
            elevatorData.message ||
              'Không lấy được thông tin thang máy.',
          );
          return;
        }

        if (elevatorData.length === 0) {
          Alert.alert(
            'Thông báo',
            'Không tìm thấy thang máy được phân quyền.',
          );
          return;
        }

        const id = elevatorData[0].elevatorId;

        setElevatorId(id);

        // Lấy lịch sử dịch vụ
        const serviceResponse = await fetch(
          `http://192.168.0.104:3000/elevators/${id}/services`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const serviceData =
          await serviceResponse.json();

        if (!serviceResponse.ok) {
          Alert.alert(
            'Lỗi',
            serviceData.message ||
              'Không lấy được lịch sử dịch vụ.',
          );
          return;
        }

        setServices(serviceData);
      } catch (error) {
        console.error(
          'Lỗi lấy lịch sử dịch vụ:',
          error,
        );

        Alert.alert(
          'Lỗi kết nối',
          'Không thể kết nối tới Backend.',
        );
      } finally {
        setLoading(false);
      }
    };

    getServices();
  }, []);

  // Chuyển loại dịch vụ sang tiếng Việt
  const getServiceType = (type: string) => {
    switch (type) {
      case 'maintenance':
        return 'Bảo trì';

      case 'inspection':
        return 'Kiểm định';

      case 'repair':
        return 'Sửa chữa';

      case 'replacement':
        return 'Thay thế';

      default:
        return type;
    }
  };

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
              Lịch sử dịch vụ
            </Text>

            <Text style={styles.subtitle}>
              Theo dõi quá trình bảo trì và sửa chữa
            </Text>

            {elevatorId && (
              <Text style={styles.elevatorId}>
                Mã thang máy: {elevatorId}
              </Text>
            )}
          </View>


          {/* ================= LOADING ================= */}

          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator
                size="large"
                color="#135FC4"
              />

              <Text style={styles.loadingText}>
                Đang tải dữ liệu...
              </Text>
            </View>
          ) : services.length === 0 ? (

            /* ================= EMPTY ================= */

            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>
                Chưa có lịch sử dịch vụ
              </Text>

              <Text style={styles.emptyText}>
                Thang máy hiện chưa có lịch sử
                bảo trì hoặc sửa chữa.
              </Text>
            </View>

          ) : (

            /* ================= SERVICE LIST ================= */

            <View style={styles.list}>

              {services.map((service, index) => (
                <View
                  key={service.id}
                  style={styles.card}>

                  {/* Card header */}

                  <View style={styles.cardHeader}>

                    <View style={styles.numberBox}>
                      <Text style={styles.number}>
                        {index + 1}
                      </Text>
                    </View>

                    <View style={styles.cardHeaderContent}>
                      <Text style={styles.cardTitle}>
                        {getServiceType(service.type)}
                      </Text>

                      <Text style={styles.date}>
                        {service.date}
                      </Text>
                    </View>

                  </View>


                  <View style={styles.separator} />


                  {/* Technician */}

                  <View style={styles.infoBlock}>
                    <Text style={styles.label}>
                      Kỹ thuật viên
                    </Text>

                    <Text style={styles.value}>
                      {service.technicianId ||
                        'Chưa cập nhật'}
                    </Text>
                  </View>


                  {/* Description */}

                  <View style={styles.infoBlock}>
                    <Text style={styles.label}>
                      Nội dung dịch vụ
                    </Text>

                    <Text style={styles.description}>
                      {service.description ||
                        'Không có mô tả'}
                    </Text>
                  </View>

                </View>
              ))}

            </View>
          )}

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
    backgroundColor: 'rgba(255,255,255,0.48)',
  },


  /* ================= CONTENT ================= */

  content: {
    flexGrow: 1,

    paddingHorizontal: 20,
    paddingVertical: 25,
    paddingBottom: 40,

    justifyContent: 'center',
  },


  /* ================= HEADER ================= */

  header: {
    marginBottom: 20,
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

  elevatorId: {
    fontSize: 13,
    marginTop: 8,
    color: '#607A9B',
    fontWeight: '600',
  },


  /* ================= LOADING ================= */

  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#607A9B',
  },


  /* ================= LIST ================= */

  list: {
    gap: 14,
  },


  /* ================= SERVICE CARD ================= */

  card: {
    backgroundColor: 'rgba(255,255,255,0.94)',

    borderRadius: 20,

    padding: 17,

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


  /* ================= CARD HEADER ================= */

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  numberBox: {
    width: 44,
    height: 44,

    borderRadius: 22,

    backgroundColor: '#E5F2FF',

    justifyContent: 'center',
    alignItems: 'center',
  },

  number: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#135FC4',
  },

  cardHeaderContent: {
    flex: 1,
    marginLeft: 12,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#123B78',
  },

  date: {
    fontSize: 13,
    color: '#607A9B',
    marginTop: 4,
  },


  /* ================= SEPARATOR ================= */

  separator: {
    height: 1,

    backgroundColor: 'rgba(80,120,160,0.12)',

    marginVertical: 14,
  },


  /* ================= INFO ================= */

  infoBlock: {
    marginBottom: 12,
  },

  label: {
    fontSize: 13,

    color: '#607A9B',

    marginBottom: 4,
  },

  value: {
    fontSize: 15,

    fontWeight: '600',

    color: '#123B78',
  },

  description: {
    fontSize: 14,

    lineHeight: 21,

    color: '#42658F',
  },


  /* ================= EMPTY ================= */

  emptyCard: {
    backgroundColor: 'rgba(255,255,255,0.94)',

    borderRadius: 20,

    padding: 25,

    alignItems: 'center',

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

  emptyTitle: {
    fontSize: 17,

    fontWeight: 'bold',

    color: '#123B78',
  },

  emptyText: {
    fontSize: 14,

    color: '#607A9B',

    marginTop: 8,

    textAlign: 'center',
  },

});

export default ServiceHistory;