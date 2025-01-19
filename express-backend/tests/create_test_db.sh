#!/bin/bash

# Define variables for the test database and user
TEST_DB_NAME="test_db"
TEST_USER="test_user"
TEST_PASSWORD="test_password"  # Optional: Use a password if needed
PORT="5432"  # Port for the test database
ENV_FILE=".env"

# Ensure PostgreSQL is running
echo "Ensuring PostgreSQL is running..."
sudo systemctl start postgresql || exit 1

# Wait for PostgreSQL to start
sleep 1

# Ensure PostgreSQL is running
if ! sudo systemctl is-active --quiet postgresql; then
  echo "PostgreSQL service is not active. Exiting."
  exit 1
fi

# Create test database and user
echo "Creating test database '$TEST_DB_NAME' and user '$TEST_USER'..."

# Create the test database
sudo -u postgres psql -c "CREATE DATABASE $TEST_DB_NAME;" || exit 1

# Create the test user with a password (optional)
sudo -u postgres psql -c "CREATE USER $TEST_USER WITH PASSWORD '$TEST_PASSWORD';" || exit 1

# Grant all privileges to the test user on the test database
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $TEST_DB_NAME TO $TEST_USER;" || exit 1

# Provide feedback
echo "Test database and user created successfully."

# Now, update the .env file with the database details as comments
echo "Appending database connection details to the .env file as comments..."

{
  echo "# Test Database Configuration"
  echo "# Database Name: $TEST_DB_NAME"
  echo "# Database User: $TEST_USER"
  echo "# Database Password: $TEST_PASSWORD"
  echo "# Database Port: $PORT"
  echo "# Database URL: postgresql://$TEST_USER:$TEST_PASSWORD@localhost:$PORT/$TEST_DB_NAME"
  echo "# Don't forget to update the DATABASE_URL in the .env file for testing and use prisma to generate and migrate your schemas."
} >> "$ENV_FILE"

# Success message
echo "Database connection details added to .env file (as comments)."

echo "Test database setup complete!"
