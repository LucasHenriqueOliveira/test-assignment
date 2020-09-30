# Infra - Test-Assignment

## Requirements

Docker e docker composer


# Step by step

Access the folder where the file is located **docker-compose.yml**
```
 cd linqpal-infra/docker
```

Run the command to create the instances:

```
docker-compose up -d --build
``` 

List the containers for status and IDs

```
docker ps 
 ID    		     name 								status    		PORT
 f90520c99218        mongo:bionic          "docker-entrypoint.s…"   1 days ago          Up 29 hours         0.0.0.0:27117->27017/tcp                     linqpal-mongodb
```                 

## Importing collections:


Run the import into the docker container:

```
docker cp mongo IDCONTAINER:/
docker exec -it IDCONTAINER mongorestore --uri="mongodb://USS:PASS@127.0.0.1/?authSource=admin&ssl=false"  -d linqpal mongo
```

The import files are in the ** mongo ** folder at the root of the project.

> File folder for import: mongo
> Database: linqpal


