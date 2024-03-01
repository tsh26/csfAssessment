-- TODO Task 3
drop database if exists order;

create database order;

use order;

create table orders (
    
    name varchar(64) not null,
    address varchar(256) not null,
    priority boolean,
    comments varchar(256),
    cart

)
