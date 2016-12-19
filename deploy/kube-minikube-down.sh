#!/bin/sh

cd "$(dirname "$0")"

status=$(minikube status | grep ^minikubeVM | cut -d " " -f2)
if [ $status == "Running" ]; then
    kubectl delete -f kubernetes
    minikube stop
else
    echo "minikube is not running"
fi



