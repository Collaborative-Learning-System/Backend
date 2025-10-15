export interface SocketResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface DocumentInitData {
  update: Uint8Array;
  title: string;
}

export interface UserJoinedData {
  userId: string;
  name: string;
}

export interface UserLeftData {
  userId: string;
}

export interface OnlineUsersData {
  users: Array<{
    userId: string;
    name: string;
    isOnline: boolean;
    cursor?: {
      x: number;
      y: number;
      selection?: {
        from: number;
        to: number;
      };
    };
  }>;
}

export interface CursorUpdateData {
  userId: string;
  cursor: {
    x: number;
    y: number;
    selection?: {
      from: number;
      to: number;
    };
  };
}

export interface TitleUpdateData {
  title: string;
  userId: string;
}

export interface SyncUpdateData {
  content: Uint8Array;
}