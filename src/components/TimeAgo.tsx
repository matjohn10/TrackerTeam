import { cn } from "@/lib/utils";
import { parseISO, formatDistanceToNow } from "date-fns";

interface Props {
  timestamp: string;
  className?: string;
}

const TimeAgo = ({ timestamp, className }: Props) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return (
    <span title={timestamp} className={cn(className)}>
      {timeAgo}
    </span>
  );
};

export default TimeAgo;
