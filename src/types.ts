export interface Post {
  id: string;
  title: string;
  content: string;
  userId: string,
  createdAt: string,
  updatedAt: string,
}

export interface User { 
  id: string;
  name: string;
  email: string;
  pictureUrl: string;
}

export interface ClerkUserEventData {
  id: string;
  email_addresses: { email_address: string }[];
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  image_url: string | null;
}

export interface ClerkWebhookEvent {
  type: string;
  data: ClerkUserEventData;
}

export interface Comment {
  id?: string;
  postId: string;
  userId: string;
  content: string;
}

export interface Tag {
  id?: string;
  name: string;
}

export interface PostTag {
  postId: string;
  tagId: string;
}

export interface Like {
  postId: string;
  userId: string;
}

export interface Follower {
  followerId: string;
  followingId: string;
}

export interface Media {
  id?: string,
  postId: number,
  url: string,
  mediatype: string
}

export interface PageParams {
  id: string;
}

export interface FormFields {
  title: string;
  content: string;
  userId: string;
}

export interface UploadedFile {
  filepath: string;
  originalFilename: string;
}

export interface FormData {
  fields: FormFields;
  files: {
    image?: UploadedFile;
  };
}
