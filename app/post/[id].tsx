import PostVideo from '@/components/PostVideo';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SinglePostView() {
  const { id } = useLocalSearchParams(); // post ID
  const { colors } = useTheme();
  const navigation = useNavigation();

  // 🔁 Replace with Firestore fetch in future
  const post = {
    title: "Annual Science Fair 2025",
    postedDate: "June 1, 2025",
    description: "Our students showcased innovative projects ranging from sustainable energy to robotics. This event was a celebration of creativity and learning.",
    images: [
      'https://picsum.photos/id/1/300/200',
      'https://picsum.photos/id/2/300/200',
    ],
    videos: [
      'https://videos.pexels.com/video-files/5752729/5752729-uhd_2560_1440_30fps.mp4',
      'https://videos.pexels.com/video-files/3735743/3735743-hd_1920_1080_25fps.mp4'
    ],
    pdfs: [
      { name: 'Event Report', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      { name: 'Evaluation Form', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
    ]
  };

  const sectionTitle = post.title?.toString().replace(/([A-Z])/g, ' $1').trim();

    useLayoutEffect(() => {
      navigation.setOptions({
        title: sectionTitle || 'Posts',
      });
    }, [navigation, sectionTitle]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ padding: 16}}>
        <Text style={{ marginVertical: 4, color: colors.text }}>
          📅 {post.postedDate}
        </Text>
        <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 16, color: colors.text }}>
          {post.description}
        </Text>

        {/* 🔹 Image Gallery */}
        {post.images?.length > 0 && (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontWeight: '600', fontSize: 18, marginBottom: 10, color: colors.text }}>
              📷 Image Gallery
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {post.images.map((img, index) => (
                <Image
                  key={index}
                  source={{ uri: img }}
                  style={{ width: 300, height: 200, marginRight: 12, borderRadius: 12 }}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* 🔹 Videos */}
        {post.videos?.length > 0 && (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontWeight: '600', fontSize: 18, marginBottom: 10, color: colors.text }}>
              🎥 Videos
            </Text>
              {post.videos.map((vid, index) => (
                <View key={index}>
                  <PostVideo videoUrl={vid}></PostVideo>
                </View>
              ))}
          </View>
        )}

        {/* 🔹 PDFs */}
        {post.pdfs?.length > 0 && (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontWeight: '600', fontSize: 18, marginBottom: 10, color: colors.text }}>
              📄 Documents
            </Text>
            {post.pdfs.map((pdf, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => Linking.openURL(pdf.url)}
                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}
              >
                <MaterialIcons name="picture-as-pdf" size={24} color={colors.primary} />
                <Text style={{ marginLeft: 8, color: colors.primary }}>{pdf.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});
