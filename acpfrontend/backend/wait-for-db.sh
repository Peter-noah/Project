#!/bin/sh

# Wait until PostgreSQL is ready
echo "Waiting for the database..."

while ! nc -z $POSTGRES_HOST 5432; do
  sleep 1
done

echo "PostgreSQL started"

# Run the command passed to the script (e.g., uvicorn)
exec "$@"