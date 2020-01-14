import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SeedColors from './seedColors';
import NewPaletteForm from './NewPaletteForm';
import { generatePalette } from './colorHelpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.findPalette = this.findPalette.bind(this);
  }

  findPalette(id) {
    return SeedColors.find(function (palette) {
      return palette.id === id;
    });
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/palette/new"
          render={(routerProps) => <NewPaletteForm />}
        />
        <Route
          exact
          path="/"
          render={(routeProps) =>
            <PaletteList
              palettes={
                SeedColors
              } {...routeProps}
            />
          }
        />
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) =>
            <Palette
              palette={
                generatePalette(this.findPalette(routeProps.match.params.id))
              }
            />
          } />
      </Switch>
    )
  }
}

export default App;
