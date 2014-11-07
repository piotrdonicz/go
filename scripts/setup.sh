#!/usr/bin/env bash

if [ -z $(which npm) ]; then
    echo "npm (node package manager) missing. "
    exit 1
fi

npm install

exit 0
