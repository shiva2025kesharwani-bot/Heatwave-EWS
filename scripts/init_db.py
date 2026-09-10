"""Initialize the database schema."""
from pathlib import Path
from backend.app.db.session import engine
from backend.app.db.base import Base
from sqlalchemy import text


def main():
    Base.metadata.create_all(engine)
    sql_file = Path("database/postgres/schemas/schema.sql")
    if sql_file.exists():
        with engine.begin() as conn:
            conn.execute(text(sql_file.read_text(encoding="utf-8")))
    print("Database initialized.")


if __name__ == "__main__":
    main()
