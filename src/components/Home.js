import React, {useState} from 'react'
import BestStories from './BestStories'
import './homeStyles.css'
import NewStories from './NewStories'
import TopStories from './TopStories'

const Home = () => {

    const [story, setStory] = useState('Top')

    const renderStoryType = () => {
        if(story === "New")
            return <NewStories />
        else if(story === "Top" )
            return <TopStories />
        else 
            return <BestStories />
    }

    return (
        <div className="homeContainer">
            <div className="storyCategories">
                <button className={story === "Top" ? "btnSelected" : "btn"}  onClick={() => setStory("Top")}>Top Stories</button>
                <button className={story === "New" ? "btnSelected" : "btn"}  onClick={() => setStory("New")}>New Stories</button>
                <button className={story === "Best" ? "btnSelected" : "btn"}  onClick={() => setStory("Best")}>Best Stories</button>

                <div className="storyList">
                    <h1>{story} stories</h1>
                    {renderStoryType()}
                </div>
            </div>
        </div>
    )
}

export default Home
