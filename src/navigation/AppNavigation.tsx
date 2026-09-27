import React from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import OwnerHome from '../screens/OwnerHome';
import ElevatorInfo from '../screens/ElevatorInfo';
import TechnicalInfo from '../screens/TechnicalInfo';
import Inspections from '../screens/Inspections';
import ServiceHistory from '../screens/ServiceHistory';
import HomeScreen from '../screens/Home';
import AdminHome from '../screens/AdminHome';
import AdminElevators from '../screens/AdminElevators';
import AdminElevatorForm from '../screens/AdminElevatorForm';
import AdminUsers from '../screens/AdminUsers';
import AdminUserForm from '../screens/AdminUserForm';
import AdminElevatorActions from '../screens/AdminElevatorActions';
import AdminRecordForm from '../screens/AdminRecordForm';
import TechnicianHome from '../screens/TechnicianHome';
import TechnicianElevator from '../screens/TechnicianElevator';
import TechnicianScanner from '../screens/TechnicianScanner';
import TechnicianSettings from '../screens/TechnicianSettings';
import TechnicianRecords from '../screens/TechnicianRecords';
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  OwnerHome: undefined;
  TechnicianHome: undefined;
  TechnicianElevator: {elevatorId: string};
  TechnicianScanner: undefined;
  TechnicianSettings: undefined;
  TechnicianRecords: {elevatorId: string; kind: 'inspection' | 'service'};
  AdminHome: undefined;
  AdminElevators: undefined;
  AdminElevatorForm: {elevatorId?: string} | undefined;
  AdminUsers: undefined;
  AdminUserForm: {userId?: number; role?: 'owner' | 'technician'} | undefined;
  AdminElevatorActions: {elevatorId: string};
  AdminRecordForm: {elevatorId: string; kind: 'inspection' | 'service'; recordId?: number};
  ElevatorInfo: {elevatorId?: string} | undefined;
  TechnicalInfo: {elevatorId?: string} | undefined;
  Inspections: {elevatorId?: string} | undefined;
  ServiceHistory: {elevatorId?: string} | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          
        />      
        <Stack.Screen
          name="OwnerHome"
          component={OwnerHome}
        />
        <Stack.Screen name="TechnicianHome" component={TechnicianHome} />
        <Stack.Screen name="TechnicianElevator" component={TechnicianElevator} />
        <Stack.Screen name="TechnicianScanner" component={TechnicianScanner} />
        <Stack.Screen name="TechnicianSettings" component={TechnicianSettings} />
        <Stack.Screen name="TechnicianRecords" component={TechnicianRecords} />
        <Stack.Screen name="AdminHome" component={AdminHome} />
        <Stack.Screen name="AdminElevators" component={AdminElevators} />
        <Stack.Screen name="AdminElevatorForm" component={AdminElevatorForm} />
        <Stack.Screen name="AdminUsers" component={AdminUsers} />
        <Stack.Screen name="AdminUserForm" component={AdminUserForm} />
        <Stack.Screen name="AdminElevatorActions" component={AdminElevatorActions} />
        <Stack.Screen name="AdminRecordForm" component={AdminRecordForm} />
         <Stack.Screen
          name="ElevatorInfo"
          component={ElevatorInfo}
        />
         <Stack.Screen
          name="TechnicalInfo"
          component={TechnicalInfo}
        />
         <Stack.Screen
          name="Inspections"
          component={Inspections}
        />
         <Stack.Screen
          name="ServiceHistory"
          component={ServiceHistory}
/>

      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default AppNavigator;
