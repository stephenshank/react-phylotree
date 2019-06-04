import React from "react";
import renderer from "react-test-renderer";
import { phylotree } from "phylotree";

import Phylotree from "phylotree.jsx";
import { yokoyama } from "./data.js";


it('base phylotree renders correctly', () => {
  const tree = new phylotree(yokoyama),
    base_tree = renderer
      .create(<Phylotree tree={tree} />)
      .toJSON();
  expect(base_tree).toMatchSnapshot();
});
