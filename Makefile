.PHONY: integration-setup
integration-setup: integration-cleanup
	DETACH=true .ci/run-elasticsearch.sh

.PHONY: integration-cleanup
integration-cleanup:
	docker stop instance || true
	docker volume rm instance-rest-test-data || true

.PHONY: integration
integration: integration-setup
	npm run test:integration
