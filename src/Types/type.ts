// Book type stored in MongoDB
export interface Book {
  _id?: string;
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  image: string;
  description: string;
  userName: string;
  userEmail: string;
  createdAt?: Date;
}

// Type for adding a new book from frontend
export interface NewBook {
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  image: string;
  description: string;
  userName: string;
  userEmail: string;
}

// Backend API response
export interface AddBookResponse {
  message: string;
  insertedId?: string;
}