import React from 'react'
import { Input, Button } from 'antd';
import axios from 'axios' ;


export default class AzureBlob extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            containerName: ''
        }
    }
    changeContainerName = (e) => {
        const containerName = e.target.value
        this.setState({
            containerName: containerName
        })
    }
    createBlobContainer = () => {
        let url="https://localhost:44314/api/BlobStroage/create"
        let params={containerName: this.state.containerName}
        console.log(params)
        axios.post(url,params)
        .then(function (response) {
            let data =response.data
            alert(data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    render(){
        return (
            <div>
                <Input placeholder="container name" onChange={this.changeContainerName}/>
                <Button type="primary" onClick={this.createBlobContainer}>Primary Button</Button>
            </div>
        )
    }
}