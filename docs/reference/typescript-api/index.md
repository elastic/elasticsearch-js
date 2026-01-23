# Elasticsearch JavaScript Client - API Reference

Complete TypeScript API reference for the Elasticsearch JavaScript client.

## Quick Navigation

- [Client](#client)
- [API Methods](#api-methods)
- [Type Definitions](#type-definitions)
- [Helpers](#helpers)
- [Transport](#transport)

## Client

- [Client](./client.md) - Main client class and options

## API Methods

### Core API Methods

- [`client.bulk()`](apis/bulk.md)
- [`client.capabilities()`](apis/capabilities.md)
- [`client.clearScroll()`](apis/clearScroll.md)
- [`client.closePointInTime()`](apis/closePointInTime.md)
- [`client.count()`](apis/count.md)
- [`client.create()`](apis/create.md)
- [`client.delete()`](apis/delete.md)
- [`client.deleteByQuery()`](apis/deleteByQuery.md)
- [`client.deleteByQueryRethrottle()`](apis/deleteByQueryRethrottle.md)
- [`client.deleteScript()`](apis/deleteScript.md)
- [`client.exists()`](apis/exists.md)
- [`client.existsSource()`](apis/existsSource.md)
- [`client.explain()`](apis/explain.md)
- [`client.fieldCaps()`](apis/fieldCaps.md)
- [`client.get()`](apis/get.md)
- [`client.getScript()`](apis/getScript.md)
- [`client.getScriptContext()`](apis/getScriptContext.md)
- [`client.getScriptLanguages()`](apis/getScriptLanguages.md)
- [`client.getSource()`](apis/getSource.md)
- [`client.healthReport()`](apis/healthReport.md)
- [`client.index()`](apis/index.md)
- [`client.info()`](apis/info.md)
- [`client.knnSearch()`](apis/knnSearch.md)
- [`client.mget()`](apis/mget.md)
- [`client.msearch()`](apis/msearch.md)
- [`client.msearchTemplate()`](apis/msearchTemplate.md)
- [`client.mtermvectors()`](apis/mtermvectors.md)
- [`client.openPointInTime()`](apis/openPointInTime.md)
- [`client.ping()`](apis/ping.md)
- [`client.putScript()`](apis/putScript.md)
- [`client.rankEval()`](apis/rankEval.md)
- [`client.reindex()`](apis/reindex.md)
- [`client.reindexRethrottle()`](apis/reindexRethrottle.md)
- [`client.renderSearchTemplate()`](apis/renderSearchTemplate.md)
- [`client.scriptsPainlessExecute()`](apis/scriptsPainlessExecute.md)
- [`client.scroll()`](apis/scroll.md)
- [`client.search()`](apis/search.md)
- [`client.searchMvt()`](apis/searchMvt.md)
- [`client.searchShards()`](apis/searchShards.md)
- [`client.searchTemplate()`](apis/searchTemplate.md)
- [`client.termsEnum()`](apis/termsEnum.md)
- [`client.termvectors()`](apis/termvectors.md)
- [`client.update()`](apis/update.md)
- [`client.updateByQuery()`](apis/updateByQuery.md)
- [`client.updateByQueryRethrottle()`](apis/updateByQueryRethrottle.md)

### Namespaced APIs

- [`client.asyncSearch`](apis/asyncSearch.md) - AsyncSearch operations
- [`client.autoscaling`](apis/autoscaling.md) - Autoscaling operations
- [`client.cat`](apis/cat.md) - Cat operations
- [`client.ccr`](apis/ccr.md) - Ccr operations
- [`client.cluster`](apis/cluster.md) - Cluster operations
- [`client.connector`](apis/connector.md) - Connector operations
- [`client.danglingIndices`](apis/danglingIndices.md) - DanglingIndices operations
- [`client.enrich`](apis/enrich.md) - Enrich operations
- [`client.eql`](apis/eql.md) - Eql operations
- [`client.esql`](apis/esql.md) - Esql operations
- [`client.features`](apis/features.md) - Features operations
- [`client.fleet`](apis/fleet.md) - Fleet operations
- [`client.graph`](apis/graph.md) - Graph operations
- [`client.ilm`](apis/ilm.md) - Ilm operations
- [`client.indices`](apis/indices.md) - Indices operations
- [`client.inference`](apis/inference.md) - Inference operations
- [`client.ingest`](apis/ingest.md) - Ingest operations
- [`client.license`](apis/license.md) - License operations
- [`client.logstash`](apis/logstash.md) - Logstash operations
- [`client.migration`](apis/migration.md) - Migration operations
- [`client.ml`](apis/ml.md) - Ml operations
- [`client.monitoring`](apis/monitoring.md) - Monitoring operations
- [`client.nodes`](apis/nodes.md) - Nodes operations
- [`client.profiling`](apis/profiling.md) - Profiling operations
- [`client.project`](apis/project.md) - Project operations
- [`client.queryRules`](apis/queryRules.md) - QueryRules operations
- [`client.rollup`](apis/rollup.md) - Rollup operations
- [`client.searchApplication`](apis/searchApplication.md) - SearchApplication operations
- [`client.searchableSnapshots`](apis/searchableSnapshots.md) - SearchableSnapshots operations
- [`client.security`](apis/security.md) - Security operations
- [`client.shutdown`](apis/shutdown.md) - Shutdown operations
- [`client.simulate`](apis/simulate.md) - Simulate operations
- [`client.slm`](apis/slm.md) - Slm operations
- [`client.snapshot`](apis/snapshot.md) - Snapshot operations
- [`client.sql`](apis/sql.md) - Sql operations
- [`client.ssl`](apis/ssl.md) - Ssl operations
- [`client.streams`](apis/streams.md) - Streams operations
- [`client.synonyms`](apis/synonyms.md) - Synonyms operations
- [`client.tasks`](apis/tasks.md) - Tasks operations
- [`client.textStructure`](apis/textStructure.md) - TextStructure operations
- [`client.transform`](apis/transform.md) - Transform operations
- [`client.watcher`](apis/watcher.md) - Watcher operations
- [`client.xpack`](apis/xpack.md) - Xpack operations

## Type Definitions

TypeScript type definitions for all requests and responses:

- [Browse All Types](types/)

Each API method has corresponding request and response types documented individually.

## Helpers

- [Client Helpers](helpers.md) - Utility functions for common operations

## Transport

- [Transport Layer](transport.md) - Low-level transport documentation

