DB_USER="postgres"
DB_NAME="postgres"

psql -U $DB_USER -d $DB_NAME -f schema.sql -f data.sql;