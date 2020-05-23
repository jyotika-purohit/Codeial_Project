{
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
                    deletePost($(' .delete-post',newPost));
                },error:function(err){
                    console.log("Error",err.responseText)
                }
            }
        )
    });

    }

    let newPostDOM=function(post){
        return $(`
        <li class="post" id="post-${post._id}" >
                <p style="display: inline-block;" >${post.content}</p>
                <p  style="display: inline-block;font-weight: bolder;" >${post.user.name}</p>
                <a href="/posts/delete/${post._id}" class="delete-post" >Delete post</a>

            <div id="comment-container">
                    <form action="/comments/create" method="POST" id="new-${post._id}-comment-form" >
                            <input type="text" name="content" placeholder="Add comment .." required>

                            <input type="hidden" name="user" value="${post.user._id}" >
                            <input type="hidden" name="post" value="${post._id}" >
                            
                            <button type="submit">Add Comment</button>
                    </form>

                    <ul id="post-comments-${post._id}" ></ul>
            </div>
        </li>

        `)
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


  
    
let convertPostsToAjax = function(){
    const AllDeletePostButtons=$('.delete-post');
        for(i=0;i<AllDeletePostButtons.length;i++){

            deletePost($(AllDeletePostButtons.eq(i)));

        }
    $('#posts-container>ul>li').each(function(){
        let self = $(this);
        // let deleteButton = $(' .delete-post', self);
        // deletePost(deleteButton);

        // get the post's id by splitting the id attribute
        let postId = self.prop('id').split("-")[1]
        new PostComments(postId);
    });
}

createNewPost();
convertPostsToAjax();


}