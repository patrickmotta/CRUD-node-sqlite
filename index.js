import nodeSchedule from 'node-schedule';
import express from 'express';
import axios from 'axios';
import database, {} from './db.js'
import {User, Scheduling} from './src/models/tables.js';

database.sync();
const app = express();

app.use(express.json());

app.get('/user/all', async (req, res) => {

      const returnUser = await User.findAll()

      res.json(returnUser)
   })


app.get('/user/one', async (req, res) => {

      let { name } = req.body;
      
      name = name.toLowerCase();

      const returnUser = await User.findOne({ where: { name: name } });

      if(returnUser == null){
         res.json("O usuario não existe")
      }else{
         res.json(returnUser)
      }

      
   })

app.post('/user/create', async (req, res) => {

      let { name, token} = req.body;
      name = name.toLowerCase()

      let returnUser;
      const [user, created] = await User.findOrCreate({
         where: { name: name },
         defaults: {
            name: name,
            token: token
         }
       });
      
      if(created){
         returnUser = "Usuario criado"
      }else{
         returnUser = "O usuario já existe"
      }

      res.json(returnUser)
   })


app.put('/user/update/:id', async (req, res) => {

      let { name, token} = req.body;
      const { id } = req.params;
      name = name.toLowerCase()

      const returnUser = await User.findByPk(id)

      returnUser.name = name;
      returnUser.token = token;

      const resultSave = await returnUser.save();


      res.json(resultSave)
   })


app.delete('/user/delete/:id', async (req, res) => {

      // const { name, token} = req.body;
      const { id } = req.params;

      const returnUser = await User.findByPk(id);

      if(returnUser == null){
         res.json("O id de usuario não existe");
      }else{
         const resultDestroy = await returnUser.destroy();
         // console.log(resultDestroy)
         res.json("Excluido com sucesso");
      }

      
   })

const PORT = 4000;
app.listen(PORT, ()=>{
    console.log(`Server rodando na porta ${PORT}`)
})