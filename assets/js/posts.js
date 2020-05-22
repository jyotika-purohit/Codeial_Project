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
                    $('#posts-container>ul').prepend(newPost);
                    deletePost($(' #delete-post',newPost));
                },error:function(err){
                    console.log("Error",err.responseText)
                }
            }
        )
    });

    let newPostDOM=function(post){
        return $(`
        <li class="post" id="post-${post._id}" >
                <p style="display: inline-block;" >${post.content}</p>
                <p  style="display: inline-block;font-weight: bolder;" >${post.user.name}</p>
                <a href="/posts/delete/${post._id}" id="delete-post" >Delete post</a>
        </li>`)
    }


    let deletePost=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    postId=data.data.postId;
                    $(`#post-${postId}`).remove();
                },
                error:function(err){
                    console.log("Error",err.responseText)
                }
            });
        });
    }
}

createNewPost();