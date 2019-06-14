# SAR-SMS

---

## About

SAR-SMS is a project that leverages the [Serverless](https://serverless.com/) framework and AWS to facilitate communication between lost or injured persons, and responding SAR personell.

The project is split into three services.

- `conversation-service`
  - Creates and maintains a conversation with a subject.
  - Provides an endpoint to send new messages to a subject.
  - Provides endpoints to view conversation details.
- `sms-service`
  - Sends SMS via Twilio
  - Recieves SMS responses via Twilio (and funnels them to the conversation service)
- `client`
  - The UI for the application

---

## conversation-service

The conversation-service is built using [Typescript](https://www.typescriptlang.org/) and deployed via [Serverless](https://serverless.com/). To get started open a command prompt in the `conversation-service` directory and install dependencies using `npm install`.

### Commands

- `npm run build` - Builds the project using the webpack Typescript compiler
- `npm run test` - TODO
- `sls deploy` - Uses Serverless to deploy the project to AWS (creates resources)
- `sls deploy -f {functionName}` - Use Serverless to deploy a single function to AWS

---

## sms-service

The sms-service is built using ES6 and deployed via [Serverless](https://serverless.com/). To get started open a command prompt in the `sms-service` directory and install dependencies using `npm install`. The SMS service is intended to be rewritten in Typescript.

### Commands

- `npm run test` - TODO
- `sls deploy` - Uses Serverless to deploy the project to AWS (creates resources)
  - Serverless will compile the project with webpack before deploying
- `sls deploy -f {functionName}` - Use Serverless to deploy a single function to AWS
  - Serverless will compile the single function with webpack before deploying

---

## client

TODO

---

## Architecture

### Overview

The architecture of sar-sms is event driven. This allows for a total decoupling of the business processes. Instead of invoking functions manually we trigger events. This also allows for centralized error handling as we can trigger an error from anywhere in the process and have a single point where that error is handled. sar-sms is written in Typescript so we can leverage OOP and use modern practices such as IOC to manage our dependencies.

### Types

- `EventBinding` - Binds an event name to an `EventListener`.
- `EventHandler` - Exposes a single `handle` method. `handle` takes a payload of `any` type, and returns `void`.
- `EventManager` - Exposes a method named `wireEvents` that takes an array of `EventBinding`'s and wires those events into an `EventEmitter`.

### Lambda entrypoints

Each Lambda exposes a single entry point function named `handle`. `handle` has the following responsibilities

- Create an `EventEmitter`
- Create a collection of `EventBinding`'s
- Create an `EventManager`
- Wire all the events
- Initiate the first event in the pipeline

### `EventBinding`'s `EventHandler`'s and the `EventManager`
Javascript's EventEmitter only allows you to register a function as the handler for a given event. 
However we want to use OOP with our handlers so we can take advantage of modern patterns like IOC. That means that we need an intermediate layer. 
That is where the `EventHandler` and `EventManager` come into play. 
The `EventHandler` is an interface that is used to describe an event handler from an OOP perspective. The `EventManager` class will take a collection of `EventBindings` (which represent an event name and its corresponding handler) and bind the handle methods with the event name. Since an `EventHandler` is a class that means we can do things like inject the dependencies that our handle function will need to operate. This allows us to elegantly bridge the gap between OOP practices and Javascripts functional core.

### Samples
