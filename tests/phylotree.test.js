import React from "react";
import renderer from "react-test-renderer";

import MWE from "app/mwe.jsx";
import Vanilla from "app/vanilla.jsx";
import NoBranchLengths from "app/no_branch_lengths.jsx";

it('mwe renders correctly', () => {
  const mwe = renderer
    .create(<MWE />)
    .toJSON();
  expect(mwe).toMatchSnapshot();
});

it('vanilla renders correctly', () => {
  const mwe = renderer
    .create(<MWE />)
    .toJSON();
  expect(mwe).toMatchSnapshot();
});

it('tree without branches renders correctly', () => {
  const mwe = renderer
    .create(<NoBranchLengths />)
    .toJSON();
  expect(mwe).toMatchSnapshot();
});
