import React, {useEffect, useState} from "react";
import {CustomDialog} from "./CustomDialog";
import {CardContent, Typography, Select, MenuItem, Paper} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import {connect} from "react-redux";
import {createPageActionCreator} from "../../store/action/currentUser";
import {grey} from "@material-ui/core/colors";

export const exampleCategories = {
    total: [
        {
            title: 'Baseline',
            cost: 200,
            description: 'At this level, you can offer to simply subscribe to the new closed content on the blog',
        },
        {
            title: 'Extended Subscription',
            cost: 300,
            description: 'For an extended subscription, you can offer discounts on merch, upload unique content that will be posted only on Busty',
        },
        {
            title: 'Exclusive Subscription',
            cost: 700,
            description: 'Для этого уровня рассказывайте или показывайте, над чем работаете прямо сейчас. Позвольте подписчикам выбирать, за что вы возьмётесь в следующий раз.',
        }
    ],
    blog: [
        {
            title: 'Baseline',
            cost: 200,
            description: 'Subscription gives the right to read all the materials on the blog. Posts will be published here earlier than elsewhere.',
        },
        {
            title: 'Advanced Subscription',
            cost: 500,
            description: 'Personal chat in a special chat for subscribers only',
        },
        {
            title: 'Top Subscription',
            cost: 700,
            description: 'You will be able to influence the subject matter of the blog material!',
        }
    ],
    videos: [
        {
            title: 'Just a subscription',
            cost: 200,
            description: 'Thanks for your support! Sometimes I will post posts and videos only for my subscribers. You will also have access to private comments, where you can chat with me and with each other.',
        },
        {
            title: 'Access behind the scenes',
            cost: 500,
            description: 'By this subscription all previous levels will be available to you, plus a link to a closed chat where we can chat ourselves and mention your accounts in the story.',
        },
    ]
}

function DialogAddTier(props: any) {
    const {show, onHide} = props;
    const [dialogOpened, setDialogOpened] = useState(false);
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [description, setDescription] = useState('');
    const [pageBlog, setPageBlog] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [categoriesList, setCategoriesList] = useState(exampleCategories.total)
    const [categories, setCategories] = useState('total')

    useEffect(()=>{
        setDialogOpened(show)
    },[show])

    useEffect(() => {
        if (name.trim() && cost.trim() && description.trim()){
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [name, cost, description]);

    const handleAddTier = () => {
        onHide()
        console.log('become bloger')
    }

    const handleChangeCategories = (event: any) => {
        event.target.value === 'total' && setCategoriesList(exampleCategories.total) && setCategories('total')
        event.target.value === 'blog' && setCategoriesList(exampleCategories.blog) && setCategories('blog')
        event.target.value === 'videos' && setCategoriesList(exampleCategories.videos) && setCategories('videos')
        console.log(event.target.value)
    }

    const data = {
        title: 'Add Subscription Tier',
        content:
            <div>
                <Typography variant="body2"  component="p">
                    <strong>Name</strong>
                </Typography>
                <TextField
                    variant="outlined"
                    style={{marginTop: 5}}
                    fullWidth
                    id="name"
                    name="name"
                    type="text"
                    size={"small"}
                    placeholder="Enter your name"
                    margin="normal"
                    onChange={(e) => setName(e.target.value)}
                    // onKeyPress={(e)=>handleKeyPress(e)}
                />
                <Typography variant="body2"  component="p">
                    <strong>Description</strong>
                </Typography>
                <TextField
                    variant="outlined"
                    style={{marginTop: 5}}
                    fullWidth
                    multiline
                    rows={8}
                    inputProps={{
                        maxLength: 150,
                    }}
                    id="description"
                    name="Description"
                    type="text"
                    placeholder="Enter your description"
                    margin="normal"
                    onChange={(e) => setDescription(e.target.value)}
                    // onKeyPress={(e)=>handleKeyPress(e)}
                />
                <Typography color="textSecondary" variant="body2"  component="p" align={"right"}>
                    {description.length} / 150
                </Typography>
                <Typography variant="body2"  component="p">
                    The cost of a monthly subscription (in rubles)
                </Typography>
                <Typography color="textSecondary"  variant="body2"  component="p">
                    The maximum subscription cost is 100,000 rubles.
                </Typography>
                <TextField
                    variant="outlined"
                    style={{marginTop: 5}}
                    fullWidth
                    id="cost"
                    name="cost"
                    type="number"
                    size={"small"}
                    placeholder="Cost"
                    margin="normal"
                    onChange={(e) => setCost(e.target.value)}
                    // onKeyPress={(e)=>handleKeyPress(e)}
                />
            </div>,
        action:
            <FormControl fullWidth >
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    // className={classes.loginBtn}
                    onClick={handleAddTier}
                    disabled={isButtonDisabled}>
                    Add tier
                </Button>
            </FormControl>
    }

    const extendData =
        <>
            <Typography style={{margin: 15}} variant="h6" component="p" align={"center"}>
                Example categories
            </Typography>
            <FormControl variant="outlined" style={{background: "white", marginLeft: 15, marginRight: 15, minWidth: '91%'}}>
                <Select
                    // style={{height: 40}}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={categories}
                    // value={age}
                    onChange={handleChangeCategories}
                >
                    <MenuItem value={'total'}>Total</MenuItem>
                    <MenuItem value={'blog'}>Blog</MenuItem>
                    <MenuItem value={'videos'}>Videos</MenuItem>
                </Select>
            </FormControl>
            <div style={{height: 375, background: grey[200]}}>
                <div style={{height: '100%', overflow: "auto", marginTop: 10, marginRight: 15}}>
                    {categoriesList.map((item: any, index: number) =>
                        <Paper elevation={0} style={{margin: 15, marginRight: 0, marginTop: 5, marginBottom: 30}} key={index}>
                            <div style={{padding: 15}}>
                                <Typography style={{marginBottom: 5}} component="p" align={"left"}>
                                    <strong>{item.title}</strong>
                                </Typography>
                                <Typography style={{marginBottom: 10}} color="textSecondary" variant="body2"  component="p" align={"left"}>
                                    {item.cost} ₽ per month
                                </Typography>
                                <Typography  variant="body2"  component="p" align={"left"}>
                                    {item.description}
                                </Typography>
                            </div>
                        </Paper>
                    )}
                </div>

            </div>
        </>


    return (
        <CustomDialog extendData={extendData} size={'md'} data={ data } show={ dialogOpened }  onHide={ onHide }/>
    )
}

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            setMyPage: (name: string) => dispatch(createPageActionCreator(name)),
        }
    }
}

export default connect(null, mapDispatchToProps)(DialogAddTier)