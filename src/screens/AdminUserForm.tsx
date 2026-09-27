import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/AppNavigation';
import {adminRequest, Elevator, ManagedUser} from '../admin/api';
import styles from '../admin/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminUserForm'>;

const AdminUserForm = ({navigation, route}: Props) => {
  const userId = route.params?.userId;
  const [role, setRole] = useState<'owner' | 'technician'>(route.params?.role || 'technician');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [elevatorId, setElevatorId] = useState('');
  const [elevators, setElevators] = useState<Elevator[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      adminRequest<Elevator[]>('/elevators'),
      userId ? adminRequest<ManagedUser[]>('/users') : Promise.resolve([]),
    ]).then(([elevatorList, users]) => {
      setElevators(elevatorList);
      if (userId) {
        const user = users.find(item => item.id === userId);
        if (!user || user.role === 'admin') throw new Error('Không tìm thấy tài khoản có thể phân quyền.');
        setUsername(user.username);
        setRole(user.role);
        setEmployeeId(user.employeeId || '');
        setElevatorId(user.elevatorId || '');
      }
    }).catch(err => setError(err.message)).finally(() => setLoading(false));
  }, [userId]);

  const save = async () => {
    if ((!userId && (!username.trim() || !password)) ||
        (role === 'technician' && !employeeId.trim()) ||
        (role === 'owner' && !elevatorId)) {
      setError('Vui lòng nhập đầy đủ thông tin bắt buộc.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await adminRequest(userId ? `/users/${userId}` : '/users', {
        method: userId ? 'PATCH' : 'POST',
        body: JSON.stringify({username: username.trim(), password, role,
          employeeId: role === 'technician' ? employeeId.trim() : null,
          elevatorId: role === 'owner' ? elevatorId : null}),
      });
      navigation.goBack();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể lưu tài khoản.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>{userId ? 'Phân quyền tài khoản' : role === 'technician' ? 'Tạo tài khoản kỹ thuật viên' : 'Tạo tài khoản chủ sở hữu'}</Text>
      <Text style={styles.subtitle}>{userId ? 'Chọn quyền và thông tin tương ứng' : 'Nhập thông tin tài khoản'}</Text>
      {loading ? <ActivityIndicator color="#135FC4" /> : <>
        {!userId && <>
          <Text style={styles.label}>Tên đăng nhập</Text>
          <TextInput style={styles.input} autoCapitalize="none" value={username} onChangeText={setUsername} />
          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
        </>}
        {!!userId && <Text style={styles.section}>{username}</Text>}
        {!!userId && <>
          <Text style={styles.label}>Vai trò</Text>
          <View style={{flexDirection: 'row', gap: 10, marginBottom: 16}}>
            {(['technician', 'owner'] as const).map(value => (
              <TouchableOpacity key={value} style={[styles.secondaryButton, {flex: 1, backgroundColor: role === value ? '#135FC4' : '#E5F2FF'}]} onPress={() => setRole(value)}>
                <Text style={[styles.secondaryText, role === value && {color: '#FFFFFF'}]}>{value === 'owner' ? 'Chủ sở hữu' : 'Kỹ thuật viên'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>}
        {role === 'technician' ? <>
          <Text style={styles.label}>Mã nhân viên</Text>
          <TextInput style={styles.input} value={employeeId} onChangeText={setEmployeeId} />
        </> : <>
          <Text style={styles.label}>Thang máy được phân quyền</Text>
          {elevators.length === 0 && <Text style={styles.error}>Chưa có thang máy. Hãy tạo thang máy trước.</Text>}
          {elevators.map(item => (
            <TouchableOpacity key={item.elevatorId} style={[styles.card, elevatorId === item.elevatorId && {borderColor: '#135FC4', borderWidth: 2}]} onPress={() => setElevatorId(item.elevatorId)}>
              <Text style={styles.cardTitle}>{item.elevatorId}</Text>
              <Text style={styles.cardDetail}>{item.owner}</Text>
            </TouchableOpacity>
          ))}
        </>}
        {!!error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity style={styles.button} onPress={save} disabled={saving}>
          <Text style={styles.buttonText}>{saving ? 'Đang lưu...' : 'Lưu tài khoản'}</Text>
        </TouchableOpacity>
      </>}
      {loading && !!error && <Text style={styles.error}>{error}</Text>}
    </ScrollView>
  );
};

export default AdminUserForm;
