export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  role: string;
}

export interface Post {
  id: string;
  title: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

