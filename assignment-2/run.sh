# docker run --name postgresDb -p 5432:5432 -e POSTGRES_PASSWORD=pass123 -e POSTGRES_DB=userdb -e POSTGRES_USER=admin -d postgres
# sleep 3
# docker cp schema.sql postgresDb:/docker-entrypoint-initdb.d
# docker exec -i postgresDb psql -U admin -d userdb -f docker-entrypoint-initdb.d/schema.sql

DB_USER="postgres"
DB_NAME="postgres"

SQL_QUERY="""
CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(50) PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    displayName VARCHAR(100) NOT NULL
);
"""

psql -U $DB_USER -d $DB_NAME -c "$SQL_QUERY"