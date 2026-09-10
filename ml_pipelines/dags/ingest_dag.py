"""Airflow DAG: ingest data daily."""
from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator


def ingest():
    from src.data_ingestion.download_era5 import download_era5
    from src.utils.config import load_config
    from pathlib import Path
    cfg = load_config()
    download_era5(
        variables=["2m_temperature", "2m_dewpoint_temperature", "10m_wind_speed"],
        years=[datetime.utcnow().year],
        area=[37.5, 68.0, 6.5, 97.5],
        out_dir=Path(cfg["paths"]["raw_data"]) / "reanalysis",
    )


with DAG(
    dag_id="ingest_data",
    start_date=datetime(2024, 1, 1),
    schedule="0 6 * * *",
    catchup=False,
    default_args={"retries": 2, "retry_delay": timedelta(minutes=10)},
) as dag:
    PythonOperator(task_id="ingest", python_callable=ingest)
