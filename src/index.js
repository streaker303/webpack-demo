import './styles/style.css';
import logo from './assets/1.png';

function createImage() {
  const img = document.createElement('img');
  img.src = logo;
  document.body.appendChild(img);
}

// 创建标题
function createTitle() {
  const h1 = document.createElement('h1');
  h1.innerText = 'Hello, Webpack with HMR!';
  document.body.appendChild(h1);
}

createTitle();
createImage();
console.log('Webpack 基础 Demo 启动成功');

// 按需加载 lazyModule.js
document.getElementById('btn').addEventListener('click', () => {
  import('./lazyModule.js').then((module) => {
    module.default();
  });
});