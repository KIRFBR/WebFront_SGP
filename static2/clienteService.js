//--------------- SCRIPT RELACIONADOS À CLIENTES


// Função para buscar clientes
function findClients() {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "http://localhost:8080/client/get",
        data: "",
        success: function (result) {
            var clients = result;
            var listaClients = document.getElementById('listaClients');
            listaClients = "";

            for (var aux = 0; aux < clients.length; aux++) {
                listaClients = listaClients + '<li class="row justif-content-around list-group-item" id="client" >';
                listaClients += '<form class="form-inline">';
                listaClients += '<input type="checkbox" value="' + (clients[aux].cpf) + '" name="exclude_client" style="display:block;"/>';
                listaClients += '<div class="form-group col-4 form_organizacao">';
                listaClients += '<dt>Nome: </dt>';
                listaClients += '<dd id="Name_' + clients[aux].cpf + '" name="' + (clients[aux].name) + '" value="' + (clients[aux].name) + '" contenteditable="false" >' + (clients[aux].name) + '</dd>';
                listaClients += '</div>';
                listaClients += '<div class="form-group col-4 form_organizacao">';
                listaClients += '<dt>CPF: </dt>';
                listaClients += '<dd id="CPF_' + clients[aux].cpf + '" name="' + (clients[aux].name) + '" contenteditable="false" >' + (clients[aux].cpf) + '</dd>';
                listaClients += '</div>';
                listaClients += '<div class="form-group col-4 form_organizacao">';
                listaClients += '<dt>Endereco: </dt>';
                listaClients += '<dd id="endereco_' + clients[aux].cpf + '" name="' + (clients[aux].name) + '" value="' + (clients[aux].endereco) + '" contenteditable="false" >' + (clients[aux].endereco) + '</dd>';
                listaClients += '</div>';
                listaClients += '<div class="form-group col-4 form_organizacao">';
                listaClients += '<dt>Telefone: </dt>';
                listaClients += '<dd id="fone_' + clients[aux].cpf + '" name="' + (clients[aux].name) + '" value="' + (clients[aux].fone) + '" contenteditable="false" >' + (clients[aux].fone) + '</dd>';
                listaClients += '</div>';
                listaClients += '<div class="form-group col-4 form_organizacao">';
                listaClients += '<dt>E-mail: </dt>';
                listaClients += '<dd id="email_' + clients[aux].cpf + '" name="' + (clients[aux].name) + '" value="' + (clients[aux].email) + '" contenteditable="false" >' + (clients[aux].email) + '</dd>';
                listaClients += '</div>';
                listaClients += '<div class="form-group col-4 form_organizacao">';
                listaClients += '<dt>PIS: </dt>';
                listaClients += '<dd id="pis_' + clients[aux].cpf + '" name="' + (clients[aux].name) + '" value="' + (clients[aux].pis) + '" contenteditable="false" >' + (clients[aux].pis) + '</dd>';
                listaClients += '</div>';
                listaClients += '<div class="form-group col-4 form_organizacao">';
                listaClients += '<dt>Observação: </dt>';
                listaClients += '<dd id="obs_' + clients[aux].cpf + '" name="' + (clients[aux].name) + '" value="' + (clients[aux].obs) + '" contenteditable="false" >' + (clients[aux].obs) + '</dd>';
                listaClients += '</div>';
                listaClients += '<button id="editClient_' + clients[aux].cpf + '" type="button" value="' + (clients[aux].cpf) + '" style="display:block; color:white; margin-top: 15px" class="btn btn-outline-info col-auto" onclick="editClient(this.value);">Editar</button>';
                listaClients += '<button id="saveEditClient_' + clients[aux].cpf + '" type="button" value="' + (clients[aux].cpf) + '" style="display:none;" class="btn btn-block btn-primary" onclick="saveEditClient(this.value);">Salvar</button>';
                listaClients += '<button id="cancelEditClient_' + clients[aux].cpf + '" type="button" value="' + (clients[aux].cpf) + '" style="display:none;" class="btn btn-block btn-primary" onclick="cancelEditClient(this.value);">Cancelar</button>';
                listaClients += '</form>';
                listaClients += '</li>';
            }
            document.getElementById('listaClients').innerHTML = listaClients;
            if(listaClients)document.getElementById('removerItensChecados').innerHTML = 
                '<button id="remove" type="button" class="btn btn-block btn-primary" style="margin:auto; width:40%; margin-bottom:25px;" onclick="removeClients();">Remover clientes selecionados</button>';
        }
    });
}

//Função para remover clientes selecioados pelo checkbox
function removeClients() {
    var removidoSucesso = false;
    var clients = document.getElementsByName('exclude_client');
    for (var aux = 0; aux < clients.length; aux++) {
        if (clients[aux].checked) {
            var client = {
                'cpf': clients[aux].defaultValue,
            };
            $.ajax({
                type: "GET",
                contentType: "application/String; charset=utf-8",
                dataType: "String",
                url: "http://localhost:8080/client/delete?cpf=" + client.cpf,
                data: client.cpf,
                success: function (result) {
                    removidoSucesso = true;
                },
                error: function (data, status, er) {
                    removidoSucesso = false;
                }

            });
        }

    }
    window.location = 'index.html';

}

//Função para editar cliente
function editClient(cpf) {
    var clientButtonSaveEdit = document.getElementById('saveEditClient_' + cpf);
    var clientButtonCancelEdit = document.getElementById('cancelEditClient_' + cpf);
    var clientButtonEdit = document.getElementById('editClient_' + cpf);

    clientButtonEdit.style.display = "none";
    clientButtonSaveEdit.style.display = "block";
    clientButtonCancelEdit.style.display = "block";

    var endereco = document.getElementById('endereco_' + cpf);
    var fone = document.getElementById('fone_' + cpf);
    var email = document.getElementById('email_' + cpf);
    var pis = document.getElementById('pis_' + cpf);
    var obs = document.getElementById('obs_' + cpf);

    endereco.contentEditable = "true";
    fone.contentEditable = "true";
    email.contentEditable = "true";
    pis.contentEditable = "true";
    obs.contentEditable = "true";
}

function cancelEditClient(valueName) {
    /*    var clientButtonSaveEdit = document.getElementById('saveEdit'+(valueName));
        var clientButtonCancelEdit = document.getElementById('cancelEdit'+(valueName));
        var clientButtonEdit = document.getElementById('edit'+(valueName));
        clientButtonEdit.style.display= "block";
        clientButtonSaveEdit.style.display = "none";
        clientButtonCancelEdit.style.display = "none";
        var fieldName = document.getElementById('nameName'+(valueName));
        var fieldPrice = document.getElementById('namePrice'+(valueName));
        var fieldDesc = document.getElementById('nameDesc'+(valueName));

        fieldName.contentEditable ="false";
        fieldDesc.contentEditable="false";
        fieldPrice.contentEditable="false";    */
    window.location = 'index.html';

}

function saveEditClient(cpf) {
    /* var clientButtonSaveEdit = document.getElementById('saveEdit'+(cpf));
    var clientButtonCancelEdit = document.getElementById('cancelEdit'+(cpf));
    var clientButtonEdit = document.getElementById('edit'+(cpf));
    clientButtonEdit.style.display= "block";
    clientButtonSaveEdit.style.display = "none";
    clientButtonCancelEdit.style.display = "none"; */
    cpf = cpf;

    var endereco = document.getElementById('endereco_' + cpf).innerHTML;
    var fone = document.getElementById('fone_' + cpf).innerHTML;
    var email = document.getElementById('email_' + cpf).innerHTML;
    var pis = document.getElementById('pis_' + cpf).innerHTML;
    var obs = document.getElementById('obs_' + cpf).innerHTML;

    

    if (cpf) {
        var client = {
            'cpf': cpf,
            'endereco': endereco,
            'fone': fone,
            'email': email,
            'pis': pis,
            'obs': obs
        };
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "http://localhost:8080/client/update",
            data: JSON.stringify(client),
            success: function (result) {
                window.location = 'index.html';

            },
            error: function (data, status, er) {
                alert("Não foi possivel conectar ao servidor.");
            }
        });

    } else {
        alert("Não foi possível completar a operação. Contacte o administrador e relate o ocorrido.");
        return;
    }
}




//Função para adicionar novo cliente
function addCliente() {
    var name = document.getElementById("inputNomeCliente").value;
    var cpf = document.getElementById("inputCPFCliente").value;
    var endereco = document.getElementById("inputEnderecoCliente").value;
    var tel = document.getElementById("inputTelefoneCliente").value;
    var email = document.getElementById("inputEmailCliente").value;
    var pis = document.getElementById("inputPISCliente").value;
    var obs = document.getElementById("inputObsCliente").value;
    

    if (name && cpf) {
        if (obs.length > 100){
            alert("A observação deve conter no máximo 100 caracteres!");
            return;
        } if (name.length > 25){
            alert("O nome deve conter no máximo 25 caracteres!");
            return;
        }
        var client = {
            'name': name,
            'cpf': cpf,
            'endereco': endereco,
            'fone': tel,
            'email': email,
            'pis': pis,
            'obs': obs
        };

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "http://localhost:8080/client/save",
            data: JSON.stringify(client),
            success: function (result) {
             /*   for(var aux=0;aux<imagensArray.length;aux++){
                    if(imagensArray[aux]){
                        var image = imagensArray[aux];
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            url: "http://localhost:8080/client/image",
                            data: image,
                            success: function (result) {
                            },
                            error: function (data, status, er) {
                                alert("Não foi possivel conectar ao servidor.");
                            }
                        });
                    }
                } */
                window.location = 'index.html';
            },
            error: function (data, status, er) {
                alert("Não foi possivel conectar ao servidor.");
            }
        });  


    } else {
        alert("Nome e CPF devem ser preenchidos.");
        return;
    }

}
