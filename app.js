const addBox = document.querySelector(".addbox");
const PopupBox = document.querySelector(".popup_box"),
      close = document.querySelector(".fa-solid"),
      addBtn =  document.querySelector(".add-note"),
      titleTag = document.querySelector("form input"),
      decscriptTag = document.querySelector("form textarea"),
      heaerPTag = document.querySelector("header p");

let isUpdate = false ,
      updateId ;
const   myMonth = ["Janunary","February","March","April","May","June","July","August","Septembar","October","Novembar","Decembar"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
addBox.addEventListener("click",function(){
    titleTag.focus();
    PopupBox.classList.add("active");

})
close.addEventListener("click",function(){
    isUpdate = false ;
     titleTag.value = "";
    decscriptTag.value = "";
    addBtn.innerText  = "Add Note";
    heaerPTag.innerHTML = "Add a Note"
    PopupBox.classList.remove("active");

})

showNotes()
function showNotes(){
    document.querySelectorAll(".note").forEach((note=>{note.remove()}));
    notes.forEach((note , index) => {
         let litag  = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.Decription}</span>
                        </div>
                        <div class="bottom_content">
                            <span class="note_info">${note.date}</span>
                            <div class="seting">
                            <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                            <div class="menu">
                                <ul>
                                    <li onclick="updateNote(${index} , '${note.title}' ,'${note.Decription}')"><i class="fa-solid fa-pen"></i>Eidt</li>
                                    <li onclick="deleteNote(${index})"><i class="fa-solid fa-trash"></i>Delete</li>
                                </ul>
                            </div>
                            </div>
                        </div>
                    </li> `
         addBox.insertAdjacentHTML("afterend",litag) ;

                    
    });
}


function showMenu(element){
      element.parentElement.classList.add("Show");
      document.addEventListener("click",(e)=>{
          if(e.target.tagName != "I" || e.target != element){
            element.parentElement.classList.remove("Show");
          }
      })
} 


/// Delete Note 
function deleteNote(mainNote){
    let confirmDel = confirm("Are you sure want to delete this note?")
    if(!confirmDel) return ;
   notes.splice(mainNote  , 1) ;
   
   localStorage.setItem("notes", JSON.stringify(notes));
   showNotes();
}


/// update Note 

function updateNote(noteId , title , Description){
    isUpdate = true ;
    updateId = noteId ;
    addBox.click()
    addBtn.innerText  = "Update Note";
    heaerPTag.innerHTML = "Update a Note"
    titleTag.value = title;
    decscriptTag.value = Description;
 
     
}
addBtn.addEventListener("click",(e)=>{
 e.preventDefault();
 let noteTitle  = titleTag.value,
     noteDiscript = decscriptTag.value ;
     if(noteTitle || noteDiscript){
         let dateObject =  new Date(),
         month = myMonth[dateObject.getMonth()],
         day = dateObject.getDate(),
         year = dateObject.getFullYear();
        let noteinfo = {
            title : noteTitle , 
            Decription : noteDiscript,
            date : `${month} ${day}, ${year}` 
        }
       
         if(!isUpdate){
                  notes.push(noteinfo) ;
         } else{
            isUpdate =  false ; 
             notes[updateId] = noteinfo ;
         }

        localStorage.setItem("notes", JSON.stringify(notes));
        close.click();
        showNotes();
     }

})

