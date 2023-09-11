var form = document.getElementById("addForm");
var items = document.getElementById("items");
var key=0;
form.addEventListener('submit',addItem);
items.addEventListener('click',removeItem);

function addItem(e){
e.preventDefault();
key++;
var Name = document.getElementById("name").value;
var Email = document.getElementById("email").value;
var PhoneNumber = document.getElementById("phonenumber").value;

var myobj = {
    Name : Name,
    Email: Email,
    PhoneNumber: PhoneNumber
};



var li =document.createElement("li");
li.className="list-group-item";
li.id=key;
li.appendChild(document.createTextNode(Name +"-"+Email+"-"+PhoneNumber  ));
axios.post("https://crudcrud.com/api/2c3bf3fea33c4aa385b87db9cd4d1517/appointmentapp",myobj).then((res)=>console.log(res) ).catch(err =>console.log(err));
var myobjSerialized = JSON.stringify(myobj);
localStorage.setItem(li.id,myobjSerialized);

var deletebtn = document.createElement("button");
deletebtn.className="btn btn-danger btn-sm btn-space delete";
deletebtn.appendChild(document.createTextNode("Del"));

var editBtn = document.createElement("button");
editBtn.className="btn btn-primary btn-sm btn-space  edit ";
editBtn.appendChild(document.createTextNode("Edit"));

li.appendChild(deletebtn);
li.appendChild(editBtn);
items.appendChild(li);
}

function removeItem(e){
    if(e.target.classList.contains("delete")){
        var li = e.target.parentElement;
        items.removeChild(li);
        localStorage.removeItem(li.id);

    }
    if(e.target.classList.contains("edit")){
        var li = e.target.parentElement;
        let itemList = li.firstChild.textContent.split("-");

        document.getElementById("name").value = itemList[0];
        document.getElementById("email").value = itemList[1];
        document.getElementById("phonenumber").value= itemList[2];

        items.removeChild(li);
        localStorage.removeItem(li.id);
    }
    
}