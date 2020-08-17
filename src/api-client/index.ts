import {BlobStroageClient } from './client';

// const apiUrl = 'https://api-dev-speed.chinacloudsites.cn';
const apiUrl = 'https://localhost:44314';
const blobStroageClient = new BlobStroageClient(apiUrl);

const API = {
  blobStroageClient
};

export default API;
