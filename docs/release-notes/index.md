---
navigation_title: "JavaScript client release notes"
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

## 9.0.0 [elasticsearch-javascript-client-900-release-notes]

### Features and enhancements [elasticsearch-javascript-client-900-features-enhancements]

- **Compatibility with Elasticsearch 9.0:** All changes and additions to Elasticsearch APIs for its 9.0 release are reflected in this release.
- **Serverless client merged in:** the `@elastic/elasticsearch-serverless` client is being deprecated, and its functionality has been merged back into this client. This should have zero impact on the way the client works, except that a new `serverMode` option has been added. When it's explicitly set to `"serverless"` by a user, a few default settings and behaviors are changed:

  - turns off sniffing and ignores any sniffing-related options
  - ignores all nodes passed in config except the first one, and ignores any node filtering and selecting options
  - enables compression and `TLSv1_2_method` (same as when configured for Elastic Cloud)
  - adds an `elastic-api-version` HTTP header to all requests
  - uses `CloudConnectionPool` by default instead of `WeightedConnectionPool`
  - turns off vendored `content-type` and `accept` headers in favor or standard MIME types

  Docstrings for types that differ between stack and serverless have also been updated to indicate when that is the case.

### Fixes [elasticsearch-javascript-client-900-fixes]
