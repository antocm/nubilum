#!/bin/bash
# Activation helper script for Nubilum development environment
# Usage: source activate.sh

if [ -d "venv" ]; then
    source venv/bin/activate
    export NUBILUM_LOG_DIR=./logs
    echo "✓ Virtual environment activated"
    echo "✓ NUBILUM_LOG_DIR set to ./logs"
    echo ""
    echo "Python: $(python --version)"
    echo "Nubilum: v$(python -c 'from nubilum import __version__; print(__version__)')"
    echo ""
    echo "To run the application:"
    echo "  python -m nubilum.app         # Development server (port 5000)"
    echo "  gunicorn nubilum.app:app      # Production server"
    echo ""
else
    echo "Error: Virtual environment not found!"
    echo "Run './run_dev.sh' to create it."
fi
