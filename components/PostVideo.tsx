import { useTheme } from '@react-navigation/native';
import { useVideoPlayer, VideoView } from 'expo-video';
import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

export default function PostVideo({ videoUrl }: { videoUrl: string }) {
  const player = useVideoPlayer(videoUrl, player => {
    player.loop = false;
    player.pause(); // start paused
  });


  const { width } = useWindowDimensions();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <VideoView
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        style={{ width: width - 32, aspectRatio: 16 / 9, borderRadius: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    alignItems: 'center',
  },
  controlsContainer: {
    marginTop: 8,
  },
});
