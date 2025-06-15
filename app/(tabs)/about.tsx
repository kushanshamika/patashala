import { db } from '@/firebase/config';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutPage() {
  const { colors } = useTheme();
  const [schoolInfo, setSchoolInfo] = useState<{
    logoUrl: string;
    name: string;
    address: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchoolInfo = async () => {
      try {
        const docRef = doc(collection(db, 'meta'), 'school');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSchoolInfo({
            logoUrl: data.logoUrl,
            name: data.name,
            address: data.address,
          });
        }
      } catch (error) {
        console.error('Failed to fetch school info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolInfo();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={[styles.container]}>
        <Text style={[styles.header, { color: colors.text }]}>About Patashala</Text>

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : schoolInfo ? (
          <View style={styles.schoolSection}>
            <Image source={{ uri: schoolInfo.logoUrl }} style={styles.logo} />
            <Text style={[styles.schoolName, { color: colors.text }]}>
              {schoolInfo.name}
            </Text>
            <View style={styles.row}>
              <Ionicons name="location-outline" size={20} color={colors.text} />
              <Text style={[styles.schoolAddress, { color: colors.text }]}>
                {schoolInfo.address}
              </Text>
            </View>
          </View>
        ) : (
          <Text style={{ color: colors.text }}>School information not available.</Text>
        )}

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>App Details</Text>
          <View style={styles.row}>
            <MaterialIcons name="apps" size={20} color={colors.text} />
            <Text style={[styles.infoText, { color: colors.text }]}>Patashala</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="information-circle-outline" size={20} color={colors.text} />
            <Text style={[styles.infoText, { color: colors.text }]}>
              An app to manage, record, and review school evaluation activities with multimedia support.
            </Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="mail-outline" size={20} color={colors.text} />
            <Text style={[styles.infoText, { color: colors.text }]}>shamikakushan@gmail.com</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="call-outline" size={20} color={colors.text} />
            <Text style={[styles.infoText, { color: colors.text }]}>+94 77 548 9485</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  schoolSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 12,
  },
  schoolName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  schoolAddress: {
    fontSize: 16,
    marginLeft: 6,
  },
  section: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
    flex: 1,
    flexWrap: 'wrap',
  },
});
