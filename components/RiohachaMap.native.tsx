import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, Callout } from 'react-native-maps';
import { RiohachaMapProps } from './RiohachaMap.types';

export default function RiohachaMap({
  initialRegion,
  coordinates,
  stops,
  shuttle,
  shuttleSpeed,
  shuttleUnit,
}: RiohachaMapProps) {
  return (
    <View style={styles.mapWrapper}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsCompass={true}
        showsScale={true}
      >
        {/* Trazado de la Ruta sobre las calles de Riohacha */}
        <Polyline
          coordinates={coordinates}
          strokeColor="#000666"
          strokeWidth={5}
        />

        {/* Paradas de la Ruta */}
        {stops.map((stop, index) => (
          <Marker
            key={`${stop.id}-${index}`}
            coordinate={stop.coordinate}
            title={stop.name}
            description={stop.isUniGuajira ? 'Campus Principal UniGuajira' : 'Parada de Transbordo'}
            pinColor={stop.isUniGuajira ? '#F59E0B' : '#000666'}
          >
            <Callout>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{stop.name}</Text>
                <Text style={styles.calloutSub}>
                  {stop.isUniGuajira ? '🎓 Sede Universitaria' : '🚌 Parada Oficial RouteGo'}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}

        {/* Marcador del Shuttle en Vivo */}
        <Marker
          coordinate={shuttle}
          title={`${shuttleUnit} en tiempo real`}
          description={`Velocidad: ${shuttleSpeed} • En trayecto`}
        >
          <View style={styles.busMarker}>
            <Text style={styles.busEmoji}>🚐</Text>
            <View style={styles.busBadge}>
              <Text style={styles.busBadgeText}>{shuttleSpeed}</Text>
            </View>
          </View>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapWrapper: {
    width: '100%',
    height: 350,
    backgroundColor: '#E2E8F0',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  callout: {
    padding: 6,
    minWidth: 130,
  },
  calloutTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000666',
  },
  calloutSub: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  busMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  busEmoji: {
    fontSize: 22,
  },
  busBadge: {
    backgroundColor: '#000666',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 4,
    marginTop: -2,
  },
  busBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
  },
});
