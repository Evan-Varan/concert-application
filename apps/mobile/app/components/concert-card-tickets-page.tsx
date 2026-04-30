import { Fragment, useMemo, useState } from 'react';
import { Image, Linking, Modal, Pressable, ScrollView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppCard from '@/app/components/ui/app-card';
import AppText from '@/app/components/ui/app-text';
import { useThemeColor } from '@/hooks/use-theme-color';

interface ConcertCardTicketsPageProps {
  artist: string;
  venue: string;
  city: string;
  date: string;
  genre?: string;
  minTicketPrice?: number | null;
  maxTicketPrice?: number | null;
  ticketCurrency?: string;
  ticketStatus?: string;
  soldOut?: boolean;
  distanceMiles?: number | null;
  ticketUrl?: string | null;
  stubHubUrl?: string | null;
  imageUrl: string;
}

function formatEventDate(date: string) {
  const eventDate = new Date(date);

  if (Number.isNaN(eventDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    month: 'short',
    timeZoneName: 'short',
    weekday: 'short',
  }).format(eventDate);
}

function buildSearchUrl(baseUrl: string, artist: string, city: string) {
  return `${baseUrl}${encodeURIComponent(`${artist} ${city} tickets`)}`;
}

export default function ConcertCardTicketsPage({
  artist,
  venue,
  city,
  date,
  genre,
  minTicketPrice,
  maxTicketPrice,
  ticketCurrency = 'USD',
  ticketStatus,
  soldOut = false,
  distanceMiles,
  ticketUrl,
  stubHubUrl,
  imageUrl,
}: ConcertCardTicketsPageProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [interested, setInterested] = useState(false);
  const [sentGroups, setSentGroups] = useState<string[]>([]);
  const mutedColor = useThemeColor({}, 'icon');

  const priceFormatter = new Intl.NumberFormat('en-US', {
    currency: ticketCurrency,
    maximumFractionDigits: 0,
    style: 'currency',
  });
  const minPriceLabel = typeof minTicketPrice === 'number' ? priceFormatter.format(minTicketPrice) : null;
  const maxPriceLabel = typeof maxTicketPrice === 'number' ? priceFormatter.format(maxTicketPrice) : null;
  const ticketPriceLabel =
    minPriceLabel && maxPriceLabel && minPriceLabel !== maxPriceLabel
      ? `${minPriceLabel} - ${maxPriceLabel}`
      : minPriceLabel
        ? `From ${minPriceLabel}`
        : 'View live prices';
  const distanceLabel =
    typeof distanceMiles === 'number' ? `${distanceMiles.toFixed(1)} mi away` : 'Distance TBD';
  const eventDateLabel = formatEventDate(date);
  const statusLabel = soldOut
    ? 'Sold out'
    : ticketStatus === 'onsale'
      ? 'On sale'
      : ticketStatus
        ? ticketStatus.replace(/_/g, ' ')
        : 'Status TBD';
  const ticketLinks = useMemo(
    () => [
      ...(ticketUrl ? [{ label: 'Ticketmaster', url: ticketUrl }] : []),
      {
        label: 'SeatGeek',
        url: buildSearchUrl('https://seatgeek.com/search?search=', artist, city),
      },
      ...(stubHubUrl ? [{ label: 'StubHub', url: stubHubUrl }] : []),
    ],
    [artist, city, stubHubUrl, ticketUrl]
  );
  const groups = ['Austin Crew', 'Indie Night', 'Weekend Plans'];

  const toggleGroup = (groupName: string) => {
    setSentGroups((currentGroups) =>
      currentGroups.includes(groupName)
        ? currentGroups.filter((name) => name !== groupName)
        : [...currentGroups, groupName]
    );
  };

  const openTicketLink = (url: string) => {
    void Linking.openURL(url);
  };

  return (
    <Fragment>
      <Pressable
        accessibilityLabel={`Open ticket details for ${artist}`}
        accessibilityRole="button"
        onPress={() => setModalVisible(true)}
      >
        <AppCard className="overflow-hidden p-0">
          <View className="absolute bottom-0 left-0 top-0 w-1.5 bg-app-primary" />
          <View className="flex-row gap-3">
            <Image className="h-36 w-28 rounded-l-[22px]" source={{ uri: imageUrl }} />

            <View className="flex-1 gap-3 py-4 pr-4">
              <View className="flex-row items-start justify-between gap-2">
                <AppText className="flex-1" variant="bodyStrong">
                  {artist}
                </AppText>
                <View
                  className={`rounded-full border px-2 py-0.5 ${
                    soldOut
                      ? 'border-app-accent-warm/40 bg-app-accent-warm/15'
                      : 'border-app-primary/30 bg-app-primary/15'
                  }`.trim()}
                >
                  <AppText className={soldOut ? 'text-app-accent-warm' : 'text-app-primary'} variant="caption">
                    {statusLabel}
                  </AppText>
                </View>
              </View>

              <View className="gap-0.5">
                <AppText muted variant="caption">
                  {eventDateLabel}
                </AppText>
                <AppText muted variant="caption">
                  {venue} · {city}
                </AppText>
              </View>

              <View className="rounded-[18px] border border-app-border bg-app-surface p-3">
                <View className="flex-row gap-3">
                  <View className="flex-1 gap-1">
                    <AppText muted variant="caption">
                      Price range
                    </AppText>
                    <AppText className="text-app-primary" variant="bodyStrong">
                      {ticketPriceLabel}
                    </AppText>
                  </View>
                  <View className="flex-1 gap-1">
                    <AppText muted variant="caption">
                      Distance
                    </AppText>
                    <AppText variant="bodyStrong">{distanceLabel}</AppText>
                  </View>
                </View>
              </View>

              <View className="flex-row flex-wrap gap-2">
                <View className="rounded-full border border-app-border bg-app-bg-elevated px-2.5 py-1">
                  <AppText muted variant="caption">
                    {genre ?? 'Genre TBD'}
                  </AppText>
                </View>
                {interested ? (
                  <View className="rounded-full border border-app-primary/30 bg-app-primary/15 px-2.5 py-1">
                    <AppText className="text-app-primary" variant="caption">
                      Interested
                    </AppText>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </AppCard>
      </Pressable>

      <Modal
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        transparent
        visible={modalVisible}
      >
        <View className="flex-1 justify-end bg-black/50">
          <Pressable className="flex-1" onPress={() => setModalVisible(false)} />
          <View className="max-h-[92%] rounded-t-[28px] bg-app-bg">
            <View className="items-center py-3">
              <View className="h-1.5 w-12 rounded-full bg-app-border" />
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 28 }} showsVerticalScrollIndicator={false}>
              <Image className="h-52 w-full" source={{ uri: imageUrl }} />

              <View className="gap-5 p-6">
                <View className="flex-row items-start justify-between gap-3">
                  <View className="flex-1 gap-2">
                    <AppText variant="headline">{artist}</AppText>
                    <AppText muted>
                      {genre ?? 'Genre TBD'} · {statusLabel}
                    </AppText>
                  </View>
                  <Pressable
                    accessibilityLabel="Close ticket details"
                    accessibilityRole="button"
                    className="h-10 w-10 items-center justify-center rounded-full bg-app-surface"
                    onPress={() => setModalVisible(false)}
                  >
                    <Ionicons color={mutedColor} name="close" size={20} />
                  </Pressable>
                </View>

                <View className="gap-3 rounded-[18px] border border-app-border bg-app-bg-elevated p-4">
                  <View className="flex-row items-center gap-3">
                    <Ionicons color={mutedColor} name="calendar-outline" size={18} />
                    <AppText className="flex-1" variant="bodyStrong">
                      {eventDateLabel}
                    </AppText>
                  </View>
                  <View className="flex-row items-center gap-3">
                    <Ionicons color={mutedColor} name="location-outline" size={18} />
                    <AppText className="flex-1">
                      {venue} · {city}
                    </AppText>
                  </View>
                  <View className="flex-row items-center gap-3">
                    <Ionicons color={mutedColor} name="ticket-outline" size={18} />
                    <AppText className="flex-1">
                      {ticketPriceLabel} · {distanceLabel}
                    </AppText>
                  </View>
                </View>

                <View className="gap-3">
                  <AppText variant="sectionTitle">Buy Tickets</AppText>
                  {ticketLinks.map((link) => (
                    <Pressable
                      accessibilityRole="link"
                      className="flex-row items-center justify-between rounded-[14px] border border-app-border bg-app-bg-elevated px-4 py-3"
                      key={link.label}
                      onPress={() => openTicketLink(link.url)}
                    >
                      <View className="flex-row items-center gap-3">
                        <Ionicons color={mutedColor} name="open-outline" size={18} />
                        <AppText variant="bodyStrong">{link.label}</AppText>
                      </View>
                      <Ionicons color={mutedColor} name="chevron-forward" size={18} />
                    </Pressable>
                  ))}
                </View>

                <View className="gap-3">
                  <AppText variant="sectionTitle">Plan With Friends</AppText>
                  <Pressable
                    className={`flex-row items-center justify-between rounded-[14px] border px-4 py-3 ${
                      interested
                        ? 'border-app-primary bg-app-primary/15'
                        : 'border-app-border bg-app-bg-elevated'
                    }`.trim()}
                    onPress={() => setInterested((current) => !current)}
                  >
                    <View className="flex-row items-center gap-3">
                      <Ionicons
                        color={interested ? '#4caf50' : mutedColor}
                        name={interested ? 'heart' : 'heart-outline'}
                        size={18}
                      />
                      <AppText variant="bodyStrong">
                        {interested ? "You're interested" : "I'm interested"}
                      </AppText>
                    </View>
                    <AppText className={interested ? 'text-app-primary' : 'text-app-text-muted'} variant="caption">
                      {interested ? 'Saved' : 'Tap to save'}
                    </AppText>
                  </Pressable>

                  <View className="gap-2">
                    {groups.map((group) => {
                      const selected = sentGroups.includes(group);

                      return (
                        <Pressable
                          className={`flex-row items-center justify-between rounded-[14px] border px-4 py-3 ${
                            selected
                              ? 'border-app-primary bg-app-primary/15'
                              : 'border-app-border bg-app-bg-elevated'
                          }`.trim()}
                          key={group}
                          onPress={() => toggleGroup(group)}
                        >
                          <View className="flex-row items-center gap-3">
                            <Ionicons color={selected ? '#4caf50' : mutedColor} name="people-outline" size={18} />
                            <AppText>{group}</AppText>
                          </View>
                          <AppText className={selected ? 'text-app-primary' : 'text-app-text-muted'} variant="caption">
                            {selected ? 'Sent' : 'Send'}
                          </AppText>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>

                <Pressable
                  className="items-center justify-center rounded-[14px] border border-app-primary bg-app-primary px-4 py-3"
                  onPress={() => {
                    setInterested(true);
                    setSentGroups((currentGroups) =>
                      currentGroups.includes('Austin Crew') ? currentGroups : [...currentGroups, 'Austin Crew']
                    );
                  }}
                >
                  <AppText className="text-app-bg-elevated" variant="bodyStrong">
                    Save and Send
                  </AppText>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </Fragment>
  );
}
