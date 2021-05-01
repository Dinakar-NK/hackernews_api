import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CommentCard from './CommentCard'

const StoryDetails = (props) => {
    const id = props.match.params.id

    const [basicDetails, setBasicDetails] = useState({
        by:'',
        kids:[],
        title:'',
        time:'',
        url:''
    })

    const [commentsList, setCommentsList] = useState([])
    const [fetchData, setFetchData] = useState(true)
    const myCommentList = [
        {
            commentBy: 'vinay_ys',
            commentText: 'I did exactly this 15 years ago. I was a C++ developer and there was no golang around yet. And Bind had fresh security bugs every month. So the easiest and safest thing I could do was use djbdns (tinydns) with its cdb files being recompiled whenever records had to be added or updated.',
            commentTime: 1619763718,            
        },
        {
            commentBy: 'nreece',
            commentText: 'Curious to know if anyone&#x27;s hosting real-world production web apps or APIs on replit, or is it mainly an educational platform?',
            commentTime: 1619741248,            
        }
    ]

    const {by, kids, title, time, url} = basicDetails
    let date = new Date(time).toLocaleDateString()
    
    useEffect(() => {
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
             .then(res => {
                const {by, kids, title, time, url} = res.data;
                setBasicDetails({by, kids, title, time, url})
                return(kids)
             })
             .then((commentsID) => {
                 if(commentsID && fetchData == true){
                     setFetchData(false);
                    const commentDummyList = []
                    commentsID.map(cid => {
                        axios.get(`https://hacker-news.firebaseio.com/v0/item/${cid}.json`)
                             .then(response => {
                                const {by, text, time} = response.data 
                                const commentData = {
                                    commentBy: by,
                                    commentText:text,
                                    commentTime:time
                                }                                
                                // commentDummyList.push(commentData)
                                setCommentsList(prev => [...prev, commentData])                                
                             })
                             .catch(err => {
                                console.log('err in comment req: ', err);
                            })
                    })
                    // console.log('commentDummyList: ', commentDummyList);
                    
                 }
             })
             .catch(err => {
                 console.log('err in detail req: ', err);
             })
    },[])

    return (
        <div className="detailsContainer">
            <h1>{title}</h1>
            <span>From {by}</span>     
            <a href={url} target="_blank" style={{textDecoration:'none'}}>
                <button className="gotoBtn">
                    Go to the Feed
                </button>       
            </a>
            {/* <span><i className="far fa-calendar-alt" style={{marginRight:5, marginLeft:30}}></i>{date}</span> */}
            
            {
                commentsList.length == 0 ? <h2 style={{marginTop:50,textAlign:'center',color:'grey'}}>No Comments Available</h2>
                                         : (
                                            <>
                                            <h3 style={{marginTop:70}}>Comments</h3>
                                            {commentsList.map((item,index) => <CommentCard key={index} text={item.commentText} by={item.commentBy} time={item.commentTime}/>) }
                                            </>
                                            )
            }
        </div>
    )
}

export default StoryDetails
