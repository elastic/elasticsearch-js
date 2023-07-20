.PHONY: integration-setup
integration-setup: integration-cleanup
	DETACH=true .ci/run-elasticsearch.sh

.PHONY: integration-cleanup
integration-cleanup:
	docker container rm --force --volumes instance || true

.PHONY: integration
integration: integration-setup
	npm run test:integration
