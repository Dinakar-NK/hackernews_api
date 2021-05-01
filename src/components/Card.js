import React from 'react'
import {withRouter} from 'react-router-dom'

const Card = ({id,title, time, commentsCount, history}) => {
    let date = new Date(time).toLocaleDateString()
    return (
        <div className="cardContainer" onClick={() => history.push(`/details/${id}`)}>
            <span><i className="far fa-comment-dots" style={{marginRight:5}}></i>{commentsCount}</span>        
            {/* <span><i className="far fa-calendar-alt" style={{marginRight:5, marginLeft:30}}></i>{date}</span>                     */}
            <h3>{title}</h3>
        </div>
    )
}

export default withRouter(Card)
