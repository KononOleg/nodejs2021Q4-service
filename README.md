# PostgreSQL & Typeorm

## Migration


Once you setup connection options you can create a new migration using CLI:

```
migration:create
```

TypeORM is able to automatically generate migration files with schema changes you made.
You can run following command:

```
migration:generate
```

Once you have a migration to run on production, you can run them using a CLI command:

```
migration:run
```

If for some reason you want to revert the changes, you can run:

```
migration:revert
```


