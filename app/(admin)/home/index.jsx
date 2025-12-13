import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Image, RefreshControl, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { PieChart } from 'react-native-chart-kit';
import { verticalScale } from 'react-native-size-matters';
import supabase from '../../../lib/supabase';
import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

const screenWidth = Dimensions.get("window").width;

export default function AdminHome() {
  const money = require("@/assets/images/money.png");
  const cart = require("@/assets/images/cart.png");
  const logo = require("@/assets/images/headerlogo.png");

  // Theme Colors
  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const subTextColor = useThemeColor({}, 'subText');
  const borderColor = useThemeColor({}, 'border');
  const tintColor = useThemeColor({}, 'tint');

  // Dropdown State
  const [open, setOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState('Month');
  const [items, setItems] = useState([
    { label: 'Today', value: 'Current' },
    { label: 'This Week', value: 'Week' },
    { label: 'This Month', value: 'Month' },
    { label: 'Last Month', value: 'LastMonth' },
  ]);

  // Data State
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    total_revenue: 0,
    total_commission: 0,
    total_orders: 0,
    active_users: 0,
    chart_data: []
  });

  // --- FETCH FUNCTION ---
  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_admin_dashboard_stats', {
        time_range: timeFilter
      });

      if (error) throw error;

      if (data) {
        setStats(data);
      }
    } catch (err) {
      console.error("Dashboard Error:", err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [timeFilter]);

  // Initial Load
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchStats();
  };

  // --- CHART DATA PREPARATION ---
  const getChartData = () => {
    if (!stats.chart_data || stats.chart_data.length === 0) {
      return [{ name: "No Data", population: 1, color: "#444", legendFontColor: "#AAA", legendFontSize: 12 }];
    }

    const colorMap = {
      'completed': '#2ECC71',
      'cancelled': '#E74C3C',
      'pending': '#F1C40F',
      'accepted': '#9B59B6',
      'ongoing': '#3498DB',
    };

    return stats.chart_data.map(item => ({
      name: item.status,
      population: Number(item.count),
      color: colorMap[item.status] || '#BDC3C7',
      legendFontColor: textColor,
      legendFontSize: 12
    }));
  };

  const chartConfig = {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={tintColor} />}
        nestedScrollEnabled={true}
      >
        {/* Filter Dropdown */}
        <View style={styles.filterContainer}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Overview</Text>
          <View style={styles.dropdownWrapper}>
            <DropDownPicker
              open={open}
              value={timeFilter}
              items={items}
              setOpen={setOpen}
              setValue={setTimeFilter}
              setItems={setItems}
              style={[styles.dropdown, { backgroundColor: cardColor, borderColor: borderColor }]}
              textStyle={[styles.dropdownText, { color: tintColor }]}
              dropDownContainerStyle={[styles.dropdownList, { backgroundColor: cardColor, borderColor: borderColor }]}
              placeholder="Select Period"
              zIndex={3000}
              listMode="SCROLLVIEW"
              scrollViewProps={{
                nestedScrollEnabled: true,
              }}
              theme={backgroundColor === '#141519' ? 'DARK' : 'LIGHT'}
            />
          </View>
        </View>

        {/* --- SUMMARY CARDS --- */}
        <View style={styles.cardsContainer}>
          {/* Revenue Card */}
          <View style={[styles.card, { backgroundColor: cardColor, borderColor: borderColor }]}>
            <View style={styles.cardIconBg}>
              <Image source={money} style={styles.cardIcon} />
            </View>
            <View>
              <Text style={[styles.cardLabel, { color: subTextColor }]}>Total Revenue</Text>
              <Text style={styles.cardValue}>₱ {stats.total_revenue?.toFixed(2)}</Text>
              <Text style={[styles.cardSub, { color: subTextColor }]}>Comm: ₱ {stats.total_commission?.toFixed(2)}</Text>
            </View>
          </View>

          {/* Orders Card */}
          <View style={[styles.card, { backgroundColor: cardColor, borderColor: borderColor }]}>
            <View style={[styles.cardIconBg, { backgroundColor: 'rgba(52, 152, 219, 0.2)' }]}>
              <Image source={cart} style={[styles.cardIcon, { tintColor: '#3498DB' }]} />
            </View>
            <View>
              <Text style={[styles.cardLabel, { color: subTextColor }]}>Total Orders</Text>
              <Text style={[styles.cardValue, { color: '#3498DB' }]}>{stats.total_orders}</Text>
              <Text style={[styles.cardSub, { color: subTextColor }]}>{timeFilter} Period</Text>
            </View>
          </View>
        </View>

        {/* --- PIE CHART --- */}
        <View style={[styles.chartContainer, { backgroundColor: cardColor, borderColor: borderColor }]}>
          <Text style={[styles.chartTitle, { color: textColor }]}>Order Status Distribution</Text>
          {loading ? (
            <ActivityIndicator size="large" color={tintColor} style={{ marginTop: 20 }} />
          ) : (
            <PieChart
              data={getChartData()}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              center={[10, 0]}
              absolute
            />
          )}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', marginTop: verticalScale(40), marginBottom: 10 },
  logo: { width: 120, height: 28, resizeMode: 'contain' },
  scrollContent: { padding: 20 },

  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 3000
  },
  sectionTitle: { fontSize: 24, fontWeight: 'bold' },
  dropdownWrapper: { width: 140 },
  dropdown: { minHeight: 40 },
  dropdownText: { fontSize: 12 },
  dropdownList: {},

  cardsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25, zIndex: 1000 },
  card: {
    width: '48%',
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    flexDirection: 'column',
    gap: 10
  },
  cardIconBg: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: 'rgba(59, 245, 121, 0.15)',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 5
  },
  cardIcon: { width: 20, height: 20, resizeMode: 'contain', tintColor: '#3BF579' },
  cardLabel: { fontSize: 12 },
  cardValue: { color: '#3BF579', fontSize: 20, fontWeight: 'bold' },
  cardSub: { fontSize: 10 },

  chartContainer: {
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 100
  },
  chartTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, alignSelf: 'flex-start' }
});