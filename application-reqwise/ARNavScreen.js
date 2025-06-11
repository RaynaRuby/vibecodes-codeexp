import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

export default function ARNavigationScreen({ route, navigation }) {
  const { destinationLat = 1.27, destinationLon = 103.84 } = route.params || {}; // Singapore General Hospital
  const [permission, requestPermission] = useCameraPermissions();
  const [heading, setHeading] = useState(0);
  const [location, setLocation] = useState(null);
  const arrowRotation = useRef(new Animated.Value(0)).current;
  const { destinationType = 'destination' } = route.params || {};


  // Permissions
  useEffect(() => {
    (async () => {
      if (!permission) await requestPermission();
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        Location.watchPositionAsync(
          { accuracy: Location.Accuracy.Balanced, distanceInterval: 1 },
          pos => setLocation(pos.coords)
        );
      }
    })();
  }, []);

  // Compass listener
  useEffect(() => {
    Magnetometer.setUpdateInterval(100);
    const sub = Magnetometer.addListener(({ x, y }) => {
      let angle = Math.atan2(y, x) * (180 / Math.PI);
      angle = angle >= 0 ? angle : 360 + angle;
      setHeading(angle);
    });
    return () => sub.remove();
  }, []);

  // Bearing calculation
  const getBearing = () => {
    if (!location) return 0;

    const toRad = deg => deg * (Math.PI / 180);
    const toDeg = rad => rad * (180 / Math.PI);

    const lat1 = toRad(location.latitude);
    const lon1 = toRad(location.longitude);
    const lat2 = toRad(destinationLat);
    const lon2 = toRad(destinationLon);

    const dLon = lon2 - lon1;
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

    let brng = toDeg(Math.atan2(y, x));
    return (brng + 360) % 360;
  };

  // Animate arrow
  useEffect(() => {
    const bearing = getBearing();
    const rotation = (bearing - heading + 360) % 360;

    Animated.timing(arrowRotation, {
      toValue: rotation,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [heading, location]);

  if (!permission?.granted) {
    return (
      <View style={styles.loading}>
        <Text>Requesting camera permissions…</Text>
      </View>
    );
  }

  const rotateStyle = {
    transform: [
      {
        rotate: arrowRotation.interpolate({
          inputRange: [0, 360],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <CameraView style={StyleSheet.absoluteFill} facing="back" />

      {/* Flat arrow overlay */}
      <Animated.View style={[styles.arrowOverlay, rotateStyle]}>
        <Ionicons name="arrow-up" size={200} color="#00f" />
      </Animated.View>

      {/* Labels */}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Walk toward the {destinationType}</Text>
        <Text style={styles.label}>100m then turn RIGHT</Text>
      </View>

      {/* Close */}
      <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
        <Ionicons name="close" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  arrowOverlay: {
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
  },
  label: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 20,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

