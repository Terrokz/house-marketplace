import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import OAuth from '../components/OAuth'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function Signin() {
	const [showPassword, setShowPassword] = useState(false)
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	const { email, password } = formData

	const navigate = useNavigate()

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const auth = getAuth()

			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			)

			if (userCredential.user) {
				navigate('/')
			}
		} catch (error) {
			toast.error('Bad Email or Password')
		}
	}

	return (
		<>
			<div className='pageContainer'>
				<header>
					<p className='pageHeader'>Welcome Back!</p>
				</header>
				<form onSubmit={handleSubmit}>
					<input
						type='email'
						placeholder='Email'
						className='emailInput'
						id='email'
						value={email}
						onChange={handleChange}
					/>

					<div className='passwordInputDiv'>
						<input
							type={showPassword ? 'text' : 'password'}
							className='passwordInput'
							placeholder='Password'
							id='password'
							value={password}
							onChange={handleChange}
						/>
						<img
							src={visibilityIcon}
							alt='Show Password'
							className='showPassword'
							onClick={() => setShowPassword(!showPassword)}
						/>
					</div>
					<Link to='/forgot-password' className='forgotPasswordLink'>
						Forgot Password
					</Link>

					<div className='signInBar'>
						<p className='signInText'>Sign In</p>
						<button className='signInButton'>
							<ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
						</button>
					</div>
				</form>

				<OAuth/>

				<Link to='/sign-up' className='registerLink'>
					Sign Up Instead
				</Link>
			</div>
		</>
	)
}

export default Signin
