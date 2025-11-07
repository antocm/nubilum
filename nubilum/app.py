"""Flask application for Nubilum HL7 anonymization service."""

import logging
import os
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from nubilum.anonymizer import HL7Anonymizer
from nubilum import __version__

# Configure logging
log_dir = os.environ.get('NUBILUM_LOG_DIR', '/var/log/nubilum')
os.makedirs(log_dir, exist_ok=True)

log_file = os.path.join(log_dir, f'nubilum_{datetime.now().strftime("%Y%m%d")}.log')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(log_file),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

app = Flask(__name__, static_folder='static', static_url_path='')
CORS(app)

# Configure Flask
app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024  # 1MB max message size


@app.route('/')
def index():
    """Serve the main application page."""
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'version': __version__,
        'timestamp': datetime.utcnow().isoformat()
    })


@app.route('/api/version', methods=['GET'])
def version():
    """Return application version."""
    return jsonify({
        'version': __version__,
        'name': 'Nubilum'
    })


@app.route('/api/anonymize', methods=['POST'])
def anonymize():
    """
    Anonymize an HL7 message.

    Expected JSON payload:
    {
        "message": "MSH|^~\\&|..."
    }

    Returns:
    {
        "anonymized_message": "MSH|^~\\&|...",
        "success": true
    }
    """
    try:
        data = request.get_json()

        if not data:
            logger.warning("No JSON data provided")
            return jsonify({
                'success': False,
                'error': 'No data provided'
            }), 400

        message = data.get('message', '')

        if not message or message.strip() == '':
            logger.warning("Empty message provided")
            return jsonify({
                'success': False,
                'error': 'Message is required'
            }), 400

        logger.info(f"Received message for anonymization (length: {len(message)} chars)")

        # Create anonymizer instance
        anonymizer = HL7Anonymizer()

        # Anonymize the message
        anonymized = anonymizer.anonymize_message(message)

        logger.info(f"Message anonymized successfully (output length: {len(anonymized)} chars)")

        return jsonify({
            'success': True,
            'anonymized_message': anonymized
        })

    except Exception as e:
        logger.error(f"Error during anonymization: {str(e)}", exc_info=True)
        return jsonify({
            'success': False,
            'error': f'Anonymization failed: {str(e)}'
        }), 500


@app.errorhandler(413)
def request_entity_too_large(error):
    """Handle file too large errors."""
    logger.warning("Message too large")
    return jsonify({
        'success': False,
        'error': 'Message too large. Maximum size is 1MB.'
    }), 413


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors."""
    return jsonify({
        'success': False,
        'error': 'Endpoint not found'
    }), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle internal server errors."""
    logger.error(f"Internal server error: {str(error)}", exc_info=True)
    return jsonify({
        'success': False,
        'error': 'Internal server error'
    }), 500


def create_app():
    """Application factory."""
    return app


if __name__ == '__main__':
    logger.info(f"Starting Nubilum v{__version__}")
    app.run(host='0.0.0.0', port=5000, debug=False)
