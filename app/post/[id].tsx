import PostVideo from '@/components/PostVideo';
import { db, storage } from '@/firebase/config';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SinglePostView() {
  const { id } = useLocalSearchParams(); // post ID
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [imgLoading, setImgLoading] = useState(true);

    useEffect(() => {
      const fetchPost = async () => {
        try {
          const docRef = doc(db, 'posts', id as string);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setPost(docSnap.data());
            
          } else {
            console.warn('No such document!');
          }
        } catch (error) {
          console.error('Error fetching post:', error);
        } finally {
          setLoading(false);
        }
      };

      if (id) fetchPost();
    }, [id]);

    useLayoutEffect(() => {
      if (post?.title) {
        const sectionTitle = post.title.toString().replace(/([A-Z])/g, ' $1').trim();
        navigation.setOptions({
          title: sectionTitle,
        });
      } else {
        navigation.setOptions({ title: 'Posts' });
      }
    }, [navigation, post?.title]);

    if (loading) {
      return <ActivityIndicator style={{ marginTop: 40 }} />;
    }

    if (!post) {
      return <Text style={{ margin: 20, color: colors.text }}>Post not found.</Text>;
    }

  const deleteMediaFiles = async (urls: string[], folder: string) => {
    const deletions = urls.map(async (url) => {
      try {
        const filePath = decodeURIComponent(url.split(`/${folder}%2F`)[1].split('?')[0]);
        const fileRef = ref(storage, `${folder}/${filePath}`);
        await deleteObject(fileRef);
      } catch (error) {
        console.warn(`Failed to delete ${folder} file:`, error);
      }
    });
    await Promise.all(deletions);
  };

  const handleDelete = async () => {
    Alert.alert('Delete Post', 'Are you sure you want to delete this post?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            if (!post) return;

            await Promise.all([
              deleteMediaFiles(post.images || [], 'images'),
              deleteMediaFiles(post.videos || [], 'videos'),
              deleteMediaFiles(post.pdfs || [], 'pdfs'),
            ]);

            await deleteDoc(doc(db, 'posts', id as string));
            alert('Post deleted successfully');
            router.back();
          } catch (error) {
            console.error('Failed to delete post:', error);
            alert('Failed to delete post');
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ padding: 16}}>
        <Text style={{ marginVertical: 4, color: colors.text }}>
          📅 {post.createdAt?.seconds
              ? new Date(post.createdAt.seconds * 1000).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Unknown Date'}
        </Text>
        <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 16, color: colors.text }}>
          {post.description}
        </Text>

        {post.images?.length > 0 && (
          <Text style={{ marginVertical: 4, color: colors.text }}>📷 Image Gallery</Text>
        )}

        {post.images?.map((uri: string, index: number) => {
          
          return (
            <View key={index} style={{ marginBottom: 12, position: 'relative' }}>
              {imgLoading && (
                <View style={styles.imageLoader}>
                  <ActivityIndicator size="small" color={colors.primary} />
                </View>
              )}
              <Image
                source={{ uri }}
                style={{
                  width: '100%',
                  height: 200,
                  borderRadius: 8,
                  backgroundColor: imgLoading ? '#ccc' : 'transparent',
                }}
                resizeMode="cover"
                onLoadEnd={() => setImgLoading(false)}
              />
            </View>
          );
        })}

        {/* 🔹 Videos */}
        {post.videos?.length > 0 && (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontWeight: '600', fontSize: 18, marginBottom: 10, color: colors.text }}>
              🎥 Videos
            </Text>
              {post.videos.map((uri: string, index: number) => (
                <View key={index}>
                  <PostVideo videoUrl={uri}></PostVideo>
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
            {post.pdfs.map((uri: string, index: number) => (
              <TouchableOpacity
                key={index}
                onPress={() => Linking.openURL(uri)}
                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}
              >
                <MaterialIcons name="picture-as-pdf" size={24} color={colors.primary} />
                <Text style={{ marginLeft: 8, color: colors.primary }}>{uri}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={{ marginTop: 20 }}>
          <Button 
            title="Delete Post" 
            color="red" 
            onPress={handleDelete}
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
imageLoader: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,
},
});
