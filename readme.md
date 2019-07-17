# SAR-SMS

SAR-SMS is a project that leverages the [Serverless](https://serverless.com/) framework and AWS to facilitate communication between lost or injured persons, and responding SAR personell.

## Services

The project is split into three services.

- [conversation-service](#conversation-service)
- [sms-service](#sms-service)
- [client](#client)

## Conversation Service

The conversation service is located under `conversation-service`. It is responsible for keeping track of a conversation with a particular recipient. It provides CRUD endpoints for a conversation, as well as endpoints for sending a new SMS in a given conversation.


## SMS Service

The SMS Service is located under `sms-service`. It is responsible for sending messages to Twilio and recieving messages from Twilio. This is where the actual outbound and inbound sms are handled.

## Client

The client is located under `client`. It is currently a React application. It will likely be deprecated in favor of allowing control of SAR SMS completely via SMS.

