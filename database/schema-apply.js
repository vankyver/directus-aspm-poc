#!/usr/bin/env node

import {createDirectus, rest, staticToken, schemaSnapshot, schemaApply, schemaDiff, withToken} from '@directus/sdk';
import dotenv from 'dotenv';
import {writeFileSync} from "fs";
dotenv.config();

process.env.NODE_NO_WARNINGS = '1';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Configuration for remote Directus instance
const remoteBaseUrl = 'https://directus.prod.env';
const remoteToken = process.env.DIRECTUS_REMOTE_TOKEN;

// Configuration for local Directus instance
const localBaseUrl = 'http://localhost:8055';
const localToken = process.env.DIRECTUS_LOCAL_TOKEN;

// Function to authenticate with a Directus instance
function getClient(baseUrl, token) {
    return createDirectus(baseUrl)
        .with(staticToken(token))
        .with(rest());
}

function saveSnapshot(snapshot) {
    writeFileSync('database/schema-snapshot.json', JSON.stringify(snapshot, null, 2));
    console.log('Remote snapshot saved to database/remote-snapshot.json');
}

// Function to migrate schema from local to remote Directus instance
async function migrateSchema({apply, prod, verbose, save, force}) {
    try {
        const localClient = getClient(localBaseUrl, localToken);
        const remoteClient = getClient(remoteBaseUrl, remoteToken);

        // Get schema snapshot from local instance
        console.log(`Get schema snapshot from local instance - ${localBaseUrl}`);
        const localSnapshot = await localClient.request(schemaSnapshot());

        // Get schema snapshot from local instance
        console.log(`Get schema snapshot from remote instance - ${remoteBaseUrl}`);
        const remoteSnapshot = await remoteClient.request(schemaSnapshot());

        if (save) {
            return saveSnapshot(remoteSnapshot);
        }

        // Getting schema diff from
        console.log(`Getting diff between local and remote - ${remoteBaseUrl}`);
        const diff = prod && force
            ? await remoteClient.request(schemaDiff(localSnapshot, true))
            : await localClient.request(schemaDiff(remoteSnapshot, true));
        verbose && console.log('[Snapshot Diff] :', JSON.stringify(diff))

        console.log('=============================================================');
        verbose && console.log('Above are the schema changes that will be applied to the instance');
        console.log(`There are changes that will be applied:\n`, Object.keys(diff.diff).map(key => key + ' => ' + diff.diff[key].length).join('\r\n'));

        if (!apply) {
            console.log('To apply the schema changes, run the script with --apply flag');
        } else {
            const result = prod && force
                ? await remoteClient.request(schemaApply(diff))
                : await localClient.request(schemaApply(diff));
            console.log('Schema migration completed successfully!', result);
            if (!prod) {
                saveSnapshot(remoteSnapshot);
            }
        }
    } catch (error) {
        console.error('Error migrating schema:', error?.errors || error);
    }
}

const args = process.argv.slice(2);

if(args.find(i => i === '--help')) {
    console.log('Usage: node database/schema-apply.js [--apply] [--prod]');
    console.log('Options:');
    console.log('  --apply    Apply the schema changes to the instance. Default from the remote to local');
    console.log('  --prod     Make operation on production instance. Default is local instance');
    console.log('  --save     Save snapshot of the remote schema to the file. Default is false');
    console.log('  --verbose  Print debug information');
    process.exit(0);
}
migrateSchema({
    apply: args.find(i => i === '--apply'),
    prod: args.find(i => i === '--prod'),
    force: args.find(i => i === '--force'),
    verbose: args.find(i => i === '--verbose'),
    save: args.find(i => i === '--save')
});