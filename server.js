const express = require('express');
const app = express();

// 1. Rota que inicia o fluxo e define para onde o usuário deve voltar depois
app.get('/login-mercado-livre', (req, res) => {
    const clientId = 'SEU_APP_ID';
    
    // A rota exata configurada no Dev Center do Mercado Livre
    const redirectUri = 'https://meusite.com'; 
    
    // Aqui você passa a URL dinâmica codificada dentro do parâmetro state
    const urlDinamicaDeRetorno = 'https://meusite.com';
    const state = encodeURIComponent(urlDinamicaDeRetorno);

    const authUrl = `https://mercadolivre.com.br{clientId}&response_type=code&redirect_uri=${redirectUri}&state=${state}`;
    
    res.redirect(authUrl);
});

// 2. A URI de Redirect ÚNICA cadastrada no painel do Mercado Livre
app.get('/callback', (req, res) => {
    const code = req.query.code;   // Código para trocar pelo Access Token
    const state = req.query.state; // A URL dinâmica que você enviou antes

    if (!code) {
        return res.status(400).send('Autorização negada ou falhou.');
    }

    // Decodifica o link de destino original
    const urlDestinoFinal = state ? decodeURIComponent(state) : '/dashboard-geral';

    // Opcional: Aqui você faz o POST interno para trocar o 'code' por 'access_token'
    // antes de mandar o usuário para a tela final.

    // Redireciona dinamicamente para a URL que estava escondida no asterisco (*)
    res.redirect(urlDestinoFinal);
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
Adicionando rotas do Mercado Livre
