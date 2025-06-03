// src/components/NotificationCard.tsx
'use client';

import React from 'react';
import { NotificationIcon, type NotificationType } from './icons/NotificationIcon';

export interface NotificationCardProps {
  type: NotificationType;
  message: string;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({ type, message }) => {
  return (
    <div className="flex items-start gap-3 p-3 bg-white rounded-xl shadow-sm mb-3">
      <NotificationIcon type={type} size={20} className="text-teal-600 mt-1" />
      <p className="text-sm text-gray-800 leading-snug">{message}</p>
    </div>
  );
};

export default NotificationCard;
