const postImage=(event)=>{
    event.preventDefault();
    var image= document.getElementById("artwork").files[0] ;
    console.log(image);
    fetch('https://api.imgbb.com/1/upload/?key=2d32afb92e6b2ff25ab04c76ea9983ca',{
        method: 'POST',
        headers : {"content-type": "media/json"},
        body: image,
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(object);
    })
    event.preventRedirect();
    // axios.post("https://api.imgbb.com/1/upload/?key=2d32afb92e6b2ff25ab04c76ea9983ca",image)
    // .then(res=>{
    //     setImageURL(res.data.data.display_url);
    //     setIsLoading(false)
    // })
    // .catch((error)=>{
    //     console.log(error);
    // })
};