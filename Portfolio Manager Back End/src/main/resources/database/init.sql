drop table if exists user;
drop table if exists user_detail;
drop table if exists room;
drop table if exists players;
drop table if exists game;

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
  score int not null DEFAULT 0 comment '游戏分',
  level varchar(10) not null DEFAULT '一阶小狼人' comment '等级',
  primary key(id),
  key idx_name(name)
)engine=InnoDB DEFAULT CHARSET=UTF8 COMMENT '用户信息表';

create table if not exists user_detail
(
  id int not null auto_increment comment '用户ID',
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
  wolf_winning int not null DEFAULT 0 comment '狼人胜场',
  wolf_losing int not null DEFAULT 0 comment '狼人败场',
  wolf_rate int not null DEFAULT 0 comment '狼人胜率',
  primary key(id)
)engine=InnoDB DEFAULT CHARSET=UTF8 COMMENT '用户胜负历史表';

create table if not exists room
(
  id int not null auto_increment comment '房间ID',
  img varchar(20) not null comment '房间头像',
  user varchar(20) not null comment '房主名',
  name varchar(20) not null comment '房间名',
  type varchar(20) not null comment '房间类型',
  password varchar(20) not null DEFAULT '' comment '房间密码',
  total int not null comment '房间总人数',
  speak_time int not null comment '游戏发言时间',
  villager int not null DEFAULT 0 comment '村民数量',
  prophet int not null DEFAULT 0 comment '预言家数量',
  witch int not null DEFAULT 0 comment '女巫数量',
  hunter int not null DEFAULT 0 comment '猎人数量',
  idiot int not null DEFAULT 0 comment '白痴数量',
  wolf int not null DEFAULT 0 comment '狼人数量',
  present int not null DEFAULT 0 comment '当前游戏人数',
  primary key(id),
  key idx_name(name)
)engine=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=UTF8 COMMENT '游戏房间信息表';

create table if not exists players
(
  id int not null auto_increment comment '游戏玩家列表ID',
  room_id int not null comment '游戏房间ID',
  user_id int not null comment '玩家ID',
  wolf_num int not null DEFAULT 4 comment '狼人总数',
  be_kill_num int not null DEFAULT 0 comment '被指刀数',
  be_vote_num int not null DEFAULT 0 comment '被投票数',
  locate int not null DEFAULT 0 comment '玩家座位号',
  role varchar(20) not null DEFAULT '待定' comment '玩家角色',
  status varchar(20) not null DEFAULT '待开始' comment '玩家游戏状态',
  is_police int not null DEFAULT 0 comment '该玩家是否上警',
  be_vote int not null DEFAULT 0 comment '被投票数',
  be_police_vote int not null DEFAULT 0 comment '被警上投票数',
  primary key(id)
)engine=InnoDB DEFAULT CHARSET=UTF8 COMMENT '游戏玩家列表信息表';

create table if not exists game
(
  id int not null auto_increment comment '游戏ID',
  room_id int not null comment '游戏房间ID',
  total int not null comment '房间总人数',
  ready int not null comment '准备人数',
  power int not null DEFAULT 3 comment '夜间能力玩家数',
  done int not null DEFAULT 0 comment '夜间执行能力玩家数',
  date varchar(20) not null DEFAULT '未' comment '游戏天数',
  day varchar(20) not null DEFAULT '开始' comment '玩游戏昼夜',
  police int not null DEFAULT 0 comment '警长',
  is_police int not null DEFAULT 1 comment '是否是上警阶段',
  say_direction int not null DEFAULT 1 comment '发言方向',
  primary key(id)
)engine=InnoDB DEFAULT CHARSET=UTF8 COMMENT '游戏信息表';

insert into user(portrait, name, username, password, gender) values("../img/curry.jpg", "Curry", "curry", "123", "M");
insert into user(portrait, name, username, password, gender) values("../img/Wind.jpg", "Wind", "wind", "123", "M");
insert into user(portrait, name, username, password, gender) values("../img/Alice.jpg", "Alice", "Alice", "123", "F");
insert into user(portrait, name, username, password, gender) values("../img/Koby.jpg", "Koby", "koby", "123", "M");
insert into user(portrait, name, username, password, gender) values("../img/Eva.jpg", "Eva", "eva", "123", "F");
insert into user(portrait, name, username, password, gender) values("../img/Kiki.jpg", "Kiki", "kiki", "123", "F");
insert into user(portrait, name, username, password, gender) values("../img/Tony.jpg", "Tony", "tony", "123", "M");

insert into user_detail(id) values(1);

insert into room(img, user, name, type, total, speak_time, villager, prophet, witch, hunter, idiot, wolf) values("../img/enter.jpg", "Curry", "娱乐局1", "娱乐房", 12, 60, 4, 1, 1, 1, 1, 4);
insert into room(img, user, name, type, total, speak_time, villager, prophet, witch, hunter, idiot, wolf) values("../img/enter.jpg", "Curry", "娱乐局2", "娱乐房", 12, 60, 4, 1, 1, 1, 1, 4);
insert into room(img, user, name, type, total, speak_time, villager, prophet, witch, hunter, idiot, wolf) values("../img/standard.png", "Curry", "标准局1", "标准房", 12, 60, 4, 1, 1, 1, 1, 4);
insert into room(img, user, name, type, total, speak_time, villager, prophet, witch, hunter, idiot, wolf) values("../img/standard.png", "Curry", "标准局2", "标准房", 12, 60, 4, 1, 1, 1, 1, 4);
insert into room(img, user, name, type, total, speak_time, villager, prophet, witch, hunter, idiot, wolf) values("../img/standard.png", "Curry", "标准局3", "标准房", 12, 60, 4, 1, 1, 1, 1, 4);
insert into room(img, user, name, type, total, speak_time, villager, prophet, witch, hunter, idiot, wolf) values("../img/enter.jpg", "Curry", "娱乐局3", "娱乐房", 12, 60, 4, 1, 1, 1, 1, 4);
insert into room(img, user, name, type, total, speak_time, villager, prophet, witch, hunter, idiot, wolf) values("../img/game.jpg", "Curry", "赛事局1", "赛事房", 12, 60, 4, 1, 1, 1, 1, 4);
insert into room(img, user, name, type, total, speak_time, villager, prophet, witch, hunter, idiot, wolf) values("../img/game.jpg", "Curry", "赛事局2", "赛事房", 12, 60, 4, 1, 1, 1, 1, 4);
insert into room(img, user, name, type, total, speak_time, villager, prophet, witch, hunter, idiot, wolf) values("../img/game.jpg", "Curry", "赛事局3", "赛事房", 12, 60, 4, 1, 1, 1, 1, 4);
insert into room(img, user, name, type, total, speak_time, villager, prophet, witch, hunter, idiot, wolf) values("../img/game.jpg", "Curry", "赛事局3", "赛事房", 12, 60, 4, 1, 1, 1, 1, 4);
insert into room(img, user, name, type, total, speak_time, villager, prophet, witch, hunter, idiot, wolf, present) values("../img/game.jpg", "Curry", "赛事局4", "赛事房", 6, 60, 1, 1, 1, 0, 1, 2, 0);

insert into game(room_id, total, ready) values(1010, 6, 0);
