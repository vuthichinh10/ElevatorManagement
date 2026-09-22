import {StyleSheet} from 'react-native';

export default StyleSheet.create({

  background: {
    flex: 1,
    // width: '100%',
    // height: '100%',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(235, 246, 255, 0.9)',
  },

  safeArea: {
    flex: 1,
    //backgroundColor: '#F7FBFF',
  },

scrollContent: {
  paddingHorizontal: 24,
  paddingBottom: 30,
},

container: {
  paddingTop: 25,
  paddingBottom: 30,
},

  logo: {
    width: 76,
    height: 76,
    backgroundColor: '#087FEA',
    borderRadius: 18,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,

    elevation: 5,
    shadowColor: '#087FEA',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  logoArrow: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },

  elevatorDoor: {
    width: 40,
    height: 30,
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

  appTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#123F91',
    textAlign: 'center',
  },

  appSubtitle: {
    fontSize: 13,
    color: '#7185A5',
    textAlign: 'center',
    marginTop: 3,
    marginBottom: 25,
  },

  loginHeader: {
    marginBottom: 18,
  },

  loginTitle: {
    fontSize: 27,
    fontWeight: '700',
    color: '#123F91',
    marginBottom: 5,
  },

  welcomeText: {
    fontSize: 15,
    color: '#61789F',
    marginBottom: 2,
  },

  description: {
    fontSize: 12,
    color: '#7185A5',
  },

  inputContainer: {
    height: 48,
    borderWidth: 1,
    borderColor: '#C8DDF5',
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  inputIcon: {
    width: 45,
    textAlign: 'center',
    fontSize: 22,
    color: '#647FA6',
  },

  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#243B5A',
  },

  eyeButton: {
    width: 45,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  eyeIcon: {
    fontSize: 22,
    color: '#647FA6',
  },

  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 17,
  },

  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#A9C4E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
  },

  checkboxActive: {
    backgroundColor: '#087FEA',
    borderColor: '#087FEA',
  },

  checkMark: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },

  rememberText: {
    fontSize: 12,
    color: '#61789F',
  },

  forgotPassword: {
    fontSize: 12,
    color: '#087FEA',
    fontWeight: '600',
  },

  loginButton: {
    height: 48,
    borderRadius: 8,
    backgroundColor: '#087FEA',
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 3,
    shadowColor: '#087FEA',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#C8DDF5',
  },

  dividerText: {
    color: '#7890B2',
    fontSize: 12,
    marginHorizontal: 10,
  },

  socialRow: {
    flexDirection: 'row',
    gap: 10,
  },

  socialButton: {
    flex: 1,
    height: 46,
    borderWidth: 1,
    borderColor: '#C8DDF5',
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  googleIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4285F4',
    marginRight: 10,
  },

  microsoftIcon: {
    width: 18,
    height: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
    marginRight: 9,
  },

  msSquare: {
    width: 8,
    height: 8,
    backgroundColor: '#1479E8',
  },

  socialText: {
    color: '#526987',
    fontSize: 13,
    fontWeight: '600',
  },

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },

  registerText: {
    color: '#7185A5',
    fontSize: 12,
    marginRight: 5,
  },

  registerButton: {
    color: '#087FEA',
    fontSize: 12,
    fontWeight: '700',
  },

  footer: {
    textAlign: 'center',
    color: '#087FEA',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 30,
  },
});