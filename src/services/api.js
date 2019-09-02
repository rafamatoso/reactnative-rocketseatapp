// interface para enviar ou consumir dados externos
import axios from 'axios';

// cria uma instância do axios onde podemos definir uma base url, de onde todas as urls vão partir
const api = axios.create({
  baseURL: 'https://rocketseat-node.herokuapp.com/api',
});

export default api;
