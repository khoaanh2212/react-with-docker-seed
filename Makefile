.PHONY: build delete up

DOCKER_REGISTRY?=localhost:5000
TAG=latest

PROJECT=agora-images-frontend
IMAGE=$(DOCKER_REGISTRY)/$(PROJECT):$(TAG)
IMAGE_LATEST=$(DOCKER_REGISTRY)/$(PROJECT):latest
PROXY_PROJECT=agora-images-frontend-proxy
PROXY_IMAGE=$(DOCKER_REGISTRY)/$(PROXY_PROJECT)
PROXY_IMAGE_LATEST=$(DOCKER_REGISTRY)/$(PROXY_PROJECT):latest

PHANTOMJS_CDNURL?=""
NPM_CONFIG_REGISTRY?=""

COMPOSE_VARS=PROXY_IMAGE_LATEST=$(PROXY_IMAGE_LATEST) IMAGE_LATEST=$(IMAGE_LATEST)
BASE_COMPOSE?=docker-compose -f base.yml
DOCKER_COMPOSE=$(COMPOSE_VARS) $(BASE_COMPOSE)

BUILD_ARGS=\
	PHANTOMJS_CDNURL=$(PHANTOMJS_CDNURL) \
	NPM_CONFIG_REGISTRY=$(NPM_CONFIG_REGISTRY) \
	IMAGE_LATEST=$(IMAGE_LATEST) \
	TAG=$(TAG) \
	PROXY_IMAGE=$(PROXY_IMAGE) \
	PROXY_IMAGE_LATEST=$(PROXY_IMAGE_LATEST)

build:
	docker build -t $(IMAGE_LATEST) -f Dockerfile .
	docker tag $(IMAGE_LATEST) $(IMAGE)
	docker push $(IMAGE)
	cd build/ && $(BUILD_ARGS) ./proxy/build.sh

delete:
	$(DOCKER_COMPOSE) kill
	echo "yes" | $(DOCKER_COMPOSE) rm

up:
	${DOCKER_COMPOSE} up -d --force-recreate