//--------------- SCRIPT RELACIONADOS À MEUS SERVIÇOS


// Função ativada quando link de adicionar Meus serviços é clicado
$(document).ready(function(){
    $('#link_NewMyServices').click(function(){
       
        // ----- Popular o campo Cliente com dados dos clientes já cadastrados.
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "http://localhost:8080/client/get",
            data: "",
            success: function (result) {
                var clients = result;
                var listaClient = $('#inputGroupSelectClient').html();
                listaClient = '<option id="c_vazio" selected="">Vazio</option>';
    
                
                for (var aux = 0; aux < clients.length; aux++) 
                    listaClient += '<option id="c_name_' + clients[aux].name + '" value="'+(clients[aux].cpf)+'"> CPF: '+clients[aux].cpf+' -- Nome: '+clients[aux].name+'</option>';

                $('#inputGroupSelectClient').html(listaClient);
            }
        });

        // ----- Popular o campo Serviço com dados dos serviços já cadastrados.
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "http://localhost:8080/service/get",
            data: "",
            success: function (result) {
                var services = result;
                var listaService = $('#inputGroupSelectService').html();
                listaService = '<option id="s_vazio" selected="">Vazio</option>';
    
                
                for (var aux = 0; aux < services.length; aux++) 
                    listaService += '<option id="s_name_' + services[aux].name + '" value="'+(services[aux].name)+'"> Nome: '+services[aux].name+' -- P_Min.: '+services[aux].precoMin+'</option>';

                $('#inputGroupSelectService').html(listaService);
            }
        });


        
    });
});


// Função ativada quando botão 'Todos' é clicado
function mostrarTodos(){
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "http://localhost:8080/myService/get",
        data: "",
        success: function (result) {
            var myServices = result;
            popularHtml(myServices);
        }    
    });            
};      

// Função ativada quando botão 'Em atraso' é clicado
function mostrarEmAtraso(){
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "http://localhost:8080/myService/vencidos",
        data: "",
        success: function (result) {
            var myServices = result;
            popularHtml(myServices);
        }    
    });            
}

// Função para buscar clientes ao abrir a página Meus Serviços
function findMyServices() {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "http://localhost:8080/myService/get",
        data: "",
        success: function (result) {
            var myServices = result;
            popularHtml(myServices);
        }
    });
}

function popularHtml(myServices){

    var listaMyServices = document.getElementById('listaMyServices');
    listaMyServices = "";

    if(myServices.length > 0){
        listaMyServices += 
        `
        <div class="btn-group" style="margin:auto; width:40%; margin-bottom:5px;" data-toggle="buttons">
                <button class="btn btn-primary" type="button" name="options" id="showAll" onclick="mostrarTodos();"> Todos </button>
                <button class="btn btn-primary" type="button" name="options" id="showAtraso" onclick="mostrarEmAtraso();"> Em atraso </button>
        </div>                
        `
    }

    for (var aux = 0; aux < myServices.length; aux++) {
        listaMyServices = listaMyServices + '<li class="row justif-content-around list-group-item" id="service" >';
        listaMyServices += '<form class="form-inline">';
        listaMyServices += '<input type="checkbox" value="' + (myServices[aux].id) + '" name="exclude_myService" style="display:block;"/>';
        listaMyServices += '<div class="form-group col-4 form_organizacao">';
        listaMyServices += '<dt>Cliente: </dt>';
        listaMyServices += '<dd id="cliente_' + myServices[aux].id + '" name="' + (myServices[aux].id) + '" value="' + (myServices[aux].client) + '" contenteditable="false" >' + (myServices[aux].client) + '</dd>';
        listaMyServices += '</div>';
        listaMyServices += '<div class="form-group col-4 form_organizacao">';
        listaMyServices += '<dt>Serviço: </dt>';
        listaMyServices += '<dd id="servico_' + myServices[aux].id + '" name="' + (myServices[aux].id) + '" value="' + (myServices[aux].service) + '" contenteditable="false" >' + (myServices[aux].service) + '</dd>';
        listaMyServices += '</div>';
        listaMyServices += '<div class="form-group col-4 form_organizacao">';
        listaMyServices += '<dt>Id: </dt>';
        listaMyServices += '<dd id="id_' + myServices[aux].id + '" name="' + (myServices[aux].id) + '" value="' + (myServices[aux].id) + '" contenteditable="false" >' + (myServices[aux].id) + '</dd>';
        listaMyServices += '</div>';
        listaMyServices += '<div class="form-group col-4 form_organizacao">';
        listaMyServices += '<dt>Nr° de Parcelas: </dt>';
        listaMyServices += '<dd id="qtdeParcela_' + myServices[aux].id + '" name="' + (myServices[aux].id) + '" value="' + (myServices[aux].qtdeParcela) + '" contenteditable="false" >' + (myServices[aux].qtdeParcela) + '</dd>';
        listaMyServices += '</div>';
        listaMyServices += '<div class="form-group col-4 form_organizacao">';
        listaMyServices += '<dt>Preço total: </dt>';
        listaMyServices += '<dd id="vlrTotal_' + myServices[aux].id + '" name="' + (myServices[aux].id) + '" value="' + (myServices[aux].vlrTotal) + '" contenteditable="false" >' + (myServices[aux].vlrTotal) + '</dd>';
        listaMyServices += '</div>';
        listaMyServices += '<div class="form-group col-4 form_organizacao">';
        listaMyServices += '<dt>Dt. vencimento: </dt>';
        listaMyServices += '<dd id="dtVenc_' + myServices[aux].id + '" name="' + (myServices[aux].id) + '" value="' + (myServices[aux].dtVenc) + '" contenteditable="false" >' + (myServices[aux].dtVenc) + '</dd>';
        listaMyServices += '</div>';
        listaMyServices += '<div class="form-group col-4 form_organizacao">';
        listaMyServices += '<dt>Dt. pagamento: </dt>';
        listaMyServices += '<dd id="dtPgm_' + myServices[aux].id + '" name="' + (myServices[aux].id) + '" value="' + (myServices[aux].dtPgm) + '" contenteditable="false" >' + (myServices[aux].dtPgm) + '</dd>';
        listaMyServices += '</div>';
        listaMyServices += '<div class="form-group col-4 form_organizacao">';
        listaMyServices += '<dt>Observação: </dt>';
        listaMyServices += '<dd id="obs_' + myServices[aux].id + '" name="' + (myServices[aux].id) + '" value="' + (myServices[aux].obs) + '" contenteditable="false" >' + (myServices[aux].obs) + '</dd>';
        listaMyServices += '</div>';
        listaMyServices += '<button id="editMyService_' + myServices[aux].id + '" type="button" value="' + (myServices[aux].id) + '" style="display:block; color:white; margin-top: 15px" class="btn btn-outline-info col-auto" onclick="editMyService(this.value);">Editar</button>';
        listaMyServices += '<button id="saveEditMyService_' + myServices[aux].id + '" type="button" value="' + (myServices[aux].id) + '" style="display:none;" class="btn btn-block btn-primary" onclick="saveEditMyService(this.value);">Salvar</button>';
        listaMyServices += '<button id="cancelEditMyService_' + myServices[aux].id + '" type="button" value="' + (myServices[aux].id) + '" style="display:none;" class="btn btn-block btn-primary" onclick="cancelEditMyService(this.value);">Cancelar</button>';
        listaMyServices += '</form>';
        listaMyServices += '</li>';
    }
    document.getElementById('listaMyServices').innerHTML = listaMyServices;
    if(listaMyServices)document.getElementById('removerItensChecados').innerHTML = 
        '<button id="remove" type="button" class="btn btn-block btn-primary" style="margin:auto; width:40%; margin-bottom:25px;" onclick="removeMyServices();">Remover itens selecionados</button>';

}

//Função para remover clientes selecioados pelo checkbox
function removeMyServices() {
    var removidoSucesso = false;
    var myServices = document.getElementsByName('exclude_myService');
    for (var aux = 0; aux < myServices.length; aux++) {
        if (myServices[aux].checked) {
            var myService = {
                'id': myServices[aux].defaultValue,
            };
            $.ajax({
                type: "GET",
                contentType: "application/String; charset=utf-8",
                dataType: "String",
                url: "http://localhost:8080/myService/delete?id=" + myService.id,
                data: myService.name,
                success: function (result) {
                    removidoSucesso = true;
                },
                error: function (data, status, er) {
                    removidoSucesso = false;
                }

            });
        }

    }
    window.location = 'meus_servicos.html';

}

//Função para editar cliente
function editMyService(id) {
    var serviceButtonSaveEdit = document.getElementById('saveEditMyService_' + id);
    var serviceButtonCancelEdit = document.getElementById('cancelEditMyService_' + id);
    var serviceButtonEdit = document.getElementById('editMyService_' + id);

    serviceButtonEdit.style.display = "none";
    serviceButtonSaveEdit.style.display = "block";
    serviceButtonCancelEdit.style.display = "block";

    var qtdeParcela = document.getElementById('qtdeParcela_' + id);
    var vlrTotal = document.getElementById('vlrTotal_' + id);
    var dtVenc = document.getElementById('dtVenc_' + id);
    var dtPgm = document.getElementById('dtPgm_' + id);
    var obs = document.getElementById('obs_' + id);

    qtdeParcela.contentEditable = "true";
    vlrTotal.contentEditable = "true";
    dtVenc.contentEditable = "true";
    dtPgm.contentEditable = "true";
    obs.contentEditable = "true";
}

function cancelEditMyService(valueName) {
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
    window.location = 'meus_servicos.html';

}

function saveEditMyService(id) {
    /* var serviceButtonSaveEdit = document.getElementById('saveEdit'+(id));
    var serviceButtonCancelEdit = document.getElementById('cancelEdit'+(id));
    var serviceButtonEdit = document.getElementById('edit'+(id));
    serviceButtonEdit.style.display= "block";
    serviceButtonSaveEdit.style.display = "none";
    serviceButtonCancelEdit.style.display = "none"; */
    id = id;

    var qtdeParcela = document.getElementById('qtdeParcela_' + id).innerHTML;
    var vlrTotal = document.getElementById('vlrTotal_' + id).innerHTML;
    var dtVenc = document.getElementById('dtVenc_' + id).innerHTML;
    var dtPgm = document.getElementById('dtPgm_' + id).innerHTML;
    var obs = document.getElementById('obs_' + id).innerHTML;
    

    if (id) {
        var myService = {
            'id': id,
            'qtdeParcela': qtdeParcela,
            'vlrTotal': vlrTotal,
            'dtVenc': dtVenc,
            'dtPgm': dtPgm,
            'obs': obs
        };
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "http://localhost:8080/myService/update",
            data: JSON.stringify(myService),
            success: function (result) {
                window.location = 'meus_servicos.html';

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
function addMyService() {

    var client = $('#inputGroupSelectClient').val();
    var service = $('#inputGroupSelectService').val();
    var qtdeParcela = $('#inputQtdeParcela').val();
    var vlrTotal = $('#inputPrecoTotal').val();
    var dtVenc = $('#inputDtVenc').val();
    var dtPgm = $('#inputDtPag').val();
    var obs = document.getElementById("inputObs").value;
    

    if (client && service && client!="Vazio" && service!="Vazio") {
        if (obs.length > 100){
            alert("A observação deve conter no máximo 100 caracteres!");
            return;
        }

        var myService = {
            'client': client,
            'service': service,
            'qtdeParcela': qtdeParcela,
            'vlrTotal': vlrTotal,
            'dtVenc': dtVenc,
            'dtPgm': dtPgm,
            'obs': obs
        };

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "http://localhost:8080/myService/save",
            data: JSON.stringify(myService),
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
                window.location = 'meus_servicos.html';
            },
            error: function (data, status, er) {
                alert("Não foi possivel conectar ao servidor.");
            }
        });  


    } else {
        alert("Cliente e Serviço devem ser preenchidos.");
        return;
    }

}
