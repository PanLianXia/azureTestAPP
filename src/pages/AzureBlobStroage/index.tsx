import React, { FC, useState, ChangeEvent, useEffect } from 'react';
import { Form, Button, Input, Row, Col } from 'antd';
import { history } from 'umi';
import API from '@/api-client';

import styles from './style.less';

const AzureBlobStroage: FC = (props) => 
{
    const [state, setState] = useState({containerName: ''});
    const [containerList, setContainerList] = useState<string[]>([])
   

    const changeContainerName = (e: ChangeEvent<HTMLInputElement>) => {
        setState(() =>({containerName: e.target.value}))
    }
    const getContainerList = async () => {
        const allContainerList = await API.blobStroageClient.searchContainer()
        setContainerList (allContainerList)
    }
    const createBlobContainer = async () => {
        try {
            await API.blobStroageClient.createBlobContainer(state.containerName)
            getContainerList()
        }
        catch(error) {
            console.log(error)
        }
    }

    const toBlobList = (container:string) => {
        return( )=> {
            history.push(`/blob/list/${container}`)
        } 
    }

   // 初始化
    useEffect(() => {
        getContainerList();
    }, []);
  
  return (
    <div className="App">
        <Form name="horizontal_login" layout="inline">
        <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input placeholder="container name" size="large" value={state.containerName} onChange={changeContainerName} />
        </Form.Item>
        <Form.Item>
            <Button type="primary" size="large" onClick={createBlobContainer}>Add</Button>
        </Form.Item>
        </Form>
        <div className={styles.blobContainer}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={styles.containerRow}>
                {
                    containerList.map((container) => {
                        return (
                            <Col key={container} className="gutter-row" span={6} onClick={toBlobList(container)}>
                                <div className={styles.containerCol}>{container}</div>
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
  </div>
)};

export default AzureBlobStroage;