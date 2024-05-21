export interface  NotificationResponse {
  id: string;
  name: string;
  type: string;
  content: string;
  dateEntered: string;
  parentId: string;
  parentType: string;
  isRead: boolean;
  newType: string;
  userId: string;
}
