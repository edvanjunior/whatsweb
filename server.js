const express = require('express');
const cors = require('cors');
const venom = require('venom-bot');

let ws;
venom
  .create({
    session: 'session-name', //name of session
    multidevice: false // for version not multidevice use false.(default: true)
  })
  .then((client) => {
      ws = client;
    }
  )
  .catch((erro) => {
    console.log(erro);
  });



const mensagemWAPP = (req, res) => {

    const { message, number } = req.body

    ws.sendText( number + '@c.us', message)
        .then((result) => {
          console.log('Result: ', result); //return object success
          res.send({'retorno': result})
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
       })
}


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

// Rotas
app.post('/enviarmensagem', mensagemWAPP);



// Ativar o Servidor

app.listen(9000, () => console.log('Server Ativo'));