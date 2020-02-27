import React from "react";
import renderer from "react-test-renderer";

import MWE from "app/mwe.jsx";
import Vanilla from "app/vanilla.jsx";
import NoBranchLengths from "app/no_branch_lengths.jsx";
import InternalNodeLabels from "app/internal_node_labels.jsx";
import InternalNodeLabelsBranchLengths from "app/internal_node_labels_branch_lengths.jsx";
import HighlightBranches from "app/highlight_branches.jsx";
import { ContinuouslyColored, ThickBranches } from "app/style_branches.jsx";


test("mwe", () => {
  const mwe = renderer
    .create(<MWE />)
    .toJSON();
  expect(mwe).toMatchSnapshot();
});

test("vanilla", () => {
  const vanilla = renderer
    .create(<Vanilla />)
    .toJSON();
  expect(vanilla).toMatchSnapshot();
});

test("tree without branch lengths", () => {
  const no_branch_lengths = renderer
    .create(<NoBranchLengths />)
    .toJSON();
  expect(no_branch_lengths).toMatchSnapshot();
});

test("tree with internal node labels", () => {
  const internal_node_labels = renderer
    .create(<InternalNodeLabels />)
    .toJSON();
  expect(internal_node_labels).toMatchSnapshot();
});

test("tree with internal node labels and branch lengths", () => {
  const internal_node_labels_with_bls = renderer
    .create(<InternalNodeLabelsBranchLengths />)
    .toJSON();
  expect(internal_node_labels_with_bls).toMatchSnapshot();
});

test("tree with highlighted branches", () => {
  const highlight_branches = renderer
    .create(<HighlightBranches/>)
    .toJSON();
  expect(highlight_branches).toMatchSnapshot();
});

test("tree with continuously colored branches", () => {
  const highlight_branches = renderer
    .create(<ContinuouslyColored />)
    .toJSON();
  expect(highlight_branches).toMatchSnapshot();
});

test("tree with thick branches", () => {
  const highlight_branches = renderer
    .create(<ThickBranches />)
    .toJSON();
  expect(highlight_branches).toMatchSnapshot();
});
