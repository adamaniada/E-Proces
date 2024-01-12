# kenx migration
- knex init
- knex migrate:make production
- knex migrate:latest --env production

# kenx seeds
- npx knex seed:make seed_name
- npx knex seed:run

# or create a new repository on the command line
- echo "# E-Proces" >> README.md
- git init
- git add .
- git commit -m "first commit"
- git branch -M main
- git remote add origin https://github.com/adamaniada/E-Proces.git
- git push -u origin main

# Update
- git add . && git commit -m "commit 1.0.0" && git branch -M main && git push -u origin main

# or push an existing repository from the command line
- git remote add origin https://github.com/adamaniada/E-Proces.git
- git branch -M main
- git push -u origin main
