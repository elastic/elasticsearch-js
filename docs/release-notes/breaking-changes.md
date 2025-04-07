---
navigation_title: "Breaking changes"
---

# Elasticsearch JavaScript Client breaking changes [elasticsearch-javascript-client-breaking-changes]

Breaking changes can impact your Elastic applications, potentially disrupting normal operations. Before you upgrade, carefully review the Elasticsearch JavaScript Client breaking changes and take the necessary steps to mitigate any issues. To learn how to upgrade, check [Upgrade](docs-content://deploy-manage/upgrade.md).

% ## Next version [elasticsearch-javascript-client-versionnext-breaking-changes]

% ::::{dropdown} Title of breaking change
% Description of the breaking change.
% For more information, check [PR #](PR link).
% **Impact**<br> Impact of the breaking change.
% **Action**<br> Steps for mitigating deprecation impact.
% ::::

## 9.0.0 [elasticsearch-javascript-client-900-breaking-changes]

::::{dropdown} Improvements to the optional `body` property

In 8.x, every API function had a `body` property that would provide a place to put arbitrary values that should go in the HTTP request body, even if they were not noted in the specification or documentation. In 9.0, each API function still includes an optional `body` property, but TypeScript's type checker will disallow properties that should go in the root of the object. A `querystring` parameter has also been added that behaves the same as `body`, but inserts its values into the request querystring.

Also, the logic for where each parameter should be added to an API HTTP request has been updated:

1. If recognized as a `body` parameter according to the Elasticsearch specification, put it in the JSON body
2. If recognized as a `path` parameter, put it in the URL path
3. If recognized as a `query` parameter or a "common" query parameter (e.g. `pretty`, `error_trace`), put it in the querystring
4. If not recognized, and this API accepts a JSON body, put it in the JSON body
5. If not recognized and this API does not accept a JSON body, put it in the querystring

The first two steps are identical in 8.x. The final three steps replace the logic from 8.x that put all unrecognized parameters in the querystring.

**Impact**<br> Some adjustments to API calls may be necessary for code that used a `body` property 8.x, especially to appease the TypeScript type checker, but it should not have any impact on any code that was not using a `body` property.

**Action**<br> Check existing code for use of the `body` property, and move any properties that should be in the root object according to the API function's request type definition. If using TypeScript, the TypeScript type checker will surface most of these issues for you.
::::

::::{dropdown} Removal of the default 30-second timeout on all API calls

The default 30-second timeout on all HTTP requests sent to Elasticsearch has been dropped in favor of having no timeout set at all. The previous behavior still works as it did when setting the `requestTimeout` value.

See pull request [#2573](https://github.com/elastic/elasticsearch-js/pull/2573) for more information.

**Impact**<br> Requests to Elasticsearch that used to time out after 30 seconds will now wait for as long as it takes for Elasticsearch to respond.

**Action**<br> In environments where it is not ideal to wait for an API response indefinitely, manually setting the `requestTimeout` option when instantiating the client still works as it did in 8.x.
::::
