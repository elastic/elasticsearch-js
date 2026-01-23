# NodesRequestCounts

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `GetBlobProperties?` | `long` | Number of Get Blob Properties requests (Azure) |
| `GetBlob?` | `long` | Number of Get Blob requests (Azure) |
| `ListBlobs?` | `long` | Number of List Blobs requests (Azure) |
| `PutBlob?` | `long` | Number of Put Blob requests (Azure) |
| `PutBlock?` | `long` | Number of Put Block (Azure) |
| `PutBlockList?` | `long` | Number of Put Block List requests |
| `GetObject?` | `long` | Number of get object requests (GCP, S3) |
| `ListObjects?` | `long` | Number of list objects requests (GCP, S3) |
| `InsertObject?` | `long` | Number of insert object requests, including simple, multipart and resumable uploads. Resumable uploads
can perform multiple http requests to insert a single object but they are considered as a single request
since they are billed as an individual operation. (GCP) |
| `PutObject?` | `long` | Number of PutObject requests (S3) |
| `PutMultipartObject?` | `long` | Number of Multipart requests, including CreateMultipartUpload, UploadPart and CompleteMultipartUpload requests (S3) |

## See Also

- [All Types](./)
- [API Methods](../index.md)
