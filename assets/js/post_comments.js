
class PostComments{
        // constructor is used to initialize the instance of the class whenever a new instance is created
        constructor(postId){
            
            this.postId = postId;
            this.postContainer = $(`#post-${postId}`);
            this.newCommentForm=$(`#new-${postId}-comment-form`);    
            this.createComment(postId);
            
            let self = this;
            // call for all the existing comments
            $(' .delete-comment', this.postContainer).each(function(){
                self.deleteComment($(this));
                
            });


        }
   createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self=this;
            $.ajax({
                type:'post',
                url:'/comments/create',
                data:$(self).serialize(),
                success:function(data){
                    // let postId=data.data.postId;
                    let newComment=pSelf.newCommentDOM(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    
                    pSelf.deleteComment(' .delete-comment',newComment);
                    pSelf.deleteOptionCommentToggle(newComment);
                    pSelf.likeComment(newComment);
                    
                    new Noty({
                        theme:'relax',
                        text:"Comment published!",
                        type:'success',
                        layout:'topRight',
                        timeout:1500
                    }).show();

                }, 
                error:function(error){
                    console.log("Error",error.responseText);
                }
            })
        });
    }

    newCommentDOM(comment){
       

        return $(`<li  id="comment-${comment._id}" class="comment">
        <a href="/likes/toggle/Comment,${comment._id}" class="comment-like-Btn"> <span class="count">${comment.likes.length}</span>Likes</a>
                        <div class="user-avatar-comments">
                        <img src="${comment.user.avatar}" alt="${comment.user.name}" height="100%" width="100%" style="border-radius: 50%;">
                        </div>
                        
                    <div class="username-content-container">
                        <p class="comment-username">${comment.user.name}</p>
                        <p class="comment-content">${comment.content}</p>
                    </div>
                    <div class="comment-delete-option">
                        <i class="fa fa-ellipsis-h"></i>
                        <a href="/comments/delete/${comment._id}" class="delete-comment">Delete Comment</a>
                    </div>

                </li>`)
        }


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    // console.log(data);
                    let commentId=data.data.commentId
                    $(`#comment-${commentId}`).remove();

                    new Noty({
                        theme:'relax',
                        text:"Comment deleted",
                        type:'success',
                        layout:'topRight',
                        timeout:1500
                    }).show();


                },error:function(error){
                    console.log(error.responseText);
                }
            })

        });
    }

    deleteOptionCommentToggle(comment){
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

    likeComment(comment){
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

}

