create database if not exists diary_database;
use diary_database;

create table if not exists diaries
(
  `id` int(11) not null auto_increment,
  `date` datetime,
  `content` text,
  primary key (`id`)
);

insert into diaries (content) VALUES ("diary_head");
