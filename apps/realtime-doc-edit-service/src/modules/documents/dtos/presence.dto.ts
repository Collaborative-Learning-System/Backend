export interface CursorPosition {
  x: number;
  y: number;
  selection?: {
    from: number;
    to: number;
  };
}

export interface OnlineUser {
  userId: string;
  name: string;
  isOnline: boolean;
  isActive?: boolean;
  lastActivity?: Date;
  cursor?: CursorPosition;
}

export interface UserPresence {
  userId: string;
  name: string;
  docId: string;
  joinedAt: Date;
  lastActivity: Date;
  isOnline: boolean;
  cursor?: CursorPosition;
}

export class JoinDocDto {
  docId: string;
  userId: string;
}

export class SyncUpdateDto {
  docId: string;
  content: Uint8Array;
  userId: string;
}

export class TitleUpdateDto {
  docId: string;
  title: string;
  userId: string;
}

export class CursorMoveDto {
  docId: string;
  userId: string;
  cursor: CursorPosition;
}

export class UserActivityDto {
  docId: string;
  userId: string;
}

export class HeartbeatDto {
  docId: string;
  userId: string;
}

export class LeaveWorkspaceDto {
  userId: string;
  groupId?: string;
}

export class BeforeUnloadDto {
  userId: string;
}
