import React, { Component } from 'react';
import { createContext } from 'react';
import axios from 'axios';

export const ImageContext = createContext()

class ImageContextProvider extends Component {
    queryImgs =  async () =>{
        let res = await axios.get('http://localhost:3003/api/images/url')
        let imgs = res.data 
        this.setState({ imgs })
    }
    state = { 
        imgs:[]
     }
    render() { 
        return ( 
            <ImageContext.Provider value={{...this.state, queryImgs:this.queryImgs}}>
                {this.props.children}
            </ImageContext.Provider>
         );
    }
}
 
export default ImageContextProvider;