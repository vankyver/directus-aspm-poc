# Directus-ASPM-PoC

![directus-aspm](./docs/img/defects.png)

Proof of Concept for building Application Security Posture Management (ASPM) based on [Directus Headless-CMS](https://github.com/directus/directus).


## 🚀 Running

```
docker-compose up
```
use following credentials to login to Directus:
```
email: admin@example.com
password: d1r3ctu5
```

## ⚙️ Setup

Make copy of `.env.example` and rename it to `.env`, add necessary credentials and settings.
In current PoC you will need to provide
- Github token to be able to load data from Github.
- Directus admin API key to be able to upload results of security scanners.



## Example Running scanners and uploading scan results

#### 📡 SemGrep
```bash

semgrep scan . --json --json-output=semgrep.json
sed 's/{/{"repository":"https:\/\/api.github.com\/repos\/WebGoat\/WebGoat-Legacy",/' semgrep.json > result.json

curl http://127.0.0.1:8055/flows/trigger/e967dffe-912b-4c5b-8265-b8c101e090ac \
 -d @result.json -XPOST \
 -H "Authorization: Bearer geBockesPOi-DV71OHf6SbF_EKcMtSz4" \
 -H "Content-Type: application/json"
```

#### ⚛️ Nuclei
```bash
nuclei -u http://testphp.vulnweb.com/ -je results.json

curl http://127.0.0.1:8055/flows/trigger/d8612883-7f69-4bcd-af3b-e1e35df6874d \
--data @results.json -XPOST \
-H "Authorization: Bearer geBockesPOi-DV71OHf6SbF_EKcMtSz4" \
-H 'Content-type: application/json'
```










-----

## 🛠️ Development

Details of extensions development can be found in [dev documentation](docs/development.md)


-----

## Example preview

![directus-aspm](./docs/img/dashboard.png)
![directus-aspm](./docs/img/flow.png)
![directus-aspm](./docs/img/Repository.png)