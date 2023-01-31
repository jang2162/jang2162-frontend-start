export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
  Datetime: Date;
  Timestamp: Date;
  Void: any;
};

export type CursorPageInfo = {
  __typename?: 'CursorPageInfo';
  hasMore: Scalars['Boolean'];
  next?: Maybe<Scalars['String']>;
  prev?: Maybe<Scalars['String']>;
  totalCount: Scalars['Int'];
};

export type CursorPageInput = {
  cursor?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  authentication?: Maybe<Scalars['String']>;
  insertTempPost?: Maybe<Scalars['Void']>;
  insertTempUser?: Maybe<Scalars['Void']>;
  invalidate?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};


export type MutationAuthenticationArgs = {
  id: Scalars['String'];
  pw: Scalars['String'];
};


export type MutationInsertTempPostArgs = {
  content: Scalars['String'];
  title: Scalars['String'];
  writerId: Scalars['Int'];
};


export type MutationInsertTempUserArgs = {
  birth: Scalars['Date'];
  name: Scalars['String'];
};

export type OffsetPageInput = {
  pageIndex?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  nowDate?: Maybe<Scalars['Date']>;
  nowDateArr?: Maybe<Array<Maybe<Scalars['Date']>>>;
  nowDateArrNN: Array<Maybe<Scalars['Date']>>;
  nowDateNN: Scalars['Date'];
  nowDateNNArr?: Maybe<Array<Scalars['Date']>>;
  nowDateNNArrNN: Array<Scalars['Date']>;
  nowDatetime?: Maybe<Scalars['Datetime']>;
  nowTimestamp?: Maybe<Scalars['Timestamp']>;
  selectPostById: TempPost;
  selectPosts: Array<TempPost>;
  selectUserById: TempUser;
  selectUsers: Array<TempUser>;
};


export type QuerySelectPostByIdArgs = {
  id: Scalars['Int'];
};


export type QuerySelectUserByIdArgs = {
  id: Scalars['Int'];
};

export type TempPost = {
  __typename?: 'TempPost';
  content: Scalars['String'];
  id: Scalars['ID'];
  postId: Scalars['Int'];
  regDate: Scalars['Date'];
  title: Scalars['String'];
  writer: TempUser;
  writerId: Scalars['Int'];
};

export type TempUser = {
  __typename?: 'TempUser';
  birth: Scalars['Date'];
  id: Scalars['ID'];
  name: Scalars['String'];
  posts: Array<TempPost>;
  userId: Scalars['Int'];
};

export type AccessToken = {
  __typename?: 'accessToken';
  token: Scalars['String'];
};
