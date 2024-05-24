


user_param = localStorage.getItem("user_id");

const getArtistName=(id)=>{
    // var name;
    return fetch(`https://artistic-vision-api.onrender.com/Artists/${id}`)
    .then((res)=>res.json())
    .then((data)=>{
        return data.first_name+' '+ data.last_name;
    })
    // return name;
};

const loadProfile=()=>{
    let user= new URLSearchParams(window.location.search).get("id");
    if (user===null){
        user=user_param;
    }
    fetch(`https://artistic-vision-api.onrender.com/Artists/${user}`)
    .then((res)=>res.json())
    .then((data)=>{
        let profile = document.getElementById("profileInfo");
        profile.innerHTML=`
        <div class="m-lg-1 d-flex  flex-column align-self-start">
        <div class="rounded-circle bg-black d-flex justify-content-center text-light" id="dp-name" style="width: 15rem; height: 15rem;"><h3 style="font-size: 10rem;" class=" m-auto">${data.first_name[0]}</h3> </div>
        <div class="align-text-center m-4"><h1>${data.first_name} ${data.last_name}</h1>
        <small>@${data.username}</small>
        </div>
        `
        loadOwnPictures(data.id)
    })
   
   

};

const loadOwnPictures =(id)=>{
    fetch(`https://artistic-vision-api.onrender.com/artworks/?artist=${id}`)
    .then((res)=>res.json())
    .then((data)=>{
        // console.log(data.length);
        const ownArt= document.getElementById("own_arts");
        if(data.length===0){
            ownArt.innerHTML=`<h1>🚫You haven't posted any art yet</h1>`
        }
        else{
            data.forEach(info => {
                console.log(info);
                let div= document.createElement("div");
                getArtistName(info.artist).then((artist_name)=>{

                    div.innerHTML=`
                <div class="bg-secondary-subtle rounded align-content-center p-3 w-75 m-auto" id="profileInfo">
                <div class="m-lg-1 d-flex justify-content-start">
                <div class="rounded-circle bg-black  text-center text-light" id="dp-name" style="width: 30px; height: 30px;">${artist_name[0]}</div>
                <a></a> <p>${artist_name}</p>

               
            </div>
            <small class="fw-bold">${info.title}</small>
            <p>${info.description}</p>
    
            <div class=" d-flex justify-content-center">
                <img style="width: 100%; height: 50%;"  src="${info.image}" alt="">
            </div>
            <br>
            <div class="m-2" >
                <small>${info.likes} likes</small><br>
                <button class="btn btn-primary m-auto" onclick=postLike(${info.id})>🪄Like🪄</button>

                </div>
                <br>
                
                `
                // <button class="btn btn-danger" onclick="deleteImage(${info.artist}, ${info.id})" >Delete</button></div>
            ownArt.appendChild(div);

                })
                
            });
        }
    })
}
loadProfile();

const deleteImage=(artist,id)=>{
    console.log((artist));
    console.log( (user_param) );
    console.log(id);
    if(artist===user_param){
        console.log("hello");
        fetch(`https://artistic-vision-api.onrender.com/artworks/${id}`,{
        method: "DELETE",
        headers : {"content-type": "application/json"},
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        window.location.reload();
    })
    }
    else{
        alert('Only the owner of the profile can delete thier own picture')
    }
    
}

const handlelogout=()=>{
    fetch(`https://artistic-vision-api.onrender.com/logout/`)
    // .then((res)=>res.json())
    .then(()=>localStorage.clear())
    .then(()=>window.location.href= "index.html");
    
}