# Usage Tracking in Nubilum

## Overview

Nubilum includes built-in usage tracking to help administrators monitor how the tool is being used without compromising patient privacy. The tracking system records **metadata only** - no message content or PHI is ever stored.

## What Gets Tracked

For each anonymization event, the system records:

| Field | Description | Example |
|-------|-------------|---------|
| `timestamp` | ISO 8601 timestamp | `2025-01-07T14:23:45.123456` |
| `date` | Date of the event | `2025-01-07` |
| `time` | Time of the event | `14:23:45` |
| `message_type` | HL7 message type from MSH-9 | `ADT^A01` |
| `segment_counts` | Count of each segment type | `{"PID": 1, "OBR": 3, "OBX": 12}` |
| `total_segments` | Total segments in message | `17` |
| `message_length` | Character count | `2048` |
| `success` | Whether anonymization succeeded | `true` |
| `error` | Error message if failed | `null` or error string |

## Log File Location

Usage data is stored in JSONL (JSON Lines) format:

- **Default location**: `/var/log/nubilum/usage_log.jsonl`
- **Docker volume**: Mount `/var/log/nubilum` to persist logs
- **Format**: One JSON object per line

### Example Log Entry

```json
{
  "timestamp": "2025-01-07T14:23:45.123456",
  "date": "2025-01-07",
  "time": "14:23:45",
  "message_type": "ADT^A01",
  "segment_counts": {
    "MSH": 1,
    "EVN": 1,
    "PID": 1,
    "NK1": 1,
    "PV1": 1
  },
  "total_segments": 5,
  "message_length": 512,
  "success": true,
  "error": null
}
```

## API Endpoint

### Get Usage Statistics

**Endpoint**: `GET /api/usage/statistics`

**Query Parameters**:
- `days` (optional): Number of days to look back. Omit for all-time statistics.

**Examples**:

```bash
# All-time statistics
curl http://localhost:8080/api/usage/statistics

# Last 7 days
curl http://localhost:8080/api/usage/statistics?days=7

# Last 30 days
curl http://localhost:8080/api/usage/statistics?days=30
```

**Response Structure**:

```json
{
  "success": true,
  "period": "last 7 days",
  "statistics": {
    "total_anonymizations": 145,
    "successful_anonymizations": 143,
    "failed_anonymizations": 2,
    "success_rate": 98.62,
    "message_types": {
      "ADT^A01": 56,
      "ORU^R01": 42,
      "ORM^O01": 28,
      "SIU^S12": 19
    },
    "segments_processed": {
      "MSH": 145,
      "PID": 145,
      "PV1": 98,
      "OBR": 70,
      "OBX": 312,
      "NK1": 23
    },
    "total_segments": 1023,
    "average_segments_per_message": 7.1,
    "total_message_length": 234567,
    "average_message_length": 1618,
    "daily_counts": {
      "2025-01-07": 42,
      "2025-01-08": 38,
      "2025-01-09": 65
    },
    "hourly_distribution": {
      "9": 12,
      "10": 23,
      "11": 18,
      "14": 31,
      "15": 27,
      "16": 19
    }
  }
}
```

## Use Cases

### 1. Monitor Tool Adoption

Track how frequently the tool is being used:

```bash
# Get daily usage trends
curl http://localhost:8080/api/usage/statistics | jq '.statistics.daily_counts'
```

### 2. Identify Peak Usage Times

Understand when users are most active:

```bash
# Get hourly distribution
curl http://localhost:8080/api/usage/statistics | jq '.statistics.hourly_distribution'
```

### 3. Message Type Analysis

See which HL7 message types are most common:

```bash
# Get message type breakdown
curl http://localhost:8080/api/usage/statistics | jq '.statistics.message_types'
```

### 4. Success Rate Monitoring

Track anonymization reliability:

```bash
# Get success rate
curl http://localhost:8080/api/usage/statistics | jq '.statistics.success_rate'
```

### 5. Capacity Planning

Estimate resource needs based on usage:

```bash
# Get average message size and complexity
curl http://localhost:8080/api/usage/statistics | jq '.statistics | {avg_length, avg_segments}'
```

## Analyzing Usage Logs

### Using jq (JSON processor)

```bash
# Count total events
wc -l /var/log/nubilum/usage_log.jsonl

# Find failed anonymizations
cat usage_log.jsonl | jq 'select(.success == false)'

# Group by message type
cat usage_log.jsonl | jq -r '.message_type' | sort | uniq -c | sort -rn

# Find busy hours
cat usage_log.jsonl | jq -r '.time' | cut -d: -f1 | sort | uniq -c

# Messages by date
cat usage_log.jsonl | jq -r '.date' | sort | uniq -c
```

### Using Python

```python
import json
from collections import Counter

# Load and analyze usage data
with open('/var/log/nubilum/usage_log.jsonl', 'r') as f:
    events = [json.loads(line) for line in f]

# Count by message type
msg_types = Counter(e['message_type'] for e in events)
print("Top message types:", msg_types.most_common(5))

# Calculate average segments
avg_segments = sum(e['total_segments'] for e in events) / len(events)
print(f"Average segments per message: {avg_segments:.1f}")

# Success rate
successes = sum(1 for e in events if e['success'])
rate = (successes / len(events)) * 100
print(f"Success rate: {rate:.2f}%")
```

## Privacy & Compliance

### What is NOT tracked:

- ❌ Actual message content
- ❌ Patient names, IDs, or demographics
- ❌ Provider information
- ❌ Clinical data
- ❌ IP addresses or user identifiers

### What IS tracked:

- ✅ Timestamp of anonymization
- ✅ Message type (MSH-9 field)
- ✅ Segment type counts
- ✅ Message size in characters
- ✅ Success/failure status

### HIPAA Compliance

The usage tracking system is designed to be HIPAA compliant:

1. **No PHI Storage**: No Protected Health Information is recorded
2. **Metadata Only**: Only statistical and structural information is logged
3. **No De-identification Risk**: Impossible to reconstruct original messages
4. **Audit Support**: Provides accountability without compromising privacy

## Log Rotation

Consider implementing log rotation to manage disk space:

### Using logrotate (Linux)

Create `/etc/logrotate.d/nubilum`:

```
/var/log/nubilum/usage_log.jsonl {
    daily
    rotate 90
    compress
    delaycompress
    notifempty
    missingok
    create 0644 root root
}
```

### Manual Rotation Script

```bash
#!/bin/bash
# Rotate usage log monthly

LOG_DIR="/var/log/nubilum"
TIMESTAMP=$(date +%Y%m)

cd $LOG_DIR
mv usage_log.jsonl usage_log_${TIMESTAMP}.jsonl
gzip usage_log_${TIMESTAMP}.jsonl

# Keep last 12 months
find $LOG_DIR -name "usage_log_*.jsonl.gz" -mtime +365 -delete
```

## Dashboard Integration

The usage statistics can be integrated with monitoring dashboards:

### Prometheus/Grafana

Create a custom exporter that reads the statistics endpoint.

### ELK Stack

Use Filebeat to ship the JSONL logs to Elasticsearch:

```yaml
filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /var/log/nubilum/usage_log.jsonl
  json.keys_under_root: true
  json.add_error_key: true

output.elasticsearch:
  hosts: ["localhost:9200"]
  index: "nubilum-usage-%{+yyyy.MM.dd}"
```

### Custom Dashboard

Build a simple web dashboard that queries `/api/usage/statistics`:

```javascript
// Fetch and display statistics
fetch('/api/usage/statistics?days=30')
  .then(res => res.json())
  .then(data => {
    const stats = data.statistics;
    console.log(`Total: ${stats.total_anonymizations}`);
    console.log(`Success Rate: ${stats.success_rate}%`);
    // Render charts...
  });
```

## Troubleshooting

### Log file not created

Check permissions:
```bash
ls -la /var/log/nubilum/
```

Ensure the application has write permissions to the log directory.

### Statistics returning empty

Verify the log file exists and contains data:
```bash
cat /var/log/nubilum/usage_log.jsonl | head -5
```

### Large log file

Implement log rotation or periodically archive old entries:
```bash
# Archive entries older than 90 days
python scripts/archive_usage_logs.py --days 90
```

---

**Version**: 1.0.0
**Updated**: January 2025
**Part of**: Nubilum - HL7 Portugal Message Anonymization Tool
