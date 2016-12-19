#!/bin/bash

(cd kubernetes && kompose -f ../compose/docker-compose.yml convert --replicas 2 -y)

