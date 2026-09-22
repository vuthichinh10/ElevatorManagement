import React, {useState} from 'react';
import styles from '../styles/registerStyle';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../navigation/AppNavigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen = ({navigation}: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [elevatorId, setElevatorId] = useState('');

  const handleRegister = () => {
    if (!username.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập tên đăng nhập.');
      return;
    }

    if (!password) {
      Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Thông báo', 'Mật khẩu xác nhận không khớp.');
      return;
    }

    if (!elevatorId.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập ID thang máy.');
      return;
    }

    // TODO: Gọi API đăng ký
    Alert.alert(
      'Đăng ký thành công',
      'Tài khoản đã được tạo.',
      [
        {
          text: 'Đăng nhập',
          onPress: () => navigation.navigate('Login'),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">

        <View style={styles.container}>

          {/* Back */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>

            <Text style={styles.backText}>
              ‹
            </Text>

            <Text style={styles.backLabel}>
              Quay lại
            </Text>

          </TouchableOpacity>

          {/* Logo */}
          <View style={styles.logo}>
            <Text style={styles.logoArrow}>
              ↑ ↓
            </Text>

            <View style={styles.elevatorDoor}>
              <View style={styles.doorLeft} />
              <View style={styles.doorRight} />
            </View>
          </View>

          <Text style={styles.title}>
            Tạo tài khoản
          </Text>

          <Text style={styles.subtitle}>
            Đăng ký tài khoản quản lý thang máy
          </Text>

          {/* Username */}
          <Text style={styles.label}>
            Tên đăng nhập
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>
              ♙
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nhập tên đăng nhập"
              placeholderTextColor="#8A9AB5"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <Text style={styles.label}>
            Mật khẩu
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>
              ♙
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nhập mật khẩu"
              placeholderTextColor="#8A9AB5"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* Confirm password */}
          <Text style={styles.label}>
            Xác nhận mật khẩu
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>
              ♙
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nhập lại mật khẩu"
              placeholderTextColor="#8A9AB5"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          {/* Elevator ID */}
          <Text style={styles.label}>
            ID thang máy
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>
              ⇅
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nhập ID thang máy"
              placeholderTextColor="#8A9AB5"
              value={elevatorId}
              onChangeText={setElevatorId}
              autoCapitalize="characters"
            />
          </View>

          {/* Register button */}
          <TouchableOpacity
            style={styles.registerButton}
            activeOpacity={0.8}
            onPress={handleRegister}>

            <Text style={styles.registerButtonText}>
              Đăng ký
            </Text>

          </TouchableOpacity>

          {/* Login */}
          <View style={styles.loginContainer}>

            <Text style={styles.loginText}>
              Đã có tài khoản?
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}>

              <Text style={styles.loginLink}>
                Đăng nhập
              </Text>

            </TouchableOpacity>

          </View>

          <Text style={styles.footer}>
            Vận hành an toàn
          </Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;