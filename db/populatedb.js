#! /usr/bin/env node

const { Client } = require("pg");

/* --- */
const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  message VARCHAR ( 500 ),
  added TIMESTAMP DEFAULT now()
);

INSERT INTO messages (username, message) 
VALUES
  ('Bryan', 'Soy re wachin'),
  ('Santi', 'Soy re pro'),
  ('Sofi', 'Soy una capa');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://santi:aliceinchains2@localhost:5432/message_board",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
