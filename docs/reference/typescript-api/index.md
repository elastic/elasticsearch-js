# Elasticsearch JavaScript Client - API Reference

This is the complete TypeScript API reference for the Elasticsearch JavaScript client.

## Quick Links

- [Client API Overview](#client-api-overview)
- [All API Methods](#api-methods)
- [Type Definitions](types/index.md)
- [Transport Layer](transport/README.md)

## Client API Overview

The Elasticsearch JavaScript client provides a comprehensive API for interacting with Elasticsearch clusters.
All methods are accessed through the `Client` class.

### Installation

```bash
npm install @elastic/elasticsearch
```

### Basic Usage

```typescript
import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://localhost:9200'
});

// Example: Search
const result = await client.search({
  index: 'my-index',
  query: {
    match: { message: 'search term' }
  }
});
```

## API Methods

The following API methods are available on the `Client` class:

- [Client.asyncSearch](apis/asyncSearch.md)
- [Client.autoscaling](apis/autoscaling.md)
- [Client.bulk](apis/bulk.md)
- [Client.capabilities](apis/capabilities.md)
- [Client.cat](apis/cat.md)
- [Client.ccr](apis/ccr.md)
- [Client.clearScroll](apis/clearScroll.md)
- [Client.closePointInTime](apis/closePointInTime.md)
- [Client.cluster](apis/cluster.md)
- [Client.connector](apis/connector.md)
- [Client.count](apis/count.md)
- [Client.create](apis/create.md)
- [Client.danglingIndices](apis/danglingIndices.md)
- [Client.delete](apis/delete.md)
- [Client.deleteByQuery](apis/deleteByQuery.md)
- [Client.deleteByQueryRethrottle](apis/deleteByQueryRethrottle.md)
- [Client.deleteScript](apis/deleteScript.md)
- [Client.enrich](apis/enrich.md)
- [Client.eql](apis/eql.md)
- [Client.esql](apis/esql.md)
- [Client.exists](apis/exists.md)
- [Client.existsSource](apis/existsSource.md)
- [Client.explain](apis/explain.md)
- [Client.features](apis/features.md)
- [Client.fieldCaps](apis/fieldCaps.md)
- [Client.fleet](apis/fleet.md)
- [Client.get](apis/get.md)
- [Client.getScript](apis/getScript.md)
- [Client.getScriptContext](apis/getScriptContext.md)
- [Client.getScriptLanguages](apis/getScriptLanguages.md)
- [Client.getSource](apis/getSource.md)
- [Client.graph](apis/graph.md)
- [Client.healthReport](apis/healthReport.md)
- [Client.ilm](apis/ilm.md)
- [Client.index](apis/index.md)
- [Client.indices](apis/indices.md)
- [Client.inference](apis/inference.md)
- [Client.info](apis/info.md)
- [Client.ingest](apis/ingest.md)
- [Client.knnSearch](apis/knnSearch.md)
- [Client.license](apis/license.md)
- [Client.logstash](apis/logstash.md)
- [Client.mget](apis/mget.md)
- [Client.migration](apis/migration.md)
- [Client.ml](apis/ml.md)
- [Client.monitoring](apis/monitoring.md)
- [Client.msearch](apis/msearch.md)
- [Client.msearchTemplate](apis/msearchTemplate.md)
- [Client.mtermvectors](apis/mtermvectors.md)
- [Client.nodes](apis/nodes.md)
- [Client.openPointInTime](apis/openPointInTime.md)
- [Client.ping](apis/ping.md)
- [Client.profiling](apis/profiling.md)
- [Client.project](apis/project.md)
- [Client.putScript](apis/putScript.md)
- [Client.queryRules](apis/queryRules.md)
- [Client.rankEval](apis/rankEval.md)
- [Client.reindex](apis/reindex.md)
- [Client.reindexRethrottle](apis/reindexRethrottle.md)
- [Client.renderSearchTemplate](apis/renderSearchTemplate.md)
- [Client.rollup](apis/rollup.md)
- [Client.scriptsPainlessExecute](apis/scriptsPainlessExecute.md)
- [Client.scroll](apis/scroll.md)
- [Client.search](apis/search.md)
- [Client.searchApplication](apis/searchApplication.md)
- [Client.searchMvt](apis/searchMvt.md)
- [Client.searchShards](apis/searchShards.md)
- [Client.searchTemplate](apis/searchTemplate.md)
- [Client.searchableSnapshots](apis/searchableSnapshots.md)
- [Client.security](apis/security.md)
- [Client.shutdown](apis/shutdown.md)
- [Client.simulate](apis/simulate.md)
- [Client.slm](apis/slm.md)
- [Client.snapshot](apis/snapshot.md)
- [Client.sql](apis/sql.md)
- [Client.ssl](apis/ssl.md)
- [Client.streams](apis/streams.md)
- [Client.synonyms](apis/synonyms.md)
- [Client.tasks](apis/tasks.md)
- [Client.termsEnum](apis/termsEnum.md)
- [Client.termvectors](apis/termvectors.md)
- [Client.textStructure](apis/textStructure.md)
- [Client.transform](apis/transform.md)
- [Client.update](apis/update.md)
- [Client.updateByQuery](apis/updateByQuery.md)
- [Client.updateByQueryRethrottle](apis/updateByQueryRethrottle.md)
- [Client.watcher](apis/watcher.md)
- [Client.xpack](apis/xpack.md)
- [Client.[kAsyncSearch]](apis/[kAsyncSearch].md)
- [Client.[kAutoscaling]](apis/[kAutoscaling].md)
- [Client.[kCat]](apis/[kCat].md)
- [Client.[kCcr]](apis/[kCcr].md)
- [Client.[kCluster]](apis/[kCluster].md)
- [Client.[kConnector]](apis/[kConnector].md)
- [Client.[kDanglingIndices]](apis/[kDanglingIndices].md)
- [Client.[kEnrich]](apis/[kEnrich].md)
- [Client.[kEql]](apis/[kEql].md)
- [Client.[kEsql]](apis/[kEsql].md)
- [Client.[kFeatures]](apis/[kFeatures].md)
- [Client.[kFleet]](apis/[kFleet].md)
- [Client.[kGraph]](apis/[kGraph].md)
- [Client.[kIlm]](apis/[kIlm].md)
- [Client.[kIndices]](apis/[kIndices].md)
- [Client.[kInference]](apis/[kInference].md)
- [Client.[kIngest]](apis/[kIngest].md)
- [Client.[kLicense]](apis/[kLicense].md)
- [Client.[kLogstash]](apis/[kLogstash].md)
- [Client.[kMigration]](apis/[kMigration].md)
- [Client.[kMl]](apis/[kMl].md)
- [Client.[kMonitoring]](apis/[kMonitoring].md)
- [Client.[kNodes]](apis/[kNodes].md)
- [Client.[kProfiling]](apis/[kProfiling].md)
- [Client.[kProject]](apis/[kProject].md)
- [Client.[kQueryRules]](apis/[kQueryRules].md)
- [Client.[kRollup]](apis/[kRollup].md)
- [Client.[kSearchApplication]](apis/[kSearchApplication].md)
- [Client.[kSearchableSnapshots]](apis/[kSearchableSnapshots].md)
- [Client.[kSecurity]](apis/[kSecurity].md)
- [Client.[kShutdown]](apis/[kShutdown].md)
- [Client.[kSimulate]](apis/[kSimulate].md)
- [Client.[kSlm]](apis/[kSlm].md)
- [Client.[kSnapshot]](apis/[kSnapshot].md)
- [Client.[kSql]](apis/[kSql].md)
- [Client.[kSsl]](apis/[kSsl].md)
- [Client.[kStreams]](apis/[kStreams].md)
- [Client.[kSynonyms]](apis/[kSynonyms].md)
- [Client.[kTasks]](apis/[kTasks].md)
- [Client.[kTextStructure]](apis/[kTextStructure].md)
- [Client.[kTransform]](apis/[kTransform].md)
- [Client.[kWatcher]](apis/[kWatcher].md)
- [Client.[kXpack]](apis/[kXpack].md)
- [Client.diagnostic](apis/diagnostic.md)
- [Client.name](apis/name.md)
- [Client.connectionPool](apis/connectionPool.md)
- [Client.transport](apis/transport.md)
- [Client.serializer](apis/serializer.md)
- [Client.helpers](apis/helpers.md)

## Type Definitions

For detailed TypeScript type information, see the [Type Definitions](types/index.md) documentation.

## Transport Layer

The client is built on [@elastic/transport](https://github.com/elastic/elastic-transport-js).
For transport-level documentation, see the [Transport Documentation](transport/README.md).

---

*Generated: 2026-01-23T16:26:44.559Z*
