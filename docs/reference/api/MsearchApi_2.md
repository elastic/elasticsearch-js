```typescript
default function MsearchApi<TDocument = unknown, TAggregations = Record<[AggregateName](./AggregateName.md), [AggregationsAggregate](./AggregationsAggregate.md)>>(this: [That](./That.md), params: [MsearchRequest](./MsearchRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[MsearchResponse](./MsearchResponse.md)<TDocument, TAggregations>, unknown>>;
```
