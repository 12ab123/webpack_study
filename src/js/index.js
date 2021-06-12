/*汇总*/
/*
    该index不同于学习模块化时,用于汇总js的文件
    模块化技术的index只用于汇总各个js模块
    该index是webpack的入口
    该文件可以用于汇总: js,css,json,图片,音频
 */
// import '@babel/polyfill'            //包含ES6的高级语法的转换
import {sum} from './module1'
import {sub} from './module2'
import module3 from './module3'
import a from '../json/text'        //引入json文件(webpack可以打包编译json和js文件)
import '../css/index.less'          //引入样式,不用变量接,不用写from
import '../css/iconfont.less'        //引入图标字体样式


console.log(sum(1, 2));
console.log(sub(1, 2));
console.log(module3.div(1, 2));
console.log(module3.ul(1, 2));
console.log(a,typeof a)



//webpack只管翻译es6的模块语法变为浏览器认识的,但是不会处理其他新语法
setTimeout(()=>{
    console.log('定时器到点了');
},2000)



console.log(1)


let name=10

console.log(`我今年${name}岁`);
new Promise((resolve)=>{
    resolve(123)
}).then(value => console.log(value))

Promise()


