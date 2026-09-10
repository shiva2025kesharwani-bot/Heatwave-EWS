"""Airflow DAG: retrain forecast models weekly."""
from datetime import datetime
from airflow import DAG
from airflow.operators.python import PythonOperator


def train():
    print("Training models (stub)")


with DAG(
    dag_id="train_models",
    start_date=datetime(2024, 1, 1),
    schedule="0 2 * * 0",
    catchup=False,
) as dag:
    PythonOperator(task_id="train", python_callable=train)
