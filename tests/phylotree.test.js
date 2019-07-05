import React from "react";
import renderer from "react-test-renderer";

import MWE from "app/mwe.jsx";
import Vanilla from "app/vanilla.jsx";
import NoBranchLengths from "app/no_branch_lengths.jsx";
import InternalNodeLabels from "app/internal_node_labels.jsx";

it("mwe renders correctly", () => {
  const mwe = renderer
    .create(<MWE />)
    .toJSON();
  expect(mwe).toMatchSnapshot();
});

it("vanilla renders correctly", () => {
  const vanilla = renderer
    .create(<Vanilla />)
    .toJSON();
  expect(vanilla).toMatchSnapshot();
});

it("tree without branches renders correctly", () => {
  const no_branch_lengths = renderer
    .create(<NoBranchLengths />)
    .toJSON();
  expect(no_branch_lengths).toMatchSnapshot();
});

it("tree with internal node labels renders correctly", () => {
  const internal_node_labels = renderer
    .create(<InternalNodeLabels />)
    .toJSON();
  expect(internal_node_labels).toMatchSnapshot();
});
