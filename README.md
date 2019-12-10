# NestJs gRPC Angular

Exapmle of [Nestjs](https://nestjs.com/) microservices with [gRPC](https://grpc.io/) and [Angular](https://angular.io/) SPA. Chat with JWT
 (JWS) authorization
 and message stream.

### installation

* Install [protoc](https://github.com/protocolbuffers/protobuf) and [protoc-gen-grpc-web](https://github.com/grpc/grpc-web/releases) for your OS
* Install [nest cli](https://docs.nestjs.com/cli/overview)
* Install [db-migrate](https://github.com/db-migrate/node-db-migrate)
* Install [grpcurl](https://github.com/fullstorydev/grpcurl)
* Install [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/)
* `npm install` in project root directory

### Usage

Backend:
* `npm run docker:dev:[up|down|restart]` for backend with docker and all microservices. Debug in `docker logs -f
 [auth|chat|user]`
* `docker logs [auth|chat|user]` or use plugins for docker in your IDE
* `nest start [--debug --watch] [auth|chat|user]` for start without docker
* `nest build [auth|chat|user]` for build dist
* `db-migrate [up|down|reset|create|db] [[dbname/]migrationName|all] [options]`
* For example `db-migrate create -e user --sql-file -m apps/user/src/services/dal/db/migrations`

Frontend:
* `cd frontend && npm run start`
* `npm run build --prod`

If need regenerate grpc use:
* `npm run build:grpc:back` for backend
* `npm run build:grpc:front` for frontend
* `npm run build:grpc` for all
