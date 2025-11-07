#!/bin/bash
# Development runner script

set -e

echo "Starting Nubilum in development mode..."

# Create log directory if it doesn't exist
mkdir -p logs

# Set environment variables
export NUBILUM_LOG_DIR=./logs
export FLASK_ENV=development

# Install dependencies if needed
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate

echo "Installing dependencies..."
pip install -e .

echo "Starting Flask development server..."
echo "Access the application at: http://localhost:5000"
echo ""

python -m nubilum.app
