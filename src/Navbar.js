import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import './Navbar.css';
import 'rc-slider/assets/index.css';
import { Select, MenuItem } from '@material-ui/core';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            format: "hex",
            open: false
        }
        this.changeFormat = this.changeFormat.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    changeFormat(e) {
        this.setState({ format: e.target.value, open: true });
        this.props.changeFormat(e.target.value);
    }

    closeSnackbar() {
        this.setState({ open: false });
    }
    render() {
        const { level, changeLevel } = this.props;
        const { format, open } = this.state;
        return (
            <header className="Navbar">
                <div className="logo">
                    <Link to={`/`}>Chroma</Link>
                </div>
                <div className="slider-container">
                    <span>Level: {level}</span>
                    <div className="slider">
                        <Slider defaultValue={level} min={100} max={900} onAfterChange={changeLevel} step={100} />
                    </div>
                </div>
                <div className="select-container">
                    <Select onChange={this.changeFormat} value={format}>
                        <MenuItem value="hex">Hex - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255,255,255,0.5)</MenuItem>
                    </Select>
                </div>
                <SnackBar
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    open={open}
                    autoHideDuration={2000}
                    message={<span id="message-id">Format Changed To {format.toUpperCase()}</span>}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    onClose={this.closeSnackbar}
                    action={[
                        <IconButton
                            onClick={this.closeSnackbar}
                            color="inherit"
                            key="close"
                            aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    ]} />
            </header>
        );

    }
}

export default Navbar;