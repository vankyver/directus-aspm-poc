#!/bin/bash

npm run sl-get | tee >(sed -r "s/\x1B\[[0-9;]*[a-zA-Z]//g" > src/sarif-lib/tests/sl-app-log.txt)