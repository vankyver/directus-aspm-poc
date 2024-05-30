# Extensions Development

Following instructions will guide you through the process of developing Directus extensions.


----

## Modules

**Github-loader** - [operation extension](https://docs.directus.io/extensions/operations.html) that loads information about repositories from Github

**Defect-writer** - [operation extension](https://docs.directus.io/extensions/operations.html) that takes list of defects and writes them to the database

**Repository display** - [display extension](https://docs.directus.io/extensions/displays.html) that shows additional Defect tags in list of repositories

Additionally, scripts used in Directus Flows

----


## Running

### Dev environment
- `npm install` to install dependencies
- `npm run dev` to build the bundle. It will create directory with the module files in `/extensions` directory
- `docker-compose up` to start Directus with installed modules

Make sure setting `EXTENSIONS_AUTO_RELOAD=true` is set in .env for easier development



### Production environment
- `npm install` to install dependencies
- `npm run build` to build the bundle. It will create a directory with the module files in `/extensions` directory
- `docker-compose up` to start Directus with installed modules

##  Usage

Server will run on `http://localhost:8055` by default.

----

## 💾 Database

Directus allows to create current database schema snaphots and apply them to another database

There is a script `datanase/snapshot.js` to create a snapshot of the current database schema.
The snapshot will be saved in `./database/schema-snapshot.json`

### Applying snapshot from Prod to Local
```bash
node database/snapshot.js --apply
```

### Applying snapshot from Local to Prod
```bash
node database/snapshot.js --apply --prod
```
