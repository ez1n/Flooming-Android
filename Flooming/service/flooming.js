import axios from 'axios';

class Flooming {
  constructor() {
    this.flooming = axios.create({
      baseURL: 'http://flooming.link/',
    });
  }

  // 이미지 전송
  async postImage() {
    const response = await this.flooming.post('/', {

    });
    return response;
  }
}

export default Flooming;