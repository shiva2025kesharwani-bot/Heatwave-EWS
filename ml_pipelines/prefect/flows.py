"""Prefect flows for pipeline orchestration."""
from prefect import flow, task


@task
def fetch():
    print("fetch (stub)")


@task
def process():
    print("process (stub)")


@flow(name="heatwave-daily")
def daily_flow():
    fetch()
    process()


if __name__ == "__main__":
    daily_flow()
