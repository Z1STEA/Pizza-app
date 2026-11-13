
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { pizzaData } from "./data";

// Header component
function Header(props) {

  // Create an empty variable to store the tagline
  let tagline = "";

  // Check if the pizza shop is open
  if (props.isOpen === true) {
    // Display the tagline if the shop is open
    tagline = <p>Authentic Italian Cuisine</p>;
  }

  // Display the shop name and tagline
  return (
    <div>
      <h1>ANDY'S PIZZA CO.</h1>
      {tagline}
    </div>
  );
}

// Pizza component
function Pizza(props) {

  // Get the pizza price and add a dollar sign
  let price = "$" + props.price.toFixed(2);

  // Give the pizza its normal CSS class
  let className = "pizza";

  // Create an empty variable for the badge
  let badge = "";

  // Check if the pizza is popular
  if (props.isPopular === true) {
    // Display the Chef's Pick badge
    badge = <span className="badge">Chef's Pick</span>;
  }

  // Check if the pizza is sold out
  if (props.soldOut === true) {
    // Change the price to SOLD OUT
    price = "SOLD OUT";

    // Remove the Chef's Pick badge
    badge = "";

    // Change the CSS class for sold-out pizzas
    className = "pizza sold-out";
  }

  // Display the pizza information
  return (
    <div className={className}>
      <img src={props.photoName} alt={props.name} />

      <div>
        <h3>{props.name}</h3>

        {badge}

        <p>{props.ingredients}</p>
        <p>{price}</p>
      </div>
    </div>
  );
}

// Menu component
function Menu() {

  // Count how many pizzas are in the array
  let numOfPizzas = pizzaData.length;

  return (
    <div className="menu">
      <h2>OUR MENU</h2>

      {numOfPizzas > 0 ? (
        <div className="pizzas">

          {pizzaData.map(function (pizza) {
            return (
              <Pizza
                name={pizza.name}
                ingredients={pizza.ingredients}
                price={pizza.price}
                photoName={pizza.photoName}
                soldOut={pizza.soldOut}
                isPopular={pizza.isPopular}
              />
            );
          })}

        </div>
      ) : (
        <p>We're still working on our menu. Please come back later :)</p>
      )}

    </div>
  );
}

// Order component
function Order() {

  // Display the message and Order button
  return (
    <div>
      <p>We're open until 22:00. Come visit us or order online.</p>
      <button>Order</button>
    </div>
  );
}

// Footer component
function Footer(props) {

  // Create an empty variable to store the message
  let message = "";

  // Check if the shop is open
  if (props.isOpen === true) {

    // Display the Order component
    message = <Order />;

  } else {

    // Display this message if the shop is closed
    message = <p>we're happy to welcome you between 10:00 and 22:00</p>;
  }

  // Display the message in the footer
  return (
    <div>
      {message}
    </div>
  );
}

// App component
function App() {

  // Get the current hour using the computer's time
  let currentHour = new Date().getHours();

  // Assume the shop is closed first
  let isOpen = false;

  // Check if the time is between 10 AM and 10 PM
  if (currentHour >= 10 && currentHour < 22) {

    // Change isOpen to true if the shop is open
    isOpen = true;
  }

  // Display all the components
  return (
    <div className="container">
      <Header isOpen={isOpen} />
      <Menu />
      <Footer isOpen={isOpen} />
    </div>
  );
}

// Create the React root using the HTML element with the id "root"
const root = ReactDOM.createRoot(
  document.getElementById("root")
);

// Display the App component on the webpage
root.render(<App />);