import React, {useState} from 'react';
import styles from '../styles/loginStyle';
import {
  Alert,
  ImageBackground,
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

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({navigation}: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!username.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập tên đăng nhập.');
      return;
    }

    if (!password) {
      Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu.');
      return;
    }

    // TODO: Gọi API đăng nhập ở đây
    Alert.alert('Đăng nhập', `Xin chào ${username}!`);
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google', 'Đăng nhập bằng Google');
  };

  const handleMicrosoftLogin = () => {
    Alert.alert('Microsoft', 'Đăng nhập bằng Microsoft');
  };

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.background}
      resizeMode="cover">
    <View style={styles.overlay} >
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        
        <View style={styles.container}>

          {/* Logo */}
          <View style={styles.logo}>
            <Text style={styles.logoArrow}>↑ ↓</Text>

            <View style={styles.elevatorDoor}>
              <View style={styles.doorLeft} />
              <View style={styles.doorRight} />
            </View>
          </View>

          {/* App name */}
          <Text style={styles.appTitle}>
            Elevator Management App
          </Text>

          <Text style={styles.appSubtitle}>
            Quản lý thang máy thông minh
          </Text>

          {/* Login title */}
          <View style={styles.loginHeader}>
            <Text style={styles.loginTitle}>
              Đăng nhập
            </Text>

            <Text style={styles.welcomeText}>
              Chào mừng bạn quay trở lại!
            </Text>

            <Text style={styles.description}>
              Vui lòng đăng nhập để tiếp tục sử dụng hệ thống.
            </Text>
          </View>

          {/* Username */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>♙</Text>

            <TextInput
              style={styles.input}
              placeholder="Tên đăng nhập"
              placeholderTextColor="#8A9AB5"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputIcon}>♙</Text>

            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              placeholderTextColor="#8A9AB5"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}>
              <Text style={styles.eyeIcon}>
                {showPassword ? '◉' : '◌'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Remember + Forgot password */}
          <View style={styles.optionsRow}>

            <TouchableOpacity
              style={styles.rememberContainer}
              onPress={() => setRememberMe(!rememberMe)}>

              <View
                style={[
                  styles.checkbox,
                  rememberMe && styles.checkboxActive,
                ]}>
                {rememberMe && (
                  <Text style={styles.checkMark}>✓</Text>
                )}
              </View>

              <Text style={styles.rememberText}>
                Ghi nhớ đăng nhập
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.forgotPassword}>
                Quên mật khẩu?
              </Text>
            </TouchableOpacity>

          </View>

          {/* Login button */}
          <TouchableOpacity
            style={styles.loginButton}
            activeOpacity={0.8}
            onPress={handleLogin}>

            <Text style={styles.loginButtonText}>
              Đăng nhập
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />

            <Text style={styles.dividerText}>
              Hoặc đăng nhập bằng
            </Text>

            <View style={styles.divider} />
          </View>

          {/* Google / Microsoft */}
          <View style={styles.socialRow}>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleGoogleLogin}>

              <Text style={styles.googleIcon}>G</Text>

              <Text style={styles.socialText}>
                Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleMicrosoftLogin}>

              <View style={styles.microsoftIcon}>
                <View style={styles.msSquare} />
                <View style={styles.msSquare} />
                <View style={styles.msSquare} />
                <View style={styles.msSquare} />
              </View>

              <Text style={styles.socialText}>
                Microsoft
              </Text>
            </TouchableOpacity>

          </View>

          {/* Register */}
          <View style={styles.registerContainer}>

            <Text style={styles.registerText}>
              Hoặc
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}>

              <Text style={styles.registerButton}>
                Tạo tài khoản mới
              </Text>

            </TouchableOpacity>

          </View>

          {/* Footer */}
          <Text style={styles.footer}>
            Vận hành an toàn
          </Text>

        </View>
      </ScrollView>
    </SafeAreaView>
    </View>
    </ImageBackground>
  );
};

export default LoginScreen;