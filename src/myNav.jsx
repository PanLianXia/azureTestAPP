import React from 'react'

export default class MyNav extends React.Component {
    
    render() {
        return (
            <ul>
                { 
                    this.props.nav.map((element,index) => {
                        return <li key={index}>{element}------{index}</li>
                    })
                }
            </ul>
        )
    }
}