const clearInput = () => {
    document.querySelector(".input-box").value = "";
    document.querySelector(".input-box").focus();
};

const getInput = () => {
    const input = document.querySelector(".input-box").value;
    return input;
};

let inputArr = [];
const insertDB=(input)=>{
    localStorage.clear();
    inputArr.push(input);
    localStorage.setItem('Array',JSON.stringify(inputArr));
}


var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };

const renderUI = (str, index,id) => {

if(str!==''){
    var markup = `
  <div class="inserted-text-container" id=${id}>
  <p class="para"><span>${index+1+"."}</span>${str}</p>
  <i class="icon-container" title="remove"> <ion-icon name="close-circle-outline" ></ion-icon></i>
 </div>
  `;
  document.querySelector(".inserted-text").insertAdjacentHTML("beforeend", markup);
}
};

class inputCons {
    constructor(input,id){
    this.input=input,
    this.id=id  
}
  strike=false
}
 
const controlInput=()=>{
   
    // creating ID
    var Id=ID();
    //1.get value from ui
    var get_input = getInput();
    const input=new inputCons(get_input,Id);

    // 2.condition for has input or not
    //3.renderInto UI

    if(input.input!="" && input.input.trim()!=""){
        insertDB(input);
        renderUI(input.input,inputArr.indexOf(input),input.id);
       }
       else{
        //   alert("Please enter your Input");
       }

    //4.clear and focus the InputBox
       clearInput();

  

}



document.querySelector(".btn-insert").addEventListener("click", () => {
     
    controlInput();
   
});


document.addEventListener('keypress',e=>{
    if(e.keyCode===13){
        controlInput();
    }
});



const deleteItem=(e)=>{
    var id=e.target.parentNode.parentNode.id;
    // var replacepos=parseInt(id.replace('pos',''));

    var id_pos=inputArr.findIndex((el)=>el.id==id)
    inputArr.splice(id_pos,1);
    
    var idparent=e.target.parentNode.parentNode.parentNode.className;
    document.getElementById(`${id}`).classList.add('bombLeftOut');
    localStorage.clear();
    if(inputArr.length>0){
        localStorage.setItem('Array',JSON.stringify(inputArr));
    }

    
    setTimeout(()=>{
        document.getElementById(`${id}`).remove();
    },400)
    
     location.reload(true);
 
}

document.querySelector('.inserted-text').addEventListener('click',e=>{

    if(e.target.className==='md hydrated'){
       deleteItem(e);
    }
 
})

window.addEventListener('load',()=>{
   
    if(localStorage.length>0){
        let getLocal=JSON.parse(localStorage.getItem('Array'));
         if(getLocal.length>0){
             getLocal.forEach(el=>{
                 inputArr.push(el);
             })
         }
        
        inputArr.forEach(el=>{
        renderUI(el.input,inputArr.indexOf(el),el.id);
        });
     
    }
   
})





 
