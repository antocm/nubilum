"""Test script for usage tracking functionality."""

import json
import os
import tempfile
from pathlib import Path
from nubilum.usage_tracker import UsageTracker


def test_basic_tracking():
    """Test basic usage tracking."""
    # Create temporary log file
    with tempfile.TemporaryDirectory() as tmpdir:
        log_file = Path(tmpdir) / "test_usage.jsonl"
        tracker = UsageTracker(str(log_file))

        # Sample HL7 message
        sample_message = """MSH|^~\\&|SENDING_APP|SENDING_FACILITY|RECEIVING_APP|RECEIVING_FACILITY|20250107120000||ADT^A01|MSG00001|P|2.5
EVN|A01|20250107120000|||OPERATOR123^Smith^John
PID|1||123456789^^^HOSPITAL^MR||Doe^John^Robert||19800515|M|||123 Main Street^Apt 4B^Lisbon^Lisboa^1000-001^PT||+351912345678|+351213456789|EN|M|CAT|987654321^^^HOSPITAL^AN||123-45-6789
PV1|1|I|ICU^101^01^HOSPITAL|||DOC123^Johnson^Michael^^^Dr.|||SUR||||2|||DOC123^Johnson^Michael^^^Dr.|INP|VISIT123456|||||||||||||||||||HOSPITAL||REG|||20250107110000"""

        # Track anonymization
        tracker.track_anonymization(sample_message, success=True)

        # Verify log file was created
        assert log_file.exists(), "Log file should exist"

        # Read and verify content
        with open(log_file, 'r') as f:
            line = f.readline()
            event = json.loads(line)

        print("✓ Log entry created successfully")
        print(f"  Message type: {event['message_type']}")
        print(f"  Total segments: {event['total_segments']}")
        print(f"  Success: {event['success']}")

        # Get statistics
        stats = tracker.get_statistics()

        assert stats['total_anonymizations'] == 1
        assert stats['successful_anonymizations'] == 1
        assert stats['failed_anonymizations'] == 0
        assert stats['success_rate'] == 100.0
        assert 'ADT^A01' in stats['message_types']

        print("\n✓ Statistics computed correctly:")
        print(f"  Total: {stats['total_anonymizations']}")
        print(f"  Success rate: {stats['success_rate']}%")
        print(f"  Message types: {list(stats['message_types'].keys())}")
        print(f"  Segments processed: {list(stats['segments_processed'].keys())}")


def test_failed_anonymization():
    """Test tracking of failed anonymization."""
    with tempfile.TemporaryDirectory() as tmpdir:
        log_file = Path(tmpdir) / "test_usage.jsonl"
        tracker = UsageTracker(str(log_file))

        sample_message = "MSH|^~\\&|TEST|||||||ADT^A01|||"

        # Track failed anonymization
        tracker.track_anonymization(sample_message, success=False, error="Test error")

        stats = tracker.get_statistics()

        assert stats['total_anonymizations'] == 1
        assert stats['failed_anonymizations'] == 1
        assert stats['success_rate'] == 0.0

        print("\n✓ Failed anonymization tracked correctly:")
        print(f"  Total: {stats['total_anonymizations']}")
        print(f"  Failed: {stats['failed_anonymizations']}")
        print(f"  Success rate: {stats['success_rate']}%")


def test_multiple_messages():
    """Test tracking multiple messages of different types."""
    with tempfile.TemporaryDirectory() as tmpdir:
        log_file = Path(tmpdir) / "test_usage.jsonl"
        tracker = UsageTracker(str(log_file))

        messages = [
            ("MSH|^~\\&|TEST|FAC|RCV|FAC|20250107||ADT^A01|MSG1|P|2.5\nPID|1||123^^^HOSP^MR||DOE^JOHN||19800101|M", True),
            ("MSH|^~\\&|TEST|FAC|RCV|FAC|20250107||ORU^R01|MSG2|P|2.5\nOBR|1|||CBC|||", True),
            ("MSH|^~\\&|TEST|FAC|RCV|FAC|20250107||ADT^A01|MSG3|P|2.5\nEVN|A01||", True),
            ("MSH|^~\\&|TEST|FAC|RCV|FAC|20250107||ORM^O01|MSG4|P|2.5", False),
        ]

        for msg, success in messages:
            tracker.track_anonymization(msg, success=success)

        stats = tracker.get_statistics()

        assert stats['total_anonymizations'] == 4
        assert stats['successful_anonymizations'] == 3
        assert stats['failed_anonymizations'] == 1
        assert stats['success_rate'] == 75.0

        # Verify message types are tracked
        msg_types = stats['message_types']
        assert 'ADT^A01' in msg_types
        assert msg_types['ADT^A01'] == 2
        assert 'ORU^R01' in msg_types
        assert msg_types['ORU^R01'] == 1
        assert 'ORM^O01' in msg_types
        assert msg_types['ORM^O01'] == 1

        print("\n✓ Multiple messages tracked correctly:")
        print(f"  Total: {stats['total_anonymizations']}")
        print(f"  Success rate: {stats['success_rate']}%")
        print(f"  Message type breakdown: {stats['message_types']}")


if __name__ == '__main__':
    print("Testing Usage Tracking\n" + "=" * 50)

    try:
        test_basic_tracking()
        test_failed_anonymization()
        test_multiple_messages()

        print("\n" + "=" * 50)
        print("✅ All usage tracking tests passed!")

    except AssertionError as e:
        print(f"\n❌ Test failed: {e}")
        exit(1)
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
        exit(1)
