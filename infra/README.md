# Infra - Test-Assignment

## Requirements

Docker e docker composer


## Importing collections:


Run the import into the docker container:

```
docker cp mongo IDCONTAINER:/
docker exec -it IDCONTAINER mongorestore --uri="mongodb://USS:PASS@127.0.0.1/?authSource=admin&ssl=false"  -d linqpal mongo
```

The import files are in the ** mongo ** folder at the root of the project.

> File folder for import: mongo
> Database: linqpal


