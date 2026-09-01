#!/bin/sh
# ============================================
# Wait for PostgreSQL to be ready
# ============================================
# Polls the database until it accepts connections.
# Prevents "UnknownHostException" and connection failures.
# ============================================

set -e

HOST="${DB_HOST:-postgres}"
PORT="${DB_PORT:-5432}"
MAX_RETRIES=30
RETRY_INTERVAL=2

echo "⏳ Waiting for PostgreSQL at ${HOST}:${PORT}..."

i=1
while [ "$i" -le "$MAX_RETRIES" ]; do
  # Try to open a TCP connection to postgres
  if nc -z "$HOST" "$PORT" 2>/dev/null; then
    echo "✅ PostgreSQL is ready at ${HOST}:${PORT}"
    exit 0
  fi

  echo "   Attempt ${i}/${MAX_RETRIES} — PostgreSQL not ready, retrying in ${RETRY_INTERVAL}s..."
  sleep "$RETRY_INTERVAL"
  i=$((i + 1))
done

echo "❌ PostgreSQL did not become ready after ${MAX_RETRIES} attempts"
exit 1
