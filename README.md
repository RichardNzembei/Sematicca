## How to apply schema migrations

### Prerequisites
- [Install Atlasgo CLI](https://atlasgo.io/docs)
- Start your MariaDB database server
- Create a database called `sematicca_db`

### Apply migrations
```bash

# https://atlasgo.io/declarative/apply
export ATLASGO_VAR_DATABASE=sematicca_db
export ATLASGO_URL=mysql://root:PetaPlay%40%23%246yty@localhost:33006/$ATLASGO_VAR_DATABASE
atlas schema apply --url="$ATLASGO_URL" \
  --to=file://atlasgo/hcl \
  --var=database="$ATLASGO_VAR_DATABASE" \
  --auto-approve \
  --tx-mode file
```

```shell
npx nx build sematicca-com --skip-nx-cache
docker build -t sematicca-com:0.0.4 -f ./sematicca-com-Dockerfile .
docker run --publish 3001:3000 \
--network sematicca.systems \
--env S_DATABASE_HOST=mysql84 \
--env S_DATABASE_USER=root \
--env S_DATABASE_PASSWORD=PetaPlay%40%23%246yty \
--env S_DATABASE_NAME=sematicca_db \
--env ATLASGO_VAR_DATABASE=sematicca_db \
--env ATLASGO_URL=mysql://root:PetaPlay%40%23%246yty@mysql84:3306/sematicca_db \
sikuzangu-com:0.0.4
```

nx build sikuzangu-com
mv "dist/apps/sematicca-com/public" "dist/apps/sematicca-com/.next/standalone/dist/apps/sematicca-com"
mv "dist/apps/sematicca-com/.next/static" "dist/apps/sematicca-com/.next/standalone/dist/apps/sematicca-com/.next"
node dist/apps/sematicca-com/.next/standalone/apps/sematicca-com/server.js

## Run the project
npx nx serve @sematica/sematicca-system-com
