const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://root:erivelton@cluster0.uesrjos.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const db = client.db('todo');

async function insere1elemento(){
    const tarefas = db.collection("tarefa");//colecao
    const tarefa = {nome: "Fazer Prova", status: "Concluido"};//documentos 
    const result = await tarefas.insertOne(tarefa);
    console.log(`A tarefa inserida foi a: ${result.insertedId}`);
}

async function insereNelemento(){
  const tarefas = db.collection("tarefa");//colecao
  const documents = [
      {nome: "Agendamento", status: "Aberto"},
      {nome: "Jogar futebol", status: "Aberto"},
      {nome: "Nadar", status: "Aberto"},
      {nome: "Estudar", status: "concluido"}
  ];//documentos 
  const result = await tarefas.insertMany(documents);
  let ids = result.insertedIds; 
  for(let id of Object.values(ids)){
      console.log(`A tarefa inserida foi a: ${id}`);
  }
}

async function selecionaValores(){
      const tarefas = await db.collection('tarefa').find();
      for await (let tarefa of tarefas){
      console.log(tarefa);
  }
}

async function editarValor(){
  const tarefas = db.collection("tarefa");
  const filtro = { nome : "Agendamento" };
  const update = { "$set": { status : "Concluido" }};
  await tarefas.updateOne(filtro, update);
  //selecionaValores();
}

/*async function deleteValor(){
  const pizzas = db.collection("pizzas");
  const pizza = await pizzas.findOne({ nome : "3 Queijos" });
  pizzas.deleteOne(pizza);
  selecionaValores();
}*/

//insere1elemento();
//insereNelemento();
//selecionaValores();
//editarValor();