import { OAUTH_SCOPES } from '../constants';
import { NullifyOptionalProperties } from '../utils';

type RestrictScope<
  T,
  TScope extends string
> = TScope extends typeof OAUTH_SCOPES[number] ? T : never;

type InputParams<T extends object> = NullifyOptionalProperties<T>;

export namespace Spotify {
  export namespace Object {
    export interface Album {
      album_type: AlbumType;
      artists: ArtistSimplified[];
      available_markets: CountryCode[];
      copyrights: Copyright[];
      external_ids: ExternalId;
      external_urls: ExternalUrl;
      genres: string[];
      href: string;
      id: string;
      images: Image[];
      label: string;
      name: string;
      release_date: string;
      release_date_precision: ReleaseDatePrecision;
      total_tracks: number;
      tracks: Paginated<TrackSimplified>;
      type: 'album';
      uri: string;
    }

    export interface AlbumSimplified {
      album_type: AlbumType;
      album_group?: AlbumGroup;
      artists: ArtistSimplified;
      available_markets: CountryCode[];
      external_urls: ExternalUrl;
      href: string;
      id: string;
      images: Image[];
      name: string;
      release_date: string;
      release_date_precision: ReleaseDatePrecision;
      restrictions?: Restrictions;
      total_tracks: number;
      type: 'album';
      uri: string;
    }

    export type AlbumGroup = 'album' | 'appears_on' | 'compilation' | 'single';
    export type AlbumType = 'album' | 'compilation' | 'single';

    export interface Artist {
      external_urls: ExternalUrl;
      followers: Followers;
      genres: string[];
      href: string;
      id: string;
      images: Image[];
      name: string;
      popularity: number;
      type: 'artist';
      uri: string;
    }

    export interface ArtistSimplified {
      external_urls: ExternalUrl;
      href: string;
      id: string;
      name: string;
      type: 'artist';
      uri: string;
    }

    export interface AuthorizationCodeCredentials {
      access_token: string;
      expires_in: number;
      refresh_token: string;
      scope: string;
      token_type: 'Bearer';
    }

    export interface Copyright {
      text: string;
      type: CopyrightType;
    }

    export type CopyrightType = 'C' | 'P';

    export type CountryCode = string;

    export interface CurrentUser {
      country: RestrictScope<string, 'user-read-private'>;
      display_name: string | null;
      email: RestrictScope<string, 'user-read-email'>;
      explicit_content: RestrictScope<
        {
          filter_enabled: boolean;
          filter_locked: boolean;
        },
        'user-read-private'
      >;
      external_urls: ExternalUrl;
      followers: Followers;
      href: string;
      id: string;
      images: Image[];
      product: RestrictScope<string, 'user-read-private'>;
      type: 'user';
      uri: string;
    }

    export interface Episode {
      id: string;
      type: 'episode';
    }

    export type ExternalId = Record<string, string>;

    export interface ExternalUrl {
      spotify: string;
    }

    export interface Followers {
      href: string | null;
      total: number;
    }

    export interface Image {
      url: string;
      height: number | null;
      weight: number | null;
    }

    export interface Paginated<T = any> {
      items: T[];
      href: string;
      limit: number;
      next: string | null;
      offset: number;
      previous: string | null;
      total: number;
    }

    export type PaginatedPlaylists = Paginated<Playlist>;
    export type PaginatedPlaylistTracks = Paginated<PlaylistTrack>;

    export interface Playlist {
      collaborative: boolean;
      description: string | null;
      external_urls: ExternalUrl;
      href: string;
      id: string;
      images: Image[];
      name: string;
      owner: User;
      primary_color: string | null;
      public: boolean | null;
      snapshot_id: string;
      tracks: PaginatedPlaylistTracks;
      type: 'playlist';
      uri: string;
    }

    export type PlaylistItem = Track | PlaylistEpisode;

    export interface PlaylistEpisode {
      album: PlaylistEpisodeAlbum;
      artist: PlaylistEpisodeArtist[];
      available_markets: CountryCode[];
      disc_number: number;
      duration_ms: number;
      episode: boolean;
      explicit: boolean;
      external_ids: ExternalId;
      external_urls: ExternalUrl;
      href: string;
      id: string;
      is_local: boolean;
      is_playable: boolean;
      name: string;
      popularity: number;
      preview_url: string;
      track: boolean;
      track_number: number;
      type: 'episode';
      uri: string;
    }

    export interface PlaylistEpisodeAlbum {
      album_type: AlbumType;
      artists: PlaylistEpisodeArtist[];
      available_markets: CountryCode[];
      external_urls: ExternalUrl;
      href: string;
      id: string;
      images: Image[];
      is_playable: boolean;
      name: string;
      release_date: string | null;
      release_date_precision: 'year' | 'month' | 'day' | null;
      restrictions: Restrictions;
      total_tracks: number;
      type: 'show';
      uri: string;
    }

    export interface PlaylistEpisodeArtist {
      external_urls: ExternalUrl;
      href: string;
      id: string;
      name: string;
      type: 'show';
      uri: string;
    }

    export interface PlaylistTrack {
      added_at: string;
      added_by: User;
      is_local: boolean;
      primary_color: string | null;
      track: PlaylistItem;
      video_thumbnail: {
        url: string | null;
      };
    }

    export interface Recommendations {
      seeds: RecommendationSeed[];
      tracks: Track[];
    }

    export interface RecommendationSeed {
      afterFilteringSize: number;
      afterRelinkingSize: number;
      href: string;
      id: string;
      initialPoolSize: number;
      type: 'ARTIST' | 'TRACK' | 'GENRE';
    }

    export type ReleaseDatePrecision = 'day' | 'month' | 'year';

    export interface Restrictions {
      reason: 'market' | 'product' | 'explicit';
    }

    export interface Track {
      album: AlbumSimplified;
      artists: ArtistSimplified[];
      available_markets: CountryCode[];
      disc_number: number;
      duration_ms: number;
      explicit: boolean;
      external_ids: ExternalId;
      external_urls: ExternalUrl;
      href: string;
      id: string;
      is_local: boolean;
      is_playable?: boolean;
      linked_from?: Track;
      name: string;
      popularity: number;
      preview_url: string;
      track_number: number;
      restrictions?: Restrictions;
      type: 'track';
      uri: string;
    }

    export interface TrackSimplified {
      artists: ArtistSimplified[];
      available_markets: CountryCode[];
      disc_number: number;
      duration_ms: number;
      explicit: boolean;
      external_urls: ExternalUrl;
      href: string;
      id: string;
      is_local: boolean;
      is_playable?: boolean;
      linked_from?: TrackSimplifiedLinkedFrom;
      restrictions?: Restrictions;
      name: string;
      preview_url: string;
      track_number: string;
      type: 'track';
      uri: string;
    }

    export interface TrackSimplifiedLinkedFrom {
      external_urls: ExternalUrl;
      href: string;
      id: string;
      type: 'track';
      uri: string;
    }

    export interface User {
      display_name: string | null;
      external_urls: ExternalUrl;
      followers: Followers;
      href: string;
      id: string;
      images: Image[] | null;
      type: 'user';
      uri: string;
    }
  }

  export namespace Response {
    export interface Path {
      '/authorize':
        | { code: string; state?: string }
        | { error: string; state?: string };
      '/api/token': Object.AuthorizationCodeCredentials;
      '/me': Object.CurrentUser;
      '/me/playlists': Object.PaginatedPlaylists;
      '/playlists/:id': Object.Playlist;
      '/recommendations': Object.Recommendations;

      '/recommendations/available-genre-seeds': {
        genres: string[];
      };
    }
  }

  export namespace Request {
    export interface Params {
      '/recommendations': InputParams<{
        seed_artists?: string;
        seed_genres?: string;
        seed_tracks?: string;
        limit?: number;
      }>;
      '/me/playlists': InputParams<{
        limit?: number;
        offset?: number;
      }>;
    }
  }
}
