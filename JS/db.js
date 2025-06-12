const { Client } = require('pg');

function getClient() {
    return new Client({
        user: 'postgres',
        host: '192.168.1.145',
        database: 'webscraper',
        password: 'c52l3gh1',
        port: 5432,
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
    try {
        await client.connect();

        await client.query('BEGIN');
        for (const p of produtos) {
            await client.query(
                `INSERT INTO teste_produtos (produto, preco, condicao, criado_dia, criado_hora, site)
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [p.nome, formatPreco(p.preco), p.condicao, p.criado_dia, p.criado_hora, p.site]
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