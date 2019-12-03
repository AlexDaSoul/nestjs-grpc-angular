create extension if not exists "uuid-ossp";

create table if not exists api_message (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    author JSONB NOT NULL,
    message VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT now() NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT now() NOT NULL,
    CONSTRAINT "PK_MESSAGES"
        PRIMARY KEY (id)
);

create index if not exists IDX_AUTOR_ID
    on api_message using GIN ((author -> 'id'));
