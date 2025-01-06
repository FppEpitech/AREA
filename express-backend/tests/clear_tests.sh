#!/bin/bash

# Stop PostgreSQL service if running
echo "Stopping PostgreSQL service..."
sudo systemctl stop postgresql || exit 1

# Wait for PostgreSQL to stop
sleep 1

# Start PostgreSQL service
echo "Starting PostgreSQL service..."
sudo systemctl start postgresql || exit 1

# Wait for PostgreSQL to start
sleep 1

# Ensure PostgreSQL is running before attempting to drop database and user
if ! sudo systemctl is-active --quiet postgresql; then
  echo "PostgreSQL service is not active. Exiting."
  exit 1
fi

# Drop test database and user
echo "Dropping test database..."
sudo -u postgres psql -c "DROP DATABASE IF EXISTS test_db;"

echo "Test environment cleared successfully!"
