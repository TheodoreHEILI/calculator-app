#!/bin/bash
# Run this from the calculator-app folder to prepare and push to a new GitHub repo.
# You must create the new repository on GitHub first (see README).

set -e
cd "$(dirname "$0")"

if [ -d .git ]; then
  echo "Git already initialized."
else
  git init
  git add .
  git commit -m "Initial commit: calculator app"
  echo "Created initial commit."
fi

echo ""
echo "Next steps:"
echo "1. Go to https://github.com/new"
echo "2. Create a new repository (e.g. name: calculator-app, no README/license/.gitignore)"
echo "3. Run these commands (replace YOUR_USERNAME with your GitHub username):"
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/calculator-app.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
