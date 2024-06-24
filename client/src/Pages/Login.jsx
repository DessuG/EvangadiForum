import { useRef,useState } from "react";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import classes from './CSS/login.module.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Login() {
	const navigate = useNavigate();
	const emailDom = useRef();
	const passwordDom = useRef();

	const userNameDomR = useRef();
	const firstNameDomR = useRef();
	const lastNameDomR = useRef();
	const emailDomR = useRef();
	const passwordDomR = useRef();

	const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [logVisible, setLoginVisible] = useState(true);
  

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);};


	const registrationVsisible = (event) => {
		event.preventDefault(); // Prevents the default anchor link behavior
		setLoginVisible(false);
	  };
	
	  const loginVisible = (event) => {
		event.preventDefault(); // Prevents the default anchor link behavior
		setLoginVisible(true);
	};
	



	async function handleSubmit(e) {
		e.preventDefault();
		const emailValue = emailDom.current.value;
		const passwordValue = passwordDom.current.value;

		if (!emailValue || !passwordValue) {
			alert("Please fill all the fields");
			return;
		}
		try {
			const { data } = await axios.post("/users/login", {
				email: emailValue,
				password: passwordValue,
			});
			alert("User logged in successfully");
			localStorage.setItem("token", data.token);
			navigate("/");
			//   console.log(data)
		} catch (error) {
			alert(error?.response?.data?.msg);
			console.log(error.response.data);
		}
	}
	async function handleSubmitR(e) {
		e.preventDefault();
		const userNameValueR = userNameDomR.current.value;
		const firstNameValueR = firstNameDomR.current.value;
		const lastNameValueR = lastNameDomR.current.value;
		const emailValueR = emailDomR.current.value;
		const passwordValueR = passwordDomR.current.value;
		if (
			!userNameValueR ||
			!firstNameValueR ||
			!lastNameValueR ||
			!emailValueR ||
			!passwordValueR
		) {
			alert("Please fill all the fields");
			return;
		}
		try {
			await axios.post("/users/register", {
				usernameR: userNameValueR,
				firstnameR: firstNameValueR,
				lastnameR: lastNameValueR,
				emailR: emailValueR,
				passwordR: passwordValueR,
			});
			alert("User registered successfully");
			navigate("/login");
		} catch (error) {
			alert("Error registering user");
			console.log(error.response);
		}
		// console.log(userNameDom.current.value)
		// console.log(firstNameDom.current.value)
		// console.log(lastNameDom.current.value)
		// console.log(emailDom.current.value)
		// console.log(passwordDom.current.value)
	}

	return (
		<section className={classes.login_all}>
		<section className={classes.login_wrap}>
			{logVisible?	
	(<div className={classes.input_form}>
	<form onSubmit={handleSubmit}>
		<h2>Login to your account</h2>
		<br />
		<span>Don't have an account?<Link  onClick={registrationVsisible} >Create a new account</Link></span>
		<br />
		<div style={{marginTop:"70px"}}>
			<input ref={emailDom} type="text" placeholder="Email Address" />
		</div>
		<br />
		<div className={classes.password_field}>
		<input ref={passwordDom} type={showPassword ? "text" : "password"} placeholder="Password"
		  />
		  <span
			className={classes.password_toggle}
			onClick={togglePasswordVisibility}
			   >
			{showPassword ? <VisibilityIcon style={{color:"#9E9E9E"}}/> : <VisibilityOffIcon style={{color:"#9E9E9E"}}/>}
		</span>
			
		</div>
		<br />
		<Link>
		<p style={{display:"flex",justifyContent:"end"}}>Forgot Password</p>
		</Link>
		<button type="submit">Log in</button>
	</form>
	<br />
	</div>):(<div className={classes.input_formR}>
			<form onSubmit={handleSubmitR} >
				<div className={classes.text_center}>
					<h2 style={{fontSize:18,fontWeight:"900"}}>
						Join the Network
					</h2 >
					<span style={{fontSize:16, display:"flex",fontWeight:"300"}}><h3 >Already have an account? &nbsp;</h3>
					<Link onClick={loginVisible}>Sign In</Link></span>
				</div>
				<br /><br />
				<div>
					
					<input ref={userNameDomR} type="text" placeholder="username" />
				</div>
				<br />
				<div style={{display:"flex"}}>
					
					<input ref={firstNameDomR} type="text"  placeholder="first name" style={{display:"flex", width:"36.5%" }}/>
					<br />
					<input ref={lastNameDomR} type="text" placeholder="last name" style={{width:"36.5%",marginLeft:"10px"}}/>
				</div>
				<br />
				<div>
					
					<input ref={emailDomR} type="text" placeholder="email" />
				</div>
				<br />
				<div>
					
					<input ref={passwordDomR} type="password" placeholder="password" />
				</div>
				<br />
				
				<p>I agree to the <a href="">privacy policy</a> and <a href="">terms of service.</a></p>
				<button type="submit">Agree and Join</button>
				
				<Link className={classes.final_text} onClick={loginVisible} to={"/login"}>Already have an Account ?</Link>
			</form>
			</div>)}
	<div className={classes.login_right}>
		<div ><a href="www.evangadi.com">about</a></div>
		<div className={classes.fadding_text}>
			<h1 style={{fontSize:"44px"}}>Evangadi Networks</h1>
		</div>
		<br />
		<br />
		<div className={classes.login_side}>
		<div>
		<p>
		No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.
		</p>
		<br />
		<p>Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.</p>
		</div>
		
		</div>
		<br />
		<br />
		<button onClick={registrationVsisible}>CREATE A NEW ACOUNT</button>
	</div>
	
</section>
</section>
	);
}

export default Login;
