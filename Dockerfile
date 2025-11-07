# Multi-stage build for Nubilum
FROM python:3.11-slim as builder

WORKDIR /build

# Install build dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc && \
    rm -rf /var/lib/apt/lists/*

# Copy project files
COPY pyproject.toml setup.py MANIFEST.in LICENSE README.md ./
COPY nubilum/ ./nubilum/

# Build the wheel
RUN pip install --no-cache-dir build && \
    python -m build --wheel

# Final stage
FROM python:3.11-slim

# Install nginx and supervisor
RUN apt-get update && \
    apt-get install -y --no-install-recommends nginx supervisor && \
    rm -rf /var/lib/apt/lists/*

# Create application user
RUN useradd -m -u 1000 nubilum && \
    mkdir -p /var/log/nubilum && \
    chown -R nubilum:nubilum /var/log/nubilum

# Copy wheel from builder
COPY --from=builder /build/dist/*.whl /tmp/

# Install the application
RUN pip install --no-cache-dir /tmp/*.whl && \
    pip install --no-cache-dir gunicorn && \
    rm /tmp/*.whl

# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/sites-available/nubilum
RUN rm -f /etc/nginx/sites-enabled/default && \
    ln -s /etc/nginx/sites-available/nubilum /etc/nginx/sites-enabled/nubilum

# Copy supervisor configuration
COPY docker/supervisord.conf /etc/supervisor/conf.d/nubilum.conf

# Create necessary directories
RUN mkdir -p /var/log/supervisor /var/run/supervisor

# Expose port
EXPOSE 80

# Set environment variables
ENV NUBILUM_LOG_DIR=/var/log/nubilum
ENV PYTHONUNBUFFERED=1

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/api/health || exit 1

# Install curl for healthcheck
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    rm -rf /var/lib/apt/lists/*

# Run supervisor
CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/supervisord.conf"]
