import { parseISO, formatDistanceToNow } from "date-fns";

interface Props {
  timestamp: string;
}

const TimeAgo = ({ timestamp }: Props) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return <span title={timestamp}>{timeAgo}</span>;
};

export default TimeAgo;
