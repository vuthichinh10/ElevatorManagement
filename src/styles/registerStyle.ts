import {StyleSheet} from 'react-native';

export default StyleSheet.create({
safeArea: {
    flex: 1,
    backgroundColor: '#F7FBFF',
  },

  scrollContent: {
    flexGrow: 1,
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  backText: {
    fontSize: 32,
    color: '#123F91',
    lineHeight: 32,
  },

  backLabel: {
    color: '#123F91',
    fontSize: 14,
    marginLeft: 5,
  },

  logo: {
    width: 70,
    height: 70,
    backgroundColor: '#087FEA',
    borderRadius: 17,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  logoArrow: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 1,
  },

  elevatorDoor: {
    width: 38,
    height: 28,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    borderBottomWidth: 0,
    flexDirection: 'row',
  },

  doorLeft: {
    flex: 1,
    borderRightWidth: 1.5,
    borderColor: '#FFFFFF',
  },

  doorRight: {
    flex: 1,
    borderLeftWidth: 1.5,
    borderColor: '#FFFFFF',
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#123F91',
    textAlign: 'center',
  },

  subtitle: {
    textAlign: 'center',
    fontSize: 13,
    color: '#7185A5',
    marginTop: 4,
    marginBottom: 25,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#405A7D',
    marginBottom: 6,
  },

  inputContainer: {
    height: 48,
    borderWidth: 1,
    borderColor: '#C8DDF5',
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  inputIcon: {
    width: 45,
    textAlign: 'center',
    fontSize: 21,
    color: '#647FA6',
  },

  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#243B5A',
  },

  registerButton: {
    height: 48,
    backgroundColor: '#087FEA',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,

    elevation: 3,
  },

  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  loginText: {
    color: '#7185A5',
    fontSize: 13,
    marginRight: 5,
  },

  loginLink: {
    color: '#087FEA',
    fontSize: 13,
    fontWeight: '700',
  },

  footer: {
    textAlign: 'center',
    color: '#087FEA',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 35,
  },
});