"""Usage tracking module for Nubilum anonymization tool."""

import json
import logging
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional
from collections import defaultdict

logger = logging.getLogger(__name__)


class UsageTracker:
    """Tracks usage statistics for message anonymization."""

    def __init__(self, log_file: str = "usage_log.jsonl"):
        """
        Initialize the usage tracker.

        Args:
            log_file: Path to the JSONL log file for usage tracking
        """
        self.log_file = Path(log_file)
        self._ensure_log_file()

    def _ensure_log_file(self):
        """Ensure the log file exists and is writable."""
        try:
            self.log_file.parent.mkdir(parents=True, exist_ok=True)
            if not self.log_file.exists():
                self.log_file.touch()
                logger.info(f"Created usage log file: {self.log_file}")
        except Exception as e:
            logger.error(f"Failed to create usage log file: {e}")

    def _extract_message_type(self, message: str) -> Optional[str]:
        """
        Extract the message type from the MSH segment.

        Args:
            message: HL7 message string

        Returns:
            Message type (e.g., 'ADT^A01', 'ORU^R01') or None
        """
        if not message:
            return None

        try:
            lines = message.split('\n')
            for line in lines:
                if line.startswith('MSH'):
                    # MSH segment: MSH|^~\&|...|...|...|...|timestamp||MSG_TYPE|...
                    fields = line.split('|')
                    if len(fields) > 8:
                        # Field 9 is the message type (0-indexed field 8)
                        return fields[8].strip() if fields[8] else "UNKNOWN"
            return "NO_MSH_SEGMENT"
        except Exception as e:
            logger.error(f"Failed to extract message type: {e}")
            return "ERROR"

    def _count_segments(self, message: str) -> Dict[str, int]:
        """
        Count the number of each segment type in the message.

        Args:
            message: HL7 message string

        Returns:
            Dictionary mapping segment type to count
        """
        segment_counts = defaultdict(int)
        if not message:
            return dict(segment_counts)

        try:
            lines = message.split('\n')
            for line in lines:
                line = line.strip()
                if line and '|' in line:
                    segment_type = line.split('|')[0]
                    if segment_type:
                        segment_counts[segment_type] += 1
        except Exception as e:
            logger.error(f"Failed to count segments: {e}")

        return dict(segment_counts)

    def track_anonymization(self, original_message: str, success: bool = True,
                           error: Optional[str] = None) -> None:
        """
        Track an anonymization event.

        Args:
            original_message: The original HL7 message before anonymization
            success: Whether the anonymization was successful
            error: Error message if anonymization failed
        """
        try:
            message_type = self._extract_message_type(original_message)
            segment_counts = self._count_segments(original_message)

            event = {
                "timestamp": datetime.now().isoformat(),
                "date": datetime.now().strftime("%Y-%m-%d"),
                "time": datetime.now().strftime("%H:%M:%S"),
                "message_type": message_type,
                "segment_counts": segment_counts,
                "total_segments": sum(segment_counts.values()),
                "message_length": len(original_message) if original_message else 0,
                "success": success,
                "error": error
            }

            # Append to JSONL file
            with open(self.log_file, 'a', encoding='utf-8') as f:
                f.write(json.dumps(event) + '\n')

            logger.info(f"Tracked anonymization: type={message_type}, success={success}")

        except Exception as e:
            logger.error(f"Failed to track usage: {e}")

    def get_statistics(self, days: Optional[int] = None) -> Dict:
        """
        Get usage statistics from the log file.

        Args:
            days: Number of days to look back (None for all time)

        Returns:
            Dictionary with usage statistics
        """
        try:
            if not self.log_file.exists():
                return self._empty_statistics()

            events = []
            cutoff_date = None
            if days is not None:
                cutoff_date = datetime.now().date()
                from datetime import timedelta
                cutoff_date = cutoff_date - timedelta(days=days)

            # Read all events from JSONL file
            with open(self.log_file, 'r', encoding='utf-8') as f:
                for line in f:
                    try:
                        event = json.loads(line.strip())

                        # Filter by date if specified
                        if cutoff_date:
                            event_date = datetime.fromisoformat(event['timestamp']).date()
                            if event_date < cutoff_date:
                                continue

                        events.append(event)
                    except json.JSONDecodeError:
                        continue

            return self._compute_statistics(events)

        except Exception as e:
            logger.error(f"Failed to get statistics: {e}")
            return self._empty_statistics()

    def _empty_statistics(self) -> Dict:
        """Return empty statistics structure."""
        return {
            "total_anonymizations": 0,
            "successful_anonymizations": 0,
            "failed_anonymizations": 0,
            "success_rate": 0.0,
            "message_types": {},
            "segments_processed": {},
            "total_segments": 0,
            "total_message_length": 0,
            "daily_counts": {},
            "hourly_distribution": {},
        }

    def _compute_statistics(self, events: List[Dict]) -> Dict:
        """
        Compute statistics from a list of events.

        Args:
            events: List of event dictionaries

        Returns:
            Dictionary with computed statistics
        """
        total = len(events)
        successful = sum(1 for e in events if e.get('success', True))
        failed = total - successful

        message_types = defaultdict(int)
        segments_processed = defaultdict(int)
        total_segments = 0
        total_message_length = 0
        daily_counts = defaultdict(int)
        hourly_distribution = defaultdict(int)

        for event in events:
            # Message types
            msg_type = event.get('message_type', 'UNKNOWN')
            message_types[msg_type] += 1

            # Segments
            for segment, count in event.get('segment_counts', {}).items():
                segments_processed[segment] += count

            total_segments += event.get('total_segments', 0)
            total_message_length += event.get('message_length', 0)

            # Daily counts
            date = event.get('date', 'UNKNOWN')
            daily_counts[date] += 1

            # Hourly distribution
            try:
                timestamp = datetime.fromisoformat(event['timestamp'])
                hour = timestamp.hour
                hourly_distribution[hour] += 1
            except (KeyError, ValueError):
                pass

        return {
            "total_anonymizations": total,
            "successful_anonymizations": successful,
            "failed_anonymizations": failed,
            "success_rate": round((successful / total * 100) if total > 0 else 0.0, 2),
            "message_types": dict(sorted(message_types.items(), key=lambda x: x[1], reverse=True)),
            "segments_processed": dict(sorted(segments_processed.items(), key=lambda x: x[1], reverse=True)),
            "total_segments": total_segments,
            "total_message_length": total_message_length,
            "average_message_length": round(total_message_length / total) if total > 0 else 0,
            "average_segments_per_message": round(total_segments / total, 1) if total > 0 else 0,
            "daily_counts": dict(sorted(daily_counts.items())),
            "hourly_distribution": dict(sorted(hourly_distribution.items())),
        }
