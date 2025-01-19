#!/bin/bash

# Define the path for the .env file
ENV_FILE=".env"
TEMP_ENV_FILE="/tmp/.env"
TEST_DB_NAME="test_db"
TEST_USER="test_user"
TEST_PASSWORD="test_password"  # Optional: Use a password if needed
PORT="5433"  # Port for the test database

# Check if .env exists at the start of the script
if [ -f "$ENV_FILE" ]; then
  echo ".env file found. Saving to /tmp."
  cp "$ENV_FILE" "$TEMP_ENV_FILE"
else
  echo ".env file not found, skipping backup."
fi

# Stop PostgreSQL service if running
echo "Ensuring PostgreSQL service is running..."
sudo systemctl start postgresql || exit 1

# Wait for PostgreSQL to start (increase the wait time if necessary)
sleep 5

# Ensure PostgreSQL is running before attempting to create database and user
if ! sudo systemctl is-active --quiet postgresql; then
  echo "PostgreSQL service is not active. Exiting."
  exit 1
fi

# Create a temporary .env file with the new configuration for testing
echo "Creating temporary .env file with test settings..."
echo "PORT=$PORT" > "$ENV_FILE"
echo "DATABASE_URL=postgresql://$TEST_USER:$TEST_PASSWORD@localhost:$PORT/$TEST_DB_NAME" >> "$ENV_FILE"
echo "SECRET=SECRET" >> "$ENV_FILE"

# Create test database and user if they do not exist
echo "Creating test database '$TEST_DB_NAME' and user '$TEST_USER'..."

# Check if the database exists
if ! sudo -u postgres psql -tc "SELECT 1 FROM pg_database WHERE datname = '$TEST_DB_NAME'" | grep -q 1; then
  sudo -u postgres psql -c "CREATE DATABASE $TEST_DB_NAME;" || exit 1
else
  echo "Database $TEST_DB_NAME already exists."
fi

# Create user if it does not exist
if ! sudo -u postgres psql -tc "SELECT 1 FROM pg_roles WHERE rolname = '$TEST_USER'" | grep -q 1; then
  sudo -u postgres psql -c "CREATE USER $TEST_USER WITH PASSWORD '$TEST_PASSWORD';" || exit 1
  sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $TEST_DB_NAME TO $TEST_USER;" || exit 1
else
  echo "User $TEST_USER already exists."
fi

# Install dependencies and generate Prisma client
npm install

# Generate Prisma client with the modified .env
npx prisma generate

# Run migrations with the modified .env
sudo npx prisma migrate dev

# Run tests with the modified .env
npm test

# Drop test database and user after tests
echo "Dropping test database..."
sudo -u postgres psql -c "DROP DATABASE IF EXISTS $TEST_DB_NAME;"

echo "Dropping test user..."
sudo -u postgres psql -c "DROP USER IF EXISTS $TEST_USER;"

# Ensure PostgreSQL service is stopped at the end
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
