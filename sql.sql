ALTER TABLE `gd_database`.`productos` 
DROP FOREIGN KEY `ID_TALLAS`;
ALTER TABLE `gd_database`.`productos` 
DROP INDEX `ID_TALLAS_idx` ;
;
ALTER TABLE `gd_database`.`tallas` 
CHANGE COLUMN `ID` `ID` INT(11) NOT NULL ;
---
CREATE TABLE `gd_database`.`tallas` (
  `ID` INT NOT NULL,
  `NOMBRE` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`"ID"`));
---
  ALTER TABLE `gd_database`.`productos` 
ADD INDEX `ID_TALLAS_idx` (`ID_TALLAS` ASC);
;
---
ALTER TABLE `gd_database`.`productos` 
ADD CONSTRAINT `ID_TALLAS`
  FOREIGN KEY (`ID_TALLAS`)
  REFERENCES `gd_database`.`tallas` (`ID`)
  ON DELETE NO ACTION
  ON UPDATE CASCADE;
---
ALTER TABLE `gd_database`.`cliente` 
DROP COLUMN `REFERENCIA_PEDIDO`;

---
ALTER TABLE `gd_database`.`pedido` 
ADD COLUMN `REFERENCIA_PEDIDO` VARCHAR(45) NULL AFTER `ID_CLIENTE`;
---
ALTER TABLE `gd_database`.`usuario` 
CHANGE COLUMN `NAME` `NAME` VARCHAR(45) NULL ;
ALTER TABLE `gd_database`.`usuario` 
CHANGE COLUMN `NAME` `NAMEU` VARCHAR(45) NULL DEFAULT NULL ;
    
--
CREATE TABLE `gd_database`.`usuario` (
  `ID` INT NOT NULL,
  `USERNAME` VARCHAR(45) NOT NULL,
  `NAME` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`));


---
CREATE TABLE `gd_database`.`user` (
  `id` VARCHAR(80) NOT NULL,
  `username` VARCHAR(70) NULL,
  `name` VARCHAR(80) NULL,
  PRIMARY KEY (`id`));


INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (16,	"00");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (15,	"9XL");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (14,	"8XL");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (13,	"7XL");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (12,	"6XL");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (11,	"5XL");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (10,	"4XL");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (9,	"3XL");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (8,	"2XL");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (7,	"XL");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (6,	"0L");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (5,	"0M");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (4,	"0S");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (3,	"XS");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (2,	"2XS");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (33,	"29");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (32,	"28");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (31,	"26");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (30,	"24");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (29,	"22");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (28,	"20");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (27,	"18");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (26,	"16");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (25,	"14");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (24,	"12");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (23,	"10");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (22,	"08");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (21,	"06");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (20,	"05");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (19,	"04");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (18,	"03");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (17,	"02");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (55,	"44");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (54,	"42");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (53,	"40");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (52,	"45");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (51,	"43");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (50,	"41");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (49,	"39");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (48,	"38");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (47,	"37");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (46,	"36");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (45,	"35");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (44,	"34");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (37,	"33");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (36,	"32");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (35,	"31");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (34,	"30");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (71,	"18 M");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (70,	"12 M");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (69,	"6 M");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (68,	"3 M");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (67,	"14/16");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (66,	"10/12");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (65,	"6/8");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (64,	"2/4");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (63,	"60");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (62,	"58");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (61,	"56");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (60,	"54");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (59,	"52");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (58,	"50");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (57,	"48");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (56,	"46");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (91,	"15 1/2");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (90,	"15");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (89,	"14 1/2");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (88,	"L/XL");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (87,	"S/M");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (86,	"0S-P");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (85,	"XS-P");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (84,	"U");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (83,	"52/6XL");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (82,	"50/5XL");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (81,	"48/4XL");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (80,	"46/3XL");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (79,	"44/2XL");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (78,	"42/XL");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (77,	"40/L");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (76,	"38/M");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (75,	"36/S");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (74,	"34/XS");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (73,	"32/2XS");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (72,	"24 M");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (104,	"13");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (103,	"11XL");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (102,	"1XL");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (101,	"21 1/2");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (100,	"21");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (99,	"22 1/2");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (98,	"20 1/2");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (97,	"19 1/2");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (96,	"19");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (95,	"18 1/2");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (94,	"17 1/2");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (93,	"17");
INSERT INTO `tallas` (`ID`,`NOMBRE`) VALUES (92,	"16 1/2");





