#!/bin/bash
# Enable strict mode: exit immediately if any command fails
set -e  

# -------------------------------------
# Step 1: Install project dependencies
# -------------------------------------
echo "Installing dependencies..."
npm ci

# -------------------------------------
# Step 2: Apply shared Git configuration
# -------------------------------------
echo "Setting up Git configurations..."
git config include.path "../.gitconfig.project"

# -------------------------------------
# Step 3: Ensure environment file exists
# -------------------------------------
echo "Setting up environment file..."
if [ -f .env ]; then
  echo ".env file already exists, skipping copy."
else
  cp .env.example .env
  echo ".env file created from .env.example"
fi

# -------------------------------------
# Step 4: Wrap up
# -------------------------------------
echo "Setup complete. Your NestJS project is ready."
