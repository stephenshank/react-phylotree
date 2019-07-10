import React from "react";
import renderer from "react-test-renderer";

import MWE from "app/mwe.jsx";
import Vanilla from "app/vanilla.jsx";
import NoBranchLengths from "app/no_branch_lengths.jsx";
import InternalNodeLabels from "app/internal_node_labels.jsx";
import InternalNodeLabelsBranchLengths from "app/internal_node_labels_branch_lengths.jsx";
import HighlightBranches from "app/highlight_branches.jsx";


it("mwe", () => {
  const mwe = renderer
    .create(<MWE />)
    .toJSON();
  expect(mwe).toMatchSnapshot();
});

it("vanilla", () => {
  const vanilla = renderer
    .create(<Vanilla />)
    .toJSON();
  expect(vanilla).toMatchSnapshot();
});

it("tree without branches", () => {
  const no_branch_lengths = renderer
    .create(<NoBranchLengths />)
    .toJSON();
  expect(no_branch_lengths).toMatchSnapshot();
});

it("tree with internal node labels", () => {
  const internal_node_labels = renderer
    .create(<InternalNodeLabels />)
    .toJSON();
  expect(internal_node_labels).toMatchSnapshot();
});

it("tree with internal node labels and branch lengths", () => {
  const internal_node_labels_with_bls = renderer
    .create(<InternalNodeLabelsBranchLengths />)
    .toJSON();
  expect(internal_node_labels_with_bls).toMatchSnapshot();
});

it("tree with highlighted branches", () => {
  const highlight_branches = renderer
    .create(<HighlightBranches/>)
    .toJSON();
  expect(highlight_branches).toMatchSnapshot();
});
