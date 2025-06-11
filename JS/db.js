const { Client } = require('pg');

function getClient() {
    return new Client({
        user: 'USERNAME_DO_BANCO',
        host: 'IP_DO_SERVIDOR',
        database: 'database_name',
        password: 'PASSWORD_DO_BANCO',
        port: 5432, // Porta padrão do PostgreSQL
    });
}

function formatPreco(precoStr) {
    // Remove caracteres não numéricos (ex: R$ 3.999,99 → 3999.99)
    return parseFloat(
        precoStr.replace(/[^\d,]/g, '').replace(',', '.')
    );
}

async function inserirProdutos(produtos) {
    const client = getClient();
    await client.connect();
    try {
        await client.query('BEGIN');
        for (const p of produtos) {
            await client.query(
                `INSERT INTO table_name (produto, preco, condicao)
                 VALUES ($1, $2, $3)`,
                [
                    p.nome,
                    formatPreco(p.preco), // Garantindo formato numérico
                    p.condicao
                ]
            );
        }
        await client.query('COMMIT');
        console.log('Produtos inseridos!');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Erro ao inserir produtos:', err);
    } finally {
        await client.end();
    }
}

module.exports = { inserirProdutos };