const express = require ("express")

const cors = require ("cors")

const app = express()

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

const jugadores=[]

class Jugador {
    constructor(id){
        this.id=id
    }
    asignarAnimal (animal){
        this.animal=animal
    }
    actualizarPosicion(x,y){
        this.x=x
        this.y=y
    }
    asignarAtaques(ataques){
        this.ataques=ataques
    }
}    

class Animal {
    constructor (nombre){
        this.nombre=nombre
    }
}

app.get("/unirse", (req, res) =>{
   
    const id = `${Math.random()}`

    const jugador=new Jugador(id)

    jugadores.push(jugador)


    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})

app.post('/animal/:jugadorId', (req, res)=>{
    const jugadorId = req.params.jugadorId || ""
    const nombre=req.body.animal || ""
    const animal = new Animal(nombre)

    const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId===jugador.id)

    if(jugadorIndex>=0){
        jugadores[jugadorIndex].asignarAnimal(animal)
    }

    
    
    res.end()
})

app.post("/animal/:jugadorId/posicion", (req, res)=> {
    const jugadorId = req.params.jugadorId || ""
    const x=req.body.x || 0
    const y=req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId===jugador.id)

    if(jugadorIndex>=0){
        jugadores[jugadorIndex].actualizarPosicion(x,y)
    }
    const enemigos = jugadores.filter((jugador)=> jugadorId!==jugador.id )

    res.send({
        enemigos
    })
})

app.post("/animal/:jugadorId/ataques", (req, res)=> {
    const jugadorId = req.params.jugadorId || ""
    const ataques=req.body.ataques || []

    const jugadorIndex = jugadores.findIndex((jugador)=> jugadorId===jugador.id)

    if(jugadorIndex>=0){
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }
    res.end()
})

app.get("/animal/:enemigoId/ataques", (req, res)=> {
    const enemigoId = req.params.enemigoId || ""

    const jugador = jugadores.find((jugador)=> enemigoId===jugador.id) 

    res.send({
        ataques : jugador.ataques || []
    })
    console.log(jugadores)
})

app.listen(8080, ()=> {
    console.log ('holiiiis')
})