#!/usr/bin/env bash
trap "kill 0" EXIT
bash scripts/run_backend.sh &
bash scripts/run_frontend.sh &
wait
