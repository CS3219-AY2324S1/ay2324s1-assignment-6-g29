FROM postgres:latest

ENV POSTGRES_PASSWORD=secret
ENV POSTGRES_USER=postgres
ENV POSTGRES_DB=postgres

COPY ./utils/schema.sql /docker-entrypoint-initdb.d/data_schema.sql
COPY ./utils/data.sql /docker-entrypoint-initdb.d/populate_data.sql

EXPOSE 5432