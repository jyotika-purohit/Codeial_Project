 
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
        return $(`<li id="comment-${comment._id}" class="comment" >
            <p style="color: orangered;display: inline-block;">${comment.content}</p>
            <p style="color: lime;display: inline-block;">${comment.user.name}</p>
             <a href="/comments/delete/${comment._id}" class="delete-comment" >Delete Comment</a>
        </li>`);
    }


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    console.log(data);
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

}

