#!/bin/bash

# Set up environment variables
export DATABASE_URL="postgresql://test_user:test_password@localhost:5432/test_db"
export SECRET="dev_secret"
export PORT=8181

# Install PostgreSQL if not already installed
if ! command -v psql &> /dev/null
then
  echo "PostgreSQL could not be found, installing..."
  sudo dnf install postgresql-server postgresql-contrib -y
  sudo postgresql-setup --initdb
  sudo systemctl start postgresql
  sudo systemctl enable postgresql
fi

# Create PostgreSQL user and database if they don't exist
echo "Setting up PostgreSQL database..."

# Create user (only if user doesn't exist)
if ! sudo -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='test_user'" | grep -q 1; then
  sudo -u postgres psql -c "CREATE USER test_user WITH PASSWORD 'test_password' CREATEDB;"
fi

# Create database (only if database doesn't exist)
if ! sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='test_db'" | grep -q 1; then
  sudo -u postgres psql -c "CREATE DATABASE test_db OWNER test_user;"
fi

# Grant all privileges to test_user on test_db
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE test_db TO test_user;"

# Grant usage and privileges on public schema
sudo -u postgres psql -c "ALTER USER test_user CREATEDB;"
sudo -u postgres psql -c "GRANT USAGE, CREATE ON SCHEMA public TO test_user;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO test_user;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO test_user;"

# Set up Node.js if it's not already installed
if ! command -v node &> /dev/null
then
  echo "Node.js could not be found, installing..."
  curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
  sudo dnf install -y nodejs
fi

# Install backend dependencies
echo "Installing backend dependencies..."
npm install
npx prisma generate

# Create the .env file with necessary variables
echo "Creating .env file..."
echo "PORT=8181" > .env
echo "DATABASE_URL=postgresql://test_user:test_password@localhost:5432/test_db" >> .env
echo "SECRET=dev_secret" >> .env

# Run migrations
echo "Running database migrations..."
sudo npx prisma migrate dev

# Run tests
echo "Executing backend tests..."
npm test
