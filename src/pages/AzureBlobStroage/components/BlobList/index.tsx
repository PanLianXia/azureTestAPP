import React,{ FC, useEffect, useState } from "react";
import { Table, Space, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import API from "@/api-client";
import { history } from 'umi';
import { SearchBlobResultModel } from "@/api-client/client";
import { exportXlsx } from '@/utils/utils'
import moment from "moment";

import styles from './style.less';

const BlobList: FC = (props) => 
{
    const [data, setData] = useState<SearchBlobResultModel[]>([]);
    const containerName: object = {containerName: props.match.params.id}
    const downLoadBlobFile = async (blobName: string) => {
        const downloadResult = await API.blobStroageClient.downBlobFile(props.match.params.id,blobName)
        console.log(downloadResult)
    }
    const deleteBlobFile = async (blobName: string) => {
        await API.blobStroageClient.deleteBlobFile(props.match.params.id,blobName)
    }
    const columns = [
        {
          title: 'Name',
          dataIndex: 'blobName',
          key: 'blobName',
        },
        {
          title: 'Blob Type',
          dataIndex: 'blobType',
          key: 'blobType',
        },
        {
          title: 'Content Type',
          dataIndex: 'contentType',
          key: 'contentType',
        },
        {
            title: 'Create On',
            dataIndex: 'createOn',
            key: 'createOn',
            render: (text: Date) => (
                moment(text).format('YYYY-MM-DD HH:mm')
            ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a onClick={() => downLoadBlobFile(record.blobName)}>Download</a>
              <a onClick={() => deleteBlobFile(record.blobName)}>Delete</a>
            </Space>
          ),
        },
      ];
    const getBlobList = async () => {
        const blobList =  await API.blobStroageClient.searchBlob(props.match.params.id)
        setData(blobList)
    }

    const toContainerList = () => {
        return( )=> {
            history.push('/container/list')
        } 
    }

    const uploadToBlob = async (info: any) => {
        if (info.file.status === 'done') {
            await getBlobList();
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    // const previewFile = (file) => {
    //     console.log('Your upload file:', file);
    //     // Your process logic. Here we just mock to the same file
    //     return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
    //       method: 'POST',
    //       body: file,
    //     })
    //       .then(res => res.json())
    //       .then(({ thumbnail }) => thumbnail);
    // }

    // 初始化
    useEffect(() => {
        getBlobList();
    }, []);

   

    return (
        <div>
            <div className={styles.backBtn}>
                <Button type="primary" onClick={toContainerList()}>Back</Button>
                <Upload onChange={uploadToBlob} action="https://localhost:44314/api/BlobStroage/upload-blob-file" data={containerName}>
                {/* <Upload onChange={uploadToBlob} > */}
                    <Button>
                        <UploadOutlined /> Click to Upload
                    </Button>
                </Upload>
            </div>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}
export default BlobList