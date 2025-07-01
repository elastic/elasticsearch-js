---
navigation_title: "Elasticsearch JavaScript Client"
mapped_pages:
  - https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/changelog-client.html
---

# Elasticsearch JavaScript Client release notes [elasticsearch-javascript-client-release-notes]

Review the changes, fixes, and more in each version of Elasticsearch JavaScript Client.

To check for security updates, go to [Security announcements for the Elastic stack](https://discuss.elastic.co/c/announcements/security-announcements/31).

% Release notes include only features, enhancements, and fixes. Add breaking changes, deprecations, and known issues to the applicable release notes sections.

% ## version.next [elasticsearch-javascript-client-next-release-notes]

% ### Features and enhancements [elasticsearch-javascript-client-next-features-enhancements]
% \*

% ### Fixes [elasticsearch-javascript-client-next-fixes]
% \*

## 9.0.3

### Fixes [elasticsearch-javascript-client-9.0.3-fixes]

**Improved compatibility with Elasticsearch 9.0:** Several fixes and improvements have been made to APIs and TypeScript type definitions to better reflect the Elasticsearch 9.0 specification.

## 9.0.2

### Fixes [elasticsearch-javascript-client-9.0.2-fixes]

**Remove dangling references to `typesWithBodyKey`:** the `typesWithBodyKey.ts` file and `estypesWithBody` export were removed in 9.0.0 but were still being referenced in the `index.d.ts` file that declares TypeScript types. This reference has been removed.

## 9.0.1

### Fixes [elasticsearch-javascript-client-9.0.1-fixes]

**Reinstate `nodeFilter` and node `roles` feature:** The docs note a `nodeFilter` option on the client that will, by default, filter the nodes based on any `roles` values that are set at instantiation. At some point, this functionality was partially disabled. This brings the feature back, ensuring that it matches what the documentation has said it does all along.

**Ensure Apache Arrow ES|QL helper uses async iterator:** the [`esql.toArrowReader()` helper function](/reference/client-helpers.md#_toarrowreader) was trying to return `RecordBatchStreamReader`&mdash;a synchronous iterator&mdash;despite the fact that the `apache-arrow` package was, in most cases, automatically coercing it to `AsyncRecordBatchStreamReader`, its asynchronous counterpart. It now is always returned as an async iterator.

## 9.0.0 [elasticsearch-javascript-client-9.0.0-release-notes]

### Features and enhancements [elasticsearch-javascript-client-9.0.0-features-enhancements]

- **Compatibility with Elasticsearch 9.0:** All changes and additions to Elasticsearch APIs for its 9.0 release are reflected in this release.
- **Serverless client merged in:** the `@elastic/elasticsearch-serverless` client is being deprecated, and its functionality has been merged back into this client. This should have zero impact on the way the client works by default, except that a new `serverMode` option has been added. When it's explicitly set to `"serverless"` by a user, a few default settings and behaviors are changed:

  - turns off sniffing and ignores any sniffing-related options
  - ignores all nodes passed in config except the first one, and ignores any node filtering and selecting options
  - enables compression and `TLSv1_2_method` (same as when configured for Elastic Cloud)
  - adds an `elastic-api-version` HTTP header to all requests
  - uses `CloudConnectionPool` by default instead of `WeightedConnectionPool`
  - turns off vendored `content-type` and `accept` headers in favor or standard MIME types

  Docstrings for types that differ between stack and serverless have also been updated to indicate when that is the case.

- **Improved Cloud ID parsing:** when using a Cloud ID as the `cloud` parameter to instantiate the client, that ID was assumed to be in the correct format. New assertions have been added to verify that format and throw a `ConfigurationError` if it is invalid. See [#2694](https://github.com/elastic/elasticsearch-js/issues/2694).

% ### Fixes [elasticsearch-javascript-client-9.0.0-fixes]
