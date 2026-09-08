import { Link, Stack } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: '¡Página no encontrada!' }} />
      <View style={styles.container}>
        <Text style={styles.code}>404</Text>
        <Text style={styles.title}>Ruta no disponible</Text>
        <Text style={styles.subtitle}>
          La pantalla a la que intentas acceder no existe en la red RouteGo.
        </Text>
        <Link href="/" style={styles.btn}>
          <Text style={styles.btnText}>Ir a la pantalla de inicio</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    padding: 24,
  },
  code: {
    fontSize: 54,
    fontWeight: '900',
    color: '#000666',
    letterSpacing: -2,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    maxWidth: 260,
    marginBottom: 24,
    lineHeight: 18,
  },
  btn: {
    backgroundColor: '#000666',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 12,
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
