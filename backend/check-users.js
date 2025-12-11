require('dotenv').config();
const dynamodb = require('./config/dynamodb');

const TABLE_NAME = process.env.DYNAMODB_TABLE_USERS || 'gerenciador-users';

async function checkUsers() {
  try {
    console.log('🔍 Verificando usuários na tabela:', TABLE_NAME);
    
    const params = {
      TableName: TABLE_NAME
    };

    const result = await dynamodb.scan(params).promise();
    
    console.log(`\n📊 Total de usuários: ${result.Count}`);
    
    if (result.Count > 0) {
      console.log('\n👥 Usuários cadastrados:');
      result.Items.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name} (${user.email}) - Criado em: ${user.createdAt}`);
      });
    } else {
      console.log('\n❌ Nenhum usuário cadastrado ainda.');
      console.log('\n💡 Para testar, você pode:');
      console.log('1. Acessar http://localhost:3000');
      console.log('2. Clicar em "Criar conta"');
      console.log('3. Preencher os dados e registrar');
    }
    
  } catch (error) {
    console.error('❌ Erro ao verificar usuários:', error.message);
  }
}

checkUsers();