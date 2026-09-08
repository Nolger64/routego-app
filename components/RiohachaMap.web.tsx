import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RiohachaMapProps } from './RiohachaMap.types';

export default function RiohachaMap({
  shuttle,
  shuttleSpeed,
  shuttleUnit,
}: RiohachaMapProps) {
  // Embed interactivo de OpenStreetMap centrado en Riohacha
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=-72.9350%2C11.5150%2C-72.8650%2C11.5600&layer=mapnik&marker=${shuttle.latitude}%2C${shuttle.longitude}`;

  return (
    <View style={styles.mapWrapper}>
      <iframe
        src={osmUrl}
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Mapa de Riohacha en Web"
      />
      <View style={styles.floatingInfo}>
        <Text style={styles.floatingText}>
          🚐 {shuttleUnit} • {shuttleSpeed} • Riohacha (Web)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapWrapper: {
    width: '100%',
    height: 350,
    backgroundColor: '#E2E8F0',
    position: 'relative',
  },
  floatingInfo: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 6, 102, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 10,
  },
  floatingText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
