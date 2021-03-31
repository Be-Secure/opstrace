/**
 * Copyright 2021 Opstrace, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { map } from "ramda";
import { mapIndexed } from "ramda-adjunct";

import * as tabTypes from "./types";

import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

type TabPanelProps<T> = {
  active: boolean;
  tab: tabTypes.Tab;
  opts?: T;
};

function Panel<T>({ active, tab, opts }: TabPanelProps<T>) {
  const { key, content } = tab;
  const Content = content;

  return (
    <div role="tabpanel" hidden={!active} id={key}>
      {active && (
        <Box p={3}>
          <Content {...opts} />
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

type TabbedDetailProps<T> = {
  tabs: tabTypes.Tabs;
  opts?: T;
};

export function TabbedDetail<T = {}>(props: TabbedDetailProps<T>) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          {map((tab: tabTypes.Tab) => <Tab label={tab.label} />)(props.tabs)}
        </Tabs>
      </AppBar>
      {mapIndexed((tab: tabTypes.Tab, index: number) => (
        <Panel<T> active={value === index} tab={tab} opts={props.opts} />
      ))(props.tabs)}
    </div>
  );
}
