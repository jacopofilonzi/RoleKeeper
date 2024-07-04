# WARNING
This bot is fine but we are currently in redevelopment to adapt it with a sqlite database.

Monitor the repo for further updates.

# RoleKeeper
A simple bot that requires a database and keep the roles to user that leaves from your server 

## Setup

create a .env file with the following informations:

    BOT_TOKEN=<your discord api token> #from your bot dashboard: https://discord.com/developers

    MYSQL_HOST=127.0.0.1         #database address
    MYSQL_USER=root              #credential user
    MYSQL_PASSWORD=root          #credential password
    MYSQL_DATABASE=rolekeeper    #database name you want to user

    DELETEONLEAVE=false          #optional (check features)


## Avaiable commands

>you have to tag the bot in each command: `@bot <command>`


| USAGE         | DESCRIPTION                         |
|---------------|-------------------------------------|
| addRole @role | add a new role to the monitor       |
| delRole @role | remove a role from the monitor      |
| watch         | list all the monitored roles        |
| watch @role   | list all the user that has the role |
| refresh       | useful in case of bot discontinuity for refreshing the cache of the server


## Features

 - when the role get deleted the bot will automatically delete it from the database
 - when the bot go out of the guild it will automatically delete the data from the database (for activating this you have to add `DELETEONLEAVE=true` to the **.env** file)
 - automatic setup of the database, just create the database and it will automatically create the structure
