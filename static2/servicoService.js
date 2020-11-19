//--------------- SCRIPT RELACIONADOS À CLIENTES


// Função para buscar clientes
function findServices() {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "http://localhost:8080/service/get",
        data: "",
        success: function (result) {
            var services = result;
            var listaServices = document.getElementById('listaServices');
            listaServices = "";

            for (var aux = 0; aux < services.length; aux++) {
                listaServices = listaServices + '<li class="row justif-content-around list-group-item" id="service" >';
                listaServices += '<form class="form-inline">';
                listaServices += '<input type="checkbox" value="' + (services[aux].name) + '" name="exclude_service" style="display:block;"/>';
                listaServices += '<div class="form-group col-4 form_organizacao">';
                listaServices += '<dt>Nome: </dt>';
                listaServices += '<dd id="Name_' + services[aux].name + '" name="' + (services[aux].name) + '" value="' + (services[aux].name) + '" contenteditable="false" >' + (services[aux].name) + '</dd>';
                listaServices += '</div>';
                listaServices += '<div class="form-group col-4 form_organizacao">';
                listaServices += '<dt>Preço Mínimo: </dt>';
                listaServices += '<dd id="precoMin_' + services[aux].name + '" name="' + (services[aux].name) + '" value="' + (services[aux].precoMin) + '" contenteditable="false" >' + (services[aux].precoMin) + '</dd>';
                listaServices += '</div>';
                listaServices += '<div class="form-group col-4 form_organizacao">';
                listaServices += '<dt>Observação: </dt>';
                listaServices += '<dd id="obs_' + services[aux].name + '" name="' + (services[aux].name) + '" value="' + (services[aux].obs) + '" contenteditable="false" >' + (services[aux].obs) + '</dd>';
                listaServices += '</div>';
                listaServices += '<button id="editService_' + services[aux].name + '" type="button" value="' + (services[aux].name) + '" style="display:block; color:white; margin-top: 15px" class="btn btn-outline-info col-auto" onclick="editService(this.value);">Editar</button>';
                listaServices += '<button id="saveEditService_' + services[aux].name + '" type="button" value="' + (services[aux].name) + '" style="display:none;" class="btn btn-block btn-primary" onclick="saveEditService(this.value);">Salvar</button>';
                listaServices += '<button id="cancelEditService_' + services[aux].name + '" type="button" value="' + (services[aux].name) + '" style="display:none;" class="btn btn-block btn-primary" onclick="cancelEditService(this.value);">Cancelar</button>';
                listaServices += '</form>';
                listaServices += '</li>';
            }
            document.getElementById('listaServices').innerHTML = listaServices;
            if(listaServices)document.getElementById('removerItensChecados').innerHTML = 
                '<button id="remove" type="button" class="btn btn-block btn-primary" style="margin:auto; width:40%; margin-bottom:25px;" onclick="removeServices();">Remover serviços selecionados</button>';
        }
    });
}

//Função para remover clientes selecioados pelo checkbox
function removeServices() {
    var removidoSucesso = false;
    var services = document.getElementsByName('exclude_service');
    for (var aux = 0; aux < services.length; aux++) {
        if (services[aux].checked) {
            var service = {
                'name': services[aux].defaultValue,
            };
            $.ajax({
                type: "GET",
                contentType: "application/String; charset=utf-8",
                dataType: "String",
                url: "http://localhost:8080/service/delete?name=" + service.name,
                data: service.name,
                success: function (result) {
                    removidoSucesso = true;
                },
                error: function (data, status, er) {
                    removidoSucesso = false;
                }

            });
        }

    }
    window.location = 'servicos.html';

}

//Função para editar cliente
function editService(name) {
    var serviceButtonSaveEdit = document.getElementById('saveEditService_' + name);
    var serviceButtonCancelEdit = document.getElementById('cancelEditService_' + name);
    var serviceButtonEdit = document.getElementById('editService_' + name);

    serviceButtonEdit.style.display = "none";
    serviceButtonSaveEdit.style.display = "block";
    serviceButtonCancelEdit.style.display = "block";

    var precoMin = document.getElementById('precoMin_' + name);
    var obs = document.getElementById('obs_' + name);

    precoMin.contentEditable = "true";
    obs.contentEditable = "true";
}

function cancelEditService(valueName) {
    /*    var serviceButtonSaveEdit = document.getElementById('saveEdit'+(valueName));
        var serviceButtonCancelEdit = document.getElementById('cancelEdit'+(valueName));
        var serviceButtonEdit = document.getElementById('edit'+(valueName));
        serviceButtonEdit.style.display= "block";
        serviceButtonSaveEdit.style.display = "none";
        serviceButtonCancelEdit.style.display = "none";
        var fieldName = document.getElementById('nameName'+(valueName));
        var fieldPrice = document.getElementById('namePrice'+(valueName));
        var fieldDesc = document.getElementById('nameDesc'+(valueName));

        fieldName.contentEditable ="false";
        fieldDesc.contentEditable="false";
        fieldPrice.contentEditable="false";    */
    window.location = 'servicos.html';

}

function saveEditService(name) {
    /* var serviceButtonSaveEdit = document.getElementById('saveEdit'+(name));
    var serviceButtonCancelEdit = document.getElementById('cancelEdit'+(name));
    var serviceButtonEdit = document.getElementById('edit'+(name));
    serviceButtonEdit.style.display= "block";
    serviceButtonSaveEdit.style.display = "none";
    serviceButtonCancelEdit.style.display = "none"; */
    name = name;

    var precoMin = document.getElementById('precoMin_' + name).innerHTML;
    var obs = document.getElementById('obs_' + name).innerHTML;

    

    if (name && precoMin) {
        var service = {
            'name': name,
            'precoMin': precoMin,
            'obs': obs
        };
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "http://localhost:8080/service/update",
            data: JSON.stringify(service),
            success: function (result) {
                window.location = 'servicos.html';

            },
            error: function (data, status, er) {
                alert("Não foi possivel conectar ao servidor.");
            }
        });

    } else {
        alert("Nome e Preço Mínimo devem ser informados.");
        return;
    }
}




//Função para adicionar novo cliente
function addService() {
    var name = document.getElementById("inputNomeServico").value;
    var precoMin = document.getElementById("inputPrecoMinServico").value;
    var obs = document.getElementById("inputObsServico").value;
    

    if (name && precoMin) {
        if (obs.length > 100){
            alert("A observação deve conter no máximo 100 caracteres!");
            return;
        } if (name.length > 25){
            alert("O nome deve conter no máximo 25 caracteres!");
            return;
        }
        var service = {
            'name': name,
            'precoMin': precoMin,
            'obs': obs
        };

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "http://localhost:8080/service/save",
            data: JSON.stringify(service),
            success: function (result) {
             /*   for(var aux=0;aux<imagensArray.length;aux++){
                    if(imagensArray[aux]){
                        var image = imagensArray[aux];
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            url: "http://localhost:8080/service/image",
                            data: image,
                            success: function (result) {
                            },
                            error: function (data, status, er) {
                                alert("Não foi possivel conectar ao servidor.");
                            }
                        });
                    }
                } */
                window.location = 'servicos.html';
            },
            error: function (data, status, er) {
                alert("Não foi possivel conectar ao servidor.");
            }
        });  


    } else {
        alert("Nome e Preço Mínimo devem ser preenchidos.");
        return;
    }

}
