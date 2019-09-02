import React from 'react';
import Routes from './routes';
// importar o arquivo que configura a cor da Barra de Status do Android e Iphone
import './config/StatusBarConfig';

/*class App extends Component {
    render() {
        return <Routes />
    }
} */

/* O trecho de código acima representa a mesma coisa que o trecho abaixo, com exceção que 
ao extender Component, o trecho acima pode acessar algumas funções a mais. */
const App = () => <Routes />;

// TOdo componente deve ser exportado dentro de seu arquivo
export default App;
