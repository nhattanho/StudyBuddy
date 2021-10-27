#!/bin/bash
# Run this file to build the appropriate collections

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'
DB_NAME="studybuddy"
DROPDB="-d"

if [ $1 ] && [ $1 == $DROPDB ]; then
    echo -e "\n${GREEN}DROPPING DB${NC}"
   mongo $DB_NAME --eval "db.dropDatabase();"
fi

echo -e "\n${GREEN}ADDING USERS COLLECTION${NC}"
mongo < configureUsers.js --quiet


echo -e "\n${GREEN}ADDING BUDDY REQUESTS COLLECTION${NC}"
mongo < configureBuddyRequests.js --quiet
