import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div>
        <h1>Hello</h1>

            <h3 className="text-justify">Welcome to our Daily Calories App which will allow you to check your recommended Total Metabolism Rate aganist all the products that you eat during a day.</h3>
            <hr />
            <p>To use it properly you need to:</p>
            <ul>
                <li>Register or login to already created account in <a href='/Identity/Account/Login'>Login Panel</a></li>
                <li>Fill out all your data in <a href='/user-data'>User Data Panel</a></li>
                <li>Provide information about your daily products in <a href='/daily-products'>Daily ProductsPanel</a></li>
                </ul>
      </div>
    );
  }
}
