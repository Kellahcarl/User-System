create DATABASE usersystem;;

use usersystem

create schema normalUsers;

create table normalUsers.users(
    id int primary key,
    firstname VARCHAR(50) null,
    lastname VARCHAR(50) null,
    email varchar(100) unique not null,
    password varchar(250) NOT NULL,
    isdeleted bit null
)

insert into normalUsers.users(id,firstname,lastname,email,password,isdeleted)
    values('1','caleb','baraka','caleb.baraka@thejitu.com','12345678','0')

select * from normalUsers.users;