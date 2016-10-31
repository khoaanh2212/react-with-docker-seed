#!/usr/bin/env bash
set -xeuo pipefail

docker run --rm ${IMAGE_LATEST} > build.tar.gz
docker build -t ${PROXY_IMAGE}:latest -f ./proxy/Dockerfile .
docker tag ${PROXY_IMAGE}:latest ${PROXY_IMAGE}:${TAG}
docker push ${PROXY_IMAGE}:${TAG}