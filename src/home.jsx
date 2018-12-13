import React from "react";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAmountDown } from "@fortawesome/free-solid-svg-icons";

library.add(faSortAmountDown);


function Home() {
  return (<div>
    <h1>Homepage</h1>
    With font awesome: <FontAwesomeIcon icon="sort-amount-down" />
  </div>);
}

export default Home;

