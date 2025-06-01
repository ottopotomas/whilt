import { BellIcon } from "./BellIcon";
import { CheckIcon } from "./CheckIcon";
import { WarningIcon } from "./WarningIcon";
import { PartyIcon } from "./PartyIcon";
import { BrainIcon } from "./BrainIcon";
import { TrophyIcon } from "./TrophyIcon";
import { HeartIcon } from "./HeartIcon";
import { CommentIcon } from "./CommentIcon";
import { CrownIcon } from "./CrownIcon";
import { ChartIcon } from "./ChartIcon";
import { PencilIcon } from "./PencilIcon";

const iconMap = {
  test: BellIcon,
  saved: CheckIcon,
  streak: WarningIcon,
  achievement: PartyIcon,
  levelup: BrainIcon,
  badge: TrophyIcon,
  like: HeartIcon,
  comment: CommentIcon,
  toplearner: CrownIcon,
  stats: ChartIcon,
  essay: PencilIcon,
};

type NotificationType =
  | "test"
  | "saved"
  | "streak"
  | "achievement"
  | "levelup"
  | "badge"
  | "like"
  | "comment"
  | "toplearner"
  | "stats"
  | "essay";

interface Props {
  type: NotificationType;
  size?: number;
  className?: string;
}
export type { NotificationType };
export function NotificationIcon({ type, size = 20, className = "" }: Props) {
  const Icon = iconMap[type] || BellIcon;
  return <Icon size={size} className={className} />;
}