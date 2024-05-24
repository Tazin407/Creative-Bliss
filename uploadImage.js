const postImage=(event)=>{
    // event.preventDefault();
    // var image= document.getElementById("artwork").files[0] ;
    // console.log(image);
    // fetch('https://api.imgbb.com/1/upload/?key=2d32afb92e6b2ff25ab04c76ea9983ca',{
    //     method: 'POST',
    //     headers : {"content-type": "media/json"},
    //     body: image,
    // })
    // .then((res)=>res.json())
    // .then((data)=>{
    //     console.log(object);
    // })
    let title= document.getElementById("title").value;
    let image= document.getElementById("artwork").value;
    let description= document.getElementById("description").value;
    artist= localStorage.getItem("user_id");

    info={
        title,
        image,
        description,
        artist,
    }
    fetch('https://artistic-vision-api.onrender.com/artworks/',{
        method:'POST',
        headers: {"content-type": "application/json"},
        body: JSON.stringify(info),

    })
    .then((res)=>res.json())
    .then((data)=>console.log(data));
};