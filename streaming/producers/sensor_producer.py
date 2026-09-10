"""Produce synthetic temperature sensor readings to Kafka."""
import json
import random
import time
from kafka import KafkaProducer

producer = KafkaProducer(
    bootstrap_servers="localhost:9092",
    value_serializer=lambda v: json.dumps(v).encode(),
)

TOPIC = "sensor.temperature"

while True:
    reading = {
        "station_id": random.choice(["delhi", "mumbai", "chennai"]),
        "temp_c": round(random.uniform(25, 48), 2),
        "rh_pct": round(random.uniform(20, 90), 1),
        "ts": time.time(),
    }
    producer.send(TOPIC, reading)
    print("sent", reading)
    time.sleep(2)
