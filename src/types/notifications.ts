export type NotificationType = 'sale' | 'update' | 'alert' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  timestamp: string;
}
