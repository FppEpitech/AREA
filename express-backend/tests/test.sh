#!/bin/bash

# Define the path for the .env file
ENV_FILE=".env"
TEMP_ENV_FILE="/tmp/.env"

# Check if .env exists at the start of the script
if [ -f "$ENV_FILE" ]; then
  echo ".env file found. Saving to /tmp."
  cp "$ENV_FILE" "$TEMP_ENV_FILE"
else
  echo ".env file not found, skipping backup."
fi

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

# Drop test database
echo "Dropping test database..."
sudo -u postgres psql -c "DROP DATABASE IF EXISTS test_db;"

# Drop test user
echo "Dropping test user..."
sudo -u postgres psql -c "DROP USER IF EXISTS test_user;"

# Ensure the PostgreSQL service is stopped at the end
echo "Stopping PostgreSQL service after cleanup..."
sudo systemctl stop postgresql || exit 1

# Wait a bit before finishing
sleep 1

# Restore the .env file if it was backed up
if [ -f "$TEMP_ENV_FILE" ]; then
  echo "Restoring .env file from backup."
  cp "$TEMP_ENV_FILE" "$ENV_FILE"
  # Optionally, remove the temporary backup file
  rm "$TEMP_ENV_FILE"
else
  echo ".env file was not backed up, skipping restore."
fi

echo "Test environment cleared successfully!"
