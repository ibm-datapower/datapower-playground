#!/bin/sh

cd "$(dirname "$0")"

status=$(minikube status | grep ^minikubeVM | cut -d " " -f2)
if [ $status != "Running" ]; then
    minikube start \
      --cpus=4 \
      --memory=4096 \
      --iso-url=https://github.com/boot2docker/boot2docker/releases/download/v1.12.5/boot2docker.iso
else
    echo "minikube running"
fi

eval $(minikube docker-env)
docker images
docker-compose -f compose/docker-compose.yml build

if [[ $(kubectl get deployments | grep ^datapower) ]]; then
    echo "deployment active"
else
    kubectl create -f kubernetes/
fi

echo reach application at: $(minikube service web --url)
