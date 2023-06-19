--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Debian 15.3-1.pgdg110+1)
-- Dumped by pg_dump version 15.3 (Debian 15.3-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: current_meters; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.current_meters (
    customer_id bigint,
    id bigint NOT NULL,
    evol_id character varying(255),
    installation_number character varying(255),
    physicala_address character varying(255)
);


ALTER TABLE public.current_meters OWNER TO root;

--
-- Name: current_meters_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.current_meters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.current_meters_id_seq OWNER TO root;

--
-- Name: current_meters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.current_meters_id_seq OWNED BY public.current_meters.id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.customers (
    start_date date,
    id bigint NOT NULL,
    company_reason character varying(255),
    name character varying(255),
    rbd character varying(255)
);


ALTER TABLE public.customers OWNER TO root;

--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.customers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customers_id_seq OWNER TO root;

--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: current_meters id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.current_meters ALTER COLUMN id SET DEFAULT nextval('public.current_meters_id_seq'::regclass);


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Data for Name: current_meters; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.current_meters (customer_id, id, evol_id, installation_number, physicala_address) FROM stdin;
1	1	11f9bb05-ad16-4cda-8f0d-0c9835d60f0e	1	Juan verdaguer
1	2	9b72e120-6c9e-43b0-bde7-fe3f6514a275	1	Antonio rios 123
2	3	82811c21-57e8-443c-8b99-6a19b01ffc67	2	prueba 2
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.customers (start_date, id, company_reason, name, rbd) FROM stdin;
2023-01-01	1	Sin Razon social	Javier Ahumada	17.865.601-5
1992-12-31	2	empresa fantasma2	empresa de entel2	17865601577777
\.


--
-- Name: current_meters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.current_meters_id_seq', 3, true);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.customers_id_seq', 2, true);


--
-- Name: current_meters current_meters_evol_id_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.current_meters
    ADD CONSTRAINT current_meters_evol_id_key UNIQUE (evol_id);


--
-- Name: current_meters current_meters_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.current_meters
    ADD CONSTRAINT current_meters_pkey PRIMARY KEY (id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: customers customers_rbd_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_rbd_key UNIQUE (rbd);


--
-- Name: current_meters fkd6s1uxv8x03n7dmb8o9kilpis; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.current_meters
    ADD CONSTRAINT fkd6s1uxv8x03n7dmb8o9kilpis FOREIGN KEY (customer_id) REFERENCES public.customers(id);


--
-- PostgreSQL database dump complete
--

