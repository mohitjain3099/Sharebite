import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Container, TextField, Button, Divider, Chip, Avatar } from '@mui/material';
import loginImg from '../../static/images/login-page.jpg'
import ApplicationLogo from '/SharebiteLogo.svg';
import SignupComponent from './SignupComponent';
import '../../dist/login.css';
import { authenticateUser } from '../../services/api.service.users';
import { useDispatch } from 'react-redux';
import { login } from '../../store/user-slice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import LoginPage from '../../static/images/LoginPage.jpeg';

export default function LoginComponent() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isEmailValid, setIsEmailValid] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Function to handle the closing of the dialog
    const handleClose = () => {
        setOpen(false);
    };

    // Function to handle the opening of the dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Function to validate the email
    const validateEmail = (email: string): boolean => {
        // Regular expression pattern for email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Check if the email matches the pattern
        return emailPattern.test(email);
    };

    // Function to handle the change in the form
    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (name === "email") {
            setEmail(value);
            validateEmail(value) ? setIsEmailValid(true) : setIsEmailValid(false);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    // Function to handle the forgot password click
    const onClickForgotPassword = async () => {
        console.log('Reset password link sent to your email id.');
        const { value: email } = await Swal.fire({
            title: "Input email address",
            input: "email",
            inputLabel: "Your email address",
            inputPlaceholder: "Enter your email address"
        });
        if (email) {
            Swal.fire(`Password reset link sent to: ${email}`);
        }
    };

    // Function to handle the login
    const handleLogin = async () => {
        await authenticateUser({ email: email, password: password })
            .then((response) => { // Explicitly specify the type of 'data' as any
                if (response.ok) {
                    response.json().then((data) => {
                        if (data) {
                            dispatch(login(data));
                            Swal.fire({
                                icon: 'success',
                                title: 'User logged in successfully',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            window.scrollTo(0, 0);
                            navigate('/');
                        }
                    });
                } else {
                    // Handle the case when the response is not ok and return a default value
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid credentials! User login failed',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    console.log('Authentication failed');
                }
            });
    }

    return (
        <>
            <Container className='loginScreen mg-5 mg-tb-100' maxWidth="xl">
                <Card sx={{ display: 'flex' }} >
                    <CardMedia
                        component="img"
                        sx={{ width: '50%', aspectRatio: '1/1' }}
                        image={LoginPage}
                        alt="Login Page Image"
                    />
                    <Box sx={{ width: '50%' }}>
                        <CardContent sx={{ flex: '1 0 auto', margin: '0% 4%' }}>
                            <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Avatar sx={{ width: '200px', height: '140px' }} src={ApplicationLogo} />
                            </Container>
                            <Container sx={{ width: '80%' }}>

                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                    <Typography component="div" variant="h4" sx={{ fontWeight: "bold" }}>
                                        Share Bite
                                    </Typography>
                                </Box>

                                <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} variant="subtitle1" color="text.secondary" mt={'0%'}>
                                    Share your food with those in need.
                                </Typography>

                                <Divider sx={{ margin: "5% 0" }}>
                                    <Chip label="LOGIN" size="small" />
                                </Divider>

                                <Box
                                    sx={{ display: "flex", alignItems: "center", margin: "3% 0" }}
                                >
                                    <TextField
                                        variant="outlined"
                                        label="Email"
                                        name="email"
                                        value={email}
                                        onChange={handleFormChange}
                                        error={!isEmailValid}
                                        fullWidth
                                        helperText={!isEmailValid ? "Invalid email" : ""}
                                        onBlur={() => {
                                            if (email === "") {
                                                setEmail("");
                                                setIsEmailValid(true);
                                            } else {
                                                setIsEmailValid(validateEmail(email));
                                            }
                                        }}
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "end",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            margin: "3% 0",
                                            width: "100%",
                                        }}
                                    >
                                        <TextField
                                            variant="outlined"
                                            label="Password"
                                            type="password"
                                            name="password"
                                            fullWidth
                                            value={password}
                                            onChange={handleFormChange}
                                        />
                                    </Box>
                                    <Box sx={{ mt: "-2%" }} onClick={onClickForgotPassword}>
                                        <Typography
                                            variant="subtitle1"
                                            color="primary"
                                            mt={"-4%"}
                                            sx={{
                                                "&:hover": {
                                                    cursor: "pointer",
                                                    textDecoration: "underline",
                                                },
                                            }}
                                        >
                                            Forgot Password?
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{ display: "flex", alignItems: "center", margin: "5% 0" }}
                                >
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        {...(isEmailValid
                                            ? { disabled: false }
                                            : { disabled: true })}
                                        onClick={handleLogin}
                                        sx={{
                                            backgroundColor: "black", "&:hover": {
                                                backgroundColor: "#FD514E"
                                            }
                                        }}
                                    >
                                        Login
                                    </Button>
                                </Box>

                                <Divider sx={{ margin: "5% 0" }}>
                                    <Chip label="JOIN US" size="small" />
                                </Divider>

                                <Typography variant="subtitle1" color="black">
                                    Don't have an account?
                                </Typography>

                                <Box
                                    sx={{ display: "flex", alignItems: "center", margin: "5% 0" }}
                                >
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        color="primary"
                                        onClick={handleClickOpen}
                                        sx={{
                                            borderColor: "black", color: "black", "&:hover": {
                                                borderColor: "black", backgroundColor: "#FD514E", color: "white"
                                            }
                                        }}
                                    >
                                        Create Account
                                    </Button>
                                </Box>
                                <SignupComponent open={open} handleClose={handleClose} />
                            </Container>
                        </CardContent>
                    </Box>
                </Card>
            </Container>
        </>
    );
}
