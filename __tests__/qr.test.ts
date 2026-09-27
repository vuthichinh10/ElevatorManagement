import {elevatorIdFromQr} from '../src/technician/qr';

test('reads an elevator ID or elevator URL from a QR code', () => {
  expect(elevatorIdFromQr(' 29A1-0001-01 ')).toBe('29A1-0001-01');
  expect(elevatorIdFromQr('https://example.com/elevators/29A1-0002-01')).toBe('29A1-0002-01');
  expect(elevatorIdFromQr('https://example.com/unrelated')).toBeNull();
});
