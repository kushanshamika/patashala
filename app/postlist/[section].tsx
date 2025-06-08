import { MaterialIcons } from '@expo/vector-icons';
import { useRoute, useTheme } from '@react-navigation/native';
import { useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Post = {
  id: string;
  title: string;
  date: string;
};

const MOCK_POSTS: Post[] = [
  { id: '1', title: 'Term 1 Exam Results', date: '2025-06-01' },
  { id: '2', title: 'Science Exhibition Highlights', date: '2025-05-20' },
  { id: '3', title: 'Student of the Month', date: '2025-05-15' },
];

export default function PostListScreen() {
  const route = useRoute();
  const router = useRouter();
  const { colors } = useTheme();
  const { section } = route.params as { section: string };
  const navigation = useNavigation();
  const sectionTitle = section?.toString().replace(/([A-Z])/g, ' $1').trim();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: sectionTitle || 'Posts',
    });
  }, [navigation, sectionTitle]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
      color: colors.text,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      backgroundColor: colors.card,
      borderRadius: 8,
    },
    title: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
    },
    date: {
      fontSize: 12,
      color: colors.text,
      opacity: 0.6,
    },
    separator: {
      height: 12,
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={MOCK_POSTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
                key={item.id}
                onPress={() => router.push(`/post/${item.id}`)} 
                style={styles.item}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color={colors.text} />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}
