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
    const savedpalette = JSON.parse(localStorage.getItem('palettes'));
    this.state = {
      palettes: savedpalette || SeedColors
    };
    this.findPalette = this.findPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  findPalette(id) {
    return this.state.palettes.find(function (palette) {
      return palette.id === id;
    });
  }

  deletePalette(id){
    this.setState(
      st => ({ palettes: this.state.palettes.filter(palette => palette.id !== id)}),
      this.syncLocalStorage
    )
  }

  savePalette(newPalette) {
    this.setState({ palettes: [...this.state.palettes, newPalette] }, this.syncLocalStorage)
  }

  syncLocalStorage(){
    localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/palette/new"
          render={(routeProps) =>
            <NewPaletteForm
              savePalette={this.savePalette}
              palettes={this.state.palettes}
              {...routeProps}
            />
          }
        />
        <Route
          exact
          path="/"
          render={(routeProps) =>
            <PaletteList
              palettes={
                this.state.palettes
              } 
              deletePalette={
                  this.deletePalette
              } 
              {...routeProps}
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
