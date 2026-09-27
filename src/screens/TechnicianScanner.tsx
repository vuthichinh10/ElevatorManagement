import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Linking, Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Camera, CameraType} from 'react-native-camera-kit';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import type {RootStackParamList} from '../navigation/AppNavigation';
import {apiRequest, Elevator} from '../admin/api';
import {elevatorIdFromQr} from '../technician/qr';
import styles from '../admin/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'TechnicianScanner'>;

const TechnicianScanner = ({navigation}: Props) => {
  const isFocused = useIsFocused();
  const scanning = useRef(false);
  const [permission, setPermission] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState('');

  const askPermission = async () => {
    setChecking(true);
    try {
      const status = await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA);
      setPermission(status === RESULTS.GRANTED);
      if (status !== RESULTS.GRANTED) setError('Cần cấp quyền camera để quét mã QR.');
      else setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể yêu cầu quyền camera.');
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {void askPermission();}, []);

  const onRead = async (raw: string) => {
    if (scanning.current) return;
    scanning.current = true;
    const elevatorId = elevatorIdFromQr(raw);
    if (!elevatorId) {
      setError('Mã QR không chứa mã thang máy hợp lệ.');
      scanning.current = false;
      return;
    }
    try {
      const items = await apiRequest<Elevator[]>('/elevators');
      const elevator = items.find(item => item.elevatorId.toLowerCase() === elevatorId.toLowerCase());
      if (!elevator) throw new Error('Không tìm thấy thang máy theo mã QR.');
      navigation.replace('TechnicianElevator', {elevatorId: elevator.elevatorId});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể tra cứu mã QR.');
      scanning.current = false;
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Quét mã QR</Text>
      <Text style={styles.subtitle}>Đưa mã QR của thang máy vào khung hình</Text>
      {checking && <ActivityIndicator color="#135FC4" />}
      {!checking && permission && isFocused && <View style={{height: 380, borderRadius: 16, overflow: 'hidden', marginBottom: 16}}>
        <Camera
          style={{flex: 1}}
          cameraType={CameraType.Back}
          scanBarcode
          showFrame
          onReadCode={event => {void onRead(event.nativeEvent.codeStringValue);}}
        />
      </View>}
      {!!error && <Text style={styles.error}>{error}</Text>}
      {!permission && !checking && <>
        <TouchableOpacity style={styles.button} onPress={() => {void askPermission();}}>
          <Text style={styles.buttonText}>Cấp quyền camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => {void Linking.openSettings();}}>
          <Text style={styles.secondaryText}>Mở cài đặt thiết bị</Text>
        </TouchableOpacity>
      </>}
    </ScrollView>
  );
};

export default TechnicianScanner;
