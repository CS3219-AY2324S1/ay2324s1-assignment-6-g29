DB_USER="postgres"
DB_NAME="postgres"

psql -U $DB_USER -d $DB_NAME -f utils/schema.sql -f utils/data.sql;