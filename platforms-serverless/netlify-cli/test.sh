#!/bin/sh

set -eu

npx ts-node ../../utils/fetch-retry-and-confirm-version.ts --url https://prisma2-e2e-tests-netlify-cli.netlify.app/.netlify/functions/index --prisma-version $(sh ../../utils/prisma_version.sh) --binary-string ',"files":["index-browser.js","index.d.ts","index.js","query-engine-rhel-openssl-1.0.x","runtime","schema.prisma"]'
