import { db, storage } from '@/firebase/config';
import { useTheme } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import "react-native-get-random-values";
import { SafeAreaView } from 'react-native-safe-area-context';
import { v4 as uuidv4 } from 'uuid';

const categories = [
  'Achievements',
  'Learning',
  'Curriculum',
  'Activities',
  'Welfare',
  'Leadership',
  'Resources',
  'Community',
];

export default function UploadPage() {
  const { colors } = useTheme();
  const [category, setCategory] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [videos, setVideos] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [pdfs, setPdfs] = useState<DocumentPicker.DocumentPickerAsset[]>([]);
  const [uploading, setUploading] = useState(false);

  const toggleCategory = (value: string) => {
      setCategory((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      quality: 1,
      allowsMultipleSelection: true
    });
    if (!result.canceled && result.assets) {
      setImages(prev => [...prev, ...result.assets]);
    }
  };

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'videos',
      quality: 1,
      allowsMultipleSelection: true
    });
    if (!result.canceled && result.assets) {
      setVideos(prev => [...prev, ...result.assets]);
    }
  };

const pickPdf = async () => {
  const result = await DocumentPicker.getDocumentAsync({
    type: 'application/pdf',
    multiple: true,
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    const newPdfs = result.assets.map((file) => ({
      name: file.name,
      uri: file.uri,
      mimeType: file.mimeType,
    }));
    setPdfs(prev => [...prev, ...newPdfs]);
  }
};


  const uploadFiles = async (files: { uri: string }[], folder: string): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of files) {
      const uri = file.uri;
      const response = await fetch(uri);
      const blob = await response.blob();
      const fileRef = ref(storage, `${folder}/${uuidv4()}`);
      await uploadBytes(fileRef, blob);
      const downloadURL = await getDownloadURL(fileRef);
      urls.push(downloadURL);
    }
    return urls;
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert('Title is required');
      return;
    }
    if (category.length === 0) {
      alert('Please select at least one category');
      return;
    }
    setUploading(true);
    try {
      const imageUrls = await uploadFiles(images, 'images');
      const videoUrls = await uploadFiles(videos, 'videos');
      const pdfUrls = await uploadFiles(pdfs, 'pdfs');

      await addDoc(collection(db, 'posts'), {
        title,
        description,
        category,
        images: imageUrls,
        videos: videoUrls,
        pdfs: pdfUrls,
        createdAt: serverTimestamp(),
      });

      alert('Upload successful');
      setTitle('');
      setDescription('');
      setImages([]);
      setVideos([]);
      setPdfs([]);
      setCategory([]);
    } catch (error) {
      console.error(error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>

        <Text style={[styles.label, { color: colors.text }]}>Select Categories</Text>

        <View style={styles.chipContainer}>
          {category.map((cat) => (
            <View key={cat} style={[styles.chip, { backgroundColor: colors.primary + '22', borderColor: colors.primary }]}>
              <Text style={{ color: colors.text }}>{cat}</Text>
              <TouchableOpacity onPress={() => toggleCategory(cat)} style={styles.chipClose}>
                <Text style={{ color: colors.text, marginLeft: 6 }}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.categoryList}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => toggleCategory(cat)}
              style={[styles.categoryButton, {
                backgroundColor: category.includes(cat) ? colors.primary : 'transparent',
                borderColor: colors.border,
                borderWidth: 1
              }]}
            >
              <Text style={{ color: category.includes(cat) ? '#fff' : colors.text }}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.label, { color: colors.text }]}>Title *</Text>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.border }]}
          placeholder="Enter title"
          placeholderTextColor={colors.text + '88'}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={[styles.label, { color: colors.text }]}>Description</Text>
        <TextInput
          style={[styles.textarea, { color: colors.text, borderColor: colors.border }]}
          placeholder="Enter description"
          placeholderTextColor={colors.text + '88'}
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={[styles.label, { color: colors.text }]}>Upload Images</Text>
        <Button title="Pick Images" onPress={pickImage} />
        {images.map((img, idx) => (
          <View key={idx} style={{ marginTop: 8 }}>
            <Text style={{ color: colors.text }}>📷 {img.uri.split('/').pop()}</Text>
          </View>
        ))}

        <Text style={[styles.label, { color: colors.text }]}>Upload Videos</Text>
        <Button title="Pick Videos" onPress={pickVideo} />
        {videos.map((vid, idx) => (
          <View key={idx} style={{ marginTop: 8 }}>
            <Text style={{ color: colors.text }}>🎥 {vid.uri.split('/').pop()}</Text>
          </View>
        ))}

        <Text style={[styles.label, { color: colors.text }]}>Upload PDFs</Text>
        <Button title="Pick PDFs" onPress={pickPdf} />
        {pdfs.map((pdf, idx) => (
          <View key={idx} style={{ marginTop: 8 }}>
            <Text style={{ color: colors.text }}>📄 {pdf.name || pdf.uri.split('/').pop()}</Text>
          </View>
        ))}

        <View style={{ marginVertical: 20 }}>
          {uploading ? (
            <ActivityIndicator size="large"/>
          ) : (
            <Button title="Submit" onPress={handleSubmit} />
          )}
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  textarea: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 12,
  },
  categoryButton: {
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
chipContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginBottom: 12,
  gap: 8,
},

chip: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 20,
  borderWidth: 1,
},

chipClose: {
  marginLeft: 4,
},

categoryList: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 10,
},
});
