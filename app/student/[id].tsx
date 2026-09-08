import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function StudentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      style={styles.screen}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingTop: 20, paddingBottom: Math.max(insets.bottom + 24, 32) }
      ]}
    >
      {/* Tarjeta Credencial Minimalista */}
      <View className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mb-6" style={styles.card}>
        {/* Cabecera del Carné */}
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.subBrand}>RouteGo Campus</Text>
            <Text style={styles.cardSubtitle}>Pase Digital de Transporte</Text>
          </View>
          <View style={styles.activePill}>
            <Text style={styles.activePillText}>Activo 2026-I</Text>
          </View>
        </View>

        {/* Identificador Dinámico Destacado */}
        <View style={styles.idBox}>
          <Text style={styles.idLabel}>ID de Estudiante Detectado:</Text>
          <Text style={styles.idValue}>{id || 'No especificado'}</Text>
          <Text style={styles.idSubinfo}>Verificado por sistema NFC / QR</Text>
        </View>

        {/* Metadatos del Estudiante */}
        <View style={styles.metaContainer}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Modalidad de Acceso</Text>
            <Text style={styles.metaValue}>Shuttles Universitarios</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Cobertura de Rutas</Text>
            <Text style={styles.metaValue}>Red Completa (RN-01 a RN-04)</Text>
          </View>
          <View style={[styles.metaRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.metaLabel}>Estado de Cuenta</Text>
            <Text style={[styles.metaValue, { color: '#047857' }]}>Al día • Sin sanciones</Text>
          </View>
        </View>

        {/* Simulación de Código de Barras */}
        <View style={styles.barcodeSection}>
          <View style={styles.barcodeLines}>
            <View style={[styles.bar, { width: 4 }]} />
            <View style={[styles.bar, { width: 1 }]} />
            <View style={[styles.bar, { width: 6 }]} />
            <View style={[styles.bar, { width: 2 }]} />
            <View style={[styles.bar, { width: 8 }]} />
            <View style={[styles.bar, { width: 1 }]} />
            <View style={[styles.bar, { width: 5 }]} />
            <View style={[styles.bar, { width: 3 }]} />
            <View style={[styles.bar, { width: 6 }]} />
            <View style={[styles.bar, { width: 2 }]} />
            <View style={[styles.bar, { width: 7 }]} />
            <View style={[styles.bar, { width: 3 }]} />
          </View>
          <Text style={styles.barcodeText}>*{id}*</Text>
        </View>
      </View>

      {/* Nota técnica requerida por el taller */}
      <View style={styles.techNote}>
        <Text style={styles.techNoteText}>
          Esta pantalla leyó el parámetro dinámico desde el archivo{' '}
          <Text style={styles.techNoteBold}>[id].tsx</Text> mediante el hook{' '}
          <Text style={styles.techNoteBold}>useLocalSearchParams</Text>.
        </Text>
      </View>

      {/* Botón Volver */}
      <Pressable
        style={styles.btnBack}
        onPress={() => router.back()}
      >
        <Text style={styles.btnBackText}>Volver al Dashboard</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 18,
  },
  subBrand: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#000666',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  activePill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  activePillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#047857',
  },
  idBox: {
    alignItems: 'center',
    paddingVertical: 18,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 18,
  },
  idLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 6,
  },
  idValue: {
    fontSize: 32,
    fontWeight: '900',
    color: '#000666',
    letterSpacing: 0.5,
  },
  idSubinfo: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 6,
  },
  metaContainer: {
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  metaLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  metaValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  barcodeSection: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  barcodeLines: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    height: 40,
    marginBottom: 8,
  },
  bar: {
    height: 40,
    backgroundColor: '#0F172A',
    borderRadius: 1,
  },
  barcodeText: {
    fontSize: 11,
    fontFamily: 'monospace',
    letterSpacing: 3,
    color: '#64748B',
  },
  techNote: {
    backgroundColor: '#EEF2FF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    marginBottom: 20,
  },
  techNoteText: {
    fontSize: 12,
    color: '#000666',
    textAlign: 'center',
    lineHeight: 18,
  },
  techNoteBold: {
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  btnBack: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  btnBackText: {
    color: '#334155',
    fontWeight: '700',
    fontSize: 14,
  },
});
