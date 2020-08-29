const clearInput = () => {
    document.querySelector(".input-box").value = "";
    document.querySelector(".input-box").focus();
};
const getInput = () => {
    const input = document.querySelector(".input-box").value;
    return input;


};
const insertDB=(input)=>{
    localStorage.clear();
    inputArr.push(input);
    localStorage.setItem('Array',JSON.stringify(inputArr));

}
let inputArr = [];
const renderUI = (str, index) => {

if(str!==''){
    var markup = `
  <div class="inserted-text-container" id=${"pos" + index}>
  <p><span>${index+1+"."}</span>${str}</p>
  <i class="icon-container" title="remove" <ion-icon name="close-circle-outline" >></ion-icon></i>
 </div>
  `;
  document.querySelector(".inserted-text").insertAdjacentHTML("beforeend", markup);
}
};
 
const controlInput=()=>{
    //1.get value from ui
    var input = getInput();
    
    // 2.condition for has input or not
    //3.renderInto UI

    if(input!='' && input.trim()!=''){
        insertDB(input);
        renderUI(input,inputArr.indexOf(input));
       }
       else{
        //    alert("Please enter your Input");
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
    var replacepos=parseInt(id.replace('pos',''));
    inputArr.splice(replacepos,1);
    var idparent=e.target.parentNode.parentNode.parentNode.className;
    document.getElementById(`${id}`).classList.add('bombLeftOut');
    localStorage.clear();
    if(inputArr.length>0){
        localStorage.setItem('Array',JSON.stringify(inputArr));
    }

    
    setTimeout(()=>{
        document.getElementById(`${id}`).remove();
    },400)
 
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
        renderUI(el,inputArr.indexOf(el));
        });
    }
   
})


