import React, {useState} from "react";
import {
    Tabs,
    Tab,
    Typography,
    Box,
    DialogTitle,
    DialogContent,
    DialogActions,
    AppBar,
    Toolbar
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";

export const WrapperDialogAuth: React.FC = (props: any) => {
    const {show, onHide, onLogin, onAuthGoogle} = props;
    const [value, setValue] = useState(0)
    const [open, setOpen] = useState(true)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    function a11yProps(index: any) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    interface TabPanelProps {
        children?: React.ReactNode;
        index: any;
        value: any;
    }

    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box p={3}>{children}</Box>}
            </Typography>
        );
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog maxWidth={'xs'} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="LOGIN" {...a11yProps(0)} />
                            <Tab label="SING UP" {...a11yProps(1)} />
                            <Tab label="RECOVERY" {...a11yProps(2)} />
                            <Button autoFocus color="inherit" onClick={handleClose}>
                                save
                            </Button>
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            Item One
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Item Two
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Item Three
                        </TabPanel>

            </Dialog>


        </div>
    )
}