import logo from './logo.svg';
import './App.css';
import Card from './components/card';
import React from 'react';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      changeName : "bob"
    };

    this.do_change();


  }

  do_change = () => {
    let counter = 0;
    setInterval(() => {
      counter++;
      if((counter %2) == 0){
        this.setState({changeName : "bob"});
      }else{
        this.setState({changeName : "tom"})
      }
    },2000);
  }


 
  render(){
  
  let myBool = false;
  return (
   <div>
      <h1 className="app-title">
        My Contact App
    </h1>
    <hr></hr>
    <div className="contact-holder">
      <Card name="andrew" phone="7275555555" website="example.com" email="email@email.com" />
      <Card name={this.state.changeName} phone="555-555-5555" website="example website" email="email2@email.com" />
    </div>

   </div>
  );
  }
}

export default App;
