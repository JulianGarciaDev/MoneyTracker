CREATE TABLE IF NOT EXISTS Categories (
  id            INTEGER   PRIMARY KEY   AUTOINCREMENT,
  uuid          TEXT      NOT NULL      UNIQUE,
  name          TEXT      NOT NULL      COLLATE NOCASE,
  icon          TEXT      NOT NULL,
  visible       INTEGER   NOT NULL      DEFAULT 1,
  enable        INTEGER   NOT NULL      DEFAULT 1,
  parent_uuid   TEXT      NOT NULL      DEFAULT '',
  created_at    DATETIME  NOT NULL      DEFAULT CURRENT_TIMESTAMP,
  modified_at   DATETIME  NOT NULL      DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Accounts (
  id            INTEGER   PRIMARY KEY   AUTOINCREMENT,
  uuid          TEXT      NOT NULL      UNIQUE,
  name          TEXT      NOT NULL      COLLATE NOCASE,
  icon          TEXT      NOT NULL,
  type          TEXT      NOT NULL,
  currency      TEXT      NOT NULL,
  visible       INTEGER   NOT NULL      DEFAULT 1,
  enable        INTEGER   NOT NULL      DEFAULT 1,
  created_at    DATETIME  NOT NULL      DEFAULT CURRENT_TIMESTAMP,
  modified_at   DATETIME  NOT NULL      DEFAULT CURRENT_TIMESTAMP
);