var form = document.getElementById("addForm");
var items = document.getElementById("items");
var editId=0;
var editEle;
var edit=false;
form.addEventListener('submit',addItem);

items.addEventListener('click',removeItem);

function addItem(e){
        e.preventDefault();
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
            axios.post("http://localhost:4000/adduser",myobj)
            .then((res)=>{
                li.id = res.data.newUserDetail.id;
                console.log(li.id)
                console.log(res.data);
                
                var deletebtn = document.createElement("button");
                deletebtn.className="btn btn-danger btn-sm btn-space delete";
                deletebtn.appendChild(document.createTextNode("Del"));


                var editBtn = document.createElement("button");
                editBtn.className="btn btn-primary btn-sm btn-space  edit ";
                editBtn.appendChild(document.createTextNode("Edit"));

                li.appendChild(deletebtn);
                li.appendChild(editBtn);
                items.appendChild(li);
            } )
            .catch(err =>{
                console.log(err)
            });

}

function showDataToScreen(data){
    var Name = data.NAME;
    var Email = data.EMAIL;
    var PhoneNumber = data.PHONENUMBER;
    var li =document.createElement("li");
    li.id = data.id;
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
    axios.get("http://localhost:4000/adduser")
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
        axios.delete("http://localhost:4000/adduser/"+li.id)
        .then((res)=>{

        }).catch(err=>console.log(err));

    }
    if(e.target.classList.contains("edit")){
        var li = e.target.parentElement;
        let itemList = li.firstChild.textContent.split("-");

        document.getElementById("name").value = itemList[0];
        document.getElementById("email").value = itemList[1];
        document.getElementById("phonenumber").value= itemList[2];
       edit=true;
       editEle=li;
       editId = li.id;

    }
    
}