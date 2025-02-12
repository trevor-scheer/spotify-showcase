import { ReactNode, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Layout from './Layout';
import ScrollContainerContext from './ScrollContainerContext';
import Playbar, { LoadingState as PlaybarLoadingState } from './Playbar';
import PlaybackStateSubscriber from './PlaybackStateSubscriber';
import { TypedDocumentNode, gql, useSuspenseQuery } from '@apollo/client';
import { SidebarQuery, SidebarQueryVariables } from '../types/api';
import PlaylistSidebarLink from './PlaylistSidebarLink';
import { Library } from 'lucide-react';
import CoverPhoto from './CoverPhoto';
import { thumbnail } from '../utils/image';
import OffsetBasedPaginationObserver from './OffsetBasedPaginationObserver';
import LikedSongsPlaylistCoverPhoto from './LikedSongsPlaylistCoverPhoto';
import YourEpisodesPlaylistCoverPhoto from './YourEpisodesPlaylistCoverPhoto';
import { randomBetween, range } from '../utils/common';
import Skeleton from './Skeleton';
import CurrentUserMenu, {
  LoadingState as CurrentUserMenuLoadingState,
} from './CurrentUserMenu';
import Suspense from './Suspense';
import StandardLoadingState from './StandardLoadingState';
import { withHighlight } from './LoadingStateHighlighter';

const LoggedInLayout = () => {
  return (
    <Suspense fallback={<LoadingState />}>
      <Container>
        <Sidebar />
        <Main>
          <Header />
          <Suspense fallback={<StandardLoadingState />}>
            <Outlet />
          </Suspense>
        </Main>
        <Playbar />
      </Container>
    </Suspense>
  );
};

const Header = () => {
  return (
    <header className="flex items-center justify-end text-primary bg-transparent pt-[var(--main-content--padding)] px-[var(--main-content--padding)] absolute top-0 w-full pointer-events-none flex-shrink-0 z-10">
      <div className="flex gap-4 items-center pointer-events-auto">
        <CurrentUserMenu />
      </div>
    </header>
  );
};

interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => {
  return (
    <Layout.Main>
      <PlaybackStateSubscriber />
      {children}
    </Layout.Main>
  );
};

const SIDEBAR_QUERY: TypedDocumentNode<
  SidebarQuery,
  SidebarQueryVariables
> = gql`
  query SidebarQuery($offset: Int, $limit: Int) {
    me {
      user {
        id
      }
      playlists(offset: $offset, limit: $limit)
        @connection(key: "rootPlaylists") {
        pageInfo {
          offset
          limit
          hasNextPage
        }
        edges {
          node {
            id
            images {
              url
            }
            ...PlaylistSidebarLink_playlist
          }
        }
      }
    }
  }
`;

const Sidebar = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { data, fetchMore } = useSuspenseQuery(SIDEBAR_QUERY, {
    variables: { limit: 50 },
  });

  const { me } = data;

  if (!me) {
    throw new Error('Must be logged in');
  }

  return (
    <Layout.Sidebar>
      <Layout.Sidebar.Section className="flex-1 overflow-hidden flex flex-col pb-0">
        <header className="px-4 py-2">
          <h2 className="text-muted flex gap-2 items-center py-2 text-base">
            <Library /> Your Library
          </h2>
        </header>
        <ScrollContainerContext.Provider value={sidebarRef}>
          <div className="overflow-y-auto flex-1 -mx-1 px-3" ref={sidebarRef}>
            <PlaylistSidebarLink
              pinned
              playlist={{
                __typename: 'Playlist',
                id: 'collection:tracks',
                name: 'Liked Songs',
                uri: `spotify:user:${me.user.id}:collection`,
                owner: {
                  __typename: 'User',
                  id: 'spotify',
                  displayName: 'Spotify',
                },
              }}
              coverPhoto={<LikedSongsPlaylistCoverPhoto iconSize="1rem" />}
              to="/collection/tracks"
            />
            <PlaylistSidebarLink
              pinned
              playlist={{
                __typename: 'Playlist',
                id: 'collection:episodes',
                name: 'Your Episodes',
                uri: `spotify:user:${me.user.id}:collection:your-episodes`,
                owner: {
                  __typename: 'User',
                  id: 'spotify',
                  displayName: 'Spotify',
                },
              }}
              coverPhoto={<YourEpisodesPlaylistCoverPhoto iconSize="1rem" />}
              to="/collection/episodes"
            />
            {me.playlists?.edges.map(({ node: playlist }) => (
              <PlaylistSidebarLink
                pinned={false}
                key={playlist.id}
                playlist={playlist}
                coverPhoto={<CoverPhoto image={thumbnail(playlist.images)} />}
                to={`/playlists/${playlist.id}`}
              />
            ))}
            <OffsetBasedPaginationObserver
              pageInfo={me.playlists?.pageInfo}
              fetchMore={fetchMore}
            />
          </div>
        </ScrollContainerContext.Provider>
      </Layout.Sidebar.Section>
    </Layout.Sidebar>
  );
};

const SidebarLoadingState = () => {
  const skeletons = range(0, randomBetween(10, 15));

  return (
    <Layout.Sidebar>
      <Layout.Sidebar.Section className="flex-1 overflow-hidden flex flex-col pb-0">
        <header className="px-4 py-2">
          <h2 className="text-muted flex gap-2 items-center py-2 text-base">
            <Library /> Your Library
          </h2>
        </header>
        <div className="overflow-y-auto flex-1 -mx-1 px-3">
          {skeletons.map((num) => (
            <li key={num} className="px-0 py-2">
              <div className="flex gap-2">
                <Skeleton.CoverPhoto size="3rem" />
                <div className="flex flex-col gap-4 flex-1">
                  <Skeleton.Text
                    width={`${randomBetween(40, 60)}%`}
                    fontSize="1rem"
                  />
                  <Skeleton.Text
                    width={`${randomBetween(50, 70)}%`}
                    fontSize="0.75rem"
                  />
                </div>
              </div>
            </li>
          ))}
        </div>
      </Layout.Sidebar.Section>
    </Layout.Sidebar>
  );
};

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className={
        'grid gap-2 p-2 h-screen grid-cols-[375px_1fr] [grid-template-areas:"sidebar_main-view""playbar_playbar"] [grid-template-rows:1fr_auto]'
      }
    >
      {children}
    </div>
  );
};

const LoadingState = withHighlight(
  () => {
    return (
      <Layout type="player">
        <SidebarLoadingState />
        <Layout.Main>
          <header className="flex items-center justify-end text-primary bg-transparent pt-[var(--main-content--padding)] px-[var(--main-content--padding)] absolute top-0 w-full pointer-events-none flex-shrink-0 z-10">
            <CurrentUserMenuLoadingState />
          </header>
          <StandardLoadingState />
        </Layout.Main>
        <PlaybarLoadingState />
      </Layout>
    );
  },
  { shade: '#67EEF0' }
);

export default LoggedInLayout;
