# Passos para a criação de uma aplicação usando o Sequelize

1. Iniciar a aplicação

~~~bash
npm init -y
~~~

2. Instalar o sequelize

~~~bash
npm install sequelize
~~~

3. Instalar a CLI

~~~bash
npm install sequelize-cli
~~~

4. Instalar o mysql2

~~~bash
npm install mysql2
~~~

- Atalho

~~~bash
npm install sequelize sequelize-cli mysql2 
~~~

5. Inicializar o Sequelize

~~~bash
npx sequelize-cli init
~~~

6. Configurar o arquivo config.json gerado pelo init do CLI

~~~JSON
{
  "development": {
    "username": "root",
    "password": "",
    "database": "revisao_bloco_24",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }

  // No resto do arquivo você vai encontrar as convenções para conectar o Sequelize em outros ambientes
}
~~~

7. Criar o banco usando o CLI do Sequelize

~~~bash
npx sequelize db:create
~~~

8. Criar um model

~~~bash
npx sequelize model:generate --name User --attributes fullName:string
~~~

9. Alterar o model do formato de classe:

~~~JavaScript
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    fullName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
~~~

- Para função:

~~~JavaScript
const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    fullName: DataTypes.STRING,
  }, {
    underscored: true
  });

  return User;
};

module.exports = User;
~~~

10. Alterar as migrations, caso seja necessário

~~~JavaScript
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
~~~

11. Executar a migration

~~~bash
npx sequelize db:migrate
~~~

- Caso queira reverter:

~~~bash
npx sequelize db:migrate:undo
~~~

- Caso seja necessária a modificação de alguma tabela, você pode rodar um comando para gerar uma nova migration e então fazer as alterações que você precisar:

~~~bash
npx sequelize migration:generate --name add-column-phone-table-users
~~~

~~~JavaScript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.addColumn('Users', 'phone_num', {
     type: Sequelize.STRING,
   });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'phone_num');
  }
};
~~~

- Em seguida rodar o comando para executar a nova migration:

~~~bash
npx sequelize db:migrate
~~~

- E alterar o model para incluit a nova coluna:

~~~JavaScript
const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    fullName: DataTypes.STRING,
    phone_num: DataTypes.STRING,
  });

  return User;
};

module.exports = User;
~~~

12. Criar um novo seed

~~~bash
npx sequelize seed:generate --name users
~~~

13. Adicionar as informações que serão colocadas no banco

~~~JavaScript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Users',
    [
      {
        fullName: 'Leonardo',
        phone_num: '999999999',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        fullName: 'Eduardo',
        phone_num: '999999998',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
~~~

14. Executar o seed

~~~bash
npx sequelize db:seed:all
~~~

- E para reverter:

~~~bash
npx sequelize db:seed:undo:all
~~~

<!-- 1. 

~~~bash

~~~

1. 

~~~bash

~~~

1. 

~~~bash

~~~ -->