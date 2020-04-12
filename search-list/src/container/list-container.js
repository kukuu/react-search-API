import React from 'react';
import autoBind from 'react-autobind';
import List from '../component/list.js';


let products=['1211567  R65 James white', '151321 R98  Jake Jones', '171145 R105 Beaver Foster', 
'201324 R44 Jake Stocks', '459789 R201  Marian James-white', '456985  R99 Alexander Hooks',
'456907 R85 Alexander White', '100456 R31 Tom  Stones','219678 R28 Steve Bruce','163000 R12  Mason white', '157008   R01 Jake Peters', '178123 R55 Trend Foster', 
'204887 R38 Jake Trevor', '89457 R93  Arlene Trevor', '600879 R300 Henry Fort',
'458432 R302 Fort Jacobson', '78234 R303 Tom  England','34980 R304 England Francis',
'12900567  R305 James white', '151987321 R306   Jake Jones', '1711876445 R307 Beaver Foster', 
'201332324 R654 Jake Stocks', '459908789 R657  Marian James-white', '4562134985 R659 Alexander Hooks',
'456902217 Alexander White', '100675456 Tom  Stones','219643978 Steve Bruce','163000555  Mason white', '157090808   Jake Peters', '178121023 Trend Foster', 
'204886707 R700 Jake Trevor', '89454537 R701 Arlene Trevor', '600877779  R702 Henry Fort',
'458435582 R703 Fort Jacobson', '78277034 R704 Tom  England','34980 R900 England Francis654'];


class ListContainer extends React.Component{
    constructor(){
        super();
        this.state={
            input:""
        }
        autoBind(this);
    }
  handleChange(event){
    this.setState({
        input:event.target.value
    });
  }
   
    render(){
        let filterProducts=products.filter(word =>{
          if(word.toLowerCase().indexOf(this.state.input.toLowerCase())!==-1){
              return true;
          }
        });
        
        return(
            <List products={filterProducts} input={this.state.input} handleChange={this.handleChange}></List>
        )
    }
}

export default ListContainer;
