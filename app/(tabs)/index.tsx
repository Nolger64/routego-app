import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Link, useRouter, Href } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      style={styles.screen}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingTop: Math.max(insets.top + 16, 32), paddingBottom: Math.max(insets.bottom + 24, 32) }
      ]}
    >
      {/* Header Minimalista */}
      <View className="mb-6" style={styles.header}>
        <View className="flex-row items-center justify-between mb-3" style={styles.topRow}>
          <View className="bg-indigo-50 px-3 py-1 rounded-full" style={styles.systemBadge}>
            <Text className="text-xs font-bold uppercase tracking-wider text-[#000666]" style={styles.systemBadgeText}>
              RouteGo System
            </Text>
          </View>
          <View className="flex-row items-center" style={styles.statusOnline}>
            <View className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5" style={styles.onlineDot} />
            <Text className="text-xs font-medium text-slate-500" style={styles.onlineText}>En línea</Text>
          </View>
        </View>
        <Text className="text-3xl font-extrabold text-[#000666] tracking-tight" style={styles.title}>
          RouteGo - Dashboard
        </Text>
        <Text className="text-sm text-slate-500 mt-1" style={styles.subtitle}>
          Bienvenido al sistema de transporte inteligente
        </Text>
      </View>

      {/* Tarjeta de Próxima Llegada */}
      <View className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm mb-6" style={styles.shuttleCard}>
        <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" style={styles.cardCaption}>
          Próximo Shuttle Campus
        </Text>
        <View className="flex-row items-baseline justify-between mb-1" style={styles.cardHeader}>
          <Text className="text-xl font-bold text-slate-900" style={styles.routeName}>
            Ruta Norte 01
          </Text>
          <View className="bg-emerald-50 px-2.5 py-0.5 rounded-md" style={styles.timeBadge}>
            <Text className="text-xs font-bold text-emerald-700" style={styles.timeBadgeText}>
              Llega en 4 min
            </Text>
          </View>
        </View>
        <Text className="text-xs text-slate-500" style={styles.routeDetails}>
          Parada Central • Shuttle Eléctrico #12
        </Text>
      </View>

      {/* Contenedor de Botones de Navegación del Taller */}
      <View style={styles.actionsContainer}>
        <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3" style={styles.sectionLabel}>
          Acciones de Navegación
        </Text>

        {/* 1. Navegación a Modal usando Link */}
        <Link href="/modal" asChild>
          <Pressable
            className="bg-amber-500 active:bg-amber-600 p-4 rounded-xl mb-3 shadow-sm"
            style={styles.btnWarning}
          >
            <View>
              <Text className="text-white font-bold text-base" style={styles.btnText}>
                Ver Estado de Shuttles (Modal)
              </Text>
              <Text className="text-amber-100 text-xs mt-0.5" style={styles.btnSubtext}>
                Ventana modal con información de servicio
              </Text>
            </View>
            <Text className="text-white font-bold text-lg" style={styles.btnArrow}>↗</Text>
          </Pressable>
        </Link>

        {/* 2. Navegación programática pasando un parámetro ID */}
        <Pressable
          className="bg-[#000666] active:bg-[#000444] p-4 rounded-xl mb-3 shadow-sm"
          style={styles.btnPrimary}
          onPress={() => router.push('/student/ST-202688' as Href)}
        >
          <View>
            <Text className="text-white font-bold text-base" style={styles.btnText}>
              Ver Perfil Estudiante ST-202688
            </Text>
            <Text className="text-indigo-200 text-xs mt-0.5" style={styles.btnSubtext}>
              Ruta dinámica con parámetro [id]
            </Text>
          </View>
          <Text className="text-white font-bold text-lg" style={styles.btnArrow}>→</Text>
        </Pressable>

        {/* 3. Navegación alternativa con otro ID */}
        <Pressable
          className="bg-white border border-slate-200 p-3.5 rounded-xl"
          style={styles.btnSecondary}
          onPress={() => router.push('/student/ST-202714' as Href)}
        >
          <View>
            <Text className="text-slate-800 font-semibold text-sm" style={styles.btnSecondaryText}>
              Ver Perfil Estudiante ST-202714
            </Text>
            <Text className="text-slate-400 text-xs" style={styles.btnSecondarySubtext}>
              Probar otro identificador dinámico
            </Text>
          </View>
          <Text className="text-slate-400 text-sm font-bold" style={styles.btnSecondaryArrow}>→</Text>
        </Pressable>
      </View>
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
  header: {
    marginBottom: 24,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  systemBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  systemBadgeText: {
    color: '#000666',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  statusOnline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  onlineText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '500',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#000666',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  shuttleCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardCaption: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  routeName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  timeBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  timeBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#047857',
  },
  routeDetails: {
    fontSize: 12,
    color: '#64748B',
  },
  actionsContainer: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  btnWarning: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  btnPrimary: {
    backgroundColor: '#000666',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000666',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  btnSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    marginTop: 2,
  },
  btnArrow: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnSecondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnSecondaryText: {
    color: '#1E293B',
    fontSize: 14,
    fontWeight: '600',
  },
  btnSecondarySubtext: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },
  btnSecondaryArrow: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
