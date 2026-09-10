"""Consume sensor data and generate alerts."""
import json
from kafka import KafkaConsumer


def is_extreme(temp_c: float, rh_pct: float) -> bool:
    return temp_c > 40 and rh_pct > 40


consumer = KafkaConsumer(
    "sensor.temperature",
    bootstrap_servers="localhost:9092",
    value_deserializer=lambda m: json.loads(m.decode()),
    auto_offset_reset="latest",
)

for msg in consumer:
    r = msg.value
    if is_extreme(r["temp_c"], r["rh_pct"]):
        print("EXTREME HEAT ALERT:", r)
