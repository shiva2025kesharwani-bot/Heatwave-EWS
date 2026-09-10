-- PostGIS-specific helpers (e.g. spatial join for population exposure)
CREATE INDEX IF NOT EXISTS idx_index_records_geom
ON index_records USING GIST (ST_SetSRID(ST_MakePoint(lon, lat), 4326));
