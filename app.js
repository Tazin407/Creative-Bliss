// authentication is done here
const getValue=(id)=>{
    value= document.getElementById(id).value;
    return value;
}

const handleRegister=(event)=>{
    event.preventDefault();
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const username = getValue("username");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");
    const info = {
        first_name,
        last_name,
        email,
        username,
        password,
        confirm_password,
      };
    //   var isvalid=true;
    //   for(i in info){
    //     if(!i){
    //         isvalid=false;
    //     }
    //   };
    //   console.log(isvalid);
    //   if (isvalid === true) {
        fetch("https://artistic-vision-api.onrender.com/register/",{
            method :"POST",
            headers : {"content-type": "application/json"},
            body: JSON.stringify(info),
        })
        .then((res)=>res.json())
        .then((data) => {
            console.log(data);
            if(data==="Please Check Your Email"){

                document.getElementById("submitError").innerHTML=``;
                document.getElementById("submitError").innerText=data;
            }
            else{

                document.getElementById("submitError").innerText=data["email"];
            }
        });
    // } 
    // else{
    //     console.log("all blank");
    // }
      

};


const handleLogin = (event) =>{
    event.preventDefault();
    const email= getValue('loginEmail')
    const password= getValue('loginPass')
    const LoginInfo={
        email,
        password,
    }
    fetch("https://artistic-vision-api.onrender.com/login/",{
        method :"POST",
        headers : {"content-type": "application/json"},
        body: JSON.stringify(LoginInfo),
    })
    .then((res)=>res.json())
    .then((data)=> {
        console.log("hello");
        console.log(data.token);
        if (data.token && data.user_id){
            localStorage.setItem('token', data.token);
            localStorage.setItem('user_id', data.user_id);
            window.location.href = "homepage.html" ;
            
        }
        else if(data.token===undefined){
            document.getElementById("error").innerText= data
        }
        else{
            document.getElementById("error").innerText= data
        }
    });

    
};
