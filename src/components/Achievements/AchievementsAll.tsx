import { BadgeCheck, Lock } from 'lucide-react';

const achievements = [
  {
    title: 'First TIL Logged',
    subtitle: 'You started your journey!',
    unlocked: true,
    icon: '🌱',
  },
  {
    title: '3-Day Streak',
    subtitle: 'Learning consistency is key.',
    unlocked: true,
    icon: '🔥',
  },
  {
    title: 'Top Category: Science',
    subtitle: '10 TILs logged in Science',
    unlocked: false,
    icon: '🔬',
  },
  {
    title: 'You helped 25 people learn',
    subtitle: 'Based on upvotes this week',
    unlocked: false,
    icon: '💡',
  },
];

const AchievementsAll = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      {achievements.map((ach, i) => (
        <div
          key={i}
          className={`flex items-center gap-4 p-4 rounded-md border ${
            ach.unlocked ? 'bg-white' : 'bg-muted'
          }`}
        >
          <div className="text-3xl">{ach.icon}</div>
          <div className="flex-1">
            <p className="text-sm font-medium">{ach.title}</p>
            <p className="text-xs text-muted-foreground">{ach.subtitle}</p>
          </div>
          {ach.unlocked ? (
            <BadgeCheck className="w-5 h-5 text-green-600" />
          ) : (
            <Lock className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      ))}
    </div>
  );
};

export default AchievementsAll;
