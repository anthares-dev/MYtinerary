//not used

import React from "react";

const QuoteList = ({ quotes }) =>
  quotes.map(quote => (
    <li key={quote._id}>
      NAME: {quote.name}, COUNTRY: {quote.country}
    </li>
  ));

export default QuoteList;
