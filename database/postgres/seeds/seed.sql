INSERT INTO users (email, hashed_password, role)
VALUES ('admin@heatwave.local', 'CHANGE_ME', 'admin')
ON CONFLICT DO NOTHING;

INSERT INTO alerts (region, level, utci_max) VALUES
  ('Delhi', 'ORANGE', 35.2),
  ('Mumbai', 'YELLOW', 28.1)
ON CONFLICT DO NOTHING;
