import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    FormControl,
} from "@material-ui/core";
import { TreeSelect } from 'antd';
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: "primary",
        paddingRight: "79px",
        paddingLeft: "118px",
    },
    logo: {
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
        color: "#FFFEFE",
        textAlign: "left",
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        justifyContent: 'center',
        marginLeft: "38px",
    },
    toolbar: {
        display: "flex",
        flex: 1,
        justifyContent: "space-between",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        backgroundColor: '#e3e3e3',
        borderRadius: 5
    },
    text: {
        color: "primary",
    },
    rowHeader: {
        display: "flex",
    },
}));

const headersData = [
    {
        label: "Inbox",
        href: "/inbox",
    },
    {
        label: "System Settings",
        href: "/system",
    },
    {
        label: "User Settings",
        href: "/account",
    },
];

const { TreeNode } = TreeSelect;


const Header = props => {

    const { history } = props
    const { header, logo, menuButton, toolbar, formControl, rowHeader } = useStyles();
    const [value, setValue] = React.useState(undefined);

   
    const onChange = () => {
        setValue(value);
    };

    const handleRouters = (url) => {
        history.push(url)
    };

    const displayDesktop = () => {
        return (
            <Toolbar className={toolbar}>
                {femmecubatorLogo}
                <div className={rowHeader}>
                    {getMenuButtons()}
                    <div>
                        <FormControl className={[formControl, menuButton]}>
                            <TreeSelect
                                showSearch
                                style={{ width: '100%' }}
                                value={value}
                                dropdownStyle={{ maxHeight: 400, zIndex: 1000000000, overflow: 'auto' }}
                                placeholder="Change Location"
                                allowClear
                                treeDefaultExpandAll
                                onChange={onChange}
                            >
                                <TreeNode value="Khartoum-st" title="Khartoum-st">
                                    <TreeNode value="Khartoum-lc" title="Khartoum-lc" />
                                    <TreeNode value="Bahri" title="Bahri" />
                                    <TreeNode value="Omdurman" title="Omdurman" />
                                </TreeNode>
                                <TreeNode value="Gazira" title="Gazira">
                                    <TreeNode value="Madani" title="Madani" />
                                    <TreeNode value="Sinar" title="Sinar" />
                                    <TreeNode value="Hasahisa" title="Hasahisa" />
                                </TreeNode>
                                <TreeNode value="Port Sudan-st" title="Port Sudan-st">
                                    <TreeNode value="Port Sudan-lc" title="Port Sudan-lc" />
                                    <TreeNode value="Sinkat" title="Sinkat" />
                                    <TreeNode value="Danti" title="Danti" />
                                </TreeNode>
                            </TreeSelect>
                        </FormControl>

                    </div>
                </div>
            </Toolbar>
        );
    };

    const getMenuButtons = () => {
        return (
            <>
                {headersData.map(({ label, href }) => {
                    return (
                        <Button
                            onClick={() => handleRouters(href)}
                            {...{
                                key: label,
                                color: "inherit",
                                to: href,

                                component: RouterLink,
                                className: menuButton
                            }}
                        >
                            {label}
                        </Button>
                    );
                })}
            </>
        )
    };

    const femmecubatorLogo = (
        <Typography onClick={() => handleRouters('/')} variant="h6" component="h1" className={logo}>
            Home
        </Typography>
    );

    return (
        <header>
            <AppBar className={header}>{displayDesktop()}</AppBar>
        </header>
    );
}

export default withRouter(Header)