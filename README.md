# Processo-Seletivo-NG-TRYBE

this is a selective process of NG.

---

# Setup

first, you'll need something's installed
- docker => v3

---

## 1. Config database
for that, you'll need to execute the `runDataBase.sh`

```bash
chmod a+x runDataBase.sh
./runDataBase.sh
```

This will open a terminal of the docker.
So execute the above command to create the database

```bash
psql -U postgres
```
```sql
CREATE DATABASE ng_data;
```

### exit the docker terminal
you're now into the PostgreSQL terminal inside docker.
Execute the code below to exit
```sql
\q
```
```bash
exit
```

---

## 2. Run the app with `setup.sh`

```bash
chmod a+x ./setup.sh
./setup.sh
```

this will start all the process of the app
go to your `http://localhost:3000/`

> it can take some seconds to start the app

