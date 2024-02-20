document.getElementById('formularioPesquisa').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o envio tradicional do formulário

    // Captura os dados do formulário
    var dadosDoFormulario = {
        regiao: document.getElementById('regiao').value,
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value,
        sexo: document.getElementById('sexo').value,
        idade: document.getElementById('idade').value,
        votoEspontaneo: document.getElementById('votoEspontaneo').value,
        votoCandidatos: document.getElementById('votoCandidatos').value,
        segundaOpcaoVoto: document.getElementById('segundaOpcaoVoto').value,
        votoVereador: document.getElementById('votoVereador').value,
        problemaBairro: document.getElementById('problemaBairro').value,
        problemaCidade: document.getElementById('problemaCidade').value,
        avaliacaoGoverno: document.getElementById('avaliacaoGoverno').value,
        notaGoverno: document.getElementById('notaGoverno').value
    };

    // Gera uma chave única para cada entrada
    var chave = 'DadosFormulario_' + Date.now();
    // Armazena os dados no localStorage em formato de string JSON
    localStorage.setItem(chave, JSON.stringify(dadosDoFormulario));

    alert('Dados salvos com sucesso!');
});

function verificarSenha() {
    var senha = prompt("Digite a senha para exportar:");
    if (senha == "senhaSecreta") { // Substitua 'senhaSecreta'
        exportarDadosParaCSV();
    } else {
        alert("Senha incorreta!");
    }
}

// Exportar Dados 

function exportarDadosParaCSV() {
    var dadosRecuperados = [];
    for (var i = 0; i < localStorage.length; i++) {
        var chave = localStorage.key(i);
        if (chave.startsWith('DadosFormulario_')) {
            var valor = localStorage.getItem(chave);
            dadosRecuperados.push(JSON.parse(valor));
        }
    }

    var csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    var cabeçalhos = Object.keys(dadosRecuperados[0]).join(",") + "\r\n";
    csvContent += cabeçalhos;

    dadosRecuperados.forEach(function(obj) {
        var row = Object.values(obj).map(function(val){
            // Assegura que strings com vírgulas sejam envoltas em aspas
            return typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val;
        }).join(",");
        csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dados_pesquisa.csv");
    document.body.appendChild(link); // Necessário para o Firefox

    link.click(); // Inicia o download
}