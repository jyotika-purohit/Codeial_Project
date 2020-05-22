let createNewPost=function(){
    const newPostForm=$('#new-post-form');
    newPostForm.submit(function(e){
        e.preventDefault();
        $.ajax(
            {   type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success:function(data){
                    let newPost=newPostDOM(data.data.post);
                    console.log(newPost);
                    $('#posts-container>ul').prepend(newPost);
                },error:function(err){
                    console.log("Error",err)
                }
            }
        )
    });

    let newPostDOM=function(post){
        return $(`
        <li class="post" >
                <p style="display: inline-block;" >${post.content}</p>
                <p  style="display: inline-block;font-weight: bolder;" >${post.user.name}</p>
        </li>
        `)
    }

}

createNewPost();