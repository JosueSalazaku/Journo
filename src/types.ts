export interface User {
  id: string;
  name: string;
  email: string;
  pictureUrl: string;
}

export interface Post {
  id: string;
  title: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

