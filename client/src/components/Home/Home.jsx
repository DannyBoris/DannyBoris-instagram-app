import React, { Component } from 'react';
import {ImageContext} from '../../contexts/ImageContext'
import male from '../../male.jpg'
import './home.css'
class Home extends Component {
    
    static contextType = ImageContext
    
    componentDidMount = async ()=>{
        let imgsToRender = null
        let cachedImages = await localStorage.getItem('homeImages')
        
        if(!cachedImages){
            await this.context.queryImgs()
            localStorage.setItem('homeImages', JSON.stringify(this.context.imgs))
            imgsToRender = this.context.imgs
        }
        else imgsToRender = JSON.parse(cachedImages)

        this.setState({
            loading:false,
            imgsToRender
        })
      
    }
   showImages=(imgs)=>{
    return imgs.map((img,i)=><img key={img._id} className={`collection-img img-${i}`} src={img.url} alt="x"/>)

   }
        
    state = { 
        counter:0,
        loading:true,
        imgsToRender:[]
     }
    render() { 
        return ( 
            
            <div className="home">
                <div className={`main-container `}>
                <div className="title-container">
                     <h1 className="title">One Photo Worth <span onClick={this.startCounter} className="counter">{this.state.counter}</span> Words.</h1>
                </div>
                <div  className= "collection" >
                    {/* {this.showImages(this.state.imgsToRender)} */}
                    <img className="img female" src='https://res.cloudinary.com/dppogsm2u/image/upload/v1586074482/home-bg_qvw3vj.jpg' alt=""/>
                    <img className="img male" src={male} alt=""/>
                </div>
                </div>
             
            </div>
         );
    }
}
 
export default Home;