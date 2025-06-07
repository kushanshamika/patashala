import IconButton from '@/components/IconButton';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const items = [
  { label: 'Achievements', IconComponent: Ionicons, iconName: 'trophy-outline', screen: 'PostList', section: 'Achievements' },
  { label: 'Learning', IconComponent: MaterialCommunityIcons, iconName: 'school-outline', screen: 'PostList', section: 'Learning' },
  { label: 'Curriculum', IconComponent: FontAwesome5, iconName: 'book-open', screen: 'PostList', section: 'Curriculum' },
  { label: 'Activities', IconComponent: MaterialIcons, iconName: 'event', screen: 'PostList', section: 'Activities' },
  { label: 'Welfare', IconComponent: Ionicons, iconName: 'heart-circle-outline', screen: 'PostList', section: 'Welfare' },
  { label: 'Leadership', IconComponent: Entypo, iconName: 'users', screen: 'PostList', section: 'Leadership' },
  { label: 'Resources', IconComponent: Feather, iconName: 'archive', screen: 'PostList', section: 'Resources' },
  { label: 'Community', IconComponent: FontAwesome, iconName: 'handshake-o', screen: 'PostList', section: 'Community' },
  { label: 'Marks', IconComponent: MaterialIcons, iconName: 'grade', screen: 'PostList',  section: 'marks' },
];


export default function HomeScreen() {
  const router = useRouter();

  const handlePress = (section: string) => {
    
  router.push({
    pathname: '/postlist/[section]',
    params: { section },
  });
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={items}
        numColumns={3}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <IconButton
            IconComponent={item.IconComponent}
            iconName={item.iconName}
            label={item.label}
            onPress={() => handlePress(item.section)}
          />
        )}
        contentContainerStyle={styles.grid}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 12,
  },
  grid: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
});
