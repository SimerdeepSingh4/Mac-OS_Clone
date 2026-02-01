import React from 'react'
import MacWindow from './MacWindow'
import githubData from "../../assets/github.json"
import "./github.scss"


const GitCard = ({ data = { id: 1, image: "", title: "", description: "", tags: [], repoLink: "", demoLink: "" } }) => {
    return <div className="card">
        <img src={data.image} alt="" />
        <h1>{data.title}</h1>
        <p className='description'>{data.description}</p>

        <div className="tags">
            {data.tags.map(tag => <p className='tag' key={tag}>{tag}</p>)}
        </div>
        <div className='urls'>
            <a href={data.repoLink} target="_blank" rel="noreferrer">Repository</a>
            {data.demoLink && <a href={data.demoLink} target="_blank" rel="noreferrer">Demo link</a>}

        </div>
    </div>
}


const Github = ({windowName, setWindowState, windowProps}) => {
    return (
        <MacWindow windowName={windowName} setWindowState={setWindowState} windowProps={windowProps}>
            <div className='cards'>
                {githubData.map(project => {
                    return <GitCard key={project.id} data={project}/>
                })}
            </div>
        </MacWindow>
    )
} 

export default Github