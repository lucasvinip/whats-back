/****
 * Objetivo: Criar uma API para manipulaçao de dados de contatos
 * Autor: Lucas Vinicius
 * Data: 24/03/2023
 * Versao: 1.0
 */

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const contact = require('./modulo/contatos.js')
const { response } = require('express')
const { request } = require('http')
const contatos = require('./modulo/contatos.js')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')

    response.header('Access-Control-Allow-Methods', '*')

    app.use(cors())

    next()
})

//endPoints

//endPoint para Listar as contas
app.get('/v1/what/user/', cors(), async function(request, response, next){

    let number = request.query.number
    let statusCode
    let dateUser = {}

    if(number == '' || number == undefined || isNaN(number)){
        statusCode = 400
        dateUser.message =  'Não é possivel processar a requisição o paremetro esta errada'
    }
    else{
        let users = contact.getUser(number)

        if(users){
            statusCode = 200
            dateUser = users
        }
        else
            statusCode = 404
    }

    response.status(statusCode)
    response.json(dateUser)
})

app.get('/v1/whats/contatos/', cors(), async function(request, response, next){

    let id = request.query.id
    let statusCode
    let dateContact = {}

    if(id == '' || id == undefined || isNaN(id)){
        statusCode = 400
        dateUser.message =  'Não é possivel processar a requisição o paremetro esta errada'
    }
    else{
        let contact = contatos.getContact(id)

        if(contact){
            statusCode = 200
            dateContact = contact
        }
        else    
            statusCode = 404
    }

    response.status(statusCode)
    response.json(dateContact)
})

app.listen(8080,function(){
    console.log('Servidor aguardando requisições na porta 8080.');
})