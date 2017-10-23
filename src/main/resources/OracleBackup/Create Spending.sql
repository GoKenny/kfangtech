--------------------------------------------------------
--  File created - Thursday-October-10-2013   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table SPENDING
--------------------------------------------------------

  CREATE TABLE "KENNY"."SPENDING" 
   (	"ID" NUMBER(*,0), 
	"YEAR" NUMBER(6,0), 
	"MONTH" NUMBER(4,0), 
	"DATENUMB" NUMBER(4,0), 
	"AMOUNT" NUMBER(8,2), 
	"COMMENTS" VARCHAR2(50 BYTE), 
	"TYPE" NUMBER(4,0) DEFAULT 1
   ) PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index SYS_C005905
--------------------------------------------------------

  CREATE UNIQUE INDEX "KENNY"."SYS_C005905" ON "KENNY"."SPENDING" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  Constraints for Table SPENDING
--------------------------------------------------------

  ALTER TABLE "KENNY"."SPENDING" ADD PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT)
  TABLESPACE "USERS"  ENABLE;
