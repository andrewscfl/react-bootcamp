import logo from './logo.svg';
import './App.css';
import Card from './components/card';
import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      apiResponse: {},
      input_name: "",
      input_email: "",
      input_phone: "",
      post_confirm : false
    };

    (async () => {
      let response = await fetch('http://localhost:5001/getAll');
      let response_json = await response.json();
      this.setState({ loaded: true });
      this.setState({ apiResponse: response_json });
      console.log(response_json);

    })();

  }

  render_helper = () => {
    if (this.state.apiResponse.hasOwnProperty('success')) {
      //this code runs if api call was successful and we have the response in this.state.apiResponse
      const mapped_cards = this.state.apiResponse.data.map((item) => {
        return <Card name={item.name} phone={item.phone} website="example.com" email={item.email} />
      });
      return <div>{mapped_cards}</div>;


      //end if block
    } else {
      return <div>content not loaded</div>;
    }
  };

  input_form_helper = () => {
    (async () => {
      let response = await fetch("http://localhost:5001/post", {
        method: "POST",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contact_name : this.state.input_name,
          phone : this.state.input_phone,
          address : "",
          email : this.state.input_email
        })
      });

      let parsed_response = await response.json();
      if(parsed_response.success){
        this.setState({post_confirm : true});
      }




    })();

  };


  post_confirmation = () => {
    if(this.state.post_confirm){
      return <div>POSTED SUCCESSFULLY RELOAD TO SEE CHANGES</div>
    }
    else{
      return <div></div>;
    }
  }



  input_form = () => {
    return (
      <div>

        <p>name</p>
        <input type="text" value={this.state.input_name}
          onChange={(e) => this.setState({ input_name: e.target.value })}
        />
        <p>phone</p>
        <input type="text" value={this.state.input_phone}
          onChange={(e) => this.setState({ input_phone: e.target.value })}
        />
        <p>email</p>
        <input type="text" value={this.state.input_email}
          onChange={(e) => this.setState({ input_email: e.target.value })}
        />

        <button onClick={() => this.input_form_helper() }>send to server</button>

      </div>
    );
  };




  render() {

    let myBool = false;
    return (
      <div>
        <h1 className="app-title">
          My Contact App
    </h1>
        <hr></hr>
        <div className="contact-holder">
          {this.render_helper()}
          {this.input_form()}
          {this.state.post_confirm ? <div>data inserted</div> : <div></div>}
        </div>

      </div>
    );
  }
}

export default App;
