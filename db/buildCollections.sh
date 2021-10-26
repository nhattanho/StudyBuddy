#!/bin/bash
# Run this file to build the appropriate collections

mongo < configureUsers.js
mongo < configureRequests.js
