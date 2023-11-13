const fs = require("fs")

module.exports = async () => {
    console.log("[BOT] Checking integrity...")

//#region CHECK FOR .env INTEGRITY
    if (fs.existsSync("./.env"))
        require('dotenv').config();
    else
        throw new Error("The .env file is missing")


    if (process.env.BOT_TOKEN == undefined)
        throw new Error("BOT_TOKEN is not defined in the .env file")

    if (process.env.MYSQL_HOST == undefined)
        throw new Error("MYSQL_HOST is not defined in the .env file")

    if (process.env.MYSQL_USER == undefined)
        throw new Error("MYSQL_USER is not defined in the .env file")

    if (process.env.MYSQL_PASSWORD == undefined)
        throw new Error("MYSQL_PASSWORD is not defined in the .env file")

    if (process.env.MYSQL_DATABASE == undefined)
        throw new Error("MYSQL_DATABASE is not defined in the .env file")

//#endregion


//#region CHECK FOR DATABASE INTEGRITY
    const mysql = require("./mysql.js")


    //Check for the tables
    let {results: q1, fields} = await mysql(`
        SHOW TABLES;
    `)

    //Map the tables
    let tables = q1.map(row => row.Tables_in_rolekeeper);

    //Check for the tables
    if (!tables.includes("guilds") && !tables.includes("roles") && !tables.includes("cache"))
    {//Add the structure if not exists
        console.log("[BOT] Creating database...")

        let querys = [

            `CREATE TABLE \`cache\` (
                \`user_id\` varchar(19) NOT NULL,
                \`role_id\` varchar(19) NOT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`,

            `CREATE TABLE \`roles\` (
                \`id\` varchar(19) NOT NULL,
                \`guild_id\` varchar(19) NOT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`,
            
            `CREATE TABLE \`guilds\` (
                \`id\` varchar(20) NOT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`,

            `ALTER TABLE \`cache\`
            ADD KEY \`user_id\` (\`user_id\`),
            ADD KEY \`cache_role_id\` (\`role_id\`)
            ADD UNIQUE(\`user_id\`, \`role_id\`);`,

            `ALTER TABLE \`guilds\`
            ADD PRIMARY KEY (\`id\`);`,

            `ALTER TABLE \`roles\`
            ADD PRIMARY KEY (\`id\`),
            ADD KEY \`guild_id\` (\`guild_id\`);`,


            `ALTER TABLE \`cache\`
            ADD CONSTRAINT \`cache_role_id\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE;`,
            
            `ALTER TABLE \`roles\`
            ADD CONSTRAINT \`roles_guild_id\` FOREIGN KEY (\`guild_id\`) REFERENCES \`guilds\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE;`
        ]

        for (const query of querys) {
            await mysql(query)
        }

    }

//#endregion

}