CREATE TABLE access(
  user_cod int4 not null,
  access_email VARCHAR(150) not null,
  access_key VARCHAR(150) not null,
  acces_uuid VARCHAR(150) not null,
  CONSTRAINT pk_access PRIMARY KEY (user_cod)
);

ALTER TABLE access OWNER TO user_espe;

CREATE UNIQUE INDEX email_index on access(access_email);

CREATE TABLE inputs(
	input_cod SERIAL not null,
	user_cod int4 not null,
	input_date date not null,
	input_time time not null,
	constraint pk_inputs primary key(input_cod)
);

alter table inputs owner to user_espe;

create table products(
	product_cod serial not null,
	type_cod int4 not null,
	product_name varchar(150) not null,
	product_price varchar(150) not null,
	constraint pk_products primary key (product_cod)
);

alter table products owner to user_espe;

create table types(
	type_cod serial not null,
	type_name varchar(150) not null,
	constraint pk_types primary key (type_cod)
);

alter table types owner to user_espe;

create table users(
	user_cod serial not null,
	user_names varchar(150) not null,
	user_last_names varchar(150) not null,
	constraint pk_users primary key (user_cod)
);

alter table users owner to user_espe;

alter table access add constraint fk_access_ref_users foreign key (user_cod) references users(user_cod) on delete restrict on update cascade;

alter table inputs add constraint fk_inputs_ref_access foreign key (user_cod) references access(user_cod) on delete restrict on update cascade;

alter table products add constraint fk_products_ref_types foreign key (type_cod) references types(type_cod) on delete restrict on update cascade;
