#!/bin/bash
set -e

echo "Building Nubilum wheel package..."

# Clean previous builds
rm -rf build/ dist/ *.egg-info

# Build the wheel
python3 -m pip install --upgrade build
python3 -m build

echo "Build complete! Wheel files are in the dist/ directory:"
ls -lh dist/

echo ""
echo "To install the wheel, run:"
echo "  pip install dist/nubilum-1.0.0-py3-none-any.whl"
