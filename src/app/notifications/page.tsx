"use client";

import NotificationCard from "../../components/NotificationCard";
import { type NotificationType } from "../../components/icons/NotificationIcon";

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "test",
    message: "Your memory test for The Dopamine Cycle is ready!",
  },
  {
    id: "2",
    type: "saved",
    message: "5 people saved your TIL: How vaccines work",
  },
  {
    id: "3",
    type: "streak",
    message: "You’re one test away from completing this week’s learning streak!",
  },
  {
    id: "4",
    type: "levelup",
    message: "You just reached Level 2 in Mindset — Growth Seeker unlocked!",
  },
  {
    id: "5",
    type: "badge",
    message: "You've unlocked: Apprentice Philosopher",
  },
  {
    id: "6",
    type: "like",
    message: "Your TIL just hit 10 likes!",
  },
];

export default function NotificationsPage() {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-teal-700">Notifications</h1>
      {notifications.map((n) => (
        <NotificationCard key={n.id} type={n.type} message={n.message} />
      ))}
    </div>
  );
}
