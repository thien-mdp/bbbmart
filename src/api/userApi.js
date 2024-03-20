import axiosClient from './axiosClient'
const UserApi = {

  async getAuth() {
    const url = '/connect/token'
    const article = `scope=PublicApi.Access&grant_type=client_credentials&client_id=9b12a992-59ff-42e0-a085-a455e9cac06e&client_secret=8A3FAD40A6EE80C2AEED2B8191A407AA3E3B8B02`;
    return axiosClient.post(url, article)
  }
}

export default UserApi;