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
const postLike=(id)=>{
    info={
        id,
        user_param,
    }
    console.log(info);
    fetch(`https://artistic-vision-api.onrender.com/likes/`, {
        method: "POST",
        headers: { "content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
             "art": id,
             "artist": user_param,

        }),
      })
      .then((res)=>res.json())
      .then((data)=>{
        console.log(data);
      })

}

const loadData=()=>{
    fetch('https://artistic-vision-api.onrender.com/artworks/')
    .then((res)=>res.json())
    .then((data) =>{
        parent= document.getElementById("newsfeed");
        data.forEach(info => {
            getArtistName(info.artist).then((name)=>{

                // console.log(name);
            var div=document.createElement("div")
            div.innerHTML=`
            <div class="bg-secondary-subtle rounded align-content-center p-3 w-100 m-auto min-w-100" id="profileInfo">
            <div class="m-lg-1 d-flex justify-content-start">
            <div class="rounded-circle bg-black text-center text-light" id="dp-name" style="width: 30px; height: 30px;">${name[0]}</div>
            <a style="text-decoration: none;" class="text-dark" href="profile.html?id=${info.artist}" ><p>${name}</p></a> 
        </div>
        <small class="fw-bold">${info.title}</small>
        <p>${info.description}</p>
        
        <div class=" d-flex justify-content-center">
            <img class="w-100 h-50 p-1 min-h-100 " src="${info.image}" alt="">
        </div>
        <br>
        <div class="m-2" >
            <small>${info.likes} likes</small><br>
            <button class="btn btn-primary m-auto" onclick=postLike(${info.id})>🪄Like🪄</button></div>
        </div>
        <br>
            `;
            // document.getElementById("spinner-container").outerHTML=``;
            parent.appendChild(div);
            });
            
        });
            
        }

    );

};

const handlelogout=()=>{
    fetch(`https://artistic-vision-api.onrender.com/logout/`)
    // .then((res)=>res.json())
    .then(()=>localStorage.clear())
    .then(()=>window.location.href= "index.html");
    
}

loadData();