import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Camera, useCameraDevice, useCameraPermission, useCodeScanner} from 'react-native-vision-camera';
import {color} from './style';

//
// QR Code Scanner
//

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: color.black,
  },
  scanner: {
    flex: 1,
  },
});

export const QRCodeScanner = ({onCodeScanned, style}) => {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const codeScanner = useCodeScanner({codeTypes: ['qr'], onCodeScanned});
  if (!hasPermission) {
    requestPermission();
    return <View style={[styles.wrapper, style]} />;
  }
  if (device == null) {
    return <View style={[styles.wrapper, style]} />;
  }
  return (
    <View style={[styles.wrapper, style]}>
      <Camera
        style={styles.scanner}
        codeScanner={codeScanner}
        device={device}
        isActive={true}
      />
      <Corners />
    </View>
  );
};

//
// Corners
//

const cornerStyles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 75,
  },
  corners: {
    height: 250,
    width: 250,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  corner: {
    height: 30,
    width: 30,
    borderColor: color.white,
  },
  topLeft: {
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  topRight: {
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  bottomLeft: {
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  bottomRight: {
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
});

const Corners = () => (
  <View style={[StyleSheet.absoluteFill, cornerStyles.wrapper]}>
    <View style={cornerStyles.corners}>
      <View style={cornerStyles.row}>
        <View style={[cornerStyles.corner, cornerStyles.topLeft]} />
        <View style={[cornerStyles.corner, cornerStyles.topRight]} />
      </View>
      <View style={cornerStyles.row}>
        <View style={[cornerStyles.corner, cornerStyles.bottomLeft]} />
        <View style={[cornerStyles.corner, cornerStyles.bottomRight]} />
      </View>
    </View>
  </View>
);
