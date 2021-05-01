import React from 'react'

const CommentCard = ({by,text,time}) => {
    let date = new Date(time).toLocaleDateString()
    return (
        <div className="commentCardConatiner">
            <p style={{color:'rgb(94, 94, 94)', fontSize:18}}>{text}</p>
            <div className="commentCardAuthor">
            <p>-by {by} </p>
            </div>
        </div>
    )
}

export default CommentCard
