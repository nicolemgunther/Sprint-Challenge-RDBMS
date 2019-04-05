1. Explain the difference between `RDBMS` and `SQL`.

RDBMS, or Relational DataBase Management Systems, is a collection of data that is organized for easy retrieval and manipulation. The data is stored in a format that is grouped into rows/columns. Each row represents a single record and is made up of 1+ columns. This specific kind of database is called relational in the sense that a relation is a mathematical idea that is equivalent to a table.

SQL, or Structured Query Language, is the standard language used to manage databases and the data within them. It is the way to interact with DataBase Management Systems, including RDBMS.

1. Why do tables need a `primary key`?

Tables need primary keys in order to uniquely identify each row of the RDBMS.

1. What is the name given to a table column that references the primary key on another table.

A foreign key references the primary key on another table.

1. What do we need in order to have a _many to many_ relationship between two tables.

To model a many-to-many relationship, we need to introduce a third table that holds foreign keys that reference the primary key on the related tables.