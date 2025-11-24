--
-- PostgreSQL database dump
--

\restrict 9cB8OtiyPrWzQQnZ1x90GNW8WaowzlYdYOqQUVDI3ZuTDtt2oWzAgGYCNkyfUDS

-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

-- Started on 2025-11-23 22:40:09

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 37 (class 2615 OID 16494)
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- TOC entry 23 (class 2615 OID 16388)
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- TOC entry 35 (class 2615 OID 16624)
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- TOC entry 34 (class 2615 OID 16613)
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- TOC entry 12 (class 2615 OID 16386)
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- TOC entry 13 (class 2615 OID 16605)
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- TOC entry 38 (class 2615 OID 16542)
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- TOC entry 32 (class 2615 OID 16653)
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- TOC entry 6 (class 3079 OID 16689)
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- TOC entry 4490 (class 0 OID 0)
-- Dependencies: 6
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- TOC entry 2 (class 3079 OID 16389)
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- TOC entry 4491 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- TOC entry 4 (class 3079 OID 16443)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- TOC entry 4492 (class 0 OID 0)
-- Dependencies: 4
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- TOC entry 5 (class 3079 OID 16654)
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- TOC entry 4493 (class 0 OID 0)
-- Dependencies: 5
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- TOC entry 3 (class 3079 OID 16432)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- TOC entry 4494 (class 0 OID 0)
-- Dependencies: 3
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 1219 (class 1247 OID 16784)
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- TOC entry 1243 (class 1247 OID 16925)
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- TOC entry 1216 (class 1247 OID 16778)
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- TOC entry 1213 (class 1247 OID 16773)
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- TOC entry 1261 (class 1247 OID 17028)
-- Name: oauth_authorization_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_authorization_status AS ENUM (
    'pending',
    'approved',
    'denied',
    'expired'
);


ALTER TYPE auth.oauth_authorization_status OWNER TO supabase_auth_admin;

--
-- TOC entry 1273 (class 1247 OID 17101)
-- Name: oauth_client_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_client_type AS ENUM (
    'public',
    'confidential'
);


ALTER TYPE auth.oauth_client_type OWNER TO supabase_auth_admin;

--
-- TOC entry 1255 (class 1247 OID 17006)
-- Name: oauth_registration_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_registration_type AS ENUM (
    'dynamic',
    'manual'
);


ALTER TYPE auth.oauth_registration_type OWNER TO supabase_auth_admin;

--
-- TOC entry 1264 (class 1247 OID 17038)
-- Name: oauth_response_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_response_type AS ENUM (
    'code'
);


ALTER TYPE auth.oauth_response_type OWNER TO supabase_auth_admin;

--
-- TOC entry 1249 (class 1247 OID 16967)
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- TOC entry 1303 (class 1247 OID 17312)
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- TOC entry 1288 (class 1247 OID 17231)
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- TOC entry 1291 (class 1247 OID 17245)
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- TOC entry 1309 (class 1247 OID 17354)
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- TOC entry 1306 (class 1247 OID 17325)
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- TOC entry 1297 (class 1247 OID 17270)
-- Name: buckettype; Type: TYPE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TYPE storage.buckettype AS ENUM (
    'STANDARD',
    'ANALYTICS',
    'VECTOR'
);


ALTER TYPE storage.buckettype OWNER TO supabase_storage_admin;

--
-- TOC entry 464 (class 1255 OID 16540)
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- TOC entry 4495 (class 0 OID 0)
-- Dependencies: 464
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- TOC entry 475 (class 1255 OID 16755)
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- TOC entry 428 (class 1255 OID 16539)
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- TOC entry 4498 (class 0 OID 0)
-- Dependencies: 428
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- TOC entry 442 (class 1255 OID 16538)
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- TOC entry 4500 (class 0 OID 0)
-- Dependencies: 442
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- TOC entry 506 (class 1255 OID 16597)
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO supabase_admin;

--
-- TOC entry 4516 (class 0 OID 0)
-- Dependencies: 506
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- TOC entry 489 (class 1255 OID 16618)
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- TOC entry 4518 (class 0 OID 0)
-- Dependencies: 489
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- TOC entry 458 (class 1255 OID 16599)
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO supabase_admin;

--
-- TOC entry 4520 (class 0 OID 0)
-- Dependencies: 458
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- TOC entry 424 (class 1255 OID 16609)
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- TOC entry 516 (class 1255 OID 16610)
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- TOC entry 433 (class 1255 OID 16620)
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- TOC entry 4549 (class 0 OID 0)
-- Dependencies: 433
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- TOC entry 466 (class 1255 OID 16387)
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: supabase_admin
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $_$
begin
    raise debug 'PgBouncer auth request: %', p_usename;

    return query
    select 
        rolname::text, 
        case when rolvaliduntil < now() 
            then null 
            else rolpassword::text 
        end 
    from pg_authid 
    where rolname=$1 and rolcanlogin;
end;
$_$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO supabase_admin;

--
-- TOC entry 548 (class 1255 OID 25396)
-- Name: accept_order(bigint, uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.accept_order(target_order_id bigint, driver_id uuid) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
  UPDATE "order"
  SET 
    deliverystatus_id = 2, -- Accepted
    courier_id = driver_id,
    accepted_at = NOW() -- <--- STARTS THE TIMER
  WHERE order_id = target_order_id;
END;
$$;


ALTER FUNCTION public.accept_order(target_order_id bigint, driver_id uuid) OWNER TO postgres;

--
-- TOC entry 485 (class 1255 OID 25418)
-- Name: cancel_order(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.cancel_order(target_order_id bigint) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
  current_status int;
BEGIN
  -- Check current status
  SELECT deliverystatus_id INTO current_status FROM "order" WHERE order_id = target_order_id;
  
  -- If driver already accepted (Status > 1), prevent cancel (or charge fee)
  IF current_status > 1 THEN
    RAISE EXCEPTION 'Cannot cancel. Driver already accepted.';
  END IF;

  -- Update to Cancelled (ID 5)
  UPDATE "order" 
  SET deliverystatus_id = 5 
  WHERE order_id = target_order_id;
END;
$$;


ALTER FUNCTION public.cancel_order(target_order_id bigint) OWNER TO postgres;

--
-- TOC entry 467 (class 1255 OID 25419)
-- Name: expire_old_pending_orders(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.expire_old_pending_orders() RETURNS void
    LANGUAGE sql
    AS $$
  UPDATE "order"
  SET deliverystatus_id = 6 -- Timeout Status
  WHERE deliverystatus_id = 1 -- Still Pending
  AND created_at < (NOW() - INTERVAL '5 minutes'); -- Older than 5 mins
$$;


ALTER FUNCTION public.expire_old_pending_orders() OWNER TO postgres;

--
-- TOC entry 540 (class 1255 OID 22577)
-- Name: get_couriers_with_filters(text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_couriers_with_filters(status_filter text, search_filter text) RETURNS TABLE(user_id uuid, full_name text, vehicle_name text, status_name text)
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.user_id,
    -- Get Name from service_user (or use 'No Name' if profile incomplete)
    COALESCE(su.full_name, 'No Name')::text,
    -- Get Vehicle Name
    COALESCE(tv.vehicle_name, 'No Vehicle')::text,
    -- Get Status from COURIER table (Fixed!)
    COALESCE(us.status_name, 'Pending')::text
  FROM courier c
  LEFT JOIN service_user su ON c.user_id = su.user_id
  -- 👇 THIS WAS THE FIX: Join on c.user_status, NOT su.userstatus_id
  LEFT JOIN user_status us ON c.user_status = us.userstatus_id 
  LEFT JOIN type_vehicle tv ON c.vehicle_id = tv.vehicle_id
  WHERE
    (
      status_filter = 'All' 
      OR 
      COALESCE(us.status_name, 'Pending') = status_filter
    )
    AND
    (
      search_filter = '' 
      OR 
      COALESCE(su.full_name, '') ILIKE '%' || search_filter || '%'
    )
  ORDER BY c.created_at DESC; -- Optional: Shows newest registrations first
END;
$$;


ALTER FUNCTION public.get_couriers_with_filters(status_filter text, search_filter text) OWNER TO postgres;

--
-- TOC entry 522 (class 1255 OID 25355)
-- Name: get_customer_orders(text, text, integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_customer_orders(status_filter text DEFAULT 'All'::text, search_query text DEFAULT ''::text, page_number integer DEFAULT 0, page_size integer DEFAULT 10) RETURNS TABLE(order_id bigint, pickup_address text, dropoff_address text, total_fare numeric, created_at text, status_name text, vehicle_name text, goods_details text, scheduled_time text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o.order_id,
    o.pickup_address,
    o.dropoff_address,
    o.total_fare::numeric,
    o.created_at::text,
    ds.status_name::text,
    tv.vehicle_name::text,
    o.other_details::text, 
    o.scheduled_pickup_time::text
  FROM "order" o
  LEFT JOIN delivery_status ds ON o.deliverystatus_id = ds.deliverstatus_id
  LEFT JOIN type_vehicle tv ON o.vehicle_id = tv.vehicle_id
  WHERE 
    o.user_id = auth.uid()
    AND (status_filter = 'All' OR ds.status_name ILIKE status_filter)
    AND (
      search_query = '' 
      OR o.pickup_address ILIKE '%' || search_query || '%'
      OR o.dropoff_address ILIKE '%' || search_query || '%'
      OR o.other_details ILIKE '%' || search_query || '%'
      OR o.order_id::text ILIKE '%' || search_query || '%'
    )
  ORDER BY o.created_at DESC
  LIMIT page_size 
  OFFSET (page_number * page_size); -- Logic for pagination
END;
$$;


ALTER FUNCTION public.get_customer_orders(status_filter text, search_query text, page_number integer, page_size integer) OWNER TO postgres;

--
-- TOC entry 482 (class 1255 OID 22530)
-- Name: get_customers_with_filters(text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_customers_with_filters(status_filter text, search_filter text) RETURNS TABLE(user_id uuid, full_name text, phone_number text, status_name text)
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  RETURN QUERY
  SELECT
    su.user_id,
    COALESCE(su.full_name, 'Unknown Name')::text,
    COALESCE(su.phone_number::text, 'No Contact')::text, 
    COALESCE(us.status_name, 'Pending')::text
  FROM service_user su
  -- Join Status
  LEFT JOIN user_status us ON su.userstatus_id = us.userstatus_id
  WHERE
    (
      status_filter = 'All' 
      OR 
      COALESCE(us.status_name, 'Pending') = status_filter
    )
    AND
    (
      search_filter = '' 
      OR 
      COALESCE(su.full_name, '') ILIKE '%' || search_filter || '%'
    );
END;
$$;


ALTER FUNCTION public.get_customers_with_filters(status_filter text, search_filter text) OWNER TO postgres;

--
-- TOC entry 532 (class 1255 OID 22732)
-- Name: get_profile_details(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_profile_details(target_id uuid) RETURNS TABLE(user_id uuid, full_name text, email_address text, phone_number text, address text, status_name text, is_courier boolean, vehicle_id bigint, vehicle_brand text, vehicle_color text, plate_number text, otherdetails_vehicle text, license_front text, license_back text, vehicle_type_name text)
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  RETURN QUERY
  SELECT
    su.user_id,
    COALESCE(su.full_name, 'Unknown Name')::text,
    COALESCE(su.email_address, 'No Email')::text,
    COALESCE(su.phone_number::text, 'No Phone')::text,
    COALESCE(su.address, 'No Address')::text,
    COALESCE(us.status_name, 'Pending')::text,
    -- Check if this user exists in the courier table
    (c.user_id IS NOT NULL) as is_courier,
    c.vehicle_id,
    c.vehicle_brand::text,
    c.vehicle_color::text,
    c.plate_number::text,
    c.otherdetails_vehicle::text,
    c.license_front::text,
    c.license_back::text, -- ADDED THIS LINE
    COALESCE(tv.vehicle_name, 'Unknown')::text
  FROM service_user su
  LEFT JOIN user_status us ON su.userstatus_id = us.userstatus_id
  LEFT JOIN courier c ON su.user_id = c.user_id
  LEFT JOIN type_vehicle tv ON c.vehicle_id = tv.vehicle_id
  WHERE su.user_id = target_id;
END;
$$;


ALTER FUNCTION public.get_profile_details(target_id uuid) OWNER TO postgres;

--
-- TOC entry 447 (class 1255 OID 17347)
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_;

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- TOC entry 550 (class 1255 OID 17431)
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_admin;

--
-- TOC entry 481 (class 1255 OID 17363)
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- TOC entry 438 (class 1255 OID 17309)
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    declare
      res jsonb;
    begin
      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;
      return res;
    end
    $$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- TOC entry 469 (class 1255 OID 17304)
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- TOC entry 503 (class 1255 OID 17355)
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- TOC entry 531 (class 1255 OID 17370)
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- TOC entry 523 (class 1255 OID 17303)
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- TOC entry 445 (class 1255 OID 17430)
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  generated_id uuid;
  final_payload jsonb;
BEGIN
  BEGIN
    -- Generate a new UUID for the id
    generated_id := gen_random_uuid();

    -- Check if payload has an 'id' key, if not, add the generated UUID
    IF payload ? 'id' THEN
      final_payload := payload;
    ELSE
      final_payload := jsonb_set(payload, '{id}', to_jsonb(generated_id));
    END IF;

    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (id, payload, event, topic, private, extension)
    VALUES (generated_id, final_payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      RAISE WARNING 'ErrorSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- TOC entry 492 (class 1255 OID 17301)
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- TOC entry 480 (class 1255 OID 17336)
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- TOC entry 476 (class 1255 OID 17423)
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- TOC entry 494 (class 1255 OID 17219)
-- Name: add_prefixes(text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.add_prefixes(_bucket_id text, _name text) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    prefixes text[];
BEGIN
    prefixes := "storage"."get_prefixes"("_name");

    IF array_length(prefixes, 1) > 0 THEN
        INSERT INTO storage.prefixes (name, bucket_id)
        SELECT UNNEST(prefixes) as name, "_bucket_id" ON CONFLICT DO NOTHING;
    END IF;
END;
$$;


ALTER FUNCTION storage.add_prefixes(_bucket_id text, _name text) OWNER TO supabase_storage_admin;

--
-- TOC entry 542 (class 1255 OID 17145)
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- TOC entry 536 (class 1255 OID 17289)
-- Name: delete_leaf_prefixes(text[], text[]); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.delete_leaf_prefixes(bucket_ids text[], names text[]) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_rows_deleted integer;
BEGIN
    LOOP
        WITH candidates AS (
            SELECT DISTINCT
                t.bucket_id,
                unnest(storage.get_prefixes(t.name)) AS name
            FROM unnest(bucket_ids, names) AS t(bucket_id, name)
        ),
        uniq AS (
             SELECT
                 bucket_id,
                 name,
                 storage.get_level(name) AS level
             FROM candidates
             WHERE name <> ''
             GROUP BY bucket_id, name
        ),
        leaf AS (
             SELECT
                 p.bucket_id,
                 p.name,
                 p.level
             FROM storage.prefixes AS p
                  JOIN uniq AS u
                       ON u.bucket_id = p.bucket_id
                           AND u.name = p.name
                           AND u.level = p.level
             WHERE NOT EXISTS (
                 SELECT 1
                 FROM storage.objects AS o
                 WHERE o.bucket_id = p.bucket_id
                   AND o.level = p.level + 1
                   AND o.name COLLATE "C" LIKE p.name || '/%'
             )
             AND NOT EXISTS (
                 SELECT 1
                 FROM storage.prefixes AS c
                 WHERE c.bucket_id = p.bucket_id
                   AND c.level = p.level + 1
                   AND c.name COLLATE "C" LIKE p.name || '/%'
             )
        )
        DELETE
        FROM storage.prefixes AS p
            USING leaf AS l
        WHERE p.bucket_id = l.bucket_id
          AND p.name = l.name
          AND p.level = l.level;

        GET DIAGNOSTICS v_rows_deleted = ROW_COUNT;
        EXIT WHEN v_rows_deleted = 0;
    END LOOP;
END;
$$;


ALTER FUNCTION storage.delete_leaf_prefixes(bucket_ids text[], names text[]) OWNER TO supabase_storage_admin;

--
-- TOC entry 434 (class 1255 OID 17220)
-- Name: delete_prefix(text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.delete_prefix(_bucket_id text, _name text) RETURNS boolean
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
    -- Check if we can delete the prefix
    IF EXISTS(
        SELECT FROM "storage"."prefixes"
        WHERE "prefixes"."bucket_id" = "_bucket_id"
          AND level = "storage"."get_level"("_name") + 1
          AND "prefixes"."name" COLLATE "C" LIKE "_name" || '/%'
        LIMIT 1
    )
    OR EXISTS(
        SELECT FROM "storage"."objects"
        WHERE "objects"."bucket_id" = "_bucket_id"
          AND "storage"."get_level"("objects"."name") = "storage"."get_level"("_name") + 1
          AND "objects"."name" COLLATE "C" LIKE "_name" || '/%'
        LIMIT 1
    ) THEN
    -- There are sub-objects, skip deletion
    RETURN false;
    ELSE
        DELETE FROM "storage"."prefixes"
        WHERE "prefixes"."bucket_id" = "_bucket_id"
          AND level = "storage"."get_level"("_name")
          AND "prefixes"."name" = "_name";
        RETURN true;
    END IF;
END;
$$;


ALTER FUNCTION storage.delete_prefix(_bucket_id text, _name text) OWNER TO supabase_storage_admin;

--
-- TOC entry 493 (class 1255 OID 17223)
-- Name: delete_prefix_hierarchy_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.delete_prefix_hierarchy_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    prefix text;
BEGIN
    prefix := "storage"."get_prefix"(OLD."name");

    IF coalesce(prefix, '') != '' THEN
        PERFORM "storage"."delete_prefix"(OLD."bucket_id", prefix);
    END IF;

    RETURN OLD;
END;
$$;


ALTER FUNCTION storage.delete_prefix_hierarchy_trigger() OWNER TO supabase_storage_admin;

--
-- TOC entry 484 (class 1255 OID 17267)
-- Name: enforce_bucket_name_length(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.enforce_bucket_name_length() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
    if length(new.name) > 100 then
        raise exception 'bucket name "%" is too long (% characters). Max is 100.', new.name, length(new.name);
    end if;
    return new;
end;
$$;


ALTER FUNCTION storage.enforce_bucket_name_length() OWNER TO supabase_storage_admin;

--
-- TOC entry 472 (class 1255 OID 17119)
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
    _filename text;
BEGIN
    SELECT string_to_array(name, '/') INTO _parts;
    SELECT _parts[array_length(_parts,1)] INTO _filename;
    RETURN reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- TOC entry 477 (class 1255 OID 17118)
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- TOC entry 544 (class 1255 OID 17117)
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
BEGIN
    -- Split on "/" to get path segments
    SELECT string_to_array(name, '/') INTO _parts;
    -- Return everything except the last segment
    RETURN _parts[1 : array_length(_parts,1) - 1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- TOC entry 427 (class 1255 OID 17201)
-- Name: get_level(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_level(name text) RETURNS integer
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
SELECT array_length(string_to_array("name", '/'), 1);
$$;


ALTER FUNCTION storage.get_level(name text) OWNER TO supabase_storage_admin;

--
-- TOC entry 479 (class 1255 OID 17217)
-- Name: get_prefix(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_prefix(name text) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $_$
SELECT
    CASE WHEN strpos("name", '/') > 0 THEN
             regexp_replace("name", '[\/]{1}[^\/]+\/?$', '')
         ELSE
             ''
        END;
$_$;


ALTER FUNCTION storage.get_prefix(name text) OWNER TO supabase_storage_admin;

--
-- TOC entry 473 (class 1255 OID 17218)
-- Name: get_prefixes(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_prefixes(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $$
DECLARE
    parts text[];
    prefixes text[];
    prefix text;
BEGIN
    -- Split the name into parts by '/'
    parts := string_to_array("name", '/');
    prefixes := '{}';

    -- Construct the prefixes, stopping one level below the last part
    FOR i IN 1..array_length(parts, 1) - 1 LOOP
            prefix := array_to_string(parts[1:i], '/');
            prefixes := array_append(prefixes, prefix);
    END LOOP;

    RETURN prefixes;
END;
$$;


ALTER FUNCTION storage.get_prefixes(name text) OWNER TO supabase_storage_admin;

--
-- TOC entry 527 (class 1255 OID 17265)
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::bigint) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- TOC entry 468 (class 1255 OID 17184)
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- TOC entry 497 (class 1255 OID 17147)
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(name COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))
                    ELSE
                        name
                END AS name, id, metadata, updated_at
            FROM
                storage.objects
            WHERE
                bucket_id = $5 AND
                name ILIKE $1 || ''%'' AND
                CASE
                    WHEN $6 != '''' THEN
                    name COLLATE "C" > $6
                ELSE true END
                AND CASE
                    WHEN $4 != '''' THEN
                        CASE
                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                name COLLATE "C" > $4
                            END
                    ELSE
                        true
                END
            ORDER BY
                name COLLATE "C" ASC) as e order by name COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) OWNER TO supabase_storage_admin;

--
-- TOC entry 546 (class 1255 OID 17288)
-- Name: lock_top_prefixes(text[], text[]); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.lock_top_prefixes(bucket_ids text[], names text[]) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_bucket text;
    v_top text;
BEGIN
    FOR v_bucket, v_top IN
        SELECT DISTINCT t.bucket_id,
            split_part(t.name, '/', 1) AS top
        FROM unnest(bucket_ids, names) AS t(bucket_id, name)
        WHERE t.name <> ''
        ORDER BY 1, 2
        LOOP
            PERFORM pg_advisory_xact_lock(hashtextextended(v_bucket || '/' || v_top, 0));
        END LOOP;
END;
$$;


ALTER FUNCTION storage.lock_top_prefixes(bucket_ids text[], names text[]) OWNER TO supabase_storage_admin;

--
-- TOC entry 486 (class 1255 OID 17290)
-- Name: objects_delete_cleanup(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_delete_cleanup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_bucket_ids text[];
    v_names      text[];
BEGIN
    IF current_setting('storage.gc.prefixes', true) = '1' THEN
        RETURN NULL;
    END IF;

    PERFORM set_config('storage.gc.prefixes', '1', true);

    SELECT COALESCE(array_agg(d.bucket_id), '{}'),
           COALESCE(array_agg(d.name), '{}')
    INTO v_bucket_ids, v_names
    FROM deleted AS d
    WHERE d.name <> '';

    PERFORM storage.lock_top_prefixes(v_bucket_ids, v_names);
    PERFORM storage.delete_leaf_prefixes(v_bucket_ids, v_names);

    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.objects_delete_cleanup() OWNER TO supabase_storage_admin;

--
-- TOC entry 517 (class 1255 OID 17222)
-- Name: objects_insert_prefix_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_insert_prefix_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    NEW.level := "storage"."get_level"(NEW."name");

    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_insert_prefix_trigger() OWNER TO supabase_storage_admin;

--
-- TOC entry 487 (class 1255 OID 17291)
-- Name: objects_update_cleanup(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_update_cleanup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    -- NEW - OLD (destinations to create prefixes for)
    v_add_bucket_ids text[];
    v_add_names      text[];

    -- OLD - NEW (sources to prune)
    v_src_bucket_ids text[];
    v_src_names      text[];
BEGIN
    IF TG_OP <> 'UPDATE' THEN
        RETURN NULL;
    END IF;

    -- 1) Compute NEW−OLD (added paths) and OLD−NEW (moved-away paths)
    WITH added AS (
        SELECT n.bucket_id, n.name
        FROM new_rows n
        WHERE n.name <> '' AND position('/' in n.name) > 0
        EXCEPT
        SELECT o.bucket_id, o.name FROM old_rows o WHERE o.name <> ''
    ),
    moved AS (
         SELECT o.bucket_id, o.name
         FROM old_rows o
         WHERE o.name <> ''
         EXCEPT
         SELECT n.bucket_id, n.name FROM new_rows n WHERE n.name <> ''
    )
    SELECT
        -- arrays for ADDED (dest) in stable order
        COALESCE( (SELECT array_agg(a.bucket_id ORDER BY a.bucket_id, a.name) FROM added a), '{}' ),
        COALESCE( (SELECT array_agg(a.name      ORDER BY a.bucket_id, a.name) FROM added a), '{}' ),
        -- arrays for MOVED (src) in stable order
        COALESCE( (SELECT array_agg(m.bucket_id ORDER BY m.bucket_id, m.name) FROM moved m), '{}' ),
        COALESCE( (SELECT array_agg(m.name      ORDER BY m.bucket_id, m.name) FROM moved m), '{}' )
    INTO v_add_bucket_ids, v_add_names, v_src_bucket_ids, v_src_names;

    -- Nothing to do?
    IF (array_length(v_add_bucket_ids, 1) IS NULL) AND (array_length(v_src_bucket_ids, 1) IS NULL) THEN
        RETURN NULL;
    END IF;

    -- 2) Take per-(bucket, top) locks: ALL prefixes in consistent global order to prevent deadlocks
    DECLARE
        v_all_bucket_ids text[];
        v_all_names text[];
    BEGIN
        -- Combine source and destination arrays for consistent lock ordering
        v_all_bucket_ids := COALESCE(v_src_bucket_ids, '{}') || COALESCE(v_add_bucket_ids, '{}');
        v_all_names := COALESCE(v_src_names, '{}') || COALESCE(v_add_names, '{}');

        -- Single lock call ensures consistent global ordering across all transactions
        IF array_length(v_all_bucket_ids, 1) IS NOT NULL THEN
            PERFORM storage.lock_top_prefixes(v_all_bucket_ids, v_all_names);
        END IF;
    END;

    -- 3) Create destination prefixes (NEW−OLD) BEFORE pruning sources
    IF array_length(v_add_bucket_ids, 1) IS NOT NULL THEN
        WITH candidates AS (
            SELECT DISTINCT t.bucket_id, unnest(storage.get_prefixes(t.name)) AS name
            FROM unnest(v_add_bucket_ids, v_add_names) AS t(bucket_id, name)
            WHERE name <> ''
        )
        INSERT INTO storage.prefixes (bucket_id, name)
        SELECT c.bucket_id, c.name
        FROM candidates c
        ON CONFLICT DO NOTHING;
    END IF;

    -- 4) Prune source prefixes bottom-up for OLD−NEW
    IF array_length(v_src_bucket_ids, 1) IS NOT NULL THEN
        -- re-entrancy guard so DELETE on prefixes won't recurse
        IF current_setting('storage.gc.prefixes', true) <> '1' THEN
            PERFORM set_config('storage.gc.prefixes', '1', true);
        END IF;

        PERFORM storage.delete_leaf_prefixes(v_src_bucket_ids, v_src_names);
    END IF;

    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.objects_update_cleanup() OWNER TO supabase_storage_admin;

--
-- TOC entry 483 (class 1255 OID 17296)
-- Name: objects_update_level_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_update_level_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Ensure this is an update operation and the name has changed
    IF TG_OP = 'UPDATE' AND (NEW."name" <> OLD."name" OR NEW."bucket_id" <> OLD."bucket_id") THEN
        -- Set the new level
        NEW."level" := "storage"."get_level"(NEW."name");
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_update_level_trigger() OWNER TO supabase_storage_admin;

--
-- TOC entry 528 (class 1255 OID 17266)
-- Name: objects_update_prefix_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.objects_update_prefix_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    old_prefixes TEXT[];
BEGIN
    -- Ensure this is an update operation and the name has changed
    IF TG_OP = 'UPDATE' AND (NEW."name" <> OLD."name" OR NEW."bucket_id" <> OLD."bucket_id") THEN
        -- Retrieve old prefixes
        old_prefixes := "storage"."get_prefixes"(OLD."name");

        -- Remove old prefixes that are only used by this object
        WITH all_prefixes as (
            SELECT unnest(old_prefixes) as prefix
        ),
        can_delete_prefixes as (
             SELECT prefix
             FROM all_prefixes
             WHERE NOT EXISTS (
                 SELECT 1 FROM "storage"."objects"
                 WHERE "bucket_id" = OLD."bucket_id"
                   AND "name" <> OLD."name"
                   AND "name" LIKE (prefix || '%')
             )
         )
        DELETE FROM "storage"."prefixes" WHERE name IN (SELECT prefix FROM can_delete_prefixes);

        -- Add new prefixes
        PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    END IF;
    -- Set the new level
    NEW."level" := "storage"."get_level"(NEW."name");

    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.objects_update_prefix_trigger() OWNER TO supabase_storage_admin;

--
-- TOC entry 453 (class 1255 OID 17200)
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- TOC entry 455 (class 1255 OID 17292)
-- Name: prefixes_delete_cleanup(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.prefixes_delete_cleanup() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
    v_bucket_ids text[];
    v_names      text[];
BEGIN
    IF current_setting('storage.gc.prefixes', true) = '1' THEN
        RETURN NULL;
    END IF;

    PERFORM set_config('storage.gc.prefixes', '1', true);

    SELECT COALESCE(array_agg(d.bucket_id), '{}'),
           COALESCE(array_agg(d.name), '{}')
    INTO v_bucket_ids, v_names
    FROM deleted AS d
    WHERE d.name <> '';

    PERFORM storage.lock_top_prefixes(v_bucket_ids, v_names);
    PERFORM storage.delete_leaf_prefixes(v_bucket_ids, v_names);

    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.prefixes_delete_cleanup() OWNER TO supabase_storage_admin;

--
-- TOC entry 501 (class 1255 OID 17221)
-- Name: prefixes_insert_trigger(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.prefixes_insert_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM "storage"."add_prefixes"(NEW."bucket_id", NEW."name");
    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.prefixes_insert_trigger() OWNER TO supabase_storage_admin;

--
-- TOC entry 508 (class 1255 OID 17134)
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql
    AS $$
declare
    can_bypass_rls BOOLEAN;
begin
    SELECT rolbypassrls
    INTO can_bypass_rls
    FROM pg_roles
    WHERE rolname = coalesce(nullif(current_setting('role', true), 'none'), current_user);

    IF can_bypass_rls THEN
        RETURN QUERY SELECT * FROM storage.search_v1_optimised(prefix, bucketname, limits, levels, offsets, search, sortcolumn, sortorder);
    ELSE
        RETURN QUERY SELECT * FROM storage.search_legacy_v1(prefix, bucketname, limits, levels, offsets, search, sortcolumn, sortorder);
    END IF;
end;
$$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- TOC entry 454 (class 1255 OID 17263)
-- Name: search_legacy_v1(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_legacy_v1(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
    v_order_by text;
    v_sort_order text;
begin
    case
        when sortcolumn = 'name' then
            v_order_by = 'name';
        when sortcolumn = 'updated_at' then
            v_order_by = 'updated_at';
        when sortcolumn = 'created_at' then
            v_order_by = 'created_at';
        when sortcolumn = 'last_accessed_at' then
            v_order_by = 'last_accessed_at';
        else
            v_order_by = 'name';
        end case;

    case
        when sortorder = 'asc' then
            v_sort_order = 'asc';
        when sortorder = 'desc' then
            v_sort_order = 'desc';
        else
            v_sort_order = 'asc';
        end case;

    v_order_by = v_order_by || ' ' || v_sort_order;

    return query execute
        'with folders as (
           select path_tokens[$1] as folder
           from storage.objects
             where objects.name ilike $2 || $3 || ''%''
               and bucket_id = $4
               and array_length(objects.path_tokens, 1) <> $1
           group by folder
           order by folder ' || v_sort_order || '
     )
     (select folder as "name",
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search_legacy_v1(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- TOC entry 499 (class 1255 OID 17262)
-- Name: search_v1_optimised(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_v1_optimised(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
    v_order_by text;
    v_sort_order text;
begin
    case
        when sortcolumn = 'name' then
            v_order_by = 'name';
        when sortcolumn = 'updated_at' then
            v_order_by = 'updated_at';
        when sortcolumn = 'created_at' then
            v_order_by = 'created_at';
        when sortcolumn = 'last_accessed_at' then
            v_order_by = 'last_accessed_at';
        else
            v_order_by = 'name';
        end case;

    case
        when sortorder = 'asc' then
            v_sort_order = 'asc';
        when sortorder = 'desc' then
            v_sort_order = 'desc';
        else
            v_sort_order = 'asc';
        end case;

    v_order_by = v_order_by || ' ' || v_sort_order;

    return query execute
        'with folders as (
           select (string_to_array(name, ''/''))[level] as name
           from storage.prefixes
             where lower(prefixes.name) like lower($2 || $3) || ''%''
               and bucket_id = $4
               and level = $1
           order by name ' || v_sort_order || '
     )
     (select name,
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[level] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where lower(objects.name) like lower($2 || $3) || ''%''
       and bucket_id = $4
       and level = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search_v1_optimised(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- TOC entry 446 (class 1255 OID 17287)
-- Name: search_v2(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer DEFAULT 100, levels integer DEFAULT 1, start_after text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text, sort_column text DEFAULT 'name'::text, sort_column_after text DEFAULT ''::text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    sort_col text;
    sort_ord text;
    cursor_op text;
    cursor_expr text;
    sort_expr text;
BEGIN
    -- Validate sort_order
    sort_ord := lower(sort_order);
    IF sort_ord NOT IN ('asc', 'desc') THEN
        sort_ord := 'asc';
    END IF;

    -- Determine cursor comparison operator
    IF sort_ord = 'asc' THEN
        cursor_op := '>';
    ELSE
        cursor_op := '<';
    END IF;
    
    sort_col := lower(sort_column);
    -- Validate sort column  
    IF sort_col IN ('updated_at', 'created_at') THEN
        cursor_expr := format(
            '($5 = '''' OR ROW(date_trunc(''milliseconds'', %I), name COLLATE "C") %s ROW(COALESCE(NULLIF($6, '''')::timestamptz, ''epoch''::timestamptz), $5))',
            sort_col, cursor_op
        );
        sort_expr := format(
            'COALESCE(date_trunc(''milliseconds'', %I), ''epoch''::timestamptz) %s, name COLLATE "C" %s',
            sort_col, sort_ord, sort_ord
        );
    ELSE
        cursor_expr := format('($5 = '''' OR name COLLATE "C" %s $5)', cursor_op);
        sort_expr := format('name COLLATE "C" %s', sort_ord);
    END IF;

    RETURN QUERY EXECUTE format(
        $sql$
        SELECT * FROM (
            (
                SELECT
                    split_part(name, '/', $4) AS key,
                    name,
                    NULL::uuid AS id,
                    updated_at,
                    created_at,
                    NULL::timestamptz AS last_accessed_at,
                    NULL::jsonb AS metadata
                FROM storage.prefixes
                WHERE name COLLATE "C" LIKE $1 || '%%'
                    AND bucket_id = $2
                    AND level = $4
                    AND %s
                ORDER BY %s
                LIMIT $3
            )
            UNION ALL
            (
                SELECT
                    split_part(name, '/', $4) AS key,
                    name,
                    id,
                    updated_at,
                    created_at,
                    last_accessed_at,
                    metadata
                FROM storage.objects
                WHERE name COLLATE "C" LIKE $1 || '%%'
                    AND bucket_id = $2
                    AND level = $4
                    AND %s
                ORDER BY %s
                LIMIT $3
            )
        ) obj
        ORDER BY %s
        LIMIT $3
        $sql$,
        cursor_expr,    -- prefixes WHERE
        sort_expr,      -- prefixes ORDER BY
        cursor_expr,    -- objects WHERE
        sort_expr,      -- objects ORDER BY
        sort_expr       -- final ORDER BY
    )
    USING prefix, bucket_name, limits, levels, start_after, sort_column_after;
END;
$_$;


ALTER FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer, levels integer, start_after text, sort_order text, sort_column text, sort_column_after text) OWNER TO supabase_storage_admin;

--
-- TOC entry 440 (class 1255 OID 17135)
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 352 (class 1259 OID 16525)
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- TOC entry 4585 (class 0 OID 0)
-- Dependencies: 352
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- TOC entry 369 (class 1259 OID 16929)
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text NOT NULL,
    code_challenge_method auth.code_challenge_method NOT NULL,
    code_challenge text NOT NULL,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- TOC entry 4587 (class 0 OID 0)
-- Dependencies: 369
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'stores metadata for pkce logins';


--
-- TOC entry 360 (class 1259 OID 16727)
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- TOC entry 4589 (class 0 OID 0)
-- Dependencies: 360
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- TOC entry 4590 (class 0 OID 0)
-- Dependencies: 360
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- TOC entry 351 (class 1259 OID 16518)
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- TOC entry 4592 (class 0 OID 0)
-- Dependencies: 351
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- TOC entry 364 (class 1259 OID 16816)
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- TOC entry 4594 (class 0 OID 0)
-- Dependencies: 364
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- TOC entry 363 (class 1259 OID 16804)
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- TOC entry 4596 (class 0 OID 0)
-- Dependencies: 363
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- TOC entry 362 (class 1259 OID 16791)
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid,
    last_webauthn_challenge_data jsonb
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- TOC entry 4598 (class 0 OID 0)
-- Dependencies: 362
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- TOC entry 4599 (class 0 OID 0)
-- Dependencies: 362
-- Name: COLUMN mfa_factors.last_webauthn_challenge_data; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.mfa_factors.last_webauthn_challenge_data IS 'Stores the latest WebAuthn challenge data including attestation/assertion for customer verification';


--
-- TOC entry 372 (class 1259 OID 17041)
-- Name: oauth_authorizations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_authorizations (
    id uuid NOT NULL,
    authorization_id text NOT NULL,
    client_id uuid NOT NULL,
    user_id uuid,
    redirect_uri text NOT NULL,
    scope text NOT NULL,
    state text,
    resource text,
    code_challenge text,
    code_challenge_method auth.code_challenge_method,
    response_type auth.oauth_response_type DEFAULT 'code'::auth.oauth_response_type NOT NULL,
    status auth.oauth_authorization_status DEFAULT 'pending'::auth.oauth_authorization_status NOT NULL,
    authorization_code text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone DEFAULT (now() + '00:03:00'::interval) NOT NULL,
    approved_at timestamp with time zone,
    CONSTRAINT oauth_authorizations_authorization_code_length CHECK ((char_length(authorization_code) <= 255)),
    CONSTRAINT oauth_authorizations_code_challenge_length CHECK ((char_length(code_challenge) <= 128)),
    CONSTRAINT oauth_authorizations_expires_at_future CHECK ((expires_at > created_at)),
    CONSTRAINT oauth_authorizations_redirect_uri_length CHECK ((char_length(redirect_uri) <= 2048)),
    CONSTRAINT oauth_authorizations_resource_length CHECK ((char_length(resource) <= 2048)),
    CONSTRAINT oauth_authorizations_scope_length CHECK ((char_length(scope) <= 4096)),
    CONSTRAINT oauth_authorizations_state_length CHECK ((char_length(state) <= 4096))
);


ALTER TABLE auth.oauth_authorizations OWNER TO supabase_auth_admin;

--
-- TOC entry 371 (class 1259 OID 17011)
-- Name: oauth_clients; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_clients (
    id uuid NOT NULL,
    client_secret_hash text,
    registration_type auth.oauth_registration_type NOT NULL,
    redirect_uris text NOT NULL,
    grant_types text NOT NULL,
    client_name text,
    client_uri text,
    logo_uri text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    client_type auth.oauth_client_type DEFAULT 'confidential'::auth.oauth_client_type NOT NULL,
    CONSTRAINT oauth_clients_client_name_length CHECK ((char_length(client_name) <= 1024)),
    CONSTRAINT oauth_clients_client_uri_length CHECK ((char_length(client_uri) <= 2048)),
    CONSTRAINT oauth_clients_logo_uri_length CHECK ((char_length(logo_uri) <= 2048))
);


ALTER TABLE auth.oauth_clients OWNER TO supabase_auth_admin;

--
-- TOC entry 373 (class 1259 OID 17074)
-- Name: oauth_consents; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_consents (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    client_id uuid NOT NULL,
    scopes text NOT NULL,
    granted_at timestamp with time zone DEFAULT now() NOT NULL,
    revoked_at timestamp with time zone,
    CONSTRAINT oauth_consents_revoked_after_granted CHECK (((revoked_at IS NULL) OR (revoked_at >= granted_at))),
    CONSTRAINT oauth_consents_scopes_length CHECK ((char_length(scopes) <= 2048)),
    CONSTRAINT oauth_consents_scopes_not_empty CHECK ((char_length(TRIM(BOTH FROM scopes)) > 0))
);


ALTER TABLE auth.oauth_consents OWNER TO supabase_auth_admin;

--
-- TOC entry 370 (class 1259 OID 16979)
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

--
-- TOC entry 350 (class 1259 OID 16507)
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- TOC entry 4605 (class 0 OID 0)
-- Dependencies: 350
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- TOC entry 349 (class 1259 OID 16506)
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- TOC entry 4607 (class 0 OID 0)
-- Dependencies: 349
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- TOC entry 367 (class 1259 OID 16858)
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- TOC entry 4609 (class 0 OID 0)
-- Dependencies: 367
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- TOC entry 368 (class 1259 OID 16876)
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- TOC entry 4611 (class 0 OID 0)
-- Dependencies: 368
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- TOC entry 353 (class 1259 OID 16533)
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- TOC entry 4613 (class 0 OID 0)
-- Dependencies: 353
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- TOC entry 361 (class 1259 OID 16757)
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text,
    oauth_client_id uuid,
    refresh_token_hmac_key text,
    refresh_token_counter bigint
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- TOC entry 4615 (class 0 OID 0)
-- Dependencies: 361
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- TOC entry 4616 (class 0 OID 0)
-- Dependencies: 361
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- TOC entry 4617 (class 0 OID 0)
-- Dependencies: 361
-- Name: COLUMN sessions.refresh_token_hmac_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.refresh_token_hmac_key IS 'Holds a HMAC-SHA256 key used to sign refresh tokens for this session.';


--
-- TOC entry 4618 (class 0 OID 0)
-- Dependencies: 361
-- Name: COLUMN sessions.refresh_token_counter; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.refresh_token_counter IS 'Holds the ID (counter) of the last issued refresh token.';


--
-- TOC entry 366 (class 1259 OID 16843)
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- TOC entry 4620 (class 0 OID 0)
-- Dependencies: 366
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- TOC entry 365 (class 1259 OID 16834)
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    disabled boolean,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- TOC entry 4622 (class 0 OID 0)
-- Dependencies: 365
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- TOC entry 4623 (class 0 OID 0)
-- Dependencies: 365
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- TOC entry 348 (class 1259 OID 16495)
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- TOC entry 4625 (class 0 OID 0)
-- Dependencies: 348
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- TOC entry 4626 (class 0 OID 0)
-- Dependencies: 348
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- TOC entry 401 (class 1259 OID 17601)
-- Name: courier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courier (
    vehicle_id bigint,
    vehicle_color character varying NOT NULL,
    plate_number character varying NOT NULL,
    license_front text NOT NULL,
    vehicle_brand character varying NOT NULL,
    otherdetails_vehicle text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id uuid DEFAULT gen_random_uuid() NOT NULL,
    license_back text,
    user_status bigint,
    rejection_reason text,
    suspension_reason text
);


ALTER TABLE public.courier OWNER TO postgres;

--
-- TOC entry 395 (class 1259 OID 17549)
-- Name: delivery_service; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.delivery_service (
    service_id bigint NOT NULL,
    service_name character varying
);


ALTER TABLE public.delivery_service OWNER TO postgres;

--
-- TOC entry 396 (class 1259 OID 17552)
-- Name: delivery_service_service_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.delivery_service ALTER COLUMN service_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.delivery_service_service_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 391 (class 1259 OID 17527)
-- Name: delivery_status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.delivery_status (
    deliverstatus_id bigint NOT NULL,
    status_name character varying
);


ALTER TABLE public.delivery_status OWNER TO postgres;

--
-- TOC entry 392 (class 1259 OID 17530)
-- Name: delivery_status_deliverstatus_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.delivery_status ALTER COLUMN deliverstatus_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.delivery_status_deliverstatus_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 404 (class 1259 OID 17697)
-- Name: fare_configuration; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fare_configuration (
    config_id bigint NOT NULL,
    time_rate_per_minute numeric(10,2) NOT NULL,
    platform_commission_percentage numeric(10,2) NOT NULL,
    bonus_rate numeric(10,2) NOT NULL,
    penalty_rate_per_minute numeric NOT NULL,
    grace_period_minutes bigint NOT NULL,
    is_active boolean NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id uuid
);


ALTER TABLE public.fare_configuration OWNER TO postgres;

--
-- TOC entry 405 (class 1259 OID 17700)
-- Name: fare_configuration_config_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.fare_configuration ALTER COLUMN config_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.fare_configuration_config_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 410 (class 1259 OID 17755)
-- Name: favorites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorites (
    favorite_id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id uuid DEFAULT gen_random_uuid(),
    order_id bigint
);


ALTER TABLE public.favorites OWNER TO postgres;

--
-- TOC entry 411 (class 1259 OID 17758)
-- Name: favorites_favorite_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.favorites ALTER COLUMN favorite_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.favorites_favorite_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 397 (class 1259 OID 17560)
-- Name: goods_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.goods_category (
    category_id bigint NOT NULL,
    category_name character varying
);


ALTER TABLE public.goods_category OWNER TO postgres;

--
-- TOC entry 398 (class 1259 OID 17563)
-- Name: goods_category_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.goods_category ALTER COLUMN category_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.goods_category_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 412 (class 1259 OID 17775)
-- Name: history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.history (
    history_id bigint NOT NULL,
    action_type character varying,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id uuid DEFAULT gen_random_uuid()
);


ALTER TABLE public.history OWNER TO postgres;

--
-- TOC entry 413 (class 1259 OID 17778)
-- Name: history_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.history ALTER COLUMN history_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.history_history_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 402 (class 1259 OID 17650)
-- Name: order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."order" (
    order_id bigint NOT NULL,
    service_id bigint NOT NULL,
    payment_id bigint NOT NULL,
    deliverystatus_id bigint NOT NULL,
    vehicle_id bigint NOT NULL,
    category_id bigint NOT NULL,
    pickup_address text NOT NULL,
    dropoff_address text NOT NULL,
    goods_image1 text NOT NULL,
    other_details text,
    rush_fee numeric(10,2),
    is_scheduled boolean NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    scheduled_pickup_time timestamp without time zone,
    distance numeric(10,2) NOT NULL,
    estimated_duration bigint NOT NULL,
    base_fare_component numeric(10,2) NOT NULL,
    distance_charge_component numeric(10,2) NOT NULL,
    time_charge_component numeric(10,2) NOT NULL,
    vehicle_charge_component numeric(10,2) NOT NULL,
    bonus_charge_component numeric(10,2) NOT NULL,
    commission_amount numeric(10,2) NOT NULL,
    penalty_amount numeric(10,2) NOT NULL,
    total_fare numeric(10,2) NOT NULL,
    user_id uuid DEFAULT gen_random_uuid(),
    courier_id uuid DEFAULT gen_random_uuid(),
    pickup_latitude double precision NOT NULL,
    pickup_longitude double precision NOT NULL,
    dropoff_latitude double precision NOT NULL,
    dropoff_longitude double precision NOT NULL,
    goods_image2 text,
    goods_image3 text,
    accepted_at timestamp with time zone
);


ALTER TABLE public."order" OWNER TO postgres;

--
-- TOC entry 403 (class 1259 OID 17653)
-- Name: order_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."order" ALTER COLUMN order_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.order_order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 415 (class 1259 OID 21079)
-- Name: overview; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.overview (
    id bigint NOT NULL,
    slug text,
    title text,
    content text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id uuid
);


ALTER TABLE public.overview OWNER TO postgres;

--
-- TOC entry 416 (class 1259 OID 21082)
-- Name: overview_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.overview ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.overview_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 393 (class 1259 OID 17538)
-- Name: payment_method; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment_method (
    payment_id bigint NOT NULL,
    payment_name character varying
);


ALTER TABLE public.payment_method OWNER TO postgres;

--
-- TOC entry 394 (class 1259 OID 17541)
-- Name: payment_method_payment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.payment_method ALTER COLUMN payment_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.payment_method_payment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 399 (class 1259 OID 17571)
-- Name: report_set; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.report_set (
    reportset_id bigint NOT NULL,
    report_type character varying
);


ALTER TABLE public.report_set OWNER TO postgres;

--
-- TOC entry 400 (class 1259 OID 17574)
-- Name: report_set_reportset_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.report_set ALTER COLUMN reportset_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.report_set_reportset_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 408 (class 1259 OID 17739)
-- Name: report_status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.report_status (
    reportstatus_id bigint NOT NULL,
    status_name character varying
);


ALTER TABLE public.report_status OWNER TO postgres;

--
-- TOC entry 409 (class 1259 OID 17742)
-- Name: report_status_reportstatus_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.report_status ALTER COLUMN reportstatus_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.report_status_reportstatus_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 414 (class 1259 OID 17931)
-- Name: service_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.service_user (
    user_id uuid DEFAULT gen_random_uuid() NOT NULL,
    userstatus_id bigint,
    full_name character varying NOT NULL,
    birth_date date NOT NULL,
    gender character varying NOT NULL,
    email_address character varying NOT NULL,
    phone_number bigint NOT NULL,
    address text NOT NULL,
    user_type character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    suspension_reason text
);


ALTER TABLE public.service_user OWNER TO postgres;

--
-- TOC entry 387 (class 1259 OID 17462)
-- Name: type_vehicle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type_vehicle (
    vehicle_id bigint NOT NULL,
    vehicle_name character varying NOT NULL,
    base_fare numeric,
    distance_rate_per_km numeric,
    slug text,
    user_id uuid
);


ALTER TABLE public.type_vehicle OWNER TO postgres;

--
-- TOC entry 388 (class 1259 OID 17465)
-- Name: type_vehicle_vehicle_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.type_vehicle ALTER COLUMN vehicle_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.type_vehicle_vehicle_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 385 (class 1259 OID 17451)
-- Name: user_status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_status (
    userstatus_id bigint NOT NULL,
    status_name character varying NOT NULL
);


ALTER TABLE public.user_status OWNER TO postgres;

--
-- TOC entry 386 (class 1259 OID 17454)
-- Name: user_status_userstatus_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.user_status ALTER COLUMN userstatus_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.user_status_userstatus_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 406 (class 1259 OID 17709)
-- Name: users_reporting; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_reporting (
    userreporting_id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    order_id bigint,
    reportset_id bigint,
    report_date timestamp with time zone,
    reportstatus_int bigint,
    reporter_id uuid DEFAULT gen_random_uuid(),
    reported_id uuid DEFAULT gen_random_uuid()
);


ALTER TABLE public.users_reporting OWNER TO postgres;

--
-- TOC entry 407 (class 1259 OID 17712)
-- Name: users_reporting_userreporting_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users_reporting ALTER COLUMN userreporting_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_reporting_userreporting_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 389 (class 1259 OID 17510)
-- Name: vehicle_price; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vehicle_price (
    pricing_id bigint NOT NULL,
    vehicle_id bigint,
    vehicle_rate numeric(10,2)
);


ALTER TABLE public.vehicle_price OWNER TO postgres;

--
-- TOC entry 390 (class 1259 OID 17513)
-- Name: vehicle_price_pricing_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.vehicle_price ALTER COLUMN pricing_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.vehicle_price_pricing_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 384 (class 1259 OID 17434)
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- TOC entry 419 (class 1259 OID 25464)
-- Name: messages_2025_11_22; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_11_22 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_11_22 OWNER TO supabase_admin;

--
-- TOC entry 420 (class 1259 OID 25476)
-- Name: messages_2025_11_23; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_11_23 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_11_23 OWNER TO supabase_admin;

--
-- TOC entry 421 (class 1259 OID 25488)
-- Name: messages_2025_11_24; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_11_24 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_11_24 OWNER TO supabase_admin;

--
-- TOC entry 422 (class 1259 OID 25500)
-- Name: messages_2025_11_25; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_11_25 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_11_25 OWNER TO supabase_admin;

--
-- TOC entry 423 (class 1259 OID 25512)
-- Name: messages_2025_11_26; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2025_11_26 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2025_11_26 OWNER TO supabase_admin;

--
-- TOC entry 374 (class 1259 OID 17112)
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- TOC entry 380 (class 1259 OID 17247)
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- TOC entry 379 (class 1259 OID 17246)
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 354 (class 1259 OID 16546)
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text,
    type storage.buckettype DEFAULT 'STANDARD'::storage.buckettype NOT NULL
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- TOC entry 4671 (class 0 OID 0)
-- Dependencies: 354
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- TOC entry 381 (class 1259 OID 17276)
-- Name: buckets_analytics; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets_analytics (
    name text NOT NULL,
    type storage.buckettype DEFAULT 'ANALYTICS'::storage.buckettype NOT NULL,
    format text DEFAULT 'ICEBERG'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE storage.buckets_analytics OWNER TO supabase_storage_admin;

--
-- TOC entry 417 (class 1259 OID 22407)
-- Name: buckets_vectors; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets_vectors (
    id text NOT NULL,
    type storage.buckettype DEFAULT 'VECTOR'::storage.buckettype NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.buckets_vectors OWNER TO supabase_storage_admin;

--
-- TOC entry 356 (class 1259 OID 16588)
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- TOC entry 355 (class 1259 OID 16561)
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb,
    level integer
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- TOC entry 4675 (class 0 OID 0)
-- Dependencies: 355
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- TOC entry 377 (class 1259 OID 17202)
-- Name: prefixes; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.prefixes (
    bucket_id text NOT NULL,
    name text NOT NULL COLLATE pg_catalog."C",
    level integer GENERATED ALWAYS AS (storage.get_level(name)) STORED NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE storage.prefixes OWNER TO supabase_storage_admin;

--
-- TOC entry 375 (class 1259 OID 17149)
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- TOC entry 376 (class 1259 OID 17163)
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- TOC entry 418 (class 1259 OID 22417)
-- Name: vector_indexes; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.vector_indexes (
    id text DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL COLLATE pg_catalog."C",
    bucket_id text NOT NULL,
    data_type text NOT NULL,
    dimension integer NOT NULL,
    distance_metric text NOT NULL,
    metadata_configuration jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.vector_indexes OWNER TO supabase_storage_admin;

--
-- TOC entry 3777 (class 0 OID 0)
-- Name: messages_2025_11_22; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_11_22 FOR VALUES FROM ('2025-11-22 00:00:00') TO ('2025-11-23 00:00:00');


--
-- TOC entry 3778 (class 0 OID 0)
-- Name: messages_2025_11_23; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_11_23 FOR VALUES FROM ('2025-11-23 00:00:00') TO ('2025-11-24 00:00:00');


--
-- TOC entry 3779 (class 0 OID 0)
-- Name: messages_2025_11_24; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_11_24 FOR VALUES FROM ('2025-11-24 00:00:00') TO ('2025-11-25 00:00:00');


--
-- TOC entry 3780 (class 0 OID 0)
-- Name: messages_2025_11_25; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_11_25 FOR VALUES FROM ('2025-11-25 00:00:00') TO ('2025-11-26 00:00:00');


--
-- TOC entry 3781 (class 0 OID 0)
-- Name: messages_2025_11_26; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2025_11_26 FOR VALUES FROM ('2025-11-26 00:00:00') TO ('2025-11-27 00:00:00');


--
-- TOC entry 3791 (class 2604 OID 16510)
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- TOC entry 4414 (class 0 OID 16525)
-- Dependencies: 352
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
00000000-0000-0000-0000-000000000000	024a4d73-6a85-43ed-8583-31aba03e8245	{"action":"user_confirmation_requested","actor_id":"1f2e9c45-b7f6-443d-bbb4-4d5b53d3e519","actor_name":"fwafa","actor_username":"fwafwafawfawf@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-03 12:56:27.498148+00	
00000000-0000-0000-0000-000000000000	52905cbc-11b8-45ee-ad70-83462127b17a	{"action":"user_confirmation_requested","actor_id":"ae85e53c-6183-419a-9014-8cc5b81034c9","actor_username":"cabatingan@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-04 03:28:24.117615+00	
00000000-0000-0000-0000-000000000000	1a3a9159-af14-41be-8e30-f54ac3b99cde	{"action":"user_confirmation_requested","actor_id":"ae85e53c-6183-419a-9014-8cc5b81034c9","actor_username":"cabatingan@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-04 03:29:27.266897+00	
00000000-0000-0000-0000-000000000000	821824fc-7f03-4e19-aac5-c3f40c237c3d	{"action":"user_confirmation_requested","actor_id":"ae85e53c-6183-419a-9014-8cc5b81034c9","actor_username":"cabatingan@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-04 03:34:25.586152+00	
00000000-0000-0000-0000-000000000000	9a940f9d-6cd9-4cb1-ad81-2a3ef029e01a	{"action":"user_confirmation_requested","actor_id":"7dd7bb76-fb0a-490e-b87e-5a085f9bd845","actor_username":"cabatingangf@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-04 03:35:17.45604+00	
00000000-0000-0000-0000-000000000000	f671ba07-8742-46c3-8522-816356520d17	{"action":"user_confirmation_requested","actor_id":"caecc0d8-a5f0-4c82-9bff-08e5e40a4828","actor_username":"cabatinganluke@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-04 04:49:20.070598+00	
00000000-0000-0000-0000-000000000000	d50bda2a-6407-4c85-8d92-383194c8a5ea	{"action":"user_confirmation_requested","actor_id":"caecc0d8-a5f0-4c82-9bff-08e5e40a4828","actor_username":"cabatinganluke@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-04 04:51:22.825545+00	
00000000-0000-0000-0000-000000000000	0f83d7fb-b9ac-4cd2-b155-e7ec3802f9ad	{"action":"user_confirmation_requested","actor_id":"768f29c6-8a97-4565-b3cb-3efe3eea3d1c","actor_username":"rosales@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-04 04:55:49.609374+00	
00000000-0000-0000-0000-000000000000	9f152f99-7159-4fd9-87ea-63f2ab91b36a	{"action":"user_confirmation_requested","actor_id":"de7060d8-5a38-449b-b1ab-43079ff00cfd","actor_username":"lukezicvhri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-04 05:05:32.212189+00	
00000000-0000-0000-0000-000000000000	302e20f3-2748-4536-8fb1-a433b1575f86	{"action":"user_confirmation_requested","actor_id":"dcc79a36-988d-4cf7-90d4-9cce06299b8b","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-04 06:58:26.661844+00	
00000000-0000-0000-0000-000000000000	4aa48caa-9a5e-4b8f-ae24-836c535f6152	{"action":"user_signedup","actor_id":"dcc79a36-988d-4cf7-90d4-9cce06299b8b","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-04 07:01:23.121256+00	
00000000-0000-0000-0000-000000000000	7c5f5d0c-ea32-4484-943b-af0e4b7b25ba	{"action":"user_repeated_signup","actor_id":"dcc79a36-988d-4cf7-90d4-9cce06299b8b","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-04 07:19:38.919046+00	
00000000-0000-0000-0000-000000000000	12b2b68d-f329-4a1c-9726-c89f4615103f	{"action":"user_repeated_signup","actor_id":"dcc79a36-988d-4cf7-90d4-9cce06299b8b","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-04 07:20:10.926003+00	
00000000-0000-0000-0000-000000000000	71585d5b-296f-4c15-ac15-322ee2949085	{"action":"user_confirmation_requested","actor_id":"bfee6f07-9454-4aa7-b146-3f548be28b61","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-04 07:23:56.016401+00	
00000000-0000-0000-0000-000000000000	11a49311-8b87-4dcf-96b3-e3f78ca37136	{"action":"user_repeated_signup","actor_id":"dcc79a36-988d-4cf7-90d4-9cce06299b8b","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-04 07:31:08.37495+00	
00000000-0000-0000-0000-000000000000	06bc4342-f58a-4db8-b8fe-364ea2fd94f9	{"action":"user_confirmation_requested","actor_id":"bfee6f07-9454-4aa7-b146-3f548be28b61","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-04 07:34:33.528115+00	
00000000-0000-0000-0000-000000000000	794fa515-7f79-4eb6-b224-094b73fb4acc	{"action":"user_repeated_signup","actor_id":"dcc79a36-988d-4cf7-90d4-9cce06299b8b","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-04 07:44:47.807112+00	
00000000-0000-0000-0000-000000000000	2a7ec62d-d0a1-426f-ab0e-be6c19e3f6d9	{"action":"user_confirmation_requested","actor_id":"e646150b-43b5-46a5-baaa-4670cf50e2de","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-04 07:51:18.984737+00	
00000000-0000-0000-0000-000000000000	a147b3d8-53b5-479a-8af3-a47f9cacf1fc	{"action":"user_confirmation_requested","actor_id":"e646150b-43b5-46a5-baaa-4670cf50e2de","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-04 07:57:16.58279+00	
00000000-0000-0000-0000-000000000000	17a1d8c2-7cfd-4008-b34e-56074f96bb22	{"action":"user_confirmation_requested","actor_id":"c626d8df-a053-47ee-80bc-fe73fe72ad07","actor_name":"Luke Cabatingan","actor_username":"cabatinganlukezic@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-05 11:14:52.272512+00	
00000000-0000-0000-0000-000000000000	b5af53a4-e134-47dc-87c2-867a2b56c8cd	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cabatingan@gmail.com","user_id":"ae85e53c-6183-419a-9014-8cc5b81034c9","user_phone":""}}	2025-11-05 11:27:26.963572+00	
00000000-0000-0000-0000-000000000000	3acc26bb-4a47-4c5d-84b8-c5b692de1519	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cabatinganluke@gmail.com","user_id":"caecc0d8-a5f0-4c82-9bff-08e5e40a4828","user_phone":""}}	2025-11-05 11:27:26.963725+00	
00000000-0000-0000-0000-000000000000	dba81d48-a24e-48f8-a2bc-4975f47c5245	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cabatingangf@gmail.com","user_id":"7dd7bb76-fb0a-490e-b87e-5a085f9bd845","user_phone":""}}	2025-11-05 11:27:26.970032+00	
00000000-0000-0000-0000-000000000000	8ebfd4d9-0831-4f88-b12d-ae8005425683	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cabatinganlukezic@gmail.com","user_id":"c626d8df-a053-47ee-80bc-fe73fe72ad07","user_phone":""}}	2025-11-05 11:27:26.990659+00	
00000000-0000-0000-0000-000000000000	8c16885a-64bb-4bb6-98e2-65b5dad34899	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"lukezicvhri@gmail.com","user_id":"de7060d8-5a38-449b-b1ab-43079ff00cfd","user_phone":""}}	2025-11-05 11:27:26.992902+00	
00000000-0000-0000-0000-000000000000	d4fb762c-3e0e-40ee-accc-cd0f3f9c9f33	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cabatinganlukezichri@gmail.com","user_id":"dcc79a36-988d-4cf7-90d4-9cce06299b8b","user_phone":""}}	2025-11-05 11:27:26.98957+00	
00000000-0000-0000-0000-000000000000	5e43d94c-e5d3-41f7-8c4d-3be104252b0b	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rosales@gmail.com","user_id":"768f29c6-8a97-4565-b3cb-3efe3eea3d1c","user_phone":""}}	2025-11-05 11:27:27.102632+00	
00000000-0000-0000-0000-000000000000	d25d129f-f4bd-4a5f-9f66-f23b24029d6b	{"action":"user_confirmation_requested","actor_id":"30d9d00b-054e-4321-9694-1110785c5782","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-05 16:12:43.351019+00	
00000000-0000-0000-0000-000000000000	e47a8bd1-f674-4dd3-a46a-cbbbe56d485d	{"action":"user_confirmation_requested","actor_id":"67285da2-1d62-487a-bdb7-9495eb6a850e","actor_username":"cabatinganluke@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-06 00:57:00.406044+00	
00000000-0000-0000-0000-000000000000	b91664b3-3f09-40bf-b970-ca5a2a4c3c23	{"action":"user_confirmation_requested","actor_id":"bfee6f07-9454-4aa7-b146-3f548be28b61","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-06 01:18:56.658814+00	
00000000-0000-0000-0000-000000000000	01dc1bb1-bae3-4639-a95e-96d56816ca93	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cabatinganlukezichri@gmail.com","user_id":"30d9d00b-054e-4321-9694-1110785c5782","user_phone":""}}	2025-11-06 01:23:02.596854+00	
00000000-0000-0000-0000-000000000000	1f108ef1-e6b9-4711-9670-2d93dbc40c86	{"action":"user_signedup","actor_id":"bfee6f07-9454-4aa7-b146-3f548be28b61","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-06 01:28:14.350768+00	
00000000-0000-0000-0000-000000000000	b954914f-07c1-4dfc-98c5-c4483b5b0f8a	{"action":"user_confirmation_requested","actor_id":"c31dc0c1-b6fd-4df8-b40c-b366afcdba9b","actor_username":"cabatingan@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-06 01:29:26.46899+00	
00000000-0000-0000-0000-000000000000	0d20fac1-d474-4130-af60-11ae8806ce26	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cabatingan@gmail.com","user_id":"c31dc0c1-b6fd-4df8-b40c-b366afcdba9b","user_phone":""}}	2025-11-06 01:30:20.032036+00	
00000000-0000-0000-0000-000000000000	ed63f28a-b416-4d99-80f2-45c8d08569fb	{"action":"user_repeated_signup","actor_id":"bfee6f07-9454-4aa7-b146-3f548be28b61","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-06 01:36:40.67381+00	
00000000-0000-0000-0000-000000000000	66a8d2ff-527b-4345-be10-304ee8e35189	{"action":"user_confirmation_requested","actor_id":"67285da2-1d62-487a-bdb7-9495eb6a850e","actor_username":"cabatinganluke@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-06 01:45:00.43873+00	
00000000-0000-0000-0000-000000000000	3f0fa4cc-a09b-43de-a7f7-e3d90f4ab6a0	{"action":"user_confirmation_requested","actor_id":"9c1174f6-e440-4166-a476-a6a340bbe453","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-06 02:06:10.134974+00	
00000000-0000-0000-0000-000000000000	0bf0c778-e34e-448b-a6c3-1512db3363d1	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"fwafwafawfawf@gmail.com","user_id":"1f2e9c45-b7f6-443d-bbb4-4d5b53d3e519","user_phone":""}}	2025-11-06 02:10:46.298404+00	
00000000-0000-0000-0000-000000000000	8a9aca26-014b-4367-b810-c4f4bdeee20d	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cabatinganluke@gmail.com","user_id":"67285da2-1d62-487a-bdb7-9495eb6a850e","user_phone":""}}	2025-11-06 02:10:46.313868+00	
00000000-0000-0000-0000-000000000000	4cae1ba5-cdab-4a31-ae30-cadc618f7f3e	{"action":"user_confirmation_requested","actor_id":"9c1174f6-e440-4166-a476-a6a340bbe453","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-06 02:34:21.672404+00	
00000000-0000-0000-0000-000000000000	d3980b69-d858-4e59-932d-6df0909e426d	{"action":"user_confirmation_requested","actor_id":"9c1174f6-e440-4166-a476-a6a340bbe453","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-06 02:43:26.725103+00	
00000000-0000-0000-0000-000000000000	8f2249d9-e454-4d7d-8b95-c44f5359b1b4	{"action":"user_confirmation_requested","actor_id":"9c1174f6-e440-4166-a476-a6a340bbe453","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-06 02:44:27.707283+00	
00000000-0000-0000-0000-000000000000	a6a776a1-477b-471f-98e8-5a69841178c8	{"action":"user_confirmation_requested","actor_id":"9c1174f6-e440-4166-a476-a6a340bbe453","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-06 02:46:04.501236+00	
00000000-0000-0000-0000-000000000000	ac89543a-380e-40eb-86fc-07d12c2afe6e	{"action":"user_confirmation_requested","actor_id":"9c1174f6-e440-4166-a476-a6a340bbe453","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-06 02:53:23.246904+00	
00000000-0000-0000-0000-000000000000	6b695881-ef13-44a6-8e4c-b6200f8c1e7b	{"action":"user_confirmation_requested","actor_id":"9c1174f6-e440-4166-a476-a6a340bbe453","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-06 02:54:48.298534+00	
00000000-0000-0000-0000-000000000000	7bf3e614-525f-4866-83e3-c7a8691c6ad6	{"action":"user_confirmation_requested","actor_id":"9c1174f6-e440-4166-a476-a6a340bbe453","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-06 02:56:39.767831+00	
00000000-0000-0000-0000-000000000000	41f92448-a2ff-498b-a335-3e6ead80e436	{"action":"user_confirmation_requested","actor_id":"3dcd4566-a7f2-4c21-a3ea-ba273c61eedf","actor_username":"lukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-06 03:02:55.874137+00	
00000000-0000-0000-0000-000000000000	e6ab996e-edf9-489c-906d-f3473c555cad	{"action":"user_confirmation_requested","actor_id":"e646150b-43b5-46a5-baaa-4670cf50e2de","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-06 03:58:37.560052+00	
00000000-0000-0000-0000-000000000000	78729f4a-6d99-4442-aa85-1ba8efd73c67	{"action":"user_confirmation_requested","actor_id":"500f6ec3-c027-492b-8802-f9a69eaf1188","actor_username":"cabatinganluke@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-06 04:06:21.952053+00	
00000000-0000-0000-0000-000000000000	00234c78-2baf-4b83-bbb2-abf08e08d1ab	{"action":"user_confirmation_requested","actor_id":"9c1174f6-e440-4166-a476-a6a340bbe453","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-06 04:15:06.359174+00	
00000000-0000-0000-0000-000000000000	3ef1ca2f-09ff-4a89-9d11-beaeca30ea34	{"action":"user_confirmation_requested","actor_id":"9c1174f6-e440-4166-a476-a6a340bbe453","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-06 04:43:08.304701+00	
00000000-0000-0000-0000-000000000000	eed6376c-d1e3-43e3-881a-3795b6c34810	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cabatinganluke@gmail.com","user_id":"500f6ec3-c027-492b-8802-f9a69eaf1188","user_phone":""}}	2025-11-06 11:17:44.215277+00	
00000000-0000-0000-0000-000000000000	50246807-5669-4469-be9a-3a8f59c7c83f	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"lukezichri@gmail.com","user_id":"3dcd4566-a7f2-4c21-a3ea-ba273c61eedf","user_phone":""}}	2025-11-06 11:17:44.256035+00	
00000000-0000-0000-0000-000000000000	e4fd557c-e741-403e-9540-f464234e0774	{"action":"user_confirmation_requested","actor_id":"9c1174f6-e440-4166-a476-a6a340bbe453","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-06 12:36:31.373166+00	
00000000-0000-0000-0000-000000000000	b87f87da-422f-46ac-b12f-61ecc74a55a8	{"action":"user_confirmation_requested","actor_id":"9c1174f6-e440-4166-a476-a6a340bbe453","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-06 14:01:39.520809+00	
00000000-0000-0000-0000-000000000000	dc9c915a-968d-4da5-b16c-674155bc9ee4	{"action":"user_signedup","actor_id":"9c1174f6-e440-4166-a476-a6a340bbe453","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-06 14:02:03.479071+00	
00000000-0000-0000-0000-000000000000	92540829-b243-411e-938b-35ec8ad31e4b	{"action":"token_refreshed","actor_id":"9c1174f6-e440-4166-a476-a6a340bbe453","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-07 04:54:48.059876+00	
00000000-0000-0000-0000-000000000000	853afc6a-e440-403d-931f-c2c6b2560086	{"action":"token_revoked","actor_id":"9c1174f6-e440-4166-a476-a6a340bbe453","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-07 04:54:48.084343+00	
00000000-0000-0000-0000-000000000000	e7534172-ff5b-47e8-b330-f0067e469c10	{"action":"user_confirmation_requested","actor_id":"e646150b-43b5-46a5-baaa-4670cf50e2de","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-07 05:14:36.803041+00	
00000000-0000-0000-0000-000000000000	ca93d305-80a9-4263-9533-6abc122da0ce	{"action":"user_signedup","actor_id":"e646150b-43b5-46a5-baaa-4670cf50e2de","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-07 05:15:00.059056+00	
00000000-0000-0000-0000-000000000000	f2651de6-cf88-4d39-a2d4-da493be2cef1	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cabatinganlukezichri@gmail.com","user_id":"9c1174f6-e440-4166-a476-a6a340bbe453","user_phone":""}}	2025-11-07 05:15:50.896317+00	
00000000-0000-0000-0000-000000000000	2bb0ad40-d34e-4a6d-8a86-34dab5dd64e0	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rosalesmariche2@gmail.com","user_id":"e646150b-43b5-46a5-baaa-4670cf50e2de","user_phone":""}}	2025-11-07 05:16:03.551968+00	
00000000-0000-0000-0000-000000000000	daddcfd3-1271-4f10-9f41-8a720dcc77d6	{"action":"user_confirmation_requested","actor_id":"f91c952d-e1c8-4cdc-b595-f82c36b64e5d","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-07 05:17:24.932553+00	
00000000-0000-0000-0000-000000000000	70fb2cde-6c9f-427b-93ba-bbcacd31d9bf	{"action":"user_signedup","actor_id":"f91c952d-e1c8-4cdc-b595-f82c36b64e5d","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-07 05:17:44.727171+00	
00000000-0000-0000-0000-000000000000	a496664e-2248-4f65-aa82-04bd8b80ac69	{"action":"user_confirmation_requested","actor_id":"37b33e3c-5a10-4004-a13a-b27da7a4cbe5","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-07 07:10:19.383109+00	
00000000-0000-0000-0000-000000000000	d279d5cd-e5b2-41aa-8b59-e3ff79af2b4f	{"action":"user_signedup","actor_id":"37b33e3c-5a10-4004-a13a-b27da7a4cbe5","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-07 07:10:59.292712+00	
00000000-0000-0000-0000-000000000000	c0fb4f51-fb8e-4e96-9046-9e97cf0db812	{"action":"token_refreshed","actor_id":"f91c952d-e1c8-4cdc-b595-f82c36b64e5d","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-09 07:17:33.01406+00	
00000000-0000-0000-0000-000000000000	82a9f5bf-b788-47bc-9072-20083a195a45	{"action":"token_revoked","actor_id":"f91c952d-e1c8-4cdc-b595-f82c36b64e5d","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-09 07:17:33.036012+00	
00000000-0000-0000-0000-000000000000	cb5d335e-884f-4251-b441-d08dfbe1f4cc	{"action":"token_refreshed","actor_id":"f91c952d-e1c8-4cdc-b595-f82c36b64e5d","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-09 08:15:57.205088+00	
00000000-0000-0000-0000-000000000000	459790a3-421f-41cd-85fc-8e8beff9e28e	{"action":"token_revoked","actor_id":"f91c952d-e1c8-4cdc-b595-f82c36b64e5d","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-09 08:15:57.219531+00	
00000000-0000-0000-0000-000000000000	f34b7b7f-9cce-4d07-ba88-a13730b974ea	{"action":"token_refreshed","actor_id":"f91c952d-e1c8-4cdc-b595-f82c36b64e5d","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-09 14:56:47.64826+00	
00000000-0000-0000-0000-000000000000	ba593729-53d3-42a5-b34c-89219af45546	{"action":"token_revoked","actor_id":"f91c952d-e1c8-4cdc-b595-f82c36b64e5d","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-09 14:56:47.671816+00	
00000000-0000-0000-0000-000000000000	68553d85-8cc6-4809-913c-b03e46326f98	{"action":"user_repeated_signup","actor_id":"37b33e3c-5a10-4004-a13a-b27da7a4cbe5","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-10 05:20:22.454559+00	
00000000-0000-0000-0000-000000000000	bf47b916-99fc-48b3-97a1-741543681543	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cabatinganlukezichri@gmail.com","user_id":"37b33e3c-5a10-4004-a13a-b27da7a4cbe5","user_phone":""}}	2025-11-10 05:22:07.099952+00	
00000000-0000-0000-0000-000000000000	7436e255-4b75-4854-b8fe-222aac0337bc	{"action":"user_confirmation_requested","actor_id":"84cf03dc-d9ec-4e75-aec3-9fea2af1cfb8","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-10 05:24:37.088184+00	
00000000-0000-0000-0000-000000000000	1a41e0b4-d19c-4293-b256-ce2e10993ba1	{"action":"user_signedup","actor_id":"84cf03dc-d9ec-4e75-aec3-9fea2af1cfb8","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-10 05:24:57.387039+00	
00000000-0000-0000-0000-000000000000	3c5cb8dc-334e-4224-97c1-0d5044527c86	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cabatinganlukezichri@gmail.com","user_id":"84cf03dc-d9ec-4e75-aec3-9fea2af1cfb8","user_phone":""}}	2025-11-10 06:14:40.147452+00	
00000000-0000-0000-0000-000000000000	ac8ee696-283d-4784-88e2-33b4b1e1688b	{"action":"user_confirmation_requested","actor_id":"1a04d41e-8300-457e-b8f9-19f436b20ed6","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-10 06:17:34.251776+00	
00000000-0000-0000-0000-000000000000	0c414402-677c-4ffd-b34c-e97596613512	{"action":"user_signedup","actor_id":"1a04d41e-8300-457e-b8f9-19f436b20ed6","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-10 06:18:28.396469+00	
00000000-0000-0000-0000-000000000000	0307b3df-afd2-40a3-9464-e01313aee7c5	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cabatinganlukezichri@gmail.com","user_id":"1a04d41e-8300-457e-b8f9-19f436b20ed6","user_phone":""}}	2025-11-10 07:04:04.934813+00	
00000000-0000-0000-0000-000000000000	02ae3179-18d6-40bf-8eb2-ddc433c2d2bf	{"action":"user_confirmation_requested","actor_id":"d2b7168e-7b3a-423d-b525-4ac5ed14db94","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-10 07:05:39.689415+00	
00000000-0000-0000-0000-000000000000	443cbaee-51cd-4041-8b26-a623c2006748	{"action":"user_signedup","actor_id":"d2b7168e-7b3a-423d-b525-4ac5ed14db94","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-10 07:06:11.239247+00	
00000000-0000-0000-0000-000000000000	ea517b86-ba5c-4de3-bf2b-aabd0e18a922	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"zichri6767@gmail.com","user_id":"bfee6f07-9454-4aa7-b146-3f548be28b61","user_phone":""}}	2025-11-10 07:07:45.27222+00	
00000000-0000-0000-0000-000000000000	1425de96-9324-480c-9202-3aedca107b84	{"action":"token_refreshed","actor_id":"f91c952d-e1c8-4cdc-b595-f82c36b64e5d","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-10 07:08:51.890434+00	
00000000-0000-0000-0000-000000000000	dee70aad-fd03-45c4-ac5f-affa88d35b4b	{"action":"token_revoked","actor_id":"f91c952d-e1c8-4cdc-b595-f82c36b64e5d","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-10 07:08:51.891768+00	
00000000-0000-0000-0000-000000000000	eea46722-6792-4b58-aee3-c940caf76938	{"action":"user_confirmation_requested","actor_id":"53dcb418-1d13-43be-b595-40c79453fdc9","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-10 07:09:43.227508+00	
00000000-0000-0000-0000-000000000000	c68409fe-5078-46b7-8258-aa3db98070c1	{"action":"user_signedup","actor_id":"53dcb418-1d13-43be-b595-40c79453fdc9","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-10 07:09:57.495252+00	
00000000-0000-0000-0000-000000000000	173975a0-0ba4-4e86-8ca2-cb86906951b3	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"zichri6767@gmail.com","user_id":"53dcb418-1d13-43be-b595-40c79453fdc9","user_phone":""}}	2025-11-10 07:37:33.283559+00	
00000000-0000-0000-0000-000000000000	efd19e4e-4a1b-474c-bc86-f049290bc338	{"action":"user_confirmation_requested","actor_id":"573b30c9-2d71-4ff7-b6b3-81a9a3f92480","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-10 07:39:34.261886+00	
00000000-0000-0000-0000-000000000000	77f2c61c-187a-4b7d-8539-fac75fa172d9	{"action":"user_signedup","actor_id":"573b30c9-2d71-4ff7-b6b3-81a9a3f92480","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-10 07:39:49.826303+00	
00000000-0000-0000-0000-000000000000	69c04cd4-0d6e-4f4d-9e6e-39874bc0f2ed	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rosalesmariche2@gmail.com","user_id":"f91c952d-e1c8-4cdc-b595-f82c36b64e5d","user_phone":""}}	2025-11-10 07:41:43.787279+00	
00000000-0000-0000-0000-000000000000	0138ee85-758b-4570-a1c4-5ccfd03897e9	{"action":"user_confirmation_requested","actor_id":"5672923d-5362-4aa2-b34c-a30fe43788d1","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-10 07:44:49.167502+00	
00000000-0000-0000-0000-000000000000	ed7337f2-f1ff-4987-9f25-22d9532cbd29	{"action":"user_signedup","actor_id":"5672923d-5362-4aa2-b34c-a30fe43788d1","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-10 07:45:22.111816+00	
00000000-0000-0000-0000-000000000000	52326e06-41d2-4bc2-a8bb-2b18d534cf7c	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rosalesmariche2@gmail.com","user_id":"5672923d-5362-4aa2-b34c-a30fe43788d1","user_phone":""}}	2025-11-10 08:16:36.701541+00	
00000000-0000-0000-0000-000000000000	7bd963c8-04b7-4cf9-9e80-7c1bbc423f4d	{"action":"user_confirmation_requested","actor_id":"25e59e8d-14dc-4cbc-b160-64cfbebaaded","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-10 08:18:46.234115+00	
00000000-0000-0000-0000-000000000000	88dd1c83-18ec-4c47-84dd-0eb8aa97f926	{"action":"user_signedup","actor_id":"25e59e8d-14dc-4cbc-b160-64cfbebaaded","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-10 08:19:22.556203+00	
00000000-0000-0000-0000-000000000000	ee7431a9-3643-4316-a9b8-9f6f1a09d239	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rosalesmariche2@gmail.com","user_id":"25e59e8d-14dc-4cbc-b160-64cfbebaaded","user_phone":""}}	2025-11-10 08:25:20.415593+00	
00000000-0000-0000-0000-000000000000	d4be2b51-9540-41dc-91e7-c76bf13adfc7	{"action":"user_confirmation_requested","actor_id":"55d698a2-73b3-45b9-9c45-392701941bf1","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-10 08:27:20.656497+00	
00000000-0000-0000-0000-000000000000	d91856f1-30a8-4301-b960-b2cd707ea136	{"action":"user_signedup","actor_id":"55d698a2-73b3-45b9-9c45-392701941bf1","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-10 08:27:47.388794+00	
00000000-0000-0000-0000-000000000000	900d7ca3-1945-4b55-90d9-34a7abf9d0c0	{"action":"token_refreshed","actor_id":"55d698a2-73b3-45b9-9c45-392701941bf1","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-10 09:37:39.169095+00	
00000000-0000-0000-0000-000000000000	f5139085-3198-44b8-b704-d7d66389caac	{"action":"token_revoked","actor_id":"55d698a2-73b3-45b9-9c45-392701941bf1","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-10 09:37:39.192469+00	
00000000-0000-0000-0000-000000000000	4d4d0935-de46-462d-853e-669368024999	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rosalesmariche2@gmail.com","user_id":"55d698a2-73b3-45b9-9c45-392701941bf1","user_phone":""}}	2025-11-10 09:56:27.59584+00	
00000000-0000-0000-0000-000000000000	534ceecb-70e8-4f95-ab9a-5b308a7f68c1	{"action":"user_confirmation_requested","actor_id":"921153b9-4465-4455-b67e-05a1a07799d2","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-10 10:01:22.657312+00	
00000000-0000-0000-0000-000000000000	53b3d060-016a-4280-8d37-d00d2985b6d5	{"action":"user_signedup","actor_id":"921153b9-4465-4455-b67e-05a1a07799d2","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-10 10:01:57.525811+00	
00000000-0000-0000-0000-000000000000	48e84c3f-6e02-49f2-90fb-67d8fd261fd3	{"action":"token_refreshed","actor_id":"d2b7168e-7b3a-423d-b525-4ac5ed14db94","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-12 10:04:52.604273+00	
00000000-0000-0000-0000-000000000000	00d0d719-c30b-455e-abc5-865d5a66ac50	{"action":"token_revoked","actor_id":"d2b7168e-7b3a-423d-b525-4ac5ed14db94","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-12 10:04:52.617183+00	
00000000-0000-0000-0000-000000000000	f640b496-2105-485e-88c5-8f644b3f08fe	{"action":"token_refreshed","actor_id":"d2b7168e-7b3a-423d-b525-4ac5ed14db94","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-12 11:02:56.492085+00	
00000000-0000-0000-0000-000000000000	68a796c3-30ea-4869-804b-7f7388c0b848	{"action":"token_revoked","actor_id":"d2b7168e-7b3a-423d-b525-4ac5ed14db94","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-12 11:02:56.505913+00	
00000000-0000-0000-0000-000000000000	e8da3e23-a61d-4033-ad18-fefa102cbf0f	{"action":"token_refreshed","actor_id":"d2b7168e-7b3a-423d-b525-4ac5ed14db94","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-12 12:00:58.351543+00	
00000000-0000-0000-0000-000000000000	9e3a1a92-92cc-4609-9f28-99e8b8e279be	{"action":"token_revoked","actor_id":"d2b7168e-7b3a-423d-b525-4ac5ed14db94","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-12 12:00:58.369172+00	
00000000-0000-0000-0000-000000000000	8a9dbf76-7938-40aa-a26e-727e0273e465	{"action":"token_refreshed","actor_id":"d2b7168e-7b3a-423d-b525-4ac5ed14db94","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-12 12:59:01.040336+00	
00000000-0000-0000-0000-000000000000	f187781d-f620-4e97-a199-1fb5de6b4670	{"action":"token_revoked","actor_id":"d2b7168e-7b3a-423d-b525-4ac5ed14db94","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-12 12:59:01.050658+00	
00000000-0000-0000-0000-000000000000	1e3ce36f-74d0-46cc-8070-36b629ac4a1c	{"action":"token_refreshed","actor_id":"d2b7168e-7b3a-423d-b525-4ac5ed14db94","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-12 13:57:07.825603+00	
00000000-0000-0000-0000-000000000000	5d9c622e-31cc-49db-856a-05d422c641cc	{"action":"token_revoked","actor_id":"d2b7168e-7b3a-423d-b525-4ac5ed14db94","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-12 13:57:07.833427+00	
00000000-0000-0000-0000-000000000000	5bc08d73-d9e8-4cea-ae58-186bf8ea5605	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cabatinganlukezichri@gmail.com","user_id":"d2b7168e-7b3a-423d-b525-4ac5ed14db94","user_phone":""}}	2025-11-13 11:07:25.492753+00	
00000000-0000-0000-0000-000000000000	eaf6ad38-2567-4f8c-8c82-478179bfe560	{"action":"user_confirmation_requested","actor_id":"a2ef1f59-4b2b-4091-a865-1bc02bf630d5","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-13 11:08:24.532178+00	
00000000-0000-0000-0000-000000000000	f11d5722-1a9b-4de6-a935-efdef5856fda	{"action":"user_signedup","actor_id":"a2ef1f59-4b2b-4091-a865-1bc02bf630d5","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-13 11:09:21.372862+00	
00000000-0000-0000-0000-000000000000	12a30998-7c3e-4c83-bacd-f2ba1de9486d	{"action":"token_refreshed","actor_id":"a2ef1f59-4b2b-4091-a865-1bc02bf630d5","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-13 14:19:44.316255+00	
00000000-0000-0000-0000-000000000000	41e8d080-66b5-48fe-ad9e-91abf1210e3d	{"action":"token_revoked","actor_id":"a2ef1f59-4b2b-4091-a865-1bc02bf630d5","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-13 14:19:44.330192+00	
00000000-0000-0000-0000-000000000000	76726ada-bed6-4994-a5f3-ed18c7ac792f	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"zichri6767@gmail.com","user_id":"573b30c9-2d71-4ff7-b6b3-81a9a3f92480","user_phone":""}}	2025-11-13 15:06:25.759416+00	
00000000-0000-0000-0000-000000000000	5fdd1a26-a10a-4214-bb26-63e1021b3906	{"action":"user_confirmation_requested","actor_id":"35a5909f-6d8a-4b57-ac6e-d956f89e2fad","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-13 15:07:58.183538+00	
00000000-0000-0000-0000-000000000000	63ec2017-201e-49e7-80c0-c5930b66c494	{"action":"user_confirmation_requested","actor_id":"35a5909f-6d8a-4b57-ac6e-d956f89e2fad","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-13 15:10:43.130231+00	
00000000-0000-0000-0000-000000000000	5ed47d3b-8cb6-4820-8787-b49373894e62	{"action":"user_signedup","actor_id":"35a5909f-6d8a-4b57-ac6e-d956f89e2fad","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-13 15:11:00.123484+00	
00000000-0000-0000-0000-000000000000	e6bdac3e-6449-4d4c-bf9d-c0a27f903a33	{"action":"token_refreshed","actor_id":"35a5909f-6d8a-4b57-ac6e-d956f89e2fad","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-13 16:09:28.425847+00	
00000000-0000-0000-0000-000000000000	8a2d04fd-500c-4f84-b5eb-0fc2d96e678f	{"action":"token_revoked","actor_id":"35a5909f-6d8a-4b57-ac6e-d956f89e2fad","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-13 16:09:28.438223+00	
00000000-0000-0000-0000-000000000000	869261f6-7258-4543-9cc5-c81690115fd9	{"action":"token_refreshed","actor_id":"35a5909f-6d8a-4b57-ac6e-d956f89e2fad","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-14 03:27:38.137834+00	
00000000-0000-0000-0000-000000000000	84c98c21-81d5-4e11-ad95-b4c8fbaad399	{"action":"token_revoked","actor_id":"35a5909f-6d8a-4b57-ac6e-d956f89e2fad","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-14 03:27:38.164168+00	
00000000-0000-0000-0000-000000000000	11db5572-7488-4ae5-a8d2-8c9b1fa74952	{"action":"token_refreshed","actor_id":"35a5909f-6d8a-4b57-ac6e-d956f89e2fad","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-14 04:25:43.03043+00	
00000000-0000-0000-0000-000000000000	d4fd974b-5472-42cf-ba55-278b64ff718d	{"action":"token_revoked","actor_id":"35a5909f-6d8a-4b57-ac6e-d956f89e2fad","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-14 04:25:43.043763+00	
00000000-0000-0000-0000-000000000000	08ef52ee-bfe9-44d1-a3e5-4b4dd738ccda	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"zichri6767@gmail.com","user_id":"35a5909f-6d8a-4b57-ac6e-d956f89e2fad","user_phone":""}}	2025-11-14 05:15:53.959206+00	
00000000-0000-0000-0000-000000000000	e0a21fd3-91d6-4544-b714-6c1352c5af48	{"action":"user_confirmation_requested","actor_id":"81554acf-6be5-4d95-a73d-6281199cd982","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-14 06:03:50.687846+00	
00000000-0000-0000-0000-000000000000	1482d5d8-9178-4000-93dc-9d7f1eb95841	{"action":"user_signedup","actor_id":"81554acf-6be5-4d95-a73d-6281199cd982","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-14 06:04:22.708526+00	
00000000-0000-0000-0000-000000000000	acf69929-5da7-4e8f-874e-7ca9a38726c4	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"zichri6767@gmail.com","user_id":"81554acf-6be5-4d95-a73d-6281199cd982","user_phone":""}}	2025-11-14 06:52:01.933121+00	
00000000-0000-0000-0000-000000000000	31603002-703d-4f07-b33c-24b47c788020	{"action":"user_confirmation_requested","actor_id":"682fe40d-69e6-40d9-b01d-acee479843a8","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-14 06:54:25.914919+00	
00000000-0000-0000-0000-000000000000	8d84a9e2-ba1b-48b9-a705-3e3ccc8d3b35	{"action":"user_signedup","actor_id":"682fe40d-69e6-40d9-b01d-acee479843a8","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-14 06:54:50.92082+00	
00000000-0000-0000-0000-000000000000	f91adecf-f1b1-426c-a31b-59aa7e3737ed	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cabatinganlukezichri@gmail.com","user_id":"a2ef1f59-4b2b-4091-a865-1bc02bf630d5","user_phone":""}}	2025-11-14 07:00:05.368253+00	
00000000-0000-0000-0000-000000000000	adaf5016-3f28-4014-99b2-97172df12b2e	{"action":"user_confirmation_requested","actor_id":"6d11dd80-cef6-4d8d-b2c0-5afbd03ded6a","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-14 07:06:22.057682+00	
00000000-0000-0000-0000-000000000000	a026ac47-ff9a-41ef-88ab-99855cfaab0e	{"action":"user_signedup","actor_id":"6d11dd80-cef6-4d8d-b2c0-5afbd03ded6a","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-14 07:06:47.935424+00	
00000000-0000-0000-0000-000000000000	ff157bc5-c3d7-48ec-b5be-11314c2c9091	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cabatinganlukezichri@gmail.com","user_id":"6d11dd80-cef6-4d8d-b2c0-5afbd03ded6a","user_phone":""}}	2025-11-14 07:13:58.74539+00	
00000000-0000-0000-0000-000000000000	7102c378-72a4-4252-b816-1cc5dfaa7510	{"action":"user_confirmation_requested","actor_id":"7a908bff-8443-44a8-a5e0-4ca955695616","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-14 08:38:56.273111+00	
00000000-0000-0000-0000-000000000000	296c68cb-65ad-4a63-b827-284e83c8cc15	{"action":"user_signedup","actor_id":"7a908bff-8443-44a8-a5e0-4ca955695616","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-14 08:39:20.285313+00	
00000000-0000-0000-0000-000000000000	e930c48c-b2cc-4b2e-a87d-f249e7a99f18	{"action":"token_refreshed","actor_id":"7a908bff-8443-44a8-a5e0-4ca955695616","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-14 09:37:42.963473+00	
00000000-0000-0000-0000-000000000000	c05a2f0a-9235-49e0-b570-ba630e8d70df	{"action":"token_revoked","actor_id":"7a908bff-8443-44a8-a5e0-4ca955695616","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-14 09:37:42.978312+00	
00000000-0000-0000-0000-000000000000	c73d2a75-0007-4e88-8fae-4f281492489a	{"action":"token_refreshed","actor_id":"7a908bff-8443-44a8-a5e0-4ca955695616","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-14 11:42:30.900761+00	
00000000-0000-0000-0000-000000000000	cc37016d-fa3e-4b33-96ca-bad5a26aadee	{"action":"token_revoked","actor_id":"7a908bff-8443-44a8-a5e0-4ca955695616","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-14 11:42:30.920929+00	
00000000-0000-0000-0000-000000000000	db74fb19-d99d-45ef-aebd-f855175359c2	{"action":"token_refreshed","actor_id":"7a908bff-8443-44a8-a5e0-4ca955695616","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-14 12:40:34.535202+00	
00000000-0000-0000-0000-000000000000	5f0e8d3f-08b3-4d0b-9c1f-f200ca592e6c	{"action":"token_revoked","actor_id":"7a908bff-8443-44a8-a5e0-4ca955695616","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-14 12:40:34.541398+00	
00000000-0000-0000-0000-000000000000	8197e371-bbe3-4008-9039-2307df188415	{"action":"token_refreshed","actor_id":"7a908bff-8443-44a8-a5e0-4ca955695616","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-14 13:39:04.858999+00	
00000000-0000-0000-0000-000000000000	1a5b6fd5-58fc-4a81-b826-ea4cd4bf0d4c	{"action":"token_revoked","actor_id":"7a908bff-8443-44a8-a5e0-4ca955695616","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-14 13:39:04.864824+00	
00000000-0000-0000-0000-000000000000	5febbf55-1557-49bf-b6f5-b243c5958075	{"action":"token_refreshed","actor_id":"7a908bff-8443-44a8-a5e0-4ca955695616","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-15 00:46:15.257862+00	
00000000-0000-0000-0000-000000000000	432f25b8-7b20-42b2-956e-3b00baeb7cc3	{"action":"token_revoked","actor_id":"7a908bff-8443-44a8-a5e0-4ca955695616","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-15 00:46:15.274211+00	
00000000-0000-0000-0000-000000000000	c5c38036-dc12-4a2e-b843-7882c83db82f	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"cabatinganlukezichri@gmail.com","user_id":"7a908bff-8443-44a8-a5e0-4ca955695616","user_phone":""}}	2025-11-15 00:48:45.104093+00	
00000000-0000-0000-0000-000000000000	35d754cb-89a1-400e-97fc-77a4ece2cf43	{"action":"user_confirmation_requested","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-15 00:49:59.015388+00	
00000000-0000-0000-0000-000000000000	b1d89434-5f47-47ad-a297-ff4b0ad128f3	{"action":"user_signedup","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-15 00:50:14.996973+00	
00000000-0000-0000-0000-000000000000	8c4cd85d-fd60-495b-b57f-d3dfdee6c03b	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-15 00:50:58.550581+00	
00000000-0000-0000-0000-000000000000	735715df-79c3-4fc0-8859-bcd4d5ee8e67	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-15 00:52:22.661226+00	
00000000-0000-0000-0000-000000000000	0c1f2d5c-3b5d-4d6a-a780-35d0bb5b9ba2	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-15 01:23:43.275323+00	
00000000-0000-0000-0000-000000000000	446263da-c4cb-4aa0-94e6-b56a58597312	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-15 10:29:12.884757+00	
00000000-0000-0000-0000-000000000000	c9157e9a-589b-4012-9893-95db0a2c4db6	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-15 10:29:12.893226+00	
00000000-0000-0000-0000-000000000000	97f1b35e-fb13-41b2-afa7-8bbea1ef12ad	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-15 10:29:35.003028+00	
00000000-0000-0000-0000-000000000000	d71f3b75-cd2f-4263-bb49-402cebd36872	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-15 10:43:44.792898+00	
00000000-0000-0000-0000-000000000000	8597acdc-3794-4dbe-a033-00138dc584b5	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-15 11:29:58.208953+00	
00000000-0000-0000-0000-000000000000	45cc8521-ac26-4e34-b804-8961e0939fe6	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-15 12:45:50.721648+00	
00000000-0000-0000-0000-000000000000	36d71f7c-564c-4a20-a0fa-48dff2b79d77	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-15 12:45:50.745608+00	
00000000-0000-0000-0000-000000000000	e37ba617-be6b-42e2-ae34-245a47d97eb6	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-15 12:47:13.322328+00	
00000000-0000-0000-0000-000000000000	b32b6f0e-5ae1-4b29-b813-6d490c98678f	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-15 12:52:38.371869+00	
00000000-0000-0000-0000-000000000000	3c161848-2108-4ea8-a657-9748c0b7dd44	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-15 13:09:50.67853+00	
00000000-0000-0000-0000-000000000000	32516af6-9a49-4161-a730-34ec51c70993	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-15 13:18:31.675164+00	
00000000-0000-0000-0000-000000000000	250f4e1c-03e5-4f88-b507-ae30fb92f776	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"zichri6767@gmail.com","user_id":"682fe40d-69e6-40d9-b01d-acee479843a8","user_phone":""}}	2025-11-15 13:38:32.413034+00	
00000000-0000-0000-0000-000000000000	0272fdbf-bddb-4943-ab28-5b252e8b2df1	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-15 13:42:28.722859+00	
00000000-0000-0000-0000-000000000000	179aa32f-03c0-4736-a2dd-d6d6daeba646	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-15 15:05:49.775449+00	
00000000-0000-0000-0000-000000000000	826d6473-ab6e-4722-9cc2-6753a0e6f366	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-15 15:05:49.802381+00	
00000000-0000-0000-0000-000000000000	6c40289f-83f1-4ddc-b114-78daec11c6c2	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-15 15:07:27.04846+00	
00000000-0000-0000-0000-000000000000	48f08509-789d-4414-bab5-6139e08ddfdb	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-15 15:17:22.091051+00	
00000000-0000-0000-0000-000000000000	96c58587-98f3-4fc8-bdff-7814106e1640	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-15 15:18:21.913317+00	
00000000-0000-0000-0000-000000000000	e9fa56dc-2a9c-4783-bf88-8dd4a6379ce5	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-16 05:21:15.064155+00	
00000000-0000-0000-0000-000000000000	8c1a0e62-54d3-494a-974b-24badf6f6e06	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-16 05:21:15.07286+00	
00000000-0000-0000-0000-000000000000	51cc7ff7-efb0-434f-b8ff-1dd6d639516d	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-16 05:22:28.811632+00	
00000000-0000-0000-0000-000000000000	cc53f5c2-bf16-461f-9a3d-2ee0693cf4cf	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-16 06:20:53.430322+00	
00000000-0000-0000-0000-000000000000	7fcf2d60-7598-4851-b04f-6c11f9362a0f	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-16 06:20:53.43876+00	
00000000-0000-0000-0000-000000000000	03b99d9a-ffa9-4c5f-a3b6-f8b3b9d568b3	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-16 07:19:20.972393+00	
00000000-0000-0000-0000-000000000000	5f748367-cf06-4359-b12a-d304ee3fe6fb	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-16 07:19:20.980865+00	
00000000-0000-0000-0000-000000000000	31c97e8d-8846-4d65-91b2-337965e3b0f1	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rosalesmariche2@gmail.com","user_id":"921153b9-4465-4455-b67e-05a1a07799d2","user_phone":""}}	2025-11-16 07:23:27.860272+00	
00000000-0000-0000-0000-000000000000	b7f64fbb-5de8-4f79-8437-ee61a7c3456d	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-16 08:17:52.503024+00	
00000000-0000-0000-0000-000000000000	bc214897-31d4-434b-b1e7-6bdef5d5f8d1	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-16 08:17:52.531136+00	
00000000-0000-0000-0000-000000000000	3c93e8a9-5c38-4446-96b6-86f8449236cb	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-16 08:57:03.294539+00	
00000000-0000-0000-0000-000000000000	a9e56283-4211-44c7-bb62-dc4a35236b88	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-16 09:03:13.510761+00	
00000000-0000-0000-0000-000000000000	8c16fb07-bf17-4ec3-ad00-2fc4c6120f22	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-16 09:39:30.740794+00	
00000000-0000-0000-0000-000000000000	f419123d-794a-4d33-9869-bc3d65552a7f	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-16 09:45:59.819517+00	
00000000-0000-0000-0000-000000000000	87418780-3df6-4cf6-b771-e69ad0c97122	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-16 09:51:43.804943+00	
00000000-0000-0000-0000-000000000000	9f628c4e-8992-4b20-8694-18d0478cdeef	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-16 09:55:01.607602+00	
00000000-0000-0000-0000-000000000000	c8bedd16-5599-4755-80ae-cc567f435cbb	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-16 09:59:34.879987+00	
00000000-0000-0000-0000-000000000000	5dce9007-84bb-47a2-b3d5-0fc11ba211ac	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-16 10:06:10.530075+00	
00000000-0000-0000-0000-000000000000	2b65f119-a72f-43ae-b103-e780e4432412	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-16 11:04:21.504239+00	
00000000-0000-0000-0000-000000000000	97ff1b17-8c68-4a9b-a972-4f3c3568ae15	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-16 11:04:21.514379+00	
00000000-0000-0000-0000-000000000000	622d8e7f-d31f-43ba-af37-58cf8063a807	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-16 11:30:38.026273+00	
00000000-0000-0000-0000-000000000000	fb376697-48f8-4333-9a24-e31999aeaaa2	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-16 11:36:11.634168+00	
00000000-0000-0000-0000-000000000000	1f94728a-f048-4fb2-9cf4-c0534b9031d1	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-16 11:39:40.442037+00	
00000000-0000-0000-0000-000000000000	bec8d484-cfb3-4cdc-9ac3-36ee6db50f46	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-16 11:52:48.286404+00	
00000000-0000-0000-0000-000000000000	38b44bfc-ac31-4cf2-a741-26417c2d42a1	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-16 11:55:54.934988+00	
00000000-0000-0000-0000-000000000000	39bdde65-a490-470f-a542-6839763410de	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-16 12:06:45.942569+00	
00000000-0000-0000-0000-000000000000	5d01ebd6-5a2a-49c0-9439-bc19d490adef	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-16 12:15:17.55953+00	
00000000-0000-0000-0000-000000000000	887b4665-e8d2-47ae-899c-2b6cd9e4171e	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-16 12:33:40.32477+00	
00000000-0000-0000-0000-000000000000	f86990c6-83be-4db5-829d-6266e44246f4	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-16 12:55:45.252568+00	
00000000-0000-0000-0000-000000000000	23765dd8-e966-424c-9444-86f5e4b18174	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-16 13:09:50.156348+00	
00000000-0000-0000-0000-000000000000	464f5cdf-9484-4b87-9d58-1cb39bddd415	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-16 13:37:21.335297+00	
00000000-0000-0000-0000-000000000000	d30ea444-df17-44ef-afb5-14d5aaced0a4	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-16 14:18:25.902233+00	
00000000-0000-0000-0000-000000000000	4794fdd2-98f5-4808-81b3-6f1314d223e1	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-16 15:01:06.108828+00	
00000000-0000-0000-0000-000000000000	b5f04d15-d972-4354-9233-43da9ed5899a	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-17 00:39:17.652526+00	
00000000-0000-0000-0000-000000000000	a78d6708-af21-479c-a353-6d0234e80c01	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-17 00:39:17.678291+00	
00000000-0000-0000-0000-000000000000	8676692d-e995-4f0e-bccd-c9fcf2c1e95a	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 00:47:22.655284+00	
00000000-0000-0000-0000-000000000000	9fa4bde8-b1fc-4816-96ba-b94ebbd85443	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-17 02:24:58.073957+00	
00000000-0000-0000-0000-000000000000	925365dd-d1fe-4d0f-8381-33dd0babb044	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-17 02:24:58.095613+00	
00000000-0000-0000-0000-000000000000	7e943170-2a46-4e30-ab18-84432b718ca7	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 02:25:21.950442+00	
00000000-0000-0000-0000-000000000000	e79fc6f7-2242-45ce-86d0-41358a31125c	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 04:08:13.425733+00	
00000000-0000-0000-0000-000000000000	5e4da4f7-07d2-4020-b203-682af9e643e2	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 07:35:03.513887+00	
00000000-0000-0000-0000-000000000000	8df73730-e192-41af-aa2d-bf2361ef5d99	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 07:35:35.6571+00	
00000000-0000-0000-0000-000000000000	2071216f-7e8a-4941-ae2d-0044b0c5c31f	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 07:36:10.015559+00	
00000000-0000-0000-0000-000000000000	99c1fdca-52bb-4110-a047-8f2d73501f8f	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 08:01:26.054834+00	
00000000-0000-0000-0000-000000000000	e43aa6ba-194d-4762-9f52-e62dd6e83988	{"action":"user_confirmation_requested","actor_id":"470acaee-8d9a-4efe-aa08-9f575f528053","actor_username":"abcde123@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-17 08:08:53.244138+00	
00000000-0000-0000-0000-000000000000	46fbfcdb-819b-4cb3-b9f8-50caeb6a123a	{"action":"user_confirmation_requested","actor_id":"e315204d-bf6a-4f89-bd15-36dfe7f71638","actor_username":"ohahalabyo@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-17 08:10:27.980251+00	
00000000-0000-0000-0000-000000000000	f1623cbf-a12f-47cd-9454-8cc1ecad8be0	{"action":"user_signedup","actor_id":"e315204d-bf6a-4f89-bd15-36dfe7f71638","actor_username":"ohahalabyo@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-17 08:11:33.127142+00	
00000000-0000-0000-0000-000000000000	e9267ef1-967a-4bf6-bc08-c3c1e489cf77	{"action":"login","actor_id":"e315204d-bf6a-4f89-bd15-36dfe7f71638","actor_username":"ohahalabyo@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 08:14:11.765587+00	
00000000-0000-0000-0000-000000000000	936c0dbe-90be-4aea-b14a-4423a414a036	{"action":"login","actor_id":"e315204d-bf6a-4f89-bd15-36dfe7f71638","actor_username":"ohahalabyo@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 08:31:34.653639+00	
00000000-0000-0000-0000-000000000000	1c774158-6120-4e09-a3ed-3718493e0eef	{"action":"login","actor_id":"e315204d-bf6a-4f89-bd15-36dfe7f71638","actor_username":"ohahalabyo@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 08:31:43.242099+00	
00000000-0000-0000-0000-000000000000	6d813f14-e807-461a-bae1-faab2b285224	{"action":"login","actor_id":"e315204d-bf6a-4f89-bd15-36dfe7f71638","actor_username":"ohahalabyo@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 08:33:18.579686+00	
00000000-0000-0000-0000-000000000000	1e23acd8-e71e-4167-8c1c-0c32a0d4f44b	{"action":"login","actor_id":"e315204d-bf6a-4f89-bd15-36dfe7f71638","actor_username":"ohahalabyo@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 08:35:47.119319+00	
00000000-0000-0000-0000-000000000000	f30cf95f-e5aa-4952-ab4c-d6e0bfd838da	{"action":"user_confirmation_requested","actor_id":"52cd570c-9555-4cc8-b9a0-25578dd1de55","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-17 08:38:59.439875+00	
00000000-0000-0000-0000-000000000000	abeddbab-0af8-4baa-b513-a7f5c968a71a	{"action":"user_signedup","actor_id":"52cd570c-9555-4cc8-b9a0-25578dd1de55","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-17 08:39:14.450209+00	
00000000-0000-0000-0000-000000000000	32e836d1-9c81-4f32-8e87-4211fc320486	{"action":"login","actor_id":"e315204d-bf6a-4f89-bd15-36dfe7f71638","actor_username":"ohahalabyo@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 08:41:11.206623+00	
00000000-0000-0000-0000-000000000000	be55a388-98e2-4d9d-9029-77b6d40536f2	{"action":"login","actor_id":"52cd570c-9555-4cc8-b9a0-25578dd1de55","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 08:42:32.403838+00	
00000000-0000-0000-0000-000000000000	66aa5d86-939f-42ce-848a-27b0046031fe	{"action":"user_confirmation_requested","actor_id":"b51354b7-74cf-4a2b-ad3f-3ec6543f1592","actor_username":"kentdominic2004@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-17 09:31:59.084004+00	
00000000-0000-0000-0000-000000000000	913506b3-d280-4d47-97c0-b76a60118b38	{"action":"user_signedup","actor_id":"b51354b7-74cf-4a2b-ad3f-3ec6543f1592","actor_username":"kentdominic2004@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-17 09:32:21.698905+00	
00000000-0000-0000-0000-000000000000	a1002524-fd13-4ffc-b8da-bf32c94a398a	{"action":"login","actor_id":"b51354b7-74cf-4a2b-ad3f-3ec6543f1592","actor_username":"kentdominic2004@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 09:33:12.21377+00	
00000000-0000-0000-0000-000000000000	3ad3ea34-30cd-4baf-9183-e0ba4927c106	{"action":"login","actor_id":"b51354b7-74cf-4a2b-ad3f-3ec6543f1592","actor_username":"kentdominic2004@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 09:54:54.82882+00	
00000000-0000-0000-0000-000000000000	511e7991-6d0e-4857-9b77-4d9a1cf24363	{"action":"token_refreshed","actor_id":"52cd570c-9555-4cc8-b9a0-25578dd1de55","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-17 10:27:39.459435+00	
00000000-0000-0000-0000-000000000000	ce8fa5d6-4019-4cb2-b0ec-a45a0d46a122	{"action":"token_revoked","actor_id":"52cd570c-9555-4cc8-b9a0-25578dd1de55","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-17 10:27:39.469203+00	
00000000-0000-0000-0000-000000000000	0c56babd-f1d3-4483-9667-d3f7d2554501	{"action":"token_refreshed","actor_id":"52cd570c-9555-4cc8-b9a0-25578dd1de55","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-17 11:28:57.771249+00	
00000000-0000-0000-0000-000000000000	b60d9243-c9d3-4dad-a92f-6b32548d8327	{"action":"token_revoked","actor_id":"52cd570c-9555-4cc8-b9a0-25578dd1de55","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-17 11:28:57.793553+00	
00000000-0000-0000-0000-000000000000	537cd09b-c88a-427e-8d67-54dfbc1d8de2	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 11:29:05.382653+00	
00000000-0000-0000-0000-000000000000	9c5e3c47-6c39-4735-a5f3-8894999ae2d6	{"action":"token_refreshed","actor_id":"e315204d-bf6a-4f89-bd15-36dfe7f71638","actor_username":"ohahalabyo@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-17 11:32:07.846386+00	
00000000-0000-0000-0000-000000000000	668a9698-25ab-4a83-9e56-27c09681ca7b	{"action":"token_revoked","actor_id":"e315204d-bf6a-4f89-bd15-36dfe7f71638","actor_username":"ohahalabyo@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-17 11:32:07.84968+00	
00000000-0000-0000-0000-000000000000	af8624ef-3c45-4bf1-815c-8552d347886d	{"action":"login","actor_id":"e315204d-bf6a-4f89-bd15-36dfe7f71638","actor_username":"ohahalabyo@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 11:32:18.400968+00	
00000000-0000-0000-0000-000000000000	df7ca495-6bfb-49e1-8319-634bf65ed7b9	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rosalesmariche2@gmail.com","user_id":"52cd570c-9555-4cc8-b9a0-25578dd1de55","user_phone":""}}	2025-11-17 12:51:53.182222+00	
00000000-0000-0000-0000-000000000000	856787bb-a791-46e4-a44a-80711479e8f1	{"action":"user_confirmation_requested","actor_id":"cf94ad14-8ae5-4f75-8e91-03f511efa4ff","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-17 12:53:12.963507+00	
00000000-0000-0000-0000-000000000000	220d81a9-c648-44bf-a799-d3ba54dee611	{"action":"user_signedup","actor_id":"cf94ad14-8ae5-4f75-8e91-03f511efa4ff","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-17 12:53:34.659481+00	
00000000-0000-0000-0000-000000000000	b15ffb05-d8d3-4fc1-8a57-09fa0360cbb9	{"action":"login","actor_id":"cf94ad14-8ae5-4f75-8e91-03f511efa4ff","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 13:24:20.894755+00	
00000000-0000-0000-0000-000000000000	dbabfd2b-725c-4189-8f3e-66fd55ccd828	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-18 11:23:02.092143+00	
00000000-0000-0000-0000-000000000000	bab265a6-bc66-4b28-9d6d-bf01fdb670b4	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rosalesmariche2@gmail.com","user_id":"cf94ad14-8ae5-4f75-8e91-03f511efa4ff","user_phone":""}}	2025-11-17 13:47:50.105957+00	
00000000-0000-0000-0000-000000000000	29691848-d39f-4656-a211-8e2418657bf5	{"action":"user_confirmation_requested","actor_id":"a7ad0ae9-c04a-478b-a157-a016ba4dd1d2","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-17 13:49:18.057746+00	
00000000-0000-0000-0000-000000000000	a3c25c11-f2db-47f1-b4b4-9e0317eda63e	{"action":"user_signedup","actor_id":"a7ad0ae9-c04a-478b-a157-a016ba4dd1d2","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-17 13:49:42.322305+00	
00000000-0000-0000-0000-000000000000	0cb920f6-3151-4fd7-b8df-3cad9d85916f	{"action":"token_refreshed","actor_id":"a7ad0ae9-c04a-478b-a157-a016ba4dd1d2","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-17 14:47:57.226027+00	
00000000-0000-0000-0000-000000000000	19f33983-ddfd-4a4a-a874-f89f167470c0	{"action":"token_revoked","actor_id":"a7ad0ae9-c04a-478b-a157-a016ba4dd1d2","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-17 14:47:57.238126+00	
00000000-0000-0000-0000-000000000000	6f4313d3-09ca-4957-b139-4e12171ffe22	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 15:13:57.580519+00	
00000000-0000-0000-0000-000000000000	cea72091-16e3-4139-a461-d4e04b6b285e	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 15:29:22.265839+00	
00000000-0000-0000-0000-000000000000	a4109f5c-5cd7-4468-8138-296d0556a894	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 15:35:02.719633+00	
00000000-0000-0000-0000-000000000000	6f7e6703-8156-4a77-a9d1-47d5f4cd5e57	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 16:06:11.510081+00	
00000000-0000-0000-0000-000000000000	16c193c2-d9b2-4318-82ea-924d56668ac9	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 16:16:52.386967+00	
00000000-0000-0000-0000-000000000000	219cdd6f-796d-4e35-86e1-5f10de28e026	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-17 16:18:22.144482+00	
00000000-0000-0000-0000-000000000000	abf28e37-d993-4e4e-a8e9-e13250703984	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-17 16:18:22.147346+00	
00000000-0000-0000-0000-000000000000	c25b4403-2e36-4c4d-a7f1-11bcddfc12c5	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 16:29:13.262833+00	
00000000-0000-0000-0000-000000000000	edf71f9f-ebe3-46a5-873e-95f5de1fa7b4	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 16:38:34.576812+00	
00000000-0000-0000-0000-000000000000	573d0d85-a7c6-43b6-863f-4ce990c22af0	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-17 23:44:08.50965+00	
00000000-0000-0000-0000-000000000000	015594cc-aae2-462f-9865-49f55cdf3e47	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-17 23:44:08.533934+00	
00000000-0000-0000-0000-000000000000	4c1e6125-649b-4b41-9799-278966667a55	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 23:45:27.424346+00	
00000000-0000-0000-0000-000000000000	52faa383-42ed-48c0-ac9a-a6b64744242f	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-17 23:52:01.243537+00	
00000000-0000-0000-0000-000000000000	58bb5606-c8d4-49a4-96e4-ab8109ffdba9	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-18 08:03:38.101117+00	
00000000-0000-0000-0000-000000000000	465786e2-8a4b-4055-a997-0c79c105f000	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-18 08:03:38.123796+00	
00000000-0000-0000-0000-000000000000	93b76e24-76e0-4fa3-9606-6d3b3b8631b3	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-18 09:01:42.195436+00	
00000000-0000-0000-0000-000000000000	ae57b699-8bae-49a9-b8f7-2943b2e40e89	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-18 09:01:42.211491+00	
00000000-0000-0000-0000-000000000000	6a3d645f-c296-40d1-b9a2-cd91b86a9fa4	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-18 09:07:29.717565+00	
00000000-0000-0000-0000-000000000000	beb95e45-4a7b-424e-a69e-c50aac8db23b	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-18 09:11:46.969439+00	
00000000-0000-0000-0000-000000000000	72a73647-3c69-4279-8112-a4afa91c938b	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-18 09:47:30.113099+00	
00000000-0000-0000-0000-000000000000	c2f7f0e0-5a72-471d-93e7-c835771cbf32	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-18 09:51:17.494136+00	
00000000-0000-0000-0000-000000000000	cc2b74e2-fc38-4a70-9259-23ad7c7cd95a	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-18 09:57:12.440612+00	
00000000-0000-0000-0000-000000000000	841893ec-a9a2-4028-9014-8802576274f9	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-18 10:05:39.086601+00	
00000000-0000-0000-0000-000000000000	907af624-a1f0-47eb-8b7f-8824552657ae	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-18 11:03:54.778427+00	
00000000-0000-0000-0000-000000000000	4542e08f-01e3-4bf6-a90a-fc1f5b238550	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-18 11:03:54.801184+00	
00000000-0000-0000-0000-000000000000	858f5144-f253-4343-a633-254eb41f2483	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-18 11:44:47.870666+00	
00000000-0000-0000-0000-000000000000	32a6aac0-20f2-40d8-a36c-8d432f7ec056	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-18 12:42:49.506368+00	
00000000-0000-0000-0000-000000000000	8534bc57-efb6-420f-8c5c-e7bdeb69a13b	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-18 12:42:49.516405+00	
00000000-0000-0000-0000-000000000000	9821c057-00e2-4b80-962d-6222cae29482	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-18 13:40:51.721275+00	
00000000-0000-0000-0000-000000000000	9a7efcd8-0d07-44c1-a9bf-5f5c5329683b	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-18 13:40:51.738309+00	
00000000-0000-0000-0000-000000000000	cc5e203b-aebc-4f8c-a74e-33f46c15f2f7	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-18 14:38:53.533274+00	
00000000-0000-0000-0000-000000000000	e0d41f8b-9242-4b80-a0db-1c012d7ccb5e	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-18 14:38:53.561921+00	
00000000-0000-0000-0000-000000000000	036274c0-76d4-4ff4-81dd-37a64a9ec551	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-18 15:48:04.036688+00	
00000000-0000-0000-0000-000000000000	d2d3586a-f390-4dad-917a-54b5e7c1b3be	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-18 15:48:04.057953+00	
00000000-0000-0000-0000-000000000000	5331f0ab-07dc-42b6-a78f-7d59449cd66a	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-18 16:07:41.062143+00	
00000000-0000-0000-0000-000000000000	7ad295ba-6326-4eb2-bc9a-2d2bd34c724b	{"action":"login","actor_id":"a7ad0ae9-c04a-478b-a157-a016ba4dd1d2","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-18 16:08:03.146809+00	
00000000-0000-0000-0000-000000000000	c7c656e3-a2c3-4f76-ab56-44fb1140de3e	{"action":"login","actor_id":"a7ad0ae9-c04a-478b-a157-a016ba4dd1d2","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-18 16:25:16.441128+00	
00000000-0000-0000-0000-000000000000	be5a5e29-b820-412d-93e9-7b037374ac21	{"action":"logout","actor_id":"a7ad0ae9-c04a-478b-a157-a016ba4dd1d2","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-18 16:25:55.794605+00	
00000000-0000-0000-0000-000000000000	89a2f59f-e25a-4a43-985f-434298fcf0ef	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rosalesmariche2@gmail.com","user_id":"a7ad0ae9-c04a-478b-a157-a016ba4dd1d2","user_phone":""}}	2025-11-18 16:44:01.229647+00	
00000000-0000-0000-0000-000000000000	85c29f0e-8f9c-4ddd-86e4-f2390a0c3959	{"action":"user_confirmation_requested","actor_id":"5aef129a-e969-4868-8d10-b98320caa1af","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-18 16:45:06.156149+00	
00000000-0000-0000-0000-000000000000	2880a505-972b-4c52-a358-f6251407c6d7	{"action":"user_signedup","actor_id":"5aef129a-e969-4868-8d10-b98320caa1af","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-18 16:45:24.462069+00	
00000000-0000-0000-0000-000000000000	9e438637-d536-4d50-9f0e-6c7db9ae663b	{"action":"login","actor_id":"5aef129a-e969-4868-8d10-b98320caa1af","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-18 16:49:58.931623+00	
00000000-0000-0000-0000-000000000000	c8d81940-6eda-466e-aed4-0bfcb0a1bf22	{"action":"login","actor_id":"5aef129a-e969-4868-8d10-b98320caa1af","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-18 16:56:38.053133+00	
00000000-0000-0000-0000-000000000000	df1bc2bd-e6a5-461e-8000-df31e996d91c	{"action":"token_refreshed","actor_id":"5aef129a-e969-4868-8d10-b98320caa1af","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-18 23:49:38.100617+00	
00000000-0000-0000-0000-000000000000	52aefa9a-90af-4088-972f-2f5a2089cf27	{"action":"token_revoked","actor_id":"5aef129a-e969-4868-8d10-b98320caa1af","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-18 23:49:38.112335+00	
00000000-0000-0000-0000-000000000000	7f0a0ed4-dfa1-4368-8a27-1266c0329df4	{"action":"login","actor_id":"5aef129a-e969-4868-8d10-b98320caa1af","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-18 23:50:14.328884+00	
00000000-0000-0000-0000-000000000000	5040580d-95ce-4a2a-845e-998964c384cd	{"action":"logout","actor_id":"5aef129a-e969-4868-8d10-b98320caa1af","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-18 23:52:59.852052+00	
00000000-0000-0000-0000-000000000000	db750167-a3be-4e39-9428-c9038133ee75	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-18 23:53:15.517455+00	
00000000-0000-0000-0000-000000000000	ea74a309-2494-443a-a6dd-c0ada2dff7a0	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 00:11:11.028567+00	
00000000-0000-0000-0000-000000000000	c4ce03e9-7890-4ef0-a8e7-afb521457c23	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rosalesmariche2@gmail.com","user_id":"5aef129a-e969-4868-8d10-b98320caa1af","user_phone":""}}	2025-11-19 00:11:53.407222+00	
00000000-0000-0000-0000-000000000000	e83792c7-7b6d-44a2-acef-90da2e4d34cb	{"action":"user_confirmation_requested","actor_id":"650c6f24-8201-4f16-96fb-3186965ec392","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-19 00:24:43.094691+00	
00000000-0000-0000-0000-000000000000	43f0aa93-a0ce-4302-aac7-a10b40ff2c68	{"action":"user_signedup","actor_id":"650c6f24-8201-4f16-96fb-3186965ec392","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-19 00:25:07.484756+00	
00000000-0000-0000-0000-000000000000	6df82fb3-bd15-438b-9eb7-7674e64d37b1	{"action":"logout","actor_id":"650c6f24-8201-4f16-96fb-3186965ec392","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-19 00:31:14.417163+00	
00000000-0000-0000-0000-000000000000	c442bb5b-ccb4-40c4-9ff7-08e3a5ccf52c	{"action":"login","actor_id":"650c6f24-8201-4f16-96fb-3186965ec392","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 00:38:10.135277+00	
00000000-0000-0000-0000-000000000000	14f9f53c-e6f7-4b48-bb73-8be392785ca7	{"action":"login","actor_id":"650c6f24-8201-4f16-96fb-3186965ec392","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 00:42:54.636745+00	
00000000-0000-0000-0000-000000000000	3fdbd4a0-149b-44c6-ae3f-a8bca72b3d60	{"action":"logout","actor_id":"650c6f24-8201-4f16-96fb-3186965ec392","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-19 00:46:06.021529+00	
00000000-0000-0000-0000-000000000000	00b198cf-8d6b-4917-a461-0ad0b1a72fe5	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 00:46:22.615835+00	
00000000-0000-0000-0000-000000000000	03df198e-7f9b-4058-a44e-b633b862fdfa	{"action":"login","actor_id":"650c6f24-8201-4f16-96fb-3186965ec392","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 00:55:06.860622+00	
00000000-0000-0000-0000-000000000000	92a8be4c-b637-4f55-ac8e-4c71a56940fa	{"action":"logout","actor_id":"650c6f24-8201-4f16-96fb-3186965ec392","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-19 00:55:12.143698+00	
00000000-0000-0000-0000-000000000000	c21db6dc-c1c6-472f-b50e-f854e6e632e5	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 00:55:43.973096+00	
00000000-0000-0000-0000-000000000000	bf8a7d61-7ab4-4160-9c2e-8dd4559ebbdd	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 01:06:16.775837+00	
00000000-0000-0000-0000-000000000000	520bec5a-796e-4603-bdd6-24a8acc89aca	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 01:34:08.055165+00	
00000000-0000-0000-0000-000000000000	1faa401f-6dfd-49b8-bda7-83f2ef8fd4bb	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 01:35:15.927399+00	
00000000-0000-0000-0000-000000000000	45eb805c-a650-4bad-9601-ad7af87f1208	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 01:40:03.604815+00	
00000000-0000-0000-0000-000000000000	52a35517-4699-4615-9d3b-527c6b18ee5b	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 01:56:40.329478+00	
00000000-0000-0000-0000-000000000000	488e7044-8727-47d0-b869-ccb517e3dcf7	{"action":"login","actor_id":"650c6f24-8201-4f16-96fb-3186965ec392","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 01:59:36.055343+00	
00000000-0000-0000-0000-000000000000	782366bf-edc9-4d3f-95db-d151ff1dac8b	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 02:41:11.924477+00	
00000000-0000-0000-0000-000000000000	2cf40acf-7c6c-4ab4-9c13-4c90776b40ac	{"action":"login","actor_id":"650c6f24-8201-4f16-96fb-3186965ec392","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 02:55:03.013865+00	
00000000-0000-0000-0000-000000000000	aabd5472-f95b-4d40-8ea4-afadb179c639	{"action":"logout","actor_id":"650c6f24-8201-4f16-96fb-3186965ec392","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-19 03:01:22.377438+00	
00000000-0000-0000-0000-000000000000	be8002bd-bed6-4609-9555-d9bfceed262b	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 03:01:39.847742+00	
00000000-0000-0000-0000-000000000000	a01db4f6-40d2-4b6c-a4e9-7a65417ccda9	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rosalesmariche2@gmail.com","user_id":"650c6f24-8201-4f16-96fb-3186965ec392","user_phone":""}}	2025-11-19 03:07:23.314343+00	
00000000-0000-0000-0000-000000000000	aecce75e-6dba-4895-80e1-67c2f9bf6f12	{"action":"user_confirmation_requested","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-19 03:10:38.653058+00	
00000000-0000-0000-0000-000000000000	1964da0b-016d-4f72-94e3-bbc9768da841	{"action":"user_signedup","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-19 03:11:13.004361+00	
00000000-0000-0000-0000-000000000000	a216ec84-83f0-4fa1-b7e2-3260e031afbf	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 03:18:57.517633+00	
00000000-0000-0000-0000-000000000000	fb9d23d0-7c76-434e-90aa-5c958a88e3d1	{"action":"logout","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-19 03:21:19.59888+00	
00000000-0000-0000-0000-000000000000	e70e042a-b5a4-4597-b4ce-13c9344b9ae2	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 03:21:34.328454+00	
00000000-0000-0000-0000-000000000000	014e13f7-2b0e-4562-b4db-97fe8f110751	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 03:55:53.354089+00	
00000000-0000-0000-0000-000000000000	1ec029d5-0255-4ad2-bd80-88b4d7307f3c	{"action":"logout","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-19 03:56:03.873287+00	
00000000-0000-0000-0000-000000000000	0808bc31-0b1f-43e7-8cdc-31420db2fdce	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 03:56:36.40373+00	
00000000-0000-0000-0000-000000000000	89750c22-2a5d-40c2-8eb4-dedc63575c9f	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 03:57:39.089045+00	
00000000-0000-0000-0000-000000000000	fd40a88e-93bd-4e3f-948c-062c44458006	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 04:07:07.824539+00	
00000000-0000-0000-0000-000000000000	6799e08a-e6cd-4ce2-8200-05aefc4593ad	{"action":"logout","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-19 04:07:49.141561+00	
00000000-0000-0000-0000-000000000000	b2ce0af7-bcf5-4713-b32b-cad9231d8072	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 04:08:06.033087+00	
00000000-0000-0000-0000-000000000000	d095202f-eea7-4ac1-81c4-0c751d9b4042	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 04:17:55.529521+00	
00000000-0000-0000-0000-000000000000	7d313268-0e65-41a0-823c-c5d86cbef3b6	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 04:20:14.305354+00	
00000000-0000-0000-0000-000000000000	82333483-3acc-4b28-a281-fe110ef6366a	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 04:23:44.514255+00	
00000000-0000-0000-0000-000000000000	53887ad7-2f73-4530-ac51-bafbc457a49e	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 04:32:46.79645+00	
00000000-0000-0000-0000-000000000000	7e14a7a7-c28b-47d8-b6b0-4f3c6843a3f4	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 04:40:31.55237+00	
00000000-0000-0000-0000-000000000000	85379bb0-34ab-484e-b3d3-b61c892ec1c9	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 04:41:11.519471+00	
00000000-0000-0000-0000-000000000000	6ee02d5b-69ee-4cf0-a682-71f4d94dd6f2	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 04:54:10.564828+00	
00000000-0000-0000-0000-000000000000	7cb0660f-1efa-4576-996d-0e47063e23d6	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 04:55:12.560825+00	
00000000-0000-0000-0000-000000000000	a4eb9857-9403-4376-9245-d30e00ac6350	{"action":"logout","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-19 04:55:28.488678+00	
00000000-0000-0000-0000-000000000000	0b2f7b71-8a9b-431c-9ed0-a365e14d3d3b	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 04:55:41.919322+00	
00000000-0000-0000-0000-000000000000	91132d44-c8e5-4864-8c01-408f0a0bbc1a	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 04:56:16.005315+00	
00000000-0000-0000-0000-000000000000	b03c4489-9ecd-48e9-9027-0b1cba353f17	{"action":"logout","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-19 04:56:32.537703+00	
00000000-0000-0000-0000-000000000000	4f58b9ee-c2b2-49bb-9468-43450d84a1a0	{"action":"user_confirmation_requested","actor_id":"92548ce1-e669-4be6-8135-7abbbbcca876","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-19 07:36:13.658702+00	
00000000-0000-0000-0000-000000000000	5f24c475-04c8-46d0-8d63-0d28cb7730e7	{"action":"user_signedup","actor_id":"92548ce1-e669-4be6-8135-7abbbbcca876","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-19 07:36:30.830642+00	
00000000-0000-0000-0000-000000000000	50612d45-ec80-4c09-9622-19f227282d73	{"action":"logout","actor_id":"92548ce1-e669-4be6-8135-7abbbbcca876","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-19 07:37:15.828323+00	
00000000-0000-0000-0000-000000000000	b757911b-e8b6-4b70-8d55-8141f2e22355	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 07:37:30.667759+00	
00000000-0000-0000-0000-000000000000	ca99be06-7068-4d2f-bb5d-24fd654465a4	{"action":"login","actor_id":"92548ce1-e669-4be6-8135-7abbbbcca876","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 07:38:22.38489+00	
00000000-0000-0000-0000-000000000000	6ce00c59-0079-42a1-8843-ff6075da331e	{"action":"logout","actor_id":"92548ce1-e669-4be6-8135-7abbbbcca876","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-19 07:40:02.667527+00	
00000000-0000-0000-0000-000000000000	2980f731-4e5f-4ab2-b8c3-5b9a26859902	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 07:40:25.269517+00	
00000000-0000-0000-0000-000000000000	94a0ee6c-7c84-42a5-b69d-55197c78a304	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 08:20:20.081425+00	
00000000-0000-0000-0000-000000000000	f49ba51b-0126-46bf-bad0-e4db226a1bd9	{"action":"token_refreshed","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-19 09:34:40.353165+00	
00000000-0000-0000-0000-000000000000	035cba46-fd22-40a2-902f-e901db7267db	{"action":"token_revoked","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-19 09:34:40.372711+00	
00000000-0000-0000-0000-000000000000	649d21be-7ed0-4324-8e0c-94f07656b223	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 09:34:58.025695+00	
00000000-0000-0000-0000-000000000000	eb95178a-a9c5-4ca3-8d00-65b58603261e	{"action":"logout","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-19 10:11:25.005834+00	
00000000-0000-0000-0000-000000000000	e5b64814-7b75-4623-94b0-ae8972eeca1f	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 10:11:44.015905+00	
00000000-0000-0000-0000-000000000000	cb98f21c-e7fc-4c05-9d59-d9acac72ee76	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 10:28:17.020318+00	
00000000-0000-0000-0000-000000000000	0fc2588a-3852-481c-98e6-32340abcd366	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 10:31:50.569564+00	
00000000-0000-0000-0000-000000000000	ba37cc78-6e23-4769-be04-74200cd0cc8a	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 13:13:45.408348+00	
00000000-0000-0000-0000-000000000000	325a1553-de63-4bd5-9b71-443176479d52	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 13:14:50.738091+00	
00000000-0000-0000-0000-000000000000	77ce875e-c188-43c5-9792-74c9f312d11e	{"action":"logout","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-19 13:15:28.141306+00	
00000000-0000-0000-0000-000000000000	7f657f73-60eb-4200-bb40-3b096e55e03f	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 13:15:36.900965+00	
00000000-0000-0000-0000-000000000000	70b6419d-10fa-4831-86e5-a113c80ea71b	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-19 13:30:50.906108+00	
00000000-0000-0000-0000-000000000000	11f085e0-aa28-4924-b7af-ec267e882ef8	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-19 13:30:50.91688+00	
00000000-0000-0000-0000-000000000000	bfbb8b98-dd0e-4efa-bc6f-a285e23393ba	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 13:31:18.894298+00	
00000000-0000-0000-0000-000000000000	8790aae7-2191-48e2-9323-00cd2c7a333e	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-19 13:47:58.488037+00	
00000000-0000-0000-0000-000000000000	11b27d0b-bbaa-4626-aee4-4138f35a9120	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-20 00:25:45.959678+00	
00000000-0000-0000-0000-000000000000	4e178662-c139-40c5-88e0-d41b17c7898c	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-20 00:25:45.986557+00	
00000000-0000-0000-0000-000000000000	0c3b358b-9632-4dc8-88f1-dfc35fa2d6ad	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 00:26:14.766514+00	
00000000-0000-0000-0000-000000000000	81ee6f55-a7f4-4f88-9ba1-d1b6a2dc75cf	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 00:30:47.681163+00	
00000000-0000-0000-0000-000000000000	a449298c-57fb-417a-a3d8-20e281a05343	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 00:38:31.89191+00	
00000000-0000-0000-0000-000000000000	25ea98f3-25fe-4000-994b-e7d7543cc2ad	{"action":"logout","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-20 00:39:42.546555+00	
00000000-0000-0000-0000-000000000000	fbca9513-21db-44ab-89ba-39aad22023bb	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 00:39:48.226057+00	
00000000-0000-0000-0000-000000000000	7bb70c6f-df87-4df8-a832-98cc5727af7e	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 00:58:25.844829+00	
00000000-0000-0000-0000-000000000000	33928549-d8ed-4491-93ef-81f4da044b4b	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 01:04:50.683557+00	
00000000-0000-0000-0000-000000000000	b4cb67f4-f915-459d-bf7d-1fc0b78f9fe2	{"action":"login","actor_id":"b51354b7-74cf-4a2b-ad3f-3ec6543f1592","actor_username":"kentdominic2004@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 01:26:29.419099+00	
00000000-0000-0000-0000-000000000000	67e357cb-c800-4cef-8e77-f4ed75edaca8	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 01:28:06.992273+00	
00000000-0000-0000-0000-000000000000	3e3c762b-3b1d-4e15-b623-0fd4e46be17b	{"action":"login","actor_id":"b51354b7-74cf-4a2b-ad3f-3ec6543f1592","actor_username":"kentdominic2004@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 01:30:38.590127+00	
00000000-0000-0000-0000-000000000000	079be7ca-76df-4151-98b4-5e7d1aa1234e	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-20 09:19:55.053113+00	
00000000-0000-0000-0000-000000000000	e57ae683-ed7c-414a-aa4a-77c1f36c13d6	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-20 09:19:55.080917+00	
00000000-0000-0000-0000-000000000000	35bd9ece-d70b-42fa-9051-60843ddae345	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 09:22:03.064444+00	
00000000-0000-0000-0000-000000000000	d7f42649-c45f-486c-aa4e-f7ba306b584f	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 09:23:24.086664+00	
00000000-0000-0000-0000-000000000000	cfe25fc1-879f-4f5f-b589-3bd97b9ba2f2	{"action":"token_refreshed","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-20 10:21:27.903555+00	
00000000-0000-0000-0000-000000000000	d6f506de-c40a-4eca-89d2-16fc5547e1a2	{"action":"token_revoked","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-20 10:21:27.924962+00	
00000000-0000-0000-0000-000000000000	457e3824-e574-474e-9c8e-a1a1ad0e285e	{"action":"token_refreshed","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-20 11:19:30.640657+00	
00000000-0000-0000-0000-000000000000	f9ed0a27-f88a-4703-9861-91208cd5b74b	{"action":"token_revoked","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-20 11:19:30.666516+00	
00000000-0000-0000-0000-000000000000	c5396acc-924c-40f6-b896-e8b84f0849bb	{"action":"token_refreshed","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-20 12:17:32.882013+00	
00000000-0000-0000-0000-000000000000	53dca753-0d29-40e9-b2e0-912db67990cb	{"action":"token_revoked","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-20 12:17:32.893711+00	
00000000-0000-0000-0000-000000000000	2be2bbbd-8afa-4faa-916a-17d30f1ec3d1	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 12:33:58.869502+00	
00000000-0000-0000-0000-000000000000	adae5949-218f-4019-9554-c065a47aa883	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 12:35:46.104006+00	
00000000-0000-0000-0000-000000000000	0590a633-b4dd-4b20-9c6f-97df76205063	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 12:55:24.626626+00	
00000000-0000-0000-0000-000000000000	dca36b8a-116a-4c7c-a353-16936d27c657	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 13:43:04.174686+00	
00000000-0000-0000-0000-000000000000	1c1bb4b9-ad8a-40dc-a821-8af2c1057416	{"action":"token_refreshed","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-20 14:41:23.869619+00	
00000000-0000-0000-0000-000000000000	504dee1c-ee8c-4ad1-a3b0-54a7afee516d	{"action":"token_revoked","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-20 14:41:23.89613+00	
00000000-0000-0000-0000-000000000000	f6a8d5e9-c949-4f7d-8e87-45519d969591	{"action":"token_refreshed","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-20 16:23:28.538824+00	
00000000-0000-0000-0000-000000000000	da661ef2-699f-4db4-a05f-7f8c9a95c25d	{"action":"token_revoked","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-20 16:23:28.569733+00	
00000000-0000-0000-0000-000000000000	3c8fe7bf-fdf1-469b-a417-36b5c29f0734	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 16:44:48.768334+00	
00000000-0000-0000-0000-000000000000	807cd4f3-27e3-4259-b48c-376b328eb2b9	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-20 17:28:47.243094+00	
00000000-0000-0000-0000-000000000000	b85109b5-70e6-488e-b4bb-55a8a665546e	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-20 17:28:47.261582+00	
00000000-0000-0000-0000-000000000000	5f4681ed-62c7-4bc2-8075-277b548e71e2	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 17:28:54.82353+00	
00000000-0000-0000-0000-000000000000	3b82c3fa-6716-4bc5-95c5-ae3b8df3f630	{"action":"logout","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-20 17:31:39.901043+00	
00000000-0000-0000-0000-000000000000	a798bae1-b737-4ac7-9239-2a44a0818638	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 17:31:48.664738+00	
00000000-0000-0000-0000-000000000000	4abbcc84-b70f-49fc-8089-73daa3f4c462	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 17:56:10.683506+00	
00000000-0000-0000-0000-000000000000	ae105458-7483-4e9e-8a9b-54ba640ad78c	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 18:23:20.892156+00	
00000000-0000-0000-0000-000000000000	1a84b32c-3a1c-41d8-a7f7-c5b868dbf6e2	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 18:57:31.175113+00	
00000000-0000-0000-0000-000000000000	133fa240-d397-43f5-9a6a-81798928126a	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 19:04:35.527587+00	
00000000-0000-0000-0000-000000000000	1bf2fe35-9b3f-4955-a61f-d9dac687fd30	{"action":"logout","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-20 19:06:49.827592+00	
00000000-0000-0000-0000-000000000000	17684ea5-7125-452d-ab59-d1431a1c5153	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 19:07:09.164637+00	
00000000-0000-0000-0000-000000000000	df811bb3-5e53-4cae-9a17-07343f54aabe	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 19:23:30.348044+00	
00000000-0000-0000-0000-000000000000	0c54d3a5-d9a4-4b4a-bfbb-4aab5bb9b511	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-20 20:00:54.547124+00	
00000000-0000-0000-0000-000000000000	6be4d8f4-02c8-4cc5-85e5-e63d87326c7a	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-20 20:00:54.56197+00	
00000000-0000-0000-0000-000000000000	3a7d59da-bf2a-4ed6-bf8d-1b22e9a969e6	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-20 20:01:05.399437+00	
00000000-0000-0000-0000-000000000000	d887919f-fc25-4a1b-a464-a340cfc1b723	{"action":"logout","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-20 20:02:06.261786+00	
00000000-0000-0000-0000-000000000000	8b593230-1523-493a-a5d8-7b64631a86ea	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 03:11:49.419868+00	
00000000-0000-0000-0000-000000000000	bd638e7a-cd37-46be-acae-0554e4c297e3	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 03:37:58.747917+00	
00000000-0000-0000-0000-000000000000	00a2fa62-07cb-4d45-9d5d-3b0fc06396f2	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 03:49:00.500721+00	
00000000-0000-0000-0000-000000000000	4f557d3f-cbb2-4da6-9349-7499bc418265	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 04:11:05.220772+00	
00000000-0000-0000-0000-000000000000	f69f7f42-7d75-4b55-a977-5fdcbf001af6	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 07:56:23.704961+00	
00000000-0000-0000-0000-000000000000	b17a7eef-9fd9-4886-af15-de2fc601244c	{"action":"login","actor_id":"b51354b7-74cf-4a2b-ad3f-3ec6543f1592","actor_username":"kentdominic2004@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 07:59:04.992264+00	
00000000-0000-0000-0000-000000000000	81a59aa5-f2d0-4773-baee-cbba8d7e928e	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 08:00:35.183624+00	
00000000-0000-0000-0000-000000000000	dde826c0-bd5f-43a1-aba2-ebb232d4b1b4	{"action":"logout","actor_id":"b51354b7-74cf-4a2b-ad3f-3ec6543f1592","actor_username":"kentdominic2004@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-21 08:02:29.273879+00	
00000000-0000-0000-0000-000000000000	670a5b8c-b278-44b3-99eb-82bb3bc1ac8b	{"action":"logout","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-21 08:02:29.51683+00	
00000000-0000-0000-0000-000000000000	7069a106-e914-4734-8a8e-599a2fcbc4d9	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 08:02:45.853978+00	
00000000-0000-0000-0000-000000000000	bb4a1585-0172-48c5-8882-c996a8666bc3	{"action":"login","actor_id":"b51354b7-74cf-4a2b-ad3f-3ec6543f1592","actor_username":"kentdominic2004@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 08:02:48.05144+00	
00000000-0000-0000-0000-000000000000	936cab79-e7bd-4371-b46d-e990919205bc	{"action":"logout","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-21 08:05:06.739901+00	
00000000-0000-0000-0000-000000000000	f2a14fd0-e052-4c48-9aa2-5aa0ee2b362b	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 08:05:24.632374+00	
00000000-0000-0000-0000-000000000000	435f6dd0-0f3c-412b-a42a-41c952aa06bb	{"action":"user_confirmation_requested","actor_id":"e23859ec-1c83-4db9-8e52-5d5d8dd035b0","actor_username":"jamesanthonyjuntilla@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-21 08:08:56.88366+00	
00000000-0000-0000-0000-000000000000	4ac7cea2-bb81-4bfd-a270-acdef4e33868	{"action":"user_signedup","actor_id":"e23859ec-1c83-4db9-8e52-5d5d8dd035b0","actor_username":"jamesanthonyjuntilla@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-21 08:09:30.534928+00	
00000000-0000-0000-0000-000000000000	fc77e8a7-79aa-4c96-8ced-0c884e98d3f5	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 08:17:37.99558+00	
00000000-0000-0000-0000-000000000000	7688007f-42fc-43c1-85b7-bdc558c88984	{"action":"login","actor_id":"e23859ec-1c83-4db9-8e52-5d5d8dd035b0","actor_username":"jamesanthonyjuntilla@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 08:18:19.800884+00	
00000000-0000-0000-0000-000000000000	00e59da1-8ef9-4d0e-84fa-7d711d823f2f	{"action":"logout","actor_id":"e23859ec-1c83-4db9-8e52-5d5d8dd035b0","actor_username":"jamesanthonyjuntilla@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-21 08:23:02.037233+00	
00000000-0000-0000-0000-000000000000	72c5d795-7c2a-4194-9afb-053abcdee306	{"action":"login","actor_id":"e23859ec-1c83-4db9-8e52-5d5d8dd035b0","actor_username":"jamesanthonyjuntilla@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 08:23:13.548253+00	
00000000-0000-0000-0000-000000000000	e161a9b1-895f-46ce-a171-61005254826a	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"jamesanthonyjuntilla@gmail.com","user_id":"e23859ec-1c83-4db9-8e52-5d5d8dd035b0","user_phone":""}}	2025-11-21 08:32:21.514631+00	
00000000-0000-0000-0000-000000000000	86b93255-bc28-4264-a314-901d0153f2d5	{"action":"token_refreshed","actor_id":"b51354b7-74cf-4a2b-ad3f-3ec6543f1592","actor_username":"kentdominic2004@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-21 09:14:28.198509+00	
00000000-0000-0000-0000-000000000000	28bb407e-022e-4e26-bf21-cac07f72bb43	{"action":"token_revoked","actor_id":"b51354b7-74cf-4a2b-ad3f-3ec6543f1592","actor_username":"kentdominic2004@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-21 09:14:28.223446+00	
00000000-0000-0000-0000-000000000000	a2eecbf0-9d6d-4a85-8adc-ad1d0aab997c	{"action":"login","actor_id":"b51354b7-74cf-4a2b-ad3f-3ec6543f1592","actor_username":"kentdominic2004@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 09:14:38.766246+00	
00000000-0000-0000-0000-000000000000	e7ca05dc-a86a-47a9-85fd-83aa55e6db6c	{"action":"logout","actor_id":"b51354b7-74cf-4a2b-ad3f-3ec6543f1592","actor_username":"kentdominic2004@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-21 09:15:40.026637+00	
00000000-0000-0000-0000-000000000000	e01849a2-a3fd-4412-8ef0-98d5def035ac	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-21 09:17:30.002656+00	
00000000-0000-0000-0000-000000000000	322ae0c2-d3f1-4bc2-abcd-e6c1f72b142d	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-21 09:17:30.00364+00	
00000000-0000-0000-0000-000000000000	2ba3c7c9-ff2d-4e23-a576-1bdf8726bffd	{"action":"login","actor_id":"92548ce1-e669-4be6-8135-7abbbbcca876","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 09:21:29.232226+00	
00000000-0000-0000-0000-000000000000	2af34df8-e639-4c93-bfde-662cc227ab84	{"action":"logout","actor_id":"92548ce1-e669-4be6-8135-7abbbbcca876","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-21 09:21:33.849131+00	
00000000-0000-0000-0000-000000000000	af50ecfc-b0aa-4400-959d-fe936cdf8f47	{"action":"login","actor_id":"e315204d-bf6a-4f89-bd15-36dfe7f71638","actor_username":"ohahalabyo@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 09:23:02.154131+00	
00000000-0000-0000-0000-000000000000	4cfbbce4-07f4-4b72-9fee-350055e698ed	{"action":"user_confirmation_requested","actor_id":"7ca06e14-818b-4d5d-b8f5-6ba6c5ee3573","actor_username":"jamesanthonyjuntilla@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-21 09:31:25.681812+00	
00000000-0000-0000-0000-000000000000	42fe64a7-8287-418c-b698-159c45c7084c	{"action":"user_signedup","actor_id":"7ca06e14-818b-4d5d-b8f5-6ba6c5ee3573","actor_username":"jamesanthonyjuntilla@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-11-21 09:31:49.186117+00	
00000000-0000-0000-0000-000000000000	e8e7b15b-f7d1-4efd-99e2-d8b6621fcd68	{"action":"user_repeated_signup","actor_id":"7ca06e14-818b-4d5d-b8f5-6ba6c5ee3573","actor_username":"jamesanthonyjuntilla@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-11-21 09:32:02.861673+00	
00000000-0000-0000-0000-000000000000	3cdbc37c-de88-44fd-8bab-f52ae1078cc2	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 09:32:34.884462+00	
00000000-0000-0000-0000-000000000000	a6540b68-d13b-4cfa-a10a-b1cc619a7042	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 09:33:10.881169+00	
00000000-0000-0000-0000-000000000000	f4e04eae-17c7-4304-84da-dee3dad5f827	{"action":"login","actor_id":"92548ce1-e669-4be6-8135-7abbbbcca876","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 09:34:33.190438+00	
00000000-0000-0000-0000-000000000000	a81fafc9-e8ca-4105-a4af-745ef1d62297	{"action":"logout","actor_id":"92548ce1-e669-4be6-8135-7abbbbcca876","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-21 09:35:26.254751+00	
00000000-0000-0000-0000-000000000000	19573faf-277a-4ea8-beb9-d5f5edff25d5	{"action":"login","actor_id":"92548ce1-e669-4be6-8135-7abbbbcca876","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 09:35:37.359514+00	
00000000-0000-0000-0000-000000000000	32d98224-9682-418c-98a5-69bcd8b5c31e	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 09:37:17.768035+00	
00000000-0000-0000-0000-000000000000	c9ff2912-72ab-4ea9-b1f3-6d6523158a78	{"action":"logout","actor_id":"92548ce1-e669-4be6-8135-7abbbbcca876","actor_username":"zichri6767@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-21 09:43:25.572672+00	
00000000-0000-0000-0000-000000000000	0f5a9c05-c82b-4b66-924b-b8df4db03ef9	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 09:44:53.495908+00	
00000000-0000-0000-0000-000000000000	781a7dd2-1d97-4caa-b19d-3ec16525eac0	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 10:01:49.718527+00	
00000000-0000-0000-0000-000000000000	209d4c23-b100-47e4-abdf-0488cb0e9f5e	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 23:37:17.833311+00	
00000000-0000-0000-0000-000000000000	187da7f0-33e9-47f1-b4c4-f22303dd0eac	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-21 23:39:09.881168+00	
00000000-0000-0000-0000-000000000000	4b32f2ca-5917-4a95-bf9d-832b1204f4ca	{"action":"token_refreshed","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-22 00:38:34.047375+00	
00000000-0000-0000-0000-000000000000	9196970a-35e5-45f6-89fd-d3d4dc1f752e	{"action":"token_revoked","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-22 00:38:34.065381+00	
00000000-0000-0000-0000-000000000000	a89ac197-eb91-4175-bf09-fd0abca25f8c	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 01:00:24.943858+00	
00000000-0000-0000-0000-000000000000	ed4a8c65-2f43-451e-9b68-40068337aa65	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 01:21:49.816705+00	
00000000-0000-0000-0000-000000000000	089cf6c6-685e-4d08-8ec0-b4987ac7b1cc	{"action":"logout","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-22 01:41:42.350978+00	
00000000-0000-0000-0000-000000000000	29b6f8e3-8997-41de-b3c3-77e26651b45b	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 01:41:54.353345+00	
00000000-0000-0000-0000-000000000000	70e48c62-58ae-46d3-96c5-56f5b739592f	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 01:49:16.863858+00	
00000000-0000-0000-0000-000000000000	7e7cd215-37d8-493e-b743-7d778bbcb5aa	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 02:25:59.292948+00	
00000000-0000-0000-0000-000000000000	773e4fcb-e0f0-4275-a020-421b1b5b80fd	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 02:41:40.071368+00	
00000000-0000-0000-0000-000000000000	df4af514-5d0c-4725-add9-8d5fb44330ff	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 03:14:54.785155+00	
00000000-0000-0000-0000-000000000000	06e57ff3-d112-4590-8ed2-cc94d456e528	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 03:30:13.070806+00	
00000000-0000-0000-0000-000000000000	c937501e-fce3-4ecf-9047-ba263a604aa3	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 03:37:08.971963+00	
00000000-0000-0000-0000-000000000000	222c48dd-e99f-41ba-bbb6-19b05238d93f	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 03:38:53.768631+00	
00000000-0000-0000-0000-000000000000	831e5992-c15a-42c6-9cd4-9929a939d8bf	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 03:42:31.000284+00	
00000000-0000-0000-0000-000000000000	a26a8828-affc-4238-bf83-f62f894519e2	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 03:44:59.022654+00	
00000000-0000-0000-0000-000000000000	82d4d3d1-8843-4a89-843a-d86e04cdd348	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 03:46:44.512057+00	
00000000-0000-0000-0000-000000000000	f6e7e9ce-a6f2-45f0-98f4-ca0673cf7938	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 03:55:16.68179+00	
00000000-0000-0000-0000-000000000000	ab5a1031-b82c-4255-8319-3c580e55ee55	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 04:01:27.312744+00	
00000000-0000-0000-0000-000000000000	203b0912-22e3-4bb5-9c58-b0be8e0c27b2	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 04:07:40.223657+00	
00000000-0000-0000-0000-000000000000	3ff25cf4-5ba8-4efc-ab52-dad62a92df43	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 04:56:55.27746+00	
00000000-0000-0000-0000-000000000000	49f9a132-264e-45a4-8d0a-6b363b9158ab	{"action":"token_refreshed","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-22 06:30:30.024403+00	
00000000-0000-0000-0000-000000000000	813f7766-46d4-49cc-a57f-832562473420	{"action":"token_revoked","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-22 06:30:30.048381+00	
00000000-0000-0000-0000-000000000000	8251b109-04d9-4646-b033-bd798d4b0c50	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 06:30:55.279366+00	
00000000-0000-0000-0000-000000000000	91f94921-275d-48ef-b483-14cd22acc8d7	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 06:55:55.994957+00	
00000000-0000-0000-0000-000000000000	ecd6c974-b15a-4141-b3b0-433cc98c3bde	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 07:12:30.505856+00	
00000000-0000-0000-0000-000000000000	1ecf61a7-7966-4bf6-a4f2-6df8fd84a5de	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 08:08:10.659298+00	
00000000-0000-0000-0000-000000000000	435408ad-73a5-40e3-8e08-650cf760421d	{"action":"token_refreshed","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-22 09:06:39.392771+00	
00000000-0000-0000-0000-000000000000	9c3ec43c-0ee3-403e-8abe-1434d5ded933	{"action":"token_revoked","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-22 09:06:39.410164+00	
00000000-0000-0000-0000-000000000000	7ab644d5-9e90-49e2-b47e-a389e9f1ce51	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 09:24:23.149917+00	
00000000-0000-0000-0000-000000000000	7ed34986-949d-4ab9-8709-26a1a0a3fc58	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 09:30:47.04617+00	
00000000-0000-0000-0000-000000000000	5ae57440-13dc-4f18-b5cc-d90d5d71977d	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 09:39:47.213944+00	
00000000-0000-0000-0000-000000000000	36dd9003-49ab-48c2-a4a8-7c6699187566	{"action":"token_refreshed","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-22 10:38:06.280527+00	
00000000-0000-0000-0000-000000000000	2b89cb38-407a-4296-9eb9-7cf9b75db57a	{"action":"token_revoked","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-22 10:38:06.305445+00	
00000000-0000-0000-0000-000000000000	e8864dd5-0c90-4d3e-b47c-fc62da7ea55a	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 10:55:31.167513+00	
00000000-0000-0000-0000-000000000000	f5001843-e92e-42f6-84eb-2d7f806c7fe2	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 10:56:31.505812+00	
00000000-0000-0000-0000-000000000000	bd09d0ab-30e7-4635-9e39-2bf606bf2b85	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 11:01:06.757253+00	
00000000-0000-0000-0000-000000000000	b0c1a5f3-8fd2-4008-905b-a8d2878040f5	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 11:10:47.909583+00	
00000000-0000-0000-0000-000000000000	677872ca-e66d-4144-95da-1abd978be29c	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 11:53:35.597012+00	
00000000-0000-0000-0000-000000000000	bcca14c3-66a5-4047-a0ef-7a1eef839b97	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 12:03:25.551783+00	
00000000-0000-0000-0000-000000000000	0401063f-7204-44f7-9e59-b9c82508e1c2	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 12:11:43.399081+00	
00000000-0000-0000-0000-000000000000	9897fee0-862b-49a5-9d55-9be746db7088	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 12:28:35.856078+00	
00000000-0000-0000-0000-000000000000	14246b8d-cce1-4ac6-9301-6afc8f67f1e9	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 12:47:12.052483+00	
00000000-0000-0000-0000-000000000000	82b88128-a3de-4958-bb94-7f1c16de2908	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-22 13:01:57.667304+00	
00000000-0000-0000-0000-000000000000	27cdf1cc-6924-4b6f-8866-c69522f780da	{"action":"token_refreshed","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-23 03:00:02.719986+00	
00000000-0000-0000-0000-000000000000	4cea51cc-6e92-43eb-ad3d-4b0db0fd9fab	{"action":"token_revoked","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-23 03:00:02.742796+00	
00000000-0000-0000-0000-000000000000	97ea50ce-7113-40f0-a970-48bc53005947	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-23 03:00:28.760549+00	
00000000-0000-0000-0000-000000000000	b43fcdf9-49bc-44d4-955d-495a3ac5f14f	{"action":"token_refreshed","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-23 03:58:35.822999+00	
00000000-0000-0000-0000-000000000000	0576897e-d179-4c18-acbf-c0c70ca45bdb	{"action":"token_revoked","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-23 03:58:35.837957+00	
00000000-0000-0000-0000-000000000000	da9b5386-e296-46d7-985b-ab4960fe38c9	{"action":"login","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-23 04:23:23.239505+00	
00000000-0000-0000-0000-000000000000	9043c137-9034-42c4-bd99-eae3b85879f2	{"action":"token_refreshed","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-23 05:21:39.169391+00	
00000000-0000-0000-0000-000000000000	7c163090-b8c5-4d30-bc6c-9a57ee86cc8b	{"action":"token_revoked","actor_id":"552d7d2c-db5c-4cbc-b678-7ae64690c767","actor_username":"cabatinganlukezichri@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-23 05:21:39.193691+00	
00000000-0000-0000-0000-000000000000	af964af2-38d2-4992-a8cf-33ed64abdaca	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-23 05:44:00.189799+00	
00000000-0000-0000-0000-000000000000	eb267c9f-3295-4648-b6dc-b4da826753f0	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-23 05:59:37.395756+00	
00000000-0000-0000-0000-000000000000	da178b6c-a521-456d-8b5a-2ec16d12ef8f	{"action":"logout","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-11-23 06:07:12.376401+00	
00000000-0000-0000-0000-000000000000	8d848e6e-e8f1-4331-a418-6b79b14a6c88	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-23 06:07:41.298631+00	
00000000-0000-0000-0000-000000000000	e076552b-7a08-454c-91b8-2ace6f081433	{"action":"token_refreshed","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-23 07:05:59.449983+00	
00000000-0000-0000-0000-000000000000	f9442e85-c009-496d-b75a-247665cf7b10	{"action":"token_revoked","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-23 07:05:59.473372+00	
00000000-0000-0000-0000-000000000000	320d762b-8075-490a-a9ec-2414a99bebc2	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-23 07:50:19.038334+00	
00000000-0000-0000-0000-000000000000	60350e10-e9cd-4e9b-886d-f5509e441a12	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-23 08:10:34.830188+00	
00000000-0000-0000-0000-000000000000	e8a6a192-9dea-4783-8e89-bda0accaa5d4	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-23 08:19:34.458906+00	
00000000-0000-0000-0000-000000000000	3df85775-4492-4ae0-8410-9c71bbebf623	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-23 08:37:17.269132+00	
00000000-0000-0000-0000-000000000000	b5885530-1827-40d5-bf33-df6179e238a7	{"action":"token_refreshed","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-23 09:35:31.895184+00	
00000000-0000-0000-0000-000000000000	2c1f5f99-7be0-4f29-b546-2cc9d1b736f9	{"action":"token_revoked","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-23 09:35:31.90993+00	
00000000-0000-0000-0000-000000000000	9e908fcf-d206-42f1-8f8f-fbb25fe7a890	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-23 11:08:20.88278+00	
00000000-0000-0000-0000-000000000000	410cc6ce-d6f6-4ef1-a1ea-4ca46bc73ae0	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-23 11:12:38.801231+00	
00000000-0000-0000-0000-000000000000	aaffddbf-4120-4495-9776-c16dccb9c3f2	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-23 11:43:22.43031+00	
00000000-0000-0000-0000-000000000000	1d65dd7f-1af0-48a9-99f6-b3d4bd4ac7aa	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-23 11:43:55.723236+00	
00000000-0000-0000-0000-000000000000	325ce0e0-eafb-45a2-8322-50bb3f15220a	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-23 11:44:52.830583+00	
00000000-0000-0000-0000-000000000000	430aa511-43ac-4a18-9e48-4cdf74ac87a2	{"action":"token_refreshed","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-23 12:43:17.919944+00	
00000000-0000-0000-0000-000000000000	a362c369-e04f-4906-b6f5-723ad7df2d70	{"action":"token_revoked","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-11-23 12:43:17.928118+00	
00000000-0000-0000-0000-000000000000	0aa828ec-bfa4-406a-992b-f80124030c32	{"action":"login","actor_id":"ba0393ab-fe07-419e-bead-76c7e2830274","actor_username":"rosalesmariche2@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-11-23 12:59:47.313783+00	
\.


--
-- TOC entry 4428 (class 0 OID 16929)
-- Dependencies: 369
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) FROM stdin;
\.


--
-- TOC entry 4419 (class 0 OID 16727)
-- Dependencies: 360
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
552d7d2c-db5c-4cbc-b678-7ae64690c767	552d7d2c-db5c-4cbc-b678-7ae64690c767	{"sub": "552d7d2c-db5c-4cbc-b678-7ae64690c767", "email": "cabatinganlukezichri@gmail.com", "email_verified": true, "phone_verified": false}	email	2025-11-15 00:49:59.006113+00	2025-11-15 00:49:59.006161+00	2025-11-15 00:49:59.006161+00	add0c951-7dc4-4c7f-a4c4-e882d5efee37
470acaee-8d9a-4efe-aa08-9f575f528053	470acaee-8d9a-4efe-aa08-9f575f528053	{"sub": "470acaee-8d9a-4efe-aa08-9f575f528053", "email": "abcde123@gmail.com", "email_verified": false, "phone_verified": false}	email	2025-11-17 08:08:53.236645+00	2025-11-17 08:08:53.236693+00	2025-11-17 08:08:53.236693+00	0674f2a2-6823-49b0-96a8-0379ebdc8ff5
e315204d-bf6a-4f89-bd15-36dfe7f71638	e315204d-bf6a-4f89-bd15-36dfe7f71638	{"sub": "e315204d-bf6a-4f89-bd15-36dfe7f71638", "email": "ohahalabyo@gmail.com", "email_verified": true, "phone_verified": false}	email	2025-11-17 08:10:27.97519+00	2025-11-17 08:10:27.975234+00	2025-11-17 08:10:27.975234+00	70bf1460-d240-4d96-9e88-ff33cf1d65cd
ba0393ab-fe07-419e-bead-76c7e2830274	ba0393ab-fe07-419e-bead-76c7e2830274	{"sub": "ba0393ab-fe07-419e-bead-76c7e2830274", "email": "rosalesmariche2@gmail.com", "email_verified": true, "phone_verified": false}	email	2025-11-19 03:10:38.645676+00	2025-11-19 03:10:38.645734+00	2025-11-19 03:10:38.645734+00	d92b8ee9-423c-4321-8978-58f736770e93
b51354b7-74cf-4a2b-ad3f-3ec6543f1592	b51354b7-74cf-4a2b-ad3f-3ec6543f1592	{"sub": "b51354b7-74cf-4a2b-ad3f-3ec6543f1592", "email": "kentdominic2004@gmail.com", "email_verified": true, "phone_verified": false}	email	2025-11-17 09:31:59.070339+00	2025-11-17 09:31:59.070388+00	2025-11-17 09:31:59.070388+00	26cff911-8336-4608-a271-826b5d2df95e
92548ce1-e669-4be6-8135-7abbbbcca876	92548ce1-e669-4be6-8135-7abbbbcca876	{"sub": "92548ce1-e669-4be6-8135-7abbbbcca876", "email": "zichri6767@gmail.com", "email_verified": true, "phone_verified": false}	email	2025-11-19 07:36:13.645279+00	2025-11-19 07:36:13.645328+00	2025-11-19 07:36:13.645328+00	99a84d6b-5504-479b-98c3-9994bd5e5d75
7ca06e14-818b-4d5d-b8f5-6ba6c5ee3573	7ca06e14-818b-4d5d-b8f5-6ba6c5ee3573	{"sub": "7ca06e14-818b-4d5d-b8f5-6ba6c5ee3573", "email": "jamesanthonyjuntilla@gmail.com", "email_verified": true, "phone_verified": false}	email	2025-11-21 09:31:25.67421+00	2025-11-21 09:31:25.674265+00	2025-11-21 09:31:25.674265+00	109c5d41-6822-454c-9b26-ad23f044e788
\.


--
-- TOC entry 4413 (class 0 OID 16518)
-- Dependencies: 351
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 4423 (class 0 OID 16816)
-- Dependencies: 364
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
da0d6e8d-b637-418b-b447-30fd3b3fca18	2025-11-21 08:05:24.638536+00	2025-11-21 08:05:24.638536+00	password	ba2ce2cd-c827-48db-ad2c-6bb057c2b0b8
3a69d365-4dca-4141-97d1-5cff06d8a5bf	2025-11-21 08:17:38.010917+00	2025-11-21 08:17:38.010917+00	password	00cbf96d-012b-4f4a-ad34-84bb4d228192
10988a99-c997-452b-8bc4-06df9e5bbf1a	2025-11-21 09:23:02.163158+00	2025-11-21 09:23:02.163158+00	password	46a43dfc-62bd-4df8-aad6-be49e5d7a184
a1fc6635-2b13-4a66-ba02-9d39827c97d8	2025-11-21 09:37:17.775201+00	2025-11-21 09:37:17.775201+00	password	f4a58b31-111b-4e19-b4a4-dbf150ecb18d
af34c243-91eb-4ba1-a036-4a9fb530f5dc	2025-11-15 00:50:15.013664+00	2025-11-15 00:50:15.013664+00	otp	596f80aa-411f-43ce-85a0-7c181d47d562
767e76de-ca16-41a7-9bb1-a2070edb3d01	2025-11-15 00:50:58.555217+00	2025-11-15 00:50:58.555217+00	password	fe034493-28a6-4946-9d8c-ac417196b194
3fc09105-ecc1-49dc-bd36-c59fb680b0ad	2025-11-15 00:52:22.66697+00	2025-11-15 00:52:22.66697+00	password	3ca13ceb-9de9-4eea-a0d2-54a58f55e589
b04f216f-6663-45f6-878b-c16dc9bc5a3e	2025-11-15 01:23:43.37132+00	2025-11-15 01:23:43.37132+00	password	fcc5e2f2-a533-4607-a99b-194614b84c3f
69bcfb38-12b6-48af-a3d6-1561f644e081	2025-11-15 10:29:35.011149+00	2025-11-15 10:29:35.011149+00	password	e621bb3c-597a-4e88-af37-576430f0e450
f525eafc-66a1-4ece-b651-c37efbba7349	2025-11-15 10:43:44.84868+00	2025-11-15 10:43:44.84868+00	password	a6170fe3-8b8a-43a3-908b-a02b87fe3d26
c82e4a24-32a6-47c1-9ec2-148c8a0d97ff	2025-11-15 11:29:58.271303+00	2025-11-15 11:29:58.271303+00	password	a8299e01-0bc0-4c45-844c-c317ed266739
59058ada-a6e9-4985-b162-235d5f8d3f1d	2025-11-15 12:47:13.338899+00	2025-11-15 12:47:13.338899+00	password	da7c609c-0f08-4857-8afd-49233bc0b857
85cc992e-c423-48e5-b941-59aa93238571	2025-11-15 12:52:38.382065+00	2025-11-15 12:52:38.382065+00	password	f51fa513-dab0-4fc5-92c0-84b65d6086a8
83ba04f4-faa5-46b7-8109-ece743b5b387	2025-11-15 13:09:50.719673+00	2025-11-15 13:09:50.719673+00	password	403e03fe-ac0c-4d17-987f-39c8302ccf9b
302efa12-6718-4c87-a834-f448ff9a5c10	2025-11-15 13:18:31.729815+00	2025-11-15 13:18:31.729815+00	password	9f344448-1ad6-4090-9186-862275598b0a
7772002d-8988-43ad-83c3-effc034e6789	2025-11-15 13:42:28.749739+00	2025-11-15 13:42:28.749739+00	password	549cd42d-9c3d-46d3-beb8-9c89e73ae237
802485cd-8393-4183-88e5-e12cdf01f49d	2025-11-15 15:07:27.06589+00	2025-11-15 15:07:27.06589+00	password	f5530443-afdc-47f8-be03-e234c8b823f8
9d51d8a3-5396-488c-ab80-48107b5aacf6	2025-11-15 15:17:22.131404+00	2025-11-15 15:17:22.131404+00	password	dba9bf6e-f55c-47d8-a7c4-126ba358b3dc
423da25a-c517-4775-9435-89fef285d168	2025-11-15 15:18:21.921748+00	2025-11-15 15:18:21.921748+00	password	bf402e63-24a6-4859-bcbd-e326031634ce
54e63732-9165-41a0-b77f-a664fe65dda4	2025-11-16 05:22:28.819193+00	2025-11-16 05:22:28.819193+00	password	1285480d-94fd-4309-8d5e-0dd80429cc78
9fcdb657-4d44-448f-9798-1bc1ba155325	2025-11-16 08:57:03.346928+00	2025-11-16 08:57:03.346928+00	password	e3ee7deb-b15e-495c-b1ca-516f16a37343
84fd7982-ff53-4373-a13b-b4cd315788a7	2025-11-16 09:03:13.536782+00	2025-11-16 09:03:13.536782+00	password	084674e5-e751-4529-b749-3e857b9d5879
34a2b222-3228-4d8c-9530-6639be3d92e3	2025-11-16 09:39:30.781895+00	2025-11-16 09:39:30.781895+00	password	d71fbd40-7f80-4de9-a15b-d038a00bcd05
1456dabd-29c4-4797-9f8e-63d64188e287	2025-11-16 09:45:59.917054+00	2025-11-16 09:45:59.917054+00	password	2046a75b-0ff6-4c3e-a2df-d3bfe3ae535d
f34faee7-3c4f-4d9f-93a6-90b06f3cd00b	2025-11-16 09:51:43.815159+00	2025-11-16 09:51:43.815159+00	password	693216b8-f1eb-4239-b7d3-b02bbc3d56e1
d7671fc0-69f2-42cb-9d88-674f57d62866	2025-11-16 09:55:01.645136+00	2025-11-16 09:55:01.645136+00	password	6ba402c1-b806-4acd-971d-10c8cef043b3
d1361007-395b-4e7e-9663-bbd21164eea4	2025-11-16 09:59:34.886858+00	2025-11-16 09:59:34.886858+00	password	e55196e0-2572-4cc3-b2bb-e6a2ec99d511
e301bce3-ad2a-4b31-8173-2ae1acbb4f35	2025-11-16 10:06:10.547388+00	2025-11-16 10:06:10.547388+00	password	ee7b3f1a-ea9f-4f3b-88a0-98fa064bc295
83116804-48b5-4ca6-8527-e420de2a52fa	2025-11-16 11:30:38.075093+00	2025-11-16 11:30:38.075093+00	password	0df97133-a71b-4911-b875-6f40b46943ed
ef3e800f-ef3b-4771-a7b8-7b61b158b93f	2025-11-16 11:36:11.660712+00	2025-11-16 11:36:11.660712+00	password	1fb94268-a0c5-4a4c-aec9-502339e559d9
ff4837b8-3cfc-4988-b560-f55d5aedcec8	2025-11-16 11:39:40.448161+00	2025-11-16 11:39:40.448161+00	password	d2c545cf-6d14-4f3b-afaf-e4380df610dd
2d8ed319-0b15-4e65-b677-16afb04855eb	2025-11-16 11:52:48.30463+00	2025-11-16 11:52:48.30463+00	password	80719e7a-468f-4a63-9634-90bf3f0fb58d
04870553-8c8f-4b5d-bb78-11e006ca2d77	2025-11-16 11:55:54.963773+00	2025-11-16 11:55:54.963773+00	password	18a45aef-83be-4922-afb9-939482ab6afb
07233942-57fc-4d69-a646-cab55121b29f	2025-11-16 12:06:45.955684+00	2025-11-16 12:06:45.955684+00	password	63e40a06-0256-4b2f-8353-65c2790147fc
64ae4bee-599c-47d8-affa-f05cd72886ba	2025-11-16 12:15:17.603657+00	2025-11-16 12:15:17.603657+00	password	ad6974bc-0040-4a44-844f-5a3c84f54299
2d5338b2-ff5d-44ad-84b1-842672eeee95	2025-11-16 12:33:40.367644+00	2025-11-16 12:33:40.367644+00	password	432dd618-070d-4dbf-aa77-086df0f5caac
f6848ff2-33f3-4a2d-865d-bf1fb28a60b5	2025-11-16 12:55:45.347074+00	2025-11-16 12:55:45.347074+00	password	f92590fc-e983-41fb-8c57-4a8e21c99c7e
9a80a8fb-cdbe-4998-9a6a-f2822a6df306	2025-11-16 13:09:50.211028+00	2025-11-16 13:09:50.211028+00	password	926ba22a-33d5-443f-8695-3ab93510032c
672ac3bc-1a29-4523-aa4f-352c116a3967	2025-11-16 13:37:21.396906+00	2025-11-16 13:37:21.396906+00	password	6c6ec039-e3ad-4a4e-94d1-dc2e2b95dfa8
81506044-a8c7-4b79-a57c-d509b797f1bf	2025-11-16 14:18:25.955237+00	2025-11-16 14:18:25.955237+00	password	66a60c7f-c82e-477a-a050-fbce30d606c6
3f160d0b-65b9-48b6-ab6c-42fd6122b1ad	2025-11-16 15:01:06.164093+00	2025-11-16 15:01:06.164093+00	password	5d4a336e-8625-403a-a3d4-93649a8fa736
f64c17c4-26a0-4173-bfb3-fc106815b082	2025-11-17 00:47:22.716039+00	2025-11-17 00:47:22.716039+00	password	8190fc38-d4d3-4ec0-a1b8-2a1d23f18d41
d778629a-179c-48b8-9d70-8b330442e3a2	2025-11-17 02:25:21.962739+00	2025-11-17 02:25:21.962739+00	password	98135379-95c7-4324-be3f-5c6fea23c155
fb8d4eee-a4c3-41b0-9076-188d691d7857	2025-11-17 04:08:13.472089+00	2025-11-17 04:08:13.472089+00	password	6c57763d-f7cd-4857-9e69-d2e4d7774dad
25033e5a-a21e-4ab4-bed5-edf192393f31	2025-11-17 07:35:03.597084+00	2025-11-17 07:35:03.597084+00	password	c48d3d79-06c1-462d-9131-374386624533
ca662d8a-31bc-4e0b-9ad0-cc5018ef877d	2025-11-17 07:35:35.662895+00	2025-11-17 07:35:35.662895+00	password	f34f7eac-41c6-498d-bde7-672813827750
1840b8e1-a2b1-4e97-9a3b-b8eb6895f1ca	2025-11-17 07:36:10.025922+00	2025-11-17 07:36:10.025922+00	password	5409608a-6629-4f0d-bbcb-9cfe94ab07be
6b770129-fb2c-4875-babe-fd08f77b016b	2025-11-17 08:01:26.0698+00	2025-11-17 08:01:26.0698+00	password	b0da5878-52dd-4ce3-bf62-d1856b30fb83
287221df-d31e-42cd-8ac5-03078f1213ce	2025-11-17 08:11:33.143574+00	2025-11-17 08:11:33.143574+00	otp	325b999a-0e69-4f09-b04e-526b33d2cd09
dd4bd888-51eb-4897-841d-c2cfd8b3b508	2025-11-17 08:14:11.79653+00	2025-11-17 08:14:11.79653+00	password	935ac4e7-f47a-43b3-98f4-a8f60b9892c7
0542b68d-8abf-40c3-8cfc-9506ce1a342b	2025-11-17 08:31:34.685794+00	2025-11-17 08:31:34.685794+00	password	d0c28eb5-2b8b-4953-b5dd-6036a81d9dbb
4ee25f61-9381-4d21-b941-f0286ef3df2a	2025-11-17 08:31:43.25157+00	2025-11-17 08:31:43.25157+00	password	9e6e5e95-d642-4ed7-b22a-00cdad2f275e
15346626-1426-47c8-b7e8-2c046944f6d2	2025-11-17 08:33:18.586781+00	2025-11-17 08:33:18.586781+00	password	8ce549d3-60aa-4fed-9553-fbec651da304
bea33cec-67ae-4579-b951-9887042f47aa	2025-11-17 08:35:47.183468+00	2025-11-17 08:35:47.183468+00	password	4bc1d3ad-1305-49a2-b25f-9024bad6a917
6e3ef5f7-dad6-4b91-af42-3f133150b681	2025-11-17 08:41:11.2145+00	2025-11-17 08:41:11.2145+00	password	9043bde4-b172-41d0-ab8c-ce9428a9de6e
39c56700-6523-41eb-ab91-e041fe97e25d	2025-11-17 11:29:05.398993+00	2025-11-17 11:29:05.398993+00	password	77613c40-342b-43e1-b79d-1b56d7d69699
509067e3-394d-41d4-bee8-6e09fd88451c	2025-11-17 11:32:18.484176+00	2025-11-17 11:32:18.484176+00	password	87f16911-812e-492d-94c5-83909ca5ab2c
92cc1722-de96-4195-ad0d-aa00f3af7757	2025-11-17 15:13:57.644773+00	2025-11-17 15:13:57.644773+00	password	8eb5ab92-53f1-4ab9-84f1-e849a55d1e55
5bac1861-54fe-4f38-88df-637a52cf1e45	2025-11-17 15:29:22.301007+00	2025-11-17 15:29:22.301007+00	password	85ce770f-26b8-4015-bddb-132ff9ef4fa6
ece05753-e369-4662-8acd-c7a9e67a037e	2025-11-17 15:35:02.792278+00	2025-11-17 15:35:02.792278+00	password	8d8e66ea-65d2-4c4d-a17f-e749675b786b
a174eea9-eed5-4384-8124-04624e49ca47	2025-11-17 16:06:11.573495+00	2025-11-17 16:06:11.573495+00	password	5c71d2f4-987b-4744-851d-3ffc87648b1e
36ae0956-1a5c-4bd2-a5a9-60f0c101f5f2	2025-11-17 16:16:52.405371+00	2025-11-17 16:16:52.405371+00	password	206ed2d3-de48-4ba5-9144-3087e1c65c86
30bda9d7-af09-466e-a022-5abd3215a3c8	2025-11-17 16:29:13.282584+00	2025-11-17 16:29:13.282584+00	password	a2c66753-5f93-4da6-9ccd-088b92603034
22f6dc90-a2eb-41ff-a38c-85c55861e936	2025-11-17 16:38:34.604232+00	2025-11-17 16:38:34.604232+00	password	dcfb8c46-10af-4259-8580-d6412be430f3
70a75ca9-b4b7-4d91-a063-dc8701fa477b	2025-11-17 23:45:27.447983+00	2025-11-17 23:45:27.447983+00	password	ec1ef8fe-c4e9-40ec-94ae-5012cdc5cc35
a31eb29c-8adb-49fa-932b-bdd1106a726c	2025-11-17 23:52:01.255674+00	2025-11-17 23:52:01.255674+00	password	868f900a-ac63-458a-bee0-1b38ec1270e2
d678ccca-61fc-4925-901a-2dc6c68e140d	2025-11-18 09:07:29.761426+00	2025-11-18 09:07:29.761426+00	password	f6cb6aa4-2d9f-4417-992d-34f8b6cb791c
88e4a800-113e-4154-8ced-fa8f5aa37dea	2025-11-18 09:11:46.982622+00	2025-11-18 09:11:46.982622+00	password	8add22d4-e9c7-4548-af21-cd59b31eb97f
a0215edb-1abd-4ecb-bf81-a819eea404eb	2025-11-18 09:47:30.200162+00	2025-11-18 09:47:30.200162+00	password	afc54cd4-1f83-48a1-87b1-395274253570
cbbac8ee-ef91-42e5-b577-dfe74edade4a	2025-11-18 09:51:17.504761+00	2025-11-18 09:51:17.504761+00	password	93b2298c-58fa-47da-99bb-b37dd4f5d4a6
7c26bcfe-db03-4a8a-944c-64c589a3c6bd	2025-11-18 09:57:12.464766+00	2025-11-18 09:57:12.464766+00	password	3348126f-d662-44f8-8e06-29a67ffad7df
a21a3e35-a5f5-404a-8b6f-640b74daf7c2	2025-11-18 10:05:39.121083+00	2025-11-18 10:05:39.121083+00	password	8bef617f-da85-43ec-ab16-ddecf54ba3f3
e44f3b20-abe4-4ef1-aae1-ffd05791ffa8	2025-11-18 11:23:02.126608+00	2025-11-18 11:23:02.126608+00	password	3e3a42a4-2a54-473d-a316-32d8c2100c4f
e61fec08-ceb8-4851-b7ed-2807449c6f4b	2025-11-18 11:44:47.935441+00	2025-11-18 11:44:47.935441+00	password	a3d3814b-c9c0-4596-85df-05a360bdb4ed
9932aedf-96ba-4b80-b0a3-e144ac510b72	2025-11-18 16:07:41.137882+00	2025-11-18 16:07:41.137882+00	password	841f321d-ebb5-4a69-86c5-13eab26f1ad1
8c2d2e7c-7baf-4d7a-9bfa-3d828ef2512a	2025-11-18 23:53:15.525003+00	2025-11-18 23:53:15.525003+00	password	68fcca9b-9b26-4f91-949d-175413b7559c
30dba8b3-0e58-472e-b329-c41f167bc372	2025-11-19 00:11:11.082156+00	2025-11-19 00:11:11.082156+00	password	00e32fde-3785-4ab7-9585-9a9e89972a73
d4b4b45d-8ef2-43ae-b3e7-6124ac62c875	2025-11-19 00:46:22.620797+00	2025-11-19 00:46:22.620797+00	password	b14fa506-33cd-4624-a37e-4950cd8b3f44
9e5bc22d-b45d-4a86-b09f-9a1a142994a1	2025-11-19 00:55:43.977284+00	2025-11-19 00:55:43.977284+00	password	d5657645-38ef-48a1-b5e0-38e99e4d55f4
92f33a98-96b1-4317-bf8e-00eea2a0fd90	2025-11-19 01:06:16.793062+00	2025-11-19 01:06:16.793062+00	password	e620bfc6-181e-43a1-8512-7acf394c6704
bed12b30-661c-4a89-8a9d-230f5d5691ff	2025-11-19 01:34:08.10089+00	2025-11-19 01:34:08.10089+00	password	60009a30-a09f-4306-925f-89eafc1f0bb8
b93c2fba-6604-4c76-87e7-cf7709a47eb7	2025-11-19 01:35:15.939226+00	2025-11-19 01:35:15.939226+00	password	2bc174b2-19ea-4290-a54c-2065aa8cac2a
87e17663-02d8-46fb-8a90-65657cf84c75	2025-11-19 01:40:03.614072+00	2025-11-19 01:40:03.614072+00	password	5e5f4562-3a45-44d7-84bc-8f9477c12132
fcfb93e0-f618-4ae9-826c-6619f9530f5c	2025-11-19 01:56:40.420927+00	2025-11-19 01:56:40.420927+00	password	ef5aa6c9-7506-4251-afa7-49c90fdb4173
b260cd62-b227-4179-b702-5b66b357682e	2025-11-19 02:41:11.959294+00	2025-11-19 02:41:11.959294+00	password	11ec47d7-ed61-4f10-9889-491171660b82
18691ce6-2d14-42f9-8281-2a29cf319f85	2025-11-19 03:01:39.855023+00	2025-11-19 03:01:39.855023+00	password	0e1bbe37-89f6-459d-ad48-f520df243a1e
2c5ca983-e567-45bb-b58f-d86ba9d8b3b8	2025-11-19 03:21:34.339798+00	2025-11-19 03:21:34.339798+00	password	32e3ffd2-d1c4-4ebd-8499-8d7295d80630
a68e7aba-7d4a-419f-9da3-5236272733fc	2025-11-19 03:56:36.409068+00	2025-11-19 03:56:36.409068+00	password	28fc1d9a-b63d-4a49-9e59-8d0ee3a93e2c
555e02ae-8961-4653-a83c-6af0311310db	2025-11-19 04:08:06.037895+00	2025-11-19 04:08:06.037895+00	password	39cdd607-b7fc-4ffe-8470-d6e780493fe6
6bc86e78-1d5c-451a-a06f-ca52f2282fe9	2025-11-19 04:17:55.54339+00	2025-11-19 04:17:55.54339+00	password	d2096ac1-2682-440c-ab22-2b00ee0607fd
afb2dafc-a8e7-41d1-ac45-f2ebe833f3f8	2025-11-21 09:31:49.198717+00	2025-11-21 09:31:49.198717+00	otp	94d86ecc-361e-4eb6-a59a-32e65397d57e
92749ca3-d568-40dc-93ce-19dea6ffb1e2	2025-11-21 09:32:34.895224+00	2025-11-21 09:32:34.895224+00	password	75f49607-7d43-4432-973b-11da019a2740
e432f008-10c6-4761-9aba-b9fcbff1d6c7	2025-11-19 04:32:46.820337+00	2025-11-19 04:32:46.820337+00	password	788a5c7b-7ec0-48cd-8bb4-500eeb071e20
2ecf5fd8-45b2-433c-a4b9-30dc05f93581	2025-11-19 04:40:31.586387+00	2025-11-19 04:40:31.586387+00	password	f8f8da8b-2df2-4286-81a6-113882fa4a27
8d7ff02f-edb6-4bcf-82d0-7fa803358f27	2025-11-19 04:54:10.63378+00	2025-11-19 04:54:10.63378+00	password	00cad420-37c1-45a4-9717-f945932dc727
25b7ecec-c998-466b-b215-911c94785a09	2025-11-21 09:44:53.546106+00	2025-11-21 09:44:53.546106+00	password	95bd2c86-f302-4dec-9cb1-c5c54b556f0c
78b714ff-0063-4a29-a245-e58dfd212331	2025-11-19 04:55:41.924459+00	2025-11-19 04:55:41.924459+00	password	60ed2c04-e031-432c-be3b-f0553700b80b
7d3cb585-bf1a-414e-879f-6e9516bcbbac	2025-11-19 07:37:30.675271+00	2025-11-19 07:37:30.675271+00	password	ee8a96e1-8998-450c-9632-e2b083b6f971
07f1ba06-3502-4cb6-943b-1551f1d6531f	2025-11-19 07:40:25.274055+00	2025-11-19 07:40:25.274055+00	password	acd498f4-be13-460e-95ce-028c414774f0
96973489-bb29-4839-b489-841d59bc8200	2025-11-19 10:11:44.048285+00	2025-11-19 10:11:44.048285+00	password	d3452f73-d881-418b-bfe2-358178d5d255
377fc021-f871-44a6-a77f-282c66d6fd5b	2025-11-19 10:28:17.106277+00	2025-11-19 10:28:17.106277+00	password	2b101b55-8057-47fd-8644-f943e29d12dc
81048bd8-4f63-40e2-b746-8b99038660f1	2025-11-19 10:31:50.636482+00	2025-11-19 10:31:50.636482+00	password	bec9fd1d-c1a9-40db-ac0a-8ed6f6873cdc
d0305983-c3e7-45c1-a3da-e390db763df6	2025-11-19 13:13:45.447616+00	2025-11-19 13:13:45.447616+00	password	363e0fab-6d98-4e55-89f9-f190fd2c0868
d2ac334e-11cb-4d83-8b33-e874d03b506c	2025-11-22 01:41:54.375916+00	2025-11-22 01:41:54.375916+00	password	415b7550-c4be-4af0-b6ea-7e891016969d
6ed6e54e-bfcf-4727-976b-b3f17e1ef231	2025-11-19 13:15:36.909137+00	2025-11-19 13:15:36.909137+00	password	fdcfbed9-e1ff-42a7-a1d4-a910aa78d714
058b5385-a8d1-47da-a032-cbd786a47732	2025-11-19 13:31:18.902749+00	2025-11-19 13:31:18.902749+00	password	d598a213-a3c7-453c-8d8b-5df211e0de3a
7b4bd510-f314-451f-bbdd-5704a4767c0a	2025-11-19 13:47:58.567562+00	2025-11-19 13:47:58.567562+00	password	51ab6275-7d49-4be5-8860-e0c69002b0d3
2fa47d56-5c5c-46ff-9272-3bf1481fe3b2	2025-11-20 00:26:14.782523+00	2025-11-20 00:26:14.782523+00	password	44519347-7de1-426e-ba73-b89c7479d94e
f7dc54f9-80bc-4443-b182-888385e57a82	2025-11-20 00:30:47.692089+00	2025-11-20 00:30:47.692089+00	password	0c0ba488-c18a-4c55-a28c-ddf1ed1c37b8
2d2b82a2-9064-4f73-9c95-33a34c9939a2	2025-11-20 00:39:48.230237+00	2025-11-20 00:39:48.230237+00	password	c10121d0-6acd-4021-a470-999411be4588
b5660374-5056-406f-a9fa-b9addbda1d14	2025-11-20 00:58:25.926125+00	2025-11-20 00:58:25.926125+00	password	8629274a-7f81-4b2d-965a-c5900acda47c
f29e507f-6d82-4da7-a102-234d6abae963	2025-11-20 01:04:50.725778+00	2025-11-20 01:04:50.725778+00	password	40cce1d8-c6ee-4581-831f-14fe3477dbcc
dbf99cc6-dcd9-4c17-8969-7d479b477d25	2025-11-20 01:28:07.000021+00	2025-11-20 01:28:07.000021+00	password	50349199-178d-4309-9a84-74caf25e48fb
867c55fb-0d4c-4fb6-bf64-d4ef81005c0f	2025-11-20 09:22:03.080792+00	2025-11-20 09:22:03.080792+00	password	6e5dc7d1-2766-4cc2-997c-ce23d08951fb
9e6eb85e-afbf-41f6-b062-3702d636b090	2025-11-20 17:31:48.673007+00	2025-11-20 17:31:48.673007+00	password	2cdbe6f7-770d-44b4-baa0-9d8e35d5cd47
8e700914-d7b5-42a2-9f3c-728deaf02ea9	2025-11-21 08:00:35.187234+00	2025-11-21 08:00:35.187234+00	password	a715c9d0-92a1-452e-81d4-8e7b1f3964f4
68ad062b-b083-40bd-8105-72c65ecd7b30	2025-11-23 04:23:23.285291+00	2025-11-23 04:23:23.285291+00	password	f8b02187-4ceb-4912-a5ab-4cb7741525fd
62624dab-5236-4757-864a-00bd8e425bda	2025-11-23 06:07:41.317311+00	2025-11-23 06:07:41.317311+00	password	cc4e79f0-20d1-4e1e-8280-2730f17439e8
20518ae4-7b26-41ed-b740-60796ccdfb23	2025-11-23 07:50:19.137343+00	2025-11-23 07:50:19.137343+00	password	2e572c39-b4c8-4f45-aa40-d1f4a5e427b0
bb5f9e8a-3f83-42f6-9b1b-12b4aebc7571	2025-11-23 08:10:34.89376+00	2025-11-23 08:10:34.89376+00	password	f556ad4e-8ee0-4b8f-97e0-1e65caf37c2c
c0ea65a7-cc6b-4a13-b958-b4541607176e	2025-11-23 08:19:34.520545+00	2025-11-23 08:19:34.520545+00	password	4e613ba8-d70e-4407-9877-34215bf1cefc
977f9651-3c41-4608-9de3-ed6352eb11c7	2025-11-23 08:37:17.344742+00	2025-11-23 08:37:17.344742+00	password	98ef0c35-a62e-4653-85da-dbc537e62bda
3b0528e6-7618-4688-8a5b-376215481943	2025-11-23 11:08:20.986472+00	2025-11-23 11:08:20.986472+00	password	18318924-c07a-436b-8f7b-6dbe55ad564d
b081531e-6066-4876-9ba5-6578d01e55bc	2025-11-23 11:12:38.860034+00	2025-11-23 11:12:38.860034+00	password	06228cc2-1d4f-44e9-a0fa-920ab145d0d6
32baf75c-1831-4089-a718-90c6f58ab9ba	2025-11-23 11:43:22.51345+00	2025-11-23 11:43:22.51345+00	password	d3bdf9d1-c479-4d38-97c9-4597f05f01eb
fab6f8cf-d54b-40fe-9706-bcd0dbfc5faa	2025-11-23 11:43:55.730501+00	2025-11-23 11:43:55.730501+00	password	c58393d3-7925-487a-a85f-ccddb3be24a3
44cf7989-5ec9-4bab-9513-19dd607429c0	2025-11-23 11:44:52.835963+00	2025-11-23 11:44:52.835963+00	password	75827d91-2bc2-4473-8371-7fa77cf94efb
4dc8ba0a-6dee-4635-813e-3965c237e047	2025-11-23 12:59:47.381228+00	2025-11-23 12:59:47.381228+00	password	d84eea96-fb72-4264-84a6-99165b1fc840
\.


--
-- TOC entry 4422 (class 0 OID 16804)
-- Dependencies: 363
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- TOC entry 4421 (class 0 OID 16791)
-- Dependencies: 362
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid, last_webauthn_challenge_data) FROM stdin;
\.


--
-- TOC entry 4431 (class 0 OID 17041)
-- Dependencies: 372
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_authorizations (id, authorization_id, client_id, user_id, redirect_uri, scope, state, resource, code_challenge, code_challenge_method, response_type, status, authorization_code, created_at, expires_at, approved_at) FROM stdin;
\.


--
-- TOC entry 4430 (class 0 OID 17011)
-- Dependencies: 371
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_clients (id, client_secret_hash, registration_type, redirect_uris, grant_types, client_name, client_uri, logo_uri, created_at, updated_at, deleted_at, client_type) FROM stdin;
\.


--
-- TOC entry 4432 (class 0 OID 17074)
-- Dependencies: 373
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_consents (id, user_id, client_id, scopes, granted_at, revoked_at) FROM stdin;
\.


--
-- TOC entry 4429 (class 0 OID 16979)
-- Dependencies: 370
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
aba523b0-fa42-46f0-9dd5-d490060ee804	470acaee-8d9a-4efe-aa08-9f575f528053	confirmation_token	02edae19708789a62c4d0fe49374beea656f6ac954efbe18f350c204	abcde123@gmail.com	2025-11-17 08:08:56.089855	2025-11-17 08:08:56.089855
\.


--
-- TOC entry 4412 (class 0 OID 16507)
-- Dependencies: 350
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
00000000-0000-0000-0000-000000000000	199	svlncva3uyvv	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 13:30:50.938052+00	2025-11-19 13:30:50.938052+00	45ygxutadusj	81048bd8-4f63-40e2-b746-8b99038660f1
00000000-0000-0000-0000-000000000000	200	ahb5cnjulhuq	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 13:31:18.901533+00	2025-11-19 13:31:18.901533+00	\N	058b5385-a8d1-47da-a032-cbd786a47732
00000000-0000-0000-0000-000000000000	42	7qspn52dbcqm	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-15 00:50:15.010983+00	2025-11-15 00:50:15.010983+00	\N	af34c243-91eb-4ba1-a036-4a9fb530f5dc
00000000-0000-0000-0000-000000000000	43	ciqz5imrdxcb	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-15 00:50:58.553274+00	2025-11-15 00:50:58.553274+00	\N	767e76de-ca16-41a7-9bb1-a2070edb3d01
00000000-0000-0000-0000-000000000000	44	yn4tpgniu6ku	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-15 00:52:22.664865+00	2025-11-15 00:52:22.664865+00	\N	3fc09105-ecc1-49dc-bd36-c59fb680b0ad
00000000-0000-0000-0000-000000000000	204	edcsy65ya6wm	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-20 00:30:47.687165+00	2025-11-20 00:30:47.687165+00	\N	f7dc54f9-80bc-4443-b182-888385e57a82
00000000-0000-0000-0000-000000000000	45	jmq5uenddrno	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-15 01:23:43.333332+00	2025-11-15 10:29:12.896966+00	\N	b04f216f-6663-45f6-878b-c16dc9bc5a3e
00000000-0000-0000-0000-000000000000	46	pprinxkqedst	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-15 10:29:12.906562+00	2025-11-15 10:29:12.906562+00	jmq5uenddrno	b04f216f-6663-45f6-878b-c16dc9bc5a3e
00000000-0000-0000-0000-000000000000	47	c2zhlzudw7yo	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-15 10:29:35.009291+00	2025-11-15 10:29:35.009291+00	\N	69bcfb38-12b6-48af-a3d6-1561f644e081
00000000-0000-0000-0000-000000000000	48	zxwg3jat67rd	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-15 10:43:44.826216+00	2025-11-15 10:43:44.826216+00	\N	f525eafc-66a1-4ece-b651-c37efbba7349
00000000-0000-0000-0000-000000000000	208	zkxwuozdqlik	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-20 01:04:50.710532+00	2025-11-20 01:04:50.710532+00	\N	f29e507f-6d82-4da7-a102-234d6abae963
00000000-0000-0000-0000-000000000000	49	yphcf73c4hkt	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-15 11:29:58.244518+00	2025-11-15 12:45:50.747977+00	\N	c82e4a24-32a6-47c1-9ec2-148c8a0d97ff
00000000-0000-0000-0000-000000000000	50	nw5qnvyzgsyh	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-15 12:45:50.766534+00	2025-11-15 12:45:50.766534+00	yphcf73c4hkt	c82e4a24-32a6-47c1-9ec2-148c8a0d97ff
00000000-0000-0000-0000-000000000000	51	n7xysomfp2xd	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-15 12:47:13.335066+00	2025-11-15 12:47:13.335066+00	\N	59058ada-a6e9-4985-b162-235d5f8d3f1d
00000000-0000-0000-0000-000000000000	52	6wj3cgiggdcl	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-15 12:52:38.378831+00	2025-11-15 12:52:38.378831+00	\N	85cc992e-c423-48e5-b941-59aa93238571
00000000-0000-0000-0000-000000000000	53	hztqz5lfjgtp	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-15 13:09:50.704123+00	2025-11-15 13:09:50.704123+00	\N	83ba04f4-faa5-46b7-8109-ece743b5b387
00000000-0000-0000-0000-000000000000	54	akjl3ki6fhbl	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-15 13:18:31.709446+00	2025-11-15 13:18:31.709446+00	\N	302efa12-6718-4c87-a834-f448ff9a5c10
00000000-0000-0000-0000-000000000000	311	anteqbkgwtrl	ba0393ab-fe07-419e-bead-76c7e2830274	f	2025-11-23 07:05:59.492372+00	2025-11-23 07:05:59.492372+00	5rzzo5sl7qqg	62624dab-5236-4757-864a-00bd8e425bda
00000000-0000-0000-0000-000000000000	55	t2v3qvx7a7zq	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-15 13:42:28.74212+00	2025-11-15 15:05:49.804926+00	\N	7772002d-8988-43ad-83c3-effc034e6789
00000000-0000-0000-0000-000000000000	56	4qk3mvxnwx7y	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-15 15:05:49.832743+00	2025-11-15 15:05:49.832743+00	t2v3qvx7a7zq	7772002d-8988-43ad-83c3-effc034e6789
00000000-0000-0000-0000-000000000000	57	dyqqbfyijatt	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-15 15:07:27.061425+00	2025-11-15 15:07:27.061425+00	\N	802485cd-8393-4183-88e5-e12cdf01f49d
00000000-0000-0000-0000-000000000000	58	hmf4ejs4w6na	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-15 15:17:22.117656+00	2025-11-15 15:17:22.117656+00	\N	9d51d8a3-5396-488c-ab80-48107b5aacf6
00000000-0000-0000-0000-000000000000	59	n6myb5ryeopv	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-15 15:18:21.918696+00	2025-11-16 05:21:15.074677+00	\N	423da25a-c517-4775-9435-89fef285d168
00000000-0000-0000-0000-000000000000	60	3gcaqv6edluw	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-16 05:21:15.081531+00	2025-11-16 05:21:15.081531+00	n6myb5ryeopv	423da25a-c517-4775-9435-89fef285d168
00000000-0000-0000-0000-000000000000	213	wuk4eqjw3jyo	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-20 09:22:03.073288+00	2025-11-20 09:22:03.073288+00	\N	867c55fb-0d4c-4fb6-bf64-d4ef81005c0f
00000000-0000-0000-0000-000000000000	61	2ggxxntcufsa	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-16 05:22:28.815359+00	2025-11-16 06:20:53.440728+00	\N	54e63732-9165-41a0-b77f-a664fe65dda4
00000000-0000-0000-0000-000000000000	62	vymtgizs3lg6	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-16 06:20:53.4506+00	2025-11-16 07:19:20.983299+00	2ggxxntcufsa	54e63732-9165-41a0-b77f-a664fe65dda4
00000000-0000-0000-0000-000000000000	63	obxx522it7tq	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-16 07:19:20.992253+00	2025-11-16 08:17:52.5334+00	vymtgizs3lg6	54e63732-9165-41a0-b77f-a664fe65dda4
00000000-0000-0000-0000-000000000000	64	vcwhqeb2htgf	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-16 08:17:52.555131+00	2025-11-16 08:17:52.555131+00	obxx522it7tq	54e63732-9165-41a0-b77f-a664fe65dda4
00000000-0000-0000-0000-000000000000	65	5lqcpspndadt	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-16 08:57:03.321669+00	2025-11-16 08:57:03.321669+00	\N	9fcdb657-4d44-448f-9798-1bc1ba155325
00000000-0000-0000-0000-000000000000	66	zlnga3efvwcd	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-16 09:03:13.528515+00	2025-11-16 09:03:13.528515+00	\N	84fd7982-ff53-4373-a13b-b4cd315788a7
00000000-0000-0000-0000-000000000000	67	qrnmiyebjpqi	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-16 09:39:30.766203+00	2025-11-16 09:39:30.766203+00	\N	34a2b222-3228-4d8c-9530-6639be3d92e3
00000000-0000-0000-0000-000000000000	68	su3f4hvezgbr	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-16 09:45:59.871944+00	2025-11-16 09:45:59.871944+00	\N	1456dabd-29c4-4797-9f8e-63d64188e287
00000000-0000-0000-0000-000000000000	69	pzzzbhh7cuxd	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-16 09:51:43.810568+00	2025-11-16 09:51:43.810568+00	\N	f34faee7-3c4f-4d9f-93a6-90b06f3cd00b
00000000-0000-0000-0000-000000000000	70	cx4iwuw3pthj	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-16 09:55:01.630864+00	2025-11-16 09:55:01.630864+00	\N	d7671fc0-69f2-42cb-9d88-674f57d62866
00000000-0000-0000-0000-000000000000	71	rre74s7hjgcq	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-16 09:59:34.884218+00	2025-11-16 09:59:34.884218+00	\N	d1361007-395b-4e7e-9663-bbd21164eea4
00000000-0000-0000-0000-000000000000	72	cnx2n4ndr6ka	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-16 10:06:10.539804+00	2025-11-16 11:04:21.515702+00	\N	e301bce3-ad2a-4b31-8173-2ae1acbb4f35
00000000-0000-0000-0000-000000000000	73	vb5axkivi2ub	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-16 11:04:21.527777+00	2025-11-16 11:04:21.527777+00	cnx2n4ndr6ka	e301bce3-ad2a-4b31-8173-2ae1acbb4f35
00000000-0000-0000-0000-000000000000	74	thkcfulrdz4q	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-16 11:30:38.060956+00	2025-11-16 11:30:38.060956+00	\N	83116804-48b5-4ca6-8527-e420de2a52fa
00000000-0000-0000-0000-000000000000	75	rja2jzzgebnw	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-16 11:36:11.646211+00	2025-11-16 11:36:11.646211+00	\N	ef3e800f-ef3b-4771-a7b8-7b61b158b93f
00000000-0000-0000-0000-000000000000	76	p6gjtrnhx25c	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-16 11:39:40.445473+00	2025-11-16 11:39:40.445473+00	\N	ff4837b8-3cfc-4988-b560-f55d5aedcec8
00000000-0000-0000-0000-000000000000	77	h7tuxlb7vv3q	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-16 11:52:48.299446+00	2025-11-16 11:52:48.299446+00	\N	2d8ed319-0b15-4e65-b677-16afb04855eb
00000000-0000-0000-0000-000000000000	78	gvppy3kh4dlf	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-16 11:55:54.952699+00	2025-11-16 11:55:54.952699+00	\N	04870553-8c8f-4b5d-bb78-11e006ca2d77
00000000-0000-0000-0000-000000000000	210	ktsjnnwqczia	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-20 01:28:06.996182+00	2025-11-20 17:28:47.262208+00	\N	dbf99cc6-dcd9-4c17-8969-7d479b477d25
00000000-0000-0000-0000-000000000000	225	zywwrvaih2p7	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-20 17:28:47.279619+00	2025-11-20 17:28:47.279619+00	ktsjnnwqczia	dbf99cc6-dcd9-4c17-8969-7d479b477d25
00000000-0000-0000-0000-000000000000	227	kejmta4q566u	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-20 17:31:48.670506+00	2025-11-20 20:00:54.564101+00	\N	9e6eb85e-afbf-41f6-b062-3702d636b090
00000000-0000-0000-0000-000000000000	234	itdlgynb36tb	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-20 20:00:54.58035+00	2025-11-20 20:00:54.58035+00	kejmta4q566u	9e6eb85e-afbf-41f6-b062-3702d636b090
00000000-0000-0000-0000-000000000000	242	psjydb6klwru	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-21 08:00:35.185227+00	2025-11-21 08:00:35.185227+00	\N	8e700914-d7b5-42a2-9f3c-728deaf02ea9
00000000-0000-0000-0000-000000000000	245	qmyqrlk7jime	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-21 08:05:24.636806+00	2025-11-21 08:05:24.636806+00	\N	da0d6e8d-b637-418b-b447-30fd3b3fca18
00000000-0000-0000-0000-000000000000	247	pqlp44dvuqvq	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-21 08:17:38.00464+00	2025-11-21 09:17:30.004246+00	\N	3a69d365-4dca-4141-97d1-5cff06d8a5bf
00000000-0000-0000-0000-000000000000	255	rr5dg2tjrf6k	7ca06e14-818b-4d5d-b8f5-6ba6c5ee3573	f	2025-11-21 09:31:49.194284+00	2025-11-21 09:31:49.194284+00	\N	afb2dafc-a8e7-41d1-ac45-f2ebe833f3f8
00000000-0000-0000-0000-000000000000	256	fmtnxebqdr2f	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-21 09:32:34.891122+00	2025-11-21 09:32:34.891122+00	\N	92749ca3-d568-40dc-93ce-19dea6ffb1e2
00000000-0000-0000-0000-000000000000	261	rolbkzl532a6	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-21 09:44:53.522865+00	2025-11-21 09:44:53.522865+00	\N	25b7ecec-c998-466b-b215-911c94785a09
00000000-0000-0000-0000-000000000000	79	w4zeuhanmz2e	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-16 12:06:45.950696+00	2025-11-16 12:06:45.950696+00	\N	07233942-57fc-4d69-a646-cab55121b29f
00000000-0000-0000-0000-000000000000	80	bqvhxnkn27ef	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-16 12:15:17.583352+00	2025-11-16 12:15:17.583352+00	\N	64ae4bee-599c-47d8-affa-f05cd72886ba
00000000-0000-0000-0000-000000000000	81	lewqylkez7qu	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-16 12:33:40.353791+00	2025-11-16 12:33:40.353791+00	\N	2d5338b2-ff5d-44ad-84b1-842672eeee95
00000000-0000-0000-0000-000000000000	82	hbkbzl4auo3b	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-16 12:55:45.308768+00	2025-11-16 12:55:45.308768+00	\N	f6848ff2-33f3-4a2d-865d-bf1fb28a60b5
00000000-0000-0000-0000-000000000000	83	fkfglggt3kil	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-16 13:09:50.189223+00	2025-11-16 13:09:50.189223+00	\N	9a80a8fb-cdbe-4998-9a6a-f2822a6df306
00000000-0000-0000-0000-000000000000	84	ca7pyjyc4urh	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-16 13:37:21.378045+00	2025-11-16 13:37:21.378045+00	\N	672ac3bc-1a29-4523-aa4f-352c116a3967
00000000-0000-0000-0000-000000000000	85	pptvssime5xd	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-16 14:18:25.932204+00	2025-11-16 14:18:25.932204+00	\N	81506044-a8c7-4b79-a57c-d509b797f1bf
00000000-0000-0000-0000-000000000000	312	7q6t33qryjfu	ba0393ab-fe07-419e-bead-76c7e2830274	f	2025-11-23 07:50:19.09181+00	2025-11-23 07:50:19.09181+00	\N	20518ae4-7b26-41ed-b740-60796ccdfb23
00000000-0000-0000-0000-000000000000	86	y4juz5hjhe54	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-16 15:01:06.145571+00	2025-11-17 00:39:17.681368+00	\N	3f160d0b-65b9-48b6-ab6c-42fd6122b1ad
00000000-0000-0000-0000-000000000000	87	uqimwtnncgw5	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-17 00:39:17.704356+00	2025-11-17 00:39:17.704356+00	y4juz5hjhe54	3f160d0b-65b9-48b6-ab6c-42fd6122b1ad
00000000-0000-0000-0000-000000000000	88	5qzobeopcq6x	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-17 00:47:22.698975+00	2025-11-17 02:24:58.098678+00	\N	f64c17c4-26a0-4173-bfb3-fc106815b082
00000000-0000-0000-0000-000000000000	89	l4ae7ihjw2ki	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-17 02:24:58.116057+00	2025-11-17 02:24:58.116057+00	5qzobeopcq6x	f64c17c4-26a0-4173-bfb3-fc106815b082
00000000-0000-0000-0000-000000000000	90	f6jmjigajhht	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-17 02:25:21.960193+00	2025-11-17 02:25:21.960193+00	\N	d778629a-179c-48b8-9d70-8b330442e3a2
00000000-0000-0000-0000-000000000000	91	psnvp5u6cwvf	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-17 04:08:13.456576+00	2025-11-17 04:08:13.456576+00	\N	fb8d4eee-a4c3-41b0-9076-188d691d7857
00000000-0000-0000-0000-000000000000	92	ppjfbfq7du5t	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-17 07:35:03.565915+00	2025-11-17 07:35:03.565915+00	\N	25033e5a-a21e-4ab4-bed5-edf192393f31
00000000-0000-0000-0000-000000000000	93	btwnejign5l4	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-17 07:35:35.659583+00	2025-11-17 07:35:35.659583+00	\N	ca662d8a-31bc-4e0b-9ad0-cc5018ef877d
00000000-0000-0000-0000-000000000000	94	wbv43w474nwb	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-17 07:36:10.018547+00	2025-11-17 07:36:10.018547+00	\N	1840b8e1-a2b1-4e97-9a3b-b8eb6895f1ca
00000000-0000-0000-0000-000000000000	95	x5pemqijpo3q	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-17 08:01:26.064014+00	2025-11-17 08:01:26.064014+00	\N	6b770129-fb2c-4875-babe-fd08f77b016b
00000000-0000-0000-0000-000000000000	96	lwxwekhqx53s	e315204d-bf6a-4f89-bd15-36dfe7f71638	f	2025-11-17 08:11:33.13833+00	2025-11-17 08:11:33.13833+00	\N	287221df-d31e-42cd-8ac5-03078f1213ce
00000000-0000-0000-0000-000000000000	97	uejy4na4lwvl	e315204d-bf6a-4f89-bd15-36dfe7f71638	f	2025-11-17 08:14:11.78281+00	2025-11-17 08:14:11.78281+00	\N	dd4bd888-51eb-4897-841d-c2cfd8b3b508
00000000-0000-0000-0000-000000000000	98	prwqlz2zijl6	e315204d-bf6a-4f89-bd15-36dfe7f71638	f	2025-11-17 08:31:34.671607+00	2025-11-17 08:31:34.671607+00	\N	0542b68d-8abf-40c3-8cfc-9506ce1a342b
00000000-0000-0000-0000-000000000000	99	vbhb3b3hjrlq	e315204d-bf6a-4f89-bd15-36dfe7f71638	f	2025-11-17 08:31:43.247349+00	2025-11-17 08:31:43.247349+00	\N	4ee25f61-9381-4d21-b941-f0286ef3df2a
00000000-0000-0000-0000-000000000000	100	iuecwdz6sneq	e315204d-bf6a-4f89-bd15-36dfe7f71638	f	2025-11-17 08:33:18.583263+00	2025-11-17 08:33:18.583263+00	\N	15346626-1426-47c8-b7e8-2c046944f6d2
00000000-0000-0000-0000-000000000000	101	ybpqmyx6r44y	e315204d-bf6a-4f89-bd15-36dfe7f71638	f	2025-11-17 08:35:47.159724+00	2025-11-17 08:35:47.159724+00	\N	bea33cec-67ae-4579-b951-9887042f47aa
00000000-0000-0000-0000-000000000000	206	cws33gg725en	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-20 00:39:48.228977+00	2025-11-20 00:39:48.228977+00	\N	2d2b82a2-9064-4f73-9c95-33a34c9939a2
00000000-0000-0000-0000-000000000000	201	27fuamqrxzbs	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-19 13:47:58.535689+00	2025-11-20 09:19:55.085217+00	\N	7b4bd510-f314-451f-bbdd-5704a4767c0a
00000000-0000-0000-0000-000000000000	315	q25rgmewh4gs	ba0393ab-fe07-419e-bead-76c7e2830274	t	2025-11-23 08:37:17.303017+00	2025-11-23 09:35:31.915457+00	\N	977f9651-3c41-4608-9de3-ed6352eb11c7
00000000-0000-0000-0000-000000000000	318	qgcxbcouhr4k	ba0393ab-fe07-419e-bead-76c7e2830274	f	2025-11-23 11:12:38.832589+00	2025-11-23 11:12:38.832589+00	\N	b081531e-6066-4876-9ba5-6578d01e55bc
00000000-0000-0000-0000-000000000000	103	itw23nv2cwaa	e315204d-bf6a-4f89-bd15-36dfe7f71638	t	2025-11-17 08:41:11.211668+00	2025-11-17 11:32:07.850301+00	\N	6e3ef5f7-dad6-4b91-af42-3f133150b681
00000000-0000-0000-0000-000000000000	111	bfo4m7vu5vpb	e315204d-bf6a-4f89-bd15-36dfe7f71638	f	2025-11-17 11:32:07.852521+00	2025-11-17 11:32:07.852521+00	itw23nv2cwaa	6e3ef5f7-dad6-4b91-af42-3f133150b681
00000000-0000-0000-0000-000000000000	112	skf5g3sx2eo5	e315204d-bf6a-4f89-bd15-36dfe7f71638	f	2025-11-17 11:32:18.467207+00	2025-11-17 11:32:18.467207+00	\N	509067e3-394d-41d4-bee8-6e09fd88451c
00000000-0000-0000-0000-000000000000	117	tffyimlpggv3	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-17 15:13:57.62001+00	2025-11-17 15:13:57.62001+00	\N	92cc1722-de96-4195-ad0d-aa00f3af7757
00000000-0000-0000-0000-000000000000	118	dhu7nt4xwuot	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-17 15:29:22.288198+00	2025-11-17 15:29:22.288198+00	\N	5bac1861-54fe-4f38-88df-637a52cf1e45
00000000-0000-0000-0000-000000000000	119	dfmksvcafvcn	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-17 15:35:02.767773+00	2025-11-17 15:35:02.767773+00	\N	ece05753-e369-4662-8acd-c7a9e67a037e
00000000-0000-0000-0000-000000000000	120	nietwcccwqld	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-17 16:06:11.541962+00	2025-11-17 16:06:11.541962+00	\N	a174eea9-eed5-4384-8124-04624e49ca47
00000000-0000-0000-0000-000000000000	121	amwmq4rc3yzc	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-17 16:16:52.40205+00	2025-11-17 16:16:52.40205+00	\N	36ae0956-1a5c-4bd2-a5a9-60f0c101f5f2
00000000-0000-0000-0000-000000000000	110	aqdk6iutyjj3	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-17 11:29:05.395979+00	2025-11-17 16:18:22.147988+00	\N	39c56700-6523-41eb-ab91-e041fe97e25d
00000000-0000-0000-0000-000000000000	122	4lmiucqvdxe3	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-17 16:18:22.148744+00	2025-11-17 16:18:22.148744+00	aqdk6iutyjj3	39c56700-6523-41eb-ab91-e041fe97e25d
00000000-0000-0000-0000-000000000000	123	qwkkcnorfxfy	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-17 16:29:13.275378+00	2025-11-17 16:29:13.275378+00	\N	30bda9d7-af09-466e-a022-5abd3215a3c8
00000000-0000-0000-0000-000000000000	124	v3yntqelk6hc	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-17 16:38:34.589691+00	2025-11-17 23:44:08.538699+00	\N	22f6dc90-a2eb-41ff-a38c-85c55861e936
00000000-0000-0000-0000-000000000000	125	qosd4p4vytly	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-17 23:44:08.560359+00	2025-11-17 23:44:08.560359+00	v3yntqelk6hc	22f6dc90-a2eb-41ff-a38c-85c55861e936
00000000-0000-0000-0000-000000000000	126	4q27zprkf4bj	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-17 23:45:27.443794+00	2025-11-17 23:45:27.443794+00	\N	70a75ca9-b4b7-4d91-a063-dc8701fa477b
00000000-0000-0000-0000-000000000000	127	7wsi7apbf6pa	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-17 23:52:01.248461+00	2025-11-18 08:03:38.127348+00	\N	a31eb29c-8adb-49fa-932b-bdd1106a726c
00000000-0000-0000-0000-000000000000	128	tcnlxdvcu33j	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-18 08:03:38.149718+00	2025-11-18 09:01:42.213922+00	7wsi7apbf6pa	a31eb29c-8adb-49fa-932b-bdd1106a726c
00000000-0000-0000-0000-000000000000	129	nxc5c6t6xqz6	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-18 09:01:42.227701+00	2025-11-18 09:01:42.227701+00	tcnlxdvcu33j	a31eb29c-8adb-49fa-932b-bdd1106a726c
00000000-0000-0000-0000-000000000000	130	vpiqwvscnrrm	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-18 09:07:29.750623+00	2025-11-18 09:07:29.750623+00	\N	d678ccca-61fc-4925-901a-2dc6c68e140d
00000000-0000-0000-0000-000000000000	131	wthydme42ywa	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-18 09:11:46.977994+00	2025-11-18 09:11:46.977994+00	\N	88e4a800-113e-4154-8ced-fa8f5aa37dea
00000000-0000-0000-0000-000000000000	132	dc5hreom56c4	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-18 09:47:30.16149+00	2025-11-18 09:47:30.16149+00	\N	a0215edb-1abd-4ecb-bf81-a819eea404eb
00000000-0000-0000-0000-000000000000	133	teu3a6ttxfwe	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-18 09:51:17.500088+00	2025-11-18 09:51:17.500088+00	\N	cbbac8ee-ef91-42e5-b577-dfe74edade4a
00000000-0000-0000-0000-000000000000	134	dyxd5crpsr3q	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-18 09:57:12.461174+00	2025-11-18 09:57:12.461174+00	\N	7c26bcfe-db03-4a8a-944c-64c589a3c6bd
00000000-0000-0000-0000-000000000000	135	3w4gda7zkiiu	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-18 10:05:39.10835+00	2025-11-18 11:03:54.804192+00	\N	a21a3e35-a5f5-404a-8b6f-640b74daf7c2
00000000-0000-0000-0000-000000000000	136	zqebvisgnmrb	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-18 11:03:54.826803+00	2025-11-18 11:03:54.826803+00	3w4gda7zkiiu	a21a3e35-a5f5-404a-8b6f-640b74daf7c2
00000000-0000-0000-0000-000000000000	137	4rmnzp4jmify	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-18 11:23:02.116018+00	2025-11-18 11:23:02.116018+00	\N	e44f3b20-abe4-4ef1-aae1-ffd05791ffa8
00000000-0000-0000-0000-000000000000	195	45ygxutadusj	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-19 10:31:50.611225+00	2025-11-19 13:30:50.923488+00	\N	81048bd8-4f63-40e2-b746-8b99038660f1
00000000-0000-0000-0000-000000000000	138	hlm55llxctz5	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-18 11:44:47.913869+00	2025-11-18 12:42:49.517193+00	\N	e61fec08-ceb8-4851-b7ed-2807449c6f4b
00000000-0000-0000-0000-000000000000	198	oa3vrrkiqpgx	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-19 13:15:36.904936+00	2025-11-20 00:25:45.988366+00	\N	6ed6e54e-bfcf-4727-976b-b3f17e1ef231
00000000-0000-0000-0000-000000000000	139	xkmnpzfvmfc3	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-18 12:42:49.534486+00	2025-11-18 13:40:51.741225+00	hlm55llxctz5	e61fec08-ceb8-4851-b7ed-2807449c6f4b
00000000-0000-0000-0000-000000000000	202	f2mzh3bca2jr	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-20 00:25:46.011039+00	2025-11-20 00:25:46.011039+00	oa3vrrkiqpgx	6ed6e54e-bfcf-4727-976b-b3f17e1ef231
00000000-0000-0000-0000-000000000000	140	ux2ge55i6pgw	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-18 13:40:51.760728+00	2025-11-18 14:38:53.565441+00	xkmnpzfvmfc3	e61fec08-ceb8-4851-b7ed-2807449c6f4b
00000000-0000-0000-0000-000000000000	203	dxm6263nv2t3	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-20 00:26:14.77948+00	2025-11-20 00:26:14.77948+00	\N	2fa47d56-5c5c-46ff-9272-3bf1481fe3b2
00000000-0000-0000-0000-000000000000	141	aro6n27p27zc	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-18 14:38:53.58474+00	2025-11-18 15:48:04.061815+00	ux2ge55i6pgw	e61fec08-ceb8-4851-b7ed-2807449c6f4b
00000000-0000-0000-0000-000000000000	142	wv5aw6uq6bw2	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-18 15:48:04.076973+00	2025-11-18 15:48:04.076973+00	aro6n27p27zc	e61fec08-ceb8-4851-b7ed-2807449c6f4b
00000000-0000-0000-0000-000000000000	143	ijvvdpghteip	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-18 16:07:41.111451+00	2025-11-18 16:07:41.111451+00	\N	9932aedf-96ba-4b80-b0a3-e144ac510b72
00000000-0000-0000-0000-000000000000	207	4ixxqpezus7r	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-20 00:58:25.896942+00	2025-11-20 00:58:25.896942+00	\N	b5660374-5056-406f-a9fa-b9addbda1d14
00000000-0000-0000-0000-000000000000	313	2t5yndoabjo4	ba0393ab-fe07-419e-bead-76c7e2830274	f	2025-11-23 08:10:34.861441+00	2025-11-23 08:10:34.861441+00	\N	bb5f9e8a-3f83-42f6-9b1b-12b4aebc7571
00000000-0000-0000-0000-000000000000	212	aygewe5daelg	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-20 09:19:55.106631+00	2025-11-20 09:19:55.106631+00	27fuamqrxzbs	7b4bd510-f314-451f-bbdd-5704a4767c0a
00000000-0000-0000-0000-000000000000	316	ifo5o7mk7zng	ba0393ab-fe07-419e-bead-76c7e2830274	f	2025-11-23 09:35:31.931353+00	2025-11-23 09:35:31.931353+00	q25rgmewh4gs	977f9651-3c41-4608-9de3-ed6352eb11c7
00000000-0000-0000-0000-000000000000	319	sfulhqn6zjck	ba0393ab-fe07-419e-bead-76c7e2830274	f	2025-11-23 11:43:22.481095+00	2025-11-23 11:43:22.481095+00	\N	32baf75c-1831-4089-a718-90c6f58ab9ba
00000000-0000-0000-0000-000000000000	320	go4v4cja23uq	ba0393ab-fe07-419e-bead-76c7e2830274	f	2025-11-23 11:43:55.726733+00	2025-11-23 11:43:55.726733+00	\N	fab6f8cf-d54b-40fe-9706-bcd0dbfc5faa
00000000-0000-0000-0000-000000000000	321	jh56gzxj3x7w	ba0393ab-fe07-419e-bead-76c7e2830274	t	2025-11-23 11:44:52.832904+00	2025-11-23 12:43:17.931337+00	\N	44cf7989-5ec9-4bab-9513-19dd607429c0
00000000-0000-0000-0000-000000000000	151	kygdhxjtxw4u	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-18 23:53:15.520646+00	2025-11-18 23:53:15.520646+00	\N	8c2d2e7c-7baf-4d7a-9bfa-3d828ef2512a
00000000-0000-0000-0000-000000000000	152	fcduiqcffspv	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 00:11:11.058489+00	2025-11-19 00:11:11.058489+00	\N	30dba8b3-0e58-472e-b329-c41f167bc372
00000000-0000-0000-0000-000000000000	323	ytzoamnqtiyd	ba0393ab-fe07-419e-bead-76c7e2830274	f	2025-11-23 12:59:47.349711+00	2025-11-23 12:59:47.349711+00	\N	4dc8ba0a-6dee-4635-813e-3965c237e047
00000000-0000-0000-0000-000000000000	156	2ssscweo5lvt	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 00:46:22.618535+00	2025-11-19 00:46:22.618535+00	\N	d4b4b45d-8ef2-43ae-b3e7-6124ac62c875
00000000-0000-0000-0000-000000000000	158	kk5f2p2nvboo	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 00:55:43.975524+00	2025-11-19 00:55:43.975524+00	\N	9e5bc22d-b45d-4a86-b09f-9a1a142994a1
00000000-0000-0000-0000-000000000000	159	ip6xpkznbiol	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 01:06:16.784072+00	2025-11-19 01:06:16.784072+00	\N	92f33a98-96b1-4317-bf8e-00eea2a0fd90
00000000-0000-0000-0000-000000000000	160	vogvjni3msp4	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 01:34:08.081278+00	2025-11-19 01:34:08.081278+00	\N	bed12b30-661c-4a89-8a9d-230f5d5691ff
00000000-0000-0000-0000-000000000000	161	qyraymxlcolk	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 01:35:15.933545+00	2025-11-19 01:35:15.933545+00	\N	b93c2fba-6604-4c76-87e7-cf7709a47eb7
00000000-0000-0000-0000-000000000000	162	kb6xghtsrxur	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 01:40:03.61002+00	2025-11-19 01:40:03.61002+00	\N	87e17663-02d8-46fb-8a90-65657cf84c75
00000000-0000-0000-0000-000000000000	163	5froh4o2qtf4	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 01:56:40.380677+00	2025-11-19 01:56:40.380677+00	\N	fcfb93e0-f618-4ae9-826c-6619f9530f5c
00000000-0000-0000-0000-000000000000	165	vaok3xvrcwtr	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 02:41:11.942693+00	2025-11-19 02:41:11.942693+00	\N	b260cd62-b227-4179-b702-5b66b357682e
00000000-0000-0000-0000-000000000000	167	gsmbzxn3tjaq	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 03:01:39.852001+00	2025-11-19 03:01:39.852001+00	\N	18691ce6-2d14-42f9-8281-2a29cf319f85
00000000-0000-0000-0000-000000000000	170	bplrq3r42gvx	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 03:21:34.338066+00	2025-11-19 03:21:34.338066+00	\N	2c5ca983-e567-45bb-b58f-d86ba9d8b3b8
00000000-0000-0000-0000-000000000000	172	lrcvqjcsl3zh	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 03:56:36.406731+00	2025-11-19 03:56:36.406731+00	\N	a68e7aba-7d4a-419f-9da3-5236272733fc
00000000-0000-0000-0000-000000000000	175	lt7vrivqrwp3	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 04:08:06.034947+00	2025-11-19 04:08:06.034947+00	\N	555e02ae-8961-4653-a83c-6af0311310db
00000000-0000-0000-0000-000000000000	176	262yxsxmygzg	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 04:17:55.538969+00	2025-11-19 04:17:55.538969+00	\N	6bc86e78-1d5c-451a-a06f-ca52f2282fe9
00000000-0000-0000-0000-000000000000	179	wlrl72onjaq6	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 04:32:46.812976+00	2025-11-19 04:32:46.812976+00	\N	e432f008-10c6-4761-9aba-b9fcbff1d6c7
00000000-0000-0000-0000-000000000000	180	fxs2rkqqedpg	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 04:40:31.56668+00	2025-11-19 04:40:31.56668+00	\N	2ecf5fd8-45b2-433c-a4b9-30dc05f93581
00000000-0000-0000-0000-000000000000	182	6qmih5oooq3w	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 04:54:10.595175+00	2025-11-19 04:54:10.595175+00	\N	8d7ff02f-edb6-4bcf-82d0-7fa803358f27
00000000-0000-0000-0000-000000000000	184	zf4looozi2pi	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 04:55:41.923238+00	2025-11-19 04:55:41.923238+00	\N	78b714ff-0063-4a29-a245-e58dfd212331
00000000-0000-0000-0000-000000000000	252	ibt3eucvjv7s	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-21 09:17:30.004947+00	2025-11-21 09:17:30.004947+00	pqlp44dvuqvq	3a69d365-4dca-4141-97d1-5cff06d8a5bf
00000000-0000-0000-0000-000000000000	254	supymvdsboen	e315204d-bf6a-4f89-bd15-36dfe7f71638	f	2025-11-21 09:23:02.159503+00	2025-11-21 09:23:02.159503+00	\N	10988a99-c997-452b-8bc4-06df9e5bbf1a
00000000-0000-0000-0000-000000000000	187	72xxjumundqp	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 07:37:30.671362+00	2025-11-19 07:37:30.671362+00	\N	7d3cb585-bf1a-414e-879f-6e9516bcbbac
00000000-0000-0000-0000-000000000000	189	s4yktwv24vma	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 07:40:25.271889+00	2025-11-19 07:40:25.271889+00	\N	07f1ba06-3502-4cb6-943b-1551f1d6531f
00000000-0000-0000-0000-000000000000	260	5auuyv7cugy5	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-21 09:37:17.772192+00	2025-11-21 09:37:17.772192+00	\N	a1fc6635-2b13-4a66-ba02-9d39827c97d8
00000000-0000-0000-0000-000000000000	193	ccaamklr4qum	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 10:11:44.029404+00	2025-11-19 10:11:44.029404+00	\N	96973489-bb29-4839-b489-841d59bc8200
00000000-0000-0000-0000-000000000000	194	d36t7kc7ykjk	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 10:28:17.069864+00	2025-11-19 10:28:17.069864+00	\N	377fc021-f871-44a6-a77f-282c66d6fd5b
00000000-0000-0000-0000-000000000000	196	a5hfphpay5bs	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-19 13:13:45.432198+00	2025-11-19 13:13:45.432198+00	\N	d0305983-c3e7-45c1-a3da-e390db763df6
00000000-0000-0000-0000-000000000000	268	jmec5pcdblke	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-22 01:41:54.369536+00	2025-11-22 01:41:54.369536+00	\N	d2ac334e-11cb-4d83-8b33-e874d03b506c
00000000-0000-0000-0000-000000000000	310	5rzzo5sl7qqg	ba0393ab-fe07-419e-bead-76c7e2830274	t	2025-11-23 06:07:41.307227+00	2025-11-23 07:05:59.478356+00	\N	62624dab-5236-4757-864a-00bd8e425bda
00000000-0000-0000-0000-000000000000	314	b3sblqermnsc	ba0393ab-fe07-419e-bead-76c7e2830274	f	2025-11-23 08:19:34.486455+00	2025-11-23 08:19:34.486455+00	\N	c0ea65a7-cc6b-4a13-b958-b4541607176e
00000000-0000-0000-0000-000000000000	317	6imlcwtqtl4r	ba0393ab-fe07-419e-bead-76c7e2830274	f	2025-11-23 11:08:20.947179+00	2025-11-23 11:08:20.947179+00	\N	3b0528e6-7618-4688-8a5b-376215481943
00000000-0000-0000-0000-000000000000	322	xw4vp6yry7jo	ba0393ab-fe07-419e-bead-76c7e2830274	f	2025-11-23 12:43:17.945204+00	2025-11-23 12:43:17.945204+00	jh56gzxj3x7w	44cf7989-5ec9-4bab-9513-19dd607429c0
00000000-0000-0000-0000-000000000000	306	trqmt3yqa76e	552d7d2c-db5c-4cbc-b678-7ae64690c767	t	2025-11-23 04:23:23.267746+00	2025-11-23 05:21:39.195585+00	\N	68ad062b-b083-40bd-8105-72c65ecd7b30
00000000-0000-0000-0000-000000000000	307	tzlrk3umpfx2	552d7d2c-db5c-4cbc-b678-7ae64690c767	f	2025-11-23 05:21:39.221535+00	2025-11-23 05:21:39.221535+00	trqmt3yqa76e	68ad062b-b083-40bd-8105-72c65ecd7b30
\.


--
-- TOC entry 4426 (class 0 OID 16858)
-- Dependencies: 367
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- TOC entry 4427 (class 0 OID 16876)
-- Dependencies: 368
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- TOC entry 4415 (class 0 OID 16533)
-- Dependencies: 353
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
20250717082212
20250731150234
20250804100000
20250901200500
20250903112500
20250904133000
20250925093508
20251007112900
\.


--
-- TOC entry 4420 (class 0 OID 16757)
-- Dependencies: 361
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag, oauth_client_id, refresh_token_hmac_key, refresh_token_counter) FROM stdin;
da0d6e8d-b637-418b-b447-30fd3b3fca18	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-21 08:05:24.63574+00	2025-11-21 08:05:24.63574+00	\N	aal1	\N	\N	okhttp/4.12.0	131.226.114.81	\N	\N	\N	\N
3a69d365-4dca-4141-97d1-5cff06d8a5bf	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-21 08:17:38.001023+00	2025-11-21 09:17:30.010833+00	\N	aal1	\N	2025-11-21 09:17:30.010161	okhttp/4.12.0	131.226.114.81	\N	\N	\N	\N
10988a99-c997-452b-8bc4-06df9e5bbf1a	e315204d-bf6a-4f89-bd15-36dfe7f71638	2025-11-21 09:23:02.156078+00	2025-11-21 09:23:02.156078+00	\N	aal1	\N	\N	okhttp/4.12.0	131.226.114.81	\N	\N	\N	\N
54e63732-9165-41a0-b77f-a664fe65dda4	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-16 05:22:28.812788+00	2025-11-16 08:17:52.583778+00	\N	aal1	\N	2025-11-16 08:17:52.582614	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
9fcdb657-4d44-448f-9798-1bc1ba155325	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-16 08:57:03.308101+00	2025-11-16 08:57:03.308101+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
84fd7982-ff53-4373-a13b-b4cd315788a7	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-16 09:03:13.519031+00	2025-11-16 09:03:13.519031+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
34a2b222-3228-4d8c-9530-6639be3d92e3	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-16 09:39:30.756024+00	2025-11-16 09:39:30.756024+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
1456dabd-29c4-4797-9f8e-63d64188e287	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-16 09:45:59.843652+00	2025-11-16 09:45:59.843652+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
f34faee7-3c4f-4d9f-93a6-90b06f3cd00b	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-16 09:51:43.807313+00	2025-11-16 09:51:43.807313+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
d7671fc0-69f2-42cb-9d88-674f57d62866	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-16 09:55:01.622591+00	2025-11-16 09:55:01.622591+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
d1361007-395b-4e7e-9663-bbd21164eea4	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-16 09:59:34.882111+00	2025-11-16 09:59:34.882111+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
e301bce3-ad2a-4b31-8173-2ae1acbb4f35	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-16 10:06:10.536721+00	2025-11-16 11:04:21.539598+00	\N	aal1	\N	2025-11-16 11:04:21.539496	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
83116804-48b5-4ca6-8527-e420de2a52fa	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-16 11:30:38.042168+00	2025-11-16 11:30:38.042168+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
ef3e800f-ef3b-4771-a7b8-7b61b158b93f	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-16 11:36:11.643302+00	2025-11-16 11:36:11.643302+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
ff4837b8-3cfc-4988-b560-f55d5aedcec8	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-16 11:39:40.443203+00	2025-11-16 11:39:40.443203+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
2d8ed319-0b15-4e65-b677-16afb04855eb	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-16 11:52:48.296061+00	2025-11-16 11:52:48.296061+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
04870553-8c8f-4b5d-bb78-11e006ca2d77	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-16 11:55:54.943394+00	2025-11-16 11:55:54.943394+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
07233942-57fc-4d69-a646-cab55121b29f	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-16 12:06:45.948303+00	2025-11-16 12:06:45.948303+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
64ae4bee-599c-47d8-affa-f05cd72886ba	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-16 12:15:17.567969+00	2025-11-16 12:15:17.567969+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
2d5338b2-ff5d-44ad-84b1-842672eeee95	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-16 12:33:40.349009+00	2025-11-16 12:33:40.349009+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
af34c243-91eb-4ba1-a036-4a9fb530f5dc	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-15 00:50:15.004913+00	2025-11-15 00:50:15.004913+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
767e76de-ca16-41a7-9bb1-a2070edb3d01	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-15 00:50:58.551784+00	2025-11-15 00:50:58.551784+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
3fc09105-ecc1-49dc-bd36-c59fb680b0ad	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-15 00:52:22.664081+00	2025-11-15 00:52:22.664081+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
b04f216f-6663-45f6-878b-c16dc9bc5a3e	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-15 01:23:43.308281+00	2025-11-15 10:29:12.920494+00	\N	aal1	\N	2025-11-15 10:29:12.920389	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
69bcfb38-12b6-48af-a3d6-1561f644e081	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-15 10:29:35.006338+00	2025-11-15 10:29:35.006338+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
f525eafc-66a1-4ece-b651-c37efbba7349	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-15 10:43:44.810437+00	2025-11-15 10:43:44.810437+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
c82e4a24-32a6-47c1-9ec2-148c8a0d97ff	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-15 11:29:58.228968+00	2025-11-15 12:45:50.788864+00	\N	aal1	\N	2025-11-15 12:45:50.788771	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
59058ada-a6e9-4985-b162-235d5f8d3f1d	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-15 12:47:13.324723+00	2025-11-15 12:47:13.324723+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
85cc992e-c423-48e5-b941-59aa93238571	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-15 12:52:38.37524+00	2025-11-15 12:52:38.37524+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
83ba04f4-faa5-46b7-8109-ece743b5b387	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-15 13:09:50.694955+00	2025-11-15 13:09:50.694955+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
302efa12-6718-4c87-a834-f448ff9a5c10	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-15 13:18:31.690084+00	2025-11-15 13:18:31.690084+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
7772002d-8988-43ad-83c3-effc034e6789	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-15 13:42:28.735448+00	2025-11-15 15:05:49.858074+00	\N	aal1	\N	2025-11-15 15:05:49.856853	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
802485cd-8393-4183-88e5-e12cdf01f49d	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-15 15:07:27.049628+00	2025-11-15 15:07:27.049628+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
9d51d8a3-5396-488c-ab80-48107b5aacf6	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-15 15:17:22.111795+00	2025-11-15 15:17:22.111795+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
423da25a-c517-4775-9435-89fef285d168	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-15 15:18:21.915466+00	2025-11-16 05:21:15.101796+00	\N	aal1	\N	2025-11-16 05:21:15.101696	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
f6848ff2-33f3-4a2d-865d-bf1fb28a60b5	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-16 12:55:45.275815+00	2025-11-16 12:55:45.275815+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
9a80a8fb-cdbe-4998-9a6a-f2822a6df306	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-16 13:09:50.172264+00	2025-11-16 13:09:50.172264+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
672ac3bc-1a29-4523-aa4f-352c116a3967	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-16 13:37:21.367292+00	2025-11-16 13:37:21.367292+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
81506044-a8c7-4b79-a57c-d509b797f1bf	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-16 14:18:25.922225+00	2025-11-16 14:18:25.922225+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
3f160d0b-65b9-48b6-ab6c-42fd6122b1ad	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-16 15:01:06.135461+00	2025-11-17 00:39:17.73463+00	\N	aal1	\N	2025-11-17 00:39:17.733318	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
f64c17c4-26a0-4173-bfb3-fc106815b082	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-17 00:47:22.675559+00	2025-11-17 02:24:58.136069+00	\N	aal1	\N	2025-11-17 02:24:58.135403	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
d778629a-179c-48b8-9d70-8b330442e3a2	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-17 02:25:21.953101+00	2025-11-17 02:25:21.953101+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
fb8d4eee-a4c3-41b0-9076-188d691d7857	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-17 04:08:13.445427+00	2025-11-17 04:08:13.445427+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
25033e5a-a21e-4ab4-bed5-edf192393f31	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-17 07:35:03.544304+00	2025-11-17 07:35:03.544304+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
ca662d8a-31bc-4e0b-9ad0-cc5018ef877d	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-17 07:35:35.658198+00	2025-11-17 07:35:35.658198+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
1840b8e1-a2b1-4e97-9a3b-b8eb6895f1ca	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-17 07:36:10.016503+00	2025-11-17 07:36:10.016503+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
6b770129-fb2c-4875-babe-fd08f77b016b	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-17 08:01:26.061754+00	2025-11-17 08:01:26.061754+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
287221df-d31e-42cd-8ac5-03078f1213ce	e315204d-bf6a-4f89-bd15-36dfe7f71638	2025-11-17 08:11:33.134234+00	2025-11-17 08:11:33.134234+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.193.162	\N	\N	\N	\N
dd4bd888-51eb-4897-841d-c2cfd8b3b508	e315204d-bf6a-4f89-bd15-36dfe7f71638	2025-11-17 08:14:11.774479+00	2025-11-17 08:14:11.774479+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.193.162	\N	\N	\N	\N
0542b68d-8abf-40c3-8cfc-9506ce1a342b	e315204d-bf6a-4f89-bd15-36dfe7f71638	2025-11-17 08:31:34.661076+00	2025-11-17 08:31:34.661076+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.193.162	\N	\N	\N	\N
4ee25f61-9381-4d21-b941-f0286ef3df2a	e315204d-bf6a-4f89-bd15-36dfe7f71638	2025-11-17 08:31:43.24475+00	2025-11-17 08:31:43.24475+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.193.162	\N	\N	\N	\N
15346626-1426-47c8-b7e8-2c046944f6d2	e315204d-bf6a-4f89-bd15-36dfe7f71638	2025-11-17 08:33:18.581648+00	2025-11-17 08:33:18.581648+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.193.162	\N	\N	\N	\N
bea33cec-67ae-4579-b951-9887042f47aa	e315204d-bf6a-4f89-bd15-36dfe7f71638	2025-11-17 08:35:47.134587+00	2025-11-17 08:35:47.134587+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.193.162	\N	\N	\N	\N
6e3ef5f7-dad6-4b91-af42-3f133150b681	e315204d-bf6a-4f89-bd15-36dfe7f71638	2025-11-17 08:41:11.208517+00	2025-11-17 11:32:07.860807+00	\N	aal1	\N	2025-11-17 11:32:07.860719	okhttp/4.12.0	49.145.193.162	\N	\N	\N	\N
509067e3-394d-41d4-bee8-6e09fd88451c	e315204d-bf6a-4f89-bd15-36dfe7f71638	2025-11-17 11:32:18.417517+00	2025-11-17 11:32:18.417517+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.193.162	\N	\N	\N	\N
92cc1722-de96-4195-ad0d-aa00f3af7757	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-17 15:13:57.602345+00	2025-11-17 15:13:57.602345+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
5bac1861-54fe-4f38-88df-637a52cf1e45	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-17 15:29:22.282697+00	2025-11-17 15:29:22.282697+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
ece05753-e369-4662-8acd-c7a9e67a037e	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-17 15:35:02.74395+00	2025-11-17 15:35:02.74395+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
a174eea9-eed5-4384-8124-04624e49ca47	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-17 16:06:11.52616+00	2025-11-17 16:06:11.52616+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
36ae0956-1a5c-4bd2-a5a9-60f0c101f5f2	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-17 16:16:52.396868+00	2025-11-17 16:16:52.396868+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
39c56700-6523-41eb-ab91-e041fe97e25d	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-17 11:29:05.383549+00	2025-11-17 16:18:22.153049+00	\N	aal1	\N	2025-11-17 16:18:22.152962	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
30bda9d7-af09-466e-a022-5abd3215a3c8	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-17 16:29:13.270111+00	2025-11-17 16:29:13.270111+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
22f6dc90-a2eb-41ff-a38c-85c55861e936	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-17 16:38:34.584727+00	2025-11-17 23:44:08.588237+00	\N	aal1	\N	2025-11-17 23:44:08.587545	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
70a75ca9-b4b7-4d91-a063-dc8701fa477b	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-17 23:45:27.433917+00	2025-11-17 23:45:27.433917+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
88e4a800-113e-4154-8ced-fa8f5aa37dea	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-18 09:11:46.973477+00	2025-11-18 09:11:46.973477+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
a31eb29c-8adb-49fa-932b-bdd1106a726c	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-17 23:52:01.245346+00	2025-11-18 09:01:42.244282+00	\N	aal1	\N	2025-11-18 09:01:42.242961	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
d678ccca-61fc-4925-901a-2dc6c68e140d	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-18 09:07:29.731355+00	2025-11-18 09:07:29.731355+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
a0215edb-1abd-4ecb-bf81-a819eea404eb	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-18 09:47:30.135509+00	2025-11-18 09:47:30.135509+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
cbbac8ee-ef91-42e5-b577-dfe74edade4a	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-18 09:51:17.49728+00	2025-11-18 09:51:17.49728+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
7c26bcfe-db03-4a8a-944c-64c589a3c6bd	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-18 09:57:12.458251+00	2025-11-18 09:57:12.458251+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
a21a3e35-a5f5-404a-8b6f-640b74daf7c2	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-18 10:05:39.100222+00	2025-11-18 11:03:54.84789+00	\N	aal1	\N	2025-11-18 11:03:54.847794	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
e44f3b20-abe4-4ef1-aae1-ffd05791ffa8	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-18 11:23:02.105082+00	2025-11-18 11:23:02.105082+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
d0305983-c3e7-45c1-a3da-e390db763df6	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 13:13:45.422548+00	2025-11-19 13:13:45.422548+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
e61fec08-ceb8-4851-b7ed-2807449c6f4b	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-18 11:44:47.900933+00	2025-11-18 15:48:04.102059+00	\N	aal1	\N	2025-11-18 15:48:04.100257	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
9932aedf-96ba-4b80-b0a3-e144ac510b72	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-18 16:07:41.086224+00	2025-11-18 16:07:41.086224+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
d2ac334e-11cb-4d83-8b33-e874d03b506c	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-22 01:41:54.36412+00	2025-11-22 01:41:54.36412+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.192.151	\N	\N	\N	\N
afb2dafc-a8e7-41d1-ac45-f2ebe833f3f8	7ca06e14-818b-4d5d-b8f5-6ba6c5ee3573	2025-11-21 09:31:49.191674+00	2025-11-21 09:31:49.191674+00	\N	aal1	\N	\N	okhttp/4.12.0	131.226.114.81	\N	\N	\N	\N
92749ca3-d568-40dc-93ce-19dea6ffb1e2	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-21 09:32:34.886812+00	2025-11-21 09:32:34.886812+00	\N	aal1	\N	\N	okhttp/4.12.0	131.226.114.81	\N	\N	\N	\N
8c2d2e7c-7baf-4d7a-9bfa-3d828ef2512a	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-18 23:53:15.518917+00	2025-11-18 23:53:15.518917+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
30dba8b3-0e58-472e-b329-c41f167bc372	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 00:11:11.045523+00	2025-11-19 00:11:11.045523+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
a1fc6635-2b13-4a66-ba02-9d39827c97d8	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-21 09:37:17.771417+00	2025-11-21 09:37:17.771417+00	\N	aal1	\N	\N	okhttp/4.12.0	131.226.114.81	\N	\N	\N	\N
25b7ecec-c998-466b-b215-911c94785a09	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-21 09:44:53.50879+00	2025-11-21 09:44:53.50879+00	\N	aal1	\N	\N	okhttp/4.12.0	131.226.114.81	\N	\N	\N	\N
d4b4b45d-8ef2-43ae-b3e7-6124ac62c875	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 00:46:22.617503+00	2025-11-19 00:46:22.617503+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
9e5bc22d-b45d-4a86-b09f-9a1a142994a1	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 00:55:43.974177+00	2025-11-19 00:55:43.974177+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
92f33a98-96b1-4317-bf8e-00eea2a0fd90	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 01:06:16.779012+00	2025-11-19 01:06:16.779012+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
bed12b30-661c-4a89-8a9d-230f5d5691ff	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 01:34:08.066779+00	2025-11-19 01:34:08.066779+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
b93c2fba-6604-4c76-87e7-cf7709a47eb7	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 01:35:15.932294+00	2025-11-19 01:35:15.932294+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
87e17663-02d8-46fb-8a90-65657cf84c75	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 01:40:03.606706+00	2025-11-19 01:40:03.606706+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
fcfb93e0-f618-4ae9-826c-6619f9530f5c	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 01:56:40.350446+00	2025-11-19 01:56:40.350446+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
b260cd62-b227-4179-b702-5b66b357682e	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 02:41:11.934984+00	2025-11-19 02:41:11.934984+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
18691ce6-2d14-42f9-8281-2a29cf319f85	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 03:01:39.849587+00	2025-11-19 03:01:39.849587+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
2c5ca983-e567-45bb-b58f-d86ba9d8b3b8	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 03:21:34.336993+00	2025-11-19 03:21:34.336993+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
a68e7aba-7d4a-419f-9da3-5236272733fc	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 03:56:36.405458+00	2025-11-19 03:56:36.405458+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
555e02ae-8961-4653-a83c-6af0311310db	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 04:08:06.034206+00	2025-11-19 04:08:06.034206+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
6bc86e78-1d5c-451a-a06f-ca52f2282fe9	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 04:17:55.53314+00	2025-11-19 04:17:55.53314+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
e432f008-10c6-4761-9aba-b9fcbff1d6c7	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 04:32:46.806616+00	2025-11-19 04:32:46.806616+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
2ecf5fd8-45b2-433c-a4b9-30dc05f93581	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 04:40:31.558801+00	2025-11-19 04:40:31.558801+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
8d7ff02f-edb6-4bcf-82d0-7fa803358f27	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 04:54:10.578325+00	2025-11-19 04:54:10.578325+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
78b714ff-0063-4a29-a245-e58dfd212331	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 04:55:41.922481+00	2025-11-19 04:55:41.922481+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
7d3cb585-bf1a-414e-879f-6e9516bcbbac	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 07:37:30.669899+00	2025-11-19 07:37:30.669899+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
07f1ba06-3502-4cb6-943b-1551f1d6531f	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 07:40:25.270932+00	2025-11-19 07:40:25.270932+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
81048bd8-4f63-40e2-b746-8b99038660f1	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 10:31:50.590073+00	2025-11-19 13:30:50.950985+00	\N	aal1	\N	2025-11-19 13:30:50.950881	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
96973489-bb29-4839-b489-841d59bc8200	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 10:11:44.021752+00	2025-11-19 10:11:44.021752+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
377fc021-f871-44a6-a77f-282c66d6fd5b	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 10:28:17.045802+00	2025-11-19 10:28:17.045802+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
058b5385-a8d1-47da-a032-cbd786a47732	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 13:31:18.896035+00	2025-11-19 13:31:18.896035+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.195.245	\N	\N	\N	\N
6ed6e54e-bfcf-4727-976b-b3f17e1ef231	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 13:15:36.903018+00	2025-11-20 00:25:46.036228+00	\N	aal1	\N	2025-11-20 00:25:46.033886	okhttp/4.12.0	131.226.114.106	\N	\N	\N	\N
2fa47d56-5c5c-46ff-9272-3bf1481fe3b2	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-20 00:26:14.768552+00	2025-11-20 00:26:14.768552+00	\N	aal1	\N	\N	okhttp/4.12.0	131.226.114.106	\N	\N	\N	\N
f7dc54f9-80bc-4443-b182-888385e57a82	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-20 00:30:47.683465+00	2025-11-20 00:30:47.683465+00	\N	aal1	\N	\N	okhttp/4.12.0	131.226.114.106	\N	\N	\N	\N
2d2b82a2-9064-4f73-9c95-33a34c9939a2	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-20 00:39:48.228174+00	2025-11-20 00:39:48.228174+00	\N	aal1	\N	\N	okhttp/4.12.0	131.226.114.106	\N	\N	\N	\N
b5660374-5056-406f-a9fa-b9addbda1d14	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-20 00:58:25.876677+00	2025-11-20 00:58:25.876677+00	\N	aal1	\N	\N	okhttp/4.12.0	131.226.114.42	\N	\N	\N	\N
f29e507f-6d82-4da7-a102-234d6abae963	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-20 01:04:50.697139+00	2025-11-20 01:04:50.697139+00	\N	aal1	\N	\N	okhttp/4.12.0	131.226.114.42	\N	\N	\N	\N
7b4bd510-f314-451f-bbdd-5704a4767c0a	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-19 13:47:58.5102+00	2025-11-20 09:19:55.131145+00	\N	aal1	\N	2025-11-20 09:19:55.131056	okhttp/4.12.0	49.145.192.17	\N	\N	\N	\N
867c55fb-0d4c-4fb6-bf64-d4ef81005c0f	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-20 09:22:03.066642+00	2025-11-20 09:22:03.066642+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.192.17	\N	\N	\N	\N
dbf99cc6-dcd9-4c17-8969-7d479b477d25	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-20 01:28:06.994102+00	2025-11-20 17:28:47.299571+00	\N	aal1	\N	2025-11-20 17:28:47.298844	okhttp/4.12.0	49.145.192.17	\N	\N	\N	\N
9e6eb85e-afbf-41f6-b062-3702d636b090	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-20 17:31:48.66854+00	2025-11-20 20:00:54.598426+00	\N	aal1	\N	2025-11-20 20:00:54.598321	okhttp/4.12.0	49.145.192.17	\N	\N	\N	\N
8e700914-d7b5-42a2-9f3c-728deaf02ea9	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-21 08:00:35.184368+00	2025-11-21 08:00:35.184368+00	\N	aal1	\N	\N	okhttp/4.12.0	110.54.204.176	\N	\N	\N	\N
68ad062b-b083-40bd-8105-72c65ecd7b30	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-23 04:23:23.257711+00	2025-11-23 05:21:39.24726+00	\N	aal1	\N	2025-11-23 05:21:39.247165	okhttp/4.12.0	49.145.192.151	\N	\N	\N	\N
62624dab-5236-4757-864a-00bd8e425bda	ba0393ab-fe07-419e-bead-76c7e2830274	2025-11-23 06:07:41.302078+00	2025-11-23 07:05:59.520492+00	\N	aal1	\N	2025-11-23 07:05:59.520378	okhttp/4.12.0	49.145.192.151	\N	\N	\N	\N
20518ae4-7b26-41ed-b740-60796ccdfb23	ba0393ab-fe07-419e-bead-76c7e2830274	2025-11-23 07:50:19.068554+00	2025-11-23 07:50:19.068554+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.192.151	\N	\N	\N	\N
bb5f9e8a-3f83-42f6-9b1b-12b4aebc7571	ba0393ab-fe07-419e-bead-76c7e2830274	2025-11-23 08:10:34.846806+00	2025-11-23 08:10:34.846806+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.192.151	\N	\N	\N	\N
c0ea65a7-cc6b-4a13-b958-b4541607176e	ba0393ab-fe07-419e-bead-76c7e2830274	2025-11-23 08:19:34.472598+00	2025-11-23 08:19:34.472598+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.192.151	\N	\N	\N	\N
977f9651-3c41-4608-9de3-ed6352eb11c7	ba0393ab-fe07-419e-bead-76c7e2830274	2025-11-23 08:37:17.286223+00	2025-11-23 09:35:31.951594+00	\N	aal1	\N	2025-11-23 09:35:31.951488	okhttp/4.12.0	49.145.192.151	\N	\N	\N	\N
3b0528e6-7618-4688-8a5b-376215481943	ba0393ab-fe07-419e-bead-76c7e2830274	2025-11-23 11:08:20.911468+00	2025-11-23 11:08:20.911468+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.192.151	\N	\N	\N	\N
b081531e-6066-4876-9ba5-6578d01e55bc	ba0393ab-fe07-419e-bead-76c7e2830274	2025-11-23 11:12:38.814341+00	2025-11-23 11:12:38.814341+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.192.151	\N	\N	\N	\N
32baf75c-1831-4089-a718-90c6f58ab9ba	ba0393ab-fe07-419e-bead-76c7e2830274	2025-11-23 11:43:22.455928+00	2025-11-23 11:43:22.455928+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.192.151	\N	\N	\N	\N
fab6f8cf-d54b-40fe-9706-bcd0dbfc5faa	ba0393ab-fe07-419e-bead-76c7e2830274	2025-11-23 11:43:55.725895+00	2025-11-23 11:43:55.725895+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.192.151	\N	\N	\N	\N
44cf7989-5ec9-4bab-9513-19dd607429c0	ba0393ab-fe07-419e-bead-76c7e2830274	2025-11-23 11:44:52.832078+00	2025-11-23 12:43:17.953629+00	\N	aal1	\N	2025-11-23 12:43:17.953535	okhttp/4.12.0	49.145.192.151	\N	\N	\N	\N
4dc8ba0a-6dee-4635-813e-3965c237e047	ba0393ab-fe07-419e-bead-76c7e2830274	2025-11-23 12:59:47.33112+00	2025-11-23 12:59:47.33112+00	\N	aal1	\N	\N	okhttp/4.12.0	49.145.192.151	\N	\N	\N	\N
\.


--
-- TOC entry 4425 (class 0 OID 16843)
-- Dependencies: 366
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 4424 (class 0 OID 16834)
-- Dependencies: 365
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at, disabled) FROM stdin;
\.


--
-- TOC entry 4410 (class 0 OID 16495)
-- Dependencies: 348
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
00000000-0000-0000-0000-000000000000	470acaee-8d9a-4efe-aa08-9f575f528053	authenticated	authenticated	abcde123@gmail.com	$2a$10$s5rANPABU9ftfkKMFQnHye657dn57.qMKHHZpi9pgrDi0wLmwa2Sq	\N	\N	02edae19708789a62c4d0fe49374beea656f6ac954efbe18f350c204	2025-11-17 08:08:53.247432+00		\N			\N	\N	{"provider": "email", "providers": ["email"]}	{"sub": "470acaee-8d9a-4efe-aa08-9f575f528053", "email": "abcde123@gmail.com", "email_verified": false, "phone_verified": false}	\N	2025-11-17 08:08:53.227556+00	2025-11-17 08:08:56.076798+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	92548ce1-e669-4be6-8135-7abbbbcca876	authenticated	authenticated	zichri6767@gmail.com	$2a$10$HoeA3gBbyKlMFXP7TcS9xOlaq4dtAOH.c0Cd26L.yejXd/cUvOFAm	2025-11-19 07:36:30.831623+00	\N		2025-11-19 07:36:13.667251+00		\N			\N	2025-11-21 09:35:37.363526+00	{"provider": "email", "providers": ["email"]}	{"sub": "92548ce1-e669-4be6-8135-7abbbbcca876", "email": "zichri6767@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-11-19 07:36:13.60679+00	2025-11-21 09:35:37.396255+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	b51354b7-74cf-4a2b-ad3f-3ec6543f1592	authenticated	authenticated	kentdominic2004@gmail.com	$2a$10$YyDRiG.AryZf4UN0EtIElO0i4ScpPosT6nVF8hi7VLIbJFY5lmrYi	2025-11-17 09:32:21.700154+00	\N		2025-11-17 09:31:59.095216+00		\N			\N	2025-11-21 09:14:38.76991+00	{"provider": "email", "providers": ["email"]}	{"sub": "b51354b7-74cf-4a2b-ad3f-3ec6543f1592", "email": "kentdominic2004@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-11-17 09:31:59.027984+00	2025-11-21 09:14:38.786145+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	ba0393ab-fe07-419e-bead-76c7e2830274	authenticated	authenticated	rosalesmariche2@gmail.com	$2a$10$j3O1Buvlhijo8iCmmnmTKeML8SReXnSkDJEdsvT0PADcieSVg1tG2	2025-11-19 03:11:13.00535+00	\N		2025-11-19 03:10:38.655614+00		\N			\N	2025-11-23 12:59:47.330312+00	{"provider": "email", "providers": ["email"]}	{"sub": "ba0393ab-fe07-419e-bead-76c7e2830274", "email": "rosalesmariche2@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-11-19 03:10:38.629994+00	2025-11-23 12:59:47.374831+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	7ca06e14-818b-4d5d-b8f5-6ba6c5ee3573	authenticated	authenticated	jamesanthonyjuntilla@gmail.com	$2a$10$hSCMTC5ZNDK0vxstfX78YOeqORp5hFAt7ert2qJlZiE8KhB7rti66	2025-11-21 09:31:49.186847+00	\N		2025-11-21 09:31:25.685858+00		\N			\N	2025-11-21 09:31:49.191584+00	{"provider": "email", "providers": ["email"]}	{"sub": "7ca06e14-818b-4d5d-b8f5-6ba6c5ee3573", "email": "jamesanthonyjuntilla@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-11-21 09:31:25.657743+00	2025-11-21 09:31:49.198217+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	e315204d-bf6a-4f89-bd15-36dfe7f71638	authenticated	authenticated	ohahalabyo@gmail.com	$2a$10$RoS0xu17ZyDD3PdZrZaWU.xZ6n5e2nJVnEjIEd4uXcVhkm6o26FTG	2025-11-17 08:11:33.128064+00	\N		2025-11-17 08:10:27.980922+00		\N			\N	2025-11-21 09:23:02.155981+00	{"provider": "email", "providers": ["email"]}	{"sub": "e315204d-bf6a-4f89-bd15-36dfe7f71638", "email": "ohahalabyo@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-11-17 08:10:27.970346+00	2025-11-21 09:23:02.162498+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	552d7d2c-db5c-4cbc-b678-7ae64690c767	authenticated	authenticated	cabatinganlukezichri@gmail.com	$2a$10$k6jv75lMOPoT2SubTVCa7.g/eZ.n6R91zdoKl8nuj5YpZDGgQX8LC	2025-11-15 00:50:14.997934+00	\N		2025-11-15 00:49:59.017444+00		\N			\N	2025-11-23 04:23:23.25649+00	{"provider": "email", "providers": ["email"]}	{"sub": "552d7d2c-db5c-4cbc-b678-7ae64690c767", "email": "cabatinganlukezichri@gmail.com", "email_verified": true, "phone_verified": false}	\N	2025-11-15 00:49:58.989343+00	2025-11-23 05:21:39.238526+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- TOC entry 4456 (class 0 OID 17601)
-- Dependencies: 401
-- Data for Name: courier; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.courier (vehicle_id, vehicle_color, plate_number, license_front, vehicle_brand, otherdetails_vehicle, created_at, user_id, license_back, user_status, rejection_reason, suspension_reason) FROM stdin;
2	Blue 	XAC-135	https://uyfiukgtxkjavgvitzvf.supabase.co/storage/v1/object/public/licenses/b51354b7-74cf-4a2b-ad3f-3ec6543f1592/license_front.jpeg	Honda	Medyo Guba	2025-11-17 09:57:52.688245+00	b51354b7-74cf-4a2b-ad3f-3ec6543f1592	\N	1	\N	\N
2	Black	AFCE12	https://uyfiukgtxkjavgvitzvf.supabase.co/storage/v1/object/public/licenses/552d7d2c-db5c-4cbc-b678-7ae64690c767/license_front.jpeg	Honda	Wag ligid	2025-11-15 01:29:28.580002+00	552d7d2c-db5c-4cbc-b678-7ae64690c767	\N	3	\N	\N
7	Red	FGH124	https://uyfiukgtxkjavgvitzvf.supabase.co/storage/v1/object/public/licenses/92548ce1-e669-4be6-8135-7abbbbcca876/license_front_1763537972400.jpeg	Yamaha	WAY AYO	2025-11-19 07:39:43.915446+00	92548ce1-e669-4be6-8135-7abbbbcca876	https://uyfiukgtxkjavgvitzvf.supabase.co/storage/v1/object/public/licenses/92548ce1-e669-4be6-8135-7abbbbcca876/license_back_1763537972400.jpeg	1	\N	\N
3	Red	FAS124	https://uyfiukgtxkjavgvitzvf.supabase.co/storage/v1/object/public/licenses/ba0393ab-fe07-419e-bead-76c7e2830274/license_front_1763522408448.jpeg	Yamaha	Way Ligid	2025-11-19 03:20:14.952125+00	ba0393ab-fe07-419e-bead-76c7e2830274	https://uyfiukgtxkjavgvitzvf.supabase.co/storage/v1/object/public/licenses/ba0393ab-fe07-419e-bead-76c7e2830274/license_back_1763522408448.png	1	\N	\N
\.


--
-- TOC entry 4450 (class 0 OID 17549)
-- Dependencies: 395
-- Data for Name: delivery_service; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.delivery_service (service_id, service_name) FROM stdin;
1	pasundo
2	pasugo
\.


--
-- TOC entry 4446 (class 0 OID 17527)
-- Dependencies: 391
-- Data for Name: delivery_status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.delivery_status (deliverstatus_id, status_name) FROM stdin;
1	pending
2	accepted
3	ongoing
4	completed
5	cancelled
\.


--
-- TOC entry 4459 (class 0 OID 17697)
-- Dependencies: 404
-- Data for Name: fare_configuration; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fare_configuration (config_id, time_rate_per_minute, platform_commission_percentage, bonus_rate, penalty_rate_per_minute, grace_period_minutes, is_active, created_at, user_id) FROM stdin;
1	9.00	0.80	3.00	32	320	t	2025-11-13 12:44:07.264606+00	552d7d2c-db5c-4cbc-b678-7ae64690c767
\.


--
-- TOC entry 4465 (class 0 OID 17755)
-- Dependencies: 410
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favorites (favorite_id, created_at, user_id, order_id) FROM stdin;
2	2025-11-23 13:00:13.107113+00	ba0393ab-fe07-419e-bead-76c7e2830274	4
\.


--
-- TOC entry 4452 (class 0 OID 17560)
-- Dependencies: 397
-- Data for Name: goods_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.goods_category (category_id, category_name) FROM stdin;
1	Food & Beverages
2	Documents & Papers
3	School & Office Supplies
4	Clothing & Apparel
5	Electronics & Gadgets
6	Household & Hardware
7	Medicines & Health Products
8	Others / Miscellaneous
\.


--
-- TOC entry 4467 (class 0 OID 17775)
-- Dependencies: 412
-- Data for Name: history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.history (history_id, action_type, created_at, user_id) FROM stdin;
\.


--
-- TOC entry 4457 (class 0 OID 17650)
-- Dependencies: 402
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."order" (order_id, service_id, payment_id, deliverystatus_id, vehicle_id, category_id, pickup_address, dropoff_address, goods_image1, other_details, rush_fee, is_scheduled, created_at, scheduled_pickup_time, distance, estimated_duration, base_fare_component, distance_charge_component, time_charge_component, vehicle_charge_component, bonus_charge_component, commission_amount, penalty_amount, total_fare, user_id, courier_id, pickup_latitude, pickup_longitude, dropoff_latitude, dropoff_longitude, goods_image2, goods_image3, accepted_at) FROM stdin;
4	1	2	1	4	2	Jasaan Central School, Jose P. Rizal Street, Jasaan, 9003 MN, Philippines	Jasaan Public Market, Manuel L. Quezon Street, Jasaan, 9003 MN, Philippines	file:///data/user/0/com.cabzcyber.pickarrymb/cache/ImagePicker/ff30caad-bfa4-444c-9e95-a7a707554b07.jpeg	dfwafawfhgwhwh	10.00	t	2025-11-22 01:53:35.482+00	2025-11-14 06:53:00	0.41	1	10.00	0.82	9.00	0.00	10.00	0.24	0.00	29.82	ba0393ab-fe07-419e-bead-76c7e2830274	\N	8.653776670216434	124.75419500643407	8.651674109401208	124.75233078002931	file:///data/user/0/com.cabzcyber.pickarrymb/cache/ImagePicker/751ce1a8-d95a-405b-bcd7-08a675387b12.jpeg	file:///data/user/0/com.cabzcyber.pickarrymb/cache/ImagePicker/62655dbd-a3ef-4aa9-94ce-fd44307237f8.jpeg	\N
13	1	1	5	5	1	Dealer Edos, Manuel L. Quezon Street, Jasaan, 9003 MN, Philippines	Jampason Elementary School, Butuan-Cagayan de Oro-Iligan Road, Jasaan, 9003 MN, Philippines	file:///data/user/0/com.cabzcyber.pickarrymb/cache/ImagePicker/a718297f-26ac-450c-a24b-d7b95372b222.jpeg	GOOD moral	0.00	f	2025-11-23 07:15:15.925+00	2025-11-23 07:15:15.925	3.76	5	30.00	22.56	45.00	0.00	0.00	0.78	0.00	97.56	ba0393ab-fe07-419e-bead-76c7e2830274	\N	8.65177487354952	124.751987457275	8.67165670306562	124.749219417572	file:///data/user/0/com.cabzcyber.pickarrymb/cache/ImagePicker/737d585d-7b21-480b-b059-a0a879146812.jpeg	file:///data/user/0/com.cabzcyber.pickarrymb/cache/ImagePicker/00e0ffc3-b8b6-468b-acf1-cbf788366636.jpeg	\N
14	1	1	5	2	1	Dealer Edos, Manuel L. Quezon Street, Jasaan, 9003 MN, Philippines	Jampason Elementary School, Butuan-Cagayan de Oro-Iligan Road, Jasaan, 9003 MN, Philippines	file:///data/user/0/com.cabzcyber.pickarrymb/cache/ImagePicker/a718297f-26ac-450c-a24b-d7b95372b222.jpeg	GOOD moral	0.00	f	2025-11-23 08:43:53.927+00	2025-11-23 08:43:53.927	3.76	5	15.00	75.20	45.00	0.00	0.00	1.08	0.00	135.20	ba0393ab-fe07-419e-bead-76c7e2830274	\N	8.65177487354952	124.751987457275	8.67165670306562	124.749219417572	file:///data/user/0/com.cabzcyber.pickarrymb/cache/ImagePicker/737d585d-7b21-480b-b059-a0a879146812.jpeg	file:///data/user/0/com.cabzcyber.pickarrymb/cache/ImagePicker/00e0ffc3-b8b6-468b-acf1-cbf788366636.jpeg	\N
\.


--
-- TOC entry 4470 (class 0 OID 21079)
-- Dependencies: 415
-- Data for Name: overview; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.overview (id, slug, title, content, created_at, user_id) FROM stdin;
1	about	about_us	ajaaaaaaaaaaab rhtanrbdvsdnsbsb Hello	2025-11-15 11:35:59.183644+00	552d7d2c-db5c-4cbc-b678-7ae64690c767
2	terms	General Terms & Conditions	Loremm fwafghfiskanabbnnntyawavdvrvev hello	2025-11-15 11:36:42.67592+00	552d7d2c-db5c-4cbc-b678-7ae64690c767
3	contact	Contact_us	testmfmfm124124yawsdvrvev	2025-11-15 11:37:37.328312+00	552d7d2c-db5c-4cbc-b678-7ae64690c767
4	terms-and-policies	Terms Use and Policies	test egwaeghwgneouigfweg21414uawadvdv	2025-11-15 11:38:33.344209+00	552d7d2c-db5c-4cbc-b678-7ae64690c767
5	courier-policies	Customer Policies\n	tedyHFOUAHFGOUHGAFHAWPIFHAWPF12412fbdbdvsvsvscsvsvsc4	2025-11-15 11:38:56.216283+00	552d7d2c-db5c-4cbc-b678-7ae64690c767
6	customer-policies	Courier Policies	testeghasyfguyfgbsdvbkjsbviweufdkjvb124124vs a a acacac	2025-11-15 11:39:20.468171+00	552d7d2c-db5c-4cbc-b678-7ae64690c767
7	fare-policies	Fare Policies	testegsefwfehgwehsehsegsag	2025-11-15 11:39:40.125761+00	552d7d2c-db5c-4cbc-b678-7ae64690c767
\.


--
-- TOC entry 4448 (class 0 OID 17538)
-- Dependencies: 393
-- Data for Name: payment_method; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment_method (payment_id, payment_name) FROM stdin;
1	cash on delivery
2	gcash
\.


--
-- TOC entry 4454 (class 0 OID 17571)
-- Dependencies: 399
-- Data for Name: report_set; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.report_set (reportset_id, report_type) FROM stdin;
\.


--
-- TOC entry 4463 (class 0 OID 17739)
-- Dependencies: 408
-- Data for Name: report_status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.report_status (reportstatus_id, status_name) FROM stdin;
\.


--
-- TOC entry 4469 (class 0 OID 17931)
-- Dependencies: 414
-- Data for Name: service_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.service_user (user_id, userstatus_id, full_name, birth_date, gender, email_address, phone_number, address, user_type, created_at, suspension_reason) FROM stdin;
e315204d-bf6a-4f89-bd15-36dfe7f71638	1	tips	2005-06-27	male	ohahalabyo@gmail.com	639999999	kimaya	customer	2025-11-17 08:11:33.540312+00	\N
b51354b7-74cf-4a2b-ad3f-3ec6543f1592	1	Kent Dominic Gayramra	2004-10-26	male	kentdominic2004@gmail.com	639559820924	Aplaya Zone 1-A	customer	2025-11-17 09:32:22.32884+00	\N
552d7d2c-db5c-4cbc-b678-7ae64690c767	3	Ian Dave Dianne Test	2004-11-08	female	cabatinganlukezichri@gmail.com	639923909343	Jasaan Lower	admin	2025-11-15 00:50:15.634435+00	\N
ba0393ab-fe07-419e-bead-76c7e2830274	1	Rosales Mariche	2004-11-08	male	rosalesmariche2@gmail.com	639923909343	Cabacungan	customer	2025-11-19 03:11:13.318751+00	\N
92548ce1-e669-4be6-8135-7abbbbcca876	1	Luke Cabatingan Teest	2004-11-03	male	zichri6767@gmail.com	639923909343	Jampason Zone 2	customer	2025-11-19 07:36:31.48671+00	\N
\.


--
-- TOC entry 4442 (class 0 OID 17462)
-- Dependencies: 387
-- Data for Name: type_vehicle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.type_vehicle (vehicle_id, vehicle_name, base_fare, distance_rate_per_km, slug, user_id) FROM stdin;
6	Passenger Car	45	10	passenger-car	552d7d2c-db5c-4cbc-b678-7ae64690c767
2	Motorcycle	15	20	motorcycle	552d7d2c-db5c-4cbc-b678-7ae64690c767
3	Bicycle	18	2	bicycle	552d7d2c-db5c-4cbc-b678-7ae64690c767
4	Rela	10	2	rela	552d7d2c-db5c-4cbc-b678-7ae64690c767
5	Dulog	30	6	dulog	552d7d2c-db5c-4cbc-b678-7ae64690c767
7	Truck	45	41	truck	552d7d2c-db5c-4cbc-b678-7ae64690c767
1	On-Foot	20	9	onfoot	552d7d2c-db5c-4cbc-b678-7ae64690c767
\.


--
-- TOC entry 4440 (class 0 OID 17451)
-- Dependencies: 385
-- Data for Name: user_status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_status (userstatus_id, status_name) FROM stdin;
1	Active
2	Inactive
3	Pending
4	Suspended
5	Rejected
\.


--
-- TOC entry 4461 (class 0 OID 17709)
-- Dependencies: 406
-- Data for Name: users_reporting; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_reporting (userreporting_id, created_at, order_id, reportset_id, report_date, reportstatus_int, reporter_id, reported_id) FROM stdin;
\.


--
-- TOC entry 4444 (class 0 OID 17510)
-- Dependencies: 389
-- Data for Name: vehicle_price; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vehicle_price (pricing_id, vehicle_id, vehicle_rate) FROM stdin;
\.


--
-- TOC entry 4474 (class 0 OID 25464)
-- Dependencies: 419
-- Data for Name: messages_2025_11_22; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_11_22 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- TOC entry 4475 (class 0 OID 25476)
-- Dependencies: 420
-- Data for Name: messages_2025_11_23; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_11_23 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- TOC entry 4476 (class 0 OID 25488)
-- Dependencies: 421
-- Data for Name: messages_2025_11_24; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_11_24 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- TOC entry 4477 (class 0 OID 25500)
-- Dependencies: 422
-- Data for Name: messages_2025_11_25; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_11_25 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- TOC entry 4478 (class 0 OID 25512)
-- Dependencies: 423
-- Data for Name: messages_2025_11_26; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2025_11_26 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- TOC entry 4433 (class 0 OID 17112)
-- Dependencies: 374
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2025-11-02 10:59:49
20211116045059	2025-11-02 10:59:50
20211116050929	2025-11-02 10:59:51
20211116051442	2025-11-02 10:59:52
20211116212300	2025-11-02 10:59:53
20211116213355	2025-11-02 10:59:54
20211116213934	2025-11-02 10:59:55
20211116214523	2025-11-02 10:59:56
20211122062447	2025-11-02 10:59:57
20211124070109	2025-11-02 10:59:58
20211202204204	2025-11-02 10:59:59
20211202204605	2025-11-02 11:00:00
20211210212804	2025-11-02 11:00:03
20211228014915	2025-11-02 11:00:04
20220107221237	2025-11-02 11:00:05
20220228202821	2025-11-02 11:00:06
20220312004840	2025-11-02 11:00:07
20220603231003	2025-11-02 11:00:08
20220603232444	2025-11-02 11:00:09
20220615214548	2025-11-02 11:00:10
20220712093339	2025-11-02 11:00:11
20220908172859	2025-11-02 11:00:12
20220916233421	2025-11-02 11:00:13
20230119133233	2025-11-02 11:00:14
20230128025114	2025-11-02 11:00:15
20230128025212	2025-11-02 11:00:16
20230227211149	2025-11-02 11:00:17
20230228184745	2025-11-02 11:00:18
20230308225145	2025-11-02 11:00:19
20230328144023	2025-11-02 11:00:20
20231018144023	2025-11-02 11:00:21
20231204144023	2025-11-02 11:00:23
20231204144024	2025-11-02 11:00:24
20231204144025	2025-11-02 11:00:25
20240108234812	2025-11-02 11:00:26
20240109165339	2025-11-02 11:00:27
20240227174441	2025-11-02 11:00:28
20240311171622	2025-11-02 11:00:30
20240321100241	2025-11-02 11:00:32
20240401105812	2025-11-02 11:00:34
20240418121054	2025-11-02 11:00:36
20240523004032	2025-11-02 11:00:39
20240618124746	2025-11-02 11:00:41
20240801235015	2025-11-02 11:00:42
20240805133720	2025-11-02 11:00:43
20240827160934	2025-11-02 11:00:44
20240919163303	2025-11-02 11:00:45
20240919163305	2025-11-02 11:00:46
20241019105805	2025-11-02 11:00:47
20241030150047	2025-11-02 11:00:51
20241108114728	2025-11-02 11:00:52
20241121104152	2025-11-02 11:00:53
20241130184212	2025-11-02 11:00:54
20241220035512	2025-11-02 11:00:55
20241220123912	2025-11-02 11:00:56
20241224161212	2025-11-02 11:00:57
20250107150512	2025-11-02 11:00:58
20250110162412	2025-11-02 11:00:59
20250123174212	2025-11-02 11:01:00
20250128220012	2025-11-02 11:01:01
20250506224012	2025-11-02 11:01:02
20250523164012	2025-11-02 11:01:02
20250714121412	2025-11-02 11:01:03
20250905041441	2025-11-02 11:01:04
20251103001201	2025-11-12 09:53:12
\.


--
-- TOC entry 4438 (class 0 OID 17247)
-- Dependencies: 380
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at) FROM stdin;
\.


--
-- TOC entry 4416 (class 0 OID 16546)
-- Dependencies: 354
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id, type) FROM stdin;
licenses	licenses	\N	2025-11-10 05:42:16.587339+00	2025-11-10 05:42:16.587339+00	t	f	\N	\N	\N	STANDARD
\.


--
-- TOC entry 4439 (class 0 OID 17276)
-- Dependencies: 381
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets_analytics (name, type, format, created_at, updated_at, id, deleted_at) FROM stdin;
\.


--
-- TOC entry 4472 (class 0 OID 22407)
-- Dependencies: 417
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets_vectors (id, type, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 4418 (class 0 OID 16588)
-- Dependencies: 356
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2025-11-02 10:59:48.46718
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2025-11-02 10:59:48.4777
2	storage-schema	5c7968fd083fcea04050c1b7f6253c9771b99011	2025-11-02 10:59:48.483842
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2025-11-02 10:59:48.513395
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2025-11-02 10:59:48.579272
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2025-11-02 10:59:48.586676
6	change-column-name-in-get-size	f93f62afdf6613ee5e7e815b30d02dc990201044	2025-11-02 10:59:48.595524
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2025-11-02 10:59:48.602081
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2025-11-02 10:59:48.609002
9	fix-search-function	3a0af29f42e35a4d101c259ed955b67e1bee6825	2025-11-02 10:59:48.616435
10	search-files-search-function	68dc14822daad0ffac3746a502234f486182ef6e	2025-11-02 10:59:48.623864
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2025-11-02 10:59:48.631178
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2025-11-02 10:59:48.641989
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2025-11-02 10:59:48.648764
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2025-11-02 10:59:48.655398
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2025-11-02 10:59:48.683287
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2025-11-02 10:59:48.690168
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2025-11-02 10:59:48.697316
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2025-11-02 10:59:48.704513
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2025-11-02 10:59:48.713914
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2025-11-02 10:59:48.721043
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2025-11-02 10:59:48.731042
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2025-11-02 10:59:48.747093
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2025-11-02 10:59:48.761714
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2025-11-02 10:59:48.7696
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2025-11-02 10:59:48.777328
26	objects-prefixes	ef3f7871121cdc47a65308e6702519e853422ae2	2025-11-02 10:59:48.78482
27	search-v2	33b8f2a7ae53105f028e13e9fcda9dc4f356b4a2	2025-11-02 10:59:48.802484
28	object-bucket-name-sorting	ba85ec41b62c6a30a3f136788227ee47f311c436	2025-11-02 10:59:49.797228
29	create-prefixes	a7b1a22c0dc3ab630e3055bfec7ce7d2045c5b7b	2025-11-02 10:59:49.804721
30	update-object-levels	6c6f6cc9430d570f26284a24cf7b210599032db7	2025-11-02 10:59:49.811641
31	objects-level-index	33f1fef7ec7fea08bb892222f4f0f5d79bab5eb8	2025-11-02 10:59:49.894851
32	backward-compatible-index-on-objects	2d51eeb437a96868b36fcdfb1ddefdf13bef1647	2025-11-02 10:59:49.903231
33	backward-compatible-index-on-prefixes	fe473390e1b8c407434c0e470655945b110507bf	2025-11-02 10:59:49.913389
34	optimize-search-function-v1	82b0e469a00e8ebce495e29bfa70a0797f7ebd2c	2025-11-02 10:59:49.915973
35	add-insert-trigger-prefixes	63bb9fd05deb3dc5e9fa66c83e82b152f0caf589	2025-11-02 10:59:49.924433
36	optimise-existing-functions	81cf92eb0c36612865a18016a38496c530443899	2025-11-02 10:59:49.931896
37	add-bucket-name-length-trigger	3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1	2025-11-02 10:59:49.949859
38	iceberg-catalog-flag-on-buckets	19a8bd89d5dfa69af7f222a46c726b7c41e462c5	2025-11-02 10:59:49.958105
39	add-search-v2-sort-support	39cf7d1e6bf515f4b02e41237aba845a7b492853	2025-11-02 10:59:49.969697
40	fix-prefix-race-conditions-optimized	fd02297e1c67df25a9fc110bf8c8a9af7fb06d1f	2025-11-02 10:59:49.977374
41	add-object-level-update-trigger	44c22478bf01744b2129efc480cd2edc9a7d60e9	2025-11-02 10:59:49.989525
42	rollback-prefix-triggers	f2ab4f526ab7f979541082992593938c05ee4b47	2025-11-02 10:59:49.997802
43	fix-object-level	ab837ad8f1c7d00cc0b7310e989a23388ff29fc6	2025-11-02 10:59:50.007608
44	vector-bucket-type	99c20c0ffd52bb1ff1f32fb992f3b351e3ef8fb3	2025-11-17 16:07:27.991933
45	vector-buckets	049e27196d77a7cb76497a85afae669d8b230953	2025-11-17 16:07:28.010118
46	buckets-objects-grants	fedeb96d60fefd8e02ab3ded9fbde05632f84aed	2025-11-17 16:07:28.084949
47	iceberg-table-metadata	649df56855c24d8b36dd4cc1aeb8251aa9ad42c2	2025-11-17 16:07:28.08885
48	iceberg-catalog-ids	2666dff93346e5d04e0a878416be1d5fec345d6f	2025-11-17 16:07:28.091295
\.


--
-- TOC entry 4417 (class 0 OID 16561)
-- Dependencies: 355
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata, level) FROM stdin;
70a3d93d-5feb-4bfa-999c-c59048540d70	licenses	25e59e8d-14dc-4cbc-b160-64cfbebaaded/license_front.jpeg	25e59e8d-14dc-4cbc-b160-64cfbebaaded	2025-11-10 08:20:04.738043+00	2025-11-10 08:20:04.738043+00	2025-11-10 08:20:04.738043+00	{"eTag": "\\"e55333c0136c175a6de9d4ac45055582\\"", "size": 65711, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-11-10T08:20:05.000Z", "contentLength": 65711, "httpStatusCode": 200}	b33e1f94-d3cf-4962-a03f-eb924712656d	25e59e8d-14dc-4cbc-b160-64cfbebaaded	{}	2
58183841-f190-4872-9496-8968f45ba50a	licenses	b51354b7-74cf-4a2b-ad3f-3ec6543f1592/license_front.jpeg	b51354b7-74cf-4a2b-ad3f-3ec6543f1592	2025-11-17 09:57:52.277762+00	2025-11-17 09:57:52.277762+00	2025-11-17 09:57:52.277762+00	{"eTag": "\\"d0c312b800d49c7bfeadd43d16b355ba\\"", "size": 80261, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-11-17T09:57:53.000Z", "contentLength": 80261, "httpStatusCode": 200}	c37c1c00-7991-4d6e-b083-c4d9e6fa1bd4	b51354b7-74cf-4a2b-ad3f-3ec6543f1592	{}	2
6639b5ba-b81d-4323-8c8c-f5b391d3baf5	licenses	55d698a2-73b3-45b9-9c45-392701941bf1/license_front.jpeg	55d698a2-73b3-45b9-9c45-392701941bf1	2025-11-10 08:28:50.375536+00	2025-11-10 09:18:19.92073+00	2025-11-10 08:28:50.375536+00	{"eTag": "\\"d4279646d3673d95b96a91015b5f3202\\"", "size": 2761986, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-11-10T09:18:20.000Z", "contentLength": 2761986, "httpStatusCode": 200}	af8a7d10-b27c-464e-b646-75b65b6a4118	55d698a2-73b3-45b9-9c45-392701941bf1	{}	2
c450c497-972c-4dc6-9416-2031c97cdee9	licenses	921153b9-4465-4455-b67e-05a1a07799d2/license_front.jpeg	921153b9-4465-4455-b67e-05a1a07799d2	2025-11-10 10:03:52.298256+00	2025-11-10 10:03:52.298256+00	2025-11-10 10:03:52.298256+00	{"eTag": "\\"e55333c0136c175a6de9d4ac45055582\\"", "size": 65711, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-11-10T10:03:53.000Z", "contentLength": 65711, "httpStatusCode": 200}	fc5962b6-db86-454a-ba21-ec27579d0eff	921153b9-4465-4455-b67e-05a1a07799d2	{}	2
00397dc2-b2c5-4fd4-887f-8b23a28ee09f	licenses	81554acf-6be5-4d95-a73d-6281199cd982/license_front.jpeg	81554acf-6be5-4d95-a73d-6281199cd982	2025-11-14 06:30:36.473678+00	2025-11-14 06:30:36.473678+00	2025-11-14 06:30:36.473678+00	{"eTag": "\\"fb43fe524dde643b9a125fb8125f4945\\"", "size": 1006751, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-11-14T06:30:37.000Z", "contentLength": 1006751, "httpStatusCode": 200}	cb463d06-74ff-4e27-a686-1cb69a38368a	81554acf-6be5-4d95-a73d-6281199cd982	{}	2
9c1ac0f5-49c5-49f6-869d-7162abef125a	licenses	7a908bff-8443-44a8-a5e0-4ca955695616/license_front.jpeg	7a908bff-8443-44a8-a5e0-4ca955695616	2025-11-14 08:43:45.940552+00	2025-11-14 08:43:45.940552+00	2025-11-14 08:43:45.940552+00	{"eTag": "\\"29b15c3cd3f11f275136d5dbff25bf3e\\"", "size": 3203977, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-11-14T08:43:46.000Z", "contentLength": 3203977, "httpStatusCode": 200}	4460e843-03d7-4af4-bc1c-4d88ff9759c6	7a908bff-8443-44a8-a5e0-4ca955695616	{}	2
5b410748-5916-4b1e-8e04-b73da2c638a7	licenses	552d7d2c-db5c-4cbc-b678-7ae64690c767/license_front.jpeg	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-15 01:29:28.179593+00	2025-11-15 01:29:28.179593+00	2025-11-15 01:29:28.179593+00	{"eTag": "\\"29b15c3cd3f11f275136d5dbff25bf3e\\"", "size": 3203977, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-11-15T01:29:29.000Z", "contentLength": 3203977, "httpStatusCode": 200}	081c7b6c-9746-431c-ad9d-0d8797e2b4b4	552d7d2c-db5c-4cbc-b678-7ae64690c767	{}	2
e0950f35-366a-4aa4-9aa8-e6d3cda6918e	licenses	52cd570c-9555-4cc8-b9a0-25578dd1de55/license_front.jpeg	52cd570c-9555-4cc8-b9a0-25578dd1de55	2025-11-17 08:41:08.065121+00	2025-11-17 08:41:08.065121+00	2025-11-17 08:41:08.065121+00	{"eTag": "\\"8c988c8cb0b77735a4e090edf60929db\\"", "size": 89380, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-11-17T08:41:08.000Z", "contentLength": 89380, "httpStatusCode": 200}	891564b9-90ec-4524-97c9-5a45477c1ce4	52cd570c-9555-4cc8-b9a0-25578dd1de55	{}	2
49bb99c6-6fe8-4aa6-af99-790c805be2c1	licenses	cf94ad14-8ae5-4f75-8e91-03f511efa4ff/license_front_1763386176596.png	cf94ad14-8ae5-4f75-8e91-03f511efa4ff	2025-11-17 13:29:36.895232+00	2025-11-17 13:29:36.895232+00	2025-11-17 13:29:36.895232+00	{"eTag": "\\"b750ee59ff3a3a9f7b65bfaa1c3cdcb4\\"", "size": 6886, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-11-17T13:29:37.000Z", "contentLength": 6886, "httpStatusCode": 200}	80e47008-d814-4ceb-8bc3-3520be9b99f7	cf94ad14-8ae5-4f75-8e91-03f511efa4ff	{}	2
af97b15d-9b1b-4e01-abd2-598dbd78f2a5	licenses	cf94ad14-8ae5-4f75-8e91-03f511efa4ff/license_back_1763386178060.png	cf94ad14-8ae5-4f75-8e91-03f511efa4ff	2025-11-17 13:29:38.219183+00	2025-11-17 13:29:38.219183+00	2025-11-17 13:29:38.219183+00	{"eTag": "\\"8da23fc6e6a6c6d1dd530275c07be001\\"", "size": 22458, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-11-17T13:29:39.000Z", "contentLength": 22458, "httpStatusCode": 200}	6c0ecc8f-ac7f-4757-bc24-51d6c6af3923	cf94ad14-8ae5-4f75-8e91-03f511efa4ff	{}	2
18f0afd1-fd6f-40f7-85e3-d3adf4d28c72	licenses	cf94ad14-8ae5-4f75-8e91-03f511efa4ff/license_front_1763386264098.png	cf94ad14-8ae5-4f75-8e91-03f511efa4ff	2025-11-17 13:31:04.481716+00	2025-11-17 13:31:04.481716+00	2025-11-17 13:31:04.481716+00	{"eTag": "\\"8da23fc6e6a6c6d1dd530275c07be001\\"", "size": 22458, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-11-17T13:31:05.000Z", "contentLength": 22458, "httpStatusCode": 200}	0dbabc7f-c315-4e29-9bb8-05b2ae9dfae9	cf94ad14-8ae5-4f75-8e91-03f511efa4ff	{}	2
38f230f0-0a0e-478f-a32f-a4cf9c7908f1	licenses	cf94ad14-8ae5-4f75-8e91-03f511efa4ff/license_back_1763386265528.png	cf94ad14-8ae5-4f75-8e91-03f511efa4ff	2025-11-17 13:31:05.467126+00	2025-11-17 13:31:05.467126+00	2025-11-17 13:31:05.467126+00	{"eTag": "\\"b750ee59ff3a3a9f7b65bfaa1c3cdcb4\\"", "size": 6886, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-11-17T13:31:06.000Z", "contentLength": 6886, "httpStatusCode": 200}	ce24ac2d-dd98-4e1d-8554-271a41887a38	cf94ad14-8ae5-4f75-8e91-03f511efa4ff	{}	2
9b6df68d-b906-4131-809a-9b16020606a5	licenses	a7ad0ae9-c04a-478b-a157-a016ba4dd1d2/license_front_1763387797795.jpeg	a7ad0ae9-c04a-478b-a157-a016ba4dd1d2	2025-11-17 13:56:37.882978+00	2025-11-17 13:56:37.882978+00	2025-11-17 13:56:37.882978+00	{"eTag": "\\"ea7e67bda14ef18b1766ea7b665ff1f5\\"", "size": 8529, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-11-17T13:56:38.000Z", "contentLength": 8529, "httpStatusCode": 200}	1cd4e32f-ea6e-4b88-959e-c3283288bdb9	a7ad0ae9-c04a-478b-a157-a016ba4dd1d2	{}	2
45331e13-3410-42e6-9362-646426e23e8e	licenses	a7ad0ae9-c04a-478b-a157-a016ba4dd1d2/license_back_1763387798610.png	a7ad0ae9-c04a-478b-a157-a016ba4dd1d2	2025-11-17 13:56:38.513942+00	2025-11-17 13:56:38.513942+00	2025-11-17 13:56:38.513942+00	{"eTag": "\\"c7a5494a2fcd77d33fa64ba9e6b303fa\\"", "size": 5925, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-11-17T13:56:39.000Z", "contentLength": 5925, "httpStatusCode": 200}	656db3aa-6de1-4d2b-bae4-d1d54e9fb4c3	a7ad0ae9-c04a-478b-a157-a016ba4dd1d2	{}	2
3fb85349-a3a3-4e72-a59d-a2cb860a4808	licenses	5aef129a-e969-4868-8d10-b98320caa1af/license_front_1763484647726.png	5aef129a-e969-4868-8d10-b98320caa1af	2025-11-18 16:50:47.489646+00	2025-11-18 16:50:47.489646+00	2025-11-18 16:50:47.489646+00	{"eTag": "\\"0bf3597c2a52b225fece60bb4794fa56\\"", "size": 13319, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-11-18T16:50:48.000Z", "contentLength": 13319, "httpStatusCode": 200}	96af6699-7e0e-451b-99af-cdb99a57b915	5aef129a-e969-4868-8d10-b98320caa1af	{}	2
b7cf6d4a-1abc-4bd8-9622-0d9695b8c77b	licenses	5aef129a-e969-4868-8d10-b98320caa1af/license_back_1763484649131.png	5aef129a-e969-4868-8d10-b98320caa1af	2025-11-18 16:50:48.970811+00	2025-11-18 16:50:48.970811+00	2025-11-18 16:50:48.970811+00	{"eTag": "\\"cf126e3e416cf303e979f789fd92ea84\\"", "size": 55122, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-11-18T16:50:49.000Z", "contentLength": 55122, "httpStatusCode": 200}	bbba3d29-7ee9-4974-9fbc-9d46f3600a7a	5aef129a-e969-4868-8d10-b98320caa1af	{}	2
fbad0835-87d1-4072-acfe-504256d16fae	licenses	5aef129a-e969-4868-8d10-b98320caa1af/license_front_1763484817276.png	5aef129a-e969-4868-8d10-b98320caa1af	2025-11-18 16:53:37.034126+00	2025-11-18 16:53:37.034126+00	2025-11-18 16:53:37.034126+00	{"eTag": "\\"0bf3597c2a52b225fece60bb4794fa56\\"", "size": 13319, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-11-18T16:53:37.000Z", "contentLength": 13319, "httpStatusCode": 200}	6b813494-ed49-4382-b704-1d5b75ed0b7b	5aef129a-e969-4868-8d10-b98320caa1af	{}	2
5be88d4c-0a9e-4060-aced-b1cf5f69898d	licenses	5aef129a-e969-4868-8d10-b98320caa1af/license_back_1763484818681.png	5aef129a-e969-4868-8d10-b98320caa1af	2025-11-18 16:53:38.400231+00	2025-11-18 16:53:38.400231+00	2025-11-18 16:53:38.400231+00	{"eTag": "\\"cf126e3e416cf303e979f789fd92ea84\\"", "size": 55122, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-11-18T16:53:39.000Z", "contentLength": 55122, "httpStatusCode": 200}	201a1cab-6622-4ab8-b713-1a514fe8be8e	5aef129a-e969-4868-8d10-b98320caa1af	{}	2
d2223f4f-dbaa-4a82-a840-392fabc13828	licenses	5aef129a-e969-4868-8d10-b98320caa1af/license_front_1763485033511.png	5aef129a-e969-4868-8d10-b98320caa1af	2025-11-18 16:57:13.240306+00	2025-11-18 16:57:13.240306+00	2025-11-18 16:57:13.240306+00	{"eTag": "\\"0bf3597c2a52b225fece60bb4794fa56\\"", "size": 13319, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-11-18T16:57:14.000Z", "contentLength": 13319, "httpStatusCode": 200}	cd6ab419-b3c1-4504-a7fd-c7bcd2e6909b	5aef129a-e969-4868-8d10-b98320caa1af	{}	2
9a93e831-0154-4233-adf6-f6614825522f	licenses	5aef129a-e969-4868-8d10-b98320caa1af/license_back_1763485034859.png	5aef129a-e969-4868-8d10-b98320caa1af	2025-11-18 16:57:14.602537+00	2025-11-18 16:57:14.602537+00	2025-11-18 16:57:14.602537+00	{"eTag": "\\"cf126e3e416cf303e979f789fd92ea84\\"", "size": 55122, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-11-18T16:57:15.000Z", "contentLength": 55122, "httpStatusCode": 200}	7b74b033-34d8-4385-a232-92baf2200b62	5aef129a-e969-4868-8d10-b98320caa1af	{}	2
ef3ae223-5dae-48fc-b62c-f116e7ce52a5	licenses	650c6f24-8201-4f16-96fb-3186965ec392/license_front_1763513045146.jpeg	650c6f24-8201-4f16-96fb-3186965ec392	2025-11-19 00:44:07.871503+00	2025-11-19 00:44:07.871503+00	2025-11-19 00:44:07.871503+00	{"eTag": "\\"95a135bc6623b0083448fb2ede247f26\\"", "size": 140522, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-11-19T00:44:08.000Z", "contentLength": 140522, "httpStatusCode": 200}	74488aa2-f1ca-4a3b-8592-5a9964fb4319	650c6f24-8201-4f16-96fb-3186965ec392	{}	2
47b5382d-df43-48b8-baae-dc32b62c1196	licenses	650c6f24-8201-4f16-96fb-3186965ec392/license_back_1763513045146.jpeg	650c6f24-8201-4f16-96fb-3186965ec392	2025-11-19 00:44:14.429978+00	2025-11-19 00:44:14.429978+00	2025-11-19 00:44:14.429978+00	{"eTag": "\\"2eeb7328919755e0f86101e9a726b0b6\\"", "size": 237802, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-11-19T00:44:15.000Z", "contentLength": 237802, "httpStatusCode": 200}	9172e31d-1e9f-4748-af0e-6aa011d02ceb	650c6f24-8201-4f16-96fb-3186965ec392	{}	2
668c1d61-3638-467f-a93e-3a2e5a2e23a8	licenses	ba0393ab-fe07-419e-bead-76c7e2830274/license_front_1763522408448.jpeg	ba0393ab-fe07-419e-bead-76c7e2830274	2025-11-19 03:20:11.303342+00	2025-11-19 03:20:11.303342+00	2025-11-19 03:20:11.303342+00	{"eTag": "\\"f2eddf7292502f574a98549cd2d7c602\\"", "size": 70173, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-11-19T03:20:12.000Z", "contentLength": 70173, "httpStatusCode": 200}	57afd980-764a-41f8-8c2d-02049e872601	ba0393ab-fe07-419e-bead-76c7e2830274	{}	2
ece54d8b-2e7f-47a0-a901-6a1be2328876	licenses	ba0393ab-fe07-419e-bead-76c7e2830274/license_back_1763522408448.png	ba0393ab-fe07-419e-bead-76c7e2830274	2025-11-19 03:20:13.857519+00	2025-11-19 03:20:13.857519+00	2025-11-19 03:20:13.857519+00	{"eTag": "\\"cbce7b3abe58188b46e618a8d3bc6a9c\\"", "size": 34134, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-11-19T03:20:14.000Z", "contentLength": 34134, "httpStatusCode": 200}	8dbe64fb-57d9-447f-8171-425573a24695	ba0393ab-fe07-419e-bead-76c7e2830274	{}	2
12399400-addb-4a21-83d2-fb81a3944219	licenses	92548ce1-e669-4be6-8135-7abbbbcca876/license_front_1763537972400.jpeg	92548ce1-e669-4be6-8135-7abbbbcca876	2025-11-19 07:39:35.088003+00	2025-11-19 07:39:35.088003+00	2025-11-19 07:39:35.088003+00	{"eTag": "\\"474ded44c7fc9f96fc7b04b887d33a8a\\"", "size": 140704, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-11-19T07:39:36.000Z", "contentLength": 140704, "httpStatusCode": 200}	e23098ce-9be4-4ab2-95b8-dbd9083f93f9	92548ce1-e669-4be6-8135-7abbbbcca876	{}	2
26592c89-e43e-4756-8178-1581fcec85c0	licenses	92548ce1-e669-4be6-8135-7abbbbcca876/license_back_1763537972400.jpeg	92548ce1-e669-4be6-8135-7abbbbcca876	2025-11-19 07:39:40.227708+00	2025-11-19 07:39:40.227708+00	2025-11-19 07:39:40.227708+00	{"eTag": "\\"95a135bc6623b0083448fb2ede247f26\\"", "size": 140522, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2025-11-19T07:39:41.000Z", "contentLength": 140522, "httpStatusCode": 200}	b9e005c9-fec5-4b44-9b50-470c190d6e32	92548ce1-e669-4be6-8135-7abbbbcca876	{}	2
4f666451-02f0-4f60-8896-47b76d19cf6a	licenses	e23859ec-1c83-4db9-8e52-5d5d8dd035b0/license_front_1763713193366.png	e23859ec-1c83-4db9-8e52-5d5d8dd035b0	2025-11-21 08:20:46.418503+00	2025-11-21 08:20:46.418503+00	2025-11-21 08:20:46.418503+00	{"eTag": "\\"2a0f564f11b388823f99734bfb11fa7d\\"", "size": 142657, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-11-21T08:20:47.000Z", "contentLength": 142657, "httpStatusCode": 200}	a338aaf3-aec9-4ae7-92e4-6ccb5d02e549	e23859ec-1c83-4db9-8e52-5d5d8dd035b0	{}	2
76a4d113-5b2f-47e7-9c6b-825af6cf565c	licenses	e23859ec-1c83-4db9-8e52-5d5d8dd035b0/license_back_1763713193366.png	e23859ec-1c83-4db9-8e52-5d5d8dd035b0	2025-11-21 08:20:50.159288+00	2025-11-21 08:20:50.159288+00	2025-11-21 08:20:50.159288+00	{"eTag": "\\"32259f482eb140b6541a65fdf00c6fd6\\"", "size": 148076, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2025-11-21T08:20:51.000Z", "contentLength": 148076, "httpStatusCode": 200}	e2943227-96f4-40b2-9279-723a7098223d	e23859ec-1c83-4db9-8e52-5d5d8dd035b0	{}	2
\.


--
-- TOC entry 4436 (class 0 OID 17202)
-- Dependencies: 377
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.prefixes (bucket_id, name, created_at, updated_at) FROM stdin;
licenses	25e59e8d-14dc-4cbc-b160-64cfbebaaded	2025-11-10 08:20:04.738043+00	2025-11-10 08:20:04.738043+00
licenses	55d698a2-73b3-45b9-9c45-392701941bf1	2025-11-10 08:28:50.375536+00	2025-11-10 08:28:50.375536+00
licenses	921153b9-4465-4455-b67e-05a1a07799d2	2025-11-10 10:03:52.298256+00	2025-11-10 10:03:52.298256+00
licenses	81554acf-6be5-4d95-a73d-6281199cd982	2025-11-14 06:30:36.473678+00	2025-11-14 06:30:36.473678+00
licenses	7a908bff-8443-44a8-a5e0-4ca955695616	2025-11-14 08:43:45.940552+00	2025-11-14 08:43:45.940552+00
licenses	552d7d2c-db5c-4cbc-b678-7ae64690c767	2025-11-15 01:29:28.179593+00	2025-11-15 01:29:28.179593+00
licenses	52cd570c-9555-4cc8-b9a0-25578dd1de55	2025-11-17 08:41:08.065121+00	2025-11-17 08:41:08.065121+00
licenses	b51354b7-74cf-4a2b-ad3f-3ec6543f1592	2025-11-17 09:57:52.277762+00	2025-11-17 09:57:52.277762+00
licenses	cf94ad14-8ae5-4f75-8e91-03f511efa4ff	2025-11-17 13:29:36.895232+00	2025-11-17 13:29:36.895232+00
licenses	a7ad0ae9-c04a-478b-a157-a016ba4dd1d2	2025-11-17 13:56:37.882978+00	2025-11-17 13:56:37.882978+00
licenses	5aef129a-e969-4868-8d10-b98320caa1af	2025-11-18 16:50:47.489646+00	2025-11-18 16:50:47.489646+00
licenses	650c6f24-8201-4f16-96fb-3186965ec392	2025-11-19 00:44:07.871503+00	2025-11-19 00:44:07.871503+00
licenses	ba0393ab-fe07-419e-bead-76c7e2830274	2025-11-19 03:20:11.303342+00	2025-11-19 03:20:11.303342+00
licenses	92548ce1-e669-4be6-8135-7abbbbcca876	2025-11-19 07:39:35.088003+00	2025-11-19 07:39:35.088003+00
licenses	e23859ec-1c83-4db9-8e52-5d5d8dd035b0	2025-11-21 08:20:46.418503+00	2025-11-21 08:20:46.418503+00
\.


--
-- TOC entry 4434 (class 0 OID 17149)
-- Dependencies: 375
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
\.


--
-- TOC entry 4435 (class 0 OID 17163)
-- Dependencies: 376
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- TOC entry 4473 (class 0 OID 22417)
-- Dependencies: 418
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.vector_indexes (id, name, bucket_id, data_type, dimension, distance_metric, metadata_configuration, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 3776 (class 0 OID 16658)
-- Dependencies: 357
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 4683 (class 0 OID 0)
-- Dependencies: 349
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 323, true);


--
-- TOC entry 4684 (class 0 OID 0)
-- Dependencies: 396
-- Name: delivery_service_service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.delivery_service_service_id_seq', 2, true);


--
-- TOC entry 4685 (class 0 OID 0)
-- Dependencies: 392
-- Name: delivery_status_deliverstatus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.delivery_status_deliverstatus_id_seq', 1, true);


--
-- TOC entry 4686 (class 0 OID 0)
-- Dependencies: 405
-- Name: fare_configuration_config_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fare_configuration_config_id_seq', 1, true);


--
-- TOC entry 4687 (class 0 OID 0)
-- Dependencies: 411
-- Name: favorites_favorite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favorites_favorite_id_seq', 2, true);


--
-- TOC entry 4688 (class 0 OID 0)
-- Dependencies: 398
-- Name: goods_category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.goods_category_category_id_seq', 8, true);


--
-- TOC entry 4689 (class 0 OID 0)
-- Dependencies: 413
-- Name: history_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.history_history_id_seq', 1, false);


--
-- TOC entry 4690 (class 0 OID 0)
-- Dependencies: 403
-- Name: order_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_order_id_seq', 14, true);


--
-- TOC entry 4691 (class 0 OID 0)
-- Dependencies: 416
-- Name: overview_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.overview_id_seq', 81, true);


--
-- TOC entry 4692 (class 0 OID 0)
-- Dependencies: 394
-- Name: payment_method_payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payment_method_payment_id_seq', 2, true);


--
-- TOC entry 4693 (class 0 OID 0)
-- Dependencies: 400
-- Name: report_set_reportset_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.report_set_reportset_id_seq', 1, false);


--
-- TOC entry 4694 (class 0 OID 0)
-- Dependencies: 409
-- Name: report_status_reportstatus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.report_status_reportstatus_id_seq', 1, false);


--
-- TOC entry 4695 (class 0 OID 0)
-- Dependencies: 388
-- Name: type_vehicle_vehicle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.type_vehicle_vehicle_id_seq', 44, true);


--
-- TOC entry 4696 (class 0 OID 0)
-- Dependencies: 386
-- Name: user_status_userstatus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_status_userstatus_id_seq', 1, false);


--
-- TOC entry 4697 (class 0 OID 0)
-- Dependencies: 407
-- Name: users_reporting_userreporting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_reporting_userreporting_id_seq', 1, false);


--
-- TOC entry 4698 (class 0 OID 0)
-- Dependencies: 390
-- Name: vehicle_price_pricing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vehicle_price_pricing_id_seq', 1, false);


--
-- TOC entry 4699 (class 0 OID 0)
-- Dependencies: 379
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- TOC entry 3975 (class 2606 OID 16829)
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- TOC entry 3929 (class 2606 OID 16531)
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- TOC entry 3998 (class 2606 OID 16935)
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- TOC entry 3953 (class 2606 OID 16953)
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- TOC entry 3955 (class 2606 OID 16963)
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- TOC entry 3927 (class 2606 OID 16524)
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- TOC entry 3977 (class 2606 OID 16822)
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- TOC entry 3973 (class 2606 OID 16810)
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- TOC entry 3965 (class 2606 OID 17003)
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- TOC entry 3967 (class 2606 OID 16797)
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- TOC entry 4011 (class 2606 OID 17062)
-- Name: oauth_authorizations oauth_authorizations_authorization_code_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_code_key UNIQUE (authorization_code);


--
-- TOC entry 4013 (class 2606 OID 17060)
-- Name: oauth_authorizations oauth_authorizations_authorization_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_id_key UNIQUE (authorization_id);


--
-- TOC entry 4015 (class 2606 OID 17058)
-- Name: oauth_authorizations oauth_authorizations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_pkey PRIMARY KEY (id);


--
-- TOC entry 4008 (class 2606 OID 17022)
-- Name: oauth_clients oauth_clients_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_clients
    ADD CONSTRAINT oauth_clients_pkey PRIMARY KEY (id);


--
-- TOC entry 4019 (class 2606 OID 17084)
-- Name: oauth_consents oauth_consents_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_pkey PRIMARY KEY (id);


--
-- TOC entry 4021 (class 2606 OID 17086)
-- Name: oauth_consents oauth_consents_user_client_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_client_unique UNIQUE (user_id, client_id);


--
-- TOC entry 4002 (class 2606 OID 16988)
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 3921 (class 2606 OID 16514)
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 3924 (class 2606 OID 16740)
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- TOC entry 3987 (class 2606 OID 16869)
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- TOC entry 3989 (class 2606 OID 16867)
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- TOC entry 3994 (class 2606 OID 16883)
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- TOC entry 3932 (class 2606 OID 16537)
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- TOC entry 3960 (class 2606 OID 16761)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 3984 (class 2606 OID 16850)
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- TOC entry 3979 (class 2606 OID 16841)
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- TOC entry 3914 (class 2606 OID 16923)
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- TOC entry 3916 (class 2606 OID 16501)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4062 (class 2606 OID 18039)
-- Name: courier courier_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courier
    ADD CONSTRAINT courier_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4064 (class 2606 OID 17611)
-- Name: courier courier_plate_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courier
    ADD CONSTRAINT courier_plate_number_key UNIQUE (plate_number);


--
-- TOC entry 4056 (class 2606 OID 17559)
-- Name: delivery_service delivery_service_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delivery_service
    ADD CONSTRAINT delivery_service_pkey PRIMARY KEY (service_id);


--
-- TOC entry 4052 (class 2606 OID 17537)
-- Name: delivery_status delivery_status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delivery_status
    ADD CONSTRAINT delivery_status_pkey PRIMARY KEY (deliverstatus_id);


--
-- TOC entry 4070 (class 2606 OID 17708)
-- Name: fare_configuration fare_configuration_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fare_configuration
    ADD CONSTRAINT fare_configuration_pkey PRIMARY KEY (config_id);


--
-- TOC entry 4076 (class 2606 OID 17764)
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (favorite_id);


--
-- TOC entry 4058 (class 2606 OID 17570)
-- Name: goods_category goods_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.goods_category
    ADD CONSTRAINT goods_category_pkey PRIMARY KEY (category_id);


--
-- TOC entry 4080 (class 2606 OID 17786)
-- Name: history history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.history
    ADD CONSTRAINT history_pkey PRIMARY KEY (history_id);


--
-- TOC entry 4068 (class 2606 OID 17661)
-- Name: order order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (order_id);


--
-- TOC entry 4084 (class 2606 OID 21090)
-- Name: overview overview_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.overview
    ADD CONSTRAINT overview_pkey PRIMARY KEY (id);


--
-- TOC entry 4086 (class 2606 OID 21099)
-- Name: overview overview_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.overview
    ADD CONSTRAINT overview_slug_key UNIQUE (slug);


--
-- TOC entry 4054 (class 2606 OID 17548)
-- Name: payment_method payment_method_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_method
    ADD CONSTRAINT payment_method_pkey PRIMARY KEY (payment_id);


--
-- TOC entry 4060 (class 2606 OID 17581)
-- Name: report_set report_set_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report_set
    ADD CONSTRAINT report_set_pkey PRIMARY KEY (reportset_id);


--
-- TOC entry 4074 (class 2606 OID 17749)
-- Name: report_status report_status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report_status
    ADD CONSTRAINT report_status_pkey PRIMARY KEY (reportstatus_id);


--
-- TOC entry 4082 (class 2606 OID 17958)
-- Name: service_user service_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service_user
    ADD CONSTRAINT service_user_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4046 (class 2606 OID 17507)
-- Name: type_vehicle type_vehicle_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_vehicle
    ADD CONSTRAINT type_vehicle_pkey PRIMARY KEY (vehicle_id);


--
-- TOC entry 4048 (class 2606 OID 22267)
-- Name: type_vehicle type_vehicle_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_vehicle
    ADD CONSTRAINT type_vehicle_slug_key UNIQUE (slug);


--
-- TOC entry 4078 (class 2606 OID 25554)
-- Name: favorites unique_user_order_favorite; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT unique_user_order_favorite UNIQUE (user_id, order_id);


--
-- TOC entry 4044 (class 2606 OID 17509)
-- Name: user_status user_status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_status
    ADD CONSTRAINT user_status_pkey PRIMARY KEY (userstatus_id);


--
-- TOC entry 4072 (class 2606 OID 17718)
-- Name: users_reporting users_reporting_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_reporting
    ADD CONSTRAINT users_reporting_pkey PRIMARY KEY (userreporting_id);


--
-- TOC entry 4050 (class 2606 OID 17521)
-- Name: vehicle_price vehicle_price_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle_price
    ADD CONSTRAINT vehicle_price_pkey PRIMARY KEY (pricing_id);


--
-- TOC entry 4042 (class 2606 OID 17448)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- TOC entry 4094 (class 2606 OID 25472)
-- Name: messages_2025_11_22 messages_2025_11_22_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_11_22
    ADD CONSTRAINT messages_2025_11_22_pkey PRIMARY KEY (id, inserted_at);


--
-- TOC entry 4097 (class 2606 OID 25484)
-- Name: messages_2025_11_23 messages_2025_11_23_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_11_23
    ADD CONSTRAINT messages_2025_11_23_pkey PRIMARY KEY (id, inserted_at);


--
-- TOC entry 4100 (class 2606 OID 25496)
-- Name: messages_2025_11_24 messages_2025_11_24_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_11_24
    ADD CONSTRAINT messages_2025_11_24_pkey PRIMARY KEY (id, inserted_at);


--
-- TOC entry 4103 (class 2606 OID 25508)
-- Name: messages_2025_11_25 messages_2025_11_25_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_11_25
    ADD CONSTRAINT messages_2025_11_25_pkey PRIMARY KEY (id, inserted_at);


--
-- TOC entry 4106 (class 2606 OID 25520)
-- Name: messages_2025_11_26 messages_2025_11_26_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2025_11_26
    ADD CONSTRAINT messages_2025_11_26_pkey PRIMARY KEY (id, inserted_at);


--
-- TOC entry 4035 (class 2606 OID 17255)
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- TOC entry 4024 (class 2606 OID 17116)
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- TOC entry 4038 (class 2606 OID 22440)
-- Name: buckets_analytics buckets_analytics_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets_analytics
    ADD CONSTRAINT buckets_analytics_pkey PRIMARY KEY (id);


--
-- TOC entry 3935 (class 2606 OID 16554)
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- TOC entry 4088 (class 2606 OID 22416)
-- Name: buckets_vectors buckets_vectors_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets_vectors
    ADD CONSTRAINT buckets_vectors_pkey PRIMARY KEY (id);


--
-- TOC entry 3945 (class 2606 OID 16595)
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- TOC entry 3947 (class 2606 OID 16593)
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3943 (class 2606 OID 16571)
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- TOC entry 4032 (class 2606 OID 17211)
-- Name: prefixes prefixes_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.prefixes
    ADD CONSTRAINT prefixes_pkey PRIMARY KEY (bucket_id, level, name);


--
-- TOC entry 4029 (class 2606 OID 17172)
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- TOC entry 4027 (class 2606 OID 17157)
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- TOC entry 4091 (class 2606 OID 22426)
-- Name: vector_indexes vector_indexes_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.vector_indexes
    ADD CONSTRAINT vector_indexes_pkey PRIMARY KEY (id);


--
-- TOC entry 3930 (class 1259 OID 16532)
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- TOC entry 3904 (class 1259 OID 16750)
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- TOC entry 3905 (class 1259 OID 16752)
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- TOC entry 3906 (class 1259 OID 16753)
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- TOC entry 3963 (class 1259 OID 16831)
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- TOC entry 3996 (class 1259 OID 16939)
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- TOC entry 3951 (class 1259 OID 16919)
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- TOC entry 4700 (class 0 OID 0)
-- Dependencies: 3951
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- TOC entry 3956 (class 1259 OID 16747)
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- TOC entry 3999 (class 1259 OID 16936)
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- TOC entry 4000 (class 1259 OID 16937)
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- TOC entry 3971 (class 1259 OID 16942)
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- TOC entry 3968 (class 1259 OID 16803)
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- TOC entry 3969 (class 1259 OID 16948)
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- TOC entry 4009 (class 1259 OID 17073)
-- Name: oauth_auth_pending_exp_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_auth_pending_exp_idx ON auth.oauth_authorizations USING btree (expires_at) WHERE (status = 'pending'::auth.oauth_authorization_status);


--
-- TOC entry 4006 (class 1259 OID 17026)
-- Name: oauth_clients_deleted_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_clients_deleted_at_idx ON auth.oauth_clients USING btree (deleted_at);


--
-- TOC entry 4016 (class 1259 OID 17099)
-- Name: oauth_consents_active_client_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_active_client_idx ON auth.oauth_consents USING btree (client_id) WHERE (revoked_at IS NULL);


--
-- TOC entry 4017 (class 1259 OID 17097)
-- Name: oauth_consents_active_user_client_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_active_user_client_idx ON auth.oauth_consents USING btree (user_id, client_id) WHERE (revoked_at IS NULL);


--
-- TOC entry 4022 (class 1259 OID 17098)
-- Name: oauth_consents_user_order_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_user_order_idx ON auth.oauth_consents USING btree (user_id, granted_at DESC);


--
-- TOC entry 4003 (class 1259 OID 16995)
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- TOC entry 4004 (class 1259 OID 16994)
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- TOC entry 4005 (class 1259 OID 16996)
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- TOC entry 3907 (class 1259 OID 16754)
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- TOC entry 3908 (class 1259 OID 16751)
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- TOC entry 3917 (class 1259 OID 16515)
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- TOC entry 3918 (class 1259 OID 16516)
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- TOC entry 3919 (class 1259 OID 16746)
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- TOC entry 3922 (class 1259 OID 16833)
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- TOC entry 3925 (class 1259 OID 16938)
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- TOC entry 3990 (class 1259 OID 16875)
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- TOC entry 3991 (class 1259 OID 16940)
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- TOC entry 3992 (class 1259 OID 16890)
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- TOC entry 3995 (class 1259 OID 16889)
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- TOC entry 3957 (class 1259 OID 16941)
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- TOC entry 3958 (class 1259 OID 17111)
-- Name: sessions_oauth_client_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_oauth_client_id_idx ON auth.sessions USING btree (oauth_client_id);


--
-- TOC entry 3961 (class 1259 OID 16832)
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- TOC entry 3982 (class 1259 OID 16857)
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- TOC entry 3985 (class 1259 OID 16856)
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- TOC entry 3980 (class 1259 OID 16842)
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- TOC entry 3981 (class 1259 OID 17004)
-- Name: sso_providers_resource_id_pattern_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_providers_resource_id_pattern_idx ON auth.sso_providers USING btree (resource_id text_pattern_ops);


--
-- TOC entry 3970 (class 1259 OID 17001)
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- TOC entry 3962 (class 1259 OID 16830)
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- TOC entry 3909 (class 1259 OID 16910)
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- TOC entry 4701 (class 0 OID 0)
-- Dependencies: 3909
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- TOC entry 3910 (class 1259 OID 16748)
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- TOC entry 3911 (class 1259 OID 16505)
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- TOC entry 3912 (class 1259 OID 16965)
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- TOC entry 4065 (class 1259 OID 22960)
-- Name: idx_orders_deliverystatus_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_orders_deliverystatus_id ON public."order" USING btree (deliverystatus_id);


--
-- TOC entry 4066 (class 1259 OID 22959)
-- Name: idx_orders_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_orders_user_id ON public."order" USING btree (user_id);


--
-- TOC entry 4033 (class 1259 OID 17449)
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- TOC entry 4040 (class 1259 OID 17450)
-- Name: messages_inserted_at_topic_index; Type: INDEX; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE INDEX messages_inserted_at_topic_index ON ONLY realtime.messages USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- TOC entry 4092 (class 1259 OID 25473)
-- Name: messages_2025_11_22_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2025_11_22_inserted_at_topic_idx ON realtime.messages_2025_11_22 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- TOC entry 4095 (class 1259 OID 25485)
-- Name: messages_2025_11_23_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2025_11_23_inserted_at_topic_idx ON realtime.messages_2025_11_23 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- TOC entry 4098 (class 1259 OID 25497)
-- Name: messages_2025_11_24_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2025_11_24_inserted_at_topic_idx ON realtime.messages_2025_11_24 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- TOC entry 4101 (class 1259 OID 25509)
-- Name: messages_2025_11_25_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2025_11_25_inserted_at_topic_idx ON realtime.messages_2025_11_25 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- TOC entry 4104 (class 1259 OID 25521)
-- Name: messages_2025_11_26_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2025_11_26_inserted_at_topic_idx ON realtime.messages_2025_11_26 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- TOC entry 4036 (class 1259 OID 17346)
-- Name: subscription_subscription_id_entity_filters_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_key ON realtime.subscription USING btree (subscription_id, entity, filters);


--
-- TOC entry 3933 (class 1259 OID 16560)
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- TOC entry 3936 (class 1259 OID 16582)
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- TOC entry 4039 (class 1259 OID 22441)
-- Name: buckets_analytics_unique_name_idx; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX buckets_analytics_unique_name_idx ON storage.buckets_analytics USING btree (name) WHERE (deleted_at IS NULL);


--
-- TOC entry 4025 (class 1259 OID 17183)
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- TOC entry 3937 (class 1259 OID 17229)
-- Name: idx_name_bucket_level_unique; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX idx_name_bucket_level_unique ON storage.objects USING btree (name COLLATE "C", bucket_id, level);


--
-- TOC entry 3938 (class 1259 OID 17148)
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- TOC entry 3939 (class 1259 OID 17260)
-- Name: idx_objects_lower_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_lower_name ON storage.objects USING btree ((path_tokens[level]), lower(name) text_pattern_ops, bucket_id, level);


--
-- TOC entry 4030 (class 1259 OID 17261)
-- Name: idx_prefixes_lower_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_prefixes_lower_name ON storage.prefixes USING btree (bucket_id, level, ((string_to_array(name, '/'::text))[level]), lower(name) text_pattern_ops);


--
-- TOC entry 3940 (class 1259 OID 16583)
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- TOC entry 3941 (class 1259 OID 17259)
-- Name: objects_bucket_id_level_idx; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX objects_bucket_id_level_idx ON storage.objects USING btree (bucket_id, level, name COLLATE "C");


--
-- TOC entry 4089 (class 1259 OID 22432)
-- Name: vector_indexes_name_bucket_id_idx; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX vector_indexes_name_bucket_id_idx ON storage.vector_indexes USING btree (name, bucket_id);


--
-- TOC entry 4107 (class 0 OID 0)
-- Name: messages_2025_11_22_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2025_11_22_inserted_at_topic_idx;


--
-- TOC entry 4108 (class 0 OID 0)
-- Name: messages_2025_11_22_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_11_22_pkey;


--
-- TOC entry 4109 (class 0 OID 0)
-- Name: messages_2025_11_23_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2025_11_23_inserted_at_topic_idx;


--
-- TOC entry 4110 (class 0 OID 0)
-- Name: messages_2025_11_23_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_11_23_pkey;


--
-- TOC entry 4111 (class 0 OID 0)
-- Name: messages_2025_11_24_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2025_11_24_inserted_at_topic_idx;


--
-- TOC entry 4112 (class 0 OID 0)
-- Name: messages_2025_11_24_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_11_24_pkey;


--
-- TOC entry 4113 (class 0 OID 0)
-- Name: messages_2025_11_25_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2025_11_25_inserted_at_topic_idx;


--
-- TOC entry 4114 (class 0 OID 0)
-- Name: messages_2025_11_25_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_11_25_pkey;


--
-- TOC entry 4115 (class 0 OID 0)
-- Name: messages_2025_11_26_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2025_11_26_inserted_at_topic_idx;


--
-- TOC entry 4116 (class 0 OID 0)
-- Name: messages_2025_11_26_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2025_11_26_pkey;


--
-- TOC entry 4170 (class 2620 OID 17302)
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- TOC entry 4163 (class 2620 OID 17268)
-- Name: buckets enforce_bucket_name_length_trigger; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER enforce_bucket_name_length_trigger BEFORE INSERT OR UPDATE OF name ON storage.buckets FOR EACH ROW EXECUTE FUNCTION storage.enforce_bucket_name_length();


--
-- TOC entry 4164 (class 2620 OID 17299)
-- Name: objects objects_delete_delete_prefix; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER objects_delete_delete_prefix AFTER DELETE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger();


--
-- TOC entry 4165 (class 2620 OID 17225)
-- Name: objects objects_insert_create_prefix; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER objects_insert_create_prefix BEFORE INSERT ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.objects_insert_prefix_trigger();


--
-- TOC entry 4166 (class 2620 OID 17298)
-- Name: objects objects_update_create_prefix; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER objects_update_create_prefix BEFORE UPDATE ON storage.objects FOR EACH ROW WHEN (((new.name <> old.name) OR (new.bucket_id <> old.bucket_id))) EXECUTE FUNCTION storage.objects_update_prefix_trigger();


--
-- TOC entry 4168 (class 2620 OID 17264)
-- Name: prefixes prefixes_create_hierarchy; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER prefixes_create_hierarchy BEFORE INSERT ON storage.prefixes FOR EACH ROW WHEN ((pg_trigger_depth() < 1)) EXECUTE FUNCTION storage.prefixes_insert_trigger();


--
-- TOC entry 4169 (class 2620 OID 17300)
-- Name: prefixes prefixes_delete_hierarchy; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER prefixes_delete_hierarchy AFTER DELETE ON storage.prefixes FOR EACH ROW EXECUTE FUNCTION storage.delete_prefix_hierarchy_trigger();


--
-- TOC entry 4167 (class 2620 OID 17136)
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- TOC entry 4119 (class 2606 OID 16734)
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4124 (class 2606 OID 16823)
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- TOC entry 4123 (class 2606 OID 16811)
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- TOC entry 4122 (class 2606 OID 16798)
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4130 (class 2606 OID 17063)
-- Name: oauth_authorizations oauth_authorizations_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- TOC entry 4131 (class 2606 OID 17068)
-- Name: oauth_authorizations oauth_authorizations_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4132 (class 2606 OID 17092)
-- Name: oauth_consents oauth_consents_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- TOC entry 4133 (class 2606 OID 17087)
-- Name: oauth_consents oauth_consents_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4129 (class 2606 OID 16989)
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4117 (class 2606 OID 16767)
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- TOC entry 4126 (class 2606 OID 16870)
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- TOC entry 4127 (class 2606 OID 16943)
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- TOC entry 4128 (class 2606 OID 16884)
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- TOC entry 4120 (class 2606 OID 17106)
-- Name: sessions sessions_oauth_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_oauth_client_id_fkey FOREIGN KEY (oauth_client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- TOC entry 4121 (class 2606 OID 16762)
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4125 (class 2606 OID 16851)
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- TOC entry 4140 (class 2606 OID 17978)
-- Name: courier courier_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courier
    ADD CONSTRAINT courier_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.service_user(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4141 (class 2606 OID 22560)
-- Name: courier courier_user_status_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courier
    ADD CONSTRAINT courier_user_status_fkey FOREIGN KEY (user_status) REFERENCES public.user_status(userstatus_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4142 (class 2606 OID 17615)
-- Name: courier courier_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courier
    ADD CONSTRAINT courier_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.type_vehicle(vehicle_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4150 (class 2606 OID 21145)
-- Name: fare_configuration fare_configuration_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fare_configuration
    ADD CONSTRAINT fare_configuration_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.service_user(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4156 (class 2606 OID 25548)
-- Name: favorites favorites_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_order_id_fkey FOREIGN KEY (order_id) REFERENCES public."order"(order_id);


--
-- TOC entry 4157 (class 2606 OID 18032)
-- Name: favorites favorites_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.service_user(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4158 (class 2606 OID 18022)
-- Name: history history_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.history
    ADD CONSTRAINT history_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.service_user(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4143 (class 2606 OID 17687)
-- Name: order order_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.goods_category(category_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4144 (class 2606 OID 17990)
-- Name: order order_courier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_courier_id_fkey FOREIGN KEY (courier_id) REFERENCES public.service_user(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4145 (class 2606 OID 17682)
-- Name: order order_deliveryStatus_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "order_deliveryStatus_id_fkey" FOREIGN KEY (deliverystatus_id) REFERENCES public.delivery_status(deliverstatus_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4146 (class 2606 OID 17677)
-- Name: order order_payment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES public.payment_method(payment_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4147 (class 2606 OID 17672)
-- Name: order order_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.delivery_service(service_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4148 (class 2606 OID 17966)
-- Name: order order_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.service_user(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4149 (class 2606 OID 17692)
-- Name: order order_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.type_vehicle(vehicle_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4161 (class 2606 OID 21092)
-- Name: overview overview_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.overview
    ADD CONSTRAINT overview_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.service_user(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4159 (class 2606 OID 17952)
-- Name: service_user service_user_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service_user
    ADD CONSTRAINT service_user_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4160 (class 2606 OID 17947)
-- Name: service_user service_user_userstatus_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service_user
    ADD CONSTRAINT service_user_userstatus_id_fkey FOREIGN KEY (userstatus_id) REFERENCES public.user_status(userstatus_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4138 (class 2606 OID 21155)
-- Name: type_vehicle type_vehicle_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_vehicle
    ADD CONSTRAINT type_vehicle_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.service_user(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4151 (class 2606 OID 17719)
-- Name: users_reporting users_reporting_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_reporting
    ADD CONSTRAINT users_reporting_order_id_fkey FOREIGN KEY (order_id) REFERENCES public."order"(order_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4152 (class 2606 OID 18010)
-- Name: users_reporting users_reporting_reported_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_reporting
    ADD CONSTRAINT users_reporting_reported_id_fkey FOREIGN KEY (reported_id) REFERENCES public.service_user(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4153 (class 2606 OID 18005)
-- Name: users_reporting users_reporting_reporter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_reporting
    ADD CONSTRAINT users_reporting_reporter_id_fkey FOREIGN KEY (reporter_id) REFERENCES public.service_user(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4154 (class 2606 OID 17734)
-- Name: users_reporting users_reporting_reportset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_reporting
    ADD CONSTRAINT users_reporting_reportset_id_fkey FOREIGN KEY (reportset_id) REFERENCES public.report_set(reportset_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4155 (class 2606 OID 17750)
-- Name: users_reporting users_reporting_reportstatus_int_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_reporting
    ADD CONSTRAINT users_reporting_reportstatus_int_fkey FOREIGN KEY (reportstatus_int) REFERENCES public.report_status(reportstatus_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4139 (class 2606 OID 17522)
-- Name: vehicle_price vehicle_price_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vehicle_price
    ADD CONSTRAINT vehicle_price_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.type_vehicle(vehicle_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4118 (class 2606 OID 16572)
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- TOC entry 4137 (class 2606 OID 17212)
-- Name: prefixes prefixes_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.prefixes
    ADD CONSTRAINT "prefixes_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- TOC entry 4134 (class 2606 OID 17158)
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- TOC entry 4135 (class 2606 OID 17178)
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- TOC entry 4136 (class 2606 OID 17173)
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- TOC entry 4162 (class 2606 OID 22427)
-- Name: vector_indexes vector_indexes_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.vector_indexes
    ADD CONSTRAINT vector_indexes_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets_vectors(id);


--
-- TOC entry 4322 (class 0 OID 16525)
-- Dependencies: 352
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4336 (class 0 OID 16929)
-- Dependencies: 369
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4327 (class 0 OID 16727)
-- Dependencies: 360
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4321 (class 0 OID 16518)
-- Dependencies: 351
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4331 (class 0 OID 16816)
-- Dependencies: 364
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4330 (class 0 OID 16804)
-- Dependencies: 363
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4329 (class 0 OID 16791)
-- Dependencies: 362
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4337 (class 0 OID 16979)
-- Dependencies: 370
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4320 (class 0 OID 16507)
-- Dependencies: 350
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4334 (class 0 OID 16858)
-- Dependencies: 367
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4335 (class 0 OID 16876)
-- Dependencies: 368
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4323 (class 0 OID 16533)
-- Dependencies: 353
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4328 (class 0 OID 16757)
-- Dependencies: 361
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4333 (class 0 OID 16843)
-- Dependencies: 366
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4332 (class 0 OID 16834)
-- Dependencies: 365
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4319 (class 0 OID 16495)
-- Dependencies: 348
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4401 (class 3256 OID 25440)
-- Name: courier Allow authenticated users to read courier info; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to read courier info" ON public.courier FOR SELECT TO authenticated USING (true);


--
-- TOC entry 4396 (class 3256 OID 24138)
-- Name: fare_configuration Allow authenticated users to read fare config; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to read fare config" ON public.fare_configuration FOR SELECT TO authenticated USING (true);


--
-- TOC entry 4402 (class 3256 OID 25441)
-- Name: delivery_status Allow authenticated users to read statuses; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to read statuses" ON public.delivery_status FOR SELECT TO authenticated USING (true);


--
-- TOC entry 4397 (class 3256 OID 24139)
-- Name: type_vehicle Allow authenticated users to read vehicle types; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to read vehicle types" ON public.type_vehicle FOR SELECT TO authenticated USING (true);


--
-- TOC entry 4399 (class 3256 OID 24141)
-- Name: order Allow users to create their own orders; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow users to create their own orders" ON public."order" FOR INSERT TO authenticated WITH CHECK ((auth.uid() = user_id));


--
-- TOC entry 4398 (class 3256 OID 24140)
-- Name: service_user Allow users to read own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow users to read own profile" ON public.service_user FOR SELECT TO authenticated USING ((auth.uid() = user_id));


--
-- TOC entry 4373 (class 3256 OID 18677)
-- Name: courier Allow users to read their own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow users to read their own profile" ON public.courier FOR SELECT TO authenticated USING ((auth.uid() = user_id));


--
-- TOC entry 4370 (class 3256 OID 18664)
-- Name: service_user Allow users to read their own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow users to read their own profile" ON public.service_user FOR SELECT TO authenticated USING ((auth.uid() = user_id));


--
-- TOC entry 4403 (class 3256 OID 25527)
-- Name: order Allow users to update their own orders; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow users to update their own orders" ON public."order" FOR UPDATE TO authenticated USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));


--
-- TOC entry 4369 (class 3256 OID 18663)
-- Name: service_user Allow users to update their own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow users to update their own profile" ON public.service_user FOR UPDATE TO authenticated USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));


--
-- TOC entry 4400 (class 3256 OID 24142)
-- Name: order Allow users to view their own orders; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow users to view their own orders" ON public."order" FOR SELECT TO authenticated USING ((auth.uid() = user_id));


--
-- TOC entry 4383 (class 3256 OID 22954)
-- Name: order Enable insert for authenticated users matching user_id; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for authenticated users matching user_id" ON public."order" FOR INSERT TO authenticated WITH CHECK ((auth.uid() = user_id));


--
-- TOC entry 4371 (class 3256 OID 18675)
-- Name: courier Enable insert for authenticated users only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for authenticated users only" ON public.courier FOR INSERT TO authenticated WITH CHECK ((auth.uid() = user_id));


--
-- TOC entry 4368 (class 3256 OID 18662)
-- Name: service_user Enable insert for authenticated users only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for authenticated users only" ON public.service_user FOR INSERT TO authenticated WITH CHECK ((auth.uid() = user_id));


--
-- TOC entry 4367 (class 3256 OID 18607)
-- Name: courier Enable insert for users based on user_id; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for users based on user_id" ON public.courier FOR INSERT WITH CHECK ((( SELECT auth.uid() AS uid) = user_id));


--
-- TOC entry 4382 (class 3256 OID 18570)
-- Name: type_vehicle Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.type_vehicle FOR SELECT TO authenticated USING (true);


--
-- TOC entry 4388 (class 3256 OID 22983)
-- Name: delivery_service Enable read access for authenticated users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for authenticated users" ON public.delivery_service FOR SELECT TO authenticated USING (true);


--
-- TOC entry 4390 (class 3256 OID 22985)
-- Name: delivery_status Enable read access for authenticated users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for authenticated users" ON public.delivery_status FOR SELECT TO authenticated USING (true);


--
-- TOC entry 4395 (class 3256 OID 24116)
-- Name: fare_configuration Enable read access for authenticated users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for authenticated users" ON public.fare_configuration FOR SELECT TO authenticated USING (true);


--
-- TOC entry 4387 (class 3256 OID 22982)
-- Name: goods_category Enable read access for authenticated users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for authenticated users" ON public.goods_category FOR SELECT TO authenticated USING (true);


--
-- TOC entry 4391 (class 3256 OID 22986)
-- Name: payment_method Enable read access for authenticated users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for authenticated users" ON public.payment_method FOR SELECT TO authenticated USING (true);


--
-- TOC entry 4389 (class 3256 OID 22984)
-- Name: type_vehicle Enable read access for authenticated users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for authenticated users" ON public.type_vehicle FOR SELECT TO authenticated USING (true);


--
-- TOC entry 4385 (class 3256 OID 22956)
-- Name: order Enable select for pending orders (Job Board); Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable select for pending orders (Job Board)" ON public."order" FOR SELECT TO authenticated USING ((deliverystatus_id IN ( SELECT "order".deliverystatus_id
   FROM public.delivery_status
  WHERE ((delivery_status.status_name)::text = 'Pending'::text))));


--
-- TOC entry 4384 (class 3256 OID 22955)
-- Name: order Enable select for users based on user_id; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable select for users based on user_id" ON public."order" FOR SELECT TO authenticated USING ((auth.uid() = user_id));


--
-- TOC entry 4386 (class 3256 OID 22957)
-- Name: order Enable update for users based on user_id and pending status; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable update for users based on user_id and pending status" ON public."order" FOR UPDATE TO authenticated USING (((auth.uid() = user_id) AND (deliverystatus_id IN ( SELECT "order".deliverystatus_id
   FROM public.delivery_status
  WHERE ((delivery_status.status_name)::text = 'Pending'::text))))) WITH CHECK (((auth.uid() = user_id) AND (deliverystatus_id IN ( SELECT "order".deliverystatus_id
   FROM public.delivery_status
  WHERE ((delivery_status.status_name)::text = 'Pending'::text)))));


--
-- TOC entry 4404 (class 3256 OID 25555)
-- Name: favorites Users can add their own favorites; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can add their own favorites" ON public.favorites FOR INSERT TO authenticated WITH CHECK ((auth.uid() = user_id));


--
-- TOC entry 4392 (class 3256 OID 22987)
-- Name: order Users can create their own orders; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can create their own orders" ON public."order" FOR INSERT TO authenticated WITH CHECK ((auth.uid() = user_id));


--
-- TOC entry 4405 (class 3256 OID 25556)
-- Name: favorites Users can remove their own favorites; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can remove their own favorites" ON public.favorites FOR DELETE TO authenticated USING ((auth.uid() = user_id));


--
-- TOC entry 4394 (class 3256 OID 22989)
-- Name: order Users can update their own orders; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update their own orders" ON public."order" FOR UPDATE TO authenticated USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));


--
-- TOC entry 4406 (class 3256 OID 25557)
-- Name: favorites Users can view their own favorites; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view their own favorites" ON public.favorites FOR SELECT TO authenticated USING ((auth.uid() = user_id));


--
-- TOC entry 4393 (class 3256 OID 22988)
-- Name: order Users can view their own orders; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view their own orders" ON public."order" FOR SELECT TO authenticated USING ((auth.uid() = user_id));


--
-- TOC entry 4351 (class 0 OID 17601)
-- Dependencies: 401
-- Name: courier; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.courier ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4372 (class 3256 OID 18676)
-- Name: courier courier update; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "courier update" ON public.courier FOR UPDATE TO authenticated USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));


--
-- TOC entry 4348 (class 0 OID 17549)
-- Dependencies: 395
-- Name: delivery_service; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.delivery_service ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4346 (class 0 OID 17527)
-- Dependencies: 391
-- Name: delivery_status; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.delivery_status ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4377 (class 3256 OID 21150)
-- Name: fare_configuration edit fare; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "edit fare" ON public.fare_configuration FOR UPDATE TO authenticated USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));


--
-- TOC entry 4375 (class 3256 OID 21097)
-- Name: overview edit overview; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "edit overview" ON public.overview FOR UPDATE TO authenticated USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));


--
-- TOC entry 4378 (class 3256 OID 21160)
-- Name: type_vehicle edit vehicle; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "edit vehicle" ON public.type_vehicle FOR UPDATE TO authenticated USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));


--
-- TOC entry 4353 (class 0 OID 17697)
-- Dependencies: 404
-- Name: fare_configuration; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.fare_configuration ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4356 (class 0 OID 17755)
-- Dependencies: 410
-- Name: favorites; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4349 (class 0 OID 17560)
-- Dependencies: 397
-- Name: goods_category; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.goods_category ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4357 (class 0 OID 17775)
-- Dependencies: 412
-- Name: history; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.history ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4380 (class 3256 OID 21161)
-- Name: type_vehicle insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY insert ON public.type_vehicle FOR INSERT TO authenticated WITH CHECK ((auth.uid() = user_id));


--
-- TOC entry 4381 (class 3256 OID 21162)
-- Name: fare_configuration insert fare; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "insert fare" ON public.fare_configuration FOR INSERT TO authenticated WITH CHECK ((auth.uid() = user_id));


--
-- TOC entry 4376 (class 3256 OID 21120)
-- Name: overview insert overview; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "insert overview" ON public.overview FOR INSERT TO authenticated WITH CHECK ((auth.uid() = user_id));


--
-- TOC entry 4352 (class 0 OID 17650)
-- Dependencies: 402
-- Name: order; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public."order" ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4359 (class 0 OID 21079)
-- Dependencies: 415
-- Name: overview; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.overview ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4347 (class 0 OID 17538)
-- Dependencies: 393
-- Name: payment_method; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.payment_method ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4350 (class 0 OID 17571)
-- Dependencies: 399
-- Name: report_set; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.report_set ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4355 (class 0 OID 17739)
-- Dependencies: 408
-- Name: report_status; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.report_status ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4374 (class 3256 OID 21091)
-- Name: overview select all; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "select all" ON public.overview FOR SELECT USING (true);


--
-- TOC entry 4379 (class 3256 OID 21151)
-- Name: fare_configuration select fare all; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "select fare all" ON public.fare_configuration FOR SELECT TO authenticated USING (true);


--
-- TOC entry 4358 (class 0 OID 17931)
-- Dependencies: 414
-- Name: service_user; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.service_user ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4362 (class 3256 OID 18047)
-- Name: service_user sign-up all insert; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "sign-up all insert" ON public.service_user FOR INSERT WITH CHECK (true);


--
-- TOC entry 4344 (class 0 OID 17462)
-- Dependencies: 387
-- Name: type_vehicle; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.type_vehicle ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4343 (class 0 OID 17451)
-- Dependencies: 385
-- Name: user_status; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.user_status ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4354 (class 0 OID 17709)
-- Dependencies: 406
-- Name: users_reporting; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.users_reporting ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4345 (class 0 OID 17510)
-- Dependencies: 389
-- Name: vehicle_price; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.vehicle_price ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4342 (class 0 OID 17434)
-- Dependencies: 384
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4363 (class 3256 OID 18593)
-- Name: objects Give users access to own folder egnuxe_0; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Give users access to own folder egnuxe_0" ON storage.objects FOR SELECT USING (((bucket_id = 'licenses'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));


--
-- TOC entry 4364 (class 3256 OID 18594)
-- Name: objects Give users access to own folder egnuxe_1; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Give users access to own folder egnuxe_1" ON storage.objects FOR INSERT WITH CHECK (((bucket_id = 'licenses'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));


--
-- TOC entry 4366 (class 3256 OID 18596)
-- Name: objects Give users access to own folder egnuxe_2; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Give users access to own folder egnuxe_2" ON storage.objects FOR UPDATE USING (((bucket_id = 'licenses'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));


--
-- TOC entry 4365 (class 3256 OID 18595)
-- Name: objects Give users access to own folder egnuxe_3; Type: POLICY; Schema: storage; Owner: supabase_storage_admin
--

CREATE POLICY "Give users access to own folder egnuxe_3" ON storage.objects FOR DELETE USING (((bucket_id = 'licenses'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));


--
-- TOC entry 4324 (class 0 OID 16546)
-- Dependencies: 354
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4341 (class 0 OID 17276)
-- Dependencies: 381
-- Name: buckets_analytics; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets_analytics ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4360 (class 0 OID 22407)
-- Dependencies: 417
-- Name: buckets_vectors; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets_vectors ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4326 (class 0 OID 16588)
-- Dependencies: 356
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4325 (class 0 OID 16561)
-- Dependencies: 355
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4340 (class 0 OID 17202)
-- Dependencies: 377
-- Name: prefixes; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.prefixes ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4338 (class 0 OID 17149)
-- Dependencies: 375
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4339 (class 0 OID 17163)
-- Dependencies: 376
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4361 (class 0 OID 22417)
-- Dependencies: 418
-- Name: vector_indexes; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.vector_indexes ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4407 (class 6104 OID 16426)
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- TOC entry 4408 (class 6104 OID 25524)
-- Name: supabase_realtime_messages_publication; Type: PUBLICATION; Schema: -; Owner: supabase_admin
--

CREATE PUBLICATION supabase_realtime_messages_publication WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime_messages_publication OWNER TO supabase_admin;

--
-- TOC entry 4409 (class 6106 OID 25525)
-- Name: supabase_realtime_messages_publication messages; Type: PUBLICATION TABLE; Schema: realtime; Owner: supabase_admin
--

ALTER PUBLICATION supabase_realtime_messages_publication ADD TABLE ONLY realtime.messages;


--
-- TOC entry 4484 (class 0 OID 0)
-- Dependencies: 37
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT USAGE ON SCHEMA auth TO postgres;


--
-- TOC entry 4485 (class 0 OID 0)
-- Dependencies: 23
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- TOC entry 4486 (class 0 OID 0)
-- Dependencies: 39
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- TOC entry 4487 (class 0 OID 0)
-- Dependencies: 13
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- TOC entry 4488 (class 0 OID 0)
-- Dependencies: 38
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA storage TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- TOC entry 4489 (class 0 OID 0)
-- Dependencies: 32
-- Name: SCHEMA vault; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA vault TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA vault TO service_role;


--
-- TOC entry 4496 (class 0 OID 0)
-- Dependencies: 464
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;


--
-- TOC entry 4497 (class 0 OID 0)
-- Dependencies: 475
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- TOC entry 4499 (class 0 OID 0)
-- Dependencies: 428
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;


--
-- TOC entry 4501 (class 0 OID 0)
-- Dependencies: 442
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;


--
-- TOC entry 4502 (class 0 OID 0)
-- Dependencies: 474
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;


--
-- TOC entry 4503 (class 0 OID 0)
-- Dependencies: 513
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea, text[], text[]) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;


--
-- TOC entry 4504 (class 0 OID 0)
-- Dependencies: 500
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.crypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;


--
-- TOC entry 4505 (class 0 OID 0)
-- Dependencies: 490
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.dearmor(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;


--
-- TOC entry 4506 (class 0 OID 0)
-- Dependencies: 491
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4507 (class 0 OID 0)
-- Dependencies: 459
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4508 (class 0 OID 0)
-- Dependencies: 524
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;


--
-- TOC entry 4509 (class 0 OID 0)
-- Dependencies: 507
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;


--
-- TOC entry 4510 (class 0 OID 0)
-- Dependencies: 451
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4511 (class 0 OID 0)
-- Dependencies: 436
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4512 (class 0 OID 0)
-- Dependencies: 510
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_bytes(integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;


--
-- TOC entry 4513 (class 0 OID 0)
-- Dependencies: 429
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_uuid() FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;


--
-- TOC entry 4514 (class 0 OID 0)
-- Dependencies: 554
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;


--
-- TOC entry 4515 (class 0 OID 0)
-- Dependencies: 551
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text, integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;


--
-- TOC entry 4517 (class 0 OID 0)
-- Dependencies: 506
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- TOC entry 4519 (class 0 OID 0)
-- Dependencies: 489
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4521 (class 0 OID 0)
-- Dependencies: 458
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- TOC entry 4522 (class 0 OID 0)
-- Dependencies: 435
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4523 (class 0 OID 0)
-- Dependencies: 539
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;


--
-- TOC entry 4524 (class 0 OID 0)
-- Dependencies: 515
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO dashboard_user;


--
-- TOC entry 4525 (class 0 OID 0)
-- Dependencies: 549
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO dashboard_user;


--
-- TOC entry 4526 (class 0 OID 0)
-- Dependencies: 509
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO dashboard_user;


--
-- TOC entry 4527 (class 0 OID 0)
-- Dependencies: 462
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;


--
-- TOC entry 4528 (class 0 OID 0)
-- Dependencies: 460
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_key_id(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;


--
-- TOC entry 4529 (class 0 OID 0)
-- Dependencies: 533
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;


--
-- TOC entry 4530 (class 0 OID 0)
-- Dependencies: 426
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4531 (class 0 OID 0)
-- Dependencies: 535
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;


--
-- TOC entry 4532 (class 0 OID 0)
-- Dependencies: 437
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- TOC entry 4533 (class 0 OID 0)
-- Dependencies: 545
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4534 (class 0 OID 0)
-- Dependencies: 543
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;


--
-- TOC entry 4535 (class 0 OID 0)
-- Dependencies: 470
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;


--
-- TOC entry 4536 (class 0 OID 0)
-- Dependencies: 463
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;


--
-- TOC entry 4537 (class 0 OID 0)
-- Dependencies: 449
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- TOC entry 4538 (class 0 OID 0)
-- Dependencies: 526
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4539 (class 0 OID 0)
-- Dependencies: 530
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;


--
-- TOC entry 4540 (class 0 OID 0)
-- Dependencies: 465
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;


--
-- TOC entry 4541 (class 0 OID 0)
-- Dependencies: 534
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;


--
-- TOC entry 4542 (class 0 OID 0)
-- Dependencies: 529
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- TOC entry 4543 (class 0 OID 0)
-- Dependencies: 553
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;


--
-- TOC entry 4544 (class 0 OID 0)
-- Dependencies: 478
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;


--
-- TOC entry 4545 (class 0 OID 0)
-- Dependencies: 441
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;


--
-- TOC entry 4546 (class 0 OID 0)
-- Dependencies: 537
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- TOC entry 4547 (class 0 OID 0)
-- Dependencies: 424
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4548 (class 0 OID 0)
-- Dependencies: 516
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4550 (class 0 OID 0)
-- Dependencies: 433
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4551 (class 0 OID 0)
-- Dependencies: 471
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;


--
-- TOC entry 4552 (class 0 OID 0)
-- Dependencies: 520
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1mc() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;


--
-- TOC entry 4553 (class 0 OID 0)
-- Dependencies: 425
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;


--
-- TOC entry 4554 (class 0 OID 0)
-- Dependencies: 439
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v4() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;


--
-- TOC entry 4555 (class 0 OID 0)
-- Dependencies: 448
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;


--
-- TOC entry 4556 (class 0 OID 0)
-- Dependencies: 502
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_nil() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;


--
-- TOC entry 4557 (class 0 OID 0)
-- Dependencies: 450
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_dns() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;


--
-- TOC entry 4558 (class 0 OID 0)
-- Dependencies: 538
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_oid() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;


--
-- TOC entry 4559 (class 0 OID 0)
-- Dependencies: 496
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_url() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;


--
-- TOC entry 4560 (class 0 OID 0)
-- Dependencies: 504
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_x500() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;


--
-- TOC entry 4561 (class 0 OID 0)
-- Dependencies: 541
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- TOC entry 4562 (class 0 OID 0)
-- Dependencies: 466
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO postgres;


--
-- TOC entry 4563 (class 0 OID 0)
-- Dependencies: 548
-- Name: FUNCTION accept_order(target_order_id bigint, driver_id uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.accept_order(target_order_id bigint, driver_id uuid) TO anon;
GRANT ALL ON FUNCTION public.accept_order(target_order_id bigint, driver_id uuid) TO authenticated;
GRANT ALL ON FUNCTION public.accept_order(target_order_id bigint, driver_id uuid) TO service_role;


--
-- TOC entry 4564 (class 0 OID 0)
-- Dependencies: 485
-- Name: FUNCTION cancel_order(target_order_id bigint); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.cancel_order(target_order_id bigint) TO anon;
GRANT ALL ON FUNCTION public.cancel_order(target_order_id bigint) TO authenticated;
GRANT ALL ON FUNCTION public.cancel_order(target_order_id bigint) TO service_role;


--
-- TOC entry 4565 (class 0 OID 0)
-- Dependencies: 467
-- Name: FUNCTION expire_old_pending_orders(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.expire_old_pending_orders() TO anon;
GRANT ALL ON FUNCTION public.expire_old_pending_orders() TO authenticated;
GRANT ALL ON FUNCTION public.expire_old_pending_orders() TO service_role;


--
-- TOC entry 4566 (class 0 OID 0)
-- Dependencies: 540
-- Name: FUNCTION get_couriers_with_filters(status_filter text, search_filter text); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_couriers_with_filters(status_filter text, search_filter text) TO anon;
GRANT ALL ON FUNCTION public.get_couriers_with_filters(status_filter text, search_filter text) TO authenticated;
GRANT ALL ON FUNCTION public.get_couriers_with_filters(status_filter text, search_filter text) TO service_role;


--
-- TOC entry 4567 (class 0 OID 0)
-- Dependencies: 522
-- Name: FUNCTION get_customer_orders(status_filter text, search_query text, page_number integer, page_size integer); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_customer_orders(status_filter text, search_query text, page_number integer, page_size integer) TO anon;
GRANT ALL ON FUNCTION public.get_customer_orders(status_filter text, search_query text, page_number integer, page_size integer) TO authenticated;
GRANT ALL ON FUNCTION public.get_customer_orders(status_filter text, search_query text, page_number integer, page_size integer) TO service_role;


--
-- TOC entry 4568 (class 0 OID 0)
-- Dependencies: 482
-- Name: FUNCTION get_customers_with_filters(status_filter text, search_filter text); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_customers_with_filters(status_filter text, search_filter text) TO anon;
GRANT ALL ON FUNCTION public.get_customers_with_filters(status_filter text, search_filter text) TO authenticated;
GRANT ALL ON FUNCTION public.get_customers_with_filters(status_filter text, search_filter text) TO service_role;


--
-- TOC entry 4569 (class 0 OID 0)
-- Dependencies: 532
-- Name: FUNCTION get_profile_details(target_id uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_profile_details(target_id uuid) TO anon;
GRANT ALL ON FUNCTION public.get_profile_details(target_id uuid) TO authenticated;
GRANT ALL ON FUNCTION public.get_profile_details(target_id uuid) TO service_role;


--
-- TOC entry 4570 (class 0 OID 0)
-- Dependencies: 447
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;


--
-- TOC entry 4571 (class 0 OID 0)
-- Dependencies: 550
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- TOC entry 4572 (class 0 OID 0)
-- Dependencies: 481
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;


--
-- TOC entry 4573 (class 0 OID 0)
-- Dependencies: 438
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;


--
-- TOC entry 4574 (class 0 OID 0)
-- Dependencies: 469
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;


--
-- TOC entry 4575 (class 0 OID 0)
-- Dependencies: 503
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;


--
-- TOC entry 4576 (class 0 OID 0)
-- Dependencies: 531
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO supabase_realtime_admin;


--
-- TOC entry 4577 (class 0 OID 0)
-- Dependencies: 523
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;


--
-- TOC entry 4578 (class 0 OID 0)
-- Dependencies: 445
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- TOC entry 4579 (class 0 OID 0)
-- Dependencies: 492
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;


--
-- TOC entry 4580 (class 0 OID 0)
-- Dependencies: 480
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;


--
-- TOC entry 4581 (class 0 OID 0)
-- Dependencies: 476
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- TOC entry 4582 (class 0 OID 0)
-- Dependencies: 444
-- Name: FUNCTION _crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO service_role;


--
-- TOC entry 4583 (class 0 OID 0)
-- Dependencies: 432
-- Name: FUNCTION create_secret(new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- TOC entry 4584 (class 0 OID 0)
-- Dependencies: 488
-- Name: FUNCTION update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- TOC entry 4586 (class 0 OID 0)
-- Dependencies: 352
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- TOC entry 4588 (class 0 OID 0)
-- Dependencies: 369
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.flow_state TO dashboard_user;


--
-- TOC entry 4591 (class 0 OID 0)
-- Dependencies: 360
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.identities TO dashboard_user;


--
-- TOC entry 4593 (class 0 OID 0)
-- Dependencies: 351
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- TOC entry 4595 (class 0 OID 0)
-- Dependencies: 364
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- TOC entry 4597 (class 0 OID 0)
-- Dependencies: 363
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- TOC entry 4600 (class 0 OID 0)
-- Dependencies: 362
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_factors TO dashboard_user;


--
-- TOC entry 4601 (class 0 OID 0)
-- Dependencies: 372
-- Name: TABLE oauth_authorizations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_authorizations TO postgres;
GRANT ALL ON TABLE auth.oauth_authorizations TO dashboard_user;


--
-- TOC entry 4602 (class 0 OID 0)
-- Dependencies: 371
-- Name: TABLE oauth_clients; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_clients TO postgres;
GRANT ALL ON TABLE auth.oauth_clients TO dashboard_user;


--
-- TOC entry 4603 (class 0 OID 0)
-- Dependencies: 373
-- Name: TABLE oauth_consents; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_consents TO postgres;
GRANT ALL ON TABLE auth.oauth_consents TO dashboard_user;


--
-- TOC entry 4604 (class 0 OID 0)
-- Dependencies: 370
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- TOC entry 4606 (class 0 OID 0)
-- Dependencies: 350
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- TOC entry 4608 (class 0 OID 0)
-- Dependencies: 349
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- TOC entry 4610 (class 0 OID 0)
-- Dependencies: 367
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_providers TO dashboard_user;


--
-- TOC entry 4612 (class 0 OID 0)
-- Dependencies: 368
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- TOC entry 4614 (class 0 OID 0)
-- Dependencies: 353
-- Name: TABLE schema_migrations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT ON TABLE auth.schema_migrations TO postgres WITH GRANT OPTION;


--
-- TOC entry 4619 (class 0 OID 0)
-- Dependencies: 361
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sessions TO dashboard_user;


--
-- TOC entry 4621 (class 0 OID 0)
-- Dependencies: 366
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_domains TO dashboard_user;


--
-- TOC entry 4624 (class 0 OID 0)
-- Dependencies: 365
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_providers TO dashboard_user;


--
-- TOC entry 4627 (class 0 OID 0)
-- Dependencies: 348
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- TOC entry 4628 (class 0 OID 0)
-- Dependencies: 347
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements TO dashboard_user;


--
-- TOC entry 4629 (class 0 OID 0)
-- Dependencies: 346
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements_info FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO dashboard_user;


--
-- TOC entry 4630 (class 0 OID 0)
-- Dependencies: 401
-- Name: TABLE courier; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.courier TO anon;
GRANT ALL ON TABLE public.courier TO authenticated;
GRANT ALL ON TABLE public.courier TO service_role;


--
-- TOC entry 4631 (class 0 OID 0)
-- Dependencies: 395
-- Name: TABLE delivery_service; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.delivery_service TO anon;
GRANT ALL ON TABLE public.delivery_service TO authenticated;
GRANT ALL ON TABLE public.delivery_service TO service_role;


--
-- TOC entry 4632 (class 0 OID 0)
-- Dependencies: 396
-- Name: SEQUENCE delivery_service_service_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.delivery_service_service_id_seq TO anon;
GRANT ALL ON SEQUENCE public.delivery_service_service_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.delivery_service_service_id_seq TO service_role;


--
-- TOC entry 4633 (class 0 OID 0)
-- Dependencies: 391
-- Name: TABLE delivery_status; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.delivery_status TO anon;
GRANT ALL ON TABLE public.delivery_status TO authenticated;
GRANT ALL ON TABLE public.delivery_status TO service_role;


--
-- TOC entry 4634 (class 0 OID 0)
-- Dependencies: 392
-- Name: SEQUENCE delivery_status_deliverstatus_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.delivery_status_deliverstatus_id_seq TO anon;
GRANT ALL ON SEQUENCE public.delivery_status_deliverstatus_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.delivery_status_deliverstatus_id_seq TO service_role;


--
-- TOC entry 4635 (class 0 OID 0)
-- Dependencies: 404
-- Name: TABLE fare_configuration; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.fare_configuration TO anon;
GRANT ALL ON TABLE public.fare_configuration TO authenticated;
GRANT ALL ON TABLE public.fare_configuration TO service_role;


--
-- TOC entry 4636 (class 0 OID 0)
-- Dependencies: 405
-- Name: SEQUENCE fare_configuration_config_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.fare_configuration_config_id_seq TO anon;
GRANT ALL ON SEQUENCE public.fare_configuration_config_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.fare_configuration_config_id_seq TO service_role;


--
-- TOC entry 4637 (class 0 OID 0)
-- Dependencies: 410
-- Name: TABLE favorites; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.favorites TO anon;
GRANT ALL ON TABLE public.favorites TO authenticated;
GRANT ALL ON TABLE public.favorites TO service_role;


--
-- TOC entry 4638 (class 0 OID 0)
-- Dependencies: 411
-- Name: SEQUENCE favorites_favorite_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.favorites_favorite_id_seq TO anon;
GRANT ALL ON SEQUENCE public.favorites_favorite_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.favorites_favorite_id_seq TO service_role;


--
-- TOC entry 4639 (class 0 OID 0)
-- Dependencies: 397
-- Name: TABLE goods_category; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.goods_category TO anon;
GRANT ALL ON TABLE public.goods_category TO authenticated;
GRANT ALL ON TABLE public.goods_category TO service_role;


--
-- TOC entry 4640 (class 0 OID 0)
-- Dependencies: 398
-- Name: SEQUENCE goods_category_category_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.goods_category_category_id_seq TO anon;
GRANT ALL ON SEQUENCE public.goods_category_category_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.goods_category_category_id_seq TO service_role;


--
-- TOC entry 4641 (class 0 OID 0)
-- Dependencies: 412
-- Name: TABLE history; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.history TO anon;
GRANT ALL ON TABLE public.history TO authenticated;
GRANT ALL ON TABLE public.history TO service_role;


--
-- TOC entry 4642 (class 0 OID 0)
-- Dependencies: 413
-- Name: SEQUENCE history_history_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.history_history_id_seq TO anon;
GRANT ALL ON SEQUENCE public.history_history_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.history_history_id_seq TO service_role;


--
-- TOC entry 4643 (class 0 OID 0)
-- Dependencies: 402
-- Name: TABLE "order"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."order" TO anon;
GRANT ALL ON TABLE public."order" TO authenticated;
GRANT ALL ON TABLE public."order" TO service_role;


--
-- TOC entry 4644 (class 0 OID 0)
-- Dependencies: 403
-- Name: SEQUENCE order_order_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.order_order_id_seq TO anon;
GRANT ALL ON SEQUENCE public.order_order_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.order_order_id_seq TO service_role;


--
-- TOC entry 4645 (class 0 OID 0)
-- Dependencies: 415
-- Name: TABLE overview; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.overview TO anon;
GRANT ALL ON TABLE public.overview TO authenticated;
GRANT ALL ON TABLE public.overview TO service_role;


--
-- TOC entry 4646 (class 0 OID 0)
-- Dependencies: 416
-- Name: SEQUENCE overview_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.overview_id_seq TO anon;
GRANT ALL ON SEQUENCE public.overview_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.overview_id_seq TO service_role;


--
-- TOC entry 4647 (class 0 OID 0)
-- Dependencies: 393
-- Name: TABLE payment_method; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.payment_method TO anon;
GRANT ALL ON TABLE public.payment_method TO authenticated;
GRANT ALL ON TABLE public.payment_method TO service_role;


--
-- TOC entry 4648 (class 0 OID 0)
-- Dependencies: 394
-- Name: SEQUENCE payment_method_payment_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.payment_method_payment_id_seq TO anon;
GRANT ALL ON SEQUENCE public.payment_method_payment_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.payment_method_payment_id_seq TO service_role;


--
-- TOC entry 4649 (class 0 OID 0)
-- Dependencies: 399
-- Name: TABLE report_set; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.report_set TO anon;
GRANT ALL ON TABLE public.report_set TO authenticated;
GRANT ALL ON TABLE public.report_set TO service_role;


--
-- TOC entry 4650 (class 0 OID 0)
-- Dependencies: 400
-- Name: SEQUENCE report_set_reportset_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.report_set_reportset_id_seq TO anon;
GRANT ALL ON SEQUENCE public.report_set_reportset_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.report_set_reportset_id_seq TO service_role;


--
-- TOC entry 4651 (class 0 OID 0)
-- Dependencies: 408
-- Name: TABLE report_status; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.report_status TO anon;
GRANT ALL ON TABLE public.report_status TO authenticated;
GRANT ALL ON TABLE public.report_status TO service_role;


--
-- TOC entry 4652 (class 0 OID 0)
-- Dependencies: 409
-- Name: SEQUENCE report_status_reportstatus_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.report_status_reportstatus_id_seq TO anon;
GRANT ALL ON SEQUENCE public.report_status_reportstatus_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.report_status_reportstatus_id_seq TO service_role;


--
-- TOC entry 4653 (class 0 OID 0)
-- Dependencies: 414
-- Name: TABLE service_user; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.service_user TO anon;
GRANT ALL ON TABLE public.service_user TO authenticated;
GRANT ALL ON TABLE public.service_user TO service_role;


--
-- TOC entry 4654 (class 0 OID 0)
-- Dependencies: 387
-- Name: TABLE type_vehicle; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.type_vehicle TO anon;
GRANT ALL ON TABLE public.type_vehicle TO authenticated;
GRANT ALL ON TABLE public.type_vehicle TO service_role;


--
-- TOC entry 4655 (class 0 OID 0)
-- Dependencies: 388
-- Name: SEQUENCE type_vehicle_vehicle_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.type_vehicle_vehicle_id_seq TO anon;
GRANT ALL ON SEQUENCE public.type_vehicle_vehicle_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.type_vehicle_vehicle_id_seq TO service_role;


--
-- TOC entry 4656 (class 0 OID 0)
-- Dependencies: 385
-- Name: TABLE user_status; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_status TO anon;
GRANT ALL ON TABLE public.user_status TO authenticated;
GRANT ALL ON TABLE public.user_status TO service_role;


--
-- TOC entry 4657 (class 0 OID 0)
-- Dependencies: 386
-- Name: SEQUENCE user_status_userstatus_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.user_status_userstatus_id_seq TO anon;
GRANT ALL ON SEQUENCE public.user_status_userstatus_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.user_status_userstatus_id_seq TO service_role;


--
-- TOC entry 4658 (class 0 OID 0)
-- Dependencies: 406
-- Name: TABLE users_reporting; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.users_reporting TO anon;
GRANT ALL ON TABLE public.users_reporting TO authenticated;
GRANT ALL ON TABLE public.users_reporting TO service_role;


--
-- TOC entry 4659 (class 0 OID 0)
-- Dependencies: 407
-- Name: SEQUENCE users_reporting_userreporting_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.users_reporting_userreporting_id_seq TO anon;
GRANT ALL ON SEQUENCE public.users_reporting_userreporting_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.users_reporting_userreporting_id_seq TO service_role;


--
-- TOC entry 4660 (class 0 OID 0)
-- Dependencies: 389
-- Name: TABLE vehicle_price; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.vehicle_price TO anon;
GRANT ALL ON TABLE public.vehicle_price TO authenticated;
GRANT ALL ON TABLE public.vehicle_price TO service_role;


--
-- TOC entry 4661 (class 0 OID 0)
-- Dependencies: 390
-- Name: SEQUENCE vehicle_price_pricing_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.vehicle_price_pricing_id_seq TO anon;
GRANT ALL ON SEQUENCE public.vehicle_price_pricing_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.vehicle_price_pricing_id_seq TO service_role;


--
-- TOC entry 4662 (class 0 OID 0)
-- Dependencies: 384
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON TABLE realtime.messages TO postgres;
GRANT ALL ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- TOC entry 4663 (class 0 OID 0)
-- Dependencies: 419
-- Name: TABLE messages_2025_11_22; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_11_22 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_11_22 TO dashboard_user;


--
-- TOC entry 4664 (class 0 OID 0)
-- Dependencies: 420
-- Name: TABLE messages_2025_11_23; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_11_23 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_11_23 TO dashboard_user;


--
-- TOC entry 4665 (class 0 OID 0)
-- Dependencies: 421
-- Name: TABLE messages_2025_11_24; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_11_24 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_11_24 TO dashboard_user;


--
-- TOC entry 4666 (class 0 OID 0)
-- Dependencies: 422
-- Name: TABLE messages_2025_11_25; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_11_25 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_11_25 TO dashboard_user;


--
-- TOC entry 4667 (class 0 OID 0)
-- Dependencies: 423
-- Name: TABLE messages_2025_11_26; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2025_11_26 TO postgres;
GRANT ALL ON TABLE realtime.messages_2025_11_26 TO dashboard_user;


--
-- TOC entry 4668 (class 0 OID 0)
-- Dependencies: 374
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.schema_migrations TO postgres;
GRANT ALL ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT ALL ON TABLE realtime.schema_migrations TO supabase_realtime_admin;


--
-- TOC entry 4669 (class 0 OID 0)
-- Dependencies: 380
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.subscription TO postgres;
GRANT ALL ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT ALL ON TABLE realtime.subscription TO supabase_realtime_admin;


--
-- TOC entry 4670 (class 0 OID 0)
-- Dependencies: 379
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;


--
-- TOC entry 4672 (class 0 OID 0)
-- Dependencies: 354
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

REVOKE ALL ON TABLE storage.buckets FROM supabase_storage_admin;
GRANT ALL ON TABLE storage.buckets TO supabase_storage_admin WITH GRANT OPTION;
GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO postgres WITH GRANT OPTION;


--
-- TOC entry 4673 (class 0 OID 0)
-- Dependencies: 381
-- Name: TABLE buckets_analytics; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets_analytics TO service_role;
GRANT ALL ON TABLE storage.buckets_analytics TO authenticated;
GRANT ALL ON TABLE storage.buckets_analytics TO anon;


--
-- TOC entry 4674 (class 0 OID 0)
-- Dependencies: 417
-- Name: TABLE buckets_vectors; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT ON TABLE storage.buckets_vectors TO service_role;
GRANT SELECT ON TABLE storage.buckets_vectors TO authenticated;
GRANT SELECT ON TABLE storage.buckets_vectors TO anon;


--
-- TOC entry 4676 (class 0 OID 0)
-- Dependencies: 355
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

REVOKE ALL ON TABLE storage.objects FROM supabase_storage_admin;
GRANT ALL ON TABLE storage.objects TO supabase_storage_admin WITH GRANT OPTION;
GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO postgres WITH GRANT OPTION;


--
-- TOC entry 4677 (class 0 OID 0)
-- Dependencies: 377
-- Name: TABLE prefixes; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.prefixes TO service_role;
GRANT ALL ON TABLE storage.prefixes TO authenticated;
GRANT ALL ON TABLE storage.prefixes TO anon;


--
-- TOC entry 4678 (class 0 OID 0)
-- Dependencies: 375
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;


--
-- TOC entry 4679 (class 0 OID 0)
-- Dependencies: 376
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;


--
-- TOC entry 4680 (class 0 OID 0)
-- Dependencies: 418
-- Name: TABLE vector_indexes; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT ON TABLE storage.vector_indexes TO service_role;
GRANT SELECT ON TABLE storage.vector_indexes TO authenticated;
GRANT SELECT ON TABLE storage.vector_indexes TO anon;


--
-- TOC entry 4681 (class 0 OID 0)
-- Dependencies: 357
-- Name: TABLE secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.secrets TO service_role;


--
-- TOC entry 4682 (class 0 OID 0)
-- Dependencies: 358
-- Name: TABLE decrypted_secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.decrypted_secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.decrypted_secrets TO service_role;


--
-- TOC entry 2588 (class 826 OID 16603)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- TOC entry 2589 (class 826 OID 16604)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- TOC entry 2587 (class 826 OID 16602)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO dashboard_user;


--
-- TOC entry 2598 (class 826 OID 16682)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- TOC entry 2597 (class 826 OID 16681)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- TOC entry 2596 (class 826 OID 16680)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES TO postgres WITH GRANT OPTION;


--
-- TOC entry 2601 (class 826 OID 16637)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO service_role;


--
-- TOC entry 2600 (class 826 OID 16636)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO service_role;


--
-- TOC entry 2599 (class 826 OID 16635)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO service_role;


--
-- TOC entry 2593 (class 826 OID 16617)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;


--
-- TOC entry 2595 (class 826 OID 16616)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;


--
-- TOC entry 2594 (class 826 OID 16615)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO service_role;


--
-- TOC entry 2580 (class 826 OID 16490)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- TOC entry 2581 (class 826 OID 16491)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- TOC entry 2579 (class 826 OID 16489)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- TOC entry 2583 (class 826 OID 16493)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- TOC entry 2578 (class 826 OID 16488)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- TOC entry 2582 (class 826 OID 16492)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- TOC entry 2591 (class 826 OID 16607)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- TOC entry 2592 (class 826 OID 16608)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- TOC entry 2590 (class 826 OID 16606)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO dashboard_user;


--
-- TOC entry 2586 (class 826 OID 16545)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;


--
-- TOC entry 2585 (class 826 OID 16544)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;


--
-- TOC entry 2584 (class 826 OID 16543)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO service_role;


--
-- TOC entry 3769 (class 3466 OID 16621)
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- TOC entry 3774 (class 3466 OID 16700)
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- TOC entry 3768 (class 3466 OID 16619)
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- TOC entry 3775 (class 3466 OID 16703)
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO supabase_admin;

--
-- TOC entry 3770 (class 3466 OID 16622)
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- TOC entry 3771 (class 3466 OID 16623)
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

-- Completed on 2025-11-23 22:40:54

--
-- PostgreSQL database dump complete
--

\unrestrict 9cB8OtiyPrWzQQnZ1x90GNW8WaowzlYdYOqQUVDI3ZuTDtt2oWzAgGYCNkyfUDS

