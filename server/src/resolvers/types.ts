import { ContextValue } from '../types';
import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Artist = {
  __typename?: 'Artist';
  externalUrls: Array<ExternalUrl>;
  href: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  uri?: Maybe<Scalars['String']>;
};

export type ExternalUrl = {
  __typename?: 'ExternalUrl';
  spotify?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  genres: Array<Scalars['String']>;
  recommendations?: Maybe<Recommendations>;
};


export type QueryRecommendationsArgs = {
  seeds: RecommendationSeedInput;
};

export type RecommendationSeed = {
  __typename?: 'RecommendationSeed';
  afterFilteringSize: Scalars['Int'];
  afterRelinkingSize: Scalars['Int'];
  href: Scalars['String'];
  id: Scalars['ID'];
  initialPoolSize: Scalars['Int'];
  type: RecommendationSeedType;
};

export type RecommendationSeedInput = {
  seedGenres?: InputMaybe<Array<Scalars['String']>>;
};

export enum RecommendationSeedType {
  Artist = 'ARTIST',
  Genre = 'GENRE',
  Track = 'TRACK'
}

export type Recommendations = {
  __typename?: 'Recommendations';
  seeds: Array<RecommendationSeed>;
  tracks: Array<TrackSimplified>;
};

export type TrackSimplified = {
  __typename?: 'TrackSimplified';
  artists: Array<Artist>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Artist: ResolverTypeWrapper<Artist>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ExternalUrl: ResolverTypeWrapper<ExternalUrl>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Query: ResolverTypeWrapper<{}>;
  RecommendationSeed: ResolverTypeWrapper<RecommendationSeed>;
  RecommendationSeedInput: RecommendationSeedInput;
  RecommendationSeedType: RecommendationSeedType;
  Recommendations: ResolverTypeWrapper<Recommendations>;
  String: ResolverTypeWrapper<Scalars['String']>;
  TrackSimplified: ResolverTypeWrapper<TrackSimplified>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Artist: Artist;
  Boolean: Scalars['Boolean'];
  ExternalUrl: ExternalUrl;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Query: {};
  RecommendationSeed: RecommendationSeed;
  RecommendationSeedInput: RecommendationSeedInput;
  Recommendations: Recommendations;
  String: Scalars['String'];
  TrackSimplified: TrackSimplified;
}>;

export type ArtistResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Artist'] = ResolversParentTypes['Artist']> = ResolversObject<{
  externalUrls?: Resolver<Array<ResolversTypes['ExternalUrl']>, ParentType, ContextType>;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ExternalUrlResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['ExternalUrl'] = ResolversParentTypes['ExternalUrl']> = ResolversObject<{
  spotify?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  recommendations?: Resolver<Maybe<ResolversTypes['Recommendations']>, ParentType, ContextType, RequireFields<QueryRecommendationsArgs, 'seeds'>>;
}>;

export type RecommendationSeedResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['RecommendationSeed'] = ResolversParentTypes['RecommendationSeed']> = ResolversObject<{
  afterFilteringSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  afterRelinkingSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  initialPoolSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['RecommendationSeedType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RecommendationsResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['Recommendations'] = ResolversParentTypes['Recommendations']> = ResolversObject<{
  seeds?: Resolver<Array<ResolversTypes['RecommendationSeed']>, ParentType, ContextType>;
  tracks?: Resolver<Array<ResolversTypes['TrackSimplified']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TrackSimplifiedResolvers<ContextType = ContextValue, ParentType extends ResolversParentTypes['TrackSimplified'] = ResolversParentTypes['TrackSimplified']> = ResolversObject<{
  artists?: Resolver<Array<ResolversTypes['Artist']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ContextValue> = ResolversObject<{
  Artist?: ArtistResolvers<ContextType>;
  ExternalUrl?: ExternalUrlResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RecommendationSeed?: RecommendationSeedResolvers<ContextType>;
  Recommendations?: RecommendationsResolvers<ContextType>;
  TrackSimplified?: TrackSimplifiedResolvers<ContextType>;
}>;
