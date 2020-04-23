import React from "react";
import {withAuthorization} from "../../firebase/hoc/withAuthorization";
import {SettingsComponents} from "../../page/Settings";
import {CardContent, makeStyles, Theme, Typography, Tabs, Tab, Box} from "@material-ui/core";
import {createStyles, useTheme, withStyles} from "@material-ui/core/styles";
import {grey} from "@material-ui/core/colors";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            style={{height: '100%'}}
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box style={{padding: 0}} p={3}>{children}</Box>}
        </Typography>
    );
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root : {
            background: '#fff',
        },
        header : {
            marginLeft: 13,
            paddingBottom: 20,
            paddingTop: 40
        },
        block : {
            background: grey[100],
            height: 150
        },
        container : {
            width: 1240,
            margin: '0 auto',
            paddingBottom: 20
        },
        content: {

        },
        component: {
            width: 1240,
            margin: '0 auto',
            paddingBottom: 20,
            paddingLeft: 25
        }
    })
)

interface StyledTabsProps {
    value: number;
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}


const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        height: 3,
        '& > div': {
            width: '100%',
            marginRight: 13,
            marginLeft: 13,
            backgroundColor: "#f15f2c",
        },
    },
})((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

interface StyledTabProps {
    label: string;
}

const StyledTab = withStyles((theme: Theme) =>
    createStyles({
        root: {
            textTransform: 'none',
            color: '#000',
            fontWeight: 600,
            fontSize: theme.typography.pxToRem(15),
            marginRight: theme.spacing(1),
            '&:focus': {
                opacity: 1,
            },
        },
    }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />);


const SettingsContainer: React.FC = (props) => {
    const classes = useStyles()
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <>  <div className={classes.root}>
            <div className={classes.block}>
                <div className={classes.container}>
                    <div className={classes.content}>
                        <Typography gutterBottom variant="h6" component="h2" className={classes.header}>
                            SETTINGS
                        </Typography>
                        <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
                            <StyledTab label="SETTINGS ACCOUNT" />
                            <StyledTab label="MY SUBSCRIPTIONS" />
                            <StyledTab label="NOTICE" />
                        </StyledTabs>
                    </div>

                </div>

            </div>
            <div className={classes.component}>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <SettingsComponents/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    Item Three
                </TabPanel>
            </div>

        </div>
        </>
    )
}

export const Settings = withAuthorization(SettingsContainer)