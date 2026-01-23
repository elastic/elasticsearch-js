[**@elastic/elasticsearch v9.2.0**](../README.md)

***

[@elastic/elasticsearch](../README.md) / src/client

# src/client

## Classes

### default

Defined in: [src/client.ts:193](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L193)

#### Extends

- `default`

#### Constructors

##### Constructor

```ts
new default(): API;
```

Defined in: [src/client.ts:193](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L193)

###### Returns

`API`

###### Overrides

```ts
API.constructor
```

##### Constructor

```ts
new default(opts): default;
```

Defined in: [src/client.ts:201](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L201)

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `opts` | [`ClientOptions`](#clientoptions) |

###### Returns

[`default`](#default)

###### Overrides

```ts
API.constructor
```

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="asyncsearch"></a> `asyncSearch` | `AsyncSearch` | - | `API.asyncSearch` | [src/api/index.ts:106](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L106) |
| <a id="autoscaling"></a> `autoscaling` | `Autoscaling` | - | `API.autoscaling` | [src/api/index.ts:107](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L107) |
| <a id="bulk"></a> `bulk` | \{ \<`TDocument`, `TPartialDocument`\> (`this`, `params`, `options?`): `Promise`\<[`BulkResponse`](api/types.md#bulkresponse)\>; \<`TDocument`, `TPartialDocument`\> (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`BulkResponse`](api/types.md#bulkresponse), `unknown`\>\>; \<`TDocument`, `TPartialDocument`\> (`this`, `params`, `options?`): `Promise`\<[`BulkResponse`](api/types.md#bulkresponse)\>; \} | - | `API.bulk` | [src/api/index.ts:108](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L108) |
| <a id="capabilities"></a> `capabilities` | \{ (`this`, `params?`, `options?`): `Promise`\<[`CapabilitiesResponse`](api/types.md#capabilitiesresponse)\>; (`this`, `params?`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`CapabilitiesResponse`](api/types.md#capabilitiesresponse), `unknown`\>\>; (`this`, `params?`, `options?`): `Promise`\<[`CapabilitiesResponse`](api/types.md#capabilitiesresponse)\>; \} | - | `API.capabilities` | [src/api/index.ts:109](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L109) |
| <a id="cat"></a> `cat` | `Cat` | - | `API.cat` | [src/api/index.ts:110](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L110) |
| <a id="ccr"></a> `ccr` | `Ccr` | - | `API.ccr` | [src/api/index.ts:111](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L111) |
| <a id="clearscroll"></a> `clearScroll` | \{ (`this`, `params?`, `options?`): `Promise`\<[`ClearScrollResponse`](api/types.md#clearscrollresponse)\>; (`this`, `params?`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`ClearScrollResponse`](api/types.md#clearscrollresponse), `unknown`\>\>; (`this`, `params?`, `options?`): `Promise`\<[`ClearScrollResponse`](api/types.md#clearscrollresponse)\>; \} | - | `API.clearScroll` | [src/api/index.ts:112](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L112) |
| <a id="closepointintime"></a> `closePointInTime` | \{ (`this`, `params`, `options?`): `Promise`\<[`ClosePointInTimeResponse`](api/types.md#closepointintimeresponse)\>; (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`ClosePointInTimeResponse`](api/types.md#closepointintimeresponse), `unknown`\>\>; (`this`, `params`, `options?`): `Promise`\<[`ClosePointInTimeResponse`](api/types.md#closepointintimeresponse)\>; \} | - | `API.closePointInTime` | [src/api/index.ts:113](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L113) |
| <a id="cluster"></a> `cluster` | `Cluster` | - | `API.cluster` | [src/api/index.ts:114](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L114) |
| <a id="connector"></a> `connector` | `Connector` | - | `API.connector` | [src/api/index.ts:115](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L115) |
| <a id="count"></a> `count` | \{ (`this`, `params?`, `options?`): `Promise`\<[`CountResponse`](api/types.md#countresponse)\>; (`this`, `params?`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`CountResponse`](api/types.md#countresponse), `unknown`\>\>; (`this`, `params?`, `options?`): `Promise`\<[`CountResponse`](api/types.md#countresponse)\>; \} | - | `API.count` | [src/api/index.ts:116](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L116) |
| <a id="create"></a> `create` | \{ \<`TDocument`\> (`this`, `params`, `options?`): `Promise`\<[`WriteResponseBase`](api/types.md#writeresponsebase)\>; \<`TDocument`\> (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`WriteResponseBase`](api/types.md#writeresponsebase), `unknown`\>\>; \<`TDocument`\> (`this`, `params`, `options?`): `Promise`\<[`WriteResponseBase`](api/types.md#writeresponsebase)\>; \} | - | `API.create` | [src/api/index.ts:117](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L117) |
| <a id="danglingindices"></a> `danglingIndices` | `DanglingIndices` | - | `API.danglingIndices` | [src/api/index.ts:118](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L118) |
| <a id="delete"></a> `delete` | \{ (`this`, `params`, `options?`): `Promise`\<[`WriteResponseBase`](api/types.md#writeresponsebase)\>; (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`WriteResponseBase`](api/types.md#writeresponsebase), `unknown`\>\>; (`this`, `params`, `options?`): `Promise`\<[`WriteResponseBase`](api/types.md#writeresponsebase)\>; \} | - | `API.delete` | [src/api/index.ts:119](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L119) |
| <a id="deletebyquery"></a> `deleteByQuery` | \{ (`this`, `params`, `options?`): `Promise`\<[`DeleteByQueryResponse`](api/types.md#deletebyqueryresponse)\>; (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`DeleteByQueryResponse`](api/types.md#deletebyqueryresponse), `unknown`\>\>; (`this`, `params`, `options?`): `Promise`\<[`DeleteByQueryResponse`](api/types.md#deletebyqueryresponse)\>; \} | - | `API.deleteByQuery` | [src/api/index.ts:120](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L120) |
| <a id="deletebyqueryrethrottle"></a> `deleteByQueryRethrottle` | \{ (`this`, `params`, `options?`): `Promise`\<[`TasksTaskListResponseBase`](api/types.md#taskstasklistresponsebase)\>; (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`TasksTaskListResponseBase`](api/types.md#taskstasklistresponsebase), `unknown`\>\>; (`this`, `params`, `options?`): `Promise`\<[`TasksTaskListResponseBase`](api/types.md#taskstasklistresponsebase)\>; \} | - | `API.deleteByQueryRethrottle` | [src/api/index.ts:121](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L121) |
| <a id="deletescript"></a> `deleteScript` | \{ (`this`, `params`, `options?`): `Promise`\<[`AcknowledgedResponseBase`](api/types.md#acknowledgedresponsebase)\>; (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`AcknowledgedResponseBase`](api/types.md#acknowledgedresponsebase), `unknown`\>\>; (`this`, `params`, `options?`): `Promise`\<[`AcknowledgedResponseBase`](api/types.md#acknowledgedresponsebase)\>; \} | - | `API.deleteScript` | [src/api/index.ts:122](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L122) |
| <a id="enrich"></a> `enrich` | `Enrich` | - | `API.enrich` | [src/api/index.ts:123](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L123) |
| <a id="eql"></a> `eql` | `Eql` | - | `API.eql` | [src/api/index.ts:124](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L124) |
| <a id="esql"></a> `esql` | `Esql` | - | `API.esql` | [src/api/index.ts:125](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L125) |
| <a id="exists"></a> `exists` | \{ (`this`, `params`, `options?`): `Promise`\<`boolean`\>; (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<`boolean`, `unknown`\>\>; (`this`, `params`, `options?`): `Promise`\<`boolean`\>; \} | - | `API.exists` | [src/api/index.ts:126](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L126) |
| <a id="existssource"></a> `existsSource` | \{ (`this`, `params`, `options?`): `Promise`\<`boolean`\>; (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<`boolean`, `unknown`\>\>; (`this`, `params`, `options?`): `Promise`\<`boolean`\>; \} | - | `API.existsSource` | [src/api/index.ts:127](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L127) |
| <a id="explain"></a> `explain` | \{ \<`TDocument`\> (`this`, `params`, `options?`): `Promise`\<[`ExplainResponse`](api/types.md#explainresponse)\<`TDocument`\>\>; \<`TDocument`\> (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`ExplainResponse`](api/types.md#explainresponse)\<`TDocument`\>, `unknown`\>\>; \<`TDocument`\> (`this`, `params`, `options?`): `Promise`\<[`ExplainResponse`](api/types.md#explainresponse)\<`TDocument`\>\>; \} | - | `API.explain` | [src/api/index.ts:128](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L128) |
| <a id="features"></a> `features` | `Features` | - | `API.features` | [src/api/index.ts:129](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L129) |
| <a id="fieldcaps"></a> `fieldCaps` | \{ (`this`, `params?`, `options?`): `Promise`\<[`FieldCapsResponse`](api/types.md#fieldcapsresponse)\>; (`this`, `params?`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`FieldCapsResponse`](api/types.md#fieldcapsresponse), `unknown`\>\>; (`this`, `params?`, `options?`): `Promise`\<[`FieldCapsResponse`](api/types.md#fieldcapsresponse)\>; \} | - | `API.fieldCaps` | [src/api/index.ts:130](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L130) |
| <a id="fleet"></a> `fleet` | `Fleet` | - | `API.fleet` | [src/api/index.ts:131](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L131) |
| <a id="get"></a> `get` | \{ \<`TDocument`\> (`this`, `params`, `options?`): `Promise`\<[`GetResponse`](api/types.md#getresponse)\<`TDocument`\>\>; \<`TDocument`\> (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`GetResponse`](api/types.md#getresponse)\<`TDocument`\>, `unknown`\>\>; \<`TDocument`\> (`this`, `params`, `options?`): `Promise`\<[`GetResponse`](api/types.md#getresponse)\<`TDocument`\>\>; \} | - | `API.get` | [src/api/index.ts:132](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L132) |
| <a id="getscript"></a> `getScript` | \{ (`this`, `params`, `options?`): `Promise`\<[`GetScriptResponse`](api/types.md#getscriptresponse)\>; (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`GetScriptResponse`](api/types.md#getscriptresponse), `unknown`\>\>; (`this`, `params`, `options?`): `Promise`\<[`GetScriptResponse`](api/types.md#getscriptresponse)\>; \} | - | `API.getScript` | [src/api/index.ts:133](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L133) |
| <a id="getscriptcontext"></a> `getScriptContext` | \{ (`this`, `params?`, `options?`): `Promise`\<[`GetScriptContextResponse`](api/types.md#getscriptcontextresponse)\>; (`this`, `params?`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`GetScriptContextResponse`](api/types.md#getscriptcontextresponse), `unknown`\>\>; (`this`, `params?`, `options?`): `Promise`\<[`GetScriptContextResponse`](api/types.md#getscriptcontextresponse)\>; \} | - | `API.getScriptContext` | [src/api/index.ts:134](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L134) |
| <a id="getscriptlanguages"></a> `getScriptLanguages` | \{ (`this`, `params?`, `options?`): `Promise`\<[`GetScriptLanguagesResponse`](api/types.md#getscriptlanguagesresponse)\>; (`this`, `params?`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`GetScriptLanguagesResponse`](api/types.md#getscriptlanguagesresponse), `unknown`\>\>; (`this`, `params?`, `options?`): `Promise`\<[`GetScriptLanguagesResponse`](api/types.md#getscriptlanguagesresponse)\>; \} | - | `API.getScriptLanguages` | [src/api/index.ts:135](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L135) |
| <a id="getsource"></a> `getSource` | \{ \<`TDocument`\> (`this`, `params`, `options?`): `Promise`\<`TDocument`\>; \<`TDocument`\> (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<`TDocument`, `unknown`\>\>; \<`TDocument`\> (`this`, `params`, `options?`): `Promise`\<`TDocument`\>; \} | - | `API.getSource` | [src/api/index.ts:136](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L136) |
| <a id="graph"></a> `graph` | `Graph` | - | `API.graph` | [src/api/index.ts:137](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L137) |
| <a id="healthreport"></a> `healthReport` | \{ (`this`, `params?`, `options?`): `Promise`\<[`HealthReportResponse`](api/types.md#healthreportresponse)\>; (`this`, `params?`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`HealthReportResponse`](api/types.md#healthreportresponse), `unknown`\>\>; (`this`, `params?`, `options?`): `Promise`\<[`HealthReportResponse`](api/types.md#healthreportresponse)\>; \} | - | `API.healthReport` | [src/api/index.ts:138](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L138) |
| <a id="ilm"></a> `ilm` | `Ilm` | - | `API.ilm` | [src/api/index.ts:139](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L139) |
| <a id="index"></a> `index` | \{ \<`TDocument`\> (`this`, `params`, `options?`): `Promise`\<[`WriteResponseBase`](api/types.md#writeresponsebase)\>; \<`TDocument`\> (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`WriteResponseBase`](api/types.md#writeresponsebase), `unknown`\>\>; \<`TDocument`\> (`this`, `params`, `options?`): `Promise`\<[`WriteResponseBase`](api/types.md#writeresponsebase)\>; \} | - | `API.index` | [src/api/index.ts:140](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L140) |
| <a id="indices"></a> `indices` | `Indices` | - | `API.indices` | [src/api/index.ts:141](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L141) |
| <a id="inference"></a> `inference` | `Inference` | - | `API.inference` | [src/api/index.ts:142](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L142) |
| <a id="info"></a> `info` | \{ (`this`, `params?`, `options?`): `Promise`\<[`InfoResponse`](api/types.md#inforesponse)\>; (`this`, `params?`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`InfoResponse`](api/types.md#inforesponse), `unknown`\>\>; (`this`, `params?`, `options?`): `Promise`\<[`InfoResponse`](api/types.md#inforesponse)\>; \} | - | `API.info` | [src/api/index.ts:143](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L143) |
| <a id="ingest"></a> `ingest` | `Ingest` | - | `API.ingest` | [src/api/index.ts:144](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L144) |
| <a id="knnsearch"></a> `knnSearch` | \{ \<`TDocument`\> (`this`, `params`, `options?`): `Promise`\<[`KnnSearchResponse`](api/types.md#knnsearchresponse)\<`TDocument`\>\>; \<`TDocument`\> (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`KnnSearchResponse`](api/types.md#knnsearchresponse)\<`TDocument`\>, `unknown`\>\>; \<`TDocument`\> (`this`, `params`, `options?`): `Promise`\<[`KnnSearchResponse`](api/types.md#knnsearchresponse)\<`TDocument`\>\>; \} | - | `API.knnSearch` | [src/api/index.ts:145](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L145) |
| <a id="license"></a> `license` | `License` | - | `API.license` | [src/api/index.ts:146](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L146) |
| <a id="logstash"></a> `logstash` | `Logstash` | - | `API.logstash` | [src/api/index.ts:147](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L147) |
| <a id="mget"></a> `mget` | \{ \<`TDocument`\> (`this`, `params?`, `options?`): `Promise`\<[`MgetResponse`](api/types.md#mgetresponse)\<`TDocument`\>\>; \<`TDocument`\> (`this`, `params?`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`MgetResponse`](api/types.md#mgetresponse)\<`TDocument`\>, `unknown`\>\>; \<`TDocument`\> (`this`, `params?`, `options?`): `Promise`\<[`MgetResponse`](api/types.md#mgetresponse)\<`TDocument`\>\>; \} | - | `API.mget` | [src/api/index.ts:148](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L148) |
| <a id="migration"></a> `migration` | `Migration` | - | `API.migration` | [src/api/index.ts:149](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L149) |
| <a id="ml"></a> `ml` | `Ml` | - | `API.ml` | [src/api/index.ts:150](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L150) |
| <a id="monitoring"></a> `monitoring` | `Monitoring` | - | `API.monitoring` | [src/api/index.ts:151](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L151) |
| <a id="msearch"></a> `msearch` | \{ \<`TDocument`, `TAggregations`\> (`this`, `params`, `options?`): `Promise`\<[`MsearchResponse`](api/types.md#msearchresponse)\<`TDocument`, `TAggregations`\>\>; \<`TDocument`, `TAggregations`\> (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`MsearchResponse`](api/types.md#msearchresponse)\<`TDocument`, `TAggregations`\>, `unknown`\>\>; \<`TDocument`, `TAggregations`\> (`this`, `params`, `options?`): `Promise`\<[`MsearchResponse`](api/types.md#msearchresponse)\<`TDocument`, `TAggregations`\>\>; \} | - | `API.msearch` | [src/api/index.ts:152](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L152) |
| <a id="msearchtemplate"></a> `msearchTemplate` | \{ \<`TDocument`, `TAggregations`\> (`this`, `params`, `options?`): `Promise`\<[`MsearchTemplateResponse`](api/types.md#msearchtemplateresponse)\<`TDocument`, `TAggregations`\>\>; \<`TDocument`, `TAggregations`\> (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`MsearchTemplateResponse`](api/types.md#msearchtemplateresponse)\<`TDocument`, `TAggregations`\>, `unknown`\>\>; \<`TDocument`, `TAggregations`\> (`this`, `params`, `options?`): `Promise`\<[`MsearchTemplateResponse`](api/types.md#msearchtemplateresponse)\<`TDocument`, `TAggregations`\>\>; \} | - | `API.msearchTemplate` | [src/api/index.ts:153](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L153) |
| <a id="mtermvectors"></a> `mtermvectors` | \{ (`this`, `params?`, `options?`): `Promise`\<[`MtermvectorsResponse`](api/types.md#mtermvectorsresponse)\>; (`this`, `params?`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`MtermvectorsResponse`](api/types.md#mtermvectorsresponse), `unknown`\>\>; (`this`, `params?`, `options?`): `Promise`\<[`MtermvectorsResponse`](api/types.md#mtermvectorsresponse)\>; \} | - | `API.mtermvectors` | [src/api/index.ts:154](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L154) |
| <a id="nodes-1"></a> `nodes` | `Nodes` | - | `API.nodes` | [src/api/index.ts:155](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L155) |
| <a id="openpointintime"></a> `openPointInTime` | \{ (`this`, `params`, `options?`): `Promise`\<[`OpenPointInTimeResponse`](api/types.md#openpointintimeresponse)\>; (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`OpenPointInTimeResponse`](api/types.md#openpointintimeresponse), `unknown`\>\>; (`this`, `params`, `options?`): `Promise`\<[`OpenPointInTimeResponse`](api/types.md#openpointintimeresponse)\>; \} | - | `API.openPointInTime` | [src/api/index.ts:156](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L156) |
| <a id="ping"></a> `ping` | \{ (`this`, `params?`, `options?`): `Promise`\<`boolean`\>; (`this`, `params?`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<`boolean`, `unknown`\>\>; (`this`, `params?`, `options?`): `Promise`\<`boolean`\>; \} | - | `API.ping` | [src/api/index.ts:157](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L157) |
| <a id="profiling"></a> `profiling` | `Profiling` | - | `API.profiling` | [src/api/index.ts:158](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L158) |
| <a id="project"></a> `project` | `Project` | - | `API.project` | [src/api/index.ts:159](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L159) |
| <a id="putscript"></a> `putScript` | \{ (`this`, `params`, `options?`): `Promise`\<[`AcknowledgedResponseBase`](api/types.md#acknowledgedresponsebase)\>; (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`AcknowledgedResponseBase`](api/types.md#acknowledgedresponsebase), `unknown`\>\>; (`this`, `params`, `options?`): `Promise`\<[`AcknowledgedResponseBase`](api/types.md#acknowledgedresponsebase)\>; \} | - | `API.putScript` | [src/api/index.ts:160](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L160) |
| <a id="queryrules"></a> `queryRules` | `QueryRules` | - | `API.queryRules` | [src/api/index.ts:161](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L161) |
| <a id="rankeval"></a> `rankEval` | \{ (`this`, `params`, `options?`): `Promise`\<[`RankEvalResponse`](api/types.md#rankevalresponse)\>; (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`RankEvalResponse`](api/types.md#rankevalresponse), `unknown`\>\>; (`this`, `params`, `options?`): `Promise`\<[`RankEvalResponse`](api/types.md#rankevalresponse)\>; \} | - | `API.rankEval` | [src/api/index.ts:162](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L162) |
| <a id="reindex"></a> `reindex` | \{ (`this`, `params`, `options?`): `Promise`\<[`ReindexResponse`](api/types.md#reindexresponse)\>; (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`ReindexResponse`](api/types.md#reindexresponse), `unknown`\>\>; (`this`, `params`, `options?`): `Promise`\<[`ReindexResponse`](api/types.md#reindexresponse)\>; \} | - | `API.reindex` | [src/api/index.ts:163](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L163) |
| <a id="reindexrethrottle"></a> `reindexRethrottle` | \{ (`this`, `params`, `options?`): `Promise`\<[`ReindexRethrottleResponse`](api/types.md#reindexrethrottleresponse)\>; (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`ReindexRethrottleResponse`](api/types.md#reindexrethrottleresponse), `unknown`\>\>; (`this`, `params`, `options?`): `Promise`\<[`ReindexRethrottleResponse`](api/types.md#reindexrethrottleresponse)\>; \} | - | `API.reindexRethrottle` | [src/api/index.ts:164](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L164) |
| <a id="rendersearchtemplate"></a> `renderSearchTemplate` | \{ (`this`, `params?`, `options?`): `Promise`\<[`RenderSearchTemplateResponse`](api/types.md#rendersearchtemplateresponse)\>; (`this`, `params?`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`RenderSearchTemplateResponse`](api/types.md#rendersearchtemplateresponse), `unknown`\>\>; (`this`, `params?`, `options?`): `Promise`\<[`RenderSearchTemplateResponse`](api/types.md#rendersearchtemplateresponse)\>; \} | - | `API.renderSearchTemplate` | [src/api/index.ts:165](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L165) |
| <a id="rollup"></a> `rollup` | `Rollup` | - | `API.rollup` | [src/api/index.ts:166](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L166) |
| <a id="scriptspainlessexecute"></a> `scriptsPainlessExecute` | \{ \<`TResult`\> (`this`, `params?`, `options?`): `Promise`\<[`ScriptsPainlessExecuteResponse`](api/types.md#scriptspainlessexecuteresponse)\<`TResult`\>\>; \<`TResult`\> (`this`, `params?`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`ScriptsPainlessExecuteResponse`](api/types.md#scriptspainlessexecuteresponse)\<`TResult`\>, `unknown`\>\>; \<`TResult`\> (`this`, `params?`, `options?`): `Promise`\<[`ScriptsPainlessExecuteResponse`](api/types.md#scriptspainlessexecuteresponse)\<`TResult`\>\>; \} | - | `API.scriptsPainlessExecute` | [src/api/index.ts:167](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L167) |
| <a id="scroll"></a> `scroll` | \{ \<`TDocument`, `TAggregations`\> (`this`, `params`, `options?`): `Promise`\<[`ScrollResponse`](api/types.md#scrollresponse)\<`TDocument`, `TAggregations`\>\>; \<`TDocument`, `TAggregations`\> (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`ScrollResponse`](api/types.md#scrollresponse)\<`TDocument`, `TAggregations`\>, `unknown`\>\>; \<`TDocument`, `TAggregations`\> (`this`, `params`, `options?`): `Promise`\<[`ScrollResponse`](api/types.md#scrollresponse)\<`TDocument`, `TAggregations`\>\>; \} | - | `API.scroll` | [src/api/index.ts:168](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L168) |
| <a id="search"></a> `search` | \{ \<`TDocument`, `TAggregations`\> (`this`, `params?`, `options?`): `Promise`\<[`SearchResponse`](api/types.md#searchresponse)\<`TDocument`, `TAggregations`\>\>; \<`TDocument`, `TAggregations`\> (`this`, `params?`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`SearchResponse`](api/types.md#searchresponse)\<`TDocument`, `TAggregations`\>, `unknown`\>\>; \<`TDocument`, `TAggregations`\> (`this`, `params?`, `options?`): `Promise`\<[`SearchResponse`](api/types.md#searchresponse)\<`TDocument`, `TAggregations`\>\>; \} | - | `API.search` | [src/api/index.ts:169](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L169) |
| <a id="searchapplication"></a> `searchApplication` | `SearchApplication` | - | `API.searchApplication` | [src/api/index.ts:170](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L170) |
| <a id="searchmvt"></a> `searchMvt` | \{ (`this`, `params`, `options?`): `Promise`\<`ArrayBuffer`\>; (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<`ArrayBuffer`, `unknown`\>\>; (`this`, `params`, `options?`): `Promise`\<`ArrayBuffer`\>; \} | - | `API.searchMvt` | [src/api/index.ts:171](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L171) |
| <a id="searchshards"></a> `searchShards` | \{ (`this`, `params?`, `options?`): `Promise`\<[`SearchShardsResponse`](api/types.md#searchshardsresponse)\>; (`this`, `params?`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`SearchShardsResponse`](api/types.md#searchshardsresponse), `unknown`\>\>; (`this`, `params?`, `options?`): `Promise`\<[`SearchShardsResponse`](api/types.md#searchshardsresponse)\>; \} | - | `API.searchShards` | [src/api/index.ts:172](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L172) |
| <a id="searchtemplate"></a> `searchTemplate` | \{ \<`TDocument`\> (`this`, `params?`, `options?`): `Promise`\<[`SearchTemplateResponse`](api/types.md#searchtemplateresponse)\<`TDocument`\>\>; \<`TDocument`\> (`this`, `params?`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`SearchTemplateResponse`](api/types.md#searchtemplateresponse)\<`TDocument`\>, `unknown`\>\>; \<`TDocument`\> (`this`, `params?`, `options?`): `Promise`\<[`SearchTemplateResponse`](api/types.md#searchtemplateresponse)\<`TDocument`\>\>; \} | - | `API.searchTemplate` | [src/api/index.ts:173](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L173) |
| <a id="searchablesnapshots"></a> `searchableSnapshots` | `SearchableSnapshots` | - | `API.searchableSnapshots` | [src/api/index.ts:174](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L174) |
| <a id="security"></a> `security` | `Security` | - | `API.security` | [src/api/index.ts:175](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L175) |
| <a id="shutdown"></a> `shutdown` | `Shutdown` | - | `API.shutdown` | [src/api/index.ts:176](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L176) |
| <a id="simulate"></a> `simulate` | `Simulate` | - | `API.simulate` | [src/api/index.ts:177](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L177) |
| <a id="slm"></a> `slm` | `Slm` | - | `API.slm` | [src/api/index.ts:178](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L178) |
| <a id="snapshot"></a> `snapshot` | `Snapshot` | - | `API.snapshot` | [src/api/index.ts:179](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L179) |
| <a id="sql"></a> `sql` | `Sql` | - | `API.sql` | [src/api/index.ts:180](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L180) |
| <a id="ssl-1"></a> `ssl` | `Ssl` | - | `API.ssl` | [src/api/index.ts:181](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L181) |
| <a id="streams"></a> `streams` | `Streams` | - | `API.streams` | [src/api/index.ts:182](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L182) |
| <a id="synonyms"></a> `synonyms` | `Synonyms` | - | `API.synonyms` | [src/api/index.ts:183](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L183) |
| <a id="tasks"></a> `tasks` | `Tasks` | - | `API.tasks` | [src/api/index.ts:184](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L184) |
| <a id="termsenum"></a> `termsEnum` | \{ (`this`, `params`, `options?`): `Promise`\<[`TermsEnumResponse`](api/types.md#termsenumresponse)\>; (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`TermsEnumResponse`](api/types.md#termsenumresponse), `unknown`\>\>; (`this`, `params`, `options?`): `Promise`\<[`TermsEnumResponse`](api/types.md#termsenumresponse)\>; \} | - | `API.termsEnum` | [src/api/index.ts:185](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L185) |
| <a id="termvectors"></a> `termvectors` | \{ \<`TDocument`\> (`this`, `params`, `options?`): `Promise`\<[`TermvectorsResponse`](api/types.md#termvectorsresponse)\>; \<`TDocument`\> (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`TermvectorsResponse`](api/types.md#termvectorsresponse), `unknown`\>\>; \<`TDocument`\> (`this`, `params`, `options?`): `Promise`\<[`TermvectorsResponse`](api/types.md#termvectorsresponse)\>; \} | - | `API.termvectors` | [src/api/index.ts:186](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L186) |
| <a id="textstructure"></a> `textStructure` | `TextStructure` | - | `API.textStructure` | [src/api/index.ts:187](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L187) |
| <a id="transform"></a> `transform` | `Transform` | - | `API.transform` | [src/api/index.ts:188](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L188) |
| <a id="update"></a> `update` | \{ \<`TDocument`, `TPartialDocument`, `TDocumentR`\> (`this`, `params`, `options?`): `Promise`\<[`UpdateResponse`](api/types.md#updateresponse)\<`TDocumentR`\>\>; \<`TDocument`, `TPartialDocument`, `TDocumentR`\> (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`UpdateResponse`](api/types.md#updateresponse)\<`TDocumentR`\>, `unknown`\>\>; \<`TDocument`, `TPartialDocument`, `TDocumentR`\> (`this`, `params`, `options?`): `Promise`\<[`UpdateResponse`](api/types.md#updateresponse)\<`TDocumentR`\>\>; \} | - | `API.update` | [src/api/index.ts:189](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L189) |
| <a id="updatebyquery"></a> `updateByQuery` | \{ (`this`, `params`, `options?`): `Promise`\<[`UpdateByQueryResponse`](api/types.md#updatebyqueryresponse)\>; (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`UpdateByQueryResponse`](api/types.md#updatebyqueryresponse), `unknown`\>\>; (`this`, `params`, `options?`): `Promise`\<[`UpdateByQueryResponse`](api/types.md#updatebyqueryresponse)\>; \} | - | `API.updateByQuery` | [src/api/index.ts:190](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L190) |
| <a id="updatebyqueryrethrottle"></a> `updateByQueryRethrottle` | \{ (`this`, `params`, `options?`): `Promise`\<[`UpdateByQueryRethrottleResponse`](api/types.md#updatebyqueryrethrottleresponse)\>; (`this`, `params`, `options?`): `Promise`\<[`TransportResult`](../node_modules/@elastic/transport/README.md#transportresult)\<[`UpdateByQueryRethrottleResponse`](api/types.md#updatebyqueryrethrottleresponse), `unknown`\>\>; (`this`, `params`, `options?`): `Promise`\<[`UpdateByQueryRethrottleResponse`](api/types.md#updatebyqueryrethrottleresponse)\>; \} | - | `API.updateByQueryRethrottle` | [src/api/index.ts:191](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L191) |
| <a id="watcher"></a> `watcher` | `Watcher` | - | `API.watcher` | [src/api/index.ts:192](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L192) |
| <a id="xpack"></a> `xpack` | `Xpack` | - | `API.xpack` | [src/api/index.ts:193](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L193) |
| <a id="kasyncsearch"></a> `[kAsyncSearch]` | `symbol` \| `null` | - | `API.[kAsyncSearch]` | [src/api/index.ts:241](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L241) |
| <a id="kautoscaling"></a> `[kAutoscaling]` | `symbol` \| `null` | - | `API.[kAutoscaling]` | [src/api/index.ts:242](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L242) |
| <a id="kcat"></a> `[kCat]` | `symbol` \| `null` | - | `API.[kCat]` | [src/api/index.ts:243](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L243) |
| <a id="kccr"></a> `[kCcr]` | `symbol` \| `null` | - | `API.[kCcr]` | [src/api/index.ts:244](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L244) |
| <a id="kcluster"></a> `[kCluster]` | `symbol` \| `null` | - | `API.[kCluster]` | [src/api/index.ts:245](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L245) |
| <a id="kconnector"></a> `[kConnector]` | `symbol` \| `null` | - | `API.[kConnector]` | [src/api/index.ts:246](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L246) |
| <a id="kdanglingindices"></a> `[kDanglingIndices]` | `symbol` \| `null` | - | `API.[kDanglingIndices]` | [src/api/index.ts:247](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L247) |
| <a id="kenrich"></a> `[kEnrich]` | `symbol` \| `null` | - | `API.[kEnrich]` | [src/api/index.ts:248](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L248) |
| <a id="keql"></a> `[kEql]` | `symbol` \| `null` | - | `API.[kEql]` | [src/api/index.ts:249](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L249) |
| <a id="kesql"></a> `[kEsql]` | `symbol` \| `null` | - | `API.[kEsql]` | [src/api/index.ts:250](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L250) |
| <a id="kfeatures"></a> `[kFeatures]` | `symbol` \| `null` | - | `API.[kFeatures]` | [src/api/index.ts:251](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L251) |
| <a id="kfleet"></a> `[kFleet]` | `symbol` \| `null` | - | `API.[kFleet]` | [src/api/index.ts:252](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L252) |
| <a id="kgraph"></a> `[kGraph]` | `symbol` \| `null` | - | `API.[kGraph]` | [src/api/index.ts:253](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L253) |
| <a id="kilm"></a> `[kIlm]` | `symbol` \| `null` | - | `API.[kIlm]` | [src/api/index.ts:254](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L254) |
| <a id="kindices"></a> `[kIndices]` | `symbol` \| `null` | - | `API.[kIndices]` | [src/api/index.ts:255](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L255) |
| <a id="kinference"></a> `[kInference]` | `symbol` \| `null` | - | `API.[kInference]` | [src/api/index.ts:256](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L256) |
| <a id="kingest"></a> `[kIngest]` | `symbol` \| `null` | - | `API.[kIngest]` | [src/api/index.ts:257](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L257) |
| <a id="klicense"></a> `[kLicense]` | `symbol` \| `null` | - | `API.[kLicense]` | [src/api/index.ts:258](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L258) |
| <a id="klogstash"></a> `[kLogstash]` | `symbol` \| `null` | - | `API.[kLogstash]` | [src/api/index.ts:259](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L259) |
| <a id="kmigration"></a> `[kMigration]` | `symbol` \| `null` | - | `API.[kMigration]` | [src/api/index.ts:260](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L260) |
| <a id="kml"></a> `[kMl]` | `symbol` \| `null` | - | `API.[kMl]` | [src/api/index.ts:261](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L261) |
| <a id="kmonitoring"></a> `[kMonitoring]` | `symbol` \| `null` | - | `API.[kMonitoring]` | [src/api/index.ts:262](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L262) |
| <a id="knodes"></a> `[kNodes]` | `symbol` \| `null` | - | `API.[kNodes]` | [src/api/index.ts:263](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L263) |
| <a id="kprofiling"></a> `[kProfiling]` | `symbol` \| `null` | - | `API.[kProfiling]` | [src/api/index.ts:264](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L264) |
| <a id="kproject"></a> `[kProject]` | `symbol` \| `null` | - | `API.[kProject]` | [src/api/index.ts:265](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L265) |
| <a id="kqueryrules"></a> `[kQueryRules]` | `symbol` \| `null` | - | `API.[kQueryRules]` | [src/api/index.ts:266](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L266) |
| <a id="krollup"></a> `[kRollup]` | `symbol` \| `null` | - | `API.[kRollup]` | [src/api/index.ts:267](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L267) |
| <a id="ksearchapplication"></a> `[kSearchApplication]` | `symbol` \| `null` | - | `API.[kSearchApplication]` | [src/api/index.ts:268](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L268) |
| <a id="ksearchablesnapshots"></a> `[kSearchableSnapshots]` | `symbol` \| `null` | - | `API.[kSearchableSnapshots]` | [src/api/index.ts:269](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L269) |
| <a id="ksecurity"></a> `[kSecurity]` | `symbol` \| `null` | - | `API.[kSecurity]` | [src/api/index.ts:270](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L270) |
| <a id="kshutdown"></a> `[kShutdown]` | `symbol` \| `null` | - | `API.[kShutdown]` | [src/api/index.ts:271](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L271) |
| <a id="ksimulate"></a> `[kSimulate]` | `symbol` \| `null` | - | `API.[kSimulate]` | [src/api/index.ts:272](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L272) |
| <a id="kslm"></a> `[kSlm]` | `symbol` \| `null` | - | `API.[kSlm]` | [src/api/index.ts:273](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L273) |
| <a id="ksnapshot"></a> `[kSnapshot]` | `symbol` \| `null` | - | `API.[kSnapshot]` | [src/api/index.ts:274](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L274) |
| <a id="ksql"></a> `[kSql]` | `symbol` \| `null` | - | `API.[kSql]` | [src/api/index.ts:275](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L275) |
| <a id="kssl"></a> `[kSsl]` | `symbol` \| `null` | - | `API.[kSsl]` | [src/api/index.ts:276](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L276) |
| <a id="kstreams"></a> `[kStreams]` | `symbol` \| `null` | - | `API.[kStreams]` | [src/api/index.ts:277](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L277) |
| <a id="ksynonyms"></a> `[kSynonyms]` | `symbol` \| `null` | - | `API.[kSynonyms]` | [src/api/index.ts:278](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L278) |
| <a id="ktasks"></a> `[kTasks]` | `symbol` \| `null` | - | `API.[kTasks]` | [src/api/index.ts:279](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L279) |
| <a id="ktextstructure"></a> `[kTextStructure]` | `symbol` \| `null` | - | `API.[kTextStructure]` | [src/api/index.ts:280](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L280) |
| <a id="ktransform"></a> `[kTransform]` | `symbol` \| `null` | - | `API.[kTransform]` | [src/api/index.ts:281](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L281) |
| <a id="kwatcher"></a> `[kWatcher]` | `symbol` \| `null` | - | `API.[kWatcher]` | [src/api/index.ts:282](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L282) |
| <a id="kxpack"></a> `[kXpack]` | `symbol` \| `null` | - | `API.[kXpack]` | [src/api/index.ts:283](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/api/index.ts#L283) |
| <a id="diagnostic"></a> `diagnostic` | [`Diagnostic`](../node_modules/@elastic/transport/README.md#diagnostic) | - | - | [src/client.ts:194](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L194) |
| <a id="name-1"></a> `name` | `string` \| `symbol` | Returns the name of the function. Function names are read-only and can not be changed. | - | [src/client.ts:195](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L195) |
| <a id="connectionpool-1"></a> `connectionPool` | [`BaseConnectionPool`](../node_modules/@elastic/transport/README.md#baseconnectionpool) | - | - | [src/client.ts:196](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L196) |
| <a id="transport-1"></a> `transport` | `SniffingTransport` | - | - | [src/client.ts:197](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L197) |
| <a id="serializer-1"></a> `serializer` | [`Serializer`](../node_modules/@elastic/transport/README.md#serializer) | - | - | [src/client.ts:198](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L198) |
| <a id="helpers"></a> `helpers` | `Helpers` | - | - | [src/client.ts:199](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L199) |

#### Methods

##### child()

```ts
child(opts): default;
```

Defined in: [src/client.ts:453](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L453)

Creates a child client instance that shared its connection pool with the parent client

###### Parameters

| Parameter | Type |
| ------ | ------ |
| `opts` | [`ClientOptions`](#clientoptions) |

###### Returns

[`default`](#default)

###### See

[https://www.elastic.co/docs/reference/elasticsearch/clients/javascript/child](https://www.elastic.co/docs/reference/elasticsearch/clients/javascript/child)

##### close()

```ts
close(): Promise<void>;
```

Defined in: [src/client.ts:477](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L477)

Closes all connections in the connection pool. Connections shared with any parent or child instances will also be closed.

###### Returns

`Promise`\<`void`\>

## Interfaces

### NodeOptions

Defined in: [src/client.ts:62](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L62)

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="url"></a> `url` | `URL` | [src/client.ts:64](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L64) |
| <a id="id"></a> `id?` | `string` | [src/client.ts:65](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L65) |
| <a id="agent"></a> `agent?` | \| [`HttpAgentOptions`](../node_modules/@elastic/transport/README.md#httpagentoptions) \| [`UndiciAgentOptions`](../node_modules/@elastic/transport/README.md#undiciagentoptions) | [src/client.ts:67](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L67) |
| <a id="ssl"></a> `ssl?` | `ConnectionOptions` | [src/client.ts:69](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L69) |
| <a id="headers"></a> `headers?` | `Record`\<`string`, `any`\> | [src/client.ts:71](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L71) |
| <a id="roles"></a> `roles?` | \{ `master`: `boolean`; `data`: `boolean`; `ingest`: `boolean`; `ml`: `boolean`; \} | [src/client.ts:73](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L73) |
| `roles.master` | `boolean` | [src/client.ts:74](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L74) |
| `roles.data` | `boolean` | [src/client.ts:75](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L75) |
| `roles.ingest` | `boolean` | [src/client.ts:76](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L76) |
| `roles.ml` | `boolean` | [src/client.ts:77](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L77) |

***

### ClientOptions

Defined in: [src/client.ts:81](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L81)

#### Properties

| Property | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="node"></a> `node?` | \| `string` \| `string`[] \| [`NodeOptions`](#nodeoptions) \| [`NodeOptions`](#nodeoptions)[] | `undefined` | - | [src/client.ts:83](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L83) |
| <a id="nodes"></a> `nodes?` | \| `string` \| `string`[] \| [`NodeOptions`](#nodeoptions) \| [`NodeOptions`](#nodeoptions)[] | `undefined` | - | [src/client.ts:85](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L85) |
| <a id="connection"></a> `Connection?` | *typeof* [`BaseConnection`](../node_modules/@elastic/transport/README.md#baseconnection) | `UndiciConnection` | - | [src/client.ts:88](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L88) |
| <a id="connectionpool"></a> `ConnectionPool?` | *typeof* [`BaseConnectionPool`](../node_modules/@elastic/transport/README.md#baseconnectionpool) | `CloudConnectionPool`, if connecting to Elastic Cloud, otherwise `WeightedConnectionPool` | - | [src/client.ts:91](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L91) |
| <a id="transport"></a> `Transport?` | *typeof* [`Transport`](../node_modules/@elastic/transport/README.md#transport) | `Transport` | - | [src/client.ts:94](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L94) |
| <a id="serializer"></a> `Serializer?` | *typeof* [`Serializer`](../node_modules/@elastic/transport/README.md#serializer) | `Serializer` | - | [src/client.ts:97](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L97) |
| <a id="maxretries"></a> `maxRetries?` | `number` | `3` | - | [src/client.ts:100](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L100) |
| <a id="requesttimeout"></a> `requestTimeout?` | `number` | `No timeout` | **Remarks** Read [the Elasticsearch docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-network.html#_http_client_configuration) about HTTP client configuration for details. | [src/client.ts:104](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L104) |
| <a id="pingtimeout"></a> `pingTimeout?` | `number` | `3000` | - | [src/client.ts:107](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L107) |
| <a id="sniffinterval"></a> `sniffInterval?` | `number` \| `boolean` | `false` | **Remarks** Sniffing might not be the best solution for you. Read https://www.elastic.co/blog/elasticsearch-sniffing-best-practices-what-when-why-how to learn more. | [src/client.ts:111](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L111) |
| <a id="sniffonstart"></a> `sniffOnStart?` | `boolean` | `false` | **Remarks** Sniffing might not be the best solution for you. Read https://www.elastic.co/blog/elasticsearch-sniffing-best-practices-what-when-why-how to learn more. | [src/client.ts:115](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L115) |
| <a id="sniffendpoint"></a> `sniffEndpoint?` | `string` | `"_nodes/_all/http"` | **Remarks** Sniffing might not be the best solution for you. Read https://www.elastic.co/blog/elasticsearch-sniffing-best-practices-what-when-why-how to learn more. | [src/client.ts:119](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L119) |
| <a id="sniffonconnectionfault"></a> `sniffOnConnectionFault?` | `boolean` | `false` | **Remarks** Sniffing might not be the best solution for you. Read https://www.elastic.co/blog/elasticsearch-sniffing-best-practices-what-when-why-how to learn more. | [src/client.ts:123](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L123) |
| <a id="resurrectstrategy"></a> `resurrectStrategy?` | `"none"` \| `"ping"` \| `"optimistic"` | `'ping'` | - | [src/client.ts:126](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L126) |
| <a id="compression"></a> `compression?` | `boolean` | `true` if connecting to Elastic Cloud, otherwise `false`. | - | [src/client.ts:129](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L129) |
| <a id="tls"></a> `tls?` | `ConnectionOptions` | `null` | - | [src/client.ts:132](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L132) |
| <a id="agent-1"></a> `agent?` | \| `false` \| [`HttpAgentOptions`](../node_modules/@elastic/transport/README.md#httpagentoptions) \| [`UndiciAgentOptions`](../node_modules/@elastic/transport/README.md#undiciagentoptions) \| `agentFn` | `null` | - | [src/client.ts:135](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L135) |
| <a id="nodefilter"></a> `nodeFilter?` | `nodeFilterFn` | A function that uses the Connection `roles` property to avoid master-only nodes | - | [src/client.ts:138](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L138) |
| <a id="nodeselector"></a> `nodeSelector?` | `nodeSelectorFn` | `A "round robin" function that loops sequentially through each node in the pool.` | - | [src/client.ts:141](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L141) |
| <a id="headers-1"></a> `headers?` | `Record`\<`string`, `any`\> | An object with a custom `user-agent` header | - | [src/client.ts:144](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L144) |
| <a id="opaqueidprefix"></a> `opaqueIdPrefix?` | `string` | `null` | - | [src/client.ts:147](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L147) |
| <a id="generaterequestid"></a> `generateRequestId?` | `generateRequestIdFn` | `A function that increments a number counter starting from 1` | - | [src/client.ts:150](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L150) |
| <a id="name"></a> `name?` | `string` \| `symbol` | `'elasticsearch-js'` | - | [src/client.ts:153](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L153) |
| <a id="auth"></a> `auth?` | \| `BasicAuth` \| [`ApiKeyAuth`](../node_modules/@elastic/transport/README.md#apikeyauth) \| [`BearerAuth`](../node_modules/@elastic/transport/README.md#bearerauth) | `null` | - | [src/client.ts:156](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L156) |
| <a id="context"></a> `context?` | `Context` | `null` | - | [src/client.ts:159](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L159) |
| <a id="proxy"></a> `proxy?` | `string` \| `URL` | `null` | - | [src/client.ts:162](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L162) |
| <a id="enablemetaheader"></a> `enableMetaHeader?` | `boolean` | `true` | - | [src/client.ts:165](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L165) |
| <a id="cloud"></a> `cloud?` | \{ `id`: `string`; \} | `null` | **Remarks** Read https://www.elastic.co/docs/reference/elasticsearch/clients/javascript/connecting#client-usage for more details | [src/client.ts:169](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L169) |
| `cloud.id` | `string` | `undefined` | - | [src/client.ts:170](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L170) |
| <a id="disableprototypepoisoningprotection"></a> `disablePrototypePoisoningProtection?` | `boolean` \| `"proto"` \| `"constructor"` | `true` | - | [src/client.ts:174](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L174) |
| <a id="cafingerprint"></a> `caFingerprint?` | `string` | `null` | - | [src/client.ts:177](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L177) |
| <a id="maxresponsesize"></a> `maxResponseSize?` | `number` | `null` | - | [src/client.ts:180](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L180) |
| <a id="maxcompressedresponsesize"></a> `maxCompressedResponseSize?` | `number` | `null` | - | [src/client.ts:183](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L183) |
| <a id="redaction"></a> `redaction?` | `RedactionOptions` | `Configuration that will replace known sources of sensitive data` | **Remarks** Read https://www.elastic.co/docs/reference/elasticsearch/clients/javascript/advanced-config#redaction for more details | [src/client.ts:187](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L187) |
| <a id="servermode"></a> `serverMode?` | `"stack"` \| `"serverless"` | `"stack", which sets defaults for a traditional (non-serverless) Elasticsearch instance.` | - | [src/client.ts:190](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L190) |

## Variables

### kAcceptedParams

```ts
const kAcceptedParams: typeof kAcceptedParams;
```

Defined in: [src/client.ts:44](https://github.com/elastic/elasticsearch-js/blob/e81863b8ff20ad0d47e1f566b1e3411ea4b702b5/src/client.ts#L44)
