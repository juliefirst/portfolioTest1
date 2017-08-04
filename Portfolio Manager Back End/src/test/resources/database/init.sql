drop table if exists user;
drop table if exists room;

create table if not exists user
(
  id int not null auto_increment comment '用户ID',
  name varchar(10) not null comment '用户游戏名',
  username varchar(20) not null comment '用户登录账号',
  password varchar(20) not null comment '用户登录密码',
  gender char(1) not null comment '用户性别',
  portrait varchar(300) not null DEFAULT '' comment '用户头像',
  introduction varchar(500) not null DEFAULT '' comment '用户自我介绍',
  phone varchar(15) not null DEFAULT '' comment '用户手机',
  email varchar(300) not null DEFAULT '' comment '用户电子邮件',
  city varchar(300) not null DEFAULT '' comment '用户城市',
  winning int not null DEFAULT 0 comment '总胜场',
  losing int not null DEFAULT 0 comment '总败场',
  rate int not null DEFAULT 0 comment '总胜率',
  villager_winning int not null DEFAULT 0 comment '村民胜场',
  villager_losing int not null DEFAULT 0 comment '村民败场',
  villager_rate int not null DEFAULT 0 comment '村民胜率',
  prophet_winning int not null DEFAULT 0 comment '预言家胜场',
  prophet_losing int not null DEFAULT 0 comment '预言家败场',
  prophet_rate int not null DEFAULT 0 comment '预言家胜率',
  witch_winning int not null DEFAULT 0 comment '女巫胜场',
  witch_losing int not null DEFAULT 0 comment '女巫败场',
  witch_rate int not null DEFAULT 0 comment '女巫胜率',
  hunter_winning int not null DEFAULT 0 comment '猎人胜场',
  hunter_losing int not null DEFAULT 0 comment '猎人败场',
  hunter_rate int not null DEFAULT 0 comment '猎人胜率',
  idiot_winning int not null DEFAULT 0 comment '白痴胜场',
  idiot_losing int not null DEFAULT 0 comment '白痴败场',
  idiot_rate int not null DEFAULT 0 comment '白痴胜率',
  guard_winning int not null DEFAULT 0 comment '守卫胜场',
  guard_losing int not null DEFAULT 0 comment '守卫败场',
  guard_rate int not null DEFAULT 0 comment '守卫胜率',
  wolf_winning int not null DEFAULT 0 comment '狼人胜场',
  wolf_losing int not null DEFAULT 0 comment '狼人败场',
  wolf_rate int not null DEFAULT 0 comment '狼人胜率',
  wolf_king_winning int not null DEFAULT 0 comment '白狼王胜场',
  wolf_king_losing int not null DEFAULT 0 comment '白狼王败场',
  wolf_king_rate int not null DEFAULT 0 comment '白狼王胜率',
  score int not null DEFAULT 0 comment '游戏分',
  level varchar(10) not null DEFAULT '一阶小狼人' comment '等级',
  primary key(id),
  key idx_name(name)
)engine=InnoDB DEFAULT CHARSET=UTF8 COMMENT '用户信息表';

create table if not exists room
(
  id int not null auto_increment comment '房间ID',
  img varchar(10) not null comment '房间头像',
  name varchar(20) not null comment '房间名',
  password varchar(20) not null DEFAULT '' comment '房间密码',
  total int not null comment '房间总人数',
  villager int not null DEFAULT 0 comment '村民数量',
  prophet int not null DEFAULT 0comment '预言家数量',
  witch int not null DEFAULT 0 comment '女巫数量',
  hunter int not null DEFAULT 0 comment '猎人数量',
  idiot int not null DEFAULT 0 comment '白痴数量',
  guard int not null DEFAULT 0 comment '守卫数量',
  wolf int not null DEFAULT 0 comment '狼人数量',
  wolf_king int not null DEFAULT 0 comment '白狼王数量',
  present int not null DEFAULT 0 comment '当前游戏人数',
  players varchar(200) not null DEFAULT '' comment '当前游戏玩家',
  audiences varchar(200) not null DEFAULT '' comment '当前观众玩家',
  primary key(id),
  key idx_name(name)
)engine=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=UTF8 COMMENT '游戏房间信息表';

insert into user(name, username, password, gender) values("Curry", "curry", "123456", "M");
insert into user(name, username, password, gender) values("Wind", "wind", "123456", "M");
insert into user(name, username, password, gender) values("Alice", "Alice", "123456", "F");
insert into user(name, username, password, gender) values("Koby", "koby", "123456", "M");
insert into user(name, username, password, gender) values("Eva", "eva", "123456", "F");
insert into user(name, username, password, gender) values("Kiki", "kiki", "123456", "F");
insert into user(name, username, password, gender) values("Tony", "tony", "123456", "M");

insert into room(img, name, total, villager, prophet, witch, hunter, idiot, wolf) values("新人房", "标准局1", 12, 4, 1, 1, 1, 1, 4);
insert into room(img, name, total, villager, prophet, witch, hunter, idiot, wolf) values("新人房", "标准局2", 12, 4, 1, 1, 1, 1, 4);
insert into room(img, name, total, villager, prophet, witch, hunter, idiot, wolf) values("新人房", "标准局3", 12, 4, 1, 1, 1, 1, 4);
insert into room(img, name, total, villager, prophet, witch, hunter, idiot, wolf) values("新人房", "标准局4", 12, 4, 1, 1, 1, 1, 4);
insert into room(img, name, total, villager, prophet, witch, hunter, idiot, wolf) values("新人房", "标准局5", 12, 4, 1, 1, 1, 1, 4);
insert into room(img, name, total, villager, prophet, witch, hunter, idiot, wolf) values("新人房", "标准局6", 12, 4, 1, 1, 1, 1, 4);
insert into room(img, name, total, villager, prophet, witch, hunter, idiot, wolf) values("新人房", "标准局7", 12, 4, 1, 1, 1, 1, 4);
insert into room(img, name, total, villager, prophet, witch, hunter, idiot, wolf) values("新人房", "标准局8", 12, 4, 1, 1, 1, 1, 4);
insert into room(img, name, total, villager, prophet, witch, hunter, idiot, wolf) values("新人房", "标准局9", 12, 4, 1, 1, 1, 1, 4);