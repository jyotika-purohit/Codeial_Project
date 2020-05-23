{
    let createComment=function(){
        newCommentForm=$('#new-comment-form')
        newCommentForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/comments/create',
                data:newCommentForm.serialize(),
                success:function(data){
                    newComment=newCommentDOM(data.data.comment);
                    console.log(data);
                    $('#comment-container>ul').prepend(newComment);
                    
                },
                error:function(error){
                    console.log("Error",error.responseText);
                }
            })
        });
    }

    let newCommentDOM=function(comment){
        return $(`<li id="comment-${comment._id}">
            <p style="color: orangered;display: inline-block;">${comment.content}</p>
            <p style="color: lime;display: inline-block;">${comment.user.name}</p>
             <a href="/comments/delete/${comment._id}" class="delete-comment" >Delete Comment</a>
        </li>`);
    }

    createComment();
}