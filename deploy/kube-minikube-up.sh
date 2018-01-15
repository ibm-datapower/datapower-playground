#!/bin/sh

cd "$(dirname "$0")"

status=$(minikube status | grep ^minikube | cut -d " " -f2)
if [ $status != "Running" ]; then
    minikube start --cpus 4 --memory 8192 --kubernetes-version v1.8.6 --vm-driver hyperkit --bootstrapper kubeadm
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
