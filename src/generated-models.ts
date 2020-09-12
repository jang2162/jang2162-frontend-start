/* tslint:ignore */
export type Maybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date scalar type */
  Date: Date;
  /** DateTime scalar type */
  DateTime: Date;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AccessToken = {
  __typename?: 'accessToken';
  token: Scalars['String'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type DateTest = {
  dt: Scalars['Date'];
};


export enum Direction_Type {
  Next = 'NEXT',
  Prev = 'PREV'
}

export type Mutation = {
  __typename?: 'Mutation';
  authentication?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
  invalidate?: Maybe<Scalars['String']>;
  addSampleUser?: Maybe<SampleUser>;
  addUser: User;
};


export type MutationAuthenticationArgs = {
  id: Scalars['String'];
  pw: Scalars['String'];
};


export type MutationAddSampleUserArgs = {
  user: SampleUserInput;
};


export type MutationAddUserArgs = {
  user: UserInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  totalCount: Scalars['Int'];
  next?: Maybe<Scalars['String']>;
  prev?: Maybe<Scalars['String']>;
  hasNext: Scalars['Boolean'];
  hasPrev: Scalars['Boolean'];
  sortBy: Scalars['String'];
  sort: Sort_Type;
  direction: Direction_Type;
};

export type PageInput = {
  cursor?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  sortBy?: Maybe<Scalars['String']>;
  sort?: Maybe<Sort_Type>;
  direction?: Maybe<Direction_Type>;
};

export type Query = {
  __typename?: 'Query';
  sampleUsers: SampleUserConnection;
  sampleUserById?: Maybe<SampleUser>;
  samplePosts: SamplePostConnection;
  samplePostById?: Maybe<SamplePost>;
  users: UserConnection;
  userById?: Maybe<User>;
};


export type QuerySampleUsersArgs = {
  form?: Maybe<SampleUserForm>;
};


export type QuerySampleUserByIdArgs = {
  id: Scalars['ID'];
};


export type QuerySamplePostsArgs = {
  form?: Maybe<SamplePostForm>;
};


export type QuerySamplePostByIdArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  form?: Maybe<UserForm>;
};


export type QueryUserByIdArgs = {
  id: Scalars['ID'];
};

export type SamplePost = {
  __typename?: 'SamplePost';
  id: Scalars['ID'];
  subject: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  writer: SampleUser;
  writer_id: Scalars['ID'];
};

export type SamplePostConnection = {
  __typename?: 'SamplePostConnection';
  pageInfo: PageInfo;
  list: Array<SamplePost>;
};

export type SamplePostForm = {
  page?: Maybe<PageInput>;
  searchKeyword?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  date1?: Maybe<DateTest>;
  date2?: Maybe<Array<Maybe<DateTest>>>;
  date3?: Maybe<Array<Maybe<Scalars['Date']>>>;
  date4: Array<Maybe<Scalars['Date']>>;
  date5?: Maybe<Array<Scalars['Date']>>;
  date6: Array<Scalars['Date']>;
};

export type SampleUser = {
  __typename?: 'SampleUser';
  id: Scalars['ID'];
  name: Scalars['String'];
  birthday?: Maybe<Scalars['Date']>;
  posts?: Maybe<SamplePostConnection>;
};


export type SampleUserPostsArgs = {
  page?: Maybe<PageInput>;
};

export type SampleUserConnection = {
  __typename?: 'SampleUserConnection';
  pageInfo: PageInfo;
  list?: Maybe<Array<SampleUser>>;
};

export type SampleUserForm = {
  page?: Maybe<PageInput>;
  name?: Maybe<Scalars['String']>;
};

export type SampleUserInput = {
  name: Scalars['String'];
  birthday?: Maybe<Scalars['Date']>;
};

export enum Sort_Type {
  Asc = 'ASC',
  Desc = 'DESC'
}


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  loginId: Scalars['String'];
  name: Scalars['String'];
  birthday?: Maybe<Scalars['Date']>;
  createDate: Scalars['Date'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  pageInfo: PageInfo;
  list?: Maybe<Array<User>>;
};

export type UserForm = {
  page?: Maybe<PageInput>;
  name?: Maybe<Scalars['String']>;
};

export type UserInput = {
  name: Scalars['String'];
  loginId: Scalars['String'];
  password: Scalars['String'];
  birthday?: Maybe<Scalars['Date']>;
};

