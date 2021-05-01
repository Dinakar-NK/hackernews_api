import React, {useState, useEffect} from 'react'
import Card from './Card'
import axios from 'axios'

const Stories = (props) => {

    const [storiesIdList, setStoriesIdList] = useState([])
    const [storyDataList, setStoryDataList] = useState([])

    const newStoryList = [
        {
            id:26998239,
            title: "'It's your device, you should be able to repair it'",
            time: 1619792409,
            commentsCount: 141        
        },
        {
            id:26987939,
            title: "A serverless email server on AWS using S3 and SES",
            time: 1619787167,
            commentsCount: 165
        }
    ]
    
    
    useEffect(() => {        
        axios.get(`https://hacker-news.firebaseio.com/v0/${props.storyType}stories.json`)
            .then((res) => {
                const idList = res.data
                const storyDataDummyList = []
                 setStoriesIdList(idList)                 
                 idList.map((item, index) => {
                        if(index < 25){                         
                            axios.get(`https://hacker-news.firebaseio.com/v0/item/${item}.json`)
                            .then((response) => {
                                if(response.data){
    
                                    const {title, time, descendants, id} = response.data
                                    const storyData = {
                                        id,
                                        title,
                                        time,
                                        commentsCount:descendants
                                        }                                
                                        // storyDataDummyList.push(storyData)
                                        setStoryDataList(prev => [...prev,storyData])
                                    }
                                })
                                .catch((err) => {
                                    console.log('err in item req: ', err);
                                })                            
                        }
                    })                    

                    })
                    .catch((err) => {
                        console.log('err in story id req: ', err);
                    })

    },[])
    
    return (
        <div>
            {
                storyDataList.map((item,index) => <Card key={index} id={item.id} title={item.title} time={item.time} commentsCount={item.commentsCount}  />)
            }
        </div>
    )
}

export default Stories
