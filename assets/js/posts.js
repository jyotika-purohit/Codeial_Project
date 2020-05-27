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
                    $('#post-ul').prepend(newPost);
                    deletePost($(' .delete-post',newPost));
                    new PostComments(data.data.post._id);
                    deleteOptionToggle(newPost);
                    likePost(newPost);

                    new Noty({
                        theme:'relax',
                        text:"Post published!",
                        type:'success',
                        layout:'topRight',
                        timeout:1500
                    }).show();

                },error:function(err){
                    console.log("Error",err.responseText)
                }
            }
        )
    });

    }

    let newPostDOM=function(post){

        return $(`<li class="post" id="post-${post._id}">
        <a href="/likes/toggle/Post,${post._id}" class="post-like-Btn"> <span class="count">${post.likes.length}</span>Likes</a>
                    <div class="username-delete-container">
                        <div>

                        <div class="user-avatar-posts" style="padding: 1px;">
                            
                                <img src="${post.user.avatar}" alt="${post.user.name}" height="100%" width="100%" style="border-radius: 50%;">
                            
                        </div>
                        
                            <h5 class="post-username">${ post.user.name}</h5>
                        </div>
                            <div class="post-delete-option">
                                <i class="fa fa-ellipsis-h"></i>
                                
                                <a href="/posts/delete/${post._id}" class="delete-post delete-post-${post._id}" >Delete post</a>
                            </div>
                    </div>
                    <p class="post-content">${post.content}</p>
                <div id="comment-container">
                        <div class="hr"></div>
                        <form action="/comments/create" method="POST" id="new-${post._id}-comment-form" class="new-comment-form">
                            <input type="text" name="content" placeholder="Add comment as ${post.user.name } .." required>
                            <input type="hidden" name="user" value="${post.user._id}" >
                            <input type="hidden" name="post" value="${post._id}" >

                            <button type="submit">Add Comment</button>
                        </form>
                        <ul id="post-comments-${post._id}" >

                        </ul>
                </div>
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

                    new Noty({
                        theme:'relax',
                        text:"Post deleted",
                        type:'success',
                        layout:'topRight',
                        timeout:1500
                    }).show();


                },
                error:function(err){
                    console.log("Error",err.responseText)
                }
            });
        });
    }


    let deleteOptionToggle=function(post){
            let post_Id=(post.prop('id').split("-")[1]);
            let ellipse=$(" .delete-post",post).prev();

            let deleteBtn=$(`.delete-post-${post_Id}`);
            ellipse.click(function(e){
               
                if(deleteBtn.css('display')=='block'){
                    deleteBtn.css({
                        'display':'none'
                    })
                }else{
                    deleteBtn.css({
                        'display':'block'
                    });
                }
            });
    }

    //DELETE COMMENT TOGGLE
    let deleteOptionCommentToggle=function(comment){
        let comment_Id=(comment.prop('id').split("-")[1]);
        let ellipse=$(" .delete-comment",comment).prev();

        let deleteBtn=$(" .delete-comment",comment);
        ellipse.click(function(e){
           
            if(deleteBtn.css('display')=='block'){
                deleteBtn.css({
                    'display':'none'
                })
            }else{
                deleteBtn.css({
                    'display':'block'
                });
            }
        });
    }

    let likePost=function(post){
        let likeBtn=$(' .post-like-Btn',post);
         
        likeBtn.click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:likeBtn.prop('href'),
                success:function(data){
                    let deleted=data.data.deleted;
                    let currCount=$(' .count',likeBtn);
                    let countSpan=$(' .count',likeBtn)
                    let count=parseInt(countSpan.html());
                    let newCount;
                    let text;
                    if(deleted==false){
                        newCount=count+1;
                        text="Post Liked";
                    }else{
                        newCount=count-1;
                        text="Post Unliked"
                    }
                    countSpan.html(newCount);
                    
                    new Noty({
                        theme:'relax',
                        text:text,
                        type:'success',
                        layout:'topRight',
                        timeout:1500
                    }).show();

                },
                error:function(error){
                    console.log(error.responseText);
                }
            })

        })
    }

    let likeComment=function(comment){
        
        let likeBtn=$(' .comment-like-Btn',comment);
        
        likeBtn.click(function(e){
            e.preventDefault();
            
            $.ajax({
                type:'get',
                url:likeBtn.prop('href'),
                success:function(data){
                    let deleted=data.data.deleted;
                    let currCount=$(' .count',likeBtn);
                    let countSpan=$(' .count',likeBtn)
                    let count=parseInt(countSpan.html());
                    let newCount;
                    let text;
                    if(deleted==false){
                        // console.log("FALSE",currCount);
                        newCount=count+1;
                        text="Comment Liked";
                    }else{
                        // console.log("TRUE",currCount);
                        newCount=count-1;
                        text="Comment Unliked"
                    }
                    countSpan.html(newCount);
                    
                    new Noty({
                        theme:'relax',
                        text:text,
                        type:'success',
                        layout:'topRight',
                        timeout:1500
                    }).show();

                },
                error:function(error){
                    console.log(error.responseText);
                }
            })

        })
    }

  
    
    let convertPostsToAjax = function(){
        
        $('#posts-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post', self);
            deletePost(deleteButton);
            deleteOptionToggle(self);
            likePost(self);
            
            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);


            $(' .comment',self).each(function(){
                let self=$(this);

                deleteOptionCommentToggle(self);
                likeComment(self);
                // likeComment(self);

            });

        });
    }

    

createNewPost();
convertPostsToAjax();


}