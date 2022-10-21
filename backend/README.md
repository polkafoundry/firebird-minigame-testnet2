## I. Set up database  
### 1.1. Init database locally
Enter mysql monitor.
```bash
mysql -u root -p
```
```bash
create database epicwar;
create user 'USER'@'localhost' identified with mysql_native_password by 'PASSWORD';
grant all privileges on epicwar.* to 'USER'@'localhost';
flush privileges;
```

### 1.2. Run migrations
```bash
node ace migration:run
```


### Copy & change your own .env file
```
cp .env .env.example
```


## II. Run adonis5 server 


### Setup Queue

```bash
node ace invoke @rocketseat/adonis-bull

```

### 2.1. Run worker 
```bash
sudo nohup node ace bull:listen
```
### 2.2. Run server 
```bash
sudo node ace serve -w
```

