// User Type
export interface User {
  _id: string;
  username: string;
}

// Message Type
export interface Message {
  from: string;
  to: string;
  message: string;
  timestamp: string;
}
