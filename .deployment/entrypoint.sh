#!/bin/sh

# The script should immediately exit if any command in the script fails.
set -e

echo "
---------------------------------------------------------
Welcome to the Barista Workspace! 🔥
You are currently working in:
$(pwd)
---------------------------------------------------------

"

oldSha=$(cat ./yarn.lock.sha1)
currentSha="$(sha1sum ./yarn.lock)"

if [ "$oldSha" != "$currentSha" ]; then
  echo "⚠️ Need to install packages due to updated yarn.lock"
  # When the checksums are not matching perform an npm install
  # removing the node_modules is neccessary on github actions according to some
  # weired permission staff that occures through symlinked node_modules from the
  # docker image
  rm -rf node_modules
  yarn install --frozen-lockfile --ignore-scripts
  echo "Successfully updated all packages!"
else
  echo "All packages are up to date! 🐙"
fi


# Run the command from the docker image
exec "$@"
