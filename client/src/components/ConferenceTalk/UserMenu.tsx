import CurrentUserMenu, { LoadingState } from '../CurrentUserMenu';
import { UserMenuQuery, UserMenuQueryVariables } from '../../types/api';
import UserMenuContainer from '../UserMenuContainer';

import { TypedDocumentNode, gql, useQuery } from '@apollo/client';

const USER_MENU_QUERY: TypedDocumentNode<
  UserMenuQuery,
  UserMenuQueryVariables
> = gql`
  query UserMenuQuery {
    me {
      profile @synthetics(timeout: 1000) {
        ...CurrentUserMenu_profile
      }
    }
  }
`;

export const UserMenu = () => {
  const { data, loading } = useQuery(USER_MENU_QUERY);

  if (loading) {
    return <UserMenu.LoadingState />;
  }

  const me = data?.me;

  if (!me) {
    throw new Error('Oops, user expected');
  }

  return (
    <UserMenuContainer>
      <CurrentUserMenu profile={me.profile} />
    </UserMenuContainer>
  );
};

UserMenu.LoadingState = LoadingState;