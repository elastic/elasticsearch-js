# Elasticsearch proxy example

This folder contains an example of how you could build a lightweight proxy
that you can put between your frontend code and Elasticsearch if you don't
have a more sophisticated backend in place yet.

> **IMPORTANT:** this is not a production ready code & purely for demonstration purposes,
> we make no guarantees on it's security and stability

This project is designed to be deployed on [Vercel](https://vercel.com/), a cloud platform
for static sites and Serverless Functions. You can use also other functions providers,
such as [Google Cloud functions](https://cloud.google.com/functions).

## Project structure

The project already comes with three endpoints:

- `/api/search`: run a search, it requires the `'read'` permissions
- `/api/autocomplete`: run a autocomplete suggestion, it requires the `'read'` permissions
- `/api/index`:  index or updates a document, it requires the `'write'` permissions
- `/api/delete`  delete a document, it requires the `'write'` permissions

Inside `utils/authorize.js` you can find the authorization logic for the endpoints.
In each endpoint you should configure the `INDEX` variable.

## How to use

First of all, create an account on Vercel and create a deployment on Elastic Cloud, if you
don't have an account on Elastic Cloud, you can create one with a free 14-day trial
of the [Elasticsearch Service](https://www.elastic.co/elasticsearch/service).

### Configure Elasticsearch

Once you have created a deployment on Elastic Cloud copy the generated Cloud Id and the credentials.
Then open `utils/prepare-elasticsearch.js` and fill your credentials. The script will generate
an [Api Key](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-create-api-key.html)
that you will use for authenticating your request. Based on the configuration of the Api Key, you will be able
to perform different operation on the specified indices or index pattern.

### Configure Vercel

Install the [Vercel CLI](https://vercel.com/docs/cli) to bootstrap the project,
or read the [quickstart](https://vercel.com/docs) documentation.

If you are using the CLI, bootstrap the project by running `vercel`. You can test the project locally
with `vercel dev`, and deploy it with `vercel deploy`.
You should configure the `ELASTIC_CLOUD_ID` [environment varible](https://vercel.com/docs/environment-variables) as well.
The Api Key will be passed from the frontend app via a `Authorization` header as `Bearer` token and will
be used to authorize the API calls to the endpoints as well.
Additional configuration, such as CORS, can be added to [`vercel.json`](https://vercel.com/docs/configuration).

## Authentication

If you are using Elasticsearch only for search purposes, such as a search box, you can create
an Api Key with `read` permissions and store it in your frontend app. Then you can send it
via `Authorization` header to the proxy and run your searches.

If you need to ingest data as well, it's more secure to have a strong authentication in your application.
For such case, you could use an external authentication service, such as [Auth0](https://auth0.com/)
or [Magic Link](https://magic.link/). Then you can create a different Api Key with `read` and `write`
permissions for authenticated users, that will not be stored in the frontend app.

## License

This software is licensed under the [Apache 2 license](../LICENSE).