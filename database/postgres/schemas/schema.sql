CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE IF NOT EXISTS users (
    id          SERIAL PRIMARY KEY,
    email       VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    role        VARCHAR(32) DEFAULT 'user',
    created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS alerts (
    id          SERIAL PRIMARY KEY,
    region      VARCHAR(128) NOT NULL,
    level       VARCHAR(16) NOT NULL,
    utci_max    REAL NOT NULL,
    issued_at   TIMESTAMP DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_alerts_region ON alerts(region);

CREATE TABLE IF NOT EXISTS index_records (
    id          SERIAL PRIMARY KEY,
    index_name  VARCHAR(16) NOT NULL,
    lat         REAL NOT NULL,
    lon         REAL NOT NULL,
    value       REAL NOT NULL,
    time        TIMESTAMP DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_index_time ON index_records(time);
CREATE INDEX IF NOT EXISTS idx_index_name ON index_records(index_name);
