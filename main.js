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
li.appendChild(document.createTextNode(Name +"-"+Email+"-"+PhoneNumber  ));
axios.post("https://crudcrud.com/api/ec0d28826ca04f71a15bc7e3a2921b78/appointmentapp",myobj)
.then((res)=>{
    li.id = res.data._id;
    console.log(li.id);
} )
.catch(err =>console.log(err));

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

function showDataToScreen(data){
    var Name = data.Name;
    var Email = data.Email;
    var PhoneNumber = data.PhoneNumber;
    var li =document.createElement("li");
    li.id = data._id;
    li.className="list-group-item";
    li.appendChild(document.createTextNode(Name +"-"+Email+"-"+PhoneNumber  ));
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
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/ec0d28826ca04f71a15bc7e3a2921b78/appointmentapp")
    .then((res)=>{
        console.log(res.data)
        for( var i=0;i<res.data.length;i++){
            showDataToScreen(res.data[i]);
        }
    
    }).catch(err=>console.log(err));


})

function removeItem(e){
    if(e.target.classList.contains("delete")){
        var li = e.target.parentElement;
        console.log(li.id);
        items.removeChild(li);
        axios.delete("https://crudcrud.com/api/ec0d28826ca04f71a15bc7e3a2921b78/appointmentapp/"+li.id)
        .then((res)=>{

        }).catch(err=>console.log(err));

    }
    if(e.target.classList.contains("edit")){
        var li = e.target.parentElement;
        let itemList = li.firstChild.textContent.split("-");

        document.getElementById("name").value = itemList[0];
        document.getElementById("email").value = itemList[1];
        document.getElementById("phonenumber").value= itemList[2];

        items.removeChild(li);
    }
    
}