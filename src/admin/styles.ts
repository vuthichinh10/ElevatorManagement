import {StyleSheet} from 'react-native';
import {colors} from '../ui/theme';

export default StyleSheet.create({
  screen: {flex: 1, backgroundColor: colors.white},
  content: {padding: 20, paddingBottom: 36},
  title: {fontSize: 25, fontWeight: '800', color: colors.navy, marginBottom: 5},
  subtitle: {fontSize: 13, color: colors.muted, marginBottom: 22},
  section: {fontSize: 17, fontWeight: '700', color: colors.navy, marginBottom: 10, marginTop: 10},
  card: {backgroundColor: colors.paleBlue, borderRadius: 11, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: colors.line},
  cardTitle: {fontSize: 16, fontWeight: '700', color: colors.navy},
  cardDetail: {fontSize: 12, color: colors.muted, marginTop: 5},
  label: {fontSize: 13, fontWeight: '700', color: colors.navy, marginBottom: 6},
  input: {backgroundColor: colors.white, borderWidth: 1, borderColor: '#BCD8F3', borderRadius: 7, paddingHorizontal: 12, minHeight: 46, color: colors.navy, marginBottom: 16},
  button: {backgroundColor: colors.blueDark, padding: 14, borderRadius: 7, alignItems: 'center', marginBottom: 12},
  buttonText: {fontSize: 16, fontWeight: '700', color: '#FFFFFF'},
  secondaryButton: {backgroundColor: colors.pale, padding: 12, borderRadius: 7, alignItems: 'center', marginTop: 8},
  secondaryText: {color: colors.blue, fontSize: 14, fontWeight: '700'},
  error: {color: '#B42318', marginBottom: 12},
});
