import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import sizes from "./sizes";
import bg from "./bg.svg";

const styles = {
    "@global": {
        ".fade-exit": {
            opacity: 1
        },
        ".fade-exit-active": {
            opacity: 0,
            transition: "opacity 500ms ease-out"
        }
    },
    root: {
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        fontFamily: "Segoe UI Light",
        justifyContent: "center",
        backgroundColor: "#394bad",
        backgroundImage: `url(${bg})`,
        overflow: "scroll"
    },
    heading: {
        fontSize: "2rem"
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        fontFamily: "Segoe UI Light",
        flexDirection: "column",
        flexWrap: "wrap",
        [sizes.down("xl")]: {
            width: "80%"
        },
        [sizes.down("xs")]: {
            width: "75%"
        }
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        height: "80px",
        "& a": {
            color: "black",
            fontFamily: "Segoe UI Light",
            textDecoration: "none",
            fontSize: "25px",
            fontWeight: "bold"
        }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        fontFamily: "Segoe UI Light",
        gridGap: "2.5rem",
        [sizes.down("md")]: {
            gridTemplateColumns: "repeat(2, 50%)"
        },
        [sizes.down("xs")]: {
            gridTemplateColumns: "repeat(1, 100%)",
            gridGap: "1.4rem"
        }
    },
    spanLink: {
        font: "bold 15px Arial",
        fontFamily: "Segoe UI Light",
        backgroundColor: "transparent",
        border: "1px solid black",
        borderRadius: "3px",
        padding: "3px 8px 3px 8px",
        '&:hover': {
            border: "1px solid white",
            color: "white",
            transition: "color 400ms ease-in-out"
        }
    }
};

class PaletteList extends Component {
    gotoPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }
    render() {
        const { palettes, classes, deletePalette } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <a href="#">Color Palettes</a>
                        <Link to="/palette/new"><span className={classes.spanLink}>Create palette</span></Link>
                    </nav>
                    <div className={classes.palettes}>
                        {
                            palettes.map(palette => (
                                <MiniPalette
                                    {...palette}
                                    handleClick={() => this.gotoPalette(palette.id)} key={palette.id}
                                    handleDelete={deletePalette}
                                    key = {palette.id}
                                    id = {palette.id}
                                />
                            )
                            )
                        }
                    </div>
                    <div className={classes.container}><footer className={classes.nav}>&copy; by Kalpesh Shirudkar</footer></div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);