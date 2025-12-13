import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { useTheme } from '../../../context/ThemeContext';

export default function Notification() {
  const router = useRouter();
  const { colors } = useTheme();

  const backimg = require("@/assets/images/back.png");
  const headerlogo = require("@/assets/images/headerlogo.png");
  const feature = require("@/assets/images/feature.png");

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.replace('/(admin)/menu')}>
          <Image source={backimg} style={styles.backicon} />
        </Pressable>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>
      <View style={[styles.separator, { backgroundColor: colors.border }]} />

      <ScrollView style={styles.mainContent}>
        <View style={[styles.notifcontainer, { backgroundColor: colors.card }]}>
          <View style={styles.notifheader}>
            <Image source={feature} style={styles.notificon} />
            <Text style={[styles.notifheaderText, { color: colors.text }]}>Feature Added!</Text>
          </View>
          <View style={styles.notifdescription}>
            <Text style={[styles.notifdescriptiontext, { color: colors.subText }]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nam sagittis sed elit sed ultrices. Proin sed eleifend nisl.
              Phasellus eu laoreet nulla, quis volutpat lorem. Maecenas dui mi,
              faucibus vel sollicitudin ut, malesuada et justo.
            </Text>
          </View>
        </View>

        <View style={[styles.notifcontainer, { backgroundColor: colors.card }]}>
          <View style={styles.notifheader}>
            <Image source={feature} style={styles.notificon} />
            <Text style={[styles.notifheaderText, { color: colors.text }]}>Patches 1.2</Text>
          </View>
          <View style={styles.notifdescription}>
            <Text style={[styles.notifdescriptiontext, { color: colors.subText }]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nam sagittis sed elit sed ultrices. Proin sed eleifend nisl.
              Phasellus eu laoreet nulla, quis volutpat lorem. Maecenas dui mi,
              faucibus vel sollicitudin ut, malesuada et justo.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 12,
    paddingTop: 12,
    marginTop: verticalScale(30),
  },
  backicon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  logo: {
    width: 120,
    height: 28,
    resizeMode: 'contain',
  },
  separator: {
    height: 1,
    width: '100%',
    marginBottom: 1,
  },
  placeholder: {
    width: 24,
  },
  mainContent: {
    flex: 1,
    padding: 15,
    marginTop: verticalScale(8),
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    color: '#0AB3FF',
  },
  notifcontainer: {
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
  },
  notifheader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  notificon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 12,
  },
  notifheaderText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  notifdescription: {
    paddingLeft: 44,
  },
  notifdescriptiontext: {
    fontFamily: 'Roboto-Light',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'justify',
  },
});
