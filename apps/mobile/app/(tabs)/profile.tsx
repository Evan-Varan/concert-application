import { Ionicons } from '@expo/vector-icons';
import { Image, Modal, Pressable, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { useState } from 'react';

import ConcertSectionHeader from '@/app/components/concert-section-header';
import AppCard from '@/app/components/ui/app-card';
import AppScreen from '@/app/components/ui/app-screen';
import AppText from '@/app/components/ui/app-text';

const spotifyLogo = require('../../assets/brand/spotify-logo-green.png') as ImageSourcePropType;
const appleMusicLogo = require('../../assets/brand/apple-music-logo.png') as ImageSourcePropType;
const youtubeMusicLogo = require('../../assets/brand/youtube-music-logo.png') as ImageSourcePropType;
const profileImageUrl =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=faces&fit=crop&fm=jpg&q=90&w=320&h=320';

type ListeningPlatform = {
  accent: string;
  background: string;
  buttonTextColor: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  logoHeight: number;
  logoSource?: ImageSourcePropType;
  logoWidth: number;
  modalLogoWidth: number;
  panelTextColor: string;
  provider: string;
  redirectUri: string;
  secondaryForeground: string;
};

const listeningPlatforms: ListeningPlatform[] = [
  {
    provider: 'Spotify',
    accent: '#1ED760',
    background: '#191414',
    buttonTextColor: '#191414',
    description: 'Import top artists, genres, and saved listening signals for better concert matches.',
    icon: 'musical-notes-outline',
    logoHeight: 27,
    logoSource: spotifyLogo,
    logoWidth: 100,
    modalLogoWidth: 122,
    panelTextColor: '#FFFFFF',
    redirectUri: 'mobile://spotify-auth',
    secondaryForeground: '#B3B3B3',
  },
  {
    provider: 'Apple Music',
    accent: '#000000',
    background: '#FFFFFF',
    buttonTextColor: '#FFFFFF',
    description: 'Connect listening history and library signals when Apple Music support is ready.',
    icon: 'logo-apple',
    logoHeight: 25,
    logoSource: appleMusicLogo,
    logoWidth: 102,
    modalLogoWidth: 124,
    panelTextColor: '#111111',
    redirectUri: 'mobile://apple-music-auth',
    secondaryForeground: '#5F5F5F',
  },
  {
    provider: 'YouTube Music',
    accent: '#FF0000',
    background: '#FFFFFF',
    buttonTextColor: '#FFFFFF',
    description: 'Use music activity from YouTube when this connector becomes available.',
    icon: 'logo-youtube',
    logoHeight: 20,
    logoSource: youtubeMusicLogo,
    logoWidth: 138,
    modalLogoWidth: 150,
    panelTextColor: '#282828',
    redirectUri: 'mobile://youtube-music-auth',
    secondaryForeground: '#606060',
  },
];

function ListeningPlatformRow({
  onConnect,
  platform,
}: {
  onConnect: (platform: ListeningPlatform) => void;
  platform: ListeningPlatform;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      className="flex-row items-center justify-between rounded-[14px] border px-4 py-3"
      onPress={() => onConnect(platform)}
      style={{
        backgroundColor: platform.background,
        borderColor: platform.accent,
      }}
    >
      <View className="flex-1 flex-row items-center gap-3">
        <View className="h-10 w-40 items-start justify-center">
          {platform.logoSource ? (
            <Image
              accessibilityLabel={`${platform.provider} logo`}
              accessibilityIgnoresInvertColors
              resizeMode="contain"
              source={platform.logoSource}
              style={{
                height: platform.logoHeight,
                width: platform.logoWidth,
              }}
            />
          ) : (
            <View
              className="h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: platform.accent }}
            >
              <Ionicons color="#ffffff" name={platform.icon} size={21} />
            </View>
          )}
        </View>
      </View>

      <View className="flex-row items-center gap-2">
        <AppText style={{ color: platform.accent }} variant="caption">
          Connect
        </AppText>
        <Ionicons color={platform.accent} name="chevron-forward" size={18} />
      </View>
    </Pressable>
  );
}

export default function ProfileScreen() {
  const [selectedPlatform, setSelectedPlatform] = useState<ListeningPlatform | null>(null);
  const modalPlatform = selectedPlatform ?? listeningPlatforms[0];

  return (
    <AppScreen scrollable>
      <View className="gap-8">
        <ConcertSectionHeader
          subtitle="Your music identity and account preferences should feel personal, not administrative."
          title="Profile"
        />

        <AppCard className="overflow-hidden p-0">
          <View className="absolute bottom-0 left-0 top-0 w-1.5 bg-app-primary" />
          <View className="gap-5 p-5">
            <View className="flex-row items-center gap-4">
              <Image
                accessibilityLabel="Profile picture for Jordan Lee"
                className="h-20 w-20 rounded-full"
                source={{ uri: profileImageUrl }}
              />
              <View className="flex-1 gap-1">
                <AppText variant="headline">Jordan Lee</AppText>
                <AppText muted variant="caption">
                  Austin, TX · Indie, pop, and electronic shows
                </AppText>
              </View>
            </View>

            <View className="flex-row gap-3">
              <View className="flex-1 rounded-[14px] border border-app-border bg-app-surface px-3 py-2">
                <AppText className="text-app-primary" variant="bodyStrong">
                  42
                </AppText>
                <AppText muted variant="caption">
                  Saved artists
                </AppText>
              </View>
              <View className="flex-1 rounded-[14px] border border-app-border bg-app-surface px-3 py-2">
                <AppText className="text-app-primary" variant="bodyStrong">
                  12
                </AppText>
                <AppText muted variant="caption">
                  Plans joined
                </AppText>
              </View>
              <View className="flex-1 rounded-[14px] border border-app-border bg-app-surface px-3 py-2">
                <AppText className="text-app-primary" variant="bodyStrong">
                  8
                </AppText>
                <AppText muted variant="caption">
                  Venues
                </AppText>
              </View>
            </View>
          </View>
        </AppCard>

        <View className="gap-3">
          <View className="gap-1">
            <AppText variant="sectionTitle">Listening platforms</AppText>
            <AppText muted variant="caption">
              Link music services for better recommendations.
            </AppText>
          </View>

          <AppCard className="gap-2 p-3">
            {listeningPlatforms.map((platform) => (
              <ListeningPlatformRow
                key={platform.provider}
                onConnect={setSelectedPlatform}
                platform={platform}
              />
            ))}
          </AppCard>
        </View>
      </View>

      <Modal
        animationType="slide"
        onRequestClose={() => setSelectedPlatform(null)}
        transparent
        visible={selectedPlatform !== null}
      >
        <View className="flex-1 justify-end bg-black/50">
          <Pressable className="flex-1" onPress={() => setSelectedPlatform(null)} />
          <View className="gap-5 rounded-t-[28px] bg-app-bg p-6">
            <View className="items-center">
              <View className="h-1.5 w-12 rounded-full bg-app-border" />
            </View>

            <View className="flex-row items-start justify-between gap-3">
              <View className="flex-1 gap-2">
                <View className="h-10 items-start justify-center">
                  <Image
                    accessibilityLabel={`${modalPlatform.provider} logo`}
                    accessibilityIgnoresInvertColors
                    resizeMode="contain"
                    source={modalPlatform.logoSource}
                    style={{
                      height: modalPlatform.logoHeight,
                      width: modalPlatform.modalLogoWidth,
                    }}
                  />
                </View>
                <View className="flex-row items-center gap-2">
                  <AppText variant="sectionTitle">Connect {modalPlatform.provider}</AppText>
                </View>
                <AppText muted variant="caption">
                  Sign in to {modalPlatform.provider} to sync music taste for better concert recommendations.
                </AppText>
              </View>

              <Pressable
                accessibilityLabel={`Close ${modalPlatform.provider} authentication`}
                className="h-10 w-10 items-center justify-center rounded-full bg-app-surface"
                onPress={() => setSelectedPlatform(null)}
              >
                <Ionicons color="#20221c" name="close" size={20} />
              </Pressable>
            </View>

            <View
              className="gap-2 rounded-[18px] border p-4"
              style={{ backgroundColor: modalPlatform.background, borderColor: modalPlatform.accent }}
            >
              <View className="flex-row items-center gap-3">
                <Ionicons color={modalPlatform.accent} name="shield-checkmark-outline" size={18} />
                <AppText className="flex-1" style={{ color: modalPlatform.panelTextColor }} variant="bodyStrong">
                  Secure {modalPlatform.provider} authentication
                </AppText>
              </View>
              <AppText style={{ color: modalPlatform.secondaryForeground }} variant="caption">
                Redirect URI: {modalPlatform.redirectUri}
              </AppText>
            </View>

            <Pressable
              className="flex-row items-center justify-between rounded-[14px] border px-4 py-3"
              onPress={() => setSelectedPlatform(null)}
              style={{ backgroundColor: modalPlatform.accent, borderColor: modalPlatform.accent }}
            >
              <AppText style={{ color: modalPlatform.buttonTextColor }} variant="bodyStrong">
                Continue with {modalPlatform.provider}
              </AppText>
              <Ionicons color={modalPlatform.buttonTextColor} name="open-outline" size={18} />
            </Pressable>
          </View>
        </View>
      </Modal>
    </AppScreen>
  );
}
