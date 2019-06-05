
const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(index, data, previousHash=''){
    this.index= index;
    this.date= new Date();
    this.data= data;
    this.previousHash=previousHash;
    this.hash= this.createHash();
    //para minar..numero que se utiliza para poder generar un hash que cumpla una condicion en concreto
    this.nonce=0;
          
    }

    createHash(){
      return SHA256(this.index + this.date + this.data +this.previousHash + this.nonce).toString();
    }
    //metodo de minado

mine(difficulty){
    //mientras la dificultad sea diferente de la dificultad pasada por parametro ,entonc que varie nonce
    while(!this.hash.startsWith(difficulty)){
        this.nonce++;
        this.hash= this.createHash();
        
    }

}

}



//crear el objeto blockchange

class BlockChain{
  constructor(genesis,difficulty='00'){
  this.chain=[this.createFirstBlock(genesis)];
  this.difficulty= difficulty;
}   
createFirstBlock(genesis){
    return new Block(0,genesis);
}
//devuelve el ultimo valor 
getLastBlock(){
    return this.chain[this.chain.length-1];
}
//adicionar un bloque
addBlock(data){
    let prevBlock= this.getLastBlock();
    let block= new Block(prevBlock.index+1, data, prevBlock.hash);
    block.mine(this.difficulty);
    console.log('Minado!'+block.hash+'con nonce'+block.nonce);
    this.chain.push(block);

}
//validacion

isValid(){

    for(let i=1;i<this.chain.length;i++){
        let prevBlock= this.chain[i-1];
        let currBlock=this.chain[i];

        if(currBlock.previousHash != prevBlock.hash)
        
            return false;

            if(currBlock.createHash() != currBlock.hash)

            return false;
    }
    return true;
}
}
//block= new Block(0,'prueba');
//console.log(JSON.stringify(block,null,2));

//crear una moneda 

let naniCoin = new BlockChain('info de genesis','00');
//para añadir mas bloques 
naniCoin.addBlock('Esta modena lo va a petar');
naniCoin.addBlock('Valgo 16k euros');
//para saber si el blockchange es verdadero o falso
console.log(naniCoin.isValid());

//alterar el blockchange para que me de false
naniCoin.chain[1].data='Fake data';
console.log(naniCoin.isValid());
//console.log(JSON.stringify(naniCoin.chain,null,2));
